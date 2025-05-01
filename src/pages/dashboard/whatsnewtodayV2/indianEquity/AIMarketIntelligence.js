import { TrendingUp, TrendingDown } from "lucide-react";
import AiIcon from "../../../../assets/images/ai_icon.svg"

function AIMarketIntelligence() {
  const outlookPoints = [
    "SGX Nifty down -615 pts (-2.7%), indicating weak open amid global risk-off.",
    "US markets tumbled – Nasdaq fell over 10% last week, enters bear territory.",
    "Asian markets weak – Nikkei, Hang Seng down on China's retaliatory tariffs.",
    "SGX Nifty down -615 pts (-2.7%), indicating weak open amid global risk-off.",
    "US markets tumbled – Nasdaq fell over 10% last week, enters bear territory.",
    "Asian markets weak – Nikkei, Hang Seng down on China's retaliatory tariffs.",
  ];

  return (
    <div className="flex flex-col w-full mx-auto md:mb-2 lg:mb-2 xl:mb-2 2xl:mb-2 mb:0 md:p-4 p-2 pb-10 pt-5 lg:px-6 xl:px-6 2xl:px-6">
      <div
        className="px-3 py-4 sm:px-4 md:px-6 lg:px-8 sm:py-6 rounded-lg sm:rounded-xl border border-gray-700 backdrop-blur-3xl"
        style={{
          background:
            "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
        }}
      >
 
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
        
        <div className="flex items-center mb-2 md:mb-2 w-full max-w-xs rounded-full border border-gray-700 backdrop-blur-3xl space-x-2 px-2 py-0.5">
          <img className="p-1 rounded-full h-9 w-9" src={AiIcon} alt="AI Icon" />
          <h2 className="text-xl font-euclid font-semibold truncate">
          AI Market Intelligence
          </h2>
        </div>
     
          <div className="bg-[#220C39] border border-[#370074] text-white font-regular font-giroy text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1">
            Market Snapshot: April 7, 2025
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
   
          <div className="lg:col-span-2">
           
            <div className="mb-4 sm:mb-4 border-b border-b-[#342B4B] pb-3">
              <h3 className="text-base sm:text-lg font-semibold text-[#D5AFFF] font-euclid mb-1 sm:mb-2">
                Key Market Insights
              </h3>
              <p className="text-xs sm:text-sm font-euclid font-semibold mb-2 sm:mb-2 text-white">
                Indian markets are likely to open on a cautious-to-weak note,
                tracking steep global sell-off triggered by rising trade
                tensions. However, expectations of a rate cut from RBI, stable
                macro data (PMI, GST, low inflation), and falling crude oil
                could cushion the downside. Stock-specific action is expected
                amid global volatility, with Nifty likely to consolidate between
                22,500-23,000 in the near term.
              </p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-bold font-euclid text-[#D5AFFF] mb-2">
                Market Outlook
              </h3>
              <ul className="text-xs sm:text-sm space-y-2 sm:space-y-3">
                {outlookPoints.map((point, index) => (
                  <li key={index} className="flex space-x-2 items-start">
                    <span className="font-semibold text-white font-euclid min-w-4">
                      {(index % 3) + 1}.
                    </span>
                    <span className="flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

         
          <div className="sentiment_bg font-euclid border lg:mt-6 xl:mt-6 2xl:mt-6 border-[#6A11CB] rounded-3xl p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-[#D5AFFF]">
              Sentiment Analysis
            </h3>
            <div className="mb-1 sm:mb-2">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0FEDBE]">70%</span>
            </div>
            <div className="flex space-x-2 mb-2 sm:mb-4">
              <span className="text-[#0FEDBE] text-xs sm:text-sm">Bullish</span>
              <span className="text-white text-xs sm:text-sm">| 19:57 04/26 EDT</span>
            </div>
            <div className="pt-2 sm:pt-2">
              <p className="text-xs sm:text-sm font-regular text-white mb-1">
                Data Sources:
              </p>
              <p className="text-xs sm:text-sm font-semibold">24 indicators analyzed</p>
            </div>
            <div className="mt-4 sm:mt-6 lg:mt-8 flex justify-between space-x-2">
              <div className="flex items-center text-[#AB0505] space-x-1 bg-gradient-to-b from-[#FF9597] to-[#FFD0D1] rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <TrendingDown size={12} className="hidden sm:inline sm:mr-1" />
                <span className="font-semibold font-euclid">Bearish</span>
              </div>

              <div className="flex items-center text-[#118C11] space-x-1 bg-gradient-to-b from-[#95FF95] to-[#D0FFD0] rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm">
                <TrendingUp size={12} className="hidden sm:inline sm:mr-1" />
                <span className="font-semibold font-euclid">Bullish</span>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 w-full bg-white rounded-full h-1 sm:h-2">
              <div
                className="bg-[#0FEDBE] h-1 sm:h-2 rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIMarketIntelligence;