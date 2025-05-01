import React from "react";

const PremarketReport = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e0036] to-[#290041] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Daily Pre-Market Reports</h1>
          <div className="h-1 w-16 bg-purple-500 mb-4"></div>
          <p className="text-sm md:text-base text-gray-300 max-w-md">
            Comprehensive pre-market analysis delivered before markets open
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-[#1b0130] border border-[#3f0d5e] rounded-2xl p-5 flex items-start gap-4">
              <img src="/mnt/data/3d03a0b0-2ce1-432c-b30d-635986d78fa8.png" alt="Global Summary" className="w-10 h-10 mt-1" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Global Market Summary</h2>
                <p className="text-sm text-gray-300">
                  Start your day with a comprehensive overview of what happened in global markets overnight, including key movements in Asia and Europe that may impact your trading.
                </p>
              </div>
            </div>

            <div className="bg-[#3b003f] border border-[#7b1fa2] rounded-2xl p-5 flex items-start gap-4">
              <img src="/mnt/data/3d03a0b0-2ce1-432c-b30d-635986d78fa8.png" alt="Key Events" className="w-10 h-10 mt-1" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Key Events & Earnings</h2>
                <p className="text-sm text-gray-300">
                  Get a detailed calendar of important economic reports, earnings announcements, and other market-moving events scheduled for the day with expected impact analysis.
                </p>
              </div>
            </div>

            <div className="bg-[#290030] border border-[#9c27b0] rounded-2xl p-5 flex items-start gap-4">
              <img src="/mnt/data/3d03a0b0-2ce1-432c-b30d-635986d78fa8.png" alt="Support Predictions" className="w-10 h-10 mt-1" />
              <div>
                <h2 className="text-lg font-semibold mb-1">Support/Resistance & Predictions</h2>
                <p className="text-sm text-gray-300">
                  Review calculated support and resistance levels for major assets and indices, along with expert analysis and trading ideas based on pre-market movements.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Briefing */}
          <div className="bg-[#1b0130] border border-[#3f0d5e] rounded-2xl p-6 shadow-lg relative">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">Daily Pre-Market Briefing</h2>
              <p className="text-xs text-gray-400">April 20, 2025</p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-purple-300 mb-1">MARKET OVERVIEW</h3>
              <p className="text-sm text-gray-300">
                Futures are pointing to a higher open following strong tech earnings and easing inflation concerns. Asian markets closed mostly higher while European indices are currently trading up 0.3% to 0.8%.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-purple-300 mb-1">TODAY'S EVENTS</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>8:30 AM</span><span>Initial Jobless Claims</span><span className="text-yellow-400">Medium Impact</span></div>
                <div className="flex justify-between"><span>10:00 AM</span><span>Leading Economic Indicators</span><span className="text-green-400">Low Impact</span></div>
                <div className="flex justify-between"><span>After Close</span><span>NFLX Earnings</span><span className="text-red-400">High Impact</span></div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-purple-300 mb-1">KEY LEVELS TO WATCH</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-[#120020] p-2 rounded">
                  <p className="text-purple-300">S&P 500</p>
                  <p className="text-red-400">R: 4,780</p>
                  <p className="text-green-400">S: 4,685</p>
                </div>
                <div className="bg-[#120020] p-2 rounded">
                  <p className="text-purple-300">NASDAQ</p>
                  <p className="text-red-400">R: 15,850</p>
                  <p className="text-green-400">S: 15,350</p>
                </div>
                <div className="bg-[#120020] p-2 rounded">
                  <p className="text-purple-300">BTC/USD</p>
                  <p className="text-red-400">R: 67,800</p>
                  <p className="text-green-400">S: 63,200</p>
                </div>
                <div className="bg-[#120020] p-2 rounded">
                  <p className="text-purple-300">EUR/USD</p>
                  <p className="text-red-400">R: 1.0950</p>
                  <p className="text-green-400">S: 1.0820</p>
                </div>
              </div>
            </div>
            <img src="/mnt/data/3d03a0b0-2ce1-432c-b30d-635986d78fa8.png" alt="Chart Icon" className="absolute -right-6 -top-6 w-14 h-14" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremarketReport;
