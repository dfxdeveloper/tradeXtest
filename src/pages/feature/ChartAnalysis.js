import React, { useState } from "react";
import SinglePattern from "../../assets/images/siglepattern.svg";
import DoublePattern from "../../assets/images/doublepattern.svg"
import TriplePattern from "../../assets/images/triplepattern.svg"


const ChartAnalysis = () => {
  const [activeTab, setActiveTab] = useState("candlestick");

  const candlestickContent = [
    {
      title: "Single Patterns",
      img: SinglePattern,
      desc: "Our platform identifies single-candle formations, which are simple indicators of market sentiment shifts. These patterns help users quickly detect potential changes in trend direction."
    },
    {
      title: "Double Patterns",
      img: DoublePattern,
      desc: "Our platform identifies single-candle formations, which are simple indicators of market sentiment shifts. These patterns help users quickly detect potential changes in trend direction."
    },
    {
      title: "Triple Patterns",
      img: TriplePattern,
      desc: "Our platform identifies single-candle formations, which are simple indicators of market sentiment shifts. These patterns help users quickly detect potential changes in trend direction."
    }
  ];

  const chartFormationContent = [
    {
      title: "Head and Shoulders",
      img: SinglePattern,
      desc: "This pattern signals a trend reversal and is characterized by a peak (shoulder), followed by a higher peak (head), then another lower peak (shoulder)."
    },
    {
      title: "Triangles",
      img: DoublePattern,
      desc: "Triangles indicate continuation patterns and form when price converges with support and resistance levels."
    },
    {
      title: "Flags and Pennants",
      img: TriplePattern,
      desc: "These patterns represent brief consolidations before the previous trend resumes, often occurring after strong price movements."
    }
  ];

  const currentContent = activeTab === "candlestick" ? candlestickContent : chartFormationContent;

  return (
    <div className="comprehensivechartanalysis-bg text-white font-euclid min-h-screen py-12">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold mb-4">Comprehensive Chart Analysis</h1>
    <div className="w-72 h-[3px] bg-[#B039FF] mx-auto my-3 rounded-full"></div>
    <p className="text-lg font-regular text-white mb-6 max-w-2xl mx-auto">
      Master the art of reading price action with our advanced chart pattern recognition tools
    </p>
    <div className="inline-flex rounded-full border border-[#2F2F6A] p-1 gap-1">
      <button
        className={`px-6 py-2 rounded-full text-sm font-regular transition-all duration-300 ${
          activeTab === "candlestick"
            ? "bg-[radial-gradient(167.31%_100%_at_50.43%_23.61%,_#6037FF_0%,_#B27AFF_100%)] text-white"
            : "text-white hover:text-white"
        }`}
        onClick={() => setActiveTab("candlestick")}
      >
        Candlestick Patterns
      </button>
      <button
        className={`px-6 py-2 rounded-full text-sm font-regular transition-all duration-300 ${
          activeTab === "formation"
            ? "bg-[radial-gradient(167.31%_100%_at_50.43%_23.61%,_#6037FF_0%,_#B27AFF_100%)] text-white"
            : "text-white hover:text-white"
        }`}
        onClick={() => setActiveTab("formation")}
      >
        Chart Formations
      </button>
    </div>
  </div>

  <div className="max-w-7xl bg-[linear-gradient(123.67deg,_rgba(255,255,255,0.07)_-1.5%,_rgba(255,255,255,0)_98.37%)] rounded-xl border border-[#B039FF] mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <p className="text-center bg-gradient-to-r from-[#A18CD1] to-[#FBC2EB] bg-clip-text text-transparent max-w-5xl mx-auto mb-12">
      Our platform transforms the way traders read charts by making candlestick analysis simple, accessible, and powerful. With easy-to-interpret single-candlestick patterns and foundational charting techniques, you can quickly identify key market movements and predict trend changes.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3  gap-8">
      {currentContent.map((item, index) => (
        <div key={index} className="comprehensivechartanalysis-card-bg  md:p-12 lg:px-10 xl:p-10 2xl:p-10  p-10  rounded-lg shadow-lg">
          <img src={item.img} alt={item.title} className="mb-4 rounded" />
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-white font-regular text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};  

export default ChartAnalysis;
