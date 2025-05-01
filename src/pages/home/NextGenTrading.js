import React from "react";
import InstitutionalTrading from "./InstitutionalTrading";
import LearningEcosystem from "./LearningEcosystem";
import TradingCommunity from "./TradingCommunity";
import QuantumEdgeAI from "./QuantumEdgeAI";

function NextGenTrading() {
  return (
    <div className="bg-[#0E051B]">
       <div className=" container text-white min-h-screen p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Next-Generation Trading Platform
        </h1>
        <p className="text-lg text-gray-300">
          Where institutional expertise meets AI-powered intelligence and
          community-driven innovation
        </p>
      </div>
      <div className="lg:px-16">
        <InstitutionalTrading />
      </div>
      <div className="lg:px-16 py-8">
        <LearningEcosystem />
      </div>
      <div className="lg:px-16 py-8">
        <TradingCommunity />
      </div>
    </div>
    <div className="">
        <QuantumEdgeAI />
      </div>
    </div>
  
  );
}

export default NextGenTrading;
