import React from "react";
import Trending_stock from "../../../../assets/images/trending_stocks.svg"
import { useWhatsNew } from "../../../../components/context/whatsnew";

const TrendingStocks = () => {
  const { whatsNewData, loading, error } = useWhatsNew();
  
  // Get the first item from the whatsNewData array
  const marketData = whatsNewData && whatsNewData.length > 0 ? whatsNewData[0] : null;
  
  // Check if specific data exists
  const hasTopGainers = marketData && marketData.top_gainers && marketData.top_gainers.length > 0;
  const hasTopLosers = marketData && marketData.top_losers && marketData.top_losers.length > 0;
  const hasVolumeGainers = marketData && marketData.volume_gainers && marketData.volume_gainers.length > 0;
  
  // Format data for display
  const topGainers = hasTopGainers ? marketData.top_gainers.map(stock => ({
    name: stock.stock_name,
    price: `₹${stock.price}`,
    change: `${stock.value}%`
  })) : [];
  
  const topLosers = hasTopLosers ? marketData.top_losers.map(stock => ({
    name: stock.stock_name,
    price: `₹${stock.price}`,
    change: `${stock.value}%` 
  })) : [];
  
  const volumeGainers = hasVolumeGainers ? marketData.volume_gainers.map(stock => ({
    name: stock.stock_name,
    price: `₹${stock.price}`,
    volume: `${stock.value}X`
  })) : [];

  // Show loading state
  if (loading) {
    return <div className="text-white p-6">Loading trending stocks data...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className="text-white p-6">Error loading stock data.</div>;
  }
  
  // Don't render if no data is available
  if (!marketData) {
    return <div className="text-white p-6">No stock data available.</div>;
  }

  return (
    <div className="bg-[#220C39] border border-[#6A11CB] rounded-xl text-white shadow-lg p-6 mx-auto max-w-full">
      <div className="gap-2 mb-4 flex">
        <img src={Trending_stock} alt="trending_stocks" srcSet="" />
        <h2 className="text-lg md:text-xl font-bold text-center md:text-left">
          Trending Stocks
        </h2>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Top Gainers */}
        <div>
          <h3 className="text-md font-bold mb-2 text-center md:text-left">Top Gainers</h3>
          <div className="space-y-2">
            {topGainers.length > 0 ? (
              topGainers.map((stock, index) => (
                <div
                  key={index}
                  className="bg-[#1A1625] border border-[#6A11CB] rounded-xl p-4 flex justify-between items-center w-full max-w-[400px] mx-auto"
                >
                  <div>
                    <p className="text-[#D595FF] text-sm font-bold">{stock.name}</p>
                    <p className="text-base">{stock.price}</p>
                  </div>
                  <span className="bg-gradient-to-b from-[#06BF6B] to-[#52B788] text-sm font-bold px-3 py-1 rounded-lg">
                    {stock.change}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-sm py-2">No data available</div>
            )}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <h3 className="text-md font-bold mb-2 text-center md:text-left">Top Losers</h3>
          <div className="space-y-2">
            {topLosers.length > 0 ? (
              topLosers.map((stock, index) => (
                <div
                  key={index}
                  className="bg-[#1A1625] border border-[#6A11CB] rounded-xl p-4 flex justify-between items-center w-full max-w-[400px] mx-auto"
                >
                  <div>
                    <p className="text-[#D595FF] text-sm font-bold">{stock.name}</p>
                    <p className="text-base">{stock.price}</p>
                  </div>
                  <span className="bg-gradient-to-b from-[#F33D53] to-[#FF5A5F] text-sm font-bold px-3 py-1 rounded-lg">
                    {stock.change}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-sm py-2">No data available</div>
            )}
          </div>
        </div>

        {/* Volume Gainers */}
        <div>
          <h3 className="text-md font-bold mb-2 text-center md:text-left">Volume Gainers</h3>
          <div className="space-y-2">
            {volumeGainers.length > 0 ? (
              volumeGainers.map((stock, index) => (
                <div
                  key={index}
                  className="bg-[#1A1625] border border-[#6A11CB] rounded-xl p-4 flex justify-between items-center w-full max-w-[400px] mx-auto"
                >
                  <div>
                    <p className="text-[#D595FF] text-sm font-bold">{stock.name}</p>
                    <p className="text-base">{stock.price}</p>
                  </div>
                  <span className="bg-gradient-to-b from-[#ECF39E] to-[#FFF9D4] text-[#957200] text-sm font-bold px-3 py-1 rounded-lg">
                    {stock.volume}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center text-sm py-2">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingStocks;