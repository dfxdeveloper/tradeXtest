import React from "react";
import Marketpulse from "../../assets/images/market_pulse.svg";
import PreMarket from "./whatnewtoday/premarket/PreMarket";

const WhatsNewToday = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto">
        {/* Header */}
        <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
          What's New Today
        </h2>

        {/* Markets Pulse Section with Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 lg:gap-32">
          {/* Icon and Label */}
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <img src={Marketpulse} alt="market pulse" srcSet="" />
            <span className="text-white text-xl md:text-base">
              Markets Pulse
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <PreMarket />
      </div>
    </div>
  );
};

export default WhatsNewToday;
