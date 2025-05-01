import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import News from "../../assets/images/newsimg.svg";
import axiosInstance from "../../utils/axiosHelper";
import { formatDateTime } from "../../utils";
import localStorageWithExpiry from "../../utils/localstorage";

const createUrlSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const NewsCard = React.memo(({ news }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageError, setImageError] = useState(false);
  const maxTitleLength = 90;
  const isTitleTruncated = news.title.length > maxTitleLength;
  const displayTitle = isTitleTruncated
    ? `${news.title.substring(0, maxTitleLength)}...`
    : news.title;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link
      to={`/news-details/${createUrlSlug(news.title)}`}
      state={{ article: news }}
      className="block w-full"
    >
      <div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 h-auto sm:h-36 rounded-lg hover:bg-[#070e47] transition-colors duration-300 ease-in-out"
        style={{ border: "1px solid #6A11CB" }}
      >
        <img
          src={imageError ? News : news.thumbnailUrl || News}
          alt="News"
          className="w-full sm:w-24 h-48 sm:h-24 rounded-lg object-cover self-center"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="flex-1 space-y-2">
          <div className="relative group">
            <h3
              className="text-white text-sm sm:text-base line-clamp-2"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {displayTitle}
            </h3>
            {isTitleTruncated && showTooltip && (
              <div className="absolute z-50 w-64 p-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-0 transform -translate-y-full">
                {news.title}
                <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-4"></div>
              </div>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <span className="hidden sm:inline">•</span>
            <span>{formatDateTime(news.publishedAt)}</span>
            <span className="hidden sm:inline">•</span>
            <span className="uppercase">{news.tag}</span>
          </div>
        </div>
      </div>
    </Link>
  );
});

function NewsSection() {
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const NEWS_CACHE_KEY = "home_news_cache";
  const CACHE_EXPIRY_MS = 2 * 60 * 60 * 1000;

  const tags = useMemo(
    () => ({
      Nifty: 3,
      Nasdaq: 3,
      Crypto: 3,
      Manufacturing: 3,
    }),
    []
  );

  const categorizeArticles = useCallback((articles, tagName) => {
    return articles.map((article) => ({
      ...article,
      title: article.title,
      url: article.link,
      thumbnailUrl: article.image_url,
      publishedAt: article.pubDate,
      tag: tagName,
      _id: article._id,
    }));
  }, []);

  const fetchNews = useCallback(
    async (abortController, bypassCache = false) => {
      setLoading(true);

      if (!bypassCache) {
        const cachedData = localStorageWithExpiry.getItem(NEWS_CACHE_KEY);
        if (cachedData) {
          setNews(cachedData);
          setLoading(false);
          return;
        }
      }

      try {
        const newsResults = {};
        const queryArray = Object.entries(tags).map(([tag, limit]) => ({
          tag,
          limit,
          page: 1,
        }));

        const response = await axiosInstance.get("user/news", {
          params: { queries: JSON.stringify(queryArray) },
          signal: abortController.signal,
        });

        const responseData = response?.data || response;

        if (!Array.isArray(responseData)) {
          throw new Error("Invalid news data format received from server");
        }

        responseData.forEach((tagData) => {
          if (tagData?.articles?.length) {
            const tag = tagData._id?.toLowerCase();
            if (tag) {
              const processedArticles = categorizeArticles(
                tagData.articles,
                tagData._id
              );
              newsResults[tag] = processedArticles;
            }
          }
        });

        Object.keys(newsResults).forEach((tag) => {
          const uniqueArticles = Array.from(
            new Map(
              newsResults[tag].map((article) => [article._id, article])
            ).values()
          );
          newsResults[tag] = uniqueArticles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );
        });

        localStorageWithExpiry.setItem(
          NEWS_CACHE_KEY,
          newsResults,
          CACHE_EXPIRY_MS
        );

        setNews(newsResults);
        setError(null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load news. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    },
    [tags, categorizeArticles]
  );

  const refreshNews = () => {
    const abortController = new AbortController();
    fetchNews(abortController, true);
    return () => abortController.abort();
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchNews(abortController);
    return () => abortController.abort();
  }, [fetchNews]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4 news-section-bg">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={refreshNews}
          className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="news-section-bg">
      <div className="container px-4 py-10 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
          <p className="text-white font-gilroy font-bold text-xl md:text-3xl lg:text-5xl mb-4 sm:mb-0">
            Top Stories
          </p>
          <button
            onClick={() => navigate("/news")}
            className="text-white font-gilroy font-normal border text-base button_blur border-white rounded-full px-5 md:px-12 py-2"
          >
            View All
          </button>
        </div>

        {Object.keys(news)?.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(news).map(
              ([tag, articles]) =>
                articles?.length > 0 && (
                  <div key={tag}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {articles.map((newsItem) => (
                        <NewsCard key={newsItem._id} news={newsItem} />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="text-white text-center py-10">No news available</div>
        )}
      </div>
    </section>
  );
}

export default NewsSection;
