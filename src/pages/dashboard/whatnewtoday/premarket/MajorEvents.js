import React, { useState } from "react";
import MajorEventsToday from "../../../../assets/images/major_events_today.svg";

function MajorEvents({ data }) {
  // Single state to track expanded sections
  const [showAllItems, setShowAllItems] = useState(false);

  // Early return if data is not available or not in expected format
  if (!data?.[0]?.corporate_action || !data?.[0]?.earning_report) {
    return null;
  }

  const corporateActions = data[0].corporate_action;
  const earningsReports = data[0].earning_report;

  // Determine which items to display based on state
  const displayedCorporateActions = showAllItems 
    ? corporateActions 
    : corporateActions.slice(0, 3);
    
  const displayedEarningReports = showAllItems 
    ? earningsReports 
    : earningsReports.slice(0, 3);

  // Calculate total hidden items
  const totalHiddenItems = 
    (corporateActions.length > 3 ? corporateActions.length - 3 : 0) +
    (earningsReports.length > 3 ? earningsReports.length - 3 : 0);

  // Only show the button if there are hidden items
  const showButton = corporateActions.length > 3 || earningsReports.length > 3;

  return (
    <div className="bg-[#1b0c2e] border border-[#6A11CB] p-6 md:p-8 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img
          className="mr-2 w-10"
          src={MajorEventsToday}
          alt="major_events_today"
        />
        <h1 className="text-2xl font-bold text-white">Major Events Today</h1>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Corporate Actions */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Corporate Actions
          </h2>
          <div className="space-y-4">
            {displayedCorporateActions.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-[#1A1625] border border-[#6A11CB] rounded-lg p-4 shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#D595FF]">
                    {item.company_name}
                  </h3>
                  <p className="text-sm text-white">{item.description} {item.price_range}</p>
                </div>
                <span className="bg-[#733F96] text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Reports */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Earnings Reports
          </h2>
          <div className="space-y-4">
            {displayedEarningReports.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-[#1A1625] border border-[#6A11CB] rounded-lg p-4 shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#D595FF]">
                    {item.company_name}
                  </h3>
                  <p className="text-sm text-white">{item.description}</p>
                </div>
                <span className="bg-[#733F96] text-white text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                  Result
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improved smaller button with animations */}
      {showButton && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className="mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-[#533B9A] to-[#6A55C9] text-white font-medium border border-[#8A65E9] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span className="text-sm">
              {showAllItems ? 'Hide' : `See More (${totalHiddenItems})`}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${showAllItems ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default MajorEvents;