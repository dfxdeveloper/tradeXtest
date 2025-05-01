import React from "react";
import Stock_pic from "../../assets/images/stock_bars.png";
import WhyChooseTradeXpert from "../../assets/images/Why_Choose_TradeXpert_bg.png";

function WhyTradeXpert() {
  return (
    <>
      <div
        className=" text-white lg:p-20 md:p-10 p-7"
        style={{
          backgroundImage: `url(${WhyChooseTradeXpert})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" justify-center items-center blur_card mx-auto  mt-10 container">
          <div className="grid lg:grid-cols-2">
            <div>
              <img
                className="p-10"
                alt="stock"
                src={Stock_pic}
                loading="lazy"
              />
            </div>
            <div className="lg:p-10 p-2">
              <h3 className="lg:text-4xl md:text-2xl text-xl font-gilroy flex md:justify-start justify-center md:text-left text-md:text-lg text-center  pt-4 text-white font-bold">
                Why Choose TradeXpert?
              </h3>
              <p className="text-white text-base md:text-xl  font-gilroy flex justify-center md:text-left text-center pb-1 pt-4 font-light">
                TradeXpert offers a unique platform designed for traders of all
                levels, providing real-time market insights, expert analysis,
                and advanced tools to help you stay ahead. Whether you're into
                crypto, forex, or stocks, TradeXpert equips you with the
                knowledge and resources you need to make informed decisions and
                maximize your trading potential. Choose TradeXpert for an
                all-in-one trading experience tailored to your success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyTradeXpert;
