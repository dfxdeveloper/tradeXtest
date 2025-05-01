import React from 'react';
import MajorEventsToday from "../../../../assets/images/major_events_today.svg"
import { useWhatsNew } from '../../../../components/context/whatsnew';

const FiiDiiActivity = () => {
  const { whatsNewData } = useWhatsNew();
  
  // Function to format date from "Wed Feb 05 2025 05:30:00 GMT+0530 (India Standard Time)" to "05-02-2025"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  // Function to get color based on numeric value
  const getColorClass = (value) => {
    // Parse the value, removing any commas or currency symbols
    const numValue = parseFloat(value.replace(/[,₹$]/g, ''));
    
    // Return color class based on the numeric value
    return numValue < 0 ? 'text-[#FF0000]' : 'text-[#00D200]';
  };

  return (
    <div className="p-4 bg-[#1b0c2e] border border-[#6A11CB] rounded-lg shadow-lg w-full mx-auto">
      <div className="flex items-center space-x-4 mb-8">
         <img src={MajorEventsToday} className="mr-2 w-10" alt="Major Events Today" />
        <h2 className="text-white text-xl font-bold">FII/DII activity</h2>
      </div>
      <div className="bg-[#1A1625] rounded-lg border border-[#6A11CB] overflow-hidden">
        <div className="grid grid-cols-3 text-[#D595FF] py-3 px-4 border-b border-[#2C1543]">
          <span className="font-semibold">Date</span>
          <span className="font-semibold text-center">FII Net</span>
          <span className="font-semibold text-right">DII Net</span>
        </div>
        {whatsNewData && whatsNewData[0]?.fiidii_activity.map((item, index) => (
          <div key={index} className="grid grid-cols-3 py-3 px-4 border-b last:border-b-0 border-[#2C1543]">
            <span className="text-white">
              {/* Format the date if it matches the pattern you described */}
              {item.currentDate && item.currentDate.includes('GMT') 
                ? formatDate(item.currentDate) 
                : item.currentDate}
            </span>
            <span className={`text-center ${getColorClass(item.fiiNet)}`}>
              {item.fiiNet}
            </span>
            <span className={`text-right ${getColorClass(item.diiNet)}`}>
              {item.diiNet}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiiDiiActivity;