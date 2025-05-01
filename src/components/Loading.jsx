import React from "react";

function Loading({ text }) {
  return (
    <div className="min-h-screen bg-[#0A0415] flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
        <p className="text-white text-lg">{text ?? "Loading..."}</p>
      </div>
    </div>
  );
}

export default Loading;
