import React, { useState } from "react";
import Iphone from "../../../assets/images/iphone_img.svg";
//Us Equity
import Paypal from "../../../assets/images/paypal.svg";
import Tesla from "../../../assets/images/tesla.svg";
import Apple from "../../../assets/images/apple.svg";
import Nvidia from "../../../assets/images/nvidia.svg";
import Meta from "../../../assets/images/meta.svg";
import Google from "../../../assets/images/google.svg";
import Microsoft from "../../../assets/images/microsoft.svg";
import GM from "../../../assets/images/gm.svg";



//Indiaan Equity 
import Tcs from "../../../assets/images/tcs.svg";
import Adani from "../../../assets/images/adani.svg";
import Reliance from "../../../assets/images/reliance.svg";
import Eicher from "../../../assets/images/eicher.svg";
import Eu from "../../../assets/images/eu.svg";
import Infosys from "../../../assets/images/infosys.svg";
import ITC from "../../../assets/images/itc.svg";
import LNT from "../../../assets/images/lnt.svg";

import RequestDemoModal from "./RequestDemoModal";
import SampleRAReportModal from "./SampleRAReportModal";

const logos = [Paypal, Tesla, Apple, Nvidia, Meta, Google, Microsoft, GM];
const IndianEquitylogos = [Tcs, Adani, Reliance, Eicher, Eu, Infosys, ITC, LNT];

