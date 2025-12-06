import React from "react";

const NoData = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default NoData;
