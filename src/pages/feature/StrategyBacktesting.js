import React from "react";

const StrategyBacktesting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e0036] to-[#290041] text-white p-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Strategy Library & Advanced Backtesting</h1>
        <div className="h-1 w-16 bg-purple-500 mx-auto mb-6"></div>
        <p className="text-sm md:text-base text-gray-300 mb-12">
          Access pre-built strategies or test your own against historical data with professional-grade analytics
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strategy Library Section */}
          <div className="bg-[#1b0130] border border-[#3f0d5e] rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <img src="/mnt/data/9d9de516-eeb5-483d-bdc5-9fd506dfa695.png" alt="Strategy Graph" className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Strategy Library</h2>
            <ul className="space-y-3 text-left text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✔</span> Filter by market type, risk level, and performance metrics
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✔</span> See historical performance data for each strategy
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✔</span> Deploy with one click or customize to your preferences
              </li>
            </ul>
          </div>

          {/* Advanced Backtesting Section */}
          <div className="bg-[#1b0130] border border-[#3f0d5e] rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <img src="/mnt/data/9d9de516-eeb5-483d-bdc5-9fd506dfa695.png" alt="Backtesting Graph" className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Advanced Backtesting</h2>
            <ul className="space-y-3 text-left text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✔</span> Comprehensive performance metrics and visualizations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✔</span> Test across different market conditions and timeframes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✔</span> Optimize parameters for maximum efficiency
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyBacktesting;
