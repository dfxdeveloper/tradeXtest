import React, { memo, useMemo } from "react";
import Card from "./Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyStrategies = ({
  loading,
  strategies,
  setActiveTab,
  onEdit,
  onDelete,
}) => {
  const skeletonLoaders = useMemo(() => Array.from({ length: 3 }), []);

  if (strategies?.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {strategies.map((strategy, i) => (
          <Card
            key={`strategy-${i}`}
            activeTab={1}
            customStrategy={strategy}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  if (strategies === null && loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skeletonLoaders.map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="bg-[#52366E] border-2 border-[#B039FF] rounded-xl p-4"
          >
            <Skeleton
              height={40}
              baseColor="#1A1625"
              highlightColor="#2D2152"
              count={3}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#3E1D6D] to-[#432B73] border border-[#B039FF] rounded-xl p-8 flex flex-col items-center justify-center">
      <h2 className="text-white font-gilroy text-xl font-bold mb-2">
        No Strategy Yet
      </h2>
      <p className="text-white font-gilroy font-regular text-md text-center mb-6">
        You haven't created any custom trading strategy yet
      </p>

      <button
        className="bg-gradient-to-b from-[#B039FF] to-[#6A11CB] hover:bg-purple-700 text-white px-4 py-2 rounded-md mb-8 flex items-center"
        onClick={() => setActiveTab(3)}
      >
        <span className="mr-2 text-lg font-bold">+</span> Create New Strategy
      </button>

      <p className="text-white font-gilroy font-regular text-md text-center mb-4">
        Get started by creating one from scratch or using templates.
      </p>

      <button
        className="bg-gradient-to-b from-[#B039FF] to-[#6A11CB] hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        onClick={() => setActiveTab(2)}
      >
        Browse Strategy Templates
      </button>
    </div>
  );
};

export default memo(MyStrategies);
