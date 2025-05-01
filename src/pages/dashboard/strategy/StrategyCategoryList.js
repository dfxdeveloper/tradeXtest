import React, { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import axiosInstance from "../../../utils/axiosHelper";

const StrategyCategoryList = ({
  category,
  handleAddStrategy,
  loading,
  selectedStrategies,
}) => {
  const [strategies, setStrategies] = useState([]);
  const [loadingAPI, setLoadingAPI] = useState(true);

  const fetchStrategiesByCategory = useCallback(
    async (abortController) => {
      setLoadingAPI(true);
      try {
        if (category) {
          const { data = [] } = await axiosInstance.get("user/strategy", {
            params: { category },
            signal: abortController.signal,
          });
          setStrategies(data);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          setStrategies([]);
        }
      } finally {
        setLoadingAPI(false);
      }
    },
    [category]
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchStrategiesByCategory(abortController);
    return () => abortController.abort();
  }, [fetchStrategiesByCategory]);

  const getButtonState = (strategyName) => {
    const isSelected = selectedStrategies.includes(strategyName);
    const loadingState = loading[strategyName];
    if (loadingState === "adding") {
      return {
        text: "Adding...",
        disabled: true,
        className: "bg-purple-400 cursor-not-allowed",
      };
    }
    if (isSelected || loadingState === "added") {
      return {
        text: "Added",
        disabled: true,
        className: "bg-purple-800 cursor-not-allowed",
      };
    }
    return {
      text: "Add",
      disabled: false,
      className: "hover:bg-purple-700 border border-[#6A11CB]",
    };
  };

  const getCardClassName = (strategyName) => {
    const loadingState = loading[strategyName];
    const baseClasses = "p-6 rounded-lg shadow-md transition-all duration-300";

    if (loadingState === "added") {
      return `${baseClasses} border-4 border-[#6A11CB] animate-pulse`;
    }

    return `${baseClasses} border border-[#6A11CB] bg-[#1A1625] hover:shadow-lg hover:shadow-purple-500/20`;
  };

  const renderSkeletonCards = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="p-6 rounded-lg shadow-md border border-gray-700 bg-[#1A1625]"
        >
          <div className="flex justify-between items-start">
            <div className="w-full">
              <Skeleton
                height={24}
                width="70%"
                baseColor="#2a2a2a"
                highlightColor="#3a3a3a"
                className="mb-4"
              />
              <Skeleton
                height={28}
                width={100}
                baseColor="#2a2a2a"
                highlightColor="#3a3a3a"
                className="rounded-lg"
              />
              <div className="mt-4">
                <Skeleton
                  count={2}
                  height={16}
                  baseColor="#2a2a2a"
                  highlightColor="#3a3a3a"
                />
              </div>
            </div>
            <Skeleton
              circle
              height={36}
              width={36}
              baseColor="#2a2a2a"
              highlightColor="#3a3a3a"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Skeleton
              height={8}
              width="33%"
              baseColor="#2a2a2a"
              highlightColor="#3a3a3a"
              className="rounded-full"
            />
            <Skeleton
              height={16}
              width={80}
              baseColor="#2a2a2a"
              highlightColor="#3a3a3a"
            />
            <Skeleton
              height={30}
              width={60}
              baseColor="#2a2a2a"
              highlightColor="#3a3a3a"
              className="rounded"
            />
          </div>
        </div>
      ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {loadingAPI || !strategies?.length
        ? renderSkeletonCards()
        : strategies.map((strategy, index) => {
            const buttonState = getButtonState(strategy.name);
            return (
              <div key={index} className={getCardClassName(strategy.name)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">
                      {strategy?.label}
                    </h2>
                    <p className="text-sm text-gray-300 mt-4">
                      {strategy?.description}
                    </p>
                  </div>
                  <a
                    href={strategy?.learningLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-[#310F54] p-2 rounded-full hover:bg-purple-700">
                      <Clock className="h-4 w-4 text-[#B039FF]" />
                    </button>
                  </a>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {/* <div className="w-1/3 bg-gray-700 h-2 rounded-full">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${strategy?.reliability || 90}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">
                    {strategy?.reliability || 90}% reliable
                  </span> */}
                  <button
                    className={`text-white py-1 px-3 rounded ${buttonState.className}`}
                    onClick={() => handleAddStrategy(strategy.name)}
                    disabled={buttonState.disabled}
                  >
                    {buttonState.text}
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default React.memo(StrategyCategoryList);
