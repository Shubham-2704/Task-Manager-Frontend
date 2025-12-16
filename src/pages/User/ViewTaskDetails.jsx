import React, { useCallback, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import AvatarGroup from "@/components/AvatarGroup";
import { Checkbox } from "@/components/ui/checkbox";
import { SquareArrowOutUpRight } from "lucide-react";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = React.useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/50 dark:border-cyan-700 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 dark:text-lime-300 bg-lime-50 dark:bg-lime-900/50 dark:border-lime-700 border border-lime-500/20";
      default:
        return "text-violet-500 dark:text-violet-300 bg-violet-50 dark:bg-violet-900/50 dark:border-violet-700 border border-violet-500/10";
    }
  };

  // get Task info by ID
  const getTaskDetailsByID = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );

      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  }, [id]);

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [...task.todoChecklist]; // Create a copy of the todoChecklist array
    const taskId = id;

    if (todoChecklist && todoChecklist[index]) {
      todoChecklist[index].completed = !todoChecklist[index].completed;

      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
          { todoChecklist }
        );

        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          // Optionally revert the toggle if API call fails
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
      } catch (error) {
        console.error("Error updating todo checklist:", error);
        todoChecklist[index].completed = !todoChecklist[index].completed;
      }
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//.test(link)) {
      link = `https://${link}`; // Default to https
    }

    window.open(link, "_blank");
  };

  useEffect(() => {
    getTaskDetailsByID();
  }, [getTaskDetailsByID]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <Card className="w-full lg:max-w-9/12">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="md:text-xl">{task?.title}</CardTitle>
                <Badge
                  className={`${getStatusTagColor(
                    task?.status
                  )} text-[11px] md:text-[13px] px-4`}
                >
                  {task?.status}
                </Badge>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? format(new Date(task?.dueDate), "do MMM yyyy")
                        : "N/A"
                    }
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <Label className="text-slate-500 dark:text-slate-300 text-xs md:text-sm">
                    Assigned To
                  </Label>
                  <AvatarGroup
                    avatars={
                      task?.assignedTo?.map((item) => item?.profileImageUrl) ||
                      []
                    }
                    maxVisible={5}
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-500 dark:text-slate-300 text-xs md:text-sm">
                  Todo Checklist
                </Label>

                {task?.todoChecklist?.map((task, index) => (
                  <TodoCheckList
                    key={task._id}
                    text={task.text}
                    isChecked={task.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div>
                  <Label className="text-slate-500 dark:text-slate-300 text-xs md:text-sm">
                    Attachments
                  </Label>

                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => {
  return (
    <>
      <Label className="text-slate-500 dark:text-slate-300 text-xs md:text-sm">{label}</Label>
      <p className="mt-1 text-xs md:text-[13px] font-medium text-gray-700 dark:text-white">
        {value}
      </p>
    </>
  );
};

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <Checkbox
        className="cursor-pointer"
        checked={isChecked}
        onCheckedChange={onChange}
      />
      <Label className={"text-xs md:text-sm text-gray-800 dark:text-white"}>{text}</Label>
    </div>
  );
};

const Attachment = ({ link, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-3 py-2 rounded-md mb-3 mt-2 cursor-pointer"
    >
      <Label className="text-xs md:text-sm">
        <span className="text-gray-400 dark:text-gray-300 font-semibold text-xs">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        {link}
      </Label>

      <SquareArrowOutUpRight className="size-4 text-gray-400 dark:text-gray-300" />
    </div>
  );
};

