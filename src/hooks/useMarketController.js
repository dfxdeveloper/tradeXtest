import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSocket } from "../components/context/socket";
import axiosInstance from "../utils/axiosHelper";

export default function useMarketController(originalMarkets) {
  const { subscribeToMarket, marketData } = useSocket();
  const [usData, setUsData] = useState([]);
  const previousUSMarketsRef = useRef([]);

  const fetchUsData = async (symbols) => {
    try {
      const { stocks } = await axiosInstance.get(`user/stocks`, {
        params: {
          market: "us",
          stocks: symbols.join(","),
        },
      });
      setUsData(stocks);
    } catch (error) {
      console.error("Error fetching US market data:", error);
    }
  };

  useLayoutEffect(() => {
    if (originalMarkets?.us?.length) {
      const uniqueUSMarkets = Array.from(new Set(originalMarkets.us));
      const previousUSMarkets = previousUSMarketsRef.current;

      if (
        uniqueUSMarkets.length !== previousUSMarkets.length ||
        !uniqueUSMarkets.every((val, idx) => val === previousUSMarkets[idx])
      ) {
        previousUSMarketsRef.current = uniqueUSMarkets;
        fetchUsData(uniqueUSMarkets);
      }
    }
  }, [originalMarkets?.us]);

  useEffect(() => {
    if (
      originalMarkets &&
      typeof originalMarkets === "object" &&
      !Array.isArray(originalMarkets)
    ) {
      const unsubscribers = [];
      Object.entries(originalMarkets).forEach(([market, symbols]) => {
        const unsub = subscribeToMarket(market, symbols, usData);
        if (unsub) unsubscribers.push(unsub);
      });
      return () => unsubscribers.forEach((unsub) => unsub());
    }
  }, [originalMarkets, usData, subscribeToMarket]);

  const filteredData = useMemo(() => {
    const filtered = Object.entries(marketData).reduce(
      (acc, [market, data]) => {
        if (originalMarkets?.[market]) {
          acc[market] = Object.fromEntries(
            Object.entries(data).filter(([_, entry]) =>
              originalMarkets[market].includes(entry.identifier)
            )
          );
        }
        return acc;
      },
      {}
    );
    return filtered;
  }, [marketData, originalMarkets]);

  return { socketData: filteredData };
}
