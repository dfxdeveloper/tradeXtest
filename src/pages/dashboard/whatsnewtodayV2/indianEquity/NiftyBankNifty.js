import React from "react";
import {TrendingUp} from "lucide-react"
import NiftyImage from "../../../../assets/images/nifty_img.svg";

const MarketCard = ({ title, chartImageSrc, levels }) => {
  return (
    <div className="w-full bg-gradient-to-br from-purple-800 to-indigo-900 font-gilroy rounded-xl p-4 shadow-xl">
      {/* Header with title and indicator */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-white font-bold text-lg">{title}</h2>
        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
          <span className="mr-1"><TrendingUp/></span> Bearish
        </span>
      </div>

      {/* Chart Image */}
      <div className="bg-black rounded-lg mb-4 overflow-hidden">
        <img
          src={chartImageSrc}
          alt={`${title} Chart`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Support and Resistance Levels */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Support Levels */}
        <div>
          <h3 className="text-white text-sm mb-2">Support Levels</h3>
          {levels.support.map((level, index) => (
            <div
              key={`support-${index}`}
              className="bg-indigo-900 border border-indigo-800 rounded-md mb-2 px-3 py-1.5 flex items-center"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span className="text-white text-sm">{level}</span>
            </div>
          ))}
        </div>

        {/* Resistance Levels */}
        <div>
          <h3 className="text-white text-sm mb-2">Resistance Levels</h3>
          {levels.resistance.map((level, index) => (
            <div
              key={`resistance-${index}`}
              className="bg-indigo-900 border border-indigo-800 rounded-md mb-2 px-3 py-1.5 flex items-center"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span className="text-white text-sm">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Signals - Updated to 2x2 grid layout */}
      <div>
        <h3 className="text-white text-sm mb-2">Technical Signals</h3>
        <div className="grid grid-cols-2 gap-2">
          {/* First Row */}
          <div className="bg-indigo-900 border border-indigo-800 rounded-full px-4 py-1 flex items-center justify-between">
            <span className="text-white text-xs">MACD</span>
            <span className="text-green-400 text-xs font-medium">Bullish</span>
          </div>
          <div className="bg-indigo-900 border border-indigo-800 rounded-full px-4 py-1 flex items-center justify-between">
            <span className="text-white text-xs">MACD</span>
            <span className="text-green-400 text-xs font-medium">Bullish</span>
          </div>

          {/* Second Row */}
          <div className="bg-indigo-900 border border-indigo-800 rounded-full px-4 py-1 flex items-center justify-between">
            <span className="text-white text-xs">MACD</span>
            <span className="text-green-400 text-xs font-medium">
              Moving Avg
            </span>
          </div>
          <div className="bg-indigo-900 border border-indigo-800 rounded-full px-4 py-1 flex items-center justify-between">
            <span className="text-white text-xs">MACD</span>
            <span className="text-green-400 text-xs font-medium">
              Moving Avg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NiftyBankNifty = () => {
  // Data for NIFTY 50
  const niftyData = {
    levels: {
      support: ["22,450", "22,450", "22,450", "22,450"],
      resistance: ["22,450", "22,450", "22,450", "22,450"],
    },
  };

  // Data for BANK NIFTY
  const bankNiftyData = {
    levels: {
      support: ["22,450", "22,450", "22,450", "22,450"],
      resistance: ["22,450", "22,450", "22,450", "22,450"],
    },
  };

  return (
    <div className="p-2 md:p-4 lg:p-6 xl:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto">
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
