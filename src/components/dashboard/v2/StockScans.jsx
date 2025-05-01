/* import { Activity, Layers, TrendingDown, TrendingUp, Eye } from "lucide-react";
import React, { memo, useCallback, useState, useRef, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../../utils/axiosHelper";
import StockScanModal from "../../modal/StockScanModal";
import { DASHBOARD } from "../../../utils/constants";
import { toastStyles } from "../../../utils";

const ITEMS_PER_PAGE = 6;

const StockScans = memo(({ stockScansData }) => {
  // State management with React 18 patterns
  const [detailsData, setDetailsData] = useState({
    loading: true,
    data: null,
  });
  const [item, setItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contractType, setContractType] = useState("");
  const [timeFrequency, setTimeFrequency] = useState("");
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const sliderRef = useRef(null);

  // Memoize filtered data to prevent unnecessary re-renders
  const filteredData = useMemo(() => {
    if (!stockScansData?.data) return [];
    return stockScansData.data.filter((item) => item.count > 0);
  }, [stockScansData]);

  // Calculate grouped items and total pages once using useMemo
  const { groupedItems, totalPages } = useMemo(() => {
    const totalItems = filteredData.length;
    const groups = [];

    if (totalItems > 0) {
      const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE);
      for (let i = 0; i < pageCount; i++) {
        const startIndex = i * ITEMS_PER_PAGE;
        const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
        groups.push(filteredData.slice(startIndex, endIndex));
      }
    }

    return { groupedItems: groups, totalPages: groups.length };
  }, [filteredData]);

  // API call with useCallback to prevent recreation on each render
  const fetchStockScanCounts = useCallback(
    async ({ item, page, contract_type, time_interval }) => {
      setDetailsData((prev) => ({ ...prev, loading: true }));

      try {
        const filter = {
          ...(contract_type && { contract_type }),
          ...(time_interval && { time_interval }),
        };

        const response = await axiosInstance.get(`/user/stock-scan`, {
          params: {
            queryData: JSON.stringify([item]),
            loopbackPeriod: DASHBOARD.STOCK_SCAN_LOOKBACK_PERIOD,
            ...(Object.keys(filter).length > 0 && { filter }),
            page,
          },
        });

        setDetailsData({
          loading: false,
          data: response.results[0],
        });
      } catch (error) {
        console.error("Error fetching stock scan counts:", error);
        setDetailsData({
          loading: false,
          data: null,
        });
        toast.error("Failed to load stock scan details.", toastStyles);
      }
    },
    []
  );

  // Modal handlers with useCallback
  const handleClose = useCallback(() => {
    setModalOpen(false);
    setDetailsData({ loading: true, data: null });
    setItem(null);
  }, []);

  const handleScanClick = useCallback(
    (selectedItem, e) => {
      e?.stopPropagation();

      if (selectedItem?.count > 0) {
        setItem(selectedItem);
        fetchStockScanCounts({ item: selectedItem, page: 1 });
        setModalOpen(true);
      } else {
        toast.error(
          "Please select a stock scan item with a count greater than 0.",
          toastStyles
        );
      }
    },
    [fetchStockScanCounts]
  );

  const handleCallback = useCallback(
    (params) => {
      if (item) {
        fetchStockScanCounts({ item, ...params });
      }
    },
    [fetchStockScanCounts, item]
  );

  // Utility functions
  const getIconColor = useCallback((movement) => {
    if (movement > 0) return "#0FD44C";
    if (movement < 0) return "#FF336D";
    return "#F2994A";
  }, []);

  const getNavigationDots = useCallback(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => ({
        index: i,
        active: i === activeDotIndex,
      }));
    } else {
      return [
        { index: 0, active: activeDotIndex === 0 },
        { index: Math.floor(totalPages / 2), active: activeDotIndex === 1 },
        { index: totalPages - 1, active: activeDotIndex === 2 },
      ];
    }
  }, [totalPages, activeDotIndex]);

  const handleDotClick = useCallback((index) => {
    sliderRef.current?.slickGoTo(index);
  }, []);

  // Slider settings as a memoized value
  const sliderSettings = useMemo(
    () => ({
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: filteredData.length > ITEMS_PER_PAGE,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      beforeChange: (_, next) => {
        if (totalPages <= 3) {
          setActiveDotIndex(next);
        } else {
          if (next === 0) {
            setActiveDotIndex(0);
          } else if (next === totalPages - 1) {
            setActiveDotIndex(2);
          } else {
            setActiveDotIndex(1);
          }
        }
      },
    }),
    [filteredData.length, totalPages]
  );

  // Empty state
  if (filteredData.length === 0) {
    return (
      <section className="px-4 py-4 bg-transparent border border-[#FFFFFF73] rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="flex items-center gap-3 max-w-max text-white py-1 px-4 text-lg font-medium font-gilroy bg-transparent border border-[#FFFFFF73] rounded-3xl button_blur">
            <Layers color="#5ECCFF" />
            Stock Scan
          </h1>
        </div>
        <div className="text-center py-6 text-white">
          No stock scan data available
        </div>
      </section>
    );
  }

  // Render component
  return (
    <section className="px-4 py-4 bg-transparent border border-[#FFFFFF73] rounded-xl">
      <Toaster />

      <div className="flex items-center justify-between mb-6">
        <h1 className="flex items-center gap-3 max-w-max text-white py-1 px-4 text-lg font-medium font-gilroy bg-transparent border border-[#FFFFFF73] rounded-3xl button_blur">
          <Layers color="#5ECCFF" />
          Stock Scan
        </h1>
      </div>

      <div className="relative px-1 mb-2">
        <Slider ref={sliderRef} {...sliderSettings}>
          {groupedItems.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="px-1">
              {group.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.map((scanItem) => (
                    <div
                      key={`scan-${scanItem.id || scanItem.label}`}
                      className="bg-gradient-to-b from-[#1C0D26] to-[#4A0A75] border border-[#6A11CB] rounded-xl p-4 relative"
                    >
                      <div className="mb-2">
                        {scanItem.movement > 0 ? (
                          <TrendingUp
                            color={getIconColor(scanItem.movement)}
                            size={24}
                          />
                        ) : scanItem.movement < 0 ? (
                          <TrendingDown
                            color={getIconColor(scanItem.movement)}
                            size={24}
                          />
                        ) : (
                          <Activity
                            color={getIconColor(scanItem.movement)}
                            size={24}
                          />
                        )}
                      </div>

                      <h3 className="text-white font-bold font-gilroy text-lg mb-1">
                        {scanItem.label}
                      </h3>

                      <p className="text-white font-regular font-gilroy text-sm mb-4 opacity-80">
                        {scanItem.description}
                      </p>

                      <div className="flex justify-between items-center mt-6">
                        <p className="text-white font-regular font-gilroy">
                          <span className="font-bold text-md font-gilroy font-regular">
                            {scanItem.count}
                          </span>{" "}
                          <span>stocks</span>
                        </p>

                        <button
                          onClick={(e) => handleScanClick(scanItem, e)}
                          className="flex items-center justify-center bg-[#5844B0] text-white font-gilroy font-regular px-4 py-1 rounded-lg"
                          aria-label={`View ${scanItem.label}`}
                        >
                          <Eye size={16} className="mr-2" /> View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center">
                  <p className="text-white opacity-50">No more items</p>
                </div>
              )}
            </div>
          ))}
        </Slider>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {getNavigationDots().map((dot, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => handleDotClick(dot.index)}
                className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
                  dot.active ? "bg-white" : "bg-gray-600"
                }`}
                aria-label={`Go to page ${dot.index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <StockScanModal
          detailsData={detailsData}
          onClose={handleClose}
          handleCallback={handleCallback}
          contractType={contractType}
          setContractType={setContractType}
          timeFrequency={timeFrequency}
          setTimeFrequency={setTimeFrequency}
        />
      )}
    </section>
  );
});

StockScans.displayName = "StockScans";

export default StockScans;
 */
