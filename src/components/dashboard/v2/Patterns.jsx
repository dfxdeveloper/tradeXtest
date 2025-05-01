import React from "react";
import { Clock, ArrowDown, ArrowUp, BarChart } from "lucide-react";
import { formatRelativeTime, patternTypeImage } from "../../../utils";
import Skeleton from "react-loading-skeleton";

const PatternCardSkeleton = () => {
  return (
    <div className="rounded-2xl p-2 overflow-hidden bg-[#1A1125] border border-[#6A11CB] shadow-xl">
      <div className="h-[140px] relative rounded-t-2xl overflow-hidden bg-[#1A1125]">
        <Skeleton height="100%" baseColor="#4a307b" highlightColor="#6a11cb" />

        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex flex-wrap gap-1 sm:gap-2 max-w-[70%]">
          <Skeleton
            width={60}
            height={24}
            baseColor="#4a307b"
            highlightColor="#6a11cb"
            className="rounded-full"
          />
          <Skeleton
            width={80}
            height={24}
            baseColor="#4a307b"
            highlightColor="#6a11cb"
            className="rounded-full"
          />
        </div>

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
          <Skeleton
            width={80}
            height={24}
            baseColor="#4a307b"
            highlightColor="#6a11cb"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="p-2 sm:p-4 flex flex-col gap-2 sm:gap-3">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton
              width={120}
              height={20}
              baseColor="#4a307b"
              highlightColor="#6a11cb"
            />
            <Skeleton
              width={80}
              height={16}
              baseColor="#4a307b"
              highlightColor="#6a11cb"
              className="mt-1"
            />
          </div>
          <div className="text-right">
            <Skeleton
              width={60}
              height={20}
              baseColor="#4a307b"
              highlightColor="#6a11cb"
            />
            <Skeleton
              width={80}
              height={16}
              baseColor="#4a307b"
              highlightColor="#6a11cb"
              className="mt-1"
            />
          </div>
        </div>

        <Skeleton
          width={100}
          height={18}
          baseColor="#4a307b"
          highlightColor="#6a11cb"
        />
      </div>
    </div>
  );
};

const PatternCard = (data) => {
  const isBullish = data.trend === "bullish";
  const trendColor = isBullish ? "text-[#118C11]" : "text-[#AB0505]";
  const trendBg = isBullish
    ? "bg-[linear-gradient(180deg,_#95FF95_0%,_#D0FFD0_100%)]"
    : "bg-[linear-gradient(180deg,_#FF9595_0%,_#FF9090_100%)]";
  const TrendIcon = isBullish ? ArrowUp : ArrowDown;

  return (
    <div className="rounded-2xl p-2 overflow-hidden bg-[#331F41] border border-[#6A11CB] shadow-xl">
      <div
        className="h-[140px] relative rounded-t-2xl overflow-hidden"
        style={{
          backgroundColor: "white",
        }}
      >
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

        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex flex-wrap gap-1 sm:gap-2 max-w-[70%]">
          <span
            className={`capitalize flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full font-gilroy text-xs font-medium ${trendBg} ${trendColor}`}
          >
            <TrendIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {data.trend}
          </span>
          <span className="px-2 sm:px-3 py-1 bg-[linear-gradient(180deg,_rgba(94,14,146,0.61)_0%,_#1B002D_100%)] font-gilroy text-white text-xs rounded-full font-medium">
            {data.time_interval}
          </span>
        </div>

        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 text-xs text-white bg-[linear-gradient(90deg,_#B039FF_0%,_#6A11CB_100%)] px-2 sm:px-3 py-1 rounded-full font-gilroy font-medium">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          {formatRelativeTime(data.timestamp)}
        </div>
      </div>

      {/* Text content */}
      <div className="p-2 sm:p-4 flex flex-col gap-2 sm:gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white font-gilroy leading-tight">
              {data.companyIdentifier}
            </h2>
            <p className="text-xs sm:text-sm text-white font-gilroy font-regular mt-0.5">
              {data.company_label}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base sm:text-lg font-bold font-gilroy text-white">
              {data.contract_type === "Indian_Equity"
                ? `₹${data.close}`
                : `$${data.close}`}
            </p>
            <p className="text-xs text-white font-gilroy font-regular">
              Target Price
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-semibold font-gilroy text-[#63C8FF] hover:underline capitalize">
          {data?.pattern_label || data?.type?.replace(/_/g, " ")}
        </p>
      </div>
    </div>
  );
};

const Patterns = ({
  onViewAllClick,
  patternSignalTotalCount,
  patternSignals,
  patternSignalLoading,
}) => {
  return (
    <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border border-gray-600 rounded-lg text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2 sm:mb-2 gap-2 flex-wrap">
          <div className="flex items-center text-white flex-wrap">
            <div className="flex items-center">
              <div
                className="flex items-center rounded-full p-1.5 sm:p-2 gap-1 sm:gap-2"
                style={{
                  background:
                    "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0581) 0%, rgba(255, 255, 255, 0.0308) 99.66%)",
                  borderImageSource:
                    "linear-gradient(92.64deg, rgba(255, 255, 255, 0.5) -13.07%, rgba(255, 255, 255, 0) 6.86%, rgba(255, 255, 255, 0) 88.43%, rgba(255, 255, 255, 0.21) 104.39%)",
                  borderImageSlice: 1,
                }}
              >
                <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
                <h1 className="text-lg sm:text-xl font-medium">
                  Chart Patterns
                </h1>
              </div>
              {/* <span className="text-xs sm:text-sm text-[#E7D2FF] ml-2 sm:ml-4">
                • {patternSignalTotalCount} Stocks in Recent
              </span> */}
            </div>
          </div>

          <button
            onClick={onViewAllClick}
            className="text-sm text-[#DCA6FF] font-gilroy font-semibold hover:underline flex items-center gap-1 mr-2 sm:mr-4"
          >
            <span className="text-sm sm:text-base font-medium">View all</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:w-4 sm:h-4"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {patternSignalLoading
            ? Array(6)
                .fill(0)
                .map((_, idx) => (
                  <PatternCardSkeleton key={`skeleton-${idx}`} />
                ))
            : patternSignals
                ?.slice(0, 6)
                .map((data, idx) => <PatternCard key={idx} {...data} />)}
        </div>
      </div>
    </div>
  );
};

export default Patterns;
