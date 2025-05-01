import React from 'react';
import NewsIcon from "../../../../assets/images/trending_NEWS.svg"

const PreMarketNews = ({ data }) => {
  if (!data?.[0]?.news || !Array.isArray(data[0].news)) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent update';
    
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const options = { hour: '2-digit', minute: '2-digit' };
    const timeString = date.toLocaleTimeString('en-US', options);
    
    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${timeString}`;
    }
    
    // Check if date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${timeString}`;
    }
    
    // For other dates
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return `${formattedDate}, ${timeString}`;
  };

  const TrendingNewsCard = ({ title, description, pubDate }) => (
    <div className="bg-[#1A1625] border border-[#6A11CB] rounded-lg p-4">
      <div className="flex justify-between items-start mb-2 flex-wrap">
        <h3 className="text-[#D595FF] text-lg font-medium flex-1 pr-4 min-w-0">
          {title}
        </h3>
        <span className="text-gray-400 text-sm py-1 w-full block sm:inline">
          {formatDate(pubDate)}
        </span>
      </div>
      <p className="text-gray-300 py-4 text-md">
        {description}
      </p>
    </div>
  );
  
  return (
    <div className="bg-[#220C39] border border-[#6A11CB] rounded-lg p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-12 h-8 flex items-center justify-center">
              <img
                src={NewsIcon}
                alt="News Icon"
                className="object-cover"
              />
            </div>
            <h2 className="text-white text-lg font-medium">Trending News</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data[0].news.map(newsItem => (
              <TrendingNewsCard
                key={newsItem._id}
                title={newsItem.title}
                description={newsItem.description}
                pubDate={newsItem.pubDate}
                _id={newsItem._id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PreMarketNews;