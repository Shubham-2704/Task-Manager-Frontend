import {
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  SquarePlus,
  Users,
} from "lucide-react";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Manage Tasks",
    icon: ClipboardCheck,
    path: "/admin/tasks",
  },
  {
    id: "03",
    label: "Create Task",
    icon: SquarePlus,
    path: "/admin/create-task",
  },
  {
    id: "04",
    label: "Team Members",
    icon: Users,
    path: "/admin/users",
  },
  {
    id: "05",
    label: "Logout",
    icon: LogOut,
    path: "logout",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "My Tasks",
    icon: ClipboardCheck,
    path: "/user/tasks",
  },
  {
    id: "03",
    label: "Logout",
    icon: LogOut,
    path: "logout",
  },
];

export const PRIORITY_DATA = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

export const STATUS_DATA = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];
