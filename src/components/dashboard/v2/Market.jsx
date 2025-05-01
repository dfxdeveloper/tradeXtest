import React, {
  useState,
  useLayoutEffect,
  memo,
  useMemo,
  useEffect,
} from "react";
import axios from "axios";
import { AlarmClock, ChevronDown, SignalHigh } from "lucide-react";
import TradingViewChart from "./TradingViewChart";
import { formatRelativeTime } from "../../../utils";
import { MARKETS, TIME_FRAMES } from "../../../utils/constants";
import axiosInstance from "../../../utils/axiosHelper";
import CandlestickChart from "./CandlestickChart";
import PriceAlertModal from "../../modal/PriceAlertModal";

const Market = ({ userCompanies }) => {
  const [activeMarket, setActiveMarket] = useState(MARKETS[0].value);
  const [activeTimeframe, setActiveTimeframe] = useState("10m");
  const [timeframes, setTimeFrames] = useState(TIME_FRAMES);
  const [activeMarketCompanies, setActiveMarketCompanies] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [signals, setSignals] = useState({ loading: true, data: null });
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    if (userCompanies?.length) {
      const filteredCompanies = userCompanies.filter(
        (item) => item.category === activeMarket
      );
      /*NOTE: for TradingView
        .filter((company) => {
          if (company.identifier in DASHBOARD.INDIAN_EQUITY_CHART) {
            return DASHBOARD.INDIAN_EQUITY_CHART[company.identifier] !== "";
          }
          return true;
        })
        .map((company) => {
          if (
            company.identifier in DASHBOARD.INDIAN_EQUITY_CHART &&
            DASHBOARD.INDIAN_EQUITY_CHART[company.identifier]
          ) {
            return {
              ...company,
              identifier: DASHBOARD.INDIAN_EQUITY_CHART[company.identifier],
            };
          }
          return company;
        }); */
      setActiveMarketCompanies(filteredCompanies);
      setSelectedCompany(
        filteredCompanies?.length > 0 ? filteredCompanies[0].identifier : ""
      );
    }
  }, [activeMarket, userCompanies]);

  useLayoutEffect(() => {
    const updatedTimeframes = TIME_FRAMES.slice(-3);
    setTimeFrames(() =>
      activeMarket === "US_Equity"
        ? updatedTimeframes
        : activeMarket === "Indian_Equity"
        ? TIME_FRAMES.slice(0, 5)
        : TIME_FRAMES
    );
    setActiveTimeframe((prev) =>
      activeMarket === "US_Equity" &&
      !updatedTimeframes.find((t) => t.value === activeTimeframe)
        ? "1D"
        : activeMarket === "Indian_Equity" &&
          !TIME_FRAMES.slice(0, 5).find((t) => t.value === activeTimeframe)
        ? "10m"
        : prev
    );
  }, [activeMarket, activeTimeframe]);

  const fetchSignals = async ({
    contractType,
    companyIdentifier,
    watchlistDetails,
    signal,
  }) => {
    try {
      const response = await axiosInstance.get(`/user/signals`, {
        params: {
          ...(contractType && { contractType }),
          ...(companyIdentifier && { companyIdentifier }),
          limit: 50,
        },
        ...(signal && { signal }),
      });
      const withCompanyLabel = response.map((s) => ({
        ...s,
        company_label: watchlistDetails.find(
          (item) =>
            item.identifier === s.companyIdentifier &&
            item.contract_type === s.contract_type
        )?.name,
      }));

      const getLatestSignals = (type) => {
        const filteredSignals = withCompanyLabel.filter(
          (signal) => signal.type === type
        );
        if (!filteredSignals?.length) return [];
        return filteredSignals
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 3);
      };

      setSignals((prev) => ({
        ...prev,
        loading: false,
        data: {
          patterns: getLatestSignals("pattern"),
          strategies: getLatestSignals("strategy"),
        },
      }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        setSignals((prev) => ({ ...prev, loading: false, data: [] }));
      }
    }
  };

  useEffect(() => {
    if (activeMarket && selectedCompany) {
      const abortController = new AbortController();
      fetchSignals({
        contractType: activeMarket,
        companyIdentifier: selectedCompany,
        signal: abortController.signal,
        watchlistDetails: userCompanies,
      });
      return () => abortController.abort();
    }
  }, [activeMarket, selectedCompany, userCompanies]);

  const chartValues = useMemo(() => {
    let interval = "",
      symbol = "";
    switch (activeMarket) {
      case MARKETS[0].value:
        symbol = selectedCompany;
        interval = activeTimeframe;
        break;
      case MARKETS[1].value:
        symbol = selectedCompany;
        interval = activeTimeframe.replace("m", "");
        break;
      case MARKETS[2].value:
        symbol = selectedCompany.replace("X:", "");
        interval = activeTimeframe.replace("m", "");
        break;
      case MARKETS[3].value:
        symbol = selectedCompany.replace("C:", "");
        interval = activeTimeframe.replace("m", "");
        break;
      default:
        break;
    }
    return { interval, symbol };
  }, [activeMarket, activeTimeframe, selectedCompany]);

  return (
    <>
      <div
        className="w-full max-w-7xl border border-gray-600 mx-auto mt-4 sm:mt-6 p-3 rounded-xl"
        style={{
          background:
            "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)",
        }}
      >
        <h1 className="flex items-center justify-center gap-1 max-w-max text-white mb-2 py-1 mx-3 px-4 text-xl font-medium font-gilroy bg-transparent border border-[#FFFFFF73] rounded-3xl button_blur">
          <SignalHigh color="#19B083" scale={2} />
          Markets
        </h1>
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
          <div className="flex-1 p-2">
            <div className="relative mb-4">
              <div className="flex overflow-x-auto pb-1">
                <div className="flex bg-[#251748] p-1 rounded-full gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 whitespace-nowrap">
                  {MARKETS.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => {
                        setActiveMarket(tab.value);
                      }}
                      className={`px-2 sm:px-2.5 md:px-3 w-full py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                        activeMarket === tab.value
                          ? "bg-[linear-gradient(186.67deg,_#B039FF_17.19%,_#6A2299_95.59%)] text-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedCompany ? (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <div className="relative sm:w-auto sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px]">
                    <select
                      className="w-full appearance-none bg-gradient-to-r from-purple-900 to-indigo-800 text-white font-medium text-xs sm:text-sm py-1.5 px-3 pr-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                      value={selectedCompany}
                      onChange={(e) => {
                        setSelectedCompany(e.target.value);
                      }}
                    >
                      {Array.isArray(activeMarketCompanies) &&
                        activeMarketCompanies?.length > 0 &&
                        activeMarketCompanies.map((company) => {
                          const truncateName = (name) => {
                            const words = name.split(" ");
                            if (words.length > 3) {
                              return words.slice(0, 3).join(" ") + "...";
                            }
                            return name;
                          };

                          return (
                            <option
                              key={company.identifier}
                              value={company.identifier}
                              className="bg-purple-900 text-white py-1"
                              title={company.name}
                            >
                              {truncateName(company.name)}
                            </option>
                          );
                        })}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center justify-around gap-3 bg-gradient-to-r from-[#FF0844] to-[#FFB199] py-1.5 px-3 pr-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <AlarmClock color="#FFFFFF" />
                    <span>Create Alert</span>
                  </button>

                  <div className="w-full sm:w-auto overflow-x-auto">
                    <div className="flex flex-nowrap">
                      {timeframes.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => setActiveTimeframe(t.value)}
                          className={`
                          flex-shrink-0
                          flex items-center justify-center
                          px-1.5 sm:px-2 md:px-3 lg:px-4
                          py-1.5 sm:py-1.5 md:py-2
                          text-xs
                          font-medium
                          rounded-md
                          transition-all duration-200
                          min-w-[2rem] sm:min-w-[2.25rem] md:min-w-[2.5rem]
                          mx-0.5 first:ml-0 last:mr-0
                          ${
                            activeTimeframe === t.value
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                              : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                          }
                        `}
                        >
                          {t.value}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {chartValues.symbol &&
                chartValues.interval &&
                activeMarket === MARKETS[0].value ? (
                  <CandlestickChart
                    identifier={chartValues.symbol}
                    interval={chartValues.interval}
                  />
                ) : (
                  <TradingViewChart
                    symbol={chartValues.symbol}
                    interval={chartValues.interval}
                  />
                )}
              </>
            ) : (
              <p className="col-span-full text-center text-white">
                No data available for this category
              </p>
            )}
          </div>
          {selectedCompany && (
            <div className="hidden xl:block w-72 bg-[#231F35] p-4 rounded-lg shadow-md">
              <div className="mb-6">
                <h3 className="text-[#CB7EFF] font-gilroy font-bold text-sm mb-3">
                  Latest Patterns
                </h3>
                <div className="space-y-4">
                  {signals.data?.patterns?.length > 0 ? (
                    signals.data.patterns.map((pattern, index) => (
                      <div
                        key={`pattern-${index}`}
                        className="flex items-stretch border-b border-gray-800/50 pb-2 last:border-0"
                      >
                        <div
                          className={`w-1 ${
                            pattern.movement > 0
                              ? "bg-[#00D200]"
                              : "bg-[#2575FC]"
                          } mr-3 rounded`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-gilroy font-medium text-sm capitalize truncate">
                            <p className="text-white font-gilroy font-medium text-sm capitalize truncate">
                              {`${pattern.key.replace(/_/g, " ")} ${
                                pattern.time_interval
                                  ? `(${pattern.time_interval})`
                                  : ""
                              }`}
                            </p>
                          </p>
                          <p className="text-white font-gilroy font-medium text-xs">
                            Formed on{" "}
                            <span className="text-[#69A1FF] font-gilroy font-regular">
                              {formatRelativeTime(pattern.timestamp)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">
                      No patterns detected for selected company
                    </p>
                  )}
                </div>
              </div>
              <div className="py-4 border-t border-gray-700/30">
                <h3 className="text-[#CB7EFF] font-gilroy font-bold text-sm mb-3">
                  Latest Strategies
                </h3>
                <div className="space-y-3">
                  {signals.data?.strategies?.length > 0 ? (
                    signals.data.strategies.map((strategy, index) => (
                      <div
                        key={`strategy-desktop-${index}`}
                        className="flex items-stretch border-b border-gray-800/50 pb-2 last:border-0"
                      >
                        <div
                          className={`w-1 ${
                            strategy.movement > 0
                              ? "bg-[#00D200]"
                              : "bg-[#2575FC]"
                          } mr-3 rounded`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-gilroy font-medium text-sm capitalize truncate">
                            {`${strategy.key.replace(/_/g, " ")} ${
                              strategy.time_interval
                                ? `(${strategy.time_interval})`
                                : ""
                            }`}
                          </p>
                          <p className="text-white font-gilroy font-medium text-xs">
                            Formed on{" "}
                            <span className="text-[#69A1FF] font-gilroy font-regular">
                              {formatRelativeTime(strategy.timestamp)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs">
                      No strategies detected for selected company
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {selectedCompany && (
          <div className="xl:hidden mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#231F35] p-3 sm:p-4 rounded-lg shadow-md">
              <h3 className="text-[#CB7EFF] font-gilroy font-bold text-xs sm:text-sm mb-2 sm:mb-3">
                Latest Patterns
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {signals.data?.patterns?.length > 0 ? (
                  signals.data.patterns.map((pattern, index) => (
                    <div
                      key={`pattern-mobile-${index}`}
                      className="flex items-stretch border-b border-gray-800/50 pb-2 last:border-0"
                    >
                      <div
                        className={`w-1 ${
                          pattern.movement > 0 ? "bg-[#00D200]" : "bg-[#2575FC]"
                        } mr-2 sm:mr-3 rounded`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-gilroy font-medium text-xs sm:text-sm capitalize truncate">
                          {pattern.key.replace(/_/g, " ")}
                        </p>
                        <p className="text-white font-gilroy font-medium text-[0.65rem] sm:text-xs">
                          Formed on{" "}
                          <span className="text-[#69A1FF] font-gilroy font-regular">
                            {formatRelativeTime(pattern.timestamp)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">
                    No patterns detected for selected company
                  </p>
                )}
              </div>
            </div>
            <div className="bg-[#231F35] p-3 sm:p-4 rounded-lg shadow-md">
              <h3 className="text-[#CB7EFF] font-gilroy font-bold text-xs sm:text-sm mb-2 sm:mb-3">
                Latest Strategies
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {signals.data?.strategies?.length > 0 ? (
                  signals.data.strategies.map((strategy, index) => (
                    <div
                      key={`strategy-mobile-${index}`}
                      className="flex items-stretch border-b border-gray-800/50 pb-2 last:border-0"
                    >
                      <div
                        className={`w-1 ${
                          strategy.movement > 0
                            ? "bg-[#00D200]"
                            : "bg-[#2575FC]"
                        } mr-2 sm:mr-3 rounded`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-gilroy font-medium text-xs sm:text-sm capitalize truncate">
                          {strategy.key.replace(/_/g, " ")}
                        </p>
                        <p className="text-white font-gilroy font-medium text-[0.65rem] sm:text-xs">
                          Formed on{" "}
                          <span className="text-[#69A1FF] font-gilroy font-regular">
                            {formatRelativeTime(strategy.timestamp)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">
                    No strategies detected for selected company
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <PriceAlertModal
          onClose={() => setShowModal(false)}
          symbol={selectedCompany}
          category={activeMarket}
        />
      )}
    </>
  );
};

export default memo(Market);
