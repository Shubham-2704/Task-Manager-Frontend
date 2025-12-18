import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import UserCard from "@/components/Cards/UserCard";
import { toast } from "sonner";
import UserCardSkeleton from "@/components/Cards/UserCardSkeleton";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_USERS
      );
      setAllUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // Download user report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.REPORTS.EXPORT_USERS,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_details.xlsx");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download user report");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Number of skeletons to show
  const skeletonCount = allUsers.length > 0 ? allUsers.length : 3;

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl font-medium">Team Members</h2>

          <Button
            className="download-btn cursor-pointer"
            onClick={handleDownloadReport}
          >
            <FileSpreadsheet />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {/* Loading Skeletons */}
          {loading &&
            Array.from({ length: skeletonCount }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}

          {/* Users List */}
          {!loading &&
            allUsers.length > 0 &&
            allUsers.map((user) => (
              <UserCard
                key={user._id}
                userInfo={user}
                getAllUsers={getAllUsers}
              />
            ))}

          {/* No Users Found */}
          {!loading && allUsers.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No member found
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
