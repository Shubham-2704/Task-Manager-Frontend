import React from "react";
import AvatarGroup from "../AvatarGroup";
import { Paperclip } from "lucide-react";
import { format } from "date-fns";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

const TaskCard = ({ task, onClick }) => {
  const {
    title,
    description,
    priority,
    status,
    createdAt,
    dueDate,
    progress,
    completedTodoCount,
    todoChecklist,
  } = task;

  const assignedTo = task.assignedTo.map((user) => user.profileImageUrl);
  const attachmentCount = task.attachments?.length || 0;

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        // Light Mode: text-cyan-500, bg-cyan-50
        // Dark Mode: text-cyan-300, bg-cyan-900/50, border-cyan-700
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10 dark:text-cyan-300 dark:bg-cyan-900/50 dark:border-cyan-700";
      case "Completed":
        // Light Mode: text-lime-500, bg-lime-50
        // Dark Mode: text-lime-300, bg-lime-900/50, border-lime-700
        return "text-lime-500 bg-lime-50 border border-lime-500/20 dark:text-lime-300 dark:bg-lime-900/50 dark:border-lime-700";
      default:
        // Light Mode: text-violet-500, bg-violet-50
        // Dark Mode: text-violet-300, bg-violet-900/50, border-violet-700
        return "text-violet-500 bg-violet-50 border border-violet-500/10 dark:text-violet-300 dark:bg-violet-900/50 dark:border-violet-700";
    }
  };

  const getPriorityTagColor = (priority) => {
    switch (priority) {
      case "Low":
        // Light Mode: text-emerald-500, bg-emerald-50
        // Dark Mode: text-emerald-300, bg-emerald-900/50, border-emerald-700
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10 dark:text-emerald-300 dark:bg-emerald-900/50 dark:border-emerald-700";
      case "Medium":
        // Light Mode: text-amber-500, bg-amber-50
        // Dark Mode: text-amber-300, bg-amber-900/50, border-amber-700
        return "text-amber-500 bg-amber-50 border border-amber-500/10 dark:text-amber-300 dark:bg-amber-900/50 dark:border-amber-700";
      default:
        // Light Mode: text-rose-500, bg-rose-50
        // Dark Mode: text-rose-300, bg-rose-900/50, border-rose-700
        return "text-rose-500 bg-rose-50 border border-rose-500/10 dark:text-rose-300 dark:bg-rose-900/50 dark:border-rose-700";
    }
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case "In Progress":
        // Light Mode: border-l-cyan-500
        // Dark Mode: border-l-cyan-400 (slightly lighter for contrast)
        return "border-l-cyan-500 dark:border-l-cyan-400";
      case "Completed":
        // Light Mode: border-l-indigo-500
        // Dark Mode: border-l-indigo-400
        return "border-l-indigo-500 dark:border-l-indigo-400";
      default:
        // Light Mode: border-l-violet-500
        // Dark Mode: border-l-violet-400
        return "border-l-violet-500 dark:border-l-violet-400";
    }
  };
  return (
    <Item
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200/80 dark:border-gray-700/80 cursor-pointer border-l-4 ${getStatusBorderColor()}`}
    >
      <div className="flex items-end gap-3">
        <ItemTitle
          className={`text-xs font-medium px-3 py-1 rounded ${getStatusTagColor()}`}
        >
          {status}
        </ItemTitle>
        <ItemTitle
          className={`text-xs font-medium px-3 py-1 rounded ${getPriorityTagColor()}`}
        >
          {priority} Priority
        </ItemTitle>
      </div>

      <div className="w-full">
        <ItemTitle className="text-sm">{title}</ItemTitle>
        <ItemDescription className="text-xs mt-1.5">
          {description}
        </ItemDescription>
        <p className="text-[13px]  text-gray-700/80 dark:text-gray-400 font-medium my-2 leading-[18px]">
          Task Done:{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>

        <Progress value={progress} className="w-full" status={status} />
      </div>

      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-xs text-gray-500 dark:text-gray-300">
              Start Date
            </Label>
            <p className="text-[13px] font-medium text-gray-900 dark:text-gray-200">
              {createdAt && format(new Date(createdAt), "do MMM yyyy")}
            </p>
          </div>
          <div>
            <Label className="text-xs text-gray-500 dark:text-gray-300">
              Due Date
            </Label>
            <p className="text-[13px] font-medium text-gray-900 dark:text-gray-200">
              {dueDate && format(new Date(dueDate), "do MMM yyyy")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-blue-100 px-2.5 py-1.5 rounded-lg">
              <Paperclip className="w-4 h-4 text-primary" />
              <span className="text-xs text-gray-900 dark:text-black font-medium">
                {attachmentCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </Item>
  );
};

export default TaskCard;
