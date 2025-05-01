import { useEffect, useRef, useState } from "react";

const CustomDropdown = ({
  options,
  value,
  onChange,
  name,
  showImg = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    const syntheticEvent = {
      target: {
        name: name,
        value: option.value,
      },
    };

    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="w-full p-2 bg-[#220C39] rounded-lg text-white border border-purple-800 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {showImg && (
            <img
              src={selectedOption.symbol}
              alt="icon"
              className="w-5 h-5 mr-2"
            />
          )}
          <span>{selectedOption.label}</span>
        </div>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#220C39] rounded-lg border border-purple-800 shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center p-2 hover:bg-purple-900 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {showImg && (
                <img src={option.symbol} alt="icon" className="w-5 h-5 mr-2" />
              )}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
