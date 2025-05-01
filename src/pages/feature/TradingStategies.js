import React, { useState } from "react";
import Default from "../../assets/images/default_img.svg";
import Custom from "../../assets/images/custom_img.svg";
const TradingStrategies = () => {
  const [activeTab, setActiveTab] = useState("default");

  const defaultContent = {
    title: "Default Strategies",
    description: [
      "Start trading with confidence using pre-built strategies that align with popular market conditions, including strategies optimized for high volatility or steady growth.",
    ],
    image: Default,
  };

  const customContent = {
    title: "Custom Strategies",
    description: [
      "Craft your own approach by setting personalized indicators, time frames, and risk tolerances. Whether you’re day trading, swing trading, or investing long-term, our custom strategy tools allow for complete flexibility.",
    ],
    image: Custom,
  };

  const content = activeTab === "custom" ? customContent : defaultContent;

  return (
    <div className="tradingstrategies_bg text-white min-h-screen py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Trading Strategies</h1>
      </div>
      <div className="flex justify-center lg:space-x-56 space-x-48 mb-6">
        {/* Tabs */}
        <button
          className={`text-xl font-semibold ${
            activeTab === "default"
              ? "text-[#B039FF] underline"
              : "text[#DFDFDF]"
          }`}
          onClick={() => setActiveTab("default")}
        >
          Default
        </button>
        <button
          className={`text-xl font-semibold ${
            activeTab === "custom"
              ? "text-[#B039FF] underline"
              : "text-[#DFDFDF]"
          }`}
          onClick={() => setActiveTab("custom")}
        >
          Custom
        </button>
      </div>
      <div className="tradingstrategies_card rounded-lg p-8 border border-[#434651] shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 max-w-6xl mx-auto">
        {/* Content */}
        <div className="text-left space-y-4 flex-1">
          <h2 className="text-2xl mx-5 font-bold">{content.title}</h2>
          <ul className="list-disc ml-6 text-sm space-y-2">
            {content.description.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
        {/* Image */}
        <div className="flex-1 p-8">
          <img
            src={content.image}
            alt={content.title}
            className="rounded-lg shadow-lg object-contain "
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default TradingStrategies;
