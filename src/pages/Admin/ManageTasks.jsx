import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import TaskStatusTabs from "@/components/TaskStatusTabs";
import TaskCard from "@/components/Cards/TaskCard";
import { toast } from "sonner";
import TaskCardSkeleton from "@/components/Cards/TaskCardSkeleton";
import NoData from "@/components/NoData";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

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

  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };

  // Download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_details.xlsx");
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-medium">Manage Tasks</h2>

            <Button
              className="lg:hidden download-btn cursor-pointer"
              onClick={handleDownloadReport}
            >
              <FileSpreadsheet />
              Download Report
            </Button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              <Button
                className="hidden lg:flex download-btn cursor-pointer"
                onClick={handleDownloadReport}
              >
                <FileSpreadsheet />
                Download Report
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {allTasks?.length === 0 ? (
            <TaskCardSkeleton />
          ) : (
            allTasks?.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onClick={() => handleClick(task)}
              />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
