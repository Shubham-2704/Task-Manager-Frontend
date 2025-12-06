import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import useUserAuth from "@/hooks/useUserAuth";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { format } from "date-fns";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InfoCard from "@/components/Cards/InfoCard";
import { addThousandsSeparator } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TaskListTable from "@/components/TaskListTable";
import CustomPieChart from "@/components/Charts/CustomPieChart";
import CustomBarChart from "@/components/Charts/CustomBarChart";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const UserDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // Prepare Chart data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const taskPriorityLevelsData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(taskPriorityLevelsData);
  };

  const getDashboardData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const onSeeMore = () => {
    navigate("/user/tasks");
  };

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 space-y-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">
              Good Morning! {user?.name}
            </CardTitle>
            <CardDescription className="text-xs md:text-[13px] text-gray-400">
              {format(new Date(), "EEEE do MMM yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
            <InfoCard
              label="Total Tasks"
              value={addThousandsSeparator(
                dashboardData?.charts?.taskDistribution?.All || 0
              )}
              color="bg-primary"
            />
            <InfoCard
              label="Pending Tasks"
              value={addThousandsSeparator(
                dashboardData?.charts?.taskDistribution?.Pending || 0
              )}
              color="bg-violet-500"
            />
            <InfoCard
              label="In Progress Tasks"
              value={addThousandsSeparator(
                dashboardData?.charts?.taskDistribution?.InProgress || 0
              )}
              color="bg-cyan-500"
            />
            <InfoCard
              label="Completed Tasks"
              value={addThousandsSeparator(
                dashboardData?.charts?.taskDistribution?.Completed || 0
              )}
              color="bg-lime-500"
            />
          </CardContent>
        </Card>

        {dashboardData?.charts?.taskDistribution?.All === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-lg text-gray-500">
              No tasks available. Create a new task to get started.
            </p>
            <Button
              onClick={() => navigate("/admin/create-task")}
              className="mt-4"
            >
              Create Task
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Task Distribution</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <CustomPieChart data={pieChartData} colors={COLORS} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Task Priority Levels
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                <CustomBarChart data={barChartData} />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Tasks</CardTitle>

                  <Button
                    onClick={onSeeMore}
                    variant="link"
                    className="bg-gray-50 hover:bg-blue-50 cursor-pointer border border-gray-200/50"
                  >
                    See All <ArrowRight className="text-base" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <TaskListTable tableData={dashboardData?.recentTasks || []} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
