import React from "react";
import AboutComp from "../../assets/images/about-comp-right-image.svg"; 

const HeroSection = () => {
  return (
    <section className="min-h-screen about-main-bg font-euclid text-white flex px-6 pt-12 pb-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mx-auto">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            Welcome to the Future of <br />
            <span className="text-white">Trading</span>
          </h1>
          <p className="text-white font-regular md:text-md max-w-xl mb-12">
            TradeXpert.ai is your personal trading assistant, delivering high-precision
            signals and real-time market intelligence. Our platform combines advanced AI
            with no-code automation to ensure you never miss your next profitable trade
            opportunity.
          </p>
          <button className="bg-gradient-to-r from-[#B039FF] to-[#A871FF] hover:opacity-90 text-white font-regular px-6 py-2 rounded-md text-sm  shadow-lg">
            Learn More
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={AboutComp}
            alt="Future of Trading"
            className="w-full max-w-[540px] rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
