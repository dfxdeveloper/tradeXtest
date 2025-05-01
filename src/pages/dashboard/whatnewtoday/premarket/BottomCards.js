import React from "react";
import TodaysLearning from "../../../../assets/images/todays_learning.svg";
import RiskManagement from "../../../../assets/images/risk_management.svg";
import TradingStrategy from "../../../../assets/images/trading_strategy.svg";

const ContentSection = ({ title, content }) => (
  <div className="space-y-2">
    <h2 className="text-2xl font-bold text-center">{title}</h2>
    <div
      className="prose py-2  max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:my-0 [&_ol]:my-0 [&_p]:my-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0 [&_ul>li]:leading-tight [&_ol>li]:leading-tight [&_ul>li::marker]:!text-white [&_ol>li::marker]:!text-white [&_ul>li::marker]:!content-['•'] [&_ul>li::marker]:!font-white dark:text-white [&_li::marker]:fill-white [&_li::marker]:stroke-black [&_ul>li::before]:bg-white"
      style={{
        "--tw-prose-bullets": "white",
        "--tw-prose-counters": "white",
      }}
      dangerouslySetInnerHTML={{ __html: content || "Content not available" }}
    />
  </div>
);
const BottomCards = ({ data }) => {
  const { todays_learning, risk_management, trading_strategy } = data[0];
  return (
    <div className="flex flex-col lg:flex-row justify-between p-8 bg-[#1A0B2E] border border-[#6A11CB] rounded-2xl w-full min-h-[300px] space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Today's Learning Card */}
      <div className="w-full lg:w-[30%]">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={TodaysLearning}
            className="w-10"
            alt="trending_stocks"
            srcSet=""
          />
          <span className="text-[#FFFFFF] text-xl">Today’s Learning</span>
        </div>

        <div className="bg-[#1A1625] border border-[#6A11CB] rounded-xl p-4">
          <div className="bg-purple-900 rounded-t-xl p-3">
            <p className="text-[#FFFFFF] text-lg text-center">
              Price Action Patterns :
            </p>
          </div>
          <div className="">
            <ContentSection content={todays_learning} />
            <p className="text-[#B039FF] text-lg mt-6 text-center cursor-pointer">
              Read full guide →
            </p>
          </div>
        </div>
      </div>

      {/* Risk Management Card */}
      <div className="w-full lg:w-[30%]">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={RiskManagement}
            className="w-10"
            alt="risk management"
            srcSet=""
          />
          <span className="text-[#FFFFFF] text-xl ">Risk Management</span>
        </div>

        <div className="bg-[#1A1625] border border-[#6A11CB] rounded-xl p-4">
          <div className="bg-purple-900 rounded-t-xl p-3">
            <p className="text-[#FFFFFF] text-lg text-center">
              Today’s Focus :
            </p>
          </div>
          <div className="">
            <ContentSection content={risk_management} />
            <div className="text-[#B039FF] rounded-lg bg-[#0B0012] text-lg text-center mt-6 p-3">
              <p>Major economic data release at</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Strategy Card */}
      <div className="w-full lg:w-[30%]">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={TradingStrategy}
            className="w-10"
            alt="trading strategy"
            srcSet=""
          />
          <span className="text-[#FFFFFF] text-xl">Trading Strategy</span>
        </div>

        <div className="bg-[#1A1625] border border-[#6A11CB] rounded-xl p-4">
          <div className="bg-purple-900 rounded-t-xl p-3">
            <p className="text-[#FFFFFF] text-lg text-center">
              Gap Trading Setup
            </p>
          </div>
          <div className="">
            <ContentSection content={trading_strategy} />

            <p className="text-[#B039FF] text-lg mt-6 text-center">
              Risk : Reward - 1:2.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCards;
