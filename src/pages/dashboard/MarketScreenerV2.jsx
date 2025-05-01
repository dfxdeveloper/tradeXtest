import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosHelper";
import {
  LOOKBACK_PERIOD_OPTIONS,
  MARKETS,
  SCREENER,
  TIME_FRAMES,
} from "../../utils/constants";
import ScreeningResult from "./ScreenerModals/ScreeningResult";
import GroupCondition from "../../components/GroupCondition";
import Pagination from "../../components/Pagination";
import { ChevronDown } from "lucide-react";

const defaultGroup = [
  {
    condition: "",
    rules: [
      {
        key: "",
        attribute: "",
        operator: "",
        fieldExpression: "",
        value: "",
        nested: null,
        nestedOperator: "",
        conditionOperator: "",
      },
    ],
  },
];

const MarketScreener = () => {
  const [screenerData, setScreenerData] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [groups, setGroups] = useState([
    {
      condition: "",
      rules: [
        {
          key: "",
          attribute: "",
          operator: "",
          fieldExpression: "",
          value: "",
          nested: null,
          nestedOperator: "",
          conditionOperator: "",
        },
      ],
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(null);
  const [isError, setIsError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCounts, setTotalCounts] = useState(0);

  const validateGroups = useMemo(() => {
    for (const group of groups) {
      for (const rule of group.rules) {
        if (!rule.key || !rule.attribute || !rule.value)
          return "All fields are required (key, attribute, value).";

        if (rule.key === "indicators") {
          if (!rule.fieldExpression || !rule.operator)
            return "Indicators require a field expression and operator.";
        } else {
          if (!rule.category) return "Invalid category in the rule.";
        }
      }
    }
    return "";
  }, [groups]);

  const fetchScreenerData = useCallback(
    async (signal) => {
      const areGroupsModified =
        JSON.stringify(groups) !== JSON.stringify(defaultGroup);
      setIsError("");
      if (areGroupsModified && !!validateGroups) {
        setIsError(validateGroups);
        return;
      }

      try {
        setIsProcessing(true);

        let url =
          "user/strategy/market-screener?page=" +
          currentPage +
          "&loopback_period=" +
          (fromDate || SCREENER.DEFAULT_LOOPBACK_PERIOD) +
          "&time_interval=" +
          (selectedTimeFrame || SCREENER.DEFAULT_TIMEFRAME);
        if (selectedMarket) url += "&contract_type=" + selectedMarket;
        if (areGroupsModified) url += "&groups=" + JSON.stringify(groups);

        const { strategy = [], pagination } = await axiosInstance.get(url, {
          signal,
        });
        setScreenerData(strategy);
        setTotalPages(pagination.totalPages);
        setTotalCounts(pagination.totalDocs);
        setIsError("");
      } catch (error) {
        if (!axios.isCancel(error)) {
          setScreenerData([]);
          setTotalPages(1);
          setTotalCounts(0);
          setIsError(error.message || "Failed to apply screener.");
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [
      validateGroups,
      currentPage,
      fromDate,
      selectedTimeFrame,
      selectedMarket,
      groups,
    ]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchScreenerData(abortController.signal);
    return () => abortController.abort();
  }, [fetchScreenerData]);

  const handleCallback = (page) => setCurrentPage(page);

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Market Screener
        </h1>

        <div className="bg-[#1D2049] rounded-lg p-8 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:flex-1">
              <label className="block mb-2">Market</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={selectedMarket}
                  onChange={(e) => {
                    setSelectedMarket(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Select Market</option>
                  {MARKETS.map((market) => (
                    <option key={market.value} value={market.value}>
                      {market.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="w-full sm:flex-1">
              <label className="block mb-2">Timeframe</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={selectedTimeFrame}
                  onChange={(e) => {
                    setSelectedTimeFrame(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Select Timeframe</option>
                  {TIME_FRAMES.map((timeframe) => (
                    <option key={timeframe.value} value={timeframe.value}>
                      {timeframe.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="w-full sm:flex-1">
              <label className="block mb-2">Lookback Period</label>
              <div className="relative">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Select Lookback Period</option>
                  {LOOKBACK_PERIOD_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      className="bg-[#3D3354] text-white"
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <GroupCondition groups={groups} setGroups={setGroups} />

        {isError && (
          <div className="text-red-500 text-sm mt-4 mb-4">
            <strong>Error:</strong> {isError}
          </div>
        )}

        <ScreeningResult
          screenerData={screenerData}
          totalCounts={totalCounts}
          loading={isProcessing}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          fetchCallback={handleCallback}
        />
      </div>
    </>
  );
};

export default MarketScreener;
