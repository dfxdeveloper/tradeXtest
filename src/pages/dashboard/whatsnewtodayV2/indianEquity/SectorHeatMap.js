import { useState } from "react";
import TopPerformingSectors from "./TopPerformingSectors";
import BottomPerformingSector from "./BottomPerformingSector";
import "./IndianEquity.css"

function SectorHeatMap() {
  const sectors = [
    { name: "IT", performance: -45 },
    { name: "Energy", performance: -40 },
    { name: "Energy", performance: -35 },
    { name: "Energy", performance: 50 },
    { name: "Energy", performance: 40 },
    { name: "Energy", performance: 65 },
  ];

  const getBarWidth = (value) => {
    const absValue = Math.abs(value);
    return `${Math.min(absValue * 0.8, 40)}%`;
  };

  return (
    <div className="p-2 p-2 sm:p-4 lg:p-0 xl:p-0 2xl:p-0 pb-10 lg:px-6 xl:px-6 2xl:px-6 text-white">
        <div 
          className="border border-gray-700 xl:mb-6 2xl:mb-6 lg:mb-6 rounded-xl p-2 sm:p-3 md:p-6 shadow-xl backdrop-blur-3xl"
          style={{
            background:
              "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
          }}
        >
           <div className="flex items-center mb-4 md:mb-4 w-full max-w-xs rounded-full border border-gray-700 backdrop-blur-3xl space-x-2 px-2 py-0.5">
          <svg className="p-1 rounded-full h-9 w-9 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10V7C20 5.9 19.1 5 18 5H6C4.9 5 4 5.9 4 7V10M20 10V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V10M20 10H4M8 3V7M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="6" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
            <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
            <rect x="15" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
          </svg>
          <h2 className="text-lg font-euclid font-semibold truncate">
            Sector heat map
          </h2>
        </div>
        

        <div className="bg-[#220C39] border border-[#48387B] max-w-6xl rounded-xl p-6 mb-6">
          <div className="rounded-lg p-4 relative">
            <hr className="absolute top-[45px] left-[70px] w-[24px] h-px bg-gray-400 z-0" />
            <div className="absolute bottom-0 left-20 h-64 border-l-2 border-white"></div>
            <div className="space-y-4">
              <div className="absolute centric_res bottom-0 2xl:right-[510px] xl:right-[477px] lg:right-[270px] md:right-[278px] right-[115px] h-64 border-l-2 border-white"></div>
              
              {sectors.map((sector, index) => (
                <div key={index} className="flex items-center relative">
                  <div className="w-20 text-sm text-gray-300">
                    {sector.name}
                  </div>
                  <div className="flex-1 relative h-6 rounded">
                    {sector.performance < 0 ? (
                      <div
                        className="absolute top-0 right-1/2 h-full bg-red-400 rounded-l"
                        style={{ width: getBarWidth(sector.performance) }}
                      ></div>
                    ) : null}
                    {sector.performance > 0 ? (
                      <div
                        className="absolute top-0 left-1/2 h-full bg-green-400 rounded-r"
                        style={{ width: getBarWidth(sector.performance) }}
                      ></div>
                    ) : null}
                  </div>
                </div>
              ))}
              
              <hr className="absolute bottom-line bottom-0 right-0 xl:w-[955px] 2xl:w-[1024px] lg:w-[540px] md:w-[557px]  w-[230px] bottom-line h-px bg-gray-400 z-0" />
            </div>
          </div>
        </div>

        <TopPerformingSectors />
        <BottomPerformingSector />
      </div>
      </div>
  );
}

export default SectorHeatMap;