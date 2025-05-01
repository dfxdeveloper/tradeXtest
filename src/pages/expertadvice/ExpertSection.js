import React from "react";
import { Search, Filter, TrendingUp, User, Star } from "lucide-react";

const ExpertSection = () => {
  return (
    <div className="text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold">What the Expert Says</h1>

        {/* Search Bar */}
        <div className="relative ">
          <input
            type="text"
            placeholder="Search experts, topics and comments....."
            className="w-full p-4 pl-12 bg-[#F4EFFA] border border-[#6A11CB] rounded-lg text-black placeholder-[#3F3F3F] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#3F3F3F]" />
          <Filter className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-[#F8F5FB] to-[#E6C7FF] rounded-xl p-6 shadow-lg flex justify-between items-center">
            <div>
              <p className="text-md text-[#220C39]">Live Market</p>
              <h2 className="text-2xl text-[#220C39] font-bold">NIFTY 50</h2>
              <p className="text-[#01A164] mt-4 text-xl font-bold">+1.2%</p>
            </div>
            <TrendingUp className="text-green-400 w-10 h-10" />
          </div>

          <div className="bg-gradient-to-r from-[#F8F5FB] to-[#E6C7FF] rounded-xl p-6 shadow-lg flex justify-between items-center">
            <div>
              <p className="text-md text-[#220C39]">Active Experts</p>
              <h2 className="text-2xl text-[#220C39] font-bold">124</h2>
              <p className="text-[#1D65E0] text-xl mt-4 font-bold">Online Now</p>
            </div>
            <User className="text-blue-400 w-10 h-10" />
          </div>

          <div className="bg-gradient-to-r from-[#F8F5FB] to-[#E6C7FF] rounded-xl p-6 shadow-lg flex justify-between items-center">
            <div>
              <p className="text-md text-[#220C39]">Trading Ideas</p>
              <h2 className="text-2xl text-[#220C39] font-bold">89</h2>
              <p className="text-[#6A11CB] text-xl mt-4 font-bold">Today</p>
            </div>
            <Star className="text-purple-400 w-10 h-10" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ExpertSection;
