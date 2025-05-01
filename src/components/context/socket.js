import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import io from "socket.io-client";
import { changeFormat } from "../../utils/socket";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3001";
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [marketData, setMarketData] = useState({});
  const symbolMappingsRef = useRef({});
 /*  const lastKnownValuesRef = useRef({}); */

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected");
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, []);

  const subscribeToMarket = useCallback(
    (market, originalSymbols, usData) => {
      if (!socket) return;

      const formatSymbols = changeFormat[market](originalSymbols);

      symbolMappingsRef.current[market] = {};
      formatSymbols.forEach((formattedSymbol, index) => {
        symbolMappingsRef.current[market][formattedSymbol] =
          originalSymbols[index];
      });

      socket.emit("subscribe_market", { market, symbols: formatSymbols });

      const handleTicks = (data) => {
        setMarketData((prev) => {
          const newData = { ...prev };
          if (data?.status_code) return prev;

          const updateMarketData = (id, price, absChange, percentage) => {
            const identifier = symbolMappingsRef.current[market]?.[id] || "";
            newData[market] = {
              ...newData[market],
              [id]: {
                id,
                price,
                absChange,
                percentage,
                identifier,
              },
            };
           /*  lastKnownValuesRef.current[market] = {
              ...lastKnownValuesRef.current[market],
              [id]: {
                id,
                price,
                absChange,
                percentage,
                identifier,
              },
            }; */
          };

          if (market === "indian") {
            const id = data.s;
            const price = parseFloat(data.p);
            const absChange = parseFloat(data.dd).toFixed(2);
            const percentage = parseFloat(data.dc).toFixed(2);
            updateMarketData(id, price, absChange, percentage);
          } else if (market === "us") {
            const id = data.s;
            const price = parseFloat(data.p.toFixed(4));
            const lcp = usData?.find((v) => v.code === id)?.close;
            const absChange = parseFloat(lcp ? price - lcp : 0).toFixed(2);
            const percentage = (lcp ? (absChange / lcp) * 100 : 0).toFixed(2);
            updateMarketData(id, price, absChange, percentage);
          } else if (market === "forexx") {
            const id = data.s;
            const price = parseFloat(data.a);
            const absChange = parseFloat(data.dd).toFixed(4);
            const percentage = parseFloat(data.dc).toFixed(2);
            updateMarketData(id, price, absChange, percentage);
          } else if (market === "crypto") {
            const id = data.s;
            const price = parseFloat(data.p);
            const absChange = parseFloat(data.dd).toFixed(2);
            const percentage = parseFloat(data.dc).toFixed(2);
            updateMarketData(id, price, absChange, percentage);
          }
          return newData;
        });
      };

      socket.on(`${market}_data`, handleTicks);

      return () => {
        socket.emit("unsubscribe_market", { market, symbols: formatSymbols });
        socket.off(`${market}_data`, handleTicks);
        delete symbolMappingsRef.current[market];
      };
    },
    [socket]
  );

  const fetchPast24hCounts = (id) => {
    if (!socket) return;

    return new Promise((resolve, reject) => {
      socket.emit("get_past_24h_counts", { id });

      const handleSuccess = (response) => {
        if (response.id === id) {
          resolve(response.data);
          cleanup();
        }
      };

      const handleError = (errorResponse) => {
        if (errorResponse.id === id) {
          reject(errorResponse.error);
          cleanup();
        }
      };

      const cleanup = () => {
        socket.off("past_24h_counts", handleSuccess);
        socket.off("past_24h_counts_error", handleError);
      };

      socket.on("past_24h_counts", handleSuccess);
      socket.on("past_24h_counts_error", handleError);
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        marketData,
        subscribeToMarket,
        fetchPast24hCounts,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
