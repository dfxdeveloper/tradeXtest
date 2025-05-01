import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ReactTyped } from "react-typed";
// import search_icon from "../../assets/icons/search-icon.svg";
import graph_img from "../../assets/images/herosection-right-img.png";
import useMarketController from "../../hooks/useMarketController";
import localStorageWithExpiry from "../../utils/localstorage";
import { changeFormat } from "../../utils/socket";
import axiosInstance from "../../utils/axiosHelper";
import { CACHE } from "../../utils/constants";

const cacheKey = "hero_section";

function HeroSection() {
  const [marketCloseData, setMarketCloseData] = useState(null);

  const originalMarkets = useMemo(
    () => ({
      indian: ["NIFTY1", "BANKNIFTY1"],
      us: ["AAPL", "TSLA"],
      forex: ["C:EURUSD", "C:USDCAD"],
      crypto: ["X:BTCUSD", "X:ETHUSD"],
    }),
    []
  );

  const marketNames = useMemo(
    () => ({
      indian: {
        NIFTY1: "NIFTY 50",
        BANKNIFTY1: "NIFTY BANK",
      },
      us: {
        AAPL: "Apple",
        TSLA: "Tesla",
      },
      forex: {
        "C:EURUSD": "Euro/US Dollar",
        "C:USDCAD": "US Dollar/Canadian Dollar",
      },
      crypto: {
        "X:BTCUSD": "Bitcoin",
        "X:ETHUSD": "Ethereum",
      },
    }),
    []
  );

  const fetchAllMarketCloseData = useCallback(async (markets) => {
    try {
      const cachedData = localStorageWithExpiry.getItem(cacheKey);
      if (cachedData) {
        const cachedIdentifiers = Object.keys(cachedData).sort().join(",");
        const originalIdentifiers = Object.keys(markets)
          .filter((key) => key !== "crypto")
          .flatMap((key) => markets[key])
          .sort()
          .join(",");
        if (cachedIdentifiers === originalIdentifiers) {
          setMarketCloseData(cachedData);
          return;
        }
      }

      const formattedMarkets = Object.entries(markets).reduce(
        (acc, [market, data]) => {
          if (!changeFormat[market]) return acc;
          const formatSymbols = changeFormat[market](data);
          acc[market] = formatSymbols;
          return acc;
        },
        {}
      );

      const priceMap = {};
      const fetchPromises = Object.entries(formattedMarkets).map(
        async ([market, formatSymbols]) => {
          if (!formatSymbols || formatSymbols.length === 0) return null;

          try {
            const { stocks = [] } = await axiosInstance.get(
              `user/stocks?market=${market}&stocks=${formatSymbols.join(",")}`
            );

            if (stocks.length) {
              stocks.forEach((stock) => {
                const index = formatSymbols.indexOf(stock.code);
                const originalName = markets[market][index];
                if (index !== -1) {
                  const closePrice = stock.close || "~";
                  const openPrice = stock.open || "~";
                  const percentage = (
                    closePrice !== "~" && openPrice !== "~"
                      ? ((closePrice - openPrice) / openPrice) * 100
                      : 0
                  ).toFixed(2);
                  priceMap[originalName] = { closePrice, percentage };
                }
              });
            }
          } catch (error) {
            console.error(`Error fetching ${market} market data:`, error);
          }
        }
      );

      await Promise.all(fetchPromises);

      localStorageWithExpiry.setItem(
        cacheKey,
        priceMap,
        CACHE.MARLET_CLOSE_DATA_EXPIRY_TIME
      );
      setMarketCloseData(priceMap);
    } catch (error) {
      console.error("Error fetching market close data:", error);
    }
  }, []);

  const { socketData } = useMarketController(originalMarkets);

  useEffect(() => {
    fetchAllMarketCloseData(originalMarkets);
  }, [fetchAllMarketCloseData, originalMarkets]);

  const safeSocketData = useMemo(() => {
    if (!socketData) return {};

    return Object.entries(originalMarkets).reduce((acc, [market, symbols]) => {
      acc[market] = symbols.reduce((marketAcc, symbol) => {
        const socketEntry = Object.values(socketData[market] || {}).find(
          (entry) => entry.identifier === symbol
        );
        if (socketEntry && socketEntry?.price) {
          marketAcc[symbol] = {
            ...socketEntry,
            identifier: symbol,
          };
        } else {
          const cachedEntry = marketCloseData?.[symbol] || {};
          marketAcc[symbol] = {
            identifier: symbol,
            price: cachedEntry.closePrice || "~",
            percentage: cachedEntry.percentage || 0,
          };
        }
        return marketAcc;
      }, {});

      return acc;
    }, {});
  }, [socketData, originalMarkets, marketCloseData]);

  return (
    <section className="herosection-bg-img">
      <div className="container md:flex lg:gap-6 xl:gap-8 xl:h-screen">
        {/* Left part */}
        <div className="md:w-1/2 lg:w-3/5 xl:w-1/2 flex flex-col gap-5 lg:gap-5 xl:gap-6 py-0 pt-12 md:py-24 xl:py-24">
          <h1 className="text-white text-3xl lg:text-4xl xl:text-5xl font-gilroy font-bold lg:leading-tight xl:leading-[64px] h-28 md:h-40 lg:h-52 xl:h-56">
            {" "}
            {/* Adjust height here */}
            Take Control of Your Financial Future with{" "}
            <ReactTyped
              strings={[
                "Strategic Investments",
                "Confident Choices",
                "Proven Expertise",
              ]}
              typeSpeed={100}
              backSpeed={80}
              loop
            />
          </h1>
          <h2 className="text-white font-gilroy font-light text-base mt-4 lg:mt-0 xl:mt-0 md:mt-0 md:text-base lg:text-lg xl:text-xl">
            From Research to Results - Your Path to Trading Success Starts Here
          </h2>

          {/* <div className="bg-white rounded-full px-4 py-2 flex gap-2 lg:gap-4">
            <img
              src={search_icon}
              alt="search-icon"
              className="w-6"
              loading="lazy"
            />
            <p className="font-gilroy font-light text-base md:text-xl text-[#3D3D3D]">
              Search Markets Here
            </p>
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <div className="overflow-hidden w-full">
              <div
                className="flex animate-scroll"
                style={{
                  width: `${
                    Object.values(socketData).reduce(
                      (acc, market) => acc + Object.keys(market).length,
                      0
                    ) *
                    144 *
                    2
                  }px`,
                }}
              >
                {Array.from({ length: 2 }).map((_, index) => (
                  <Fragment key={index}>
                    {Object.entries(safeSocketData).map(([market, data], i) => (
                      <Fragment key={`${market}-${index}-${i}`}>
                        {Object.values(data).map((item, idx) => (
                          <div
                            key={`${item.identifier}-${idx}`}
                            className="mr-2 sm:mr-4 flex-shrink-0 text-end min-w-[100px] sm:min-w-[100px] lg:min-w-[100px]"
                          >
                            <p className="text-[10px] sm:text-xs font-medium h-3 sm:h-4 truncate">
                              {marketNames[market][item.identifier]}
                            </p>
                            <p className="text-xs sm:text-sm font-medium h-4 sm:h-5 font-mono">
                              {typeof item.price === "number"
                                ? item.price.toFixed(2)
                                : item.price}
                            </p>
                            <div
                              className={`text-xs sm:text-sm font-medium h-4 sm:h-5 font-mono flex flex-wrap justify-end gap-x-1 ${
                                +item.percentage === 0
                                  ? "text-gray-400"
                                  : +item.percentage > 0
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              <span className="inline-block min-w-[40px] sm:min-w-[50px] lg:min-w-[60px]">
                                {item?.absChange &&
                                typeof item.absChange === "number"
                                  ? item.absChange.toFixed(2)
                                  : item.absChange}
                              </span>
                              <span className="inline-block min-w-[40px] sm:min-w-[50px] lg:min-w-[60px]">
                                (
                                {item?.percentage &&
                                typeof item.percentage === "number"
                                  ? item.percentage.toFixed(2)
                                  : item.percentage}
                                %)
                              </span>
                            </div>
                          </div>
                        ))}
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Right Image part */}
        <div className="flex md:w-1/2 lg:w-2/5 xl:w-1/2">
          <img src={graph_img} alt="Graph" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
