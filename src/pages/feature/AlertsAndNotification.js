import React from "react";
import AlertsVisual from "../../assets/images/alerts_mobile.svg";

export default function AlertsAndNotification() {
  return (
    <section className="real-alerts-bg text-white font-euclid py-16 px-6 sm:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Real-Time Alerts & Notifications
        </h2>
        <div className="w-72 h-[3px] bg-[#B039FF] mx-auto my-3 rounded-full"></div>
        <p className="text-white font-regular mt-3 text-sm sm:text-base">
          Stay ahead of market movements with AI-analyzed news and events
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex-1 max-w-2xl w-full">
          {/* First Card */}
          <div className="flex items-start gap-4 border rounded-xl p-6 transition-all duration-300 bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)] border-[#54236d] mb-5 max-w-md">
            <div className="min-w-[44px] min-h-[44px] rounded-full bg-[#F1E8FF1A] flex items-center justify-center text-2xl text-white">
              📰
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#D5AFFF]">
                News Aggregator
              </h3>
              <p className="text-sm text-white font-regular">
                Access a one-stop feed for all major market-moving news and
                insights in one place, drawn from premium financial sources
                worldwide.
              </p>
            </div>
          </div>

          {/* Second Card - Moved to the right */}
          <div className="flex items-start gap-4 border rounded-xl p-6 transition-all duration-300 bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)] border-[#6E2D90] max-w-md ml-auto mr-0 mb-5">
            <div className="min-w-[44px] min-h-[44px] rounded-full bg-[#F1E8FF1A] flex items-center justify-center text-2xl text-white">
              📡
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#D5AFFF]">
                In-Platform Alerts
              </h3>
              <p className="text-sm text-white font-regular">
                Receive real-time news directly within the platform, keeping you
                informed without distractions or the need to switch between
                applications.
              </p>
            </div>
          </div>

          {/* Third Card */}
          <div className="flex items-start gap-4 border rounded-xl p-6 transition-all duration-300 bg-[linear-gradient(123.67deg,rgba(255,255,255,0.07)_-1.5%,rgba(255,255,255,0)_98.37%)] border-[#54236d] max-w-md">
            <div className="min-w-[44px] min-h-[44px] rounded-full bg-[#F1E8FF1A] flex items-center justify-center text-2xl text-white">
              📊
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#D5AFFF]">
                Smart Guidance
              </h3>
              <p className="text-sm text-white font-regular">
                Align your trades with both technical analysis and real-world
                events, ensuring you're always ready for changes and can adjust
                your strategy accordingly.
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex-1 flex justify-center lg:max-w-lg w-full">
          <img
            src={AlertsVisual}
            alt="Alerts & Notifications Visual"
            className="w-full h-full object-contain rounded-xl lg:scale-110"
          />
        </div>
      </div>
    </section>
  );
}
