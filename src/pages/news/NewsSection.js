import React, { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "../../utils/axiosHelper";
import { Link, useLocation } from "react-router-dom";
import { formatDateTime, hasEmptyArray } from "../../utils";

const createUrlSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const CACHE_DURATION = 2 * 60 * 60 * 1000;
const CACHE_KEY = "news_cache";

function NewsSection() {
  const [news, setNews] = useState({
    indianEquity: [],
    usEquity: [],
    crypto: [],
    forex: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const newsTags = useMemo(
    () => ({
      indianEquity: [
        "Nifty",
        "SEBI",
        "Adani",
        "Reliance",
        "HDFC Bank",
        "Reserve Bank of India",
      ],
      usEquity: [
        "Apple",
        "Tesla",
        "Nvidia",
        "Microsoft",
        "Meta",
        "Google",
        "Dow Jones",
        "Oil and Gas",
      ],
      crypto: ["Bitcoin", "Dogecoin", "Ethereum"],
      forex: ["US Dollar", "Forex", "US Treasury", "ETF"],
    }),
    []
  );

  const categoryLimits = useMemo(
    () => ({
      indianEquity: {
        Nifty: 8,
        SEBI: 4,
        Adani: 8,
        Reliance: 8,
        "HDFC Bank": 4,
        "Reserve Bank of India": 8,
      },
      usEquity: {
        Apple: 4,
        Tesla: 8,
        Nvidia: 4,
        Microsoft: 4,
        Meta: 4,
        Google: 8,
        "Dow Jones": 8,
        "Oil and Gas": 8,
      },
      crypto: {
        Bitcoin: 16,
        Dogecoin: 8,
        Ethereum: 8,
      },
      forex: {
        "US Dollar": 8,
        Forex: 8,
        "US Treasury": 8,
        ETF: 8,
      },
    }),
    []
  );

  const fallbackImages = useMemo(
    () => ({
      crypto:
        "https://img.freepik.com/free-vector/flat-design-cryptocurrency-concept_23-2149166905.jpg?ga=GA1.1.230270977.1721641049&semt=ais_hybrid",
      indianEquity:
        "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600",
      forex:
        "https://img.freepik.com/free-photo/golden-bull-with-graphic-elements-related-financial-sector_23-2151807731.jpg?ga=GA1.1.230270977.1721641049&semt=ais_hybrid",
      usEquity:
        "https://media.gettyimages.com/id/1364715854/photo/over-the-shoulder-view-of-asian-woman-using-nft-investment-wallet-on-smartphone-in-city.jpg?s=612x612&w=0&k=20&c=HZ40Zz1l_xQrbQLDC44dNoeBv8pqybuBImh3cYUkGdY=",
    }),
    []
  );

  const categorizeArticles = useCallback((articles, tag) => {
    return articles.map((article) => ({
      ...article,
      tag,
      thumbnailUrl: article.image_url,
      url: article.link,
    }));
  }, []);

  const getCachedNews = useCallback(() => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION && !hasEmptyArray(data)) {
          return data;
        }
      }
    } catch (error) {
      console.error("Error reading from cache:", error);
    }
    return null;
  }, []);

  const setCachedNews = useCallback((newsData) => {
    try {
      const cacheData = {
        timestamp: Date.now(),
        data: newsData,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error writing to cache:", error);
    }
  }, []);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const cachedNews = getCachedNews();
      if (cachedNews) {
        setNews(cachedNews);
        setLoading(false);
        return;
      }

      const newsResults = {
        indianEquity: [],
        usEquity: [],
        crypto: [],
        forex: [],
      };

      for (const [category, tags] of Object.entries(newsTags)) {
        const queryArray = tags.map((tag) => ({
          tag,
          limit: categoryLimits[category][tag] || 4,
          page: 1,
        }));

        const response = await axiosInstance.get("user/news", {
          params: { queries: JSON.stringify(queryArray) },
        });

        const responseData = response.data || response;

        if (Array.isArray(responseData)) {
          responseData.forEach((tagData) => {
            if (tagData?.articles && Array.isArray(tagData.articles)) {
              const tag = tagData._id;
              const categoryForTag = Object.entries(newsTags).find(
                ([_, categoryTags]) =>
                  categoryTags.some(
                    (t) => t === tag
                  )
              )?.[0];

              if (categoryForTag && tagData.articles.length > 0) {
                const processedArticles = categorizeArticles(
                  tagData.articles,
                  tagData._id
                );
                newsResults[categoryForTag] = [
                  ...newsResults[categoryForTag],
                  ...processedArticles,
                ];
              }
            }
          });

          Object.keys(newsResults).forEach((category) => {
            if (newsResults[category].length > 0) {
              newsResults[category] = Array.from(
                new Map(
                  newsResults[category].map((article) => [article._id, article])
                ).values()
              ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            }
          });
        }
      }

      // Cache the results
      setCachedNews(newsResults);
      setNews(newsResults);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [
    newsTags,
    categoryLimits,
    categorizeArticles,
    getCachedNews,
    setCachedNews,
  ]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const renderNewsCard = (item, category) => {
    if (!item) return null;

    const maxTitleLength = 65;
    const displayedTitle =
      item.title?.length > maxTitleLength
        ? `${item.title.substring(0, maxTitleLength)}...`
        : item.title || "";

    return (
      <Link
        key={item._id}
        to={`/news-details/${createUrlSlug(item.title)}`}
        state={{ article: item }}
        className="block h-full"
      >
        <div className="bg-[#220C39] border border-[#B039FF] p-3 hover:bg-[#070e47] rounded-xl shadow-lg flex flex-col h-full">
          <div className="relative h-40 mb-3">
            <img
              src={item.thumbnailUrl || fallbackImages[category]}
              alt={item.title}
              className="rounded-lg h-full w-full object-cover"
              loading="lazy"
            />
            {item.source_icon && (
              <img
                src={item.source_icon}
                alt="Source"
                className="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-white p-1"
              />
            )}
          </div>

          <div className="flex flex-col flex-grow">
            <div className="group relative flex-grow">
              <h3 className="font-gilroy font-semibold text-base text-white mb-1">
                {displayedTitle}
              </h3>
              {item.title?.length > maxTitleLength && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-sm text-white rounded-md absolute z-50 p-2 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full w-64">
                  {item.title}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
                    <div className="border-8 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto">
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <span className="px-2 uppercase bg-[#2D1147] rounded-full">
                  {item.tag}
                </span>
                <span className="ml-auto">{formatDateTime(item.pubDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const renderNewsSection = (categoryNews, title, category) => {
    if (!categoryNews?.length) return null;

    return (
      <section className="py-8">
        <div className="container">
          <h1 className="text-white text-left text-xl md:text-3xl lg:text-3xl xl:text-4xl font-gilroy font-bold lg:w-3/5">
            {title}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 py-9 md:py-12">
            {categoryNews.map((item, index) => (
              <div key={item._id || index} className="h-full">
                {renderNewsCard(item, category)}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">Error loading news: {error.message}</div>
    );
  }

  return (
    <div className="space-y-8">
      {renderNewsSection(news.indianEquity, "Indian Equity", "indianEquity")}
      {renderNewsSection(news.usEquity, "US Equity", "usEquity")}
      {renderNewsSection(news.crypto, "Crypto", "crypto")}
      {renderNewsSection(news.forex, "Forex", "forex")}
    </div>
  );
}

export default NewsSection;
