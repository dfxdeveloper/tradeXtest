import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Search, Clock } from "lucide-react";
import { STRATEGY_CATEGORIES } from "../../../utils/constants";
import Graph from "../../../assets/images/graph.svg";
import HiddenArrow from "../../../assets/images/hidden_arrow.svg";
import MatchedStrategyTable from "./MatchedStrategyTable";
import axiosInstance from "../../../utils/axiosHelper";
import axios from "axios";
import {
  SelectedStrategies,
  TimeSelectDropdown,
} from "../../../components/strategy/TimeSelectDropDown";
import { useDebounce } from "../../../hooks/useDebounce";
import StrategyCategoryList from "./StrategyCategoryList";
import SubscriptionRestriction from "../../../components/SubscriptionRestriction"; // Import the restriction component

const StrategyDetails = ({
  setDashboardActive,
  LookBackPeriodOptions,
  userData,
}) => {
  const timeframeOptions = useMemo(
    () => userData?.preferred_time_interval || ["15m"],
    [userData]
  );
  const [category, setCategory] = useState(null);
  const [timeframe, setTimeframe] = useState(
    userData?.preferred_time_interval?.[0] || "15m"
  );
  const [lookback, setLookback] = useState(
    LookBackPeriodOptions[0]?.value || ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [strategyData, setStrategyData] = useState({
    count: 0,
    data: [],
    totalPages: 0,
  });
  const [loading, setLoading] = useState({
    table: false,
    search: false,
    categories: {},
  });
  const [showStrategyList, setShowStrategyList] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const isPlanActive = userData?.subscription?.status === 1;
  const needsUpgrade = userData?.subscription?.plan === 1;

  const fetchStrategySignals = useCallback(
    async (abortController) => {
      setLoading((prev) => ({ ...prev, table: true }));
      try {
        const { data, count } = await axiosInstance.get(
          "user/strategy/match-strategy-signals",
          {
            params: {
              page: currentPage,
              time_interval: timeframe,
              loopback_time: lookback,
              strategy_names: selectedStrategies.join(","),
            },
            signal: abortController.signal,
          }
        );
        const pages = Math.ceil(count / 10);
        setStrategyData({ data, count, totalPages: pages });
        setLoading((prev) => ({ ...prev, table: false }));
      } catch (error) {
        if (!axios.isCancel(error)) {
          setLoading((prev) => ({ ...prev, table: false }));
          setStrategyData({
            count: 0,
            data: [],
            totalPages: 0,
          });
        }
      }
    },
    [currentPage, lookback, selectedStrategies, timeframe]
  );

  useEffect(() => {
    if (isPlanActive && !needsUpgrade) {
      const abortController = new AbortController();
      fetchStrategySignals(abortController);
      return () => abortController.abort();
    }
  }, [fetchStrategySignals, isPlanActive, needsUpgrade]);

  const handleSearch = useCallback(
    async (searchTerm) => {
      if (searchTerm.length < 3 || !isPlanActive || needsUpgrade) {
        setSearchResults([]);
        return;
      }
      setLoading((prev) => ({ ...prev, search: true }));
      try {
        const { data = [] } = await axiosInstance.get("user/strategy", {
          params: { searchStrategy: searchTerm, type: "default" },
        });
        setSearchResults(data);
        setLoading((prev) => ({ ...prev, table: false }));
        setIsDropdownVisible(data.length > 0);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setLoading((prev) => ({ ...prev, search: false }));
        }
      }
    },
    [isPlanActive, needsUpgrade]
  );

  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleFilterChange = ({ name, value }) => {
    if (name === "timeframe") {
      setTimeframe(value);
    }
    if (name === "lookback") {
      setLookback(value);
    }
    setCurrentPage(1);
  };

  const handlePagination = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleCategorySelection = (category) => {
    setCategory(category);
    setDashboardActive(false);
    setShowStrategyList(true);
  };

  const handleBack = () => {
    setShowStrategyList(false);
    setDashboardActive(true);
    setCategory(null);
    setCurrentPage(1);
  };

  const handleAddStrategy = async (strategyName) => {
    if (selectedStrategies.includes(strategyName)) return;
    setLoading((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [strategyName]: "adding",
      },
    }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 200));
    setSelectedStrategies((prev) => [...prev, strategyName]);

    setLoading((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [strategyName]: "added",
      },
    }));
  };

  const handleRemoveStrategy = (strategyToRemove) => {
    setSelectedStrategies((prev) => prev.filter((s) => s !== strategyToRemove));
    setLoading((prev) => {
      const newCategories = { ...prev.categories };
      delete newCategories[strategyToRemove];
      return { ...prev, categories: newCategories };
    });
  };

  const handleSearchStrategy = async (strategy) => {
    if (strategy?.name) handleAddStrategy(strategy?.name);
    setSearchTerm("");
    setSearchResults([]);
    setIsDropdownVisible(false);
  };

  const timeSelects = useMemo(
    () => (
      <div className="flex flex-col sm:flex-row gap-8">
        <TimeSelectDropdown
          label="Timeframe"
          value={timeframe}
          options={timeframeOptions}
          onChange={(e) =>
            handleFilterChange({ name: "timeframe", value: e.target.value })
          }
          icon={Clock}
        />
        <TimeSelectDropdown
          label="Lookback Period"
          value={lookback}
          options={LookBackPeriodOptions}
          onChange={(e) =>
            handleFilterChange({ name: "lookback", value: e.target.value })
          }
          icon={Clock}
        />
      </div>
    ),
    [timeframe, lookback, timeframeOptions, LookBackPeriodOptions]
  );

  return (
    <div className="bg-[#12001E] p-6">
      <div>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={Graph} alt="Graph" className="w-6 h-6" />
            </div>
            <span className="text-white text-lg font-medium">
              Hidden Signals
            </span>
          </div>

          {(!isPlanActive || needsUpgrade) && (
            <SubscriptionRestriction userData={userData} />
          )}

          {isPlanActive && !needsUpgrade && (
            <>
              {/* Search/Back & Filters */}
              <div className="space-y-6">
                {showStrategyList ? (
                  <button
                    onClick={handleBack}
                    className="text-md hover:text-purple-600"
                  >
                    ← Back to Categories
                    <hr className="mt-2 border-[#6A11CB]" />
                  </button>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSearchTerm(value);
                        debouncedSearch(value);
                      }}
                      onFocus={() => {
                        if (searchResults.length > 0) {
                          setIsDropdownVisible(true);
                        }
                      }}
                      className="w-full rounded-lg bg-[#D0B4E7] py-2 pl-10 pr-10 text-sm text-black placeholder-gray-600 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                    {isDropdownVisible && searchResults.length > 0 && (
                      <ul className="absolute left-0 top-full mt-2 w-full bg-[#1A1625] text-white rounded-lg shadow-lg border border-purple-600 overflow-hidden z-20">
                        {searchResults.map((result, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 border-b border-purple-600 last:border-none hover:bg-[#D0B4E7] hover:text-black cursor-pointer text-sm transition-colors duration-200"
                            onClick={() => handleSearchStrategy(result)}
                          >
                            {result.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {timeSelects}
              </div>

              {/* Selected Strategies */}
              {selectedStrategies?.length > 0 && (
                <SelectedStrategies
                  strategies={selectedStrategies}
                  onRemove={handleRemoveStrategy}
                />
              )}

              {showStrategyList ? (
                <StrategyCategoryList
                  category={category}
                  handleAddStrategy={handleAddStrategy}
                  loading={loading.categories}
                  selectedStrategies={selectedStrategies}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {STRATEGY_CATEGORIES.map((category, index) => (
                    <div
                      key={index}
                      className="bg-[#1A1625] rounded-lg p-6 grid grid-cols-6 gap-4 hover:bg-purple-900/10 transition-colors"
                    >
                      <div className="col-span-1">
                        <img
                          src={category?.icon}
                          alt={category.label}
                          className="w-16 h-16"
                        />
                      </div>

                      <div className="col-span-4 flex flex-col justify-between">
                        <h3 className="text-white text-lg font-medium">
                          {category.label}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1">
                          {category.description}
                        </p>
                      </div>

                      <div className="col-span-1 flex justify-end items-center">
                        <button
                          onClick={() =>
                            handleCategorySelection(category.value)
                          }
                        >
                          <img
                            src={HiddenArrow}
                            alt="View"
                            className="w-10 h-10"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <MatchedStrategyTable
                count={strategyData.count}
                strategyData={strategyData.data}
                loading={loading.table}
                handleCallback={handlePagination}
                currentPage={currentPage}
                totalPages={strategyData.totalPages}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(StrategyDetails);
