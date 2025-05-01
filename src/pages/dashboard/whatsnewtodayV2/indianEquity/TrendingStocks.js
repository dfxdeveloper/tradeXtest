import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Zap
} from "lucide-react";

import AiIcon from "../../../../assets/images/ai_icon.svg"

const mockData = {
  gainers: new Array(5).fill({
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    ltp: "1687.5",
    change: "47.2",
    percent: "+2.8%",
    volume: "2.4M",
  }),
  losers: new Array(5).fill({
    symbol: "INFY",
    name: "Infosys Ltd",
    ltp: "1320.5",
    change: "-35.6",
    percent: "-2.6%",
    volume: "1.8M",
  }),
  active: new Array(5).fill({
    symbol: "RELIANCE",
    name: "Reliance Industries",
    ltp: "2405.0",
    change: "10.0",
    percent: "+0.42%",
    volume: "5.2M",
  }),
};

const TABS = [
  { label: "Top Gainers", key: "gainers", icon: TrendingUp, color: "text-[#00D200]" },
  { label: "Top Losers", key: "losers", icon: TrendingDown, color: "text-[#EC4848]" },
  { label: "Most Active", key: "active", icon: Zap, color: "text-[#2575FC]" },
];

const TrendingStocks = () => {
  const [activeTab, setActiveTab] = useState("gainers");
  const stocks = mockData[activeTab];

  return (
    <div className="text-white mb-4 md:p-4 p-2 pb-10 pt-5 lg:px-6 xl:px-6 2xl:px-6 w-full">
      <div 
        className="border border-gray-700 mt-2 rounded-xl overflow-hidden shadow-xl backdrop-blur-3xl"
        style={{
          background: "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
        }}
      >
        <div className="p-2 sm:p-3 md:p-6">
          <div className="flex items-center md:mb-2 w-full max-w-xs rounded-full border border-gray-700 backdrop-blur-3xl space-x-2 px-2 py-0.5">
            <img className="p-1 rounded-full h-9 w-9" src={AiIcon} alt="AI Icon" />
            <h2 className="text-xl font-euclid font-semibold truncate">
              Trending Stocks
            </h2>
          </div>
          <div className="mt-5 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="flex justify-between text-xs md:text-base font-medium min-w-max">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                
                return (
                  <button
                    key={tab.key}
                    className={`flex items-center gap-1 text-xs sm:text-sm md:text-lg font-euclid font-bold pb-1 sm:pb-2 border-b-2 mx-2 sm:mx-4 transition-colors ${
                      isActive
                        ? "text-[#D5AFFF] border-blue-500" 
                        : "border-transparent text-[#D5AFFF]"
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <Icon size={14} className={`${tab.color} hidden sm:block`} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="min-w-[520px]">
              <div className="bg-[#3b2b7b] w-full sticky top-0 z-20">
                <div className="grid grid-cols-12 gap-1 px-4 py-3 text-[11px] sm:text-xs md:text-sm font-semibold">
                  <div className="col-span-5 sm:col-span-4">Symbol & Company</div>
                  <div className="col-span-2 sm:col-span-2 text-center sm:text-left">LTP (₹)</div>
                  <div className="col-span-2 sm:col-span-2 2xl:mx-0 xl:mx:0 lg:mx:0 md:mx:0 mx-5">Change</div>
                  <div className="col-span-1 sm:col-span-2 text-center sm:text-left">% Change</div>
                  <div className="col-span-2 sm:col-span-2 text-right sm:text-left">Volume</div>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {stocks.map((stock, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-1 px-4 py-3 items-center text-[11px] sm:text-xs md:text-sm hover:bg-[#2a1c45] transition-colors"
                  >
                    <div className="col-span-5 sm:col-span-4 flex items-center gap-2 font-euclid font-semibold">
                      <div className="bg-gradient-to-b from-[#CA7BFF] to-[#5795FF] text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs">
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div className="overflow-hidden">
                        <div className="truncate">{stock.symbol}</div>
                        <div className="text-gray-300 text-[10px] sm:text-xs truncate max-w-[100px] sm:max-w-full">
                          {stock.name}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-2 text-center sm:text-left font-semibold">{stock.ltp}</div>
                    <div className="col-span-2 sm:col-span-2 flex justify-center sm:justify-start">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold inline-flex items-center gap-1 ${
                          stock.change.startsWith("-") ? "bg-red-600" : "bg-[#002E00] border border-[#1CB540]"
                        }`}
                      >
                        <TrendingUp
                          size={10}
                          className={`${stock.change.startsWith("-") ? "rotate-180" : "text-[#00D200]"} hidden sm:inline`}
                        />
                        {stock.change}
                      </span>
                    </div>
                    <div className="col-span-1 sm:col-span-2 text-center sm:text-left font-semibold">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs ${
                          stock.percent.startsWith("-") ? "bg-red-600" : "bg-[#002E00] border border-[#1CB540]"
                        }`}
                      >
                        {stock.percent}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-2 text-right sm:text-left font-semibold">{stock.volume}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingStocks;