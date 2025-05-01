import React, { useEffect, useRef } from "react";

const TradingViewChart = ({
  symbol = "",
  interval = "1D",
  timezone = "Asia/Kolkata",
}) => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    // Clean up any existing widget
    if (widgetRef.current) {
      try {
        widgetRef.current.remove();
        widgetRef.current = null;
      } catch (e) {
        console.error("Error removing widget:", e);
      }
    }

    // Make sure the TradingView widget library is loaded
    if (!document.getElementById("tradingview-widget-script")) {
      scriptRef.current = document.createElement("script");
      scriptRef.current.id = "tradingview-widget-script";
      scriptRef.current.src = "https://s3.tradingview.com/tv.js";
      scriptRef.current.async = true;
      document.head.appendChild(scriptRef.current);

      scriptRef.current.onload = () => {
        createWidget();
      };
    } else {
      createWidget();
    }

    function createWidget() {
      if (!window.TradingView || !containerRef.current) return;
      widgetRef.current = new window.TradingView.widget({
        container_id: containerRef.current.id,
        width: "100%",
        height: 350,
        symbol: symbol,
        interval: interval === "1h" ? "60" : interval,
        timezone: timezone,
        theme: "dark",
        style: "1", // Candlestick style
        locale: "en",
        toolbar_bg: "#1E222D",

        // Disable interactive features
        hide_top_toolbar: true,
        hide_side_toolbar: true,
        allow_symbol_change: false,
        hide_legend: false,
        save_image: false,

        // Disable features that allow modification
        disabled_features: [
          "header_symbol_search",
          "header_resolutions",
          "header_chart_type",
          "header_settings",
          "header_indicators",
          "header_compare",
          "header_undo_redo",
          "header_screenshot",
          "header_saveload",
          "left_toolbar",
          "control_bar",
          "timeframes_toolbar",
          "use_localstorage_for_settings",
          "context_menus",
          "edit_buttons_in_legend",
          "border_around_the_chart",
          "main_series_scale_menu",
          "symbol_search_hot_key",
          "show_chart_property_page",
          "property_pages",
          "symbol_info",
          "chart_crosshair_menu",
          "create_volume_indicator_by_default",
          "volume_force_overlay",
          "go_to_date",
          "adaptive_logo",
          "popup_hints",
          "header_exchange",
          "currency_selector",
          "pricescale_currency",
        ],

        // Add studies (optional)
        // studies: ["MASimple@tv-basicstudies"],

        // Chart styling
        overrides: {
          "mainSeriesProperties.candleStyle.upColor": "#26A69A",
          "mainSeriesProperties.candleStyle.downColor": "#EF5350",
          "mainSeriesProperties.candleStyle.wickUpColor": "#26A69A",
          "mainSeriesProperties.candleStyle.wickDownColor": "#EF5350",
          "paneProperties.background": "#131722",
          "paneProperties.vertGridProperties.color": "#1E2030",
          "paneProperties.horzGridProperties.color": "#1E2030",
        },
      });
    }

    // Clean up on unmount
    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
          widgetRef.current = null;
        } catch (e) {
          console.error("Error cleaning up widget:", e);
        }
      }
    };
  }, [symbol, interval, timezone]);

  return (
    <div className="tradingview-chart-container">
      <div id="tradingview-widget" ref={containerRef}></div>
    </div>
  );
};

export default TradingViewChart;
