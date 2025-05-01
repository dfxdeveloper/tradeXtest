import React, { useCallback, useMemo } from "react";
import useMarketController from "../../../hooks/useMarketController";
import { TYPEMAPPING } from "../../../utils/constants";
import { round } from "../../../utils";
import Skeleton from "react-loading-skeleton";

const renderSkeleton = (length) =>
  Array.from({ length }).map((_, i) => (
    <tr
      key={`skeleton-${i}`}
      className="bg-[#1A1625] rounded-lg border border-[#6A11CB]"
    >
      <td colSpan={length} className="p-4">
        <Skeleton height={40} baseColor="#1A1625" highlightColor="#2D2152" />
      </td>
    </tr>
  ));

const ScreeningResult = ({ screenerData, totalCounts, loading }) => {
  const memorized = useMemo(
    () =>
      screenerData.reduce(
        (acc, { companyIdentifier, contract_type }) => {
          const type = TYPEMAPPING[contract_type];
          if (type && !acc[type].includes(companyIdentifier)) {
            acc[type].push(companyIdentifier);
          }
          return acc;
        },
        { indian: [], us: [], forex: [], crypto: [] }
      ),
    [screenerData]
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

  return (
    <div className="bg-[#220C39] p-6 rounded-lg">
      <div className="mb-4">
        <div className="flex items-center justify-between border-b border-purple-900/20">
          <h2 className="text-white text-lg mb-4">Screening Results</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-400 text-sm bg-purple-600 text-white rounded-lg py-2 px-2">
              {totalCounts} matches
            </span>
          </div>
        </div>
        <div className="w-full bg-[#1A1625] p-3 overflow-x-auto">
          <div className="min-w-[600px] md:min-w-full">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#B039FF] border-t border-[#6A11CB2E]">
                  <th className="text-left py-2 pr-8">Market</th>
                  <th className="text-left py-2 pr-8">Name</th>
                  <th className="text-left py-2 pr-8">Price</th>
                  <th className="text-left py-2 pr-8">Change</th>
                  <th className="text-left py-2">Volume</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {loading ? (
                  renderSkeleton(5)
                ) : screenerData?.length > 0 ? (
                  screenerData.map((screener, index) => {
                    const socket = findSocket(screener, socketData);
                    const percentageChange = socket?.percentage
                      ? socket?.percentage
                      : screener?.open && screener?.close
                      ? round(
                          ((screener?.close - screener?.open) /
                            screener?.open) *
                            100,
                          2
                        )
                      : 0;
                    return (
                      <tr
                        className="border-t border-[#6A11CB2E]"
                        key={`screener-data-${index}`}
                      >
                        <td className="py-2 pr-8 capitalize">
                          {screener?.contract_type.replace("_", " ")}
                        </td>
                        <td className="py-2 pr-8">{screener?.company_label}</td>
                        <td className="py-2 pr-8 max-w-xs">
                          {socket?.price || screener?.close
                            ? screener.contract_type === "Indian_Equity"
                              ? `₹${socket?.price || screener?.close}`
                              : `$${socket?.price || screener?.close}`
                            : null}
                        </td>
                        <td className="py-2 pr-8">
                          <span
                            className={`${
                              percentageChange < 0
                                ? "text-red-400"
                                : percentageChange > 0
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            ({percentageChange}%)
                          </span>
                        </td>
                        <td className="py-2">
                          <span className="bg-purple-900 px-3 py-1 rounded mr-2 text-purple-300">
                            {screener?.volume}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-white">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningResult;
