import React, { useState, lazy, Suspense } from "react";
const IndianEquity = lazy(() => import("./indianEquity/IndianEquity"));
const UsEquity = lazy(() => import("./usEquity/UsEquity"));

function WhatsNew() {
  const [activeTab, setActiveTab] = useState("indian");

  return (
    <>
      <div className="w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 text-white px-3 py-3 sm:px-4 sm:py-4 md:py-4 md:px-6 rounded-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-gilroy">
            What's New Today
          </h1>

          <div className="flex space-x-1 sm:space-x-2 bg-[#220C39] border border-[#463356] rounded-full p-1 transition-all duration-300 w-full sm:w-auto">
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm font-medium font-gilroy rounded-full transition-all duration-300 flex-1 sm:flex-none
              ${
                activeTab === "indian"
                  ? "bg-gradient-to-br from-[#B039FF] to-[#6A2299] text-white"
                  : "text-white"
              }
            `}
              onClick={() => setActiveTab("indian")}
            >
              Indian Markets
            </button>
            <button
              className={`px-2 sm:px-3 md:px-4 py-1 text-xs sm:text-sm font-medium font-gilroy rounded-full transition-all duration-300 flex-1 sm:flex-none
              ${
                activeTab === "us"
                  ? "bg-gradient-to-br from-[#B039FF] to-[#6A2299] text-white"
                  : "text-white"
              }
            `}
              onClick={() => setActiveTab("us")}
            >
              US markets
            </button>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {activeTab === "indian" && <IndianEquity />}
        {activeTab === "us" && <UsEquity />}
      </Suspense>
    </>
  );
}

export default WhatsNew;
