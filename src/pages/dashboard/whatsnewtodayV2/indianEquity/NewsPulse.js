import React from "react";

import AiIcon from "../../../../assets/images/ai_icon.svg";

function NewsCard({
  image,
  title,
  time,
  isLive,
  timestamp,
  sentiment,
  sentimentPercentage,
}) {
  return (
    <div className="bg-[#220C39] border border-[#48387B] rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between">
      <div className="flex flex-col sm:flex-row">
        <img
          src={image}
          alt="News thumbnail"
          className="w-full h-40 sm:w-20 sm:h-20 rounded object-cover mb-3 sm:mb-0 sm:mr-4"
        />
        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            <span className="text-xs font-gilroy font-regular text-white">
              {time}
            </span>
            {isLive ? (
              <span className="ml-2 px-2 py-0.5 bg-red-600 text-white text-xs rounded flex items-center">
                <span className="h-2 w-2 bg-white rounded-full mr-1"></span>
                LIVE
              </span>
            ) : (
              <span className="ml-2 font-gilroy font-regular text-xs text-white">
                | {timestamp}
              </span>
            )}
          </div>
          <p className="text-sm font-gilroy font-medium w-full sm:w-72 mt-3 sm:mt-5 mb-3 sm:mb-1">
            {title}
          </p>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col justify-between sm:items-end">
        <div className="flex items-center mb-1">
          <span className="text-base sm:text-lg font-bold font-gilroy text-[#0FEDBE]">
            {sentimentPercentage}%
          </span>
          <span className="ml-2 text-xs font-gilroy text-[#0FEDBE]">
            {sentiment}
          </span>
        </div>
        <button className="text-sm bg-transparent hover:text-teal-400 transition-colors px-2">
          View
        </button>
      </div>
    </div>
  );
}

const Image = "https://placehold.co/600x400";

function NewsPulse() {
  const newsItems = [
    {
      image: Image,
      title:
        "Nifty 50, Sensex today: What to expect from Indian stock market in trade on February 19",
      time: "12:00 pm",
      isLive: true,
      timestamp: "",
      sentiment: "Bullish",
      sentimentPercentage: 70,
    },
    {
      image: Image,
      title:
        "Nifty 50, Sensex today: What to expect from Indian stock market in trade on February 19",
      time: "12:00 pm",
      isLive: true,
      timestamp: "",
      sentiment: "Bullish",
      sentimentPercentage: 70,
    },
    {
      image: Image,
      title:
        "Nifty 50, Sensex today: What to expect from Indian stock market in trade on February 19",
      time: "12:00 pm",
      isLive: false,
      timestamp: "12:04:25",
      sentiment: "Bullish",
      sentimentPercentage: 70,
    },
    {
      image: Image,
      title:
        "Nifty 50, Sensex today: What to expect from Indian stock market in trade on February 19",
      time: "12:00 pm",
      isLive: false,
      timestamp: "12:04:25",
      sentiment: "Bullish",
      sentimentPercentage: 70,
    },
    {
      image: Image,
      title:
        "Nifty 50, Sensex today: What to expect from Indian stock market in trade on February 19",
      time: "12:00 pm",
      isLive: false,
      timestamp: "12:04:25",
      sentiment: "Bullish",
      sentimentPercentage: 70,
    },
    {
      image: Image,
      title:
        "Nifty 50, Sensex today: What to expect from Indian stock market in trade on February 19",
      time: "12:00 pm",
      isLive: false,
      timestamp: "12:04:25",
      sentiment: "Bullish",
      sentimentPercentage: 70,
    },
  ];

  return (
    <div className="text-white p-2 sm:p-4 lg:p-0 xl:p-0 2xl:p-0 pb-10 lg:px-6 xl:px-6 2xl:px-6 w-full">
      <div
        className="border border-gray-700 mt-2 lg:mb-6 xl:mb-6 rounded-xl p-2 sm:p-3 md:p-6 shadow-xl backdrop-blur-3xl"
        style={{
          background:
            "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
        }}
      >
        <div className="flex items-center mb-4 w-full max-w-xs rounded-full border border-gray-700 backdrop-blur-3xl space-x-2 px-2 py-0.5">
          <img
            className="p-1 rounded-full h-8 w-8 sm:h-9 sm:w-9"
            src={AiIcon}
            alt="AI Icon"
          />
          <h2 className="text-lg sm:text-xl font-euclid font-semibold truncate">
            News Pulse
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-3 sm:gap-4">
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPulse;