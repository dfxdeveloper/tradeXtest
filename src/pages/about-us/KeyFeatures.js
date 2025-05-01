import React from "react";
import featureCard1 from "../../assets/images/feature_card1.svg";
import featureCard2 from "../../assets/images/feature_card2.svg";
import featureCard3 from "../../assets/images/feauture_card3.svg";

const Card1 = () => (
  <div
    className="relative h-72  p-6 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 group overflow-hidden "
    style={{
      backgroundImage: `url(${featureCard1})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 " />
    <div className="relative z-10 h-full flex flex-col justify-end">
      <div className="space-y-2 p-5 lg:p-0">
        <h3 className="text-white font-gilroy font-bold mb-2 text-center text-md md:text-sm">
          Fuel Your Growth
        </h3>
        <p
          className="text-[#A7ADBE] font-gilroy font-regular text-center md:text-base"
          style={{
            fontSize: "12px",
            lineHeight: "15px",
          }}
        >
          TradeXpert empowers traders to achieve sustainable growth by providing
          cutting-edge tools and comprehensive market insights. Our platform
          seamlessly integrates data across crypto, forex, stocks, and futures &
          options, giving you a truly holistic view of the financial landscape.
        </p>
      </div>
    </div>
  </div>
);

const Card2 = () => (
  <div
    className="relative h-72 p-6 rounded-xl  backdrop-blur-sm transform transition-all duration-300 hover:scale-105 group overflow-hidden"
    style={{
      backgroundImage: `url(${featureCard2})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 " />
    <div className="relative z-10 h-full flex flex-col justify-end">
      <div className="space-y-2 p-5 lg:p-0">
        <h3 className="text-white font-gilroy font-bold mb-2 text-center text-md md:text-sm">
          Actionable Intelligence
        </h3>
        <p
          className="text-[#A7ADBE] font-gilroy font-regular text-sm md:text-base text-center"
          style={{
            fontSize: "12px",
            lineHeight: "15px",
          }}
        >
          Dive into real-time market signals, news updates, and customizable
          strategy builders that transform complex data into actionable
          intelligence. Stay ahead of trends, identify lucrative opportunities,
          and make informed decisions with confidence.
        </p>
      </div>
    </div>
  </div>
);

const Card3 = () => (
  <div
    className="relative h-72 p-6 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 group overflow-hidden"
    style={{
      backgroundImage: `url(${featureCard3})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0" />
    {/* Changed positioning to flex and added justify-end to push content to bottom */}
    <div className="relative z-10 h-full flex flex-col justify-end">
      <div className="space-y-2 p-5 lg:p-0">
        <h3 className="text-white text-center font-gilroy font-bold text-sm md:text-sm">
          Boundless Market Access
        </h3>
        <p
          className="text-[#A7ADBE] text-center font-gilroy font-regular text-sm md:text-base"
          style={{
            fontSize: "12px",
            lineHeight: "15px",
          }}
        >
          Transcend traditional market silos and unlock the power of
          diversification. Trade freely across asset classes, leveraging our
          unified platform to capitalize on dynamic market conditions and
          maximize your earning potential.
        </p>
      </div>
    </div>
  </div>
);

const KeyFeatures = () => {
  return (
    <section className="min-h-screen bg-[#0F0817] relative overflow-hidden about_keyfeatures mb-16 lg:mb-0">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-6xl relative">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex justify-center">
            <span className="inline-block bg-[#170026] text-[#B039FF] font-gilroy font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 mt-6 sm:mt-8 lg:mt-10 rounded-full mb-4 border border-[#6A11CB]">
              Features
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-gilroy font-bold lg:text-4xl font-bold text-white mb-3 sm:mb-4 mt-4">
            Key Features Overview
          </h2>

          <p className="text-gray-400 max-w-2xl font-gilroy font-regular mx-auto mt-6 sm:mt-8 lg:mt-10 text-sm sm:text-base px-4">
            Trade Smarter, Earn More. Get advanced tools, real-time insights,
            and easy market access to boost your trading success.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16 py-8">
          <Card1 />
          <Card2 />
          <Card3 />
        </div>
      </div>

      {/* Background Gradient Effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-700/10 rounded-full filter blur-[120px] pointer-events-none" />
    </section>
  );
};

export default KeyFeatures;
