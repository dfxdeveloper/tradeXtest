import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AiIcon from "../../../../assets/images/ai_icon.svg";

const AIInsights = [
  "AI algorithms detect significant institutional accumulation in banking stocks",
  "Natural Language Processing of recent earnings calls suggests bullish management tone",
  "Pattern recognition indicates potential breakout formation in Nifty chart",
  "Sentiment analysis of social media shows rising retail investor confidence",
  "Volatility forecast models suggest moderation in coming weeks",
  "Volatility forecast models suggest moderation in coming weeks",
];

const MarketTrends = [
  "RBI seen cutting rates next week amid global growth risks.",
  "Auto sales show strong growth in April led by SUV demand.",
  "FIIs sell ₹2,806 Cr; DIIs net buyers at ₹2,221 Cr.",
  "RBI seen cutting rates next week amid global growth risks.",
  "RBI seen cutting rates next week amid global growth risks.",
  "RBI seen cutting rates next week amid global growth risks.",
  "RBI seen cutting rates next week amid global growth risks.",
  "RBI seen cutting rates next week amid global growth risks.",
];

const KeyAlerts = new Array(6).fill(
  "U.S. announces tariffs on 60 nations including India; pharma exempted."
);

const AIOutlook = [
  {
    sector: "Banking",
    strength: "Strong",
    confidence: "82%",
    desc: "Credit growth acceleration and improving asset quality",
  },
  {
    sector: "IT",
    strength: "Weak",
    confidence: "82%",
    desc: "Global tech spending slowdown and margin pressure",
  },
  {
    sector: "Banking",
    strength: "Strong",
    confidence: "82%",
    desc: "Credit growth acceleration and improving asset quality",
  },
];

const AIPredictions = new Array(4).fill({
  title: "RBI Policy",
  subtitle: "Rate cut expected in next meeting",
  confidence: "78%",
  duration: "2-4 weeks",
});

