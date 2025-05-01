import React from "react";
import Top from "../../assets/images/topcardpara.svg";
import Bottom from "../../assets/images/bottomcardpara.svg";
import Single from "../../assets/images/singlecardpara.svg";

const ExpertMarketplace = () => {
  return (
    <section className="ExpertMarketplace-bg text-white py-6 px-6 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Expert Marketplace</h2>
        <div className="w-64 h-[3px] bg-[#B039FF] mx-auto my-3 rounded-full"></div>
        <p className="text-white mt-2 font-regular">
          Learn from Trading Professionals
        </p>
        <p className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#FBC2EB] to-[#A6C1EE] mt-4">
          "Connect with verified experts for personalized guidance and
          education"
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5 flex flex-col space-y-6">
          {/* Top Left Card */}
          <div className="bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)]  border border-[#B039FF] rounded-xl p-6 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg text-[#D5AFFF] font-medium mb-2">
                Daily Expert Insights with sample preview
              </h3>
              <p className="text-sm font-regular text-white">
                Start your trading day with professional analysis and actionable
                recommendations from verified experts
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <img
                src={Top}
                alt="Daily Expert Insights"
                className="h-28 w-auto"
              />
            </div>
          </div>

          {/* Bottom Left Card */}
          <div className="bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)]  border border-[#B039FF]  rounded-xl p-6 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-[#D5AFFF] mb-2">1-on-1 Mentorship</h3>
              <p className="text-sm text-white font-regular">
                Schedule personalized coaching sessions with experienced traders
                who match your trading style and goals
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <img
                src={Bottom}
                alt="Daily Expert Insights"
                className="h-28 w-auto"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)]  border border-[#B039FF]  rounded-xl p-6 flex  justify-between h-full">
          <div className="w-1/2 pr-6">
            <h3 className="text-lg font-medium text-[#D5AFFF] mb-2">
              Premium Trading Courses
            </h3>
            <p className="text-sm text-white font-regular">
              Access structured educational content designed by industry
              professionals to elevate your trading knowledge
            </p>
          </div>

          <div className="w-1/2 flex justify-end">
            <img
              src={Single}
              alt="Premium Trading Courses"
              className="w-full max-h-96 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertMarketplace;
