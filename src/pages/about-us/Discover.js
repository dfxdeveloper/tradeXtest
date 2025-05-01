import React from "react";
import aboutUs from "../../assets/images/about-us-img.svg";
import { ArrowUpRight } from "lucide-react";

function Discover() {
  return (
    <section className="about_discover bg-[#0D001A] font-euclid text-white">
      <section className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Image */}
          <div className="lg:px-8">
            <img
              src={aboutUs}
              alt="Trading Team"
              className="rounded-lg h-full w-3/4 shadow-xl"
              loading="lazy"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-start">
            <p className="bg-[#170026] font-euclid font-regular text-[#B039FF] w-fit px-4 py-1 rounded-full mb-4 border border-[#6A11CB] text-sm">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl max-w-xl font-bold mb-4 leading-tight">
              Discover Who We Are and Our Mission
            </h2>
            <p className="text-[#6D7792] text-md font-regular font-euclid mb-6 leading-relaxed">
              Founded by a team of passionate market enthusiasts, TradeXpert
              emerged from a simple yet profound realization: successful trading
              is about understanding, not just executing. We're not here to
              provide quick tips or guaranteed profits. Instead, we're committed
              to building a comprehensive learning ecosystem that transforms
              novice traders into knowledgeable market participants.
              <br />
              <br />
              We believe that knowledge is the most powerful tool in the trading
              world. Our mission is not to tell you what to trade, but to equip
              you with the understanding, insights, and confidence to make
              informed trading decisions.
            </p>
            <button className="bg-gradient-to-r from-[#B039FF] to-[#A871FF] hover:opacity-90 px-6 py-2 rounded-lg text-white font-medium w-fit flex items-center gap-2">
              Contact Us
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Discover;
