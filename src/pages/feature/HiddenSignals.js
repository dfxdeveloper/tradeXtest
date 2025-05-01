import React from "react";
import Image1 from "../../assets/images/hidden_image1.svg";
import Image2 from "../../assets/images/hidden_image2.svg";
import Image3 from "../../assets/images/hidden_image3.svg";

const HiddenSignals = () => {
  return (
    <div className="hidden_bg ">
      <div className="container text-white py-4 px-4 min-h-screen">
        {/* Header */}
        <div className="mb-8 pt-10 lg:px-28">
          <h1 className="text-4xl font-bold">Hidden Signals</h1>
          <p className="text-lg mt-4 max-w-4xl">
            What if you could spot trends before they fully unfold? With
            TradeXpert, you can uncover secret signals, giving you an edge in
            predicting market movements. Ready to see the signals that others
            overlook? Explore how hidden signals can boost your trading
            strategy!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1  md:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Section */}
          <div className="col-span-5 border border-[#B039FF] Hiddenleft_bg rounded-lg p-6 shadow-lg flex flex-col lg:justify-between md:justify-between justify-center">
            <img
              src={Image1}
              alt="Hidden Divergences"
              className="rounded-lg mb-4 w-full h-[calc(100%-60px)] object-cover"
              loading="lazy"
            />
            <h2 className="text-lg font-bold">Hidden Divergences:</h2>
            <p className="text-sm mt-2 text-[#DFDFDF]">
              Use hidden divergences (when price and indicator move in opposite
              directions) to spot trend continuations that might go unnoticed by
              others.
            </p>
          </div>

          {/* Right Section */}
          <div className="col-span-7 grid grid-rows-2 gap-6">
            {/* Top Card */}
            <div className="Hiddenright_bg border border-[#B039FF] rounded-lg p-6 shadow-lg flex flex-col">
              <img
                src={Image2}
                alt="Unique Market Insights"
                className="rounded-lg mb-4 w-full h-40 object-cover"
                loading="lazy"
              />
              <h2 className="text-lg font-bold">Pump and Dump Detection:</h2>
              <p className="text-sm mt-2 text-[#DFDFDF]">
                Spot early signs of artificial price spikes and volume shifts to
                avoid falling for pump and dump schemes.
              </p>
            </div>

            {/* Bottom Card */}
            <div className="Hiddenright_bg border border-[#B039FF] rounded-lg p-6 shadow-lg flex flex-col">
              <img
                src={Image3}
                alt="Stay Ahead of Trends"
                className="rounded-lg mb-4 w-full h-40 object-cover"
                loading="lazy"
              />
              <h2 className="text-lg font-bold">
                Promoter Manipulation Alerts:
              </h2>
              <p className="text-sm mt-2 text-[#DFDFDF]">
                Detect subtle market manipulations and misleading information
                before they impact your trades
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-16 pb-16">
          <p className="text-lg bg-gradient-to-r from-[#B039FF] via-[#D200CF] to-[#5E427C] bg-clip-text text-transparent max-w-3xl mx-auto">
            These hidden signals allow traders to tap into nuanced, powerful
            insights that can enhance your
            <br />
            overall trading strategy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HiddenSignals;
