import React from "react";
import { Check } from "lucide-react";
import Tablet from "../../assets/images/tablet.svg";

export default function StrategyBuilder() {
  return (
    <section className="strategy-builder-bg text-white font-euclid px-6 sm:px-10 lg:px-12 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Section */}
      <div className="flex-1 max-w-2xl">
        <div className="bg-[linear-gradient(88.3deg,rgba(255,255,255,0.0581)_0%,rgba(255,255,255,0.0308)_99.66%)] border border-gray-800 backdrop-blur-[64px] text-xs sm:text-sm uppercase font-semibold px-4 py-1 mb-4 inline-block rounded-full tracking-wide">
          Flagship Feature
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-regular leading-snug sm:leading-tight mb-2">
          World’s First No-Code <span className="text-[#B039FF] font-bold">Strategy</span> Builder
        </h2>

        {/* Bottom line */}
        <div className="w-24 sm:w-1/2 h-[3px] bg-[#A855F7] rounded-full mt-3 sm:mt-4 mb-6"></div>

        <p className=" w-3/4 text-white text-sm sm:text-base lg:text-lg mb-6">
          Drag, drop, and customize indicators to create powerful trading strategies in minutes.
        </p>

        <ul className="space-y-3 mb-8">
          {[
            "50+ Technical Indicators",
            "Visual strategy creation with no technical skills required",
            "Test and deploy strategies with a single click",
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <div className="flex items-center gap-2 bg-[linear-gradient(90.06deg,rgba(255,255,255,0.22)_-46.6%,rgba(255,255,255,0)_147.52%)] backdrop-blur-[50px] border border-[#6A11CB] rounded-full px-4 py-2 text-sm text-white w-3/4">
                <Check className="w-5 h-5 text-[#6A11CB]" />
                <span className="text-xs sm:text-sm">{item}</span>
              </div>
            </li>
          ))}
        </ul>

        <button className="bg-[#B039FF] hover:bg-purple-700 text-white px-6 sm:px-8 py-2 rounded-lg text-sm sm:text-base lg:text-lg font-regular transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
          Try Strategy Builder
        </button>
      </div>

      {/* Right Section */}
      <div className="flex-1 w-full flex justify-center">
        <div className="max-w-xs sm:max-w-md md:max-w-lg w-full">
          <img
            src={Tablet}
            alt="Strategy Builder UI"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
