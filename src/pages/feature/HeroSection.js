import React from "react";
import feature_bar from "../../assets/images/feature_hero_bar.svg";
import Forex from "../../assets/images/forex_card.svg";
import Crypto from "../../assets/images/crypto_card.svg";
import Equity from "../../assets/images/Equity_card.svg";

const HeroSection = () => {
  return (
    <div className="min-h-screen feature_hero_bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Hero Section */}
        <div className="relative min-h-[80vh] flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-left mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Trade Smarter with Advanced Tools and Real-Time Insights
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-xl">
              Explore cutting-edge tools, market insights, and learning
              resources designed to elevate your trading experience.
            </p>
            <button className="bg-[#B039FF] hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
              Learn More
            </button>
          </div>

          <div className=" lg:w-1/2 md:w-96 w-72 flex justify-center items-center md:mt-8">
            <div className="relative w-full max-w-xl perspective-1000">
              {/* Purple glow effect underneath */}
              <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full" />

              {/* Main image container */}
              <div
                className="relative rounded-2xl w-full h-full backdrop-blur-sm transform lg:rotate-12 hover:rotate-[15deg] transition-transform duration-500 border border-[#6A11CB]"
                style={{
                  background:
                    "linear-gradient(90.06deg, rgba(255, 255, 255, 0.22) -46.6%, rgba(255, 255, 255, 0) 147.52%)",
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.1)",
                }}
              >
                <img
                  src={feature_bar}
                  alt="Trading Chart"
                  className="w-full h-full object-contain p-4"
                  loading="lazy"
                />

                {/* Glowing edge effect */}
                <div className="absolute inset-0 rounded-2xl mt-5 bg-gradient-to-r from-purple-500/10 to-transparent opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Trading Insights Section */}
        <div className="min-h-screen ">
          <div className="container mx-auto md:px-6 ">
            <div className="text-center mb-12 lg:mt-96">
              <h1 className="text-4xl font-bold text-white mb-4">
                Professional Trading Insights
              </h1>
              <p className="text-white text-2xl">
                Empowering Your Strategy with Data-Driven Insights and Expert
                Analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pb-12">
              {/* Forex Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-gradient-to-r from-[#321956] to-[#0E041B] p-3 rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300 ">
                  <div className="aspect-video mb-1 rounded-xl overflow-hidden">
                    <img
                      src={Forex}
                      alt="Forex Trading"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-4">Forex</h3>
                  <p className="text-white text-center">
                  Explore the dynamic world of foreign exchange markets with expert guidance and data-backed insights. Stay ahead of global trends, understand currency movements, and discover potential opportunities for further analysis with our comprehensive Forex educational resources.
                  </p>
                </div>
              </div>

              {/* Crypto Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-gradient-to-r from-[#321956] to-[#0E041B] p-3 rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
                  <div className="aspect-video mb-1 rounded-xl overflow-hidden">
                    <img
                      src={Crypto}
                      alt="Crypto Trading"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Crypto</h3>
                  <p className="text-white text-center">
                  Navigate the fast-evolving cryptocurrency landscape with confidence. From Bitcoin to altcoins, gain valuable insights, track market shifts, and explore blockchain-driven trends through our in-depth educational coverage.
                  </p>
                </div>
              </div>

              {/* Equity Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-2xl blur-xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative mb-0 bg-gradient-to-r from-[#321956] to-[#0E041B] p-3 rounded-2xl border border-purple-500/30 hover:border-purple-500 transition-all duration-300">
                  <div className="aspect-video mb-1 rounded-xl overflow-hidden">
                    <img
                      src={Equity}
                      alt="Crypto Trading"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Equity</h3>
                  <p className="text-white text-center">
                  Enhance your equity trading strategy with actionable analysis and market intelligence. Utilize our insights to identify key trends, monitor high-performing stocks, and make informed decisions in the ever-changing world of equities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
