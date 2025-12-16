import React from "react";
import { Button } from "@/components/ui/button";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2">
      {tabs.map((tab) => (
        <Button
          key={tab.label}
          variant={"none"}
          className={`relative cursor-pointer ${
            activeTab === tab.label
              ? "text-primary"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
          onClick={() => setActiveTab(tab.label)}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs dark:text-gray-400">{tab.label}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.label
                  ? "bg-primary text-white"
                  : "bg-gray-200/70 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              {tab.count}
            </span>
          </div>
          {activeTab === tab.label && (
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
          )}
        </Button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
