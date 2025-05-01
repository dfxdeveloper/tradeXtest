import React from "react";
import Basic from "../../assets/images/BasicPatterns.svg";
import Advance from "../../assets/images/AdvancePatterns.svg";
import Harmonic from "../../assets/images/HarmonicPatterns.svg";

const ChartPatterns = () => {
  return (
    <div className="chartpattern_bg text-white min-h-screen py-12">
      <div className="text-center  mb-12">
        <h1 className="text-4xl font-bold">Chart Patterns Type</h1>
        <p className="text-lg mt-10 text-center text-[#DFDFDF] font-Gilroy">
          Our platform provides a diverse collection of chart patterns that
          cater to both novice and experienced traders. These patterns
        </p>
        <p className="text-lg text-center text-[#DFDFDF] font-Gilroy">
          allow you to forecast market trends, reversals, and breakouts with
          precision, enhancing your decision-making process.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {/* Basic Patterns */}
        <div className="chartpatterncard_bg rounded-lg p-6 shadow-lg">
          <div className="h-56 rounded-lg mb-4 font-Gilroy">
            <img
              src={Basic}
              alt="BasicPatterns"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Basic Patterns
          </h2>
          <p className="text-sm text-[#DFDFDF] text-center">
            Our basic level helps you understand essential candlestick patterns
            and support/resistance levels, providing quick and straightforward
            setups for trading.
          </p>
        </div>
        {/* Advance Patterns */}
        <div className="chartpatterncard_bg rounded-lg p-6 shadow-lg">
          <div className="h-56 rounded-lg mb-4">
            <img
              src={Advance}
              alt="AdvancePatterns"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Advance Patterns
          </h2>
          <p className="text-sm text-[#DFDFDF] text-center">
            The advanced level dives into complex patterns and trendline
            analysis, offering deeper insights into market dynamics. This allows
            for more accurate trade entries and exits, equipping you for
            precision in volatile markets.
          </p>
        </div>
        {/* Harmony Patterns */}
        <div className="chartpatterncard_bg rounded-lg p-6 shadow-lg">
          <div className="h-56 rounded-lg mb-4">
            <img
              src={Harmonic}
              alt="HarmonicPatterns"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Harmonic Patterns
          </h2>
          <p className="text-sm text-[#DFDFDF] text-center">
            At the harmonic level, we combine price action strategies with tools
            like Fibonacci retracement to identify high-probability trade
            opportunities. This approach offers enhanced confidence for
            identifying precise trade levels in diverse market conditions.
          </p>
        </div>
      </div>
      <div className="text-center p-2 lg:p-0 mt-12">
        <p className="text-lg font-Gilroy text-white">
          With comprehensive chart pattern options, our platform equips you to
          navigate market trends,
        </p>
        <p className="text-lg text-white font-Gilroy">
          reversals, and breakouts with accuracy.
        </p>
      </div>
    </div>
  );
};

export default ChartPatterns;
