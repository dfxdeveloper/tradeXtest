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

  // Normalize bar widths to ensure they fit in the container
  const getBarWidth = (value) => {
    const absValue = Math.abs(value);
    // Scale down to make sure bars fit within container (max 40%)
    return `${Math.min(absValue * 0.8, 40)}%`;
  };

  return (
    <div className="p-2 md:p-4 lg:p-6 xl:p-6 text-white">
      <div className="border border-gray-700 rounded-xl p-6 mx-auto">
        <div 
          className="flex items-center p-2 rounded-full border border-gray-700 xl:w-1/4 lg:w-1/3 md:w-1/3 sm:w-2/3 w-full backdrop-blur-3xl mb-4" 
          style={{
            background: "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
          }}
        >
          <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center mr-4">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-sm"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-sm"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-sm"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-xl font-semibold">Sector Heat Map</h1>
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