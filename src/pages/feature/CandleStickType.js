import React from "react";
import Basic_Candel from "../../assets/images/Basic_Candle.svg";
import Advance_Candel from "../../assets/images/Advance_Candle.svg";
import Visual_Analysis from "../../assets/images/Visual_Analysis.svg";

const CandlesticksLayout = () => {
  return (
    <div className="min-h-screen candlestick_bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <h1 className="text-4xl font-bold w-full lg:w-3/4 text-white mb-4 text-center md:text-center lg:text-start">
          Candle sticks type
        </h1>

        {/* Description text */}
        <p className="text-white md:text-center lg:text-start text-center w-full lg:w-1/2 mb-8">
          Our platform transforms the way traders read charts by making
          candlestick analysis simple, accessible, and powerful. With
          easy-to-interpret single-candlestick patterns and foundational
          charting techniques, you can quickly identify key market movements and
          predict trend changes. Whether you're a beginner or an experienced
          trader, our tools allow you to uncover crucial signals that help you
          make smarter trading decisions.
        </p>

        {/* Cards Container - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Basic Candlesticks Card */}
          <div className="candle_cards_bg border-2 border-[#B039FF] rounded-xl overflow-hidden shadow-lg">
            <div className="h-48 p-4">
              <img
                src={Basic_Candel}
                alt="Basic candlestick chart"
                className="w-full rounded-lg h-full object-cover"
                style={{
                  backgroundPosition: "top",
                }}
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Single Patterns
              </h2>
              <p className="text-purple-200">
                Our platform identifies single-candle formations, which are
                simple indicators of market sentiment shifts. These patterns
                will help users quickly detect potential changes in trend
                direction.
              </p>
            </div>
          </div>

          {/* Advanced Candlesticks Card */}
          <div className="candle_cards_bg border-2 border-[#B039FF] rounded-xl overflow-hidden shadow-lg md:mt-0  lg:mt-0">
            <div className="h-48 p-4">
              <img
                src={Advance_Candel}
                alt="Advanced candlestick chart"
                className="w-full rounded-lg h-full object-cover"
                style={{
                  backgroundPosition: "top",
                }}
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Double Patterns
              </h2>
              <p className="text-purple-200">
                We offer insights into two-candle patterns, such as the
                Engulfing pattern, which signal possible trend reversals or
                continuations, allowing for more informed trading decisions.
              </p>
            </div>
          </div>

          {/* Visual Analysis Card */}
          <div className="candle_cards_bg border-2 border-[#B039FF] rounded-xl overflow-hidden md:mb-5 lg:mb-0 shadow-lg">
            <div className="h-48 p-4">
              <img
                src={Visual_Analysis}
                alt="Visual analysis chart"
                className="w-full h-full rounded-lg object-cover"
                style={{
                  backgroundPosition: "top",
                }}
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Triple Patterns
              </h2>
              <p className="text-purple-200">
                Our analysis includes three-candle patterns that provide
                stronger, more reliable trend signals, helping users spot
                significant shifts in market direction with confidence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandlesticksLayout;
