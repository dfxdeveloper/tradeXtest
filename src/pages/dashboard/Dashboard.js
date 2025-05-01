import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Clock, ChevronDown } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Graph from "../../assets/images/graph.svg";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosHelper";
import { getCookie } from "../../services/cookie";
import { Link, useNavigate } from "react-router-dom";
import { useUserCredentials } from "../../components/context/user";
import Pagination from "../../components/Pagination";
import { filterTags, formatDateTime } from "../../utils";
import StrategyDetails from "./strategy/StrategyDetails";
import MarketSection from "../../components/dashboard/Market";
import StockRow from "../../components/dashboard/StockRow";
import { useSocket } from "../../components/context/socket";
import { TIME_FRAMES } from "../../utils/constants";
// Add a utility function to create URL-friendly slugs
const createUrlSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const NewsCard = ({ article, isLoading }) => {
  const titleRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = titleRef.current;
      if (element) {
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setShowTooltip(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [article?.title]);

  if (isLoading) {
    return (
      <div className="bg-[#0E051B] rounded-lg shadow-md overflow-hidden border border-[#6A11CB] h-full flex">
        <div className="w-24 sm:w-28 p-2 flex items-center justify-center">
          <Skeleton
            width={80}
            height={80}
            baseColor="#2a2a2a"
            highlightColor="#3a3a3a"
          />
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            <Skeleton count={2} baseColor="#2a2a2a" highlightColor="#3a3a3a" />
          </div>
          <div className="text-right">
            <Skeleton width={80} baseColor="#2a2a2a" highlightColor="#3a3a3a" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0E051B] rounded-lg shadow-md overflow-hidden hover:bg-[#070e47] border border-[#6A11CB] h-full flex">
      <div className="w-24 sm:w-28 p-2 flex items-center justify-center">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title || "News article image"}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg"
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-600/20 rounded-lg flex items-center justify-center">
            <span className="text-purple-300">No Image</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <div className="relative group">
          <h3
            ref={titleRef}
            className="text-sm sm:text-base font-semibold text-white mb-2 line-clamp-2 break-words"
          >
            {article.title}
          </h3>
          {/* Tooltip only shows up if text is overflowing */}
          {showTooltip && (
            <div className="absolute left-0 right-0 -top-2 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-[#0E051B] border border-[#6A11CB] rounded-lg p-3 shadow-lg">
                <p className="text-white text-sm">{article.title}</p>
              </div>
            </div>
          )}
        </div>
        <div className="text-right text-xs sm:text-sm text-gray-400">
          {formatDateTime(article.pubDate)}
        </div>
      </div>
    </div>
  );
};
const ActiveSignalCard = React.memo(({ symbol, count, isLoading }) => (
  <div
    className="rounded-lg p-6 bg-[#0E051B]"
    style={{
      border: "1px solid #6A11CB",
    }}
  >
    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent"></div>
    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-transparent"></div>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-12 h-8 rounded-full bg-[#0E051B] flex items-center justify-center">
        <img className="w-6 h-6" src={Graph} alt="graph" loading="lazy" />
      </div>
      <span className="text-white text-md font-medium">{symbol}</span>
    </div>
    <div className="text-4xl font-bold px-14 text-white tracking-tight">
      {isLoading || count === undefined || count === null ? (
        <Skeleton
          width={80}
          height={40}
          baseColor="#2a2a2a"
          highlightColor="#3a3a3a"
        />
      ) : (
        count
      )}{" "}
    </div>
  </div>
));

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading: userLoading,
    refreshUserData,
  } = useUserCredentials();
  const { fetchPast24hCounts } = useSocket();
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [userTags, setUserTags] = useState();
  const [selectedTag, setSelectedTag] = useState("");
  const [marketData, setMarketData] = useState([]);
  const [marketCloseData, setMarketCloseData] = useState(null);
  const [activeTab, setActiveTab] = useState("Single Candlesticks");
  const [selectedType, setSelectedType] = useState("");
  const [timeInterval, setTimeInterval] = useState("10m");
  const [fromDate, setFromDate] = useState("2h");
  const [data, setData] = useState([]);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const MAX_VISIBLE_PAGES = 5;
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [groupedPatternData, setGroupedPatternData] = useState({
    "Single Candlesticks": [],
    "Double Candlesticks": [],
    "Triple Candlesticks": [],
    "Basic Patterns": [],
    "Advanced Patterns": [],
    "Harmonic Patterns": [],
  });
  const [currentPatternPage, setCurrentPatternPage] = useState(1);
  const [totalPatternPages, setTotalPatternPages] = useState(1);
  const [totalPatternCounts, setTotalPatternCounts] = useState(0);
  const [patternLoading, setPatternLoading] = useState(true);
  const [activeSingleCardLoading, setActiveSingleCardLoading] = useState(false);

  const LookBackPeriodOptions = useMemo(
    () => [
      { value: "2h", label: "2hr" },
      { value: "4h", label: "4hr" },
      { value: "8h", label: "8hr" },
      { value: "24h", label: "24hr" },
      { value: "720h", label: "1 Month" },
    ],
    []
  );

  const [dashboardStats, setDashboardStats] = useState([
    { symbol: "Total Companies", count: 0 },
    { symbol: "Pattern Signals", count: 0 },
    { symbol: "Strategies", count: 0 },
    { symbol: "Tags", count: 0 },
  ]);
  const [isDashboardActive, setDashboardActive] = useState(true);

  // Fetch dashboard stats
  const fetchDashboardStats = async (userId) => {
    setActiveSingleCardLoading(true);
    try {
      if (userId) {
        const response = await fetchPast24hCounts(userId);
        setDashboardStats([
          {
            symbol: "Total Companies",
            count: response?.watchlist_count,
          },
          {
            symbol: "Pattern Signals",
            count: response?.pattern_signal_count,
          },
          { symbol: "Strategies", count: response?.strategy_count },
          { symbol: "Tags", count: response?.tag_count },
        ]);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setActiveSingleCardLoading(false);
    }
  };

  const fetchSignals = async () => {
    try {
      const response = await axiosInstance.get(
        `user/pattern-signal?flag=filter-by-user-companies&limit=2`
      );
      return response;
    } catch (error) {
      console.error("Error fetching signals:", error);
    }
  };

  // const fetchAllMarketCloseData = async (watchlist_details) => {
  //   try {
  //     const cachedData = localStorageWithExpiry.getItem(
  //       CACHE.MARLET_CLOSE_DATA_KEY
  //     );
  //     if (cachedData) {
  //       const cachedIdentifiers = Object.keys(cachedData).sort().join(",");
  //       const watchlistIdentity = Object.keys(watchlist_details)
  //         .filter((key) => key !== "crypto")
  //         .flatMap((key) => watchlist_details[key])
  //         .sort()
  //         .join(",");
  //       if (cachedIdentifiers === watchlistIdentity) {
  //         return cachedData;
  //       }
  //     }

  //     const markets = watchlist_details.reduce(
  //       (acc, { identifier, category }) => {
  //         const type = TYPEMAPPING[category];
  //         if (type === "indian") {
  //           const company = INDIAN_EQUITY.find((c) => c.label === identifier);
  //           if (company) {
  //             identifier = company.value;
  //           }
  //         }
  //         if (type && !acc[type].includes(identifier))
  //           acc[type].push(identifier);
  //         return acc;
  //       },
  //       { indian: [], us: [], forex: [], crypto: [] }
  //     );

  //     const formattedMarkets = Object.entries(markets).reduce(
  //       (acc, [market, data]) => {
  //         const formatSymbols = changeFormat[market]?.(data);
  //         acc[market] = formatSymbols;
  //         return acc;
  //       },
  //       {}
  //     );

  //     const priceMap = {};
  //     const fetchPromises = Object.entries(formattedMarkets).map(
  //       async ([market, formatSymbols]) => {
  //         if (!formatSymbols || formatSymbols.length === 0) return null;

  //         try {
  //           const { stocks } = await axiosInstance.get(
  //             `user/stocks?market=${market}&stocks=${formatSymbols.join(",")}`
  //           );

  //           if (stocks && stocks.length) {
  //             stocks.forEach((stock) => {
  //               const index = formatSymbols.indexOf(stock.code);
  //               let originalName = markets[market][index];
  //               if (market === "indian") {
  //                 const company = INDIAN_EQUITY.find(
  //                   (c) => c.value === stock.code
  //                 );
  //                 if (company) {
  //                   originalName = company.label;
  //                 }
  //               }
  //               if (index !== -1) {
  //                 const closePrice = stock.close || "~";
  //                 const openPrice = stock.open || "~";
  //                 const percentage = (
  //                   closePrice !== "~" && openPrice !== "~"
  //                     ? ((closePrice - openPrice) / openPrice) * 100
  //                     : 0
  //                 ).toFixed(2);
  //                 priceMap[originalName] = { closePrice, percentage };
  //               }
  //             });
  //           }
  //         } catch (error) {
  //           console.error(`Error fetching ${market} market data:`, error);
  //         }
  //       }
  //     );

  //     await Promise.all(fetchPromises);

  //     localStorageWithExpiry.setItem(
  //       CACHE.MARLET_CLOSE_DATA_KEY,
  //       priceMap,
  //       CACHE.MARLET_CLOSE_DATA_EXPIRY_TIME
  //     );
  //     return priceMap;
  //   } catch (error) {
  //     console.error("Error fetching market close data:", error);
  //     return null;
  //   }
  // };

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

  const setUserDetails = useCallback(async (data) => {
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
        const res = await fetchSignals();

        const missingItems = data.watchlist_details.filter((watchlistItem) => {
          return !res.some(
            (resItem) =>
              resItem.company_name === watchlistItem.identifier &&
              resItem.contract_type === watchlistItem.category
          );
        });

        missingItems.forEach((item) => {
          res.push({
            company_name: item.identifier,
            contract_type: item.category,
            signals: [],
            company_label: item.name,
          });
        });
        setMarketData(res);
      }

      if (data?.preferred_patterns) {
        const groupedData = data?.preferred_patterns_details.reduce(
          (acc, pattern) => {
            const { category, name, label } = pattern;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push({ name, label });
            return acc;
          },
          {}
        );
        setGroupedPatternData(groupedData);
        setSelectedType(groupedData["Single Candlesticks"]?.[0]?.name);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  useEffect(() => {
    if (token && user?.subscription?.status === 1) {
      setUserDetails(user);
      fetchDashboardStats(user?._id);
      const intervalId = setInterval(() => {
        fetchDashboardStats(user?._id);
      }, 3e4);

      return () => clearInterval(intervalId);
    }
  }, [setUserDetails, token, user]);

  useEffect(() => {
    if (!selectedTag || token === null) {
      setNews([]);
      return;
    }
    fetchNews();
  }, [selectedTag, token, currentPage]);

  const fetchNews = async (page = 1) => {
    setIsLoading(true);
    try {
      const queryString = JSON.stringify([
        { tag: selectedTag.replace("#", ""), page },
      ]);
      const response = await axiosInstance.get(
        `user/news?queries=${queryString}`
      );
      setNews(response?.[0]?.articles);
      setTotalPages(Math.min(response?.[0]?.totalPages, MAX_VISIBLE_PAGES));
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsCallback = async (page) => {
    setCurrentPage(page);
    fetchNews(page);
  };

  // Helper function to truncate title to 10 words
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length <= 40) return title;
    return words.slice(0, 40).join(" ") + "...";
  };

  const STATIC_CATEGORIES = useMemo(
    () => [
      "Single Candlesticks",
      "Double Candlesticks",
      "Triple Candlesticks",
      "Basic Patterns",
      "Advanced Patterns",
      "Harmonic Patterns",
    ],
    []
  );

  const fetchMatchingPatterns = useCallback(
    async (signal) => {
      setPatternLoading(true);
      try {
        if (!selectedType) return;
        let url = "user/company/matching-patterns?page=" + currentPatternPage;
        if (fromDate) {
          url += "&from_date=" + fromDate;
        }
        if (timeInterval) {
          url += "&timeIntervals=" + timeInterval;
        }
        url += "&pattern_type_names=" + selectedType;
        const { data = [], pagination } = await axiosInstance.get(url, {
          signal,
        });
        // Only update data if response contains matching pattern signals
        if (data?.length > 0) {
          setData(data);
          setTotalPatternPages(pagination.totalPages);
          setTotalPatternCounts(pagination.totalDocs);
        } else {
          // Clear data if no matching patterns found
          setData([]);
          setTotalPatternPages(1);
          setTotalPatternCounts(0);
        }
      } catch (error) {
        console.error("Error fetching matching patterns:", error);
      } finally {
        setPatternLoading(false);
      }
    },
    [currentPatternPage, fromDate, selectedType, timeInterval]
  );

  const handlePatternCallback = (page) => {
    // fetchMatchingPatterns();
    setCurrentPatternPage(page);
  };

  useEffect(() => {
    if (token !== null && userData?.watchlist) {
      const abortController = new AbortController();
      fetchMatchingPatterns(abortController.signal);
      return () => abortController.abort();
    }
  }, [
    fetchMatchingPatterns,
    fromDate,
    selectedType,
    timeInterval,
    token,
    userData?.watchlist,
  ]);

  // if (Object.keys(patternCategories).length === 0) {
  //   return (
  //     <div className="min-h-screen bg-[#0A0415] flex justify-center items-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mb-4"></div>
  //         <p className="text-white text-lg">Loading..</p>
  //       </div>
  //     </div>
  //   );
  // }
  // Option 2: If you want to show the rest of the dashboard even without patterns
  // Simply remove the entire if block checking for pattern categories

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
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div
        className="max-w-7xl mx-auto space-y-6"
        style={{ display: isDashboardActive ? "block" : "none" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          {/* <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
          Configure
        </button> */}
        </div>

        {/* Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dashboardStats.map((stat, index) => (
            <ActiveSignalCard
              key={index}
              symbol={stat?.symbol}
              count={stat?.count}
              isLoading={activeSingleCardLoading}
            />
          ))}
        </div>

        {/* Markets Section */}
        <MarketSection
          marketData={marketData}
          // marketCloseData={marketCloseData}
          key={"dashboard-market-section"}
        />

        {/* News Feed */}
        <div
          className="rounded-lg p-2 sm:p-4 bg-[#0E051B] w-full"
          style={{ border: "1px solid #6A11CB" }}
        >
          {/* Tags Selection */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white">News Feed</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(userTags) &&
              userTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm cursor-pointer transition-colors ${
                    selectedTag === tag
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:bg-purple-400/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
          </div>

          <div className="space-y-4">
            {/* News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {news?.length > 0 ? (
                news.map((article, index) => (
                  <Link
                    key={article._id || index}
                    to={`/news-details/${createUrlSlug(article.title)}`}
                    state={{ article: article }}
                    className="block h-full"
                  >
                    <NewsCard article={article} isLoading={false} />
                  </Link>
                ))
              ) : (
                <>
                  {isLoading ? (
                    // Show skeletons when loading
                    <>
                      {[1, 2, 3, 4, 5, 6].map((index) => (
                        <NewsCard key={index} article={{}} isLoading={true} />
                      ))}
                    </>
                  ) : (
                    <div className="text-white text-center py-8 col-span-full">
                      No news available
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Pagination Controls */}
            {news && news.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                fetchCallback={handleNewsCallback}
              />
            )}
          </div>
        </div>

        {/* Active Patterns */}
        <div
          className="rounded-lg bg-[#0E051B] p-4"
          style={{
            border: "1px solid #6A11CB",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  className="w-6 h-6"
                  src={Graph}
                  alt="Graph"
                  loading="lazy"
                />
              </div>
              <span className="text-white text-md font-medium">
                Active Patterns
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#1A1625] px-5 py-5 lg:px-3 lg:py3 rounded-full flex-wrap gap-2 mb-6 mt-2">
            {STATIC_CATEGORIES.map((category) => (
              <button
                key={category}
                className={`px-4 py-1.5 rounded-full text-sm ${
                  activeTab === category
                    ? "bg-purple-600 text-white"
                    : "text-white hover:bg-purple-700"
                }`}
                onClick={() => {
                  setActiveTab(category);
                  setSelectedType(groupedPatternData[category]?.[0]?.name);
                  setCurrentPatternPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
            {/* Timeframe Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <Clock size={16} className="text-purple-400" />
                Timeframe
              </label>
              <div className="relative">
                <select
                  className="bg-[#3D3354] w-full text-white border rounded-md px-4 py-2 text-sm appearance-none"
                  value={timeInterval}
                  onChange={(e) => {
                    setTimeInterval(e.target.value);
                    setCurrentPatternPage(1);
                  }}
                >
                  {userData &&
                    userData.preferred_time_interval.length > 0 &&
                    userData.preferred_time_interval.map((interval) => (
                      <option key={interval} value={interval}>
                        {TIME_FRAMES.find((el) => el.value === interval)?.label}
                      </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-white" />
                </div>
              </div>
            </div>

            {/* Candlestick Type Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <Clock size={16} className="text-purple-400" />
                Candlestick Type
              </label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPatternPage(1);
                  }}
                  className="bg-[#3D3354] w-full text-white border rounded-md px-4 py-2 text-sm appearance-none whitespace-normal break-words"
                  disabled={!groupedPatternData[activeTab]?.length}
                >
                  {groupedPatternData[activeTab]?.length ? (
                    groupedPatternData[activeTab].map((pattern, i) => (
                      <option
                        key={pattern.name + "" + i}
                        value={pattern.name}
                        className="bg-[#3D3354] py-2 text-white"
                      >
                        {pattern.label}
                      </option>
                    ))
                  ) : (
                    <option
                      value=""
                      className="bg-[#3D3354] text-white sm:py-3 md:py-4 font-bold"
                    >
                      You do not have {activeTab} on your watchlist.
                    </option>
                  )}
                </select>
                {groupedPatternData[activeTab]?.length ? (
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-white" />
                  </div>
                ) : null}
              </div>
            </div>

            {/* Lookback Period Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-white">
                <Clock size={16} className="text-purple-400" />
                Lookback Period
              </label>
              <div className="relative">
                <select
                  className="bg-[#3D3354] w-full text-white border rounded-md px-4 py-2 text-sm appearance-none"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    setCurrentPatternPage(1);
                  }}
                >
                  {LookBackPeriodOptions.map((option) => (
                    <option
                      key={option.value}
                      className="bg-[#3D3354] text-white"
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-purple-900/20">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-2xl">
                  {groupedPatternData[activeTab]?.length
                    ? groupedPatternData[activeTab].find(
                        (pattern) => pattern.name === selectedType
                      )?.label
                    : null}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm bg-purple-600 text-white rounded-lg py-2 px-2">
                  {totalPatternCounts} matches
                </span>
              </div>
            </div>

            {data?.length > 0 ? (
              <>
                {
                  <StockRow
                    key={`signals`}
                    signals={data}
                    isLoading={patternLoading}
                  />
                }
                <Pagination
                  currentPage={currentPatternPage}
                  totalPages={totalPatternPages}
                  fetchCallback={handlePatternCallback}
                />
              </>
            ) : (
              <div className="text-center text-white py-4">
                No companies found with matching pattern signals
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Strategy Signal */}
      <div
        className="max-w-7xl mx-auto my-10 space-y-6 rounded-lg bg-[#0E051B] p-4"
        style={{ border: "1px solid #6A11CB" }}
      >
        <div className="space-y-6">
          <StrategyDetails
            setDashboardActive={setDashboardActive}
            LookBackPeriodOptions={LookBackPeriodOptions}
            userData={userData}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