export default function NextGenTrading() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  return (
    <div className="next_gen_bg text-white font-euclid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 pb-16">
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #5C5A84 0 10px, transparent 10px 20px)",
              opacity: 0.6,
              transform: "translateX(-0.5px)",
            }}
          ></div>
          <div>
            <span className="inline-block font-medium bg-[linear-gradient(88.3deg,_rgba(255,_255,_255,_0.0581)_0%,_rgba(255,_255,_255,_0.0308)_99.66%)] text-md px-6 py-2 rounded-full border border-white/10 shadow">
              Comprehensive
            </span>
            <h1 className="text-3xl md:text-4xl py-3 mt-5 font-semibold leading-tight">
              Market Data & API Services
            </h1>
            <div className="h-1 w-1/2 bg-[#B039FF] mt-2 mb-4 rounded-full" />
            <p className="w-full md:w-3/4 mb-4">
              Comprehensive market data across equities, crypto, and forex with
              advanced technical indicators and our proprietary RA Rationale
              reports.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] px-4 py-2 rounded-lg text-sm font-semibold">
                50M+ Calculations Per Second
              </button>
              <button className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] px-4 py-2 rounded-lg text-sm font-semibold">
                99.997% Uptime
              </button>
            </div>
            <ul className="list-none space-y-3 text-sm mt-4">
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Real-time market
                data across all major exchanges
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Proprietary RA
                Rationale reports with actionable trade insights
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Advanced
                technical indicators library with 300+ custom indicators
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> RESTful API
                access to patterns, candlestick formations, and strategy signals
                in real time
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[linear-gradient(180deg,_#B039FF_0%,_#A871FF_100%)] hover:bg-[#a04de0] px-6 py-2 rounded-lg text-sm"
              >
                Download Sample Report
              </button>
            </div>
          </div>
          <div>
            <span className="inline-block font-medium bg-[linear-gradient(88.3deg,_rgba(255,_255,_255,_0.0581)_0%,_rgba(255,_255,_255,_0.0308)_99.66%)] text-md px-6 py-2 rounded-full border border-white/10 shadow">
              Seamless
            </span>
            <h1 className="text-3xl md:text-4xl py-3 mt-5 font-semibold leading-tight">
              Brokerage Integration Services
            </h1>
            <div className="h-1 w-1/2 bg-[#B039FF] mt-2 mb-4 rounded-full" />
            <p className="w-full md:w-3/4 mb-10">
              Direct connectivity to trading platforms with automated trade flow
              and complete regulatory compliance.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] px-4 py-2 rounded-lg text-sm font-semibold">
                50+ Supported Brokerages
              </button>
              <button className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] px-4 py-2 rounded-lg text-sm font-semibold">
                $2B+ Daily Volume
              </button>
            </div>
            <ul className="list-none space-y-3 text-sm mt-4">
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Connect with 50+
                global brokerages
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Real-time order
                routing & execution with latency monitoring
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Multi-account
                management with portfolio-wide risk controls
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Advanced trade
                confirmation and notification system
              </li>
            </ul>
            <div className="mt-16">
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="bg-[linear-gradient(180deg,_#B039FF_0%,_#A871FF_100%)] hover:bg-[#a04de0] px-6 py-2 rounded-lg text-sm"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-8 flex justify-center">
          <div
            className="w-full max-w-7xl h-[2px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #5C5A84 0 10px, transparent 10px 20px)",
              opacity: 0.6,
            }}
          ></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div>
            <div className="mb-6">
              <span className="inline-block font-medium bg-[linear-gradient(88.3deg,_rgba(255,_255,_255,_0.0581)_0%,_rgba(255,_255,_255,_0.0308)_99.66%)] text-md px-6 py-2 rounded-full border border-white/10 shadow">
                Customizable
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl py-3 font-semibold leading-tight">
              White-Label Trading Platform
            </h1>
            <div className="h-1 w-1/2 bg-[#B039FF] mt-2 mb-4 rounded-full" />
            <p className="w-full md:w-3/4 mb-4">
              Fully customizable trading interface under your brand with
              seamless integration and comprehensive administrative controls.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] px-4 py-2 rounded-lg text-sm font-semibold">
                100+ Customization Options
              </button>
              <button className="bg-[linear-gradient(90deg,_#6A11CB_0%,_#2575FC_100%)] px-4 py-2 rounded-lg text-sm font-semibold">
                30+ Enterprise Clients
              </button>
            </div>
            <ul className="list-none space-y-3 text-sm mt-4">
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Fully
                customizable UI/UX to match your brand
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Multi-device
                support (desktop, tablet, mobile)
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Comprehensive
                admin dashboard with client management
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Integrated
                strategy builder and backtesting tools
              </li>
              <li>
                <span className="text-[#6A11CB] mr-2">✔</span> Revenue
                diversification opportunities with subscription models
              </li>
            </ul>
            <div className="mt-6">
              <button onClick={() => setIsRequestModalOpen(true)} className="bg-[linear-gradient(180deg,_#B039FF_0%,_#A871FF_100%)] hover:bg-[#a04de0] px-6 py-2 rounded-lg text-sm">
                Request a Demo
              </button>
            </div>
          </div>

          <div>
            <img
              src={Iphone}
              alt="Iphone"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="text-center text-3xl font-semibold mb-10">
            <p className="bg-clip-text text-transparent bg-[linear-gradient(90deg,_#FEADA6_0%,_#F5EFEF_100%)]">
              Next-Gen Trading Solutions for Ambitious
            </p>
            <p className="bg-clip-text text-transparent bg-[linear-gradient(90deg,_#FEADA6_0%,_#F5EFEF_100%)]">
              Financial Enterprises
            </p>
          </div>
          <div className="relative w-full overflow-hidden">
            <div className="flex w-max animate-marquee-right">
              {[...logos,].map((logo, i) => (
                <div
                  key={`rtl-${i}`}
                  className="rounded-2xl p-4 min-w-[100px] h-[100px] flex items-center justify-center mx-2"
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full overflow-hidden mt-6">
            <div className="flex w-max animate-marquee-left">
              {[...IndianEquitylogos].map((logo, i) => (
                <div
                  key={`ltr-${i}`}
                  className="rounded-2xl  min-w-[100px] h-[100px] flex items-center justify-center mx-2"
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RequestDemoModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
      <SampleRAReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
