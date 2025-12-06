import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

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
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-62px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        {/* <div className="relative"> */}
        {/* <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="h-20 w-20 object-cover rounded-full bg-gray-400"
          /> */}
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="object-cover bg-gray-400"
          />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        {/* </div> */}

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>

        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>

      {sideMenuData.map((item, index) => (
        <Button
          variant={"ghost"}
          key={`menu_${index}`}
          className={`w-full flex justify-start gap-4 text-[15px] ${
            activeMenu === item.label
              ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3 border-primary hover:text-primary hover:bg-linear-to-r hover:from-blue-50/40 hover:to-blue-100/50 hover:border-r-3 hover:border-primary"
              : ""
          } py-3 px-6 mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon />
          {item.label}
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
