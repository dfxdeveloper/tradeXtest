import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../../utils/axiosHelper";
import { Clock, ChevronLeft, Filter, X, ChevronDown } from "lucide-react";
import { formatRelativeTime, round, strategyLabel } from "../../../utils";
import {
  LOOKBACK_PERIOD_OPTIONS,
  MARKETS,
  SIGNAL_STRENGTHS,
  TIME_FRAMES,
} from "../../../utils/constants";
import rsiGt70 from "../../../assets/images/rsi_gt_70.jpg";
import rsiLt30 from "../../../assets/images/rsi_lt_30.jpg";
import Skeleton from "react-loading-skeleton";

const FilterModal = (props) => {
  const [strategies, setStrategies] = useState(null);

  const fetchStrategies = async (signal) => {
    try {
      const response = await axiosInstance.get("user/strategy", { signal });
      if (!response?.data?.length) throw new Error("No strategies found!");
      setStrategies(response.data.flatMap((category) => category.strategies));
    } catch (error) {
      if (!axios.isCancel(error)) setStrategies(null);
    }
  };

  useEffect(() => {
    if (props.isSelectStrategy === null) {
      const controller = new AbortController();
      fetchStrategies(controller.signal);
      return () => controller.abort();
    }
  }, [props.isSelectStrategy]);

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={props.onClose}
      />

      <div className="w-full max-w-3xl border border-[#B039FF] bg-[linear-gradient(359.93deg,_#220C39_-10.38%,_#6C4984_99.93%)] overflow-y-auto relative z-10 rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-center px-3 sm:px-3 py-3 sm:py-3">
          <h2 className="text-lg sm:text-xl font-medium text-white font-gilroy">
            Filter Chart Strategies
          </h2>
          <button
            onClick={props.onClose}
            className="absolute right-3 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.68)_0%,_rgba(255,255,255,0.34)_100%)] transition"
          >
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-[3px] border-[#220C39] bg-transparent">
              <X className="w-3 h-3 sm:w-4 sm:h-4 font-bold text-[#220C39]" />
            </div>
          </button>
        </div>

        <div className="px-3 sm:px-6 py-2 pt-0">
          <div className="bg-[#4F2E70] -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mb-2">
            <h3 className="text-lg text-white font-gilroy font-bold">
              Contract Type
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {MARKETS.map((type) => (
              <button
                key={type.value}
                onClick={() => props.setContractType(type.value)}
                className={`px-4 py-2 rounded-full font-regular border border-[#B039FF] font-gilroy text-sm transition ${
                  props.contractType === type.value
                    ? "bg-[#B039FF] text-white"
                    : "bg-[#270D42] text-white"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-3 sm:px-6 py-2 pt-0">
          <div className="bg-[#4F2E70]  -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mb-4 ">
            <h3 className="text-lg text-white font-gilroy font-bold">
              Time & Frequency
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <div className="dropdown-container">
                <label className="text-sm">Time & Frequency</label>
                <select
                  value={props.timeFrequency}
                  onChange={(e) => props.setTimeFrequency(e.target.value)}
                  className="dropdown w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                >
                  <option value="">Select timeframe</option>
                  {TIME_FRAMES.map((option) => (
                    <option
                      className="w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-[55%] transform-translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="relative">
              <div className="dropdown-container">
                <label className="text-sm">Lookback Period</label>
                <select
                  value={props.loopbackPeriod}
                  onChange={(e) => props.setLoopbackPeriod(e.target.value)}
                  className="dropdown w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                >
                  <option value="">Select lookback</option>
                  {LOOKBACK_PERIOD_OPTIONS.map((option) => (
                    <option
                      className="w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-[55%] transform-translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="relative">
              <div className="dropdown-container">
                <label className="text-sm">Strength</label>
                <select
                  value={props.strength}
                  onChange={(e) => props.setStrength(e.target.value)}
                  className="dropdown w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                >
                  <option value="">Select Strength</option>
                  {SIGNAL_STRENGTHS.map((option) => (
                    <option
                      className="w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-[55%] transform-translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {props.isSelectStrategy === null && (
              <div className="relative">
                <div className="dropdown-container">
                  <label className="text-sm">Strategy name</label>
                  <select
                    value={props.strategyName}
                    onChange={(e) => props.setStrategyName(e.target.value)}
                    className="dropdown w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                  >
                    <option value="">Select lookback</option>
                    {strategies?.length > 0 &&
                      strategies
                        .filter((s) => s.name !== "super_trend_strategy")
                        .map((option) => (
                          <option
                            className="w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                            key={option.name}
                            value={option.name}
                          >
                            {option.label}
                          </option>
                        ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-[55%] transform-translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 pt-2">
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => {
                props.onClose();
                props.refetchStrategy({
                  page: 1,
                  time_interval: props.timeFrequency,
                  contract_type: props.contractType,
                  loopbackPeriod: props.loopbackPeriod,
                  strategy_names: props.strategyName,
                  strength: props.strength,
                  trend: props.selectedTab === tabs[0] ? "" : props.selectedTab,
                });
              }}
              className="px-6 py-2 bg-gradient-to-r from-[#6A11CB] to-[#B039FF] text-white font-gilroy font-medium rounded-full transition hover:opacity-90"
            >
              Apply
            </button>

            <button
              onClick={(e) => {
                props.onClose();
                props.onReset(e, true);
              }}
              className="px-6 py-2 bg-gradient-to-r from-[#6A11CB] to-[#B039FF] text-white font-gilroy font-medium rounded-full transition hover:opacity-90"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const tabs = ["all", "bullish", "bearish"];

const SkeletonCard = () => {
  return (
    <div className="rounded-lg overflow-hidden bg-[#1A1125] border border-[#6A11CB] w-full">
      <div className="bg-[linear-gradient(90.01deg,_#190229_0.01%,_#58078F_99.99%)] p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-1 mr-2 w-6 h-6">
              <Skeleton
                width={15}
                height={15}
                baseColor="#4a307b"
                highlightColor="#6a11cb"
              />
            </div>
            <div>
              <h3 className="text-sm font-gilroy font-bold text-white">
                <Skeleton
                  width={80}
                  baseColor="#4a307b"
                  highlightColor="#6a11cb"
                />
              </h3>
              <p className="text-white font-gilroy font-regular text-xs">
                <Skeleton
                  width={120}
                  baseColor="#4a307b"
                  highlightColor="#6a11cb"
                />
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full">
            <Skeleton width={40} baseColor="#4a307b" highlightColor="#6a11cb" />
          </span>
        </div>

        <div className="mb-2">
          <div className="flex items-center">
            <Skeleton
              width={150}
              baseColor="#4a307b"
              highlightColor="#6a11cb"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <Skeleton
              width={60}
              height={20}
              baseColor="#4a307b"
              highlightColor="#6a11cb"
            />
          </div>
          <div>
            <Skeleton
              width={100}
              height={20}
              baseColor="#4a307b"
              highlightColor="#6a11cb"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#331F41] p-3">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-[#220038] border border-[#8C27CF] p-2 rounded-lg">
            <Skeleton width={60} baseColor="#4a307b" highlightColor="#6a11cb" />
            <Skeleton width={80} baseColor="#4a307b" highlightColor="#6a11cb" />
          </div>
          <div className="bg-[#220038] border border-[#8C27CF] p-2 rounded-lg">
            <Skeleton width={60} baseColor="#4a307b" highlightColor="#6a11cb" />
            <Skeleton width={80} baseColor="#4a307b" highlightColor="#6a11cb" />
          </div>
        </div>

        <div className="bg-black rounded-lg overflow-hidden flex justify-center items-center h-[160px]">
          <Skeleton
            height={160}
            width="100%"
            baseColor="#4a307b"
            highlightColor="#6a11cb"
          />
        </div>
      </div>
    </div>
  );
};

const AllStrategies = ({
  onBackClick,
  selectedStrategyDetails,
  strategySignal,
  strategySignalLoading,
  strategySignalCurrentPage,
  setStrategySignalCurrentPage,
  strategySignalTotalCount,
  refetchStrategy,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [filteredData, setFilteredData] = useState(null);
  const [contractType, setContractType] = useState("");
  const [timeFrequency, setTimeFrequency] = useState("");
  const [loopbackPeriod, setLoopbackPeriod] = useState("");
  const [strength, setStrength] = useState("");
  const [strategyName, setStrategyName] = useState(
    selectedStrategyDetails?.name
  );

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterOpen]);

  const handleBack = (e, reset = false) => {
    e?.preventDefault();
    setSelectedTab(tabs[0]);
    setFilteredData(null);
    setContractType("");
    setTimeFrequency("");
    setLoopbackPeriod("");
    setStrength("");
    setStrategyName("");
    setStrategySignalCurrentPage(1);
    refetchStrategy({
      page: 1,
      ...(reset &&
        selectedStrategyDetails?.name && {
          strategy_names: selectedStrategyDetails?.name,
        }),
    });
    if (!reset) {
      onBackClick();
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setFilteredData(null);
    // setSelectedTab(tabs[0]);
  };

  const hasNextPage =
    strategySignalCurrentPage < Math.ceil(strategySignalTotalCount / 8);

  return (
    <div className="text-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-3 gap-3">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#000000] transition shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-gilroy font-medium text-white capitalize">
                {selectedStrategyDetails?.category || "Recent Strategy Signals"}
              </h1>
              {/* <span className="text-xs sm:text-sm text-[#E7D2FF]">
                • {strategySignalTotalCount} Stocks in Recent
              </span> */}
            </div>
          </div>
        </div>

        <button
          className="self-end sm:self-auto flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold font-gilroy bg-[#2C88FF] text-white transition hover:bg-[#1C78EF]"
          onClick={toggleFilter}
        >
          <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
          Filter
        </button>
      </div>

      {selectedStrategyDetails?.label && (
        <div className="bg-[#220C39] border border-[#4A0793] rounded-lg p-4 mb-3">
          <h2 className="text-lg font-semibold font-gilroy mb-2">
            {selectedStrategyDetails.label === "Golden Cross Strategy"
              ? "Golden/Death Cross Strategy"
              : selectedStrategyDetails.label}
          </h2>
          <p className="text-sm font-regular font-gilroy text-white">
            {selectedStrategyDetails.description}
          </p>
        </div>
      )}

      <div className="flex gap-2 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setSelectedTab(tab);
              // if (tab === tabs[0]) {
              //   setFilteredData(strategySignal);
              // } else {
              //   setFilteredData(strategySignal.filter((s) => s.trend === tab));
              // }
              refetchStrategy({
                strategy_names: selectedStrategyDetails?.name || strategyName,
                time_interval: timeFrequency,
                contract_type: contractType,
                loopbackPeriod: loopbackPeriod,
                trend: tab === tabs[0] ? "" : tab,
                page: 1,
              });
              setStrategySignalCurrentPage(1);
            }}
            className={`px-4 py-2 font-gilroy font-regular rounded-full text-sm transition-all duration-200 ${
              selectedTab === tab
                ? "bg-[linear-gradient(186.67deg,_#B039FF_17.19%,_#6A2299_95.59%)] text-white"
                : "text-white hover:bg-[#6A11CB]/40"
            } capitalize`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {strategySignalLoading ? (
          // Display skeleton cards while loading
          Array(8)
            .fill(0)
            .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)
        ) : strategySignal?.length > 0 ? (
          (filteredData || strategySignal)?.length > 0 ? (
            (filteredData || strategySignal).map((card, index) => {
              const percentageChange =
                card?.open && card?.close
                  ? round(((card.close - card.open) / card.open) * 100, 2)
                  : 0;

              const image =
                card.strategies === "rsi_strategy"
                  ? card.trend === "bearish"
                    ? rsiGt70
                    : rsiLt30
                  : card.image_url;

              return (
                <div
                  key={`strategy-signal-card-${index}`}
                  className="rounded-lg overflow-hidden border border-[#6A11CB] w-full"
                >
                  {/* Card Header */}
                  <div className="bg-[linear-gradient(90.01deg,_#190229_0.01%,_#58078F_99.99%)] p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full px-1.5 py-1 mr-2">
                          {card?.companyIdentifier &&
                            card.companyIdentifier
                              .replace(/^(X:|C:)/, "")
                              .slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-sm font-gilroy font-bold text-white">
                            {card.companyIdentifier}
                          </h3>
                          <p className="text-white font-gilroy font-regular text-xs">
                            {card.company_label}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`${
                          percentageChange < 0
                            ? "bg-[linear-gradient(180deg,_#FF9595_0%,_#FFD0D0_100%)] text-[#AB0505]"
                            : percentageChange > 0
                            ? "bg-[linear-gradient(180deg,_#95FF95_0%,#D0FFD0_100%)] text-[#118C11]"
                            : "bg-[linear-gradient(180deg,_#D9D9D9_0%,_#F0F0F0_100%)] text-[#4A4A4A]"
                        } px-2 py-0.5 rounded-full text-xs font-medium`}
                      >
                        {percentageChange}%
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="flex items-center">
                        <span className="text-[#FFF763] font-gilroy font-bold mr-1 text-lg">
                          •
                        </span>
                        <span className="text-[#FFF763] font-gilroy font-bold text-xs capitalize">
                          {strategyLabel(card.strategies, card.trend)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className={`${
                          card.trend === "bearish"
                            ? "bg-[linear-gradient(180deg,_#FF9595_0%,_#FFD0D0_100%)] text-[#AB0505]"
                            : card.trend === "bullish"
                            ? "bg-[linear-gradient(180deg,_#95FF95_0%,#D0FFD0_100%)] text-[#118C11]"
                            : "bg-[linear-gradient(180deg,_#D9D9D9_0%,_#F0F0F0_100%)] text-[#4A4A4A]"
                        } font-gilroy text-xs px-3 py-0.5 rounded-full font-bold capitalize`}
                      >
                        {card.trend}
                      </button>
                      <div className="flex rounded-full px-3 py-0.5 items-center bg-[linear-gradient(90deg,_#B039FF_0%,_#6A11CB_100%)] text-white font-gilroy font-medium text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatRelativeTime(card.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="bg-[#331F41] p-3">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-[#220038] border border-[#8C27CF] p-2 rounded-lg">
                        <p className="text-white text-sm font-gilroy font-bold">
                          {card.close}
                        </p>
                        <p className="text-white font-gilroy font-regular text-xs">
                          Current Price
                        </p>
                      </div>
                      <div className="bg-[#220038] border border-[#8C27CF] p-2 rounded-lg">
                        <p className="text-white font-gilroy text-sm font-bold">
                          {card.strength}
                        </p>
                        <p className="text-white font-gilroy font-regular text-xs">
                          Signal Strength
                        </p>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-black rounded-lg overflow-hidden flex justify-center items-center h-[160px]">
                      <img
                        src={image}
                        alt="strategy-chart"
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-white">
              No data found!
            </p>
          )
        ) : (
          <p className="col-span-full text-center text-white">No data found!</p>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-[linear-gradient(90deg,_#6A11CB_0%,_#B039FF_100%)] rounded-full text-sm font-medium font-gilroy text-white"
            onClick={() => {
              // setSelectedTab(tabs[0]);
              setFilteredData(null);
              refetchStrategy({
                strategy_names: selectedStrategyDetails?.name || strategyName,
                time_interval: timeFrequency,
                contract_type: contractType,
                loopbackPeriod,
                trend: selectedTab === tabs[0] ? "" : selectedTab,
                strength,
                page: strategySignalCurrentPage + 1,
              });
              setStrategySignalCurrentPage((prev) => prev + 1);
            }}
          >
            Load more
          </button>
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        isSelectStrategy={selectedStrategyDetails}
        refetchStrategy={refetchStrategy}
        contractType={contractType}
        setContractType={setContractType}
        timeFrequency={timeFrequency}
        setTimeFrequency={setTimeFrequency}
        loopbackPeriod={loopbackPeriod}
        setLoopbackPeriod={setLoopbackPeriod}
        strength={strength}
        setStrength={setStrength}
        strategyName={strategyName}
        setStrategyName={setStrategyName}
        selectedTab={selectedTab}
        onReset={handleBack}
      />
    </div>
  );
};

export default AllStrategies;
