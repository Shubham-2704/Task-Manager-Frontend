import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { CalendarIcon, Trash2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema } from "@/lib/schema";
import { PRIORITY_DATA } from "@/utils/data";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import SelectUsers from "@/components/Inputs/SelectUsers";
import TodoListInput from "@/components/Inputs/TodoListInput";
import AddAttachmentsInput from "@/components/Inputs/AddAttachmentsInput";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  // const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const location = useLocation();
  const { taskId } = location.state || {};

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    },
  });

  // Create Task
  const createTask = async (values) => {
    setLoading(true);

    try {
      const todoList = values.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...values,
        dueDate: new Date(values.dueDate).toISOString(),
        todoChecklist: todoList,
      });

      toast.success("Task created successfully");

      form.reset();
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //  Update Task
  const updateTask = async (values) => {
    setLoading(true);
    try {
      const todoList = values.todoChecklist?.map((item) => {
        const prevTodoCheckList = currentTask?.todoChecklist || [];

        const matchedTask = prevTodoCheckList.find(
          (task) => task.text === item
        );

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...values,
        dueDate: new Date(values.dueDate).toISOString(),
        todoChecklist: todoList,
      });

      toast.success("Task updated successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    // console.log(values);
    if (taskId) {
      updateTask(values);
      return;
    }

    createTask(values);
  };

  // get Task info by ID
  const getTaskDetailsByID = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      setCurrentTask(response.data);

      form.setValue("title", response.data?.title);
      form.setValue("description", response.data?.description);
      form.setValue("priority", response.data?.priority);
      form.setValue("dueDate", new Date(response.data?.dueDate));
      form.setValue(
        "assignedTo",
        response.data?.assignedTo?.map((item) => item?._id) || []
      );
      form.setValue(
        "todoChecklist",
        response.data?.todoChecklist?.map((item) => item?.text) || []
      );
      form.setValue("attachments", response.data?.attachments || []);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  }, [form, taskId]);

  // Delete Task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      // setOpenDeleteAlert(false);
      toast.success("Expense details deleted successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    taskId && getTaskDetailsByID();
    form.reset();
  }, [form, getTaskDetailsByID, taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <Card className="my-5">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg md:text-xl">
            {taskId ? "Update Task" : "Create Task"}
          </CardTitle>
          {taskId && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="cursor-pointer bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 border border-rose-100 hover:border-rose-200"
                >
                  <Trash2 /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this task?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Expense details will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={deleteTask}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Task Title</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Create App UI"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Describe task"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <Controller
                    name="priority"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldLabel>Priority</FieldLabel>
                        </FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger aria-invalid={fieldState.invalid}>
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {PRIORITY_DATA.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Controller
                    name="dueDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Due Date</FieldLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              id="date-picker"
                              variant="outline"
                              className="justify-start font-normal cursor-pointer"
                              aria-invalid={fieldState.invalid}
                            >
                              <CalendarIcon className="size-3.5" />
                              <span className="">
                                {field.value ? (
                                  // field.value.toLocaleDateString("en-US", {
                                  //   year: "numeric",
                                  //   month: "short",
                                  //   day: "numeric",
                                  // })
                                  format(field.value, "do MMM yyyy")
                                ) : (
                                  <span>Select date</span>
                                )}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                            // alignOffset={-8}
                            // sideOffset={10}
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Controller
                    name="assignedTo"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Assign To</FieldLabel>
                        <SelectUsers
                          selectedUsers={field.value}
                          setSelectedUsers={(value) => field.onChange(value)}
                          ariaInvalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
              <Controller
                name="todoChecklist"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>TODO Checklist</FieldLabel>
                    <TodoListInput
                      todoList={field.value}
                      setTodoList={(value) => field.onChange(value)}
                      ariaInvalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="attachments"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Add Attachments</FieldLabel>
                    <AddAttachmentsInput
                      attachments={field.value}
                      setAttachments={(value) => field.onChange(value)}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading ? (
                  <>
                    <Spinner />
                    {taskId ? "Updating Task..." : "Creating Task..."}
                  </>
                ) : taskId ? (
                  "UPDATE TASK"
                ) : (
                  "CREATE TASK"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CreateTask;
