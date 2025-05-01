import React from "react";
import Forex from "../../assets/images/forex_card.svg";
import Crypto from "../../assets/images/crypto_card.svg";
import Equity from "../../assets/images/Equity_card.svg";

const assetData = [
  {
    title: "Forex",
    image: Forex,
    description:
      "Explore the dynamic world of foreign exchange markets with expert guidance and data-backed insights. Stay ahead of global trends, understand currency movements, and discover potential opportunities.",
  },
  {
    title: "Crypto",
    image: Crypto, 
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet enim scelerisque varius et lacus. Vestibulum dui diam venenatis enim non porttitor at et amet.",
  },
  {
    title: "Equity",
    image: Equity, 
    description:
      "Lorem ipsum dolor sit amet consectetur. Amet enim scelerisque varius et lacus. Vestibulum dui diam venenatis enim non porttitor at et amet.",
  },
];

export default function MultiAssetSupport() {
  return (
    <section className="strategy-builder-bg text-white font-euclid py-16 px-4 sm:px-10 lg:px-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">Multi-Asset Support</h2>
        <div className="w-64 h-[3px] bg-[#B039FF] mx-auto my-3 rounded-full"></div>
        <p className="text-white font-regular max-w-lg mx-auto text-sm sm:text-base">
          Trade across different markets with comprehensive support for multiple asset classes
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {assetData.map((asset, index) => (
          <div
            key={index}
            className="bg-[linear-gradient(90deg,#321956_0%,#0E041B_100%)] p-[1px] rounded-2xl border border-[#B039FF]"
          >
            <div className="bg-[#1b102e] p-4 rounded-[14px] h-full flex flex-col overflow-hidden">
              <img
                src={asset.image}
                alt={asset.title}
                className="h-48 w-full object-cover rounded-t-[14px]"
              />
              <div className="p-5 flex flex-col flex-1 justify-center items-center">
                <h3 className="text-xl text-white font-regular mb-2">{asset.title}</h3>
                <p className="text-xs text-white font-regular mb-4 flex-1">{asset.description}</p>
                <button className="bg-[linear-gradient(90deg,#6A11CB_0%,#2575FC_100%)] text-white text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
