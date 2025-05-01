import React from "react";
import RealTime from "../../assets/images/RealTimeNews.svg";
import Globe from "../../assets/images/globe_icon.svg";
const RealTimeNews = () => {
  return (
    <div className="Real_Time_News m-0 text-white min-h-screen font-euclid gap-12 md:gap-24 py-16 px-6 sm:px-10 lg:px-20 flex flex-col md:flex-row relative bg-purple-900">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <h1 className="text-4xl px-2 font-bold mb-2 leading-tight">
          Real-Time News
        </h1>
        <div className="w-72 h-[3px] bg-[#B039FF] mb-2 rounded-full"></div>
        <p className="text-white px-2 w-[90%] mb-8 leading-relaxed">
          Stay informed with live updates on global events, financial news, and
          economic data. Our real-time news feed keeps you connected to
          market-moving events, so you can act quickly and confidently.
        </p>

        <div className="space-y-6">
          <div className="space-y-6">
            <div
              className="rounded-xl p-2 max-w-md"
              style={{
                borderWidth: "0px 0px 3px 3px",
                borderStyle: "solid",
                borderColor: "#320266",
              }}
            >
              <h2 className="text-xl px-12 mb-2 font-semibold">
                News Aggregator
              </h2>
              <div className="flex items-start gap-4">
                <img
                  className="h-8 w-8"
                  src={Globe}
                  alt="Globe"
                  loading="lazy"
                />
                <div>
                  <p className="text-[#B2B5BE] font-regularleading-relaxed">
                    Access a one-stop feed for all major market-moving news and
                    insights in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="rounded-xl p-2 max-w-md"
              style={{
                borderWidth: "0px 0px 3px 3px",
                borderStyle: "solid",
                borderColor: "#320266",
              }}
            >
              <h2 className="text-xl px-12 mb-2 font-semibold">
                In-Platform Alerts
              </h2>
              <div className="flex items-start gap-4">
                <img
                  className="h-8 w-8"
                  src={Globe}
                  alt="Globe"
                  loading="lazy"
                />
                <div>
                  <p className="text-[#B2B5BE] font-regular leading-relaxed">
                    Receive real-time news directly within the platform, keeping
                    you informed without distractions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div
              className="rounded-xl p-2 max-w-md"
              style={{
                borderWidth: "0px 0px 3px 3px",
                borderStyle: "solid",
                borderColor: "#320266",
              }}
            >
              <h2 className="text-xl mb-2 px-12 font-semibold">
                Smart Guidance
              </h2>
              <div className="flex items-start gap-4">
                <img
                  className="h-8 w-8"
                  src={Globe}
                  alt="Globe"
                  loading="lazy"
                />
                <p className="text-[#B2B5BE] font-regular leading-relaxed">
                  Align your trades with both technical analysis and real-world
                  events, ensuring you're always ready for changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex items-center justify-center relative mt-8 md:mt-0">
        <img
          src={RealTime}
          alt="Real-Time News"
          className="max-w-full h-auto shadow-lg rounded-md"
        />
      </div>
    </div>
  );
};

export default RealTimeNews;
