import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        // Light: bg-green-100, text-green-500. Dark: bg-green-900/50 (subtle dark bg), text-green-300 (lighter text)
        return "bg-green-100 text-green-500 border border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700";
      case "Pending":
        // Light: bg-purple-100, text-purple-500. Dark: bg-purple-900/50, text-purple-300
        return "bg-purple-100 text-purple-500 border border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700";
      case "In Progress":
        // Light: bg-cyan-100, text-cyan-500. Dark: bg-cyan-900/50, text-cyan-300
        return "bg-cyan-100 text-cyan-500 border border-cyan-200 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-700";
      default:
        // Light: bg-gray-100, text-gray-500. Dark: bg-gray-700, text-gray-300
        return "bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        // Light: bg-red-100, text-red-500. Dark: bg-red-900/50, text-red-300
        return "bg-red-100 text-red-500 border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700";
      case "Medium":
        // Light: bg-orange-100, text-orange-500. Dark: bg-orange-900/50, text-orange-300
        return "bg-orange-100 text-orange-500 border border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700";
      case "Low":
        // (Reusing green for Low priority as per original code)
        return "bg-green-100 text-green-500 border border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };
  return (
    <Table>
      <TableCaption>A list of your recently created tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Created On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <Badge className={getStatusBadgeColor(item.status)}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getPriorityBadgeColor(item.priority)}>
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell>
              {item.createdAt ? format(item.createdAt, "do MMM yyyy") : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskListTable;
