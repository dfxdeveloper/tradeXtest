import React, { useState, useEffect, useRef } from 'react';

const TradingViewWidget = () => {
  const containerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const tradingViewScript = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";

    if (!containerRef.current) return;

    // Prevent duplicate script injection
    const existingScript = document.querySelector(`script[src="${tradingViewScript}"]`);
    if (existingScript) {
      /* console.log("TradingView widget script already loaded."); */
      return;
    }

    try {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = tradingViewScript;
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
          { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
          { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
        hide_logo: true,
      });

      script.onload = () => console.log("TradingView widget loaded successfully.");
      script.onerror = () => {
        setHasError(true);
      };
      containerRef.current.appendChild(script);
    } catch (err) {
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return null;
  }

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewWidget;
