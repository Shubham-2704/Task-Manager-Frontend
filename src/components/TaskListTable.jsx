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
        return "bg-green-100 text-green-500 border border-green-200";
      case "Pending":
        return "bg-purple-100 text-purple-500 border border-purple-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-500 border border-cyan-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-500 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-500 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-500 border border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
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
