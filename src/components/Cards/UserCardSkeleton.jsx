import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const UserCardSkeleton = () => {
  return [...Array(9)].map((_, index) => (
    <div key={index} className="p-4 border rounded-md">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="flex items-end gap-3 mt-5">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  ));
};

export default UserCardSkeleton;
