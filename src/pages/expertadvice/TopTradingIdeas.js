import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const TopTradingIdeas = () => {
  const [tradingIdeas, setTradingIdeas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTradingIdeas = async () => {
      try {
        const response = await axios.get(
          "https://stage.api.tradexpert.ai/api/v1/user/tradingideas"
        );
        setTradingIdeas(
          Array.isArray(response.data.data) ? response.data.data : []
        );
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch trading ideas"
        );
        setTradingIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTradingIdeas();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= tradingIdeas.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? tradingIdeas.length - 1 : prevIndex - 1
    );
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    }
    return `${hours}h ago`;
  };

  if (loading)
    return (
      <div className="p-6 py-10 text-center">
        <p className="text-white">Loading trading ideas...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 py-10 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="p-6 py-10 relative bg-[#14011F]">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-2xl text-white font-bold">Top Trading Ideas</h1>

        <div className="relative">
          {/* Sliding Wrapper */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out items-stretch"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {tradingIdeas.map((profile, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 flex-shrink-0 px-3 flex"
                >
                  <div className="bg-gradient-to-r from-[#F6F3FF] to-[#CD9CF2] rounded-xl p-6 shadow-lg space-y-6 w-full min-h-[300px] flex flex-col justify-between">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                      <img
                        src={profile.picture}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full border-4 border-[#B039FF24] object-cover"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-[#0E051B]">
                          {profile.name}
                        </h2>
                        <div className="flex gap-2 mt-2">
                          <span className="text-white bg-[#8F55CC] px-3 py-1 rounded-lg text-sm">
                            {profile.ra}
                          </span>
                          <span className="text-white bg-[#8F55CC] px-3 py-1 rounded-lg text-sm">
                            {profile.tag}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Trading Ideas */}
                    <div className="space-y-4 flex-grow">
                      {profile.ideas.map((idea, ideaIndex) => (
                        <div
                          key={ideaIndex}
                          className="flex justify-between items-start"
                        >
                          <div className="space-y-2">
                            <p className="text-[#0E051B]">
                              {idea.title}
                              {idea.price && (
                                <span>
                                  <br />
                                  <strong className="text-[#3C096C]">
                                    Target: ₹{idea.price}
                                  </strong>
                                </span>
                              )}
                            </p>
                            <div className="flex gap-2">
                              <span className="text-white bg-[#8F55CC] px-3 py-1 rounded-lg text-sm">
                                {idea.company}
                              </span>
                            </div>
                          </div>
                          <p className="text-[#3C096C] font-medium whitespace-nowrap">
                            {formatTimeAgo(idea.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Now at the bottom */}
          {tradingIdeas.length > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="border-2 border-[#8F55CC] bg-transparent p-3 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition"
              >
                <ChevronLeft className="w-6 h-6 text-[#8F55CC]" />
              </button>

              <button
                onClick={nextSlide}
                className="bg-transparent border-2 border-[#8F55CC] p-3 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition"
              >
                <ChevronRight className="w-6 h-6 text-[#8F55CC]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopTradingIdeas;
