"use client";

import React from "react";

interface rightBarProps {
  children: React.ReactNode;
}

const RightBar: React.FC<rightBarProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center px-4 py-6 w-20 gap-6 ">
      {children}
    </div>
  );
};

export default RightBar;
