import React from "react";
import aboutUs from "../../assets/images/about-us-img.svg";

function Discover() {
  return (
    <section className="about_discover">
      <section className="container mx-auto px-12 py-16 mb-16 lg:mb-0 ">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="lg:px-16 lg:py-16">
            <img
              src={aboutUs}
              alt="Trading Team"
              className="rounded-lg  shadow-xl"
              loading="lazy"
            />
          </div>
          <div>
            <p className="bg-[#170026] font-gilroy font-semibold text-[#B039FF] w-20 h-10 rounded-full mb-5 p-2 border border-[#6A11CB]">
              AboutUs
            </p>
            <h2 className="text-3xl font-bold mb-6 text-white font-gilroy font-bold">Who We Are</h2>
            <p className="text-[#6D7792] font-gilroy font-regular">
              Founded by a team of passionate market enthusiasts, TradeXpert
              emerged from a simple yet profound realization: successful trading
              is about understanding, not just executing. We're not here to
              provide quick tips or guaranteed profits. Instead, we're committed
              to building a comprehensive learning ecosystem that transforms
              novice traders into knowledgeable market participants.
              <br />
              We believe that knowledge is the most powerful tool in the trading
              world. Our mission is not to tell you what to trade, but to equip
              you with the understanding, insights, and confidence to make
              informed trading decisions.
            </p>
            <button className="bg-[#B039FF] to bg-[#A871FF] hover:bg-purple-700 mt-5 px-6 text-white py-3 rounded-lg font-medium flex items-center gap-2">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Discover;
