import React from "react";
import video_img from "../../assets/images/Video-icon.png";
import crypto_icon from "../../assets/icons/Crypto & Forex.png";
import Hidden_Insights from "../../assets/icons/Hidden Insights.png";
import Daily_Market from "../../assets/icons/Daily Market Summaries.png";
import Financial_News from "../../assets/icons/Financial News.png";
import Advanced_Trading from "../../assets/icons/Advanced Trading Signals.png";
function TradingSignals() {
  return (
    <>
      <section className="tradingSignals-bg-img pb-24">
        <h1 className="text-white text-xl md:text-3xl text-center lg:text-5xl font-gilroy font-bold ">
          Experience Tradexpert in Action
        </h1>
        <h2 className="text-white text-xs px-14 md:text-base text-center lg:text-2xl font-gilroy font-light pt-2 lg:pt-4">
          Watch our demo video to learn how our tools can enhance your trading
          strategy and maximize your success.
        </h2>
        <div className="flex justify-center md:mt-12 h-96">
          <img src={video_img} alt="video_img" loading="lazy" />
        </div>
        {/* Unlock the Secrets of Successful Trading */}
        <div className="flex flex-col justify-center items-center blur_card mx-auto w-[86%] md:w-[95%] lg:w-[95%] mt-10">
          <div>
            <h3 className="text-white text-center text-lg md:text-2xl lg:text-3xl font-gilroy font-light pt-8 md:py-6 px-2 lg:py-8">
              Unlock the Secrets of Successful Trading
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4 lg:gap-8 px-4 py-8 md:py-12">
            {[
              {
                icon: crypto_icon,
                title: "Trade Across Markets",
                description:
                  "Easily trade crypto, forex, stocks and F&O all in one platform.",
              },
              {
                icon: Hidden_Insights,
                title: "Live Trading Signals",
                description:
                  "Get real-time updates on charts, patterns, and candlestick signals for smarter trading.",
              },
              {
                icon: Daily_Market,
                title: "Instant Market News",
                description:
                  "Stay updated with the latest news that affects your trades.",
              },
              {
                icon: Financial_News,
                title: "Exclusive Insider Signals",
                description:
                  "Access hidden signals to get ahead of the market—our unique edge.",
              },
              {
                icon: crypto_icon,
                title: "Customized Trading Strategies",
                description:
                  "Create plans that match your style and goals, using smart tips for better decisions.",
              },
              {
                icon: Advanced_Trading,
                title: "Learning Hub",
                description:
                  "Learn everything you need about trading, from basics to expert tips.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center lg:w-72 md:w-60 w-full px-4 sm:px-0"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="mb-4 w-20 h-20 object-contain"
                  loading="lazy"
                />
                <p className="text-white font-gilroy font-bold text-base py-1 md:py-2">
                  {feature.title}
                </p>
                <p className="text-white font-gilroy font-light lg:text-base text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default TradingSignals;
