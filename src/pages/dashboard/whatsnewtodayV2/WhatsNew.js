import React, { useState, lazy, Suspense } from "react";
const IndianEquity = lazy(() => import("./indianEquity/IndianEquity"));

function WhatsNew() {
  return (
    <>
      <div className="w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 text-white lg:px-6 xl:px-6 md:px-4 2xl:px-6 px-2 mt-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 ">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-gilroy">
            What's New Today
          </h1>
        </div>
      </div>
      <IndianEquity/>
    </>
  );
}

export default WhatsNew;
