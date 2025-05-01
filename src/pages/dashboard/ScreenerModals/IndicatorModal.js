import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const IndicatorModal = ({ onClose, onSubmit, indicator, options }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (parameter, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [parameter]: value,
    }));
  };

  const handleSubmit = () => {
    const attribute = `${indicator}_${Object.values(selectedOptions).join(
      "_"
    )}`;
    onSubmit(attribute);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <h3 className="text-lg font-medium">
            Configure Indicator - {indicator}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 space-y-4">
          {options.map((option, idx) => (
            <div key={idx} className="space-y-2">
              <label className="block text-sm font-medium">
                {option.parameter}
              </label>
              <div className="relative">
                <select
                  className="w-full bg-gray-800 text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  onChange={(e) =>
                    handleOptionChange(option.parameter, e.target.value)
                  }
                >
                  <option value="">Select {option.parameter}</option>
                  {option.values.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-4 p-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#8B78FF] text-white rounded px-4 py-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndicatorModal;
