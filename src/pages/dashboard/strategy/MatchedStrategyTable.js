import React, { memo, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import { formatRelativeTime, round } from "../../../utils";
import { TYPEMAPPING } from "../../../utils/constants";
import useMarketController from "../../../hooks/useMarketController";
import Pagination from "../../../components/Pagination";

const MatchedStrategyTable = ({
  count,
  strategyData,
  loading,
  handleCallback,
  currentPage,
  totalPages,
}) => {
  const socketOriginaldData = useMemo(() => {
    return strategyData.reduce(
      (acc, { companyIdentifier, contract_type }) => {
        const type = TYPEMAPPING[contract_type];
        if (type && !acc[type].includes(companyIdentifier)) {
          acc[type].push(companyIdentifier);
        }
        return acc;
      },
      { indian: [], us: [], forex: [], crypto: [] }
    );
  }, [strategyData]);

  const { socketData } = useMarketController(socketOriginaldData);

  // const safeSocketData = useMemo(() => {
  //   if (!socketData) return {};

  //   return Object.entries(socketOriginaldData).reduce(
  //     (acc, [market, symbols]) => {
  //       acc[market] = symbols.reduce((marketAcc, symbol) => {
  //         const socketEntry = Object.values(socketData[market] || {}).find(
  //           (entry) => entry.identifier === symbol
  //         );
  //         if (market === "indian") {
  //           const company = INDIAN_EQUITY.find((c) => c.value === symbol);
  //           if (company) {
  //             symbol = company.label;
  //           }
  //         }

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
  // }, [marketCloseData, socketOriginaldData, socketData]);

  const findSocket = (item, socketData) => {
    const marketType = TYPEMAPPING[item.contract_type];
    if (!socketData?.[marketType]) return null;
    const marketData = socketData[marketType];
    const matchedEntry = Object.values(marketData).find(
      (entry) => entry.identifier === item.companyIdentifier
    );

    return matchedEntry;
  };

  const renderSkeleton = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <tr
        key={`skeleton-${i}`}
        className="bg-[#1A1625] rounded-lg border border-[#6A11CB]"
      >
        <td colSpan="4" className="p-4">
          <Skeleton height={40} baseColor="#1A1625" highlightColor="#2D2152" />
        </td>
      </tr>
    ));

  return (
    <div className="bg-[#220C39] border border-[#6A11CB] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-medium">Strategy Matches</h2>
        <span className="bg-purple-600 px-3 py-1 rounded-md text-xs text-white">
          {count || 0} matches
        </span>
      </div>
      <hr className="border-t border-[#6A11CB] mt-4 -mx-6" />
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-white/70">
              <th className="p-4">Company</th>
              <th className="p-4">Matched Strategies</th>
              <th className="p-4">Last Match</th>
              <th className="p-4">Change</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading
              ? renderSkeleton()
              : strategyData?.length > 0 &&
                strategyData.map((item, index) => {
                  // const socket =
                  //   safeSocketData?.[TYPEMAPPING[item?.contract_type]]?.[
                  //     item?.companyIdentifier
                  //   ];
                  const socket = findSocket(item, socketData);

                  const percentageChange = socket?.percentage
                    ? socket?.percentage
                    : item?.open && item?.close
                    ? round(((item?.close - item?.open) / item?.open) * 100, 2)
                    : 0;
                  return (
                    <tr
                      key={`strategies-${index}`}
                      className="bg-[#1A1625] rounded-lg border border-[#6A11CB] border-b"
                    >
                      <td className="p-4 text-white">{item?.company_label}</td>
                      <td className="p-4">
                        <div className="flex">
                          <span className="px-3 py-1 rounded text-xs text-white border border-[#3F3F3F] capitalize">
                            {(item?.strategies || "").replace(/_/g, " ")}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-white">
                        {formatRelativeTime(item?.timestamp)}
                      </td>
                      <td className="p-4 whitespace-nowrap w-[110px] text-right">
                        <div className="flex justify-end items-center gap-1 min-w-[100px]">
                          <span className="text-xs sm:text-sm font-medium tabular-nums">
                            {socket?.price || item?.close
                              ? item.contract_type === "Indian_Equity"
                                ? `₹${socket?.price || item?.close}`
                                : `$${socket?.price || item?.close}`
                              : null}
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-medium min-w-[50px] text-right ${
                              percentageChange < 0
                                ? "text-red-400"
                                : percentageChange > 0
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            ({percentageChange}%)
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <footer>
        {strategyData?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            fetchCallback={handleCallback}
          />
        )}
      </footer>
    </div>
  );
};

export default memo(MatchedStrategyTable);
