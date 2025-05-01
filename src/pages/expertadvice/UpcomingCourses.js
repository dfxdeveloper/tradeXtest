import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Users, Star } from "lucide-react";

const UpcomingCourses = () => {
  const [masterclass, setMasterclass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterclass = async () => {
      try {
        const response = await axios.get(
          "https://stage.api.tradexpert.ai/api/v1/user/masterclass"
        );
        setMasterclass(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch masterclass data"
        );
        setLoading(false);
      }
    };

    fetchMasterclass();
  }, []);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <div className="text-purple-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!masterclass) {
    return null;
  }

  return (
    <div className="p-4 md:p-6 flex justify-center items-center">
      <div className="w-full bg-[#291B38] border border-[#6A11CB] rounded-2xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="text-white py-3 md:py-4 px-4 md:px-6 text-base md:text-lg font-semibold rounded-t-2xl flex items-center">
          <span className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-[#FFFFFF] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base">
            {masterclass.title || "Advanced Options Trading Masterclass"}
          </span>
        </div>

        <div className="p-4 md:p-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center text-gray-700 space-y-4 md:space-y-0">
            {/* Date */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="text-[#FFD6FF]" size={20} />
                <span className="text-[#FFD6FF] text-sm md:text-base">
                  {masterclass.date || "Feb 15, 2025"}
                </span>
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-3">
              <img
                src="/api/placeholder/48/48"
                alt="Rakesh Shah"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-purple-500 object-cover"
              />
              <div>
                <p className="font-semibold text-[#F6F6F6] text-sm md:text-base">
                  Rakesh Shah <span className="text-[#49BCFF]">✔</span>
                </p>
                <span className="text-xs bg-[#8F55CC] text-[#F6F6F6] px-2 py-1 rounded-lg inline-block">
                  SEBI RA (INH000903456)
                </span>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Description */}
          <p className="text-[#F6F6F6] w-full md:w-[60%] lg:w-[40%] font-semibold text-sm md:text-base">
            {masterclass.description ||
              "Master advanced options strategies with live market analysis. Includes 1-month mentorship."}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 items-center justify-between mt-4 text-purple-500 font-medium">
            <div className="flex flex-wrap gap-2">
              {masterclass.tags &&
                masterclass.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="cursor-pointer text-[#B97FF3] text-sm md:text-base"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <button className="w-full md:w-auto bg-gradient-to-r from-[#B039FF] to-[#6A11CB] hover:bg-purple-600 text-white px-4 md:px-6 py-2 rounded-full text-base md:text-lg shadow-md transition-all duration-300">
              {masterclass.buttonText || "Join Waitlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCourses;
