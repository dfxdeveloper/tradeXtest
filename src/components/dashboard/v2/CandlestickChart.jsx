import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import axiosInstance from "../../../utils/axiosHelper";

const CandlestickChart = ({ identifier, interval }) => {
  const [loading, setLoading] = useState(true);
  const [candlesData, setCandlesData] = useState(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchData = async ({ identifier, interval, signal }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("kite/historical-data", {
        params: {
          identifier,
          interval,
        },
        ...(signal && { signal }),
      });

      const processedData = [];
      let index = 0;

      if (response && response.length > 0) {
        response.forEach((candle) => {
          processedData.push({
            x: index.toString(),
            realDate: new Date(candle[0]),
            y: [candle[1], candle[2], candle[3], candle[4]],
            volume: candle[5] || 0,
          });
          index += 1;
        });
      }

      setLoading(false);
      setCandlesData(processedData);

      if (processedData.length > 50) {
        setVisibleRange({
          start: Math.max(0, processedData.length - 50),
          end: processedData.length,
        });
      } else {
        setVisibleRange({ start: 0, end: processedData.length });
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        setLoading(false);
        setCandlesData([]);
      }
    }
  };

  useEffect(() => {
    if (identifier && interval) {
      const abortController = new AbortController();
      fetchData({ identifier, interval, signal: abortController.signal });
      return () => abortController.abort();
    }
  }, [identifier, interval]);

  const formatXAxisLabel = (value, candlesData) => {
    if (!candlesData || !candlesData.length) return "";

    const dataPoint = candlesData.find((d) => d.x === value);
    if (!dataPoint) return "";

    const date = dataPoint.realDate;

    if (interval.includes("m") || interval === "1h") {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (interval === "1D") {
      return new Date(date).toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }

    if (interval === "1W" || interval === "1M") {
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });

      if (day <= 7) {
        return month;
      }
    }

    return "";
  };

  const navigateChart = (direction) => {
    if (!candlesData || candlesData.length <= 0) return;

    const visibleCount = visibleRange.end - visibleRange.start;
    const moveBy = Math.max(5, Math.floor(visibleCount * 0.2)); // Move by 20% of visible candles or at least 5

    if (direction === "next" && visibleRange.end < candlesData.length) {
      const newStart = Math.min(
        visibleRange.start + moveBy,
        candlesData.length - visibleCount
      );
      const newEnd = Math.min(newStart + visibleCount, candlesData.length);
      setVisibleRange({
        start: newStart,
        end: newEnd,
      });
    } else if (direction === "prev" && visibleRange.start > 0) {
      const newStart = Math.max(0, visibleRange.start - moveBy);
      const newEnd = Math.min(newStart + visibleCount, candlesData.length);
      setVisibleRange({
        start: newStart,
        end: newEnd,
      });
    }
  };

  const zoomChart = (direction) => {
    if (!candlesData || candlesData.length <= 0) return;

    const currentRange = visibleRange.end - visibleRange.start;
    const center = Math.floor((visibleRange.start + visibleRange.end) / 2);

    let newRange;
    if (direction === "in") {
      newRange = Math.max(10, Math.floor(currentRange * 0.75));
      setZoomLevel(zoomLevel * 1.33);
    } else {
      newRange = Math.min(candlesData.length, Math.floor(currentRange * 1.33));
      setZoomLevel(Math.max(0.5, zoomLevel * 0.75));
    }

    const halfRange = Math.floor(newRange / 2);
    let newStart = Math.max(0, center - halfRange);
    let newEnd = Math.min(candlesData.length, center + halfRange);

    if (newEnd - newStart < newRange) {
      if (newStart === 0) {
        newEnd = Math.min(candlesData.length, newStart + newRange);
      } else if (newEnd === candlesData.length) {
        newStart = Math.max(0, newEnd - newRange);
      }
    }

    setVisibleRange({ start: newStart, end: newEnd });
  };

  const resetChart = () => {
    if (!candlesData || candlesData.length <= 0) return;

    if (candlesData.length > 50) {
      setVisibleRange({
        start: Math.max(0, candlesData.length - 50),
        end: candlesData.length,
      });
    } else {
      setVisibleRange({ start: 0, end: candlesData.length });
    }
    setZoomLevel(1);
  };

  const visibleCandlesData = useMemo(() => {
    if (!candlesData || !candlesData.length) return [];
    return candlesData.slice(visibleRange.start, visibleRange.end);
  }, [candlesData, visibleRange]);

  const options = useMemo(() => {
    if (!visibleCandlesData?.length) return {};

    const allPrices = visibleCandlesData.flatMap((d) => d.y);
    const minPrice = Math.min(...allPrices) * 0.99;
    const maxPrice = Math.max(...allPrices) * 1.01;

    return {
      chart: {
        type: "candlestick",
        height: 350,
        background: "#131722",
        toolbar: { show: false },
        animations: { enabled: true },
        events: {
          mounted: function (chart) {
            chartInstance.current = chart;
          },
        },
      },
      xaxis: {
        type: "category",
        categories: visibleCandlesData.map((d) => d.x),
        labels: {
          formatter: function (value) {
            return formatXAxisLabel(value, candlesData);
          },
          style: {
            colors: "#9CA3AF",
            fontSize: "10px",
          },
          rotateAlways: false,
          hideOverlappingLabels: true,
          trim: true,
          minHeight: 20,
        },
        tickAmount: Math.min(visibleCandlesData.length, 12),
        axisBorder: {
          show: true,
          color: "#363c4e",
        },
        // axisTicks: {
        //   show: false,
        // },
        crosshairs: {
          show: true,
          position: "back",
          stroke: {
            color: "#4B5563",
            width: 1,
            dashArray: 3,
          },
        },
        axisTicks: {
          height: 7,
          offsetY: 10,
        },
      },
      yaxis: {
        min: minPrice,
        max: maxPrice,
        forceNiceScale: true,
        labels: {
          formatter: function (value) {
            return value.toFixed(2);
          },
          style: {
            colors: "#9CA3AF",
            fontSize: "10px",
          },
          offsetX: -7,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        floating: false,
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#26A69A",
            downward: "#EF5350",
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#1E2634",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 10,
          bottom: 20,
          left: 10,
        },
      },
      tooltip: {
        theme: "dark",
        custom: ({ seriesIndex, dataPointIndex, w }) => {
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
          const date = dataPoint.realDate;

          let formattedDate;
          if (interval.includes("m") || interval === "1h") {
            formattedDate = new Date(date).toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          } else {
            formattedDate = new Date(date).toLocaleDateString([], {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          }

          const ohlc = dataPoint.y;
          const open = ohlc[0].toFixed(2);
          const high = ohlc[1].toFixed(2);
          const low = ohlc[2].toFixed(2);
          const close = ohlc[3].toFixed(2);

          const color = close >= open ? "#26A69A" : "#EF5350";

          return `
            <div class="apexcharts-tooltip-box" style="background: #131722; padding: 5px 10px; border: 1px solid #363c4e;">
              <div style="font-weight: bold; color: white; margin-bottom: 5px;">${formattedDate}</div>
              <div style="display: flex; justify-content: space-between; color: #9CA3AF;">
                <span>O</span><span style="color: ${color}; font-weight: bold;">${open}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #9CA3AF;">
                <span>H</span><span style="color: ${color}; font-weight: bold;">${high}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #9CA3AF;">
                <span>L</span><span style="color: ${color}; font-weight: bold;">${low}</span>
              </div>
              <div style="display: flex; justify-content: space-between; color: #9CA3AF;">
                <span>C</span><span style="color: ${color}; font-weight: bold;">${close}</span>
              </div>
            </div>
          `;
        },
      },
      annotations: {
        position: "front",
        yaxis: [
          {
            y:
              visibleCandlesData.length > 0
                ? visibleCandlesData[visibleCandlesData.length - 1].y[3]
                : 0,
            borderColor: "#4B5563",
            borderWidth: 1,
            strokeDashArray: 2,
            label: {
              text:
                visibleCandlesData.length > 0
                  ? visibleCandlesData[
                      visibleCandlesData.length - 1
                    ].y[3].toFixed(2)
                  : "",
              position: "right",
              offsetX: 5,
              style: {
                background: "#131722",
                color: "#9CA3AF",
                fontSize: "10px",
                fontWeight: "normal",
                padding: {
                  left: 5,
                  right: 5,
                  top: 0,
                  bottom: 0,
                },
              },
            },
          },
        ],
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              height: 300,
            },
          },
        },
      ],
    };
  }, [visibleCandlesData, interval, candlesData]);

  const series = useMemo(() => {
    if (!visibleCandlesData?.length) return [];
    return [
      {
        name: "Price",
        data: visibleCandlesData,
      },
    ];
  }, [visibleCandlesData]);

  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (diff > 50) {
      navigateChart("prev");
    } else if (diff < -50) {
      navigateChart("next");
    }

    touchStart.current = null;
  };

  const ChartControls = () => {
    const canGoOlder = visibleRange.start > 0;
    const canGoNewer = candlesData && visibleRange.end < candlesData.length;

    const buttonStyle = {
      background: "#2A2E39",
      color: "#9CA3AF",
      border: "none",
      width: "28px",
      height: "28px",
      borderRadius: "4px",
      margin: "0 3px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background 0.2s",
      padding: "0",
    };

    const disabledButtonStyle = {
      ...buttonStyle,
      background: "#1E2330",
      color: "#4A5568",
      cursor: "not-allowed",
    };

    return (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
          background: "rgba(19, 23, 34, 0.7)",
          padding: "3px 5px",
          borderRadius: "4px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        <button
          onClick={() => zoomChart("out")}
          style={buttonStyle}
          title="Zoom Out"
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>−</span>
        </button>
        <button
          onClick={() => zoomChart("in")}
          style={buttonStyle}
          title="Zoom In"
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
        </button>
        <button
          onClick={() => navigateChart("prev")}
          disabled={!canGoOlder}
          style={canGoOlder ? buttonStyle : disabledButtonStyle}
          title="Scroll Left"
        >
          <span style={{ fontSize: "14px", lineHeight: 1 }}>&lt;</span>
        </button>
        <button
          onClick={() => navigateChart("next")}
          disabled={!canGoNewer}
          style={canGoNewer ? buttonStyle : disabledButtonStyle}
          title="Scroll Right"
        >
          <span style={{ fontSize: "14px", lineHeight: 1 }}>&gt;</span>
        </button>
        <button onClick={resetChart} style={buttonStyle} title="Reset View">
          <span
            style={{
              fontSize: "14px",
              transform: "rotate(45deg)",
              display: "inline-block",
            }}
          >
            ↻
          </span>
        </button>
      </div>
    );
  };

  if (loading || candlesData === null || !candlesData?.length)
    return (
      <div
        className="loading-chart"
        style={{
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
        }}
      >
        Loading chart...
      </div>
    );

  if (!loading && Array.isArray(candlesData) && candlesData.length === 0)
    return (
      <div
        className="no-data-chart"
        style={{
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
        }}
      >
        No data available
      </div>
    );

  return (
    <div
      className="tradingview-chart-container"
      style={{
        background: "#131722",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={chartRef}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
        key={`${identifier}-${interval}-${visibleRange.start}-${visibleRange.end}-${zoomLevel}`}
      />
      <ChartControls />
    </div>
  );
};

export default CandlestickChart;
