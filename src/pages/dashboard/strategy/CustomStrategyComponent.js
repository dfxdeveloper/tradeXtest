import React from 'react';
import { PlusCircle } from 'lucide-react';

const CustomStrategyComponent = () => {
  return (
    <div className="bg-purple-950 min-h-screen p-4">
      <div className="flex items-center text-white text-2xl font-bold mb-6">
        <button className="mr-2 text-white rounded-full p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        Custom Strategy
      </div>

      <div className="bg-purple-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button className="bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium">
              My Strategy
            </button>
            <button className="text-white px-4 py-2 rounded-full text-sm font-medium">
              Strategy Templates
            </button>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create New Strategy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array(6).fill().map((_, index) => (
            <div key={index} className="bg-purple-800 rounded-xl p-4">
              <h3 className="text-white font-bold mb-1">Golden Cross</h3>
              <p className="text-gray-300 text-sm mb-4">
                A bullish signal when a short-term moving average cross
              </p>
              
              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">AAPL</span>
                  <span className="bg-green-500 text-xs px-2 py-1 rounded-full">Bullish</span>
                  <span className="text-gray-300 text-sm">15m</span>
                  <span className="bg-purple-900 text-gray-300 text-xs px-2 py-1 rounded-full">2hours ago</span>
                </div>
                
                {index === 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">AAPL</span>
                    <span className="bg-red-500 text-xs px-2 py-1 rounded-full">Bearish</span>
                    <span className="text-gray-300 text-sm">1h</span>
                    <span className="bg-purple-900 text-gray-300 text-xs px-2 py-1 rounded-full">4days ago</span>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomStrategyComponent;