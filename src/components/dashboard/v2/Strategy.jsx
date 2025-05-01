import React, { useEffect, useState } from "react";
import { BarChart } from "lucide-react";
import axiosInstance from "../../../utils/axiosHelper";
import axios from "axios";

const Strategy = ({ onViewAllStrategiesClick, strategySignalTotalCount }) => {
  const [strategies, setStrategies] = useState(null);
  const [category, setCategory] = useState("price");

  const fetchStrategies = async (signal) => {
    try {
      const response = await axiosInstance.get("user/strategy", { signal });
      if (!response?.data?.length) throw new Error("No strategies found!");
      setStrategies(
        response.data.reduce(
          (acc, categoryGroup) => {
            const categoryName = categoryGroup.category;
            acc[categoryName] = categoryGroup.strategies;
            return acc;
          },
          {
            price: [],
            volume: [],
            momentum: [],
            volatility: [],
            statistical: [],
            Combination: [],
          }
        )
      );
    } catch (error) {
      if (!axios.isCancel(error)) setStrategies(null);
    }
  };

  const handleCategorySelection = (category) => setCategory(category);

  useEffect(() => {
    const controller = new AbortController();
    fetchStrategies(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="border border-gray-600 rounded-lg text-white  p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-4 w-full">
          <div className="flex flex-wrap items-center">
            <div
              className="flex items-center rounded-full p-1 gap-1 sm:gap-2 mr-1 sm:mr-2"
              style={{
                background:
                  "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)",
                borderImageSource:
                  "linear-gradient(92.64deg, rgba(255, 255, 255, 0.5) -13.07%, rgba(255, 255, 255, 0) 6.86%, rgba(255, 255, 255, 0) 88.43%, rgba(255, 255, 255, 0.21) 104.39%)",
                borderImageSlice: 1,
              }}
            >
              <BarChart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-300" />
              <h1 className="text-sm sm:text-lg md:text-xl font-medium">
                Recent Strategy Signals
              </h1>
            </div>
            {/* <span className="text-xs sm:text-sm text-[#FFB54D] ml-1 sm:ml-2">
              • {strategySignalTotalCount} Stocks in Recent
            </span> */}
          </div>

          <button
            onClick={() => onViewAllStrategiesClick(null)}
            className="text-xs sm:text-sm text-[#DCA6FF] font-gilroy font-semibold hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span className="text-xs sm:text-sm md:text-base font-medium">
              View all
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3 sm:w-4 sm:h-4"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 md:gap-4 bg-[#251748] rounded-full overflow-x-auto p-2 sm:p-3 mb-4 sm:mb-6 no-scrollbar">
          {strategies &&
            Object.keys(strategies).map((tab, index) => (
              <button
                key={`strategy-category-${index}`}
                type="button"
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
                  tab === category
                    ? "bg-[linear-gradient(186.67deg,_#B039FF_17.19%,_#6A2299_95.59%)] text-white"
                    : "text-white hover:bg-[#2a2750]"
                } capitalize`}
                onClick={() => handleCategorySelection(tab)}
              >
                {tab}
              </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {strategies &&
            strategies[category]
              .filter((s) => s.name !== "super_trend_strategy")
              .map((strategy, index) => (
                <div
                  key={`strategy-name-${index}`}
                  className="bg-[linear-gradient(89.92deg,_#1B022B_0.05%,_#57068D_99.92%)] rounded-2xl p-3 sm:p-4 md:p-6 text-white border border-[#6A11CB]"
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                    <div className="bg-[linear-gradient(180deg,_#CA7BFF_0%,_#5795FF_100%)] px-2.5 py-1.5 rounded-full">
                      {/* <Users size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /> */}
                      <span className="text-white font-medium">
                        {strategy.label &&
                          strategy.label.replace(
                            /^(\S)\S*\s+(\S)\S*.*$/,
                            "$1$2"
                          )}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-gilroy">
                      {strategy.label === "Golden Cross Strategy"
                        ? "Golden/Death Cross Strategy"
                        : strategy.label}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 text-white font-regular font-gilroy">
                    {strategy.description}
                  </p>
                  <button
                    className="bg-[#B039FF] hover:bg-[#a85cf8] font-regular font-gilroy text-white text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full"
                    type="button"
                    onClick={() => onViewAllStrategiesClick(strategy)}
                  >
                    View
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Strategy;
