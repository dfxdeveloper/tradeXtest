import React from "react";

const SignalHero = () => {
  return (
    <section className="min-h-screen trade-about-bg text-white font-euclid px-6 md:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen max-w-7xl mx-auto">
        
        {/* Left Column - Text Content */}
        <div className="max-w-md">
          <h1 className="text-3xl md:text-5xl font-medium leading-tight mb-10">
            Never Miss Your Next Trade
          </h1>
          <button className="bg-gradient-to-r from-[#B039FF] to-[#A871FF] hover:opacity-90 text-white px-6 py-3 rounded-lg font-regular shadow-md mb-10">
            Get Trading Signals Now
          </button>
          <p className="text-white text-lg italic ">
            Join 100+ traders receiving high-precision signals daily
          </p>
        </div>

        <div></div>
      </div>
    </section>
  );
};

export default SignalHero;