function AiMarketDigest() {
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = AIPredictions.length;
  const getActiveDotIndex = (currentSlideIndex) => {
    if (currentSlideIndex === 0) return 0;
    if (currentSlideIndex === totalSlides - 1) return 2;
    return 1;
  };

  const predictionSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(AIPredictions.length, 3),
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(AIPredictions.length, 3),
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(AIPredictions.length, 2),
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  const handleDotClick = (index) => {
    if (sliderRef.current) {
      if (index === 0) {
        sliderRef.current.slickGoTo(0);
      } else if (index === 1) {
        const middleSlide = Math.floor(totalSlides / 2);
        sliderRef.current.slickGoTo(middleSlide);
      } else if (index === 2) {
        sliderRef.current.slickGoTo(totalSlides - 1);
      }
    }
  };

  return (
    <div className="text-white lg:p-0 xl:p-0 2xl:p-0 md:p-4 p-2 lg:px-6 xl:px-6 2xl:px-6 w-full">
      <div
        className="border border-gray-700 mt-2 rounded-xl p-2 sm:p-3 md:p-6 shadow-xl backdrop-blur-3xl"
        style={{
          background:
            "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
        }}
      >
        <div className="flex items-center mb-2 md:mb-2 w-full max-w-xs rounded-full border border-gray-700 backdrop-blur-3xl space-x-2 px-2 py-0.5">
          <img
            className="p-1 rounded-full h-9 w-9"
            src={AiIcon}
            alt="AI Icon"
          />
          <h2 className="text-xl font-euclid font-semibold truncate">
            AI Market Digest
          </h2>
        </div>

        <div className="bg-gradient-to-r from-[#220C39] to-[rgba(95,33,159,0.4)] border border-[#48387B] font-euclid text-sm p-3 rounded-md mb-4">
          <div className="font-semibold font-euclid text-sm uppercase mb-1 text-[#ECD0FF]">
            TL;DR
          </div>
          Markets showing strength despite global concerns. Banking leads, IT
          underperforms. RBI policy meeting next week likely to maintain rates.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-[#6A11CB] overflow-hidden">
            <div className="bg-nifty-gradient px-4 py-2 flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                  <path d="M12 2a10 10 0 0 1 10 10h-10V2Z" />
                  <path d="M12 22v-9.4a2.3 2.3 0 1 0-4.8-.2c-.2 2 1 3.4 3 4l1.8.6" />
                </svg>
              </div>
              <h2 className="font-bold font-euclid text-lg">
                AI-Powered Insights
              </h2>
            </div>
            <div className="p-4 overflow-y-auto max-h-60">
              <ul className="space-y-5">
                {AIInsights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sm text-white font-bold">•</span>
                    <span className="text-sm font-regular font-euclid">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[#6A11CB] overflow-hidden">
            <div className="bg-nifty-gradient px-4 py-2 flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <h2 className="font-bold font-euclid text-lg">Market Trends</h2>
            </div>
            <div className="p-4 overflow-y-auto max-h-60">
              <ul className="space-y-5">
                {MarketTrends.map((trend, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="rounded-full p-3 bg-[#6F5A15] border border-[#B4AE33]"></div>
                    <span className="text-sm font-regular mt-1 font-euclid">
                      {trend}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[#6A11CB] overflow-hidden">
            <div className="bg-nifty-gradient px-4 py-2 flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h2 className="font-bold font-euclid text-lg">Key Alerts</h2>
            </div>
            <div className="p-4 overflow-y-auto max-h-60">
              <ul className="space-y-5">
                {KeyAlerts.map((alert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="rounded-full p-3 bg-[#1D1754] border border-[#64408A]"></div>
                    <span className="text-sm font-regular mt-1 font-euclid">
                      {alert}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-[#6A11CB] overflow-hidden">
            <div className="bg-nifty-gradient px-4 py-2 flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <h2 className="font-bold font-euclid text-lg">
                AI Sector Outlook
              </h2>
            </div>
            <div className="p-4 overflow-y-auto max-h-60">
              <div className="space-y-3">
                {AIOutlook.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 bg-[#1A1132] border border-[#6A11CB] p-3 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <span className="font-medium font-euclid text-[#E8C4FF]">
                          {item.sector}
                        </span>
                        <span
                          className={`text-xs font-euclid px-2 py-0.5 rounded-full ${
                            item.strength === "Strong"
                              ? "bg-[#118011]"
                              : "bg-[#991313]"
                          }`}
                        >
                          {item.strength}
                        </span>
                      </div>
                      <span className="text-xs font-euclid bg-[#472775] text-white rounded-full px-2 py-1">
                        {item.confidence} confidence
                      </span>
                    </div>
                    <p className="text-xs font-euclid text-white">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="rounded-3xl border border-[#6A11CB] overflow-hidden">
            <div className="bg-nifty-gradient px-4 py-2 flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                  <path d="M12 2a10 10 0 0 1 10 10h-10V2Z" />
                  <path d="M12 22v-9.4a2.3 2.3 0 1 0-4.8-.2c-.2 2 1 3.4 3 4l1.8.6" />
                </svg>
              </div>
              <h2 className="font-bold font-euclid text-lg">AI Predictions</h2>
            </div>

            <div className="relative px-1 py-4">
              <Slider ref={sliderRef} {...predictionSettings}>
                {AIPredictions.map((item, idx) => (
                  <div key={idx} className="px-2 sm:px-3 py-2">
                    <div className="bg-[#1A1132] border border-[#6A11CB] p-3 rounded-lg h-full">
                      <h3 className="text-md text-white font-euclid font-bold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white font-euclid font-regular mb-8">
                        {item.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <span className="bg-[#093809] text-white font-euclid border border-[#156115] px-3 py-1 rounded-full flex items-center gap-3">
                            <span className="rounded-full bg-[#00D200] px-1 py-1"></span>
                            {item.confidence}
                          </span>
                        </div>
                        <span className="bg-[#472775] text-white font-regular font-euclid px-2 py-0.5 rounded-full text-xs">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="flex justify-center mt-3">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className="cursor-pointer mx-1"
                  >
                    <div
                      className={`rounded-full transition-all duration-300 ease-in-out ${
                        getActiveDotIndex(currentSlide) === index
                          ? "bg-white w-2 h-2 transform scale-125 shadow-glow"
                          : "bg-white bg-opacity-50 w-2 h-2"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #b475de;
            border-radius: 8px;
          }
          .shadow-glow {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
          }
        `}</style>
      </div>
    </div>
  );
}

export default AiMarketDigest;
