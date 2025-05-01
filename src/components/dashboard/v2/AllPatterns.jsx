import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Clock,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import { formatRelativeTime, patternTypeImage } from "../../../utils";
import {
  TIME_FRAMES,
  LOOKBACK_PERIOD_OPTIONS,
  PATTERN_TYPES,
  MARKETS,
} from "../../../utils/constants";
import "./Dropdown.css";
import axiosInstance from "../../../utils/axiosHelper";
import Skeleton from "react-loading-skeleton";

const FORMATED_MARKETS = [{ label: "All", value: "" }, ...MARKETS];

// Filter Modal Component
const FilterModal = (props) => {
  const [selectedPatterns, setSelectedPatterns] = useState([
    "Single Candlesticks",
  ]);
  const [patterns, setPatterns] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.scrollTop = 0;
    }
  }, [props.isOpen]);

  const togglePatternType = (pattern) => {
    if (selectedPatterns.includes(pattern)) {
      setSelectedPatterns("Single Candlesticks");
    } else {
      setSelectedPatterns([pattern]);
    }
  };

  const fetchPatterns = async (signal) => {
    try {
      const response = await axiosInstance.get(`/user/pattern-signal/config`, {
        signal,
      });
      setPatterns(response.groupedPatternTypes);
    } catch (error) {
      setPatterns([]);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPatterns(controller.signal);
    return () => controller.abort();
  }, []);

  const patternOptions = useMemo(() => {
    const selectedCategory = PATTERN_TYPES.find((type) =>
      selectedPatterns.includes(type)
    );
    if (selectedCategory) {
      const categoryPatterns =
        patterns?.find((c) => c.category === selectedCategory)?.patternTypes ||
        [];
      return categoryPatterns.map((pattern) => ({
        label: pattern.label,
        value: pattern.name,
      }));
    }
    return [];
  }, [patterns, selectedPatterns]);

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay with blur effect */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={props.onClose}
      />

      {/* Modal content */}
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 rounded-xl"
        style={{
          background:
            "linear-gradient(359.4deg, #220C39 10.39%, #6C4984 99.39%)",
          boxShadow: "0px 4px 20.2px 0px #B039FF2E",
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-center p-4 sm:p-6 sm:pb-4 bg-[#220C39]">
          <h2 className="text-lg sm:text-xl font-medium text-white font-gilroy">
            Filter Chart Patterns
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

        {/* Pattern Type */}
        <div className="p-4 sm:p-6 pt-2 sm:pt-0 pb-2 sm:pb-4">
          <div className="bg-[#4F2E70] -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mb-4">
            <h3 className="text-sm sm:text-base text-white font-gilroy font-bold">
              Pattern Type
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {PATTERN_TYPES.map((pattern) => (
              <button
                key={pattern}
                onClick={() => togglePatternType(pattern)}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-[#B039FF] font-gilroy font-regular text-xs sm:text-sm transition ${
                  selectedPatterns.includes(pattern)
                    ? "bg-[#6A11CB] text-white"
                    : "bg-[#270D42] text-white hover:bg-[#6A11CB]/40"
                }`}
              >
                {pattern}
              </button>
            ))}
          </div>
        </div>

        {/* Time & Frequency */}
        <div className="p-4 sm:p-6 pt-2 pb-2 sm:pb-4">
          <div className="bg-[#4F2E70] -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 mb-4">
            <h3 className="text-sm sm:text-base text-white font-gilroy font-bold">
              Time & Frequency
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Time & Frequency Dropdown */}
            <div className="relative">
              <div className="dropdown-container">
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
                <ChevronDown className="absolute right-3 top-1/4 transform-translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Lookback Period Dropdown */}
            <div className="relative">
              <div className="dropdown-container">
                <select
                  value={props.lookbackPeriod}
                  onChange={(e) => props.setLookbackPeriod(e.target.value)}
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
                <ChevronDown className="absolute right-3 top-1/4 transform-translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Specific Pattern Dropdown */}
            <div className="relative">
              <div className="dropdown-container">
                <select
                  value={props.specificPattern}
                  onChange={(e) => props.setSpecificPattern(e.target.value)}
                  className="dropdown w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                >
                  <option value="">Select Pattern</option>
                  {patternOptions?.length > 0 &&
                    patternOptions.map((option) => (
                      <option
                        className="w-full px-3 sm:px-4 py-2 sm:py-1 bg-[#270D42] border border-[#B039FF] rounded-lg text-white cursor-pointer"
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/4 transform-translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Market */}
        <div className="p-4 sm:p-6 pt-2">
          {/* Apply Button */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => {
                props.onClose();
                props.refetchPattern({
                  page: 1,
                  timeInterval: props.timeFrequency,
                  patternType: props.specificPattern,
                  lookBackPeriod: props.lookbackPeriod,
                  contractType: props.contractType,
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

const PatternCard = (data) => {
  const isBullish = data.trend === "bullish";
  const TrendIcon = isBullish ? ArrowUp : ArrowDown;
  return (
    <div className="rounded-xl overflow-hidden bg-[#331F41] border border-[#6A11CB] shadow-xl hover:shadow-2xl transition-shadow w-full">
      <div className="relative w-full">
        <div className="h-[140px] relative bg-white rounded-t-2xl overflow-hidden">
          <img
            src={data.image_url || patternTypeImage(data.type)}
            alt="Chart"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
          <div className="absolute bottom-1 sm:bottom-2 inset-x-0 px-2 sm:px-3 flex items-center justify-between">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <span
                className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full ${
                  isBullish
                    ? "bg-green-500 text-green-900"
                    : "bg-red-400 text-red-900"
                } text-[10px] sm:text-xs font-medium`}
              >
                <TrendIcon className="w-2 h-2 sm:w-3 sm:h-3" />
                {isBullish ? "Bullish" : "Bearish"}
              </span>

              <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 bg-purple-700 text-white text-[10px] sm:text-xs rounded-full">
                {data.time_interval}
              </span>
            </div>

            <div className="bg-purple-500 text-white rounded-full px-1.5 sm:px-3 py-0.5 sm:py-1 flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs">
              <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
              <span>{formatRelativeTime(data.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-wide uppercase">
              {data.companyIdentifier}
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-300 mt-0.5">
              {data.company_label}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm md:text-base font-bold text-white">
              {data.contract_type === "Indian_Equity"
                ? `₹${data.close}`
                : `$${data.close}`}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-300">Target Price</p>
          </div>
        </div>

        <p className="text-cyan-400 text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-1.5 capitalize">
          {data?.pattern_label || data?.type?.replace(/_/g, " ")}
        </p>
      </div>
    </div>
  );
};

const PatternCardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-[#1A1125] border border-[#6A11CB] shadow-xl hover:shadow-2xl transition-shadow w-full">
      <div className="relative w-full">
        <div className="h-[140px] relative bg-[#1A1125] rounded-t-2xl overflow-hidden">
          <Skeleton
            baseColor="#4a307b"
            highlightColor="#6a11cb"
            height="100%"
          />
          <div className="absolute bottom-1 sm:bottom-2 inset-x-0 px-2 sm:px-3 flex items-center justify-between">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Skeleton
                baseColor="#4a307b"
                highlightColor="#6a11cb"
                width={60}
                height={20}
                borderRadius={20}
              />
              <Skeleton
                baseColor="#4a307b"
                highlightColor="#6a11cb"
                width={40}
                height={20}
                borderRadius={20}
              />
            </div>
            <Skeleton
              baseColor="#4a307b"
              highlightColor="#6a11cb"
              width={70}
              height={20}
              borderRadius={20}
            />
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-3">
        <div className="flex justify-between items-start">
          <div className="w-2/3">
            <Skeleton
              baseColor="#4a307b"
              highlightColor="#6a11cb"
              width="70%"
              height={16}
            />
            <Skeleton
              baseColor="#4a307b"
              highlightColor="#6a11cb"
              width="50%"
              height={12}
              style={{ marginTop: "4px" }}
            />
          </div>
          <div className="text-right w-1/3">
            <Skeleton
              baseColor="#4a307b"
              highlightColor="#6a11cb"
              width="80%"
              height={16}
              style={{ marginLeft: "auto" }}
            />
            <Skeleton
              baseColor="#4a307b"
              highlightColor="#6a11cb"
              width="60%"
              height={12}
              style={{ marginTop: "4px", marginLeft: "auto" }}
            />
          </div>
        </div>

        <Skeleton
          baseColor="#4a307b"
          highlightColor="#6a11cb"
          width="60%"
          height={14}
          style={{ marginTop: "8px" }}
        />
      </div>
    </div>
  );
};

const AllPatterns = ({
  onBackClick,
  patternSignal,
  patternPagination,
  patternSignalLoading,
  refetchPattern,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [contractType, setContractType] = useState("");
  const [timeFrequency, setTimeFrequency] = useState("");
  const [lookbackPeriod, setLookbackPeriod] = useState("");
  const [specificPattern, setSpecificPattern] = useState("");

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
    refetchPattern({ page: 1 });
    setTimeFrequency("");
    setLookbackPeriod("");
    setSpecificPattern("");
    setFilteredData(null);
    setContractType("");
    if (!reset) {
      onBackClick();
    }
  };

  const renderSkeletonCards = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => <PatternCardSkeleton key={`skeleton-${index}`} />);
  };

  return (
    <div className="min-h-screen p-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#000000] transition shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-medium text-white">Chart Pattern</h1>
              {/* <span className="text-xs sm:text-sm text-[#E7D2FF]">
                • {patternSignalTotalCount} Stocks in Recent
              </span> */}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setFilteredData(null);
            // setContractType("all");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-[#2C88FF] text-white transition hover:bg-[#1C78EF]"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {FORMATED_MARKETS.map((type) => (
          <button
            key={type.value}
            onClick={() => {
              setContractType(type.value);
              // if (type.value === "") {
              //   setFilteredData(patternSignal);
              // } else {
              // setFilteredData(
              //   patternSignal.filter((s) => s.contract_type === type.value)
              // );
              refetchPattern({
                page: 1,
                timeInterval: timeFrequency,
                patternType: specificPattern,
                lookBackPeriod: lookbackPeriod,
                contractType: type.value,
              });
              // }
            }}
            className={`px-4 py-2 rounded-full font-regular border border-[#B039FF] font-gilroy text-sm transition ${
              contractType === type.value
                ? "bg-[#B039FF] text-white"
                : "bg-[#270D42] text-white"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {patternSignalLoading ? (
          renderSkeletonCards()
        ) : patternSignal?.length > 0 ? (
          (filteredData || patternSignal)?.length > 0 ? (
            (filteredData || patternSignal).map((data, idx) => (
              <PatternCard key={idx} {...data} />
            ))
          ) : (
            <p className="col-span-full text-center text-white">
              No data found!
            </p>
          )
        ) : (
          <p className="col-span-full text-center text-white">No data found!</p>
        )}
      </div>

      {patternPagination?.hasNextPage && !patternSignalLoading && (
        <div className="flex justify-center mt-8 mb-6">
          <button
            onClick={() => {
              // setContractType("all");
              setFilteredData(null);
              refetchPattern({
                page: patternPagination.currentPage + 1,
                timeInterval: timeFrequency,
                patternType: specificPattern,
                lookBackPeriod: lookbackPeriod,
                contractType,
              });
            }}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-base rounded-full transition"
          >
            Load more
          </button>
        </div>
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        refetchPattern={refetchPattern}
        timeFrequency={timeFrequency}
        setTimeFrequency={setTimeFrequency}
        lookbackPeriod={lookbackPeriod}
        setLookbackPeriod={setLookbackPeriod}
        specificPattern={specificPattern}
        setSpecificPattern={setSpecificPattern}
        contractType={contractType}
        onReset={handleBack}
      />
    </div>
  );
};

export default AllPatterns;
