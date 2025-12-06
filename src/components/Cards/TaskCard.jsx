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

  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  const getStatusBorderColor = () => {
    switch (status) {
      case "In Progress":
        return "border-l-cyan-500";
      case "Completed":
        return "border-l-indigo-500";
      default:
        return "border-l-violet-500";
    }
  };

  return (
    <Item
      onClick={onClick}
      className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200/80 cursor-pointer border-l-4 ${getStatusBorderColor()}`}
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
        <p className="text-[13px] text-gray-700/80 font-medium my-2 leading-[18px]">
          Task Done:{" "}
          <span className="font-semibold text-gray-700">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>

        <Progress value={progress} className="w-full" status={status} />
      </div>

      <div className="w-full space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-xs text-gray-500">Start Date</Label>
            <p className="text-[13px] font-medium text-gray-900">
              {createdAt && format(new Date(createdAt), "do MMM yyyy")}
            </p>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Due Date</Label>
            <p className="text-[13px] font-medium text-gray-900">
              {dueDate && format(new Date(dueDate), "do MMM yyyy")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <AvatarGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-blue-100 px-2.5 py-1.5 rounded-lg">
              <Paperclip className="w-4 h-4 text-primary" />
              <span className="text-xs text-gray-900 font-medium">
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
