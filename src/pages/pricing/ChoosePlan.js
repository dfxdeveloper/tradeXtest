import React, { useEffect, useState } from "react";
import PricePlang_bg from "../../assets/images/Compare_Plan_bg.png";
import rightIcon from "../../assets/images/Right.svg";

function ChoosePlan({ subscriptions = [] }) {
  const [showPlans, setShowPlans] = useState(false);
  const [duration, setDuration] = useState(2);
  const handleShowPlans = () => setShowPlans((prev) => !prev);

  const prices = {
    basic: {
      monthly: subscriptions?.[0]?.cost?.monthly || 0,
      yearly: subscriptions?.[0]?.cost?.yearly || 0,
    },
    advanced: {
      monthly: subscriptions?.[2]?.cost?.monthly || 0,
      yearly: subscriptions?.[2]?.cost?.yearly || 0,
    },
    premium: {
      monthly: subscriptions?.[1]?.cost?.monthly || 0,
      yearly: subscriptions?.[1]?.cost?.yearly || 0,
    },
  };

  const features = [
    {
      category: "",
      subFeatures: [
        {
          title: "Contract Limit",
          1: {
            2: "Max 20 contracts across 2 contract types",
            4: "Max 20 contracts across 2 contract types",
          },
          2: {
            2: "Max 50 contracts across all contract types",
            4: "Max 50 contracts across all contract types",
          },
          3: {
            2: "Max 100 contracts across all contract types",
            4: "Max 100 contracts across all contract types",
          },
        },
        {
          title: "Timeframes",
          1: { 2: "Max 2 timeframes", 4: "Max 2 timeframes" },
          2: { 2: "All timeframes", 4: "All timeframes" },
          3: { 2: "All timeframes", 4: "All timeframes" },
        },
        {
          title: "News Tags",
          1: { 2: "Max 10 tags", 4: "Max 10 tags" },
          2: { 2: "Max 30 tags", 4: "Max 30 tags" },
          3: { 2: "Unlimited", 4: "Unlimited" },
        },
        {
          title: "Candlesticks & Chart Patterns",
          1: {
            2: "10 candlesticks + 3 chart patterns",
            4: "10 candlesticks + 3 chart patterns",
          },
          2: {
            2: "100+ candlesticks and chart patterns",
            4: "100+ candlesticks and chart patterns",
          },
          3: {
            2: "100+ candlesticks and chart patterns",
            4: "100+ candlesticks and chart patterns",
          },
        },
        {
          title: "Real-Time Alerts",
          1: { 2: true, 4: true },
          2: { 2: true, 4: true },
          3: { 2: true, 4: true },
        },
        {
          title: "Platform Access",
          1: { 2: "Telegram & App", 4: "Telegram & App" },
          2: { 2: "Telegram & App", 4: "Telegram & App" },
          3: { 2: "Telegram & App", 4: "Telegram & App" },
        },
        {
          title: "WhatsApp Alerts (Extra Charge)",
          1: { 2: true, 4: true },
          2: { 2: true, 4: true },
          3: { 2: true, 4: true },
        },
        {
          title: "Default Strategies",
          1: { 2: false, 4: false },
          2: { 2: "20 default strategies", 4: "20 default strategies" },
          3: { 2: "100+ default strategies", 4: "100+ default strategies" },
        },
        {
          title: "Custom Strategies",
          1: { 2: false, 4: false },
          2: { 2: "25 custom strategies", 4: "25 custom strategies" },
          3: {
            2: "Unlimited custom strategies",
            4: "Unlimited custom strategies",
          },
        },
        {
          title: "Screener Access",
          1: { 2: false, 4: false },
          2: { 2: true, 4: true },
          3: { 2: true, 4: true },
        },
        {
          title: "Commonsense Trading",
          1: { 2: false, 4: false },
          2: { 2: true, 4: true },
          3: { 2: true, 4: true },
        },
        {
          title: "API Access to Signals",
          1: { 2: false, 4: false },
          2: { 2: true, 4: true },
          3: { 2: true, 4: true },
        },
        {
          title: "F&O Strategies",
          1: { 2: false, 4: false },
          2: { 2: "20 strategies", 4: "20 strategies" },
          3: { 2: "All strategies", 4: "All strategies" },
        },
        {
          title: "Proprietary Strategies",
          1: { 2: false, 4: false },
          2: { 2: "10 proprietary strategies", 4: "10 proprietary strategies" },
          3: {
            2: "All proprietary strategies",
            4: "All proprietary strategies",
          },
        },
        {
          title: "Research Reports",
          1: { 2: true, 4: true },
          2: { 2: true, 4: true },
          3: { 2: true, 4: true },
        },
        {
          title: "Community & Learning Models Access",
          1: { 2: false, 4: false },
          2: { 2: true, 4: true },
          3: { 2: true, 4: true },
        },
      ],
    },
  ];

  const renderFeatureValue = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <img
          src={rightIcon}
          alt="Right Icon"
          className="w-5 h-5"
          loading="lazy"
        />
      ) : (
        <span className="text-red-500 text-xl">✕</span>
      );
    }
    return <span className="text-sm text-gray-300">{value}</span>;
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${PricePlang_bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="py-8"
      >
        <div className="text-white">
          <div
            className="flex justify-center py-3 lg:px-80"
            onClick={handleShowPlans}
          >
            <button className="bg-gradient-to-b from-[#B039FF] to-[#A871FF] rounded-[8px] w-[261px] h-[40px] px-[52px] py-[18px] md:text-lg text-base font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 flex items-center justify-center cursor-pointer">
              {showPlans ? "Hide Plans" : "Compare Plans"}
            </button>
          </div>

          <div
            className={`transition-transform duration-500 ease-in-out transform ${
              showPlans
                ? "translate-y-0 opacity-100"
                : "-translate-y-20 opacity-0"
            }`}
          >
            {showPlans && (
              <div>
                <div className="max-w-6xl mx-auto container mt-4">
                  <div className="flex flex-col items-center mb-10">
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Key Features Comparison
                    </h2>
                    <div className="flex bg-transparent border border-white rounded-full p-1 mt-4">
                      <button
                        onClick={() => setDuration(2)}
                        className={`py-2 px-8 md:px-10 lg:px-12 rounded-full text-white transition-all font-bold font-gilroy ${
                          duration === 2
                            ? "bg-gradient-to-b from-[#B039FF] to-[#A871FF]"
                            : "bg-transparent"
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setDuration(4)}
                        className={`py-2 px-8 md:px-10 lg:px-12 rounded-full text-white transition-all font-bold font-gilroy ${
                          duration === 4
                            ? "bg-gradient-to-b from-[#B039FF] to-[#A871FF]"
                            : "bg-transparent"
                        }`}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                  <div className="bg-purple-950/30 rounded-xl backdrop-blur-sm border border-purple-800/30 overflow-hidden">
                    <div className="grid grid-cols-4 border-b border-purple-800/30">
                      <div className="p-6 text-white font-gilroy text-lg font-bold">
                        Price (Monthly/Yearly)
                      </div>
                      <div className="p-6 text-white font-gilroy text-lg font-bold text-center">
                        $
                        {duration === 2
                          ? prices.basic.monthly
                          : prices.basic.yearly}
                      </div>
                      <div className="p-6 text-white font-gilroy text-lg font-bold text-center">
                        $
                        {duration === 2
                          ? prices.advanced.monthly
                          : prices.advanced.yearly}
                      </div>
                      <div className="p-6 text-white font-gilroy text-lg font-bold text-center">
                        $
                        {duration === 2
                          ? prices.premium.monthly
                          : prices.premium.yearly}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 border-b border-purple-800/30">
                      <div className="p-6 text-white font-gilroy text-lg font-bold">
                        Feature
                      </div>
                      <div className="p-6 text-white font-gilroy text-lg font-bold text-center">
                        Basic
                      </div>
                      <div className="p-6 text-white font-gilroy text-lg font-bold text-center">
                        Advanced
                      </div>
                      <div className="p-6 text-white font-gilroy text-lg font-bold text-center">
                        Premium
                      </div>
                    </div>

                    {features[0].subFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-4 border-b border-purple-800/30 last:border-none"
                      >
                        <div className="p-4 text-gray-300 border-r border-purple-800/30">
                          {feature.title}
                        </div>
                        {[1, 2, 3].map((planType) => (
                          <div
                            key={planType}
                            className="flex items-center justify-center p-4 border-r border-purple-800/30 last:border-r-0"
                          >
                            {renderFeatureValue(feature[planType][duration])}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoosePlan;
