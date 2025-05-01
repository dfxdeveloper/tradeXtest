import React, { memo, useEffect, useMemo, useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, CircleMinus } from "lucide-react";
import useMarketController from "../../hooks/useMarketController";
import { formatRelativeTime } from "../../utils";
import sliders from "../../assets/icons/sliders.svg";
import Graph from "../../assets/images/graph.svg";
import {
  DEFAULT_TRENDS,
  defaultPatterns,
  INDIAN_EQUITY,
  TIME_FRAMES,
  TYPEMAPPING,
} from "../../utils/constants";

const MarketSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div
          key={`skeleton-${item}`}
          className="bg-[#1A1125] text-white rounded-lg shadow-lg p-6 animate-pulse"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-purple-800 rounded w-1/3"></div>
            <div className="h-6 bg-purple-800 rounded w-1/4"></div>
          </div>
          <div className="space-y-3 py-4">
            <div className="h-3 bg-purple-800 rounded w-1/4 mb-4"></div>
            {[1, 2].map((signal) => (
              <div
                key={`skeleton-signal-${signal}`}
                className="grid grid-cols-2 items-center bg-purple-800/50 rounded-lg py-3 px-4 mb-3"
              >
                <div className="h-4 bg-purple-700 rounded w-3/4"></div>
                <div className="grid grid-cols-2 justify-between items-center">
                  <div className="h-4 bg-purple-700 rounded w-2/3"></div>
                  <div className="h-4 bg-purple-700 rounded w-2/3 justify-self-end"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const getRandomPatterns = (patterns, count) => {
  const shuffled = [...patterns].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomTimeFrame = () => {
  const index = Math.floor(Math.random() * TIME_FRAMES.length);
  return TIME_FRAMES[index];
};

const getRandomTrend = () => {
  const index = Math.floor(Math.random() * DEFAULT_TRENDS.length);
  return DEFAULT_TRENDS[index];
};

const generateRandomSignals = (stockSymbol) => {
  const allPatterns = [
    ...defaultPatterns.singleCandlesticks,
    ...defaultPatterns.doubleCandlesticks,
    ...defaultPatterns.tripleCandlesticks,
    ...defaultPatterns.basicPatterns,
    ...defaultPatterns.advancedPatterns,
    ...defaultPatterns.harmonicPatterns,
  ];

  const randomPatterns = getRandomPatterns(allPatterns, 2);
  return randomPatterns.map((pattern) => ({
    pattern_label: pattern.label,
    trend: getRandomTrend().value,
    time_interval: getRandomTimeFrame().label,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    stockSymbol,
  }));
};

const cacheSignals = (stockSymbol, signals) => {
  const today = new Date().toDateString();
  const cachedData = JSON.parse(localStorage.getItem("cachedSignals")) || {};
  cachedData[stockSymbol] = { date: today, signals };
  localStorage.setItem("cachedSignals", JSON.stringify(cachedData));
};

const getCachedSignals = (stockSymbol) => {
  const cachedData = JSON.parse(localStorage.getItem("cachedSignals")) || {};
  const today = new Date().toDateString();
  const dayOfWeek = new Date().getDay();

  if (cachedData[stockSymbol] && cachedData[stockSymbol].date === today) {
    return cachedData[stockSymbol].signals;
  }

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    const signals = generateRandomSignals(stockSymbol);
    cacheSignals(stockSymbol, signals);
    return signals;
  }

  return [];
};

const MarketSection = ({ marketData }) => {
  const [activeMarket, setActiveMarket] = useState("Indian_Equity");
  const [filteredMarketData, setFilteredMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const marketTabs = useMemo(
    () => ["Indian_Equity", "US_Equity", "Forex", "Crypto"],
    []
  );

  const socketOriginaldData = useMemo(() => {
    return marketData.reduce(
      (acc, { company_name, contract_type }) => {
        const type = TYPEMAPPING[contract_type];
        if (type && !acc[type].includes(company_name))
          acc[type].push(company_name);
        return acc;
      },
      { indian: [], us: [], forex: [], crypto: [] }
    );
  }, [marketData]);

  const { socketData } = useMarketController(socketOriginaldData);

  useEffect(() => {
    if (marketData?.length) {
      setIsLoading(true);
      try {
        const filtered = marketData.filter(
          (item) => item.contract_type === activeMarket
        );
        setFilteredMarketData(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [activeMarket, marketData]);

  // const safeSocketData = useMemo(() => {
  //   if (!socketData) return {};

  //   return Object.entries(socketOriginaldData).reduce(
  //     (acc, [market, symbols]) => {
  //       acc[market] = symbols.reduce((marketAcc, symbol) => {
  //         const socketEntry = Object.values(socketData[market] || {}).find(
  //           (entry) => entry.identifier === symbol
  //         );

  //         if (market === "indian") {
  //           const company = INDIAN_EQUITY.find((c) => c.value === symbol);
  //           if (company) {
  //             symbol = company.label;
  //           }
  //         }

  //         if (socketEntry && socketEntry?.price) {
  //           marketAcc[symbol] = {
  //             identifier: symbol,
  //             price: socketEntry.price,
  //             percentage: socketEntry.percentage,
  //           };
  //         } else {
  //           const cachedEntry = marketCloseData?.[symbol] || {};
  //           marketAcc[symbol] = {
  //             identifier: symbol,
  //             price: cachedEntry.closePrice || null,
  //             percentage: cachedEntry.percentage || 0,
  //           };
  //         }
  //         return marketAcc;
  //       }, {});

  //       return acc;
  //     },
  //     {}
  //   );
  // }, [socketData, socketOriginaldData, marketCloseData]);

  const findSocketPrice = (item, socketData, activeMarket) => {
    const marketType = TYPEMAPPING[activeMarket];
    if (!socketData?.[marketType]) return 0;

    // Get all entries for the current market type
    const marketData = socketData[marketType];

    // First try direct match with company_name
    if (marketData[item.company_name]?.price) {
      return marketData[item.company_name].price;
    }

    // If no direct match, try to find by identifier
    const matchedEntry = Object.values(marketData).find(
      (entry) => entry.identifier === item.company_name
    );

    return matchedEntry?.price || 0;
  };

  return (
    <div
      className="w-full bg-[#0E051B] rounded-lg p-4"
      style={{ border: "1px solid #6A11CB" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 flex items-center justify-center">
          <img className="w-6 h-6" src={Graph} alt="Graph" loading="lazy" />
        </div>
        <span className="text-white text-md font-medium">Markets</span>
      </div>
      <div className="rounded-xl p-4">
        <div className="flex flex-wrap bg-[#1A1625] rounded-full px-3 py-3 gap-2 mb-4">
          {marketTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMarket(tab)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 capitalize ${
                activeMarket === tab
                  ? "bg-purple-600 text-white"
                  : "text-white hover:bg-purple-600"
              }`}
            >
              {tab.replace(/_/g, " ")}
            </button>
          ))}
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 bg-[#1A1625] rounded-lg p-6"
          style={{ border: "1px solid #6A11CB" }}
        >
          {isLoading ? (
            <MarketSkeleton />
          ) : filteredMarketData?.length > 0 ? (
            filteredMarketData.map((item, index) => {
              // const socket =
              //   safeSocketData?.[TYPEMAPPING[item?.contract_type]]?.[
              //     item?.company_name
              //   ];
              const socketPrice = findSocketPrice(
                item,
                socketData,
                activeMarket
              );
              const cachedSignals = getCachedSignals(item.company_name);
              return (
                <div
                  key={`market-company-${index}`}
                  className="bg-[#1A1125] text-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex justify-between items-center mb-4 text-purpleText">
                    <h2 className="text-xl font-bold">{item.company_label}</h2>
                    <span className="text-2xl font-bold">
                      {socketPrice || item?.signals?.[0]?.close
                        ? activeMarket === "Indian_Equity"
                          ? `₹${socketPrice || item?.signals?.[0]?.close}`
                          : `$${socketPrice || item?.signals?.[0]?.close}`
                        : null}
                    </span>
                  </div>
                  <div className="space-y-3 py-4">
                    <p className="font-trebuchet text-xs font-normal leading-[13.93px] text-left text-gray-400 decoration-skip-ink mb-2">
                      Recent Signals:
                    </p>
                    {item?.signals?.length > 0 ? (
                      item.signals.map((signal, idx) => {
                        const color =
                          signal.trend === "bearish" ||
                          signal.value.includes("bearish") ||
                          signal.value.includes("Bearish")
                            ? "text-red-400"
                            : signal.trend === "bullish" ||
                              signal.value.includes("bullish") ||
                              signal.value.includes("Bullish")
                            ? "text-green-400"
                            : "text-gray-400";

                        return (
                          <div
                            key={`market-signal-${idx}`}
                            className="grid grid-cols-2 items-center bg-purple-800 rounded-lg py-3 px-4"
                          >
                            <div className={`flex items-center ${color}`}>
                              {signal.trend === "bearish" ||
                              signal.value.includes("bearish") ||
                              signal.value.includes("Bearish") ? (
                                <ArrowDownCircle size={16} className="mr-2" />
                              ) : signal.trend === "bullish" ||
                                signal.value.includes("bullish") ||
                                signal.value.includes("Bullish") ? (
                                <ArrowUpCircle size={16} className="mr-2" />
                              ) : (
                                <CircleMinus size={16} className="mr-2" />
                              )}
                              {signal.pattern_label}
                            </div>
                            <div className="grid grid-cols-2 justify-between items-center">
                              <div className="flex gap-2 text-sm text-gray-300">
                                <img
                                  src={sliders}
                                  alt="sliders"
                                  loading="lazy"
                                />
                                {signal.time_interval}
                              </div>
                              <div className="text-sm text-gray-400 justify-self-end">
                                {formatRelativeTime(signal.timestamp)}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        {cachedSignals.map((signal, idx) => {
                          const color =
                            signal.trend === "bearish"
                              ? "text-red-400"
                              : signal.trend === "bullish"
                              ? "text-green-400"
                              : "text-gray-400";

                          return (
                            <div
                              key={`market-signal-${idx}`}
                              className="grid grid-cols-2 items-center bg-purple-800 rounded-lg py-3 px-4"
                            >
                              <div className={`flex items-center ${color}`}>
                                {signal.trend === "bearish" ? (
                                  <ArrowDownCircle size={16} className="mr-2" />
                                ) : signal.trend === "bullish" ? (
                                  <ArrowUpCircle size={16} className="mr-2" />
                                ) : (
                                  <CircleMinus size={16} className="mr-2" />
                                )}
                                {signal.pattern_label}
                              </div>
                              <div className="grid grid-cols-2 justify-between items-center">
                                <div className="flex gap-2 text-sm text-gray-300">
                                  <img
                                    src={sliders}
                                    alt="sliders"
                                    loading="lazy"
                                  />
                                  {signal.time_interval}
                                </div>
                                <div className="text-sm text-gray-400 justify-self-end">
                                  {formatRelativeTime(signal.timestamp)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-white">
              No data available for this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MarketSection);
