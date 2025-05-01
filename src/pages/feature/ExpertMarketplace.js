import React from "react";

const ExpertMarketplace = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e0036] to-[#290041] text-white p-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Expert Marketplace</h1>
        <div className="h-1 w-16 bg-purple-500 mx-auto mb-2"></div>
        <p className="text-sm md:text-base text-gray-300">Learn from Trading Professionals</p>
        <p className="italic text-purple-200 mt-2 mb-10">
          "Connect with verified experts for personalized guidance and education"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1b0130] border border-[#3f0d5e] rounded-2xl p-6 shadow-lg flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Daily Expert Insights with sample preview</h2>
              <p className="text-sm md:text-base text-gray-300">
                Start your trading day with professional analysis and actionable recommendations from verified experts
              </p>
            </div>
            <img src="/mnt/data/f7ce0178-56ff-406f-beb4-38ddf5a0fb00.png" alt="Expert Insights" className="w-28 md:w-36" />
          </div>

          <div className="bg-[#1b0130] border border-[#3f0d5e] rounded-2xl p-6 shadow-lg flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">Premium Trading Courses</h2>
              <p className="text-sm md:text-base text-gray-300">
                Access structured educational content designed by industry professionals to elevate your trading knowledge
              </p>
            </div>
            <img src="/mnt/data/f7ce0178-56ff-406f-beb4-38ddf5a0fb00.png" alt="Trading Courses" className="w-28 md:w-36" />
          </div>

          <div className="bg-[#1b0130] border border-[#3f0d5e] rounded-2xl p-6 shadow-lg flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">1-on-1 Mentorship</h2>
              <p className="text-sm md:text-base text-gray-300">
                Schedule personalized coaching sessions with experienced traders who match your trading style and goals
              </p>
            </div>
            <img src="/mnt/data/f7ce0178-56ff-406f-beb4-38ddf5a0fb00.png" alt="Mentorship" className="w-28 md:w-36" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertMarketplace;
