import { Fragment, memo, useMemo } from "react";
import { formatRelativeTime, round } from "../../utils";
import useMarketController from "../../hooks/useMarketController";
import { TYPEMAPPING } from "../../utils/constants";
import Skeleton from "react-loading-skeleton";

const StockRow = ({ signals, isLoading }) => {
  const socketOriginaldData = useMemo(() => {
    return signals.reduce(
      (acc, { company_name, contract_type }) => {
        const type = TYPEMAPPING[contract_type];
        if (type && !acc[type].includes(company_name)) {
          acc[type].push(company_name);
        }
        return acc;
      },
      { indian: [], us: [], forex: [], crypto: [] }
    );
  }, [signals]);

  const { socketData } = useMarketController(socketOriginaldData);

  // const safeSocketData = useMemo(() => {
  //   if (!socketData) return {};

  //   return Object.entries(socketOriginaldData).reduce(
  //     (acc, [market, symbols]) => {
  //       acc[market] = symbols.reduce((marketAcc, symbol) => {
  //         const socketEntry = Object.values(socketData[market] || {}).find(
  //           (entry) => entry.identifier === symbol
  //         );

  //         if (socketEntry && socketEntry?.price) {
  //           marketAcc[symbol] = {
  //             identifier: symbol,
  //             price: socketEntry.price,
  //             percentage: socketEntry.percentage,
  //           };
  //         } else {
  //           const cachedEntry = marketCloseData?.[symbol] || {};
  //           marketAcc[symbol] = {
  //             identifier: symbol,
  //             price: cachedEntry.closePrice || "~",
  //             percentage: cachedEntry.percentage || 0,
  //           };
  //         }
  //         return marketAcc;
  //       }, {});

  //       return acc;
  //     },
  //     {}
  //   );
  // }, [socketData, socketOriginaldData, marketCloseData]);

  const findSocket = (item, socketData) => {
    const marketType = TYPEMAPPING[item.contract_type];
    if (!socketData?.[marketType]) return null;
    const marketData = socketData[marketType];
    const matchedEntry = Object.values(marketData).find(
      (entry) => entry.identifier === item.company_name
    );

    return matchedEntry;
  };
  return (
    <Fragment>
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div
              key={"patternSignalSkeleton" + index}
              className="grid grid-cols-1 lg:grid-cols-3 text-sm items-center py-2 px-2 gap-4 "
            >
              <Skeleton
                width={150}
                baseColor="#1A1625"
                highlightColor="#2D2152"
              />
              <Skeleton
                width={120}
                baseColor="#1A1625"
                highlightColor="#2D2152"
              />
              <Skeleton
                width={100}
                baseColor="#1A1625"
                highlightColor="#2D2152"
              />
            </div>
          ))
        : signals?.length > 0 &&
          signals.map((signal) => {
            // const socket =
            //   safeSocketData?.[TYPEMAPPING[signal?.contract_type]]?.[
            //     signal?.company_name
            //   ];
            const socket = findSocket(signal, socketData);

            const percentageChange = socket?.percentage
              ? socket?.percentage
              : signal?.open && signal?.close
              ? round(((signal?.close - signal?.open) / signal?.open) * 100, 2)
              : 0;

            return (
              <div
                key={signal.company_name}
                className="grid grid-cols-1 lg:grid-cols-3 text-sm items-center py-2 gap-4"
              >
                <p className="text-white">{signal.company_name}</p>
                <p className="text-gray-400 text-sm justify-self-center">
                  {formatRelativeTime(signal.timestamp)}
                </p>
                <p
                  className={`text-xs sm:text-sm font-medium h-4 sm:h-5 flex flex-wrap justify-end gap-x-1`}
                >
                  <span className="text-xs sm:text-sm font-medium h-4 sm:h-5">
                    {socket?.price || signal?.close
                      ? signal.contract_type === "Indian_Equity"
                        ? `₹${socket?.price || signal?.close}`
                        : `$${socket?.price || signal?.close}`
                      : null}
                  </span>
                  <span
                    className={`${
                      percentageChange < 0
                        ? "text-red-400"
                        : percentageChange > 0
                        ? "text-green-400"
                        : "text-gray-400"
                    } inline-block min-w-[40px] sm:min-w-[50px] lg:min-w-[60px]`}
                  >
                    ({percentageChange}%)
                  </span>
                </p>
              </div>
            );
          })}
    </Fragment>
  );
};

export default memo(StockRow);
