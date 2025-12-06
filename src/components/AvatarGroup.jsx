import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarGroup = ({ avatars, maxVisible }) => {
  return (
    <div className="flex items-center">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <Avatar
          key={index}
          className="w-9 h-9 border-2 rounded-full border-white -ml-3 first:ml-0"
        >
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback className="text-sm font-medium">
            {avatar}
          </AvatarFallback>
        </Avatar>
      ))}
      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
