import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // profileImageUrl: z.string().optional(),
  adminInviteToken: z.string().optional(),
});

export const createTaskSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  priority: z.enum(["Low", "Medium", "High"], {
    error: "Priority is required",
  }),
  dueDate: z.date({ error: "Due date is required" }),
  assignedTo: z.array(z.string()).refine((value) => value.length > 0, {
    error: "Task not assigned to any member",
  }),
  todoChecklist: z.array(z.string()).refine((value) => value.length > 0, {
    error: "Add at least one todo task",
  }),
  attachments: z.array(z.string()).optional(),
});
