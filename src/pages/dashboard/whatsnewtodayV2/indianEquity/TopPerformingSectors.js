import React from 'react'
import {TrendingUp} from "lucide-react"
function TopPerformingSectors() {
    const topPerformers = [
        {
          sector: "Realty",
          performance: "+0.6%",
          marketCap: "₹5.4L Cr",
          leader: "Godrej Prop",
          laggard: "DLF",
        },
        {
          sector: "Realty",
          performance: "+0.6%",
          marketCap: "₹5.4L Cr",
          leader: "Godrej Prop",
          laggard: "DLF",
        },
        {
          sector: "Realty",
          performance: "+0.6%",
          marketCap: "₹5.4L Cr",
          leader: "Godrej Prop",
          laggard: "DLF",
        },
      ];

  return (
    <div className="mb-6">
    <div className="flex items-center mb-4">
      <div className="w-6 h-6 flex items-center text-[#00D200] justify-center mr-2">
      <TrendingUp/>
      </div>
      <h2 className="text-lg font-medium font-euclid text-[#D5AFFF]">Top Performing Sectors</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {topPerformers.map((item, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-[#0FEDBE52] to-[#09876C00] border-l-[4px] border-solid border-[#0FEDBE] rounded-2xl p-4"
        >

          <div className="flex justify-between mb-2">
            <div className="font-medium font-euclid">{item.sector}</div>
            <div className="text-[#00D200] font-bold font-euclid">{item.performance}</div>
          </div>
          <div className="grid grid-cols-2 gap-y-2 font-euclid text-sm text-white">
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
  )
}

export default TopPerformingSectors