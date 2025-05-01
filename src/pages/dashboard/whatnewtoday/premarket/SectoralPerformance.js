import React from "react";
import sectoral from "../../../../assets/images/sectoral.svg"
import { useWhatsNew } from "../../../../components/context/whatsnew";

const SectoralPerformance = () => {
  const { whatsNewData, loading, error } = useWhatsNew();
  
  // Get the first item from the whatsNewData array
  const marketData = whatsNewData && whatsNewData.length > 0 ? whatsNewData[0] : null;
  
  // Check if sectoral performance data exists
  const hasSectoralData = marketData && marketData.sectoral_performance && marketData.sectoral_performance.length > 0;
  
  // Format the sectoral performance data
  const sectors = hasSectoralData ? marketData.sectoral_performance.map(item => {
    // Determine text color based on change value
    const changeValue = parseFloat(item.value);
    const isPositive = changeValue >= 0;
    
    return {
      value: `₹${item.price}`,
      change: isPositive ? `${item.value}%` : `${item.value}%`,
      changeColor: isPositive ? "text-[#5BF05B]" : "text-[#E74343]",
      sector: item.title
    };
  }) : [];

  // Show loading state
  if (loading) {
    return <div className="text-white p-6">Loading sectoral performance data...</div>;
  }
  
  // Show error state
  if (error) {
    return <div className="text-white p-6">Error loading sectoral performance data.</div>;
  }
  
  // Don't render if no data is available
  if (!sectors.length) {
    return <div className="text-white p-6">No sectoral performance data available.</div>;
  }

  return (
    <div className="bg-[#1b0c2e] border border-[#6A11CB]  sm:p-6 rounded-xl text-white shadow-lg  max-w-7xl">
      {/* Header */}
      <h2 className="text-lg font-bold mb-4 flex items-center">
        <img className="mr-2" src={sectoral} alt="sectoral" srcSet="" />
        Sectoral Performance
      </h2>

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {sectors.map((sector, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden border border-[#6A11CB] shadow-lg w-full max-w-[240px] min-h-[180px] flex flex-col mx-auto"
          >
            {/* Top Gradient Section */}
            <div className="bg-gradient-to-b from-[#46226E] to-[#667BE6] p-4">
              <p className="text-lg font-bold">{sector.value}</p>
              <p className={`${sector.changeColor} font-semibold text-lg`}>{sector.change}</p>
            </div>

            {/* Bottom Black Section (Ensuring Full Coverage) */}
            <div className="bg-black p-3 text-[#D595FF] text-lg flex-grow">{sector.sector}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectoralPerformance;