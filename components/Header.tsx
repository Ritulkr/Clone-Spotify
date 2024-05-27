"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface headerProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<headerProps> = ({ children, className }) => {
  const router = useRouter();
  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-4",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            type="button"
            className="rounded-full w-8 h-8 flex items-center justify-center hover:opacity-75 transition bg-black"
          >
            <FaChevronLeft className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            type="button"
            className="rounded-full w-8 h-8 flex items-center justify-center hover:opacity-75 transition bg-black"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
