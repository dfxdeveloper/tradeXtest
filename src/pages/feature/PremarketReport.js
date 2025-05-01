import React from "react";
import Market from "../../assets/images/marketbrief.svg";
import MarkIcon1 from "../../assets/images/markicon1.svg";
import MarkIcon2 from "../../assets/images/markicon2.svg";
import MarkIcon3 from "../../assets/images/markicon3.svg";

const PremarketReport = () => {
  return (
    <div className="min-h-screen font-euclid DailyPre-MarketReports-bg text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Daily Pre-Market Reports
          </h1>
          <div className="w-72 h-[3px] bg-[#B039FF] mb-2 rounded-full"></div>
          <p className="text-sm md:text-base font-regular text-white max-w-md">
            Comprehensive pre-market analysis delivered before markets open
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col space-y-6">
            {/* Card 1 */}
            <div className=" bg-[linear-gradient(88.3deg,rgba(255,255,255,0.0581)_0%,rgba(255,255,255,0.0308)_99.66%)] border-l-[4px] border-solid border-[#B039FF] rounded-2xl p-4 rounded-2xl p-5 flex items-start gap-4 flex-1">
              <img
                src={MarkIcon1}
                alt="Global Summary"
                className="w-10 h-10 mt-1"
              />
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Global Market Summary
                </h2>
                <p className="text-sm text-gray-300">
                  Start your day with a comprehensive overview of what happened
                  in global markets overnight, including key movements in Asia
                  and Europe that may impact your trading.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[linear-gradient(88.3deg,rgba(255,255,255,0.0581)_0%,rgba(255,255,255,0.0308)_99.66%)] border-l-[4px] border-solid border-[#B039FF] rounded-2xl p-5 flex items-start gap-4 flex-1">
              <img
                src={MarkIcon2}
                alt="Key Events"
                className="w-10 h-10 mt-1"
              />
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Key Events & Earnings
                </h2>
                <p className="text-sm text-gray-300">
                  Get a detailed calendar of important economic reports,
                  earnings announcements, and other market-moving events
                  scheduled for the day with expected impact analysis.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[linear-gradient(88.3deg,rgba(255,255,255,0.0581)_0%,rgba(255,255,255,0.0308)_99.66%)] border-l-[4px] border-solid border-[#B039FF] rounded-2xl p-5 flex items-start gap-4 flex-1">
              <img
                src={MarkIcon3}
                alt="Support Predictions"
                className="w-10 h-10 mt-1"
              />
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Support/Resistance & Predictions
                </h2>
                <p className="text-sm text-gray-300">
                  Review calculated support and resistance levels for major
                  assets and indices, along with expert analysis and trading
                  ideas based on pre-market movements.
                </p>
              </div>
            </div>
          </div>
          {/* Right Column - Full Height Image */}
          <div className="h-full flex items-center justify-center">
            <img
              src={Market}
              alt="Chart Icon"
              className="h-full max-h-[780px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremarketReport;
