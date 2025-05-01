import React, { useState } from 'react';
import AiIcon from "../../../../assets/images/ai_icon.svg";

function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState('Corporate Actions');
  
  const data = {
    'Corporate Actions': [
      {
        company: 'KEI Industries Ltd.',
        type: 'Dividend',
        time: '12:00 pm | 12-04-25',
        details: 'Interim Dividend 200% @ Rs. 4 per share'
      },
      {
        company: 'KEI Industries Ltd.',
        type: 'Dividend',
        time: '12:00 pm | 12-04-25',
        details: 'Interim Dividend 200% @ Rs. 4 per share'
      },
      {
        company: 'KEI Industries Ltd.',
        type: 'Dividend',
        time: '12:00 pm | 12-04-25',
        details: 'Interim Dividend 200% @ Rs. 4 per share'
      },
      {
        company: 'KEI Industries Ltd.',
        type: 'Dividend',
        time: '12:00 pm | 12-04-25',
        details: 'Interim Dividend 200% @ Rs. 4 per share'
      }
    ],
    'Earning Report': [
      {
        company: 'Infosys Ltd.',
        type: 'Quarterly',
        time: '14:30 pm | 19-04-25',
        details: 'Q4 FY25 Revenue: $4.7B, EPS: $0.18'
      },
      {
        company: 'TCS Ltd.',
        type: 'Quarterly',
        time: '11:00 am | 22-04-25',
        details: 'Q4 FY25 Revenue: $7.2B, EPS: $0.23'
      },
      {
        company: 'Reliance Industries',
        type: 'Annual',
        time: '16:00 pm | 25-04-25',
        details: 'FY25 Revenue: $102B, Net Profit: $8.5B'
      },
      {
        company: 'HDFC Bank',
        type: 'Quarterly',
        time: '10:00 am | 28-04-25',
        details: 'Q4 FY25 NII: $3.1B, Net Profit: $1.4B'
      }
    ],
    'Upcoming Results': [
      {
        company: 'Bharti Airtel',
        type: 'Results',
        time: '15:00 pm | 02-05-25',
        details: 'Q4 FY25 Results Announcement'
      },
      {
        company: 'ITC Ltd.',
        type: 'Results',
        time: '11:30 am | 05-05-25',
        details: 'Q4 & Annual FY25 Results'
      },
      {
        company: 'Larsen & Toubro',
        type: 'Results',
        time: '14:00 pm | 08-05-25',
        details: 'Q4 FY25 Financial Results'
      },
      {
        company: 'Axis Bank',
        type: 'Results',
        time: '10:30 am | 10-05-25',
        details: 'Annual Financial Results FY25'
      }
    ]
  };

  const getTagColor = (type) => {
    switch (type) {
      case 'Dividend':
        return 'bg-gradient-to-r from-[#30CFD0] to-[#330867]';
      case 'Quarterly':
        return 'bg-blue-500';
      case 'Annual':
        return 'bg-purple-500';
      case 'Results':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="text-white lg:p-0 xl:p-0 2xl:p-0 md:p-4 p-2 pb-10 lg:px-6 xl:px-6 2xl:px-6 w-full">
      <div
        className="border border-gray-700 mt-2 lg:mt-6 rounded-xl p-2 sm:p-3 md:p-6 shadow-xl backdrop-blur-3xl"
        style={{
          background:
            "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
        }}
      >
        <div className="flex items-center mb-4 md:mb-4 w-full max-w-xs rounded-full border border-gray-700 backdrop-blur-3xl space-x-2 px-2 py-0.5">
          <svg className="p-1 rounded-full h-9 w-9 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 10V7C20 5.9 19.1 5 18 5H6C4.9 5 4 5.9 4 7V10M20 10V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V10M20 10H4M8 3V7M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="6" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
            <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
            <rect x="15" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
          </svg>
          <h2 className="text-lg font-euclid font-semibold truncate">
            Upcoming Events
          </h2>
        </div>
        <div className="bg-[#1A0E30] lg:-mx-6 md:-mx-6 xl:-mx-6 2xl:-mx-6 -mx-2 mb-4 md:mb-6">
          <div className="flex px-6 overflow-x-auto hide-scrollbar">
            {Object.keys(data).map(tab => (
              <button 
                key={tab}
                className={`px-2 py-2 font-euclid text-center text-xs md:text-sm lg:text-base whitespace-nowrap transition-colors duration-200 relative xl:mr-48 2xl:mr-48 md: ${
                  activeTab === tab 
                    ? 'text-[#D5AFFF] font-semibold' 
                    : 'text-[#A3A3A3] hover:text-gray-300 font-regular'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2575FC] rounded-full w-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
          {data[activeTab].map((item, i) => (
            <div key={i} className="bg-[#1A1132] border border-[#6A11CB] p-3 md:p-4 rounded-lg">
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <h2 className="text-base md:text-lg font-medium font-euclid text-[#D595FF] mr-2">{item.company}</h2>
                    <span className={`${getTagColor(item.type)} text-xs text-white font-euclid px-2 py-1 rounded-full`}>
                      {item.type}
                    </span>
                  </div>
                  <span className="text-white font-euclid text-xs whitespace-nowrap">
                    {item.time}
                  </span>
                </div>
                <p className="text-white font-euclid text-xs md:text-sm mt-1">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
    </div>
  );
}

export default UpcomingEvents;