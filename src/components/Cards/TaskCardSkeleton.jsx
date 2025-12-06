import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TaskCardSkeleton = () => {
  return [...Array(6)].map((_, index) => (
    <Card key={index}>
      <CardHeader>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </CardContent>
    </Card>
  ));
};

export default TaskCardSkeleton;
