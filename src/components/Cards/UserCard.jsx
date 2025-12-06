import React from "react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserCard = ({ userInfo }) => {
  return (
    <Item className="user-card">
      <ItemMedia variant="image" className="size-12">
        <Avatar className="size-12 border-2 border-white">
          <AvatarImage src={userInfo.profileImageUrl} />
          <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{userInfo.name}</ItemTitle>
        <ItemDescription>{userInfo.email}</ItemDescription>
      </ItemContent>
      <ItemFooter className="items-end">
        <StatCard
          label="Pending"
          count={userInfo.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo.completedTasks || 0}
          status="Completed"
        />
      </ItemFooter>
    </Item>

    // <div className="user-card">
    //   {/* <div className="flex items-center justify-between"> */}
    //   <div className="flex items-center gap-3">
    //     <Avatar className="size-12 border-2 border-white">
    //       <AvatarImage
    //         src={userInfo.profileImageUrl}
    //         className="object-cover"
    //       />
    //       <AvatarFallback>{userInfo.name[0]}</AvatarFallback>
    //     </Avatar>

    //     <div>
    //       <p className="text-sm font-medium">{userInfo.name}</p>
    //       <p className="text-xs text-gray-500">{userInfo.email}</p>
    //     </div>
    //   </div>
    //   {/* </div> */}

    //   <div className="flex items-end gap-3 mt-5">
    //     <StatCard
    //       label="Pending"
    //       count={userInfo.pendingTasks || 0}
    //       status="Pending"
    //     />
    //     <StatCard
    //       label="In Progress"
    //       count={userInfo.inProgressTasks || 0}
    //       status="In Progress"
    //     />
    //     <StatCard
    //       label="Completed"
    //       count={userInfo.completedTasks || 0}
    //       status="Completed"
    //     />
    //   </div>
    // </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50";
      case "Completed":
        return "text-indigo-500 bg-indigo-50";

      default:
        return "text-violet-500 bg-violet-50";
    }
  };

  return (
    <div
      className={`flex-1 text-[10px] md:text-xs font-medium ${getStatusColor()} px-4 py-1 rounded`}
    >
      <span className="font-semibold">{count}</span>
      <br />
      {label}
    </div>
  );
};
