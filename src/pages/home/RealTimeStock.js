import React, { useEffect, useState } from "react";
import graph_img from "../../assets/images/graph-img.png";
import realtime from "../../assets/images/realtimesignals.gif";
import { Link } from "react-router-dom";

function RealTimeStock() {
  const [activeContent, setActiveContent] = useState(0);

  // Define content sections
  const contentSections = [
    {
      title: "Head & Shoulders",
      description:
        "With TradExpert, identifying Head & Shoulders patterns becomes effortless. Our AI delivers real-time insights, adjusts strategies, and helps you make precise trading decisions while managing risks effectively.",
    },
    {
      title: "Double Top",
      description:
        "We identify Double Top patterns instantly, signaling potential bearish trends. Real-time alerts and actionable strategies guide your entry, exit, and risk management for confident decision-making.",
    },
    {
      title: "Cup & Handle",
      description:
        "TradExpert’s AI spots Cup & Handle patterns, ensuring timely breakout alerts and predictive insights. Stay ready to seize bullish opportunities with precision-driven trading strategies.",
    },
  ];

  useEffect(() => {
    // Set up a timer to cycle through content
    const intervalId = setInterval(() => {
      setActiveContent((prev) => (prev + 1) % contentSections.length);
    }, 8000); // 6 seconds per content section

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  const currentContent = contentSections[activeContent];

  return (
    <section className="bg-customBlack">
      <h1 className="text-white text-center py-8 font-gilroy font-bold text-2xl md:text-3xl lg:text-5xl">
        AI Insights for Real-Time Trading Success
      </h1>
      <div className="container py-4 md:py-8 lg:py-16 grid md:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src={realtime}
            alt="Trading graph"
            className="w-full h-auto border-2 border-[#B266FF] rounded-2xl object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col px-10 justify-left  text-left">
          <div
            className="text-white font-gilroy font-medium md:text-base lg:text-lg lg:leading-relaxed max-w-3xl"
            key={activeContent}
          >
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
              {currentContent.title}
            </h1>
            <p className="py-6 md:py-8 lg:py-4 text-base md:text-lg">
              {currentContent.description}
            </p>
          </div>
          <div className="py-10">
            <Link
              to="/signup"
              className="mt-4 md:mt-6 lg:mt-10 bg-[#B266FF] text-white px-8 md:px-10 py-2 rounded-md text-base md:text-lg font-gilroy font-bold hover:bg-[#9944FF] transition-colors duration-300"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealTimeStock;
