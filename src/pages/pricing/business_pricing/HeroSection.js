import React, { useState } from "react";
import price1 from "../../../assets/images/price1.svg";
import price2 from "../../../assets/images/price2.svg";
import price3 from "../../../assets/images/price3.svg";
import priceTab from "../../../assets/images/pricetab.svg";
import TalkToExpertModal from "./TalkToExpertModal";
import RequestDemoModal from "./RequestDemoModal";
import SampleReportModal from "./SampleReportModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isSampleReportModalOpen, setIsSampleReportModalOpen] = useState(false);

  return (
    <div className="min-h-screen price_bg text-white font-euclid px-4 py-4">
      <div className="max-w-7xl mx-auto py-8 xl:py-28 lg:py-10 md:py-5 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-euclid font-bold leading-tight">
          Enterprise Trading Solutions for
        </h1>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-euclid font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#9795F0] to-[#FBC8D4]
 mt-6"
        >
          Financial Businesses
        </h2>
        <div className="mt-16 lg:mt-16 flex justify-center gap-12 flex-wrap">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-b from-[#B039FF] to-[#A871FF]
 hover:bg-[#812EEB] transition px-8 py-2 font-euclid rounded-md text-white font-medium"
          >
            Talk to an Expert
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("enterprise-pricing");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-[#4E1C69] hover:bg-[#5A2E7C] border border-[#B039FF] font-euclid transition px-8 py-2 rounded-md text-white font-medium"
          >
            View Pricing
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 md:py-8 py-0 gap-8">
        <div
          className="bg-[linear-gradient(90.06deg,_rgba(255,255,255,0.22)_-46.6%,_rgba(255,255,255,0)_147.52%)] max-h-64 h-[200px] backdrop-blur-3xl
 p-6 rounded-2xl relative shadow-lg border border-[#6A11CB]"
        >
          <div className="text-4xl mx-5 font-euclid text-white font-bold">
            25,000+
          </div>
          <p className="text-sm mt-4 text-regular font-euclid text-white">
            Financial instruments covered
            <br /> across global markets
          </p>
          <div className="absolute bottom-1 p-0 right-0 text-[#9B4EFF]">
            <img src={price1} className="object-contain h-16 px-1" />
          </div>
        </div>

        <div
          className="bg-[linear-gradient(90.06deg,_rgba(255,255,255,0.22)_-46.6%,_rgba(255,255,255,0)_147.52%)] max-h-64 h-[200px] backdrop-blur-3xl
 p-6 rounded-2xl relative border border-[#6A11CB] shadow-lg"
        >
          <div className="text-4xl mx-5 font-euclid text-white font-bold">
            99.997%
          </div>
          <p className="text-sm mt-4 text-regular font-euclid text-white">
            Platform uptime guarantee for
            <br /> enterprise clients
          </p>
          <div className="absolute bottom-1 right-0 text-[#9B4EFF]">
            <img src={price2} className="object-contain h-16 px-1" />
          </div>
        </div>

        <div className="bg-[linear-gradient(90.06deg,_rgba(255,255,255,0.22)_-46.6%,_rgba(255,255,255,0)_147.52%)] max-h-64 h-[200px]backdrop-blur-3xl p-6 rounded-2xl relative border border-[#6A11CB] shadow-lg">
          <div className="text-4xl mx-5 font-euclid text-white font-bold">
            50M+
          </div>
          <p className="text-sm mt-4 text-regular font-euclid text-white">
            Real-time calculations
            <br /> processed per second
          </p>
          <div className="absolute bottom-1 right-0 text-[#9B4EFF]">
            <img src={price3} className="object-contain h-16 px-1" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mt-4 mx-auto flex flex-col md:flex-row items-center justify-center gap-0 md:gap-20 lg:gap-20 xl:gap-20 2xl:gap-20">
        <div className="flex-1 py-10 sm:py-2">
          <span className="inline-block font-euclid font-medium bg-[linear-gradient(88.3deg,_rgba(255,_255,_255,_0.0581)_0%,_rgba(255,_255,_255,_0.0308)_99.66%)] text-md text-white px-6 py-2 rounded-full border border-white/10 shadow">
            Most Popular
          </span>
          <h1 className="text-4xl md:text-5xl py-3 font-euclid mt-5 font-bold leading-tight">
            Enterprise Trading Signals
          </h1>
          <div className="h-1 w-1/2 bg-[#B039FF] mt-2 mb-4 rounded-full" />
          <p className="text-white font-euclid font-medium text-lg mb-4">
            Custom algorithm development and signal generation for institutional
            clients with detailed analytics and multi-channel delivery.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] text-white text-sm font-euclid font-semibold px-4 py-2 rounded-lg">
              200+ Custom Strategies Deployed
            </span>
            <span className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] text-white text-sm font-euclid font-semibold px-4 py-2 rounded-lg">
              98% Signal Accuracy
            </span>
          </div>
          <ul className="list-none space-y-3 font-medium font-euclid mt-4 text-white">
            <li>
              <span className="text-[#6A11CB]">✔</span> Multi-asset coverage
              (Equities, Forex, Crypto, F&O)
            </li>
            <li>
              <span className="text-[#6A11CB]">✔</span> Custom Algorithm
              development with advanced risk management parameters
            </li>
            <li>
              <span className="text-[#6A11CB]">✔</span> AI-powered trading bots
              using reinforcement learning
            </li>
            <li>
              <span className="text-[#6A11CB]">✔</span> Advanced backtesting
              with Monte Carlo simulations
            </li>
            <li>
              <span className="text-[#6A11CB]">✔</span> High-frequency scalping
              algorithms with microsecond precision
            </li>
          </ul>
          <div className="flex flex-wrap gap-4 mt-6">
            <button
             onClick={() => setIsRequestModalOpen(true)}
              className="bg-[linear-gradient(180deg,_#B039FF_0%,_#A871FF_100%)] hover:bg-[#a04de0] text-white px-6 py-2 font-euclid font-medium rounded-lg text-base"
              style={{
                boxShadow:
                  "inset 0px 4px 4px 0px #FFFFFF40, 0px 4px 4px 0px #9C39FF40, 0px 0.48px 0.48px 0px #9C39FF08",
              }}
            >
              Request Demo
            </button>
            <button  onClick={() => setIsSampleReportModalOpen(true)} className="border border-[#B039FF] bg-[#4E1C69] text-white font-medium font-euclid px-6 py-2 rounded-lg text-base">
              Download Sample Report
            </button>
          </div>
        </div>

        <div className="flex-1">
          <img
            src={priceTab}
            alt="Trading dashboard"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
      <div className="w-full mt-12 flex justify-center">
        <div
          className="w-full max-w-7xl h-[2px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #5C5A84 0 10px, transparent 10px 20px)",
            opacity: 0.6,
          }}
        ></div>
      </div>
      <TalkToExpertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <RequestDemoModal
      isOpen={isRequestModalOpen}
      onClose={() => setIsRequestModalOpen(false)}
      />
      <SampleReportModal
      isOpen={isSampleReportModalOpen}
      onClose={() => setIsSampleReportModalOpen(false)}
      />
    </div>
  );
}
