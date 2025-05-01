import React from "react";

const CustomInputPrice = (props) => {
  const {
    value,
    name,
    onChange,
    isInt = false,
    className = "",
    placeholder = "",
    min,
    max,
    disabled = false,
  } = props;

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange(e);
      return;
    }

    const intRegex = /^[0-9]*$/;
    const floatRegex = /^[0-9]*\.?[0-9]*$/;

    const regex = isInt ? intRegex : floatRegex;

    if (regex.test(inputValue)) {
      if (
        (min !== undefined && Number(inputValue) < min) ||
        (max !== undefined && Number(inputValue) > max)
      ) {
        return;
      }
      onChange(e);
    }
  };

  const increment = () => {
    if (disabled) return;

    const currentValue = value === "" ? 0 : Number(value);
    const step = isInt ? 1 : 0.1;
    const newValue = isInt
      ? Math.floor(currentValue + step)
      : parseFloat((currentValue + step).toFixed(2));

    if (max !== undefined && newValue > max) return;

    const e = {
      target: {
        name,
        value: newValue.toString(),
      },
    };
    onChange(e);
  };

  const decrement = () => {
    if (disabled) return;

    const currentValue = value === "" ? 0 : Number(value);
    const step = isInt ? 1 : 0.1;
    const newValue = isInt
      ? Math.floor(currentValue - step)
      : parseFloat((currentValue - step).toFixed(2));

    if (min !== undefined && newValue < min) return;

    const e = {
      target: {
        name,
        value: newValue.toString(),
      },
    };
    onChange(e);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        inputMode={isInt ? "numeric" : "decimal"}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full p-2 bg-purple-900 rounded-lg text-white border border-purple-800 focus:outline-none ${className}`}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={increment}
            disabled={disabled}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomInputPrice;
