import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../../utils";
import Skeleton from "react-loading-skeleton";
import Pagination from "../../Pagination";

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

const News = ({
  userTags,
  selectedTag,
  setSelectedTag,
  news,
  isLoading,
  currentPage,
  totalPages,
  handleNewsCallback,
}) => {
  return (
    <div
      className="rounded-lg p-2 sm:p-4 w-full border border-gray-600"
    >
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
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4">
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

        {news && news.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            fetchCallback={handleNewsCallback}
          />
        )}
      </div>
    </div>
  );
};

export default News;
