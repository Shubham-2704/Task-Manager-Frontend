import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfilePhotoSelector from "@/components/Inputs/ProfilePhotoSelector";
import { Camera, Edit, Edit2, Pencil } from "lucide-react";
import uploadImage from "@/utils/uploadImage";

const Sidebar = ({ activeMenu }) => {
  const { user, clearUser, updateUserProfile } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/signup");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  const handleSaveProfileImage = async () => {
    if (!selectedProfileImage) {
      setIsDialogOpen(false);
      return;
    }

    setIsUploading(true);
    try {
      // Assuming you have an API utility for file uploads and user updates
      // This is a placeholder for the actual API call
      const { imageUrl } = await uploadImage(selectedProfileImage);
      // Assuming uploadImage returns the URL of the uploaded image

      // Update user context with the new image URL
      await updateUserProfile({ profileImageUrl: imageUrl });

      setSelectedProfileImage(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to upload profile image:", error);
      // Handle error (e.g., show a toast message)
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-64 h-[calc(100vh-62px)] bg-white dark:bg-black border-r border-gray-200/50 dark:border-gray-700/50 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div className="relative cursor-pointer">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user?.profileImageUrl || ""}
                  alt="Profile Image"
                  className="object-cover bg-gray-400"
                />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                <Edit className="h-4 w-4 text-white" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <ProfilePhotoSelector
              image={selectedProfileImage}
              setImage={setSelectedProfileImage}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSaveProfileImage}
                disabled={isUploading}
              >
                {isUploading ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 dark:text-gray-50 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>

        <p className="text-[12px] text-gray-500 dark:text-gray-400">{user?.email || ""}</p>
      </div>

      {sideMenuData?.map((item, index) => (
        <Button
          variant={"ghost"}
          key={`menu_${index}`}
          className={`w-full flex justify-start gap-4 text-[15px] ${
            activeMenu === item?.label
              ? "text-primary bg-linear-to-r  from-blue-50/40 to-blue-100/50 dark:bg-white  border-r-3 border-primary hover:text-primary hover:bg-linear-to-r hover:from-blue-50/40 dark:hover:bg-white hover:to-blue-100/50 hover:border-r-3 hover:border-primary dark:hover:text-primary"
              : ""
          } py-3 px-6 mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon />
          {item?.label}
        </Button>
        // <button
        //   variant={"ghost"}
        //   key={`menu_${index}`}
        //   className={`w-full flex items-center gap-4 text-[15px] ${
        //     activeMenu === item.label
        //       ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3 border-primary"
        //       : ""
        //   } py-3 px-6 mb-3 cursor-pointer`}
        // >
        //   <item.icon />
        //   {item.label}
        // </button>
      ))}
    </div>
  );
};

export default Sidebar;
