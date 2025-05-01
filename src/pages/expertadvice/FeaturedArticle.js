import React, { useState, useEffect } from "react";
import axios from "axios";

const FeaturedArticle = () => {
  const [articles, setArticles] = useState([]);  // Holds all fetched articles
  const [currentPage, setCurrentPage] = useState(1);  // Tracks the current page
  const articlesPerPage = 2;  // Number of articles per page
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://stage.api.tradexpert.ai/api/v1/user/article");
        setArticles(response.data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  if (loading) {
    return (
      <div className="p-6 mb-4 text-white">
        <p>Loading featured articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mb-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    }
    return `${hours}h ago`;
  };

  return (
    <div className="p-6 mb-4">
      <h1 className="text-xl mb-5 font-bold text-white">Featured Articles</h1>
      {currentArticles.map((article, index) => (
        <div
          key={index}
          className="bg-[#291B38] p-6 rounded-2xl shadow-lg w-full mx-auto border border-[#6A11CB] mb-6"
        >
          <div className="flex items-center gap-4">
            <img
              src={article.picture || "https://via.placeholder.com/150"}
              alt={article.authorName}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="text-white font-bold text-lg">{article.name}</h3>
              <p className="text-gray-300 text-sm">{article.designation}</p>
            </div>
            <span className="ml-auto bg-gradient-to-r from-[#F6D365] to-[#FDA085] text-white text-sm px-4 py-2 rounded-full">
              Premium
            </span>
          </div>

          <h2 className="text-[#F6F6F6] font-semibold text-xl mt-5">
            {article.title}
          </h2>
          <p className="text-[#E2E2E2] mt-3 mb-4 text-sm">
            {article.shortDescription}
          </p>

          <div className="flex items-center gap-4 text-[#FFD6FF] text-sm mt-4">
            <div className="flex items-center gap-1">
              <span className="text-lg">👁️</span>
              <span>{formatTimeAgo(article.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg shadow-md ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#6A11CB] text-white hover:bg-[#8A2BE2]"}`}
        >
          Previous
        </button>
        <span className="text-white">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg shadow-md ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#6A11CB] text-white hover:bg-[#8A2BE2]"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FeaturedArticle;
