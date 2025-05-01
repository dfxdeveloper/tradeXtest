import React, { useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, Clock, User } from "lucide-react";
import Minus from "../../assets/images/minus.svg";
import TrendingUp from "../../assets/images/trending-up.svg";
import TrendingDown from "../../assets/images/trending-down.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils/";
import Footer from "../../components/Footer";

// Constants
const SENTIMENT_TYPES = {
  BULLISH: {
    label: "Bullish",
    scoreKey: "positive_score",
    color: "#17B917",
    icon: TrendingUp,
  },
  NEUTRAL: {
    label: "Neutral",
    scoreKey: "neutral_score",
    color: "#E3D448",
    icon: Minus,
  },
  BEARISH: {
    label: "Bearish",
    scoreKey: "negative_score",
    color: "#C22222",
    icon: TrendingDown,
  },
};

// Reusable Components
const BackButton = ({ onClick }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy" />
    <button
      className="relative flex items-center gap-2 font-bold text-white bg-[#0E051B]/50 backdrop-blur-sm lg:px-4 lg:py-2 px-2 py-1 rounded-full transition-all duration-300 group"
      onClick={onClick}
    >
      <ArrowLeft
        size={20}
        className="group-hover:-translate-x-1 transition-transform duration-300"
      />
      <span className="text-sm lg:text-base">Back</span>
    </button>
  </div>
);

const InfoBadge = ({ icon: Icon, text }) =>
  text && (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#220C39] rounded-lg">
      <Icon size={20} className="text-purple-300" />
      <span className="text-lg font-semibold text-gray-200">{text}</span>
    </div>
  );

const SentimentCard = ({ type, score }) => (
  <div className="bg-[#220C39] rounded-lg py-2 px-4 transform hover:scale-105 transition-transform duration-500">
    <img src={type.icon} alt={type.label} className="h-5 w-5 mx-auto mb-1" />
    <p className="text-md font-bold text-gray-200">{type.label}</p>
    <p className="text-2xl font-bold" style={{ color: type.color }}>
      {(score * 100).toFixed(1)}
    </p>
  </div>
);

const NewsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  useEffect(() => {
    if (!article) {
      navigate("/news");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [article, navigate]);

  const handleBack = useCallback(() => {
    navigate(-1);
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, [navigate]);
  const formattedContent = useMemo(() => {
    if (!article?.content) return null;
    const paragraphs = article.content.split(/\n\n+/).filter(Boolean);
    if (paragraphs.length === 0) {
      return (
        <p className="text-sm sm:text-base leading-relaxed animate-fade-in">
          {article.content}
        </p>
      );
    }
    
    return paragraphs.map((paragraph, index) => (
      <p
        key={index}
        className={`text-sm sm:text-base leading-relaxed animate-fade-in animate-delay-[${
          index * 100
        }ms]`}
      >
        {paragraph.trim()}
      </p>
    ));
  }, [article?.content]);
  
  
  const topics = useMemo(() => {
    if (!article?.keywords) return [];
    return String(article.keywords)
      .split(",")
      .map((topic) => topic.trim())
      .filter(Boolean)
      .map((topic) => topic.replace(/^#/, ""));
  }, [article?.keywords]);

  if (!article) return null;

  return (
    <>
      <style>
        {`
          .bg-noise {
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+');
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
          .animate-slide-up { animation: slideUp 1s ease-out forwards; }
          .animate-gradient-xy {
            animation: gradient-xy 3s ease infinite;
            background-size: 400% 400%;
          }
        `}
      </style>

      <div className="bg-[#0E051B] pb-10 text-white font-sans min-h-screen transition-all duration-300">
        {/* Hero Section */}
        <div className="relative animate-fade-in">
          <div className="w-full h-[350px] relative overflow-hidden">
            <div className="absolute inset-0 z-10 bg-purple-900/30 mix-blend-multiply" />
            <div className="absolute inset-0 z-10 opacity-20 mix-blend-overlay bg-noise" />
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000 ease-in-out"
            />

            <div className="absolute top-4 left-4 z-20">
              <BackButton onClick={handleBack} />
            </div>

            <div className="absolute bottom-28 left-0 right-0 z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-8 space-y-4 sm:space-y-0">
              {article.source_icon && (
                <img
                  src={article.source_icon}
                  alt="Source"
                  className="rounded-lg lg:h-10 md:h-8 h-8 sm:h-12 lg:w-24 md:w-20 w-20 object-contain bg-white hover:shadow-lg transition-transform duration-500 hover:scale-105"
                />
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <InfoBadge
                  icon={Clock}
                  text={article.pubDate && formatDateTime(article.pubDate)}
                />
                <InfoBadge icon={User} text={article.creator} />
              </div>
            </div>

            <div className="absolute bottom-5 left-0 right-0 z-20 px-4 sm:px-8 animate-slide-up">
              <h1 className="text-xl sm:text-2xl lg:text-3xl w-full lg:w-[70%] font-bold leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Market Sentiment Section */}
        <div className="mx-4 lg:mx-72 my-4 animate-on-scroll opacity-0">
          <div className="bg-gradient-to-r from-[#CE88FC] to-[#8E4FD3] rounded-lg p-4 lg:p-6 text-center shadow-lg transform hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4">
              Market Sentiment Analysis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.values(SENTIMENT_TYPES).map((type) => (
                <SentimentCard
                  key={type.label}
                  type={type}
                  score={article.sentiment_score[type.scoreKey]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mx-4 lg:mx-36 animate-on-scroll opacity-0">
          <div className="bg-[#220C39] rounded-lg p-6 lg:p-12 text-gray-300 space-y-6 hover:shadow-xl transition-all duration-500">
            {formattedContent}
          </div>
        </div>

        {/* Related Topics Section */}
        {topics.length > 0 && (
          <div className="mx-4 lg:mx-36 mt-8 animate-on-scroll opacity-0">
            <div className="bg-[#220C39] rounded-lg p-6 lg:p-8 hover:shadow-xl transition-all duration-500">
              <h4 className="text-lg font-bold mb-4">Related Topics</h4>
              <div className="flex flex-wrap gap-3">
                {topics.map((topic, index) => (
                  <span
                    key={`${topic}-${index}`}
                    className="bg-[#3D0A74] backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#4D0A94] transition-all duration-300 cursor-pointer"
                  >
                    #{topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
