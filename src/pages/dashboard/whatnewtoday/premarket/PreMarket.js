import React, { useEffect, useMemo, useCallback, useState } from "react";
import { Bell } from "lucide-react";
import Globe from "../../../../assets/images/globe.svg";
import TrendingStocks from "./TrendingStocks";
import SectoralPerformance from "./SectoralPerformance";
import MajorEvents from "./MajorEvents";
import UpcomingIPOs from "./UpcomingIPOs";
import Activity from "./Activity";
import { useWhatsNew } from "../../../../components/context/whatsnew";
import MarketBulletin from "./MarketBulletin";
import TechnicalAnalysis from "./TechnicalAnalysis";
import KeyStocksToWatch from "./KeyStocksToWatch";
import useMarketController from "../../../../hooks/useMarketController";
import { changeFormat } from "../../../../utils/socket";
import axiosInstance from "../../../../utils/axiosHelper";
import localStorageWithExpiry from "../../../../utils/localstorage";
import { CACHE } from "../../../../utils/constants";
import Minus from "../../../../assets/images/minus.svg";
import TrendingUp from "../../../../assets/images/trending-up.svg";
import TrendingDown from "../../../../assets/images/trending-down.svg";

const cacheKey = "pre_market";

const ContentSection = React.memo(({ content }) => (
  <div className="space-y-2">
    <div
      className="prose py-2 max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:my-0 [&_ol]:my-0 [&_p]:my-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-0 [&_ul>li]:leading-tight [&_ol>li]:leading-tight [&_ul>li::marker]:!text-white [&_ol>li::marker]:!text-white [&_ul>li::marker]:!content-['•'] [&_ul>li::marker]:!font-white dark:text-white [&_li::marker]:fill-white [&_li::marker]:stroke-black [&_ul>li::before]:bg-white"
      style={{
        "--tw-prose-bullets": "white",
        "--tw-prose-counters": "white",
      }}
      dangerouslySetInnerHTML={{ __html: content || "Content not available" }}
    />
  </div>
));

const MarketCard = React.memo(({ title, marketType, data, marketNames }) => (
  <div className="bg-[#12101A] p-4 rounded-lg border border-[#6A11CB]">
    <h4 className="text-[#FFFFFF] mb-4 text-xl font-semibold text-center">
      {title}
    </h4>
    <div className="space-y-3 py-4">
      {data &&
        Object.values(data).map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-[#FFFFFF] text-md">
              {marketNames[marketType]?.[item.identifier] || item.identifier}
            </span>
            <span
              className={`text-xs sm:text-sm font-medium min-w-[50px] text-right ${
                +item?.percentage < 0
                  ? "text-red-400"
                  : +item?.percentage > 0
                  ? "text-green-400"
                  : "text-gray-400"
              }`}
            >
              ({item?.percentage}%)
            </span>
          </div>
        ))}
      {(!data || Object.values(data).length === 0) && (
        <div className="text-gray-400 text-center py-2">No data available</div>
      )}
    </div>
  </div>
));

const SentimentCard = ({ type }) => (
  <div className="bg-opacity-20 bg-[#220C39] rounded-lg p-6 flex flex-col items-center justify-center">
    <img src={type.icon} alt={type.label} className="h-5 w-5 mb-2" />
    <p className="text-md font-bold text-white">{type.label}</p>
    <p className="text-3xl font-bold" style={{ color: type.color }}>
      {type.value}
    </p>
  </div>
);

