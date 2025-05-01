import React from "react";
import Lib1 from "../../assets/images/lib1.svg";
import Lib2 from "../../assets/images/lib2.svg";

const StrategyBacktesting = () => {
  return (
    <div className="min-h-screen StrategyLibraryAdvancedBacktesting-bg text-white p-6 font-euclid">
      <div className="max-w-7xl mx-auto mt-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Strategy Library & Advanced Backtesting
        </h1>
        <div className="xl:w-[500px] 2xl:w-[500px] lg:w-[400px] md:[250px] w-72 h-[3px] bg-[#B039FF] mx-auto mb-4  rounded-full"></div>
        <p className="text-sm md:text-base text-white font-regular mb-12">
          Access pre-built strategies or test your own against historical data
          with professional-grade analytics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strategy Library Section */}
          <div className="bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)] border border-[#3f0d5e] rounded-2xl shadow-lg flex flex-col">
            <div className="mb-0 bg-[#09001D] rounded-2xl">
              <img
                src={Lib1}
                alt="Strategy Graph"
                className="mx-auto h-48 object-contain"
              />
            </div>
            <div className="p-6 text-left">
              <h2 className="text-xl text-[#D5AFFF] font-semibold mb-4">Strategy Library</h2>
              <p className="w-3/4">
                Browse and deploy professionally designed trading strategies
                across multiple market conditions
              </p>
              <div
                className="w-3/4 h-[2px] my-4"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #5C5A84 0 10px, transparent 10px 20px)",
                  opacity: 0.6,
                }}
              ></div>

              <ul className="space-y-3 text-regular text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✔</span> Filter by market
                  type, risk level, and performance metrics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✔</span> See historical
                  performance data for each strategy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✔</span> Deploy with one
                  click or customize to your preferences
                </li>
              </ul>
            </div>
          </div>

          {/* Advanced Backtesting Section */}

          <div className="bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)] border border-[#3f0d5e] rounded-2xl shadow-lg flex flex-col justify-between">
            <div className="p-6 text-left">
              <h2 className="text-xl text-[#D5AFFF] font-semibold mb-4">
                Advanced Backtesting
              </h2>
              <p className="w-3/4">
                Browse and deploy professionally designed trading strategies
                across multiple market conditions
              </p>
              <div
                className="w-3/4 h-[2px] my-4"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #5C5A84 0 10px, transparent 10px 20px)",
                  opacity: 0.6,
                }}
              ></div>
              <ul className="space-y-3 text-sm text-regular">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✔</span> Comprehensive
                  performance metrics and visualizations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✔</span> Test across
                  different market conditions and timeframes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">✔</span> Optimize parameters
                  for maximum efficiency
                </li>
              </ul>
            </div>

            <div className="bg-[#240E4C] mt-auto rounded-2xl">
              <img
                src={Lib2}
                alt="Backtesting Graph"
                className="mx-auto h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBacktesting;
