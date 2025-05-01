import React from "react";
import Chart from "../../assets/images/common_chart.svg";
import Common1 from "../../assets/images/common_sense_1.svg";
import Common2 from "../../assets/images/common_sense_2.svg";
import Common3 from "../../assets/images/common_sense_3.svg";
const CommonSenseTrading = () => {
  // Data for cards
  const cardsData = [
    {
      title: "Risk Management Focus",
      description:
        "Learn to prioritize risk management, helping you protect your capital while pursuing growth.",
      image: Common1,
    },
    {
      title: "Rational Decision-Makings",
      description:
        "Avoid emotional trading by following proven, common-sense practices designed to keep you on track.",
      image: Common3,
    },
    {
      title: "Sustainable Growth",
      description:
        "Build a foundation for long-term success by focusing on consistent, rational decisions rather than chasing quick profits.",
      image: Common2,
    },
  ];

  return (
    <div className="min-h-screen common_sense_bg text-white py-12 px-6">
      {/* Title and Description */}
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-8 animate-fade-in">
            Common Sense Trading
          </h1>
          <p className="text-gray-300 px-8 animate-fade-in delay-150">
            Imagine trading with clarity and confidence, free from complex
            strategies and hard-to-follow techniques—that’s the essence of
            Common Sense Trading. With the Common Sense Trading feature, we make
            trading easy and accessible, so you can focus on practical,
            straightforward steps that build good habits and smart
            decision-making. By using this feature, you’ll avoid the pitfalls of
            emotional, high-risk trades and instead stay on track with proven
            methods that encourage consistent, sustainable growth.
          </p>
        </div>

        {/* Chart Section */}
        <div className="w-full flex justify-center mb-12  animate-fade-in delay-300">
          {/* Placeholder for chart */}
          <img
            className=" w-full rounded-lg  p-12 shadow-lg object-contain"
            src={Chart}
            alt="chart"
            loading="lazy"
          ></img>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12 animate-slide-up">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="bg-[#434651] rounded-lg shadow-lg p-2 hover:scale-105 transition-transform"
            >
              <h2 className="text-xl font-semibold mt-4 text-center mb-4">
                {card.title}
              </h2>
              <p className="text-[#B2B5BE] text-center mb-8 ">
                {card.description}
              </p>
              <div
                className="h-56 bg-cover bg-center rounded-lg shadow-md"
                style={{
                  backgroundImage: `url(${card.image})`,
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12 animate-fade-in delay-500">
          <p className="text-lg bg-gradient-to-r from-[#B039FF] via-[#D200CF] to-[#5E427C] bg-clip-text text-transparent max-w-3xl mx-auto">
            With a focus on smart trading habits, our Common Sense Trading
            approach ensures you’re prepared for a disciplined, methodical
            trading journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommonSenseTrading;
