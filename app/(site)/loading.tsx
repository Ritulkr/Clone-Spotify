"use client";

import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur flex items-center justify-center bg-black/50">
      <PuffLoader size={40} color="#10B981" />
    </div>
  );
};

export default Loading;