const PreMarket = () => {
  const { whatsNewData } = useWhatsNew();

  const SENTIMENT_TYPES = {
    BULLISH: {
      label: "Bullish",
      scoreKey: "positive_score",
      color: "#17B917",
      icon: TrendingUp,
      score: whatsNewData?.market_outlook?.[0]?.bullish || "0",
    },
    NEUTRAL: {
      label: "Neutral",
      scoreKey: "neutral_score",
      color: "#E3D448",
      icon: Minus,
      score: whatsNewData?.market_outlook?.[0]?.neutral || "0",
    },
    BEARISH: {
      label: "Bearish",
      scoreKey: "negative_score",
      color: "#C22222",
      icon: TrendingDown,
      score: whatsNewData?.market_outlook?.[0]?.bearish || "0",
    },
  };

  // const originalMarkets = useMemo(
  //   () => ({
  //     indian: ["NIFTY 50", "NIFTY BANK"],
  //     us: ["NDAQ", "TSLA"],
  //     forex: ["C:USDINR", "C:CHFEUR", "C:GBPUSD"],
  //     crypto: ["X:BTCUSD", "X:ETHUSD", "X:ADAUSD"],
  //   }),
  //   []
  // );

  // const marketNames = useMemo(
  //   () => ({
  //     indian: {
  //       "NIFTY 50": "NIFTY 50",
  //       BANKNIFTY1: "NIFTY BANK",
  //     },
  //     us: {
  //       NDAQ: "Nasdaq",
  //       TSLA: "Tesla",
  //     },
  //     forex: {
  //       "C:USDINR": "USD/INR",
  //       "C:CHFEUR": "CHF/EUR",
  //       "C:GBPUSD": "GBP/USD",
  //     },
  //     crypto: {
  //       "X:BTCUSD": "Bitcoin",
  //       "X:ETHUSD": "Ethereum",
  //       "X:ADAUSD": "Cardano",
  //     },
  //   }),
  //   []
  // );

  // const { socketData } = useMarketController(originalMarkets);

  return (
    <div className="p-4">
      {/* Main Content Container */}

      <div className="rounded-lg p-6 bg-[#220C39] border border-[#6A11CB]">
        {/* Market Outlook Section */}
        <div>
          <div className="mb-6">
            <h3 className="text-[#FFFFFF] font-semibold text-xl mb-6 flex items-center gap-4">
              <img className="w-8 h-8" src={Globe} alt="globe" />
              Today's Market Outlook and sentiments
            </h3>

            {/* Market Sentiments */}
            <div className="my-2 ">
              <div className="bg-[#12101A] rounded-lg p-4 sm:p-6 border border-[#6A11CB]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-20 px-4 sm:px-6 md:px-10 lg:px-44 py-2 sm:py-1 lg:py-2">
                  {Object.values(SENTIMENT_TYPES).map((type) => (
                    <div
                      key={type.label}
                      className="bg-[#1F0A36] border border-[#6802D7] rounded-lg py-4 sm:py-3 lg:py-2 transform hover:scale-105 transition-transform duration-500"
                    >
                      <img
                        src={type.icon}
                        alt={type.label}
                        className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2"
                      />
                      <p className="text-lg sm:text-xl text-center font-bold text-white">
                        {type.label}
                      </p>
                      <p
                        className="text-3xl sm:text-4xl text-center font-bold"
                        style={{ color: type.color }}
                      >
                        {type.label === "Bullish"
                          ? `${
                              whatsNewData?.[0]?.market_outlook?.[0]?.bullish ||
                              "0"
                            }%`
                          : type.label === "Neutral"
                          ? `${
                              whatsNewData?.[0]?.market_outlook?.[0]?.neutral ||
                              "0"
                            }%`
                          : `${
                              whatsNewData?.[0]?.market_outlook?.[0]?.bearish ||
                              "0"
                            }%`}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 sm:mt-4">
                  <div className="text-[#FFFFFF] text-base sm:text-lg font-semibold mb-2 sm:mb-4">
                    {whatsNewData?.[0]?.title || "Market Overview"}
                  </div>

                  <div className="text-[#B039FF] text-sm sm:text-md py-1 sm:py-2">
                    <i>Key points:</i>
                  </div>

                  <div className="text-gray-400 text-sm sm:text-md">
                    <ContentSection content={whatsNewData?.[0]?.description} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Cards Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <MarketCard
            title="India"
            marketType="indian"
            data={socketData?.indian}
            marketNames={marketNames}
          />

          <MarketCard
            title="US Markets"
            marketType="us"
            data={socketData?.us}
            marketNames={marketNames}
          />

          <MarketCard
            title="Crypto"
            marketType="crypto"
            data={socketData?.crypto}
            marketNames={marketNames}
          />

          <MarketCard
            title="Forex"
            marketType="forex"
            data={socketData?.forex}
            marketNames={marketNames}
          />
        </div> */}
      </div>

      <div className="py-4">
        <TrendingStocks />
      </div>
      <div className="">
        <SectoralPerformance />
      </div>
      <div className="py-4">
        <Activity />
      </div>
      <div className="">
        <MarketBulletin />
      </div>
      {/*   <div className="py-10">
        <TechnicalAnalysis />
      </div> */}
      <div className="py-4">
        <KeyStocksToWatch />
      </div>
      {/* <div className='py-10' >
      <PreMarketNews data={whatsNewData}/>
      </div> */}
      <div className="">
        <MajorEvents data={whatsNewData} />
      </div>
      <div className="py-4">
        <UpcomingIPOs />
      </div>
      {/* <div className="py-10">
        <BottomCards data={whatsNewData} />
      </div> */}
    </div>
  );
};

export default PreMarket;
