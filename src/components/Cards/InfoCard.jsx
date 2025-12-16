import React from "react";
import { Label } from "@/components/ui/label";

const InfoCard = ({ label, value, color }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`} />

      {/* <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
        <span className="text-sm md:text-[15px] text-black font-semibold">
          {value}
        </span>
        {label}
      </p> */}

      <Label className="text-xs md:text-sm text-gray-500 dark:text-gray-400 ">
        <span className="text-sm md:text-[15px] text-black font-semibold dark:text-white">
          {value}
        </span>
        {label}
      </Label>
    </div>
  );
};

export default InfoCard;
