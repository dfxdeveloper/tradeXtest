import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { ChevronDown } from "lucide-react";
import { MARKETS, TIME_FRAMES, TYPEMAPPING } from "../../utils/constants";
import useMarketController from "../../hooks/useMarketController";
import { formatRelativeTime, round } from "../../utils";
import {formatVolume} from "../../utils/volumeConversion"
import Pagination from "../../components/Pagination";

const renderSkeleton = (length) =>
  Array.from({ length }).map((_, i) => (
    <tr
      key={`skeleton-${i}`}
      className="bg-[#1A1625] rounded-lg border border-[#6A11CB]"
    >
      <td colSpan={length} className="p-4">
        <Skeleton height={40} baseColor="#1A1625" highlightColor="#2D2152" />
      </td>
    </tr>
  ));

const StockScanModal = (props) => {
  const [marketLabel, setMarketLabel] = useState("Market");
  const [timeframeLabel, setTimeframeLabel] = useState("Timeframe");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (props.contractType) {
      const selectedMarket = MARKETS.find(
        (m) => m.value === props.contractType
      );
      if (selectedMarket) {
        setMarketLabel(selectedMarket.label);
      }
    } else {
      setMarketLabel("Market");
    }
    if (props.timeFrequency) {
      const selectedTimeframe = TIME_FRAMES.find(
        (t) => t.value === props.timeFrequency
      );
      if (selectedTimeframe) {
        setTimeframeLabel(selectedTimeframe.label);
      }
    } else {
      setTimeframeLabel("Timeframe");
    }
  }, [props.contractType, props.timeFrequency]);

  const memorized = useMemo(
    () =>
      props.detailsData?.data?.data?.reduce(
        (acc, { companyIdentifier, contract_type }) => {
          const type = TYPEMAPPING[contract_type];
          if (type && !acc[type].includes(companyIdentifier)) {
            acc[type].push(companyIdentifier);
          }
          return acc;
        },
        { indian: [], us: [], forex: [], crypto: [] }
      ),
    [props.detailsData?.data?.data]
  );

  const { socketData } = useMarketController(memorized);

  const findSocket = useCallback((item, socketData) => {
    const marketType = TYPEMAPPING[item.contract_type];
    if (!socketData?.[marketType]) return null;
    const marketData = socketData[marketType];
    const matchedEntry = Object.values(marketData).find(
      (entry) => entry.identifier === item.companyIdentifier
    );
    return matchedEntry;
  }, []);

  const fetchCallback = useCallback(
    (page) => {
      props.handleCallback({
        page,
        contract_type: props.contractType,
        time_interval: props.timeFrequency,
      });
    },
    [props]
  );

  const handleMarketChange = (e) => {
    props.setContractType(e.target.value);
    props.handleCallback({
      page: 1,
      contract_type: e.target.value,
      time_interval: props.timeFrequency,
    });
  };

  const handleTimeframeChange = (e) => {
    props.setTimeFrequency(e.target.value);
    props.handleCallback({
      page: 1,
      contract_type: props.contractType,
      time_interval: e.target.value,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (props.onClose) props.onClose();
    }, 300);
  };

  if (!isOpen && !props.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center font-gilroy font-semibold z-50 p-4 md:p-6 overflow-y-auto">
      <div
        className={`relative w-full max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 
                  h-[90vh] md:h-auto max-h-[90vh] md:max-h-[85vh] 
                  shadow-[0_0_0_2px_#AD4AFF,0_0_0_4px_#2575FC] 
                  rounded-xl md:rounded-2xl 
                  bg-[#6C4984] bg-gradient-to-b from-[#6C4984] to-[#220C39] 
                  text-white overflow-hidden flex flex-col
                  transition-all duration-300 ease-in-out
                  ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border-b border-[#6A11CB2E]">
          <div className="flex justify-between items-center mb-3 sm:mb-0">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              {props.scanLabel || ""}
            </h1>
            <button
              onClick={handleClose}
              className="sm:hidden rounded-full bg-gray-800  hover:bg-gray-700"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-row sm:flex-row gap-2 sm:gap-4">
            <div className="relative flex-1 sm:flex-auto">
              <button className="flex items-center font-gilroy font-medium justify-between bg-[#7B5F9A] px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg border border-[#6A11CB] w-full">
                <span className="truncate max-w-[100px] sm:max-w-none">
                  {marketLabel}
                </span>
                <ChevronDown className="ml-1 sm:ml-2 h-4 w-4 flex-shrink-0" />
              </button>
              <select
                value={props.contractType}
                onChange={handleMarketChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              >
                <option
                  className="border border-[#6A11CB] font-gilroy font-medium bg-[#7B5F9A]"
                  value=""
                >
                  Select Market
                </option>
                {MARKETS.map((option) => (
                  <option
                    className="border border-[#6A11CB] font-gilroy font-medium bg-[#7B5F9A]"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative flex-1 sm:flex-auto">
              <button className="flex items-center justify-between font-gilroy font-medium bg-[#7B5F9A] px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg border border-[#6A11CB] w-full">
                <span className="truncate max-w-[100px] sm:max-w-none">
                  {timeframeLabel}
                </span>
                <ChevronDown className="ml-1 sm:ml-2 h-4 w-4 flex-shrink-0" />
              </button>
              <select
                value={props.timeFrequency}
                onChange={handleTimeframeChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              >
                <option
                  className="border border-[#6A11CB] font-gilroy font-medium bg-[#7B5F9A]"
                  value=""
                >
                  Select timeframe
                </option>
                {TIME_FRAMES.map((option) => (
                  <option
                    className="border border-[#6A11CB] bg-[#7B5F9A] font-gilroy font-medium"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleClose}
              className="hidden sm:block rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition duration-200 flex-shrink-0"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-2 md:py-4 scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;  /* Chrome, Safari and Opera */
            }
          `}</style>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base min-w-[640px]">
              <thead>
                <tr className="text-[#B039FF] border-t border-[#6A11CB2E] bg-[#4F2E70]">
                  <th className="text-left py-2 px-2 md:px-4">Market</th>
                  <th className="text-left py-2 px-2 md:px-4">Name</th>
                  <th className="text-left py-2 px-2 md:px-4">Time</th>
                  <th className="text-left py-2 px-2 md:px-4">TF</th>
                  <th className="text-left py-2 px-2 md:px-4">Price</th>
                  <th className="text-left py-2 px-2 md:px-4">Change</th>
                  <th className="text-left py-2 px-2 md:px-4">Volume</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {props.detailsData.loading ? (
                  renderSkeleton(7)
                ) : props.detailsData?.data?.data?.length > 0 ? (
                  props.detailsData.data.data.map((item, index) => {
                    const socket = findSocket(item, socketData);
                    const percentageChange = socket?.percentage
                      ? socket?.percentage
                      : item?.open && item?.close
                      ? round(
                          ((item?.close - item?.open) / item?.open) * 100,
                          2
                        )
                      : 0;
                    return (
                      <tr
                        className="border-t border-[#6A11CB2E] hover:bg-[#3A2256] transition-colors"
                        key={`item-data-${index}`}
                      >
                        <td className="py-2 px-2 md:px-4 capitalize">
                          {item?.contract_type.replace("_", " ")}
                        </td>
                        <td className="py-2 px-2 md:px-4 truncate max-w-[120px] md:max-w-xs">
                          {item?.company_label}
                        </td>
                        <td className="py-2 px-2 md:px-4 whitespace-nowrap">
                          {formatRelativeTime(item?.timestamp)}
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          {item?.time_interval}
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          {socket?.price || item?.close
                            ? item.contract_type === "Indian_Equity"
                              ? `₹${socket?.price || item?.close}`
                              : `$${socket?.price || item?.close}`
                            : "-"}
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          <span
                            className={`${
                              percentageChange < 0
                                ? "text-red-400"
                                : percentageChange > 0
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            ({percentageChange}%)
                          </span>
                        </td>
                        <td className="py-2 px-2 md:px-4">
                          <span className="bg-purple-900 px-2 py-1 rounded text-purple-300 text-xs md:text-sm whitespace-nowrap">
                          {formatVolume(item?.volume || "0")}   {/* {item?.volume || "0"} */}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-white">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {props.detailsData?.data?.pagination && (
          <div className="p-2 md:p-4 border-t border-[#6A11CB2E]">
            <Pagination
              currentPage={props.detailsData?.data?.pagination?.currentPage}
              totalPages={props.detailsData?.data?.pagination?.totalPages}
              fetchCallback={fetchCallback}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(StockScanModal);