import React from "react";
import { TrendingDown } from "lucide-react";
function BottomPerformingSector() {
  const bottomPerformers = [
    {
      sector: "Realty",
      performance: "-1.2%",
      marketCap: "₹5.4L Cr",
      leader: "Godrej Prop",
      laggard: "DLF",
    },
    {
      sector: "Realty",
      performance: "-1.2%",
      marketCap: "₹5.4L Cr",
      leader: "Godrej Prop",
      laggard: "DLF",
    },
    {
      sector: "Realty",
      performance: "-1.2%",
      marketCap: "₹5.4L Cr",
      leader: "Godrej Prop",
      laggard: "DLF",
    },
  ];
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 flex items-center text-[#F04A4A] justify-center mr-2">
      <TrendingDown/>
        </div>
        <h2 className="text-lg font-euclid font-medium text-[#D5AFFF] font-euclid">Bottom Performing Sectors</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bottomPerformers.map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-[#AB050533] to-[#AB050512] border-l-[4px] border-solid border-[#EA3838] rounded-2xl p-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium font-euclid">{item.sector}</div>
              <div className="text-[#F65555] font-bold font-euclid">{item.performance}</div>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm font-euclid text-white">
              <div>Market Cap:</div>
              <div className="text-right font-regular">{item.marketCap}</div>
              <div>Leader:</div>
              <div className="text-right font-regular">{item.leader}</div>
              <div>Laggard:</div>
              <div className="text-right font-regular">{item.laggard}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomPerformingSector;
