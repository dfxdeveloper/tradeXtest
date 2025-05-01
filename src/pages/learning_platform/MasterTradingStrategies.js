import React from "react";
import Pricing_bg from "../../assets/images/PricingPage_bg.png";

function MasterTradingStrategies() {
  return (
    <>
      <div
        className="text-white pb-20 pt-24 px-15"
        style={{
          backgroundImage: `url(${Pricing_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container md:flex lg:gap-8">
          {/* Left part */}
          <div className="md:w-[55%] lg:w-3/5 flex flex-col gap-5 lg:gap-6 py-0 pt-12 md:py-24">
            <h1 className="text-white text-3xl lg:text-6xl font-gilroy font-bold lg:leading-tight">
              Gain Confidence in Every Trade
            </h1>
            <h2 className="text-white text-lg md:text-2xl font-gilroy font-regular">
              Step-by-step lessons designed to simplify complex concepts and
              boost your trading skills.
            </h2>
            <div className="px-6 pl-0 pt-3">
              <button className=" font-gilroy py-2  px-4 md:px-6 lg:px-8 md:text-xl bg-gradient-to-b from-[#B039FF] to-[#A871FF] text-white rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterTradingStrategies;