import {
  Activity,
  Layers,
  TrendingDown,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, {
  memo,
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../utils/axiosHelper";
import StockScanModal from "../../modal/StockScanModal";
import { DASHBOARD } from "../../../utils/constants";
import { toastStyles } from "../../../utils";

const StockScans = memo(({ stockScansData }) => {
  const [detailsData, setDetailsData] = useState({
    loading: true,
    data: null,
  });
  const [item, setItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contractType, setContractType] = useState("");
  const [timeFrequency, setTimeFrequency] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef(null);

  const filteredData = useMemo(() => {
    if (!stockScansData?.data) return [];
    return stockScansData.data.filter((item) => item.count > 0);
  }, [stockScansData]);

  const paginatedData = useMemo(() => {
    const desktopPages = [];
    for (let i = 0; i < filteredData.length; i += 6) {
      desktopPages.push(filteredData.slice(i, i + 6));
    }

    const mobilePages = filteredData.map((item) => [item]);

    return {
      desktop: desktopPages,
      mobile: mobilePages,
    };
  }, [filteredData]);

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  }, [isMobileView]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const pages = isMobileView ? paginatedData.mobile : paginatedData.desktop;
    if (pages.length <= 1) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const newPage = Math.max(
        0,
        Math.min(pages.length - 1, currentPage + direction)
      );

      if (newPage !== currentPage) {
        setCurrentPage(newPage);
        container.scrollTo({
          left: newPage * container.clientWidth,
          behavior: "smooth",
        });
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentPage, paginatedData, isMobileView]);

  const fetchStockScanCounts = useCallback(
    async ({ item, page, contract_type, time_interval }) => {
      setDetailsData((prev) => ({ ...prev, loading: true }));

      try {
        const filter = {
          ...(contract_type && { contract_type }),
          ...(time_interval && { time_interval }),
        };

        const response = await axiosInstance.get(`/user/stock-scan`, {
          params: {
            queryData: JSON.stringify([item]),
            loopbackPeriod: DASHBOARD.STOCK_SCAN_LOOKBACK_PERIOD,
            ...(Object.keys(filter).length > 0 && { filter }),
            page,
          },
        });

        setDetailsData({
          loading: false,
          data: response.results[0],
        });
      } catch (error) {
        console.error("Error fetching stock scan counts:", error);
        setDetailsData({
          loading: false,
          data: null,
        });
        toast.error("Failed to load stock scan details.", toastStyles);
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    setModalOpen(false);
    setDetailsData({ loading: true, data: null });
    setItem(null);
  }, []);

  const handleScanClick = useCallback(
    (selectedItem, e) => {
      e?.stopPropagation();

      if (selectedItem?.count > 0) {
        setItem(selectedItem);
        fetchStockScanCounts({ item: selectedItem, page: 1 });
        setModalOpen(true);
      } else {
        toast.error(
          "Please select a stock scan item with a count greater than 0.",
          toastStyles
        );
      }
    },
    [fetchStockScanCounts]
  );

  const handleCallback = useCallback(
    (params) => {
      if (item) {
        fetchStockScanCounts({ item, ...params });
      }
    },
    [fetchStockScanCounts, item]
  );

  const goToPage = useCallback(
    (index) => {
      const pages = isMobileView ? paginatedData.mobile : paginatedData.desktop;
      if (index < 0 || index >= pages.length) return;

      setCurrentPage(index);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: index * scrollContainerRef.current.clientWidth,
          behavior: "smooth",
        });
      }
    },
    [paginatedData, isMobileView]
  );

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const goToPrevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const getIconColor = useCallback((movement) => {
    if (movement > 0) return "#0FD44C";
    if (movement < 0) return "#FF336D";
    return "#F2994A";
  }, []);

  const renderCard = useCallback(
    (scanItem) => {
      return (
        <div className="bg-gradient-to-b from-[#1C0D26] to-[#4A0A75] border border-[#6A11CB] rounded-xl p-4 relative h-48 flex flex-col">
          <div className="mb-2">
            {scanItem.movement > 0 ? (
              <TrendingUp color={getIconColor(scanItem.movement)} size={24} />
            ) : scanItem.movement < 0 ? (
              <TrendingDown color={getIconColor(scanItem.movement)} size={24} />
            ) : (
              <Activity color={getIconColor(scanItem.movement)} size={24} />
            )}
          </div>
  
          <h3 className="text-white font-bold font-gilroy text-lg mb-1">
            {scanItem.label}
          </h3>
  
          <p className="text-white font-regular font-gilroy text-sm mb-4 opacity-80 overflow-y-auto flex-grow">
            {scanItem.description}
          </p>
  
          <div className="flex justify-between items-center mt-auto">
            <p className="text-white font-regular font-gilroy">
              <span className="font-bold text-md font-gilroy font-regular">
                {scanItem.count}
              </span>{" "}
              <span>stocks</span>
            </p>
  
            <button
              onClick={(e) => handleScanClick(scanItem, e)}
              className="flex items-center justify-center bg-[#5844B0] text-white font-gilroy font-regular px-4 py-1 rounded-lg"
              aria-label={`View ${scanItem.label}`}
            >
              <Eye size={16} className="mr-2" /> View
            </button>
          </div>
        </div>
      );
    },
    [getIconColor, handleScanClick]
  );

  if (filteredData.length === 0) {
    return (
      <section className="px-4 py-4 bg-transparent border border-[#FFFFFF73] rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="flex items-center gap-3 max-w-max text-white py-1 px-4 text-lg font-medium font-gilroy bg-transparent border border-[#FFFFFF73] rounded-3xl button_blur">
            <Layers color="#5ECCFF" />
            Stock Scan
          </h1>
        </div>
        <div className="text-center py-6 text-white">
          No stock scan data available
        </div>
      </section>
    );
  }

  const pages = isMobileView ? paginatedData.mobile : paginatedData.desktop;

  const getDotIndicesToShow = () => {
    if (pages.length <= 3) {
      return Array.from({ length: pages.length }, (_, i) => i);
    }

    if (currentPage === 0) {
      return [0, 1, 2];
    } else if (currentPage === pages.length - 1) {
      return [pages.length - 3, pages.length - 2, pages.length - 1];
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  return (
    <section className="px-4 py-4 bg-transparent border border-[#FFFFFF73] rounded-xl">
      <Toaster />

      <div className="flex items-center justify-between mb-6">
        <h1 className="flex items-center gap-3 max-w-max text-white py-1 px-4 text-lg font-medium font-gilroy bg-transparent border border-[#FFFFFF73] rounded-3xl button_blur">
          <Layers color="#5ECCFF" />
          Stock Scan
        </h1>
      </div>

      {/* Navigation Container with Arrows Outside */}
      <div className="flex items-center justify-center space-x-4">
        {/* Left Arrow */}
        <button
          onClick={goToPrevPage}
          className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7a5af8] to-[#6A11CB] hover:from-[#8a6aff] hover:to-[#7922da] text-white shadow-lg transition-all duration-300 border border-[#9867FF] ${
            currentPage === 0
              ? "opacity-60 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          aria-label="Previous page"
          disabled={currentPage === 0}
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        {/* Content Area */}
        <div className="flex-grow max-w-[calc(100%-5rem)]">
          <div
            ref={scrollContainerRef}
            className="overflow-x-hidden pb-4 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex">
              {pages.map((page, pageIndex) => (
                <div
                  key={`page-${pageIndex}`}
                  className="flex-shrink-0 w-full snap-center"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div
                    className={`grid gap-4 ${
                      isMobileView
                        ? "grid-cols-1"
                        : "lg:grid-cols-3 lg:grid-rows-2 xl:grid-cols-3 xl:grid-rows-2 2xl:grid-cols-3 2xl:grid-rows-2 md:grid-cols-2 md:grid-rows-2 grid-cols-1"
                    }`}
                  >
                    {page.map((scanItem, index) => (
                      <div key={`card-${scanItem.id || scanItem.label}-${index}`}>
                        {renderCard(scanItem)}
                      </div>
                    ))}
                    {!isMobileView &&
                      Array.from({ length: 6 - page.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="invisible" />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNextPage}
          className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#7a5af8] to-[#6A11CB] hover:from-[#8a6aff] hover:to-[#7922da] text-white shadow-lg transition-all duration-300 border border-[#9867FF] ${
            currentPage === pages.length - 1
              ? "opacity-60 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          aria-label="Next page"
          disabled={currentPage === pages.length - 1}
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>
      
      {/* Pagination Dots */}
      {pages.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {getDotIndicesToShow().map((dotIndex) => (
            <button
              key={`page-dot-${dotIndex}`}
              onClick={() => goToPage(dotIndex)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                dotIndex === currentPage
                  ? "bg-white opacity-100"
                  : "bg-gray-600 opacity-60"
              }`}
              aria-label={`Go to page ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <StockScanModal
          detailsData={detailsData}
          onClose={handleClose}
          handleCallback={handleCallback}
          contractType={contractType}
          setContractType={setContractType}
          timeFrequency={timeFrequency}
          setTimeFrequency={setTimeFrequency}
          scanLabel={item?.label}
        />
      )}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
});

StockScans.displayName = "StockScans";

export default StockScans;