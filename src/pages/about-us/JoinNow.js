import React from "react";
import question from "../../assets/images/about_question.svg";
import { Link } from "react-router-dom";
const JoinNow = () => {
  return (
    <div className="min-h-screen w-full bg-[#0E051B] about_joinnow flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-4 p-3 bg-black/20 border border-[#26014F] rounded-full">
          <div className="flex items-center gap-2">
            <div className="border border-[#480096] rounded-full p-3">
              <img alt="question" className="text-white" src={question} loading="lazy"/>
            </div>

            <span className="text-gray-300 font-gilroy font-medium">Still Have a Question</span>
          </div>
          <button className="bg-[#B039FF] font-gilroy font-semibold mx-16 text-white px-6 py-2 rounded-full hover:bg-purple-500 transition-colors duration-200">
            Ask Question
          </button>
        </div>

        <h1 className="text-2xl font-gilroy font-bold md:text-3xl lg:text-4xl font-bold text-white mt-12 mb-4">
          Master the Markets
        </h1>
        <h2 className="text-2xl font-gilroy font-bold md:text-3xl lg:text-4xl font-bold text-white mb-12">
        Join the TradeXpert Community
        </h2>

        <Link to="/signup"className="bg-[#B039FF] font-gilroy font-bold mt-12 text-white px-8 py-3 rounded-lg text-lg hover:bg-purple-500 transition-colors">
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default JoinNow;
