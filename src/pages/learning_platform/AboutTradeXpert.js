import React from "react";
import AboutTradeXpert_bg from "../../assets/images/About_TradeXpert_bg.png";
import Teaching_pic from "../../assets/images/Teaching.png";

function AboutTradeXpert() {
  return (
    <>
      <div
        className="text-white pb-3.5  px-15"
        style={{
          backgroundImage: `url(${AboutTradeXpert_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="grid lg:grid-cols-2 pt-10 container">
          <div className="lg:p-10 p-5">
            <h3 className="text-2xl lg:text-5xl font-bold text-white text-center md:text-left lg:leading-tight pt-4">
              What You'll Learn:
            </h3>
            <div className="text-white text-base md:text-xl pt-6">
              <ul className="list-disc space-y-3 pl-6 md:pl-8">
                <li className="marker:text-white">
                  <span className="font-light">
                    Moving Averages: Discover how to spot trends and predict
                    market movements.
                  </span>
                </li>
                <li className="marker:text-white">
                  <span className="font-light">
                    RSI (Relative Strength Index): Learn to identify overbought
                    or oversold conditions.
                  </span>
                </li>
                <li className="marker:text-white">
                  <span className="font-light">
                    MACD (Moving Average Convergence Divergence): Understand
                    market momentum and signal potential reversals.
                  </span>
                </li>
                <li className="marker:text-white">
                  <span className="font-light">
                    Bollinger Bands: Find out how these bands can help you gauge
                    volatility and risk.
                  </span>
                </li>
                <li className="marker:text-white">
                  <span className="font-light">
                    Support & Resistance Levels: Master the art of identifying
                    price points where the market may reverse.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex self-center">
            <img
              className="lg:p-10 w-full h-auto"
              src={Teaching_pic}
              alt="Teaching"
              loading="lazy"
            />
          </div>
        </div>
        {/*   <div className="grid lg:grid-cols-2 pt-10 container">
          <div className="lg:p-10 p-5 ">
            <h3 className=" text-2xl lg:text-5xl font-gilroy lg:leading-tight flex md:justify-start justify-center md:text-left text- md:text-3xl text-center pt-4 text-white font-bold">
            What You’ll Learn:
            </h3>
            <p className="text-white text-base md:text-xl font-gilroy flex justify-center md:text-left text-center pb-1 pt-6 font-light">
              <ul>
                <li>Moving Averages: Discover how to spot trends and predict market movements.</li>
                <li>RSI (Relative Strength Index): Learn to identify overbought or oversold conditions.</li>
                <li>MACD (Moving Average Convergence Divergence): Understand market momentum and signal potential reversals.</li>
                <li>Bollinger Bands: Find out how these bands can help you gauge volatility and risk.</li>
                <li>Support & Resistance Levels: Master the art of identifying price points where the market may reverse.</li>
              </ul>
              </p>
          </div>
          <div className="flex self-center">
            <img className="lg:p-10 " src={Teaching_pic} alt="Teaching" />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default AboutTradeXpert;
