import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from "react";
import axios from "axios";

import { getCookie } from "../../services/cookie";
import { useNavigate } from "react-router-dom";
import { useUserCredentials } from "../../components/context/user";
import { filterTags } from "../../utils";
import WatchlistSignal from "../../components/dashboard/v2/WatchlistSignals";
import Market from "../../components/dashboard/v2/Market";
import StockScans from "../../components/dashboard/v2/StockScans";
import News from "../../components/dashboard/v2/News";
import Patterns from "../../components/dashboard/v2/Patterns";
import Strategy from "../../components/dashboard/v2/Strategy";
import AllPatterns from "../../components/dashboard/v2/AllPatterns";
import axiosInstance from "../../utils/axiosHelper";
import AllStrategies from "../../components/dashboard/v2/AllStrategies";

import { DASHBOARD } from "../../utils/constants";
const Dashboard = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUserCredentials();
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [userTags, setUserTags] = useState(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [showChartPatternsFullPage, setShowChartPatternsFullPage] =
    useState(false);
  const [showStrategiesFullPage, setShowStrategiesFullPage] = useState(false);

  const [signals, setSignals] = useState({
    loading: true,
    data: null,
  });

  const [stockScansData, setStockScansData] = useState({
    loading: true,
    data: JSON.parse(JSON.stringify(DASHBOARD.STOCK_SCAN)),
  });
  const [news, setNews] = useState(null);
  const [newsCurrentPage, setNewsCurrentPage] = useState(1);
  const [newsTotalPages, setNewsTotalPages] = useState(0);
  const [newsLoading, setNewsLoading] = useState(true);

  const [patternSignal, setPatternSignal] = useState(null);
  const [patternPagination, setPatternPagination] = useState(null);
  const [patternSignalLoading, setPatternSignalLoading] = useState(true);

  const [strategySignal, setStrategySignal] = useState(null);
  const [strategySignalCurrentPage, setStrategySignalCurrentPage] = useState(1);
  const [strategySignalTotalCount, setStrategySignalTotalCount] = useState(0);
  const [strategySignalLoading, setStrategySignalLoading] = useState(true);
  const [selectedStrategyDetails, setSelectedStrategyDetails] = useState(null);

  const patternsRef = useRef(null);
  const strategyRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (showChartPatternsFullPage || showStrategiesFullPage) {
      window.scrollTo(0, 0);
    }
  }, [showChartPatternsFullPage, showStrategiesFullPage]);

  useLayoutEffect(() => {
    if (token === null) {
      const cookieToken = getCookie("token");
      if (cookieToken === null) {
        localStorage.removeItem("authData");
        navigate("/login");
      } else {
        setToken(cookieToken);
      }
    }
  }, [navigate, token]);

  const fetchSignals = async ({ watchlistDetails, signal }) => {
    try {
      const response = await axiosInstance.get(`/user/signals`, {
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

      setSignals((prev) => ({
        ...prev,
        loading: false,
        data: withCompanyLabel,
      }));
    } catch (error) {
      if (!axios.isCancel(error)) {
        setSignals((prev) => ({ ...prev, loading: false, data: [] }));
      }
    }
  };

  const setUserDetails = useCallback(async ({ data, signal }) => {
    try {
      setUserData(data);
      if (data?.preferred_tags) {
        const processedTags = [...new Set(filterTags(data.preferred_tags))];
        setUserTags(processedTags);
        if (processedTags.length > 0) {
          setSelectedTag(processedTags[0]);
        }
      }

      if (data?.watchlist_details?.length) {
        await fetchSignals({
          watchlistDetails: data.watchlist_details,
          signal,
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  const fetchStockScanCounts = useCallback(async (signal) => {
    try {
      const response = await axiosInstance.get(`/user/stock-scan`, {
        params: {
          filterBy: "count",
          queryData: JSON.stringify(DASHBOARD.STOCK_SCAN),
          loopbackPeriod: DASHBOARD.STOCK_SCAN_LOOKBACK_PERIOD,
        },
        ...(signal && { signal }),
      });
      setStockScansData((prev) => ({
        ...prev,
        loading: false,
        data: prev.data.map((item) => ({
          ...item,
          count:
            response.counts?.find((resItem) => resItem.label === item.label)
              ?.count || 0,
        })),
      }));
    } catch (error) {
      setStockScansData((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, []);

  const fetchNews = useCallback(
    async ({ page, signal }) => {
      setNewsLoading(true);
      try {
        const queryString = JSON.stringify([
          { tag: selectedTag.replace("#", ""), page },
        ]);
        const response = await axiosInstance.get(`user/news`, {
          params: { queries: queryString },
          ...(signal && { signal }),
        });
        setNews(response?.[0]?.articles);
        setNewsTotalPages(
          Math.min(response?.[0]?.totalPages, DASHBOARD.NEWS_MAX_VISIBLE_PAGES)
        );
      } catch (error) {
        setNews([]);
        setNewsTotalPages(0);
      } finally {
        setNewsLoading(false);
      }
    },
    [selectedTag]
  );

  const fetchPatternSignal = useCallback(
    async ({
      signal,
      page,
      timeInterval,
      patternType,
      lookBackPeriod,
      contractType,
    }) => {
      setPatternSignalLoading(true);
      try {
        const response = await axiosInstance.get(`user/pattern-signal/all`, {
          params: {
            page,
            limit: 8,
            ...(timeInterval && { timeInterval }),
            ...(patternType && { patternType }),
            ...(lookBackPeriod && { lookBackPeriod }),
            ...(contractType && { contractType }),
          },
          ...(signal && { signal }),
        });
        setPatternSignal((prev) =>
          page > 1 ? [...prev, ...response.data] : response?.data
        );
        setPatternPagination(response?.pagination);
        setPatternSignalLoading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setPatternSignal([]);
          setPatternSignalLoading(false);
        }
      }
    },
    []
  );

  const fetchStrategySignal = useCallback(
    async ({
      signal,
      page,
      strategy_names,
      time_interval,
      contract_type,
      loopbackPeriod,
      trend,
      strength,
    }) => {
      setStrategySignalLoading(true);
      try {
        const response = await axiosInstance.get(
          `user/strategy/default-strategy-signal`,
          {
            params: {
              limit: 8,
              page,
              ...(strategy_names && { strategy_names }),
              ...(contract_type && { contract_type }),
              ...(time_interval && { time_interval }),
              ...(loopbackPeriod && { loopbackPeriod }),
              ...(trend && { trend }),
              ...(strength && { strength }),
            },
            ...(signal && { signal }),
          }
        );
        setStrategySignal((prev) =>
          page > 1 ? [...prev, ...response.data] : response?.data
        );
        setStrategySignalTotalCount(response?.count);
      } catch (error) {
        setStrategySignal([]);
      } finally {
        setStrategySignalLoading(false);
      }
    },
    []
  );

  const handleNewsCallback = async (page) => {
    setNewsCurrentPage(page);
    fetchNews({ page });
  };

  useEffect(() => {
    if (selectedTag && token) {
      const abortController = new AbortController();
      fetchNews({ page: 1, signal: abortController.signal });
      return () => abortController.abort();
    }
  }, [selectedTag, token, fetchNews]);

  useEffect(() => {
    if (token && user?.subscription?.status === 1) {
      const abortController = new AbortController();
      setUserDetails({ data: user, signal: abortController.signal });
      fetchStockScanCounts(abortController.signal);
      fetchPatternSignal({ signal: abortController.signal, page: 1 });
      fetchStrategySignal({ signal: abortController.signal, page: 1 });
      return () => abortController.abort();
    }
  }, [
    fetchPatternSignal,
    fetchStockScanCounts,
    fetchStrategySignal,
    setUserDetails,
    token,
    user,
  ]);

  const handleViewAllChartPatterns = () => {
    setShowChartPatternsFullPage(true);
  };

  const handleViewAllStrategies = (strategyDetails = null) => {
    setSelectedStrategyDetails(strategyDetails);
    setStrategySignalCurrentPage(1);
    fetchStrategySignal({
      ...(strategyDetails && { strategy_names: strategyDetails.name }),
      page: 1,
    });
    setShowStrategiesFullPage(true);
  };

  const handleBackToMainDashboard = (fromSection) => {
    if (fromSection === "patterns") {
      setShowChartPatternsFullPage(false);
      setTimeout(() => {
        patternsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (fromSection === "strategies") {
      setShowStrategiesFullPage(false);
      setTimeout(() => {
        strategyRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      setShowChartPatternsFullPage(false);
      setShowStrategiesFullPage(false);
      window.scrollTo(0, 0);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0A0415] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-white text-lg">
            Please log in to access the dashboard
          </p>
        </div>
      </div>
    );
  }

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#0A0415] flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="dashboard_bg md:px-6 md:py-2 mb-10 px-4 py-3 lg:px-8 lg:py-3"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {showChartPatternsFullPage ? (
          <AllPatterns
            onBackClick={() => handleBackToMainDashboard("patterns")}
            patternSignal={patternSignal}
            patternPagination={patternPagination}
            patternSignalLoading={patternSignalLoading}
            refetchPattern={fetchPatternSignal}
          />
        ) : showStrategiesFullPage ? (
          <AllStrategies
            strategySignal={strategySignal}
            strategySignalLoading={strategySignalLoading}
            strategySignalTotalCount={strategySignalTotalCount}
            strategySignalCurrentPage={strategySignalCurrentPage}
            setStrategySignalCurrentPage={setStrategySignalCurrentPage}
            selectedStrategyDetails={selectedStrategyDetails}
            refetchStrategy={fetchStrategySignal}
            onBackClick={() => handleBackToMainDashboard("strategies")}
          />
        ) : (
          <>
            <div className="flex justify-between items-center ">
              <h1 className="text-2xl font-bold font-gilroy text-white">
                Dashboard
              </h1>
            </div>
            <WatchlistSignal signals={signals} />
            <Market userCompanies={userData?.watchlist_details} />
            <News
              userTags={userTags}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              news={news}
              isLoading={newsLoading}
              currentPage={newsCurrentPage}
              totalPages={newsTotalPages}
              handleNewsCallback={handleNewsCallback}
            />
            <StockScans stockScansData={stockScansData} />
            <div ref={patternsRef}>
              <Patterns
                onViewAllClick={handleViewAllChartPatterns}
                patternSignals={patternSignal}
                patternSignalLoading={patternSignalLoading}
              />
            </div>
            <div ref={strategyRef}>
              <Strategy
                strategySignalTotalCount={strategySignalTotalCount}
                onViewAllStrategiesClick={handleViewAllStrategies}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
