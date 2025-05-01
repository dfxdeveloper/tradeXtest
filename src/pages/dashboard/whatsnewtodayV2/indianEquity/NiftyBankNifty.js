import React from "react";
import { TrendingUp } from "lucide-react";
import NiftyImage from "../../../../assets/images/nifty_img.svg";

const MarketCard = ({ title, chartImageSrc, levels }) => {
  return (
    <div className="w-full border border-[#6A11CB] font-euclid rounded-xl overflow-hidden shadow-xl">
      <div className="flex justify-between items-center bg-nifty-gradient px-4 py-2 ">
        <h2 className="text-white font-bold font-euclid text-lg">{title}</h2>
        <span className="bg-gradient-to-b from-[#95FF95] to-[#D0FFD0] font-euclid text-[#118C11] px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
          <span className="mr-1 mt-1"><TrendingUp size={14} /></span> Bearish
        </span>
      </div>
      
      <div className="p-4">
        <div className="bg-black rounded-lg mb-4 overflow-hidden">
          <img
            src={chartImageSrc}
            alt={`${title} Chart`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-white font-medium text-sm mb-2 font-euclid">Support Levels</h3>
            {levels.support.map((level, index) => (
              <div
                key={`support-${index}`}
                className="bg-[#220C39] border border-[#48387B] rounded-md mb-2 px-3 py-1.5 flex items-center"
              >
                <span className="w-2 h-2 bg-[#34E67E] rounded-full mr-2"></span>
                <span className="text-white text-sm font-euclid">{level}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-white text-sm mb-2 font-medium font-euclid">Resistance Levels</h3>
            {levels.resistance.map((level, index) => (
              <div
                key={`resistance-${index}`}
                className="bg-[#220C39] border border-[#48387B] rounded-md mb-2 px-3 py-1.5 flex items-center"
              >
                <span className="w-2 h-2 bg-[#E62F2F] rounded-full mr-2"></span>
                <span className="text-white text-sm font-euclid">{level}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-white text-sm mb-2 font-euclid">Technical Signals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-[#220C39] border border-[#48387B] rounded-full px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-[#D5AFFF] font-euclid">MACD</span>
              <span className="text-[#00D200] text-xs font-medium font-euclid">Bullish</span>
            </div>
            <div className="bg-[#220C39] border border-[#48387B] rounded-full px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-[#D5AFFF] font-euclid">MACD</span>
              <span className="text-[#00D200] font-euclid text-xs font-medium">Bullish</span>
            </div>
            <div className="bg-[#220C39] border border-[#48387B] rounded-full px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-[#D5AFFF] font-euclid">MACD</span>
              <span className="text-[#00D200] font-euclid text-xs font-medium">Moving Avg</span>
            </div>
            <div className="bg-[#220C39] border border-[#48387B] rounded-full px-4 py-2 flex items-center justify-between">
              <span className="text-xs font-euclid text-[#D5AFFF]">MACD</span>
              <span className="text-[#00D200] font-euclid text-xs font-medium">Moving Avg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NiftyBankNifty = () => {
  const niftyData = {
    levels: {
      support: ["22,450", "22,450", "22,450", "22,450"],
      resistance: ["22,450", "22,450", "22,450", "22,450"],
    },
  };
  const bankNiftyData = {
    levels: {
      support: ["22,450", "22,450", "22,450", "22,450"],
      resistance: ["22,450", "22,450", "22,450", "22,450"],
    },
  };

  return (
    <div className="lg:p-0 xl:p-0 2xl:p-0 md:p-4 p-2 lg:px-6 xl:px-6 2xl:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto mb-6">
        <MarketCard
          title="NIFTY 50"
          chartImageSrc={NiftyImage}
          levels={niftyData.levels}
        />
        <MarketCard
          title="BANK NIFTY"
          chartImageSrc={NiftyImage}
          levels={bankNiftyData.levels}
        />
      </div>
    </div>
  );
};

export default NiftyBankNifty;