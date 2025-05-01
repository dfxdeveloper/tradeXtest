/* import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { TrendingDown, TrendingUp, Eye } from "lucide-react";
import { TYPEMAPPING } from "../../../utils/constants";
import useMarketController from "../../../hooks/useMarketController";
import { round } from "../../../utils";
import TradingViewChart from "./TradingViewChart";
import closeModalIcon from "../../../assets/icons/close-stock-modal.svg";

const WatchlistSignal = ({ signals }) => {
  const [cardsToShow, setCardsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tradingViewChartData, setTradingViewChartData] = useState({
    showModal: false,
    symbol: "",
  });

  const maxIndex = signals?.data?.length
    ? Math.max(0, signals.data.length - cardsToShow)
    : 0;

  const memorized = useMemo(
    () =>
      signals.data?.reduce(
        (acc, { companyIdentifier, contract_type }) => {
          const type = TYPEMAPPING[contract_type];
          if (type && !acc[type].includes(companyIdentifier)) {
            acc[type].push(companyIdentifier);
          }
          return acc;
        },
        { indian: [], us: [], forex: [], crypto: [] }
      ),
    [signals.data]
  );

  const { socketData } = useMarketController(memorized);

  const findSocket = useCallback((item, socketData) => {
    const marketType = TYPEMAPPING[item.contract_type];
    if (!socketData?.[marketType]) return null;
    const marketData = socketData[marketType];
    const matchedEntry = Object.values(marketData).find(
      (entry) => entry.identifier === item.companyIdentifier
    );
    return matchedEntry;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      signals?.data?.length &&
      currentIndex > signals.data.length - cardsToShow
    ) {
      setCurrentIndex(Math.max(0, signals.data.length - cardsToShow));
    }
  }, [cardsToShow, currentIndex, signals?.data?.length]);

  useEffect(() => {
    if (maxIndex <= 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  const getCardWidthPercentage = () => {
    if (cardsToShow === 1) return 98.5;
    if (cardsToShow === 2) return 48.5;
    return 31;
  };

  const cardWidth = getCardWidthPercentage();
  const cardGap = 1.5; 
  const totalCardWidth = cardWidth + cardGap;

  function timeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}D ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  }

  const getNavigationDots = () => {
    if (!signals?.data?.length || signals.data.length <= cardsToShow) return [];

    const totalPositions = maxIndex + 1;

    if (totalPositions <= 5) {
      return Array.from({ length: totalPositions }, (_, i) => ({
        index: i,
        active: i === currentIndex,
      }));
    } else {
      const middleIndex = Math.floor(totalPositions / 2);

      const dots = [
        { index: 0, active: currentIndex === 0 },
        {
          index: middleIndex,
          active: currentIndex > 0 && currentIndex < maxIndex,
        },
        { index: maxIndex, active: currentIndex === maxIndex },
      ];

      if (currentIndex === middleIndex) {
        dots[1].active = true;
        dots[0].active = false;
        dots[2].active = false;
      }

      return dots;
    }
  };

  const handleDotClick = (dotIndex) => {
    const totalPositions = maxIndex + 1;

    if (totalPositions <= 5) {
      setCurrentIndex(dotIndex);
    } else {
      if (dotIndex === 0) {
        setCurrentIndex(0);
      } else if (dotIndex === Math.floor(totalPositions / 2)) {
        setCurrentIndex(Math.floor(maxIndex / 2));
      } else {
        setCurrentIndex(maxIndex);
      }
    }
  };

  return (
    <>
      <div className="relative overflow-hidden w-full">
        <div className="flex items-center border border-gray-600 lg:w-1/3 p-2 rounded-full mb-2 md:mb-3">
          <div className="flex items-center text-white">
            <span className="text-md lg:text-lg font-medium font-gilroy md:text-sm text-xs mr-2">
              ⚡
            </span>
            <h2 className="text-md lg:text-lg font-medium font-gilroy md:text-sm text-xs">
              Today's AI Pulse for Your Watchlist
            </h2>
          </div>
        </div>

        <div className="relative overflow-hidden w-full">
          {signals?.data?.length > 0 ? (
            <div
              className="flex flex-nowrap transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * totalCardWidth + cardWidth + cardGap
                }%)`,
                gap: `${cardGap}%`,
              }}
            >
              {signals.data.map((card, index) => {
                const socket = findSocket(card, socketData);
                const percentageChange = socket?.percentage
                  ? socket?.percentage
                  : card?.open && card?.close
                  ? round(((card?.close - card?.open) / card?.open) * 100, 2)
                  : 2.3;

                const timeIntervalDisplay =
                  card.time_interval || (index === 2 ? "15m" : "5m");

                return (
                  <div
                    key={`signal-id-${index}`}
                    className="flex-none"
                    style={{
                      width: `${cardWidth}%`,
                      margin: "0px",
                    }}
                  >
                    <div className=" rounded- border border-[#6A11CB] rounded-xl overflow-hidden h-full">
                      <div className="flex justify-between -mx-4 px-8 py-1 bg-gradient-to-b from-[#667EEA] to-[#764BA2] rounded-lg items-center">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-2">
                            <span className="text-indigo-700 font-medium">
                              {card.companyIdentifier?.slice(0, 2) || ""}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <span className="text-white font-bold">
                                {card.companyIdentifier || ""}
                              </span>
                              <span className="ml-1 sm:ml-2 text-xs font-medium font-gilroy px-1 sm:px-2 py-0 bg-[#D6E5FF] text-[#2575FC] rounded-full">
                                {timeIntervalDisplay}
                              </span>
                            </div>
                            <div className="text-gray-400 text-xs">
                              {card.company_label || ""}
                            </div>
                          </div>
                        </div>
                        <div className="text-right mb-1">
                          <div className="text-white text-sm mx-2 font-medium font-gilroy">
                            {socket?.price || card?.close
                              ? card.contract_type === "Indian_Equity"
                                ? `₹${socket?.price || card?.close}`
                                : `$${socket?.price || card?.close}`
                              : null}
                          </div>
                          <div
                            className={`${
                              percentageChange < 0
                                ? " bg-[#FFCDCD] text-[#AB0505]"
                                : percentageChange > 0
                                ? "bg-[#CDFFCD] text-[#0C780C]"
                                : "text-gray-400"
                            } text-xs px-1 py-0 font-gilroy font-medium rounded-full inline-block mx-1 mt-0`}
                          >
                            ({percentageChange}%)
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="text-xs bg-[#1A1625] font-regular w-16 text-center font-gilroy p-1  rounded-full text-white-2">
                          {timeAgo(card.timestamp) || ""}
                        </div>
                        <div
                          className={`${
                            [
                              "text-[#91BAFF]",
                              "text-[#DA91FF]",
                              "text-[#FDFF75]",
                            ][index % 3]
                          } font-semibold text-lg mb-1 mt-2 capitalize`}
                        >
                          {card?.key ? card.key.replace(/_/g, " ") : "Signal"}{" "}
                          Detected
                        </div>
                        {percentageChange < 0 ? (
                          <div className="text-[#FCFCFC] bg-[#DA5454] font-gilroy font-medium border border-[#323232] rounded-full py-2 px-3 text-xs mb-4">
                            {card.suggested_action_text}
                          </div>
                        ) : (
                          <div className="text-[#FCFCFC] bg-[#1BA71B] font-gilroy border border-[#323232] rounded-full py-2 px-3 font-medium text-xs mb-4">
                            {card.suggested_action_text}
                          </div>
                        )}
                        <div className="flex space-x-8 py-2">
                          <button
                            className="flex items-center bg-[#5844B0] px-3 py-1 font-gilroy font-medium rounded text-white text-sm"
                            onClick={() => {
                              let formatedSymbol = "";
                              if (card.contract_type === "Crypto") {
                                formatedSymbol = card.companyIdentifier.replace(
                                  "X:",
                                  ""
                                );
                              } else if (card.contract_type === "Forex") {
                                formatedSymbol = card.companyIdentifier.replace(
                                  "C:",
                                  ""
                                );
                              } else if (
                                ["Indian_Equity", "US_Equity"].includes(
                                  card.contract_type
                                )
                              ) {
                                formatedSymbol = card.companyIdentifier;
                              }
                              if (formatedSymbol) {
                                setTradingViewChartData((prev) => ({
                                  ...prev,
                                  showModal: true,
                                  symbol: formatedSymbol,
                                }));
                              }
                            }}
                          >
                            <Eye size={16} className="mr-1" /> View Chart
                          </button>
                          {percentageChange >= 0 === (index !== 2) ? (
                            <button className="flex items-center bg-[#BAFFBA]  px-3 py-1 font-gilroy font-medium rounded text-[#006B00] text-sm">
                              <TrendingUp size={16} className="mr-1" /> Bullish
                            </button>
                          ) : (
                            <button className="flex items-center bg-[#FFD4D4] px-3 py-1 font-gilroy font-medium rounded text-[#AB0505] text-sm">
                              <TrendingDown size={16} className="mr-1" />{" "}
                              Bearish
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-white py-4">
              No signals available at the moment
            </div>
          )}
        </div>

        {signals?.data?.length > cardsToShow && (
          <div className="flex justify-center mt-4">
            {getNavigationDots().map((dot, idx) => (
              <div
                key={`dot-${idx}`}
                onClick={() => handleDotClick(dot.index)}
                className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
                  dot.active ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {tradingViewChartData.showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center font-gilroy font-semibold z-10">
            <div className="relative w-full max-w-4xl shadow-[0_0_0_2px_#AD4AFF,0_0_0_4px_#2575FC] rounded-2xl bg-[#6C4984] bg-gradient-to-b from-[#6C4984] to-[#220C39] text-white">
              <h1 className="text-center pt-4">Chart View</h1>
              <button
                onClick={() =>
                  setTradingViewChartData((prev) => ({
                    ...prev,
                    showModal: false,
                    symbol: "",
                  }))
                }
                className="absolute w-8 top-4 right-4"
              >
                <img src={closeModalIcon} alt="close" loading="lazy" />
              </button>
              <div className="px-2 mt-4 mb-4 overflow-x-auto">
                <div className="md:min-w-full">
                  <TradingViewChart symbol={tradingViewChartData.symbol} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(WatchlistSignal);
 */

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
  useRef,
} from "react";
import {
  TrendingDown,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { MARKETS, TYPEMAPPING } from "../../../utils/constants";
import useMarketController from "../../../hooks/useMarketController";
import { formatRelativeTime, round } from "../../../utils";
import TradingViewChart from "./TradingViewChart";
import closeModalIcon from "../../../assets/icons/close-stock-modal.svg";
import CandlestickChart from "./CandlestickChart";

const WatchlistSignal = ({ signals }) => {
  const [cardsToShow, setCardsToShow] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tradingViewChartData, setTradingViewChartData] = useState({
    showModal: false,
    symbol: "",
    category: "",
  });
  const [tooltipState, setTooltipState] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });
  const containerRef = useRef(null);
  const actionTextRefs = useRef([]);
  const touchStartX = useRef(null);
  const maxIndex = signals?.data?.length
    ? Math.max(0, signals.data.length - cardsToShow)
    : 0;

  useEffect(() => {
    if (signals?.data) {
      actionTextRefs.current = signals.data.map(() => React.createRef());
    }
  }, [signals?.data]);

  const memorized = useMemo(
    () =>
      signals.data?.reduce(
        (acc, { companyIdentifier, contract_type }) => {
          const type = TYPEMAPPING[contract_type];
          if (type && !acc[type].includes(companyIdentifier)) {
            acc[type].push(companyIdentifier);
          }
          return acc;
        },
        { indian: [], us: [], forex: [], crypto: [] }
      ),
    [signals.data]
  );

  const { socketData } = useMarketController(memorized);

  const findSocket = useCallback((item, socketData) => {
    const marketType = TYPEMAPPING[item.contract_type];
    if (!socketData?.[marketType]) return null;
    const marketData = socketData[marketType];
    const matchedEntry = Object.values(marketData).find(
      (entry) => entry.identifier === item.companyIdentifier
    );
    return matchedEntry;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth <= 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      signals?.data?.length &&
      currentIndex > signals.data.length - cardsToShow
    ) {
      setCurrentIndex(Math.max(0, signals.data.length - cardsToShow));
    }
  }, [cardsToShow, currentIndex, signals?.data?.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !signals?.data?.length) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(
        0,
        Math.min(maxIndex, currentIndex + direction)
      );
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (touchStartX.current === null) return;
      const touchEndX = e.touches[0].clientX;
      const touchDelta = touchStartX.current - touchEndX;
      if (Math.abs(touchDelta) > 30) {
        const direction = touchDelta > 0 ? 1 : -1;
        const newIndex = Math.max(
          0,
          Math.min(maxIndex, currentIndex + direction)
        );
        setCurrentIndex(newIndex);
        touchStartX.current = null;
      }
    };

    const handleTouchEnd = () => {
      touchStartX.current = null;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    if (!signals?.data?.length) return;
    const timer = setTimeout(() => {
      actionTextRefs.current.forEach((ref, index) => {
        if (ref?.current) {
          const element = ref.current;
          if (element.scrollHeight > element.clientHeight) {
            element.setAttribute("data-overflow", "true");
          } else {
            element.setAttribute("data-overflow", "false");
          }
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [signals?.data, currentIndex, cardsToShow]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        tooltipState.visible &&
        !e.target.classList.contains("action-text-tooltip-trigger")
      ) {
        setTooltipState({ visible: false, text: "", x: 0, y: 0 });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [tooltipState.visible]);

  const getCardWidthPercentage = () => {
    if (cardsToShow === 1) return 98.5;
    if (cardsToShow === 2) return 48.5;
    return 32;
  };

  const cardWidth = getCardWidthPercentage();
  const cardGap = 1.5;
  const totalCardWidth = cardWidth + cardGap;

  const getNavigationDots = () => {
    if (!signals?.data?.length || signals.data.length <= cardsToShow) return [];

    const totalPositions = maxIndex + 1;

    if (totalPositions <= 5) {
      return Array.from({ length: totalPositions }, (_, i) => ({
        index: i,
        active: i === currentIndex,
      }));
    } else {
      const middleIndex = Math.floor(totalPositions / 2);

      const dots = [
        { index: 0, active: currentIndex === 0 },
        {
          index: middleIndex,
          active: currentIndex === middleIndex,
        },
        { index: maxIndex, active: currentIndex === maxIndex },
      ];

      return dots;
    }
  };

  const handleDotClick = (dotIndex) => {
    setCurrentIndex(dotIndex);
  };

  const handleNavigation = (direction) => {
    const newIndex = Math.max(0, Math.min(maxIndex, currentIndex + direction));
    setCurrentIndex(newIndex);
  };

  const checkTextOverflow = (index) => {
    const element = actionTextRefs.current[index]?.current;
    if (element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.offsetHeight < element.scrollHeight ||
        element.clientHeight < element.scrollHeight
      );
    }
    return false;
  };

  const handleActionTextHover = (e, text, index) => {
    e.stopPropagation();
    if (checkTextOverflow(index)) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipState({
        visible: true,
        text,
        x: rect.left + rect.width / 2,
        y: rect.bottom + window.scrollY + 10,
      });
    }
  };

  const renderSkeletonCards = () => {
    return Array(cardsToShow)
      .fill()
      .map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex-none"
          style={{
            width: `${cardWidth}%`,
            margin: "0px",
          }}
        >
          <div className="rounded-2xl border border-[#6A11CB] rounded-xl overflow-hidden h-full">
            <div className="p-3 bg-gradient-to-b from-[#667EEA]/50 to-[#764BA2]/50 rounded-lg items-center">
              <div className="flex items-center mb-2">
                <Skeleton
                  circle
                  width={32}
                  height={32}
                  className="mr-2"
                  baseColor="#4a307b"
                  highlightColor="#6a11cb"
                />
                <div className="flex-1">
                  <Skeleton
                    width={100}
                    height={18}
                    baseColor="#4a307b"
                    highlightColor="#6a11cb"
                  />
                  <Skeleton
                    width={120}
                    height={12}
                    className="mt-1"
                    baseColor="#4a307b"
                    highlightColor="#6a11cb"
                  />
                </div>
                <div className="text-right">
                  <Skeleton
                    width={60}
                    height={16}
                    baseColor="#4a307b"
                    highlightColor="#6a11cb"
                  />
                  <Skeleton
                    width={40}
                    height={12}
                    className="mt-1 ml-auto"
                    baseColor="#4a307b"
                    highlightColor="#6a11cb"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3">
              <Skeleton
                width={80}
                height={20}
                className="mb-3"
                baseColor="#1A1625"
                highlightColor="#2F2947"
              />
              <Skeleton
                width={160}
                height={24}
                className="mb-2"
                baseColor="#4a307b"
                highlightColor="#6a11cb"
              />
              <Skeleton
                width={200}
                height={36}
                className="mb-4"
                baseColor="#4a307b"
                highlightColor="#6a11cb"
              />
              <div className="flex space-x-8 py-2">
                <Skeleton
                  width={100}
                  height={32}
                  baseColor="#4a307b"
                  highlightColor="#6a11cb"
                />
                <Skeleton
                  width={100}
                  height={32}
                  baseColor="#4a307b"
                  highlightColor="#6a11cb"
                />
              </div>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <>
      <div className="relative w-full">
        <div className="flex items-center border border-gray-600 lg:w-1/3 p-2 rounded-full mb-2 md:mb-3 lg:mb-4">
          <div className="flex items-center text-white">
            <span className="text-md lg:text-lg font-medium font-gilroy md:text-sm text-xs mr-2">
              ⚡
            </span>
            <h2 className="text-md lg:text-lg font-medium font-gilroy md:text-sm text-xs">
              Today's AI Pulse for Your Watchlist
            </h2>
          </div>
        </div>

        <div className="border border-gray-600 rounded-xl p-3">
          <div className="flex items-center w-full">
            <button
              onClick={() => handleNavigation(-1)}
              className={`flex-none w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7a5af8] to-[#6A11CB] hover:from-[#8a6aff] hover:to-[#7922da] text-white shadow-lg transition-all duration-300 border border-[#9867FF] mx-2 z-20 ${
                !signals?.data?.length || currentIndex === 0
                  ? "opacity-60 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              aria-label="Previous"
              disabled={!signals?.data?.length || currentIndex === 0}
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <div
              className="flex-1 relative overflow-hidden hide-scrollbar"
              ref={containerRef}
            >
              {signals?.loading && signals?.data === null ? (
                <div
                  className="flex flex-nowrap"
                  style={{ gap: `${cardGap}%` }}
                >
                  {renderSkeletonCards()}
                </div>
              ) : signals?.data?.length > 0 ? (
                <div
                  className="flex flex-nowrap transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      Math.min(
                        currentIndex,
                        signals.data.length - cardsToShow
                      ) * totalCardWidth
                    }%)`,
                    gap: `${cardGap}%`,
                  }}
                >
                  {signals.data.map((card, index) => {
                    const socket = findSocket(card, socketData);
                    const percentageChange = socket?.percentage
                      ? socket?.percentage
                      : card?.open && card?.close
                      ? round(
                          ((card?.close - card?.open) / card?.open) * 100,
                          2
                        )
                      : 2.3;

                    const timeIntervalDisplay =
                      card.time_interval || (index === 2 ? "15m" : "5m");

                    return (
                      <div
                        key={`signal-id-${index}`}
                        className="flex-none"
                        style={{
                          width: `${cardWidth}%`,
                          margin: "0px",
                        }}
                      >
                        <div className="rounded-2xl border border-[#6A11CB] overflow-hidden h-full">
                          <div className="flex justify-between -mx-4 px-8 py-1 md:px-8 md:py-1 sm:px-4 sm:py-8 bg-gradient-to-b from-[#667EEA] to-[#764BA2] rounded-lg items-center">
                            <div className="flex items-center">
                              <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-2">
                                <span className="text-indigo-700 font-medium">
                                  {card?.companyIdentifier &&
                                    card.companyIdentifier
                                      .replace(/^(X:|C:)/, "")
                                      .slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <span className="text-white font-bold">
                                    {card.companyIdentifier || ""}
                                  </span>
                                  <span className="ml-1 sm:ml-2 text-xs font-medium font-gilroy px-1 sm:px-2 py-0 bg-[#D6E5FF] text-[#2575FC] rounded-full">
                                    {timeIntervalDisplay}
                                  </span>
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {card.company_label || ""}
                                </div>
                              </div>
                            </div>
                            <div className="text-right mb-1">
                              <div className="text-white text-sm mx-2 font-medium font-gilroy">
                                {socket?.price || card?.close
                                  ? card.contract_type === "Indian_Equity"
                                    ? `₹${socket?.price || card?.close}`
                                    : `$${socket?.price || card?.close}`
                                  : null}
                              </div>
                              <div
                                className={`${
                                  percentageChange < 0
                                    ? " bg-[#FFCDCD] text-[#AB0505]"
                                    : percentageChange > 0
                                    ? "bg-[#CDFFCD] text-[#0C780C]"
                                    : "text-gray-400"
                                } text-xs px-1 py-0 font-gilroy font-medium rounded-full inline-block mx-1 mt-0`}
                              >
                                ({percentageChange}%)
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3">
                            <div className="text-xs bg-[#1A1625] font-regular xl:w-1/3 2xl:w-1/3 lg:w-1/2 md:w-1/2 w-1/2  text-center font-gilroy p-1 rounded-full text-white-2">
                              {formatRelativeTime(card.timestamp) || ""}
                            </div>
                            <div
                              className={`${
                                [
                                  "text-[#91BAFF]",
                                  "text-[#DA91FF]",
                                  "text-[#FDFF75]",
                                ][index % 3]
                              } font-semibold xl:text-md 2xl:text-md md:text-sm lg:text-sm mb-2 mt-2 capitalize`}
                            >
                              {card?.key
                                ? card.key.replace(/_/g, " ")
                                : "Signal"}{" "}
                              Detected
                            </div>
                            {card?.movement < 0 ? (
                              <div
                                className="action-text-tooltip-trigger max-h-8 min-h-8 text-[#FCFCFC] bg-[#DA5454] font-gilroy font-medium border border-[#323232] rounded-full py-0.5 px-2.5 text-xs mb-4 cursor-pointer truncate-action-text"
                                ref={actionTextRefs.current[index]}
                                onClick={(e) =>
                                  handleActionTextHover(
                                    e,
                                    card.suggested_action_text,
                                    index
                                  )
                                }
                                onMouseEnter={(e) =>
                                  handleActionTextHover(
                                    e,
                                    card.suggested_action_text,
                                    index
                                  )
                                }
                                onMouseLeave={() =>
                                  setTooltipState({
                                    visible: false,
                                    text: "",
                                    x: 0,
                                    y: 0,
                                  })
                                }
                              >
                                {card.suggested_action_text}
                              </div>
                            ) : (
                              <div
                                className="max-h-8 min-h-8 action-text-tooltip-trigger text-[#FCFCFC] bg-[#1BA71B] font-gilroy border border-[#323232] rounded-full py-0.5 px-2 font-medium text-xs mb-4 cursor-pointer truncate-action-text"
                                ref={actionTextRefs.current[index]}
                                onClick={(e) =>
                                  handleActionTextHover(
                                    e,
                                    card.suggested_action_text,
                                    index
                                  )
                                }
                                onMouseEnter={(e) =>
                                  handleActionTextHover(
                                    e,
                                    card.suggested_action_text,
                                    index
                                  )
                                }
                                onMouseLeave={() =>
                                  setTooltipState({
                                    visible: false,
                                    text: "",
                                    x: 0,
                                    y: 0,
                                  })
                                }
                              >
                                {card.suggested_action_text}
                              </div>
                            )}
                            <div className="flex space-x-8 py-2">
                              <button
                                className="flex items-center bg-[#5844B0] px-3 py-0.5 font-gilroy font-medium rounded text-white text-sm"
                                onClick={() =>
                                  setTradingViewChartData((prev) => ({
                                    ...prev,
                                    showModal: true,
                                    symbol: card.companyIdentifier.replace(
                                      /^(X:|C:)/,
                                      ""
                                    ),
                                    category: card.contract_type,
                                  }))
                                }
                              >
                                <Eye size={16} className="mr-1" /> View Chart
                              </button>
                              {card?.movement > 0 ? (
                                <button
                                  className="flex items-center bg-[#BAFFBA] lg:px-3 lg:py-1 md:px-3 md:py-1 xl:px-3 xl:py-1 
                    2xl:px-3 2xl:py-1 px:3 py-1  font-gilroy font-medium rounded text-[#006B00] text-sm"
                                >
                                  <TrendingUp size={16} className="mr-1" />{" "}
                                  Bullish
                                </button>
                              ) : (
                                <button
                                  className="flex items-center bg-[#FFD4D4] lg:px-3 lg:py-1 md:px-3 md:py-1 xl:px-3 xl:py-1 
                    2xl:px-3 2xl:py-1 px:3 py-1  font-gilroy font-medium rounded text-[#AB0505] text-sm"
                                >
                                  <TrendingDown size={16} className="mr-1" />{" "}
                                  Bearish
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : signals?.data?.length === 0 ? (
                <div
                  className="flex flex-nowrap"
                  style={{ gap: `${cardGap}%` }}
                >
                  {renderSkeletonCards()}
                </div>
              ) : (
                <div className="text-center text-white py-4">
                  No signals available at the moment
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation(1)}
              className={`flex-none w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7a5af8] to-[#6A11CB] hover:from-[#8a6aff] hover:to-[#7922da] text-white shadow-lg transition-all duration-300 border border-[#9867FF] mx-2 z-20 ${
                !signals?.data?.length || currentIndex >= maxIndex
                  ? "opacity-60 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              aria-label="Next"
              disabled={!signals?.data?.length || currentIndex >= maxIndex}
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>

          {signals?.data?.length > cardsToShow && (
            <div className="flex justify-center mt-4">
              {getNavigationDots().map((dot, idx) => (
                <div
                  key={`dot-${idx}`}
                  onClick={() => handleDotClick(dot.index)}
                  className={`w-2 h-2 mx-1 rounded-full cursor-pointer transition-all duration-300 ${
                    dot.active ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          )}

          {tradingViewChartData.showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center font-gilroy font-semibold z-10">
              <div className="relative w-full max-w-4xl shadow-[0_0_0_2px_#AD4AFF,0_0_0_4px_#2575FC] rounded-2xl bg-[#6C4984] bg-gradient-to-b from-[#6C4984] to-[#220C39] text-white">
                <h1 className="text-center pt-4">Chart View</h1>
                <button
                  onClick={() =>
                    setTradingViewChartData({
                      showModal: false,
                      symbol: "",
                      category: "",
                    })
                  }
                  className="absolute w-8 top-4 right-4"
                >
                  <img src={closeModalIcon} alt="close" loading="lazy" />
                </button>
                <div className="px-2 mt-4 mb-4 overflow-x-auto">
                  <div className="md:min-w-full">
                    {tradingViewChartData.category === MARKETS[0].value ? (
                      <CandlestickChart
                        identifier={tradingViewChartData.symbol}
                        interval={"10m"}
                      />
                    ) : (
                      <TradingViewChart symbol={tradingViewChartData.symbol} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tooltipState.visible && (
            <div
              className="fixed bg-gray-900 text-white p-3 rounded-lg shadow-lg z-50 max-w-xs text-sm"
              style={{
                left: tooltipState.x + "px",
                top: tooltipState.y + "px",
                transform: "translateX(-50%)",
              }}
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900"></div>
              {tooltipState.text}
            </div>
          )}
        </div>
        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* Improved truncate-action-text styling */
          .truncate-action-text {
            display: -webkit-box;
            -webkit-line-clamp: 2; /* Show 2 lines */
            -webkit-box-orient: vertical;
            overflow: hidden;
            position: relative;
            max-height: 4.8em;
            line-height: 1.2;
            width: 100%;
            text-overflow: ellipsis;
            word-break: break-word;
          }

          /* Remove the previous ::after and ::before pseudo-elements that were causing issues */
          .truncate-action-text[data-overflow="true"]::after {
            content: "...";
            position: absolute;
            bottom: 0;
            right: 0;
            background: inherit;
            padding-left: 4px;
          }

          /* Fix for red background alerts */
          .bg-[#DA5454].truncate-action-text[data-overflow="true"]::after {
            background-color: #da5454;
          }

          /* Fix for green background alerts */
          .bg-[#1BA71B].truncate-action-text[data-overflow="true"]::after {
            background-color: #1ba71b;
          }

          /* Add a proper fade effect to long text in different colored containers */
          .bg-[#DA5454].truncate-action-text[data-overflow="true"] {
            mask-image: linear-gradient(to right, black 85%, transparent 100%);
          }

          .bg-[#1BA71B].truncate-action-text[data-overflow="true"] {
            mask-image: linear-gradient(to right, black 85%, transparent 100%);
          }
        `}</style>
      </div>
    </>
  );
};

export default memo(WatchlistSignal);
