import React, { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="flex gap-5 bg-white border border-b  dark:bg-black border-gray-200/50 dark:border-gray-700/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black dark:text-white "
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <X className="text-2xl cursor-pointer" />
        ) : (
          <Menu className="text-2xl cursor-pointer" />
        )}
      </button>

      <div className="flex  flex-1 items-center justify-between">
        <h2 className="text-lg font-medium text-black dark:text-white">
          Task Flow
        </h2>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Sun className="w-5 h-5 text-gray-300" />
          )}
        </button>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white dark:bg-gray-900 border-r border-gray-200/50 dark:border-gray-800 h-[calc(100vh-62px)] z-40 shadow-lg">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
