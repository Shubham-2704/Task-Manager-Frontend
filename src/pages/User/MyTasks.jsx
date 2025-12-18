import React, { useCallback, useContext, useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import TaskStatusTabs from "@/components/TaskStatusTabs";
import TaskCard from "@/components/Cards/TaskCard";
import { ws } from "@/lib/socket";
import { SocketContext } from "@/context/SocketContext";

const MyTasks = () => {
  const [allTasks, setAllTasks] = useState([]);

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();
  const { taskUpdated } = useContext(SocketContext);

  const getAllTasks = useCallback(async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? undefined : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // Map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [filterStatus]);

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks();

    ws && getAllTasks();
  }, [getAllTasks, taskUpdated]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <h2 className="text-xl font-medium">My Tasks</h2>

          {tabs?.[0]?.count > 0 && (
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allTasks?.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => handleClick(task._id)}
            />
          ))}
          {/* No Tasks Found */}
          {!allTasks.length && (<p className="col-span-full text-center text-gray-500">
              No Task found
            </p>)}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
