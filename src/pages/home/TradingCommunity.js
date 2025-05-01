import React from "react";
import Trading from "../../assets/images/trading_community.svg"
const TradingCommunity = () => {
  return (
    <section className="bg-[#0E051B] text-white p-4 md:p-8 border border-[#6A11CB] rounded-lg mb-8">
      {/* Main container with flexible column/row layout */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        {/* Left Section: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={Trading}
            alt="Trading community"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
            loading="lazy"
          />
        </div>
        {/* Right Section: Content */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-4">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Trading Community
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-6">
              Connect, compete, and grow with fellow traders globally
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: "Trading Competitions",
                  description: "Regular contests with real prizes and recognition"
                },
                {
                  title: "Strategy Marketplace",
                  description: "Share and monetize your trading strategies"
                },
                {
                  title: "Trading Hackathons",
                  description: "Build innovative solutions with our community"
                },
                {
                  title: "Reputation System",
                  description: "Earn recognition for your contributions"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1F0B38] p-4 rounded-lg hover:bg-[#2A0F4C] transition-colors duration-300"
                >
                  <h3 className="text-white font-semibold mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingCommunity;