import React, { memo, useEffect } from "react";
import MajorEventsToday from "../../../../assets/images/major_events_today.svg";
import Graph from "../../../../assets/images/tech_analysis.svg";
import { useWhatsNew } from "../../../../components/context/whatsnew";

const PivotTable = memo(({ title, data, bgColor }) => (
  <div className="flex-1">
    <div className={`${bgColor} text-white p-2 md:p-3 rounded-t-lg`}>
      <h4 className="font-medium text-sm md:text-base">{title}</h4>
    </div>
    <div className="bg-[#F6ECFF] rounded-b-lg overflow-hidden">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={`${item.level || `Level ${index + 1}`}-${index}`}
            className="flex justify-between p-2 md:p-3 border-b border-purple-800/30 text-xs md:text-sm"
          >
            <span className="text-[#000000]">
              {item.level || `Level ${index + 1}`}
            </span>
            <span className="text-[#000000]">{item.value}</span>
          </div>
        ))
      ) : (
        <div className="p-2 md:p-3 text-xs md:text-sm text-center text-gray-600">
          No data available
        </div>
      )}
    </div>
  </div>
));

const AnalysisCard = memo(
  ({ title, description, resistancePivots, supportPivots }) => {
    // Transform pivots data into the format expected by PivotTable
    const formatPivotsData = (pivotsArray, prefix) => {
      if (
        !pivotsArray ||
        !Array.isArray(pivotsArray) ||
        pivotsArray.length === 0
      ) {
        return [];
      }

      return pivotsArray.map((value, index) => ({
        level: `${prefix}${index + 1}`,
        value: value,
      }));
    };

    const formattedResistancePivots = formatPivotsData(resistancePivots, "R");
    const formattedSupportPivots = formatPivotsData(supportPivots, "S");

    return (
      <div className="w-full lg:w-1/2 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-[#6A11CB] last:border-b-0 lg:last:border-r-0">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="bg-[#220C39] p-2 rounded-lg">
            <img
              src={MajorEventsToday}
              className="mr-2 w-10"
              alt="Events Icon"
            />
          </div>
          <h2 className="text-white text-lg md:text-xl font-medium">{title}</h2>
        </div>

        <div className="mb-4 md:mb-6">
          <ContentSection content={description} />
        </div>
        <h3 className="text-[#D595FF] text-base md:text-lg font-medium mb-3 md:mb-4">
          Key Observations
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <PivotTable
            title="Key Resistance Pivots"
            data={formattedResistancePivots}
            bgColor="bg-[#734096]"
          />
          <PivotTable
            title="Key Support Pivots"
            data={formattedSupportPivots}
            bgColor="bg-[#8F55CC]"
          />
        </div>
      </div>
    );
  }
);
const ContentSection = React.memo(({ content }) => (
  <div className="space-y-2">
    <div
      className="prose py-2 max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_ul]:my-0 [&_ol]:my-0 [&_p]:my-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_ul>li]:leading-tight [&_ol>li]:leading-tight [&_ul>li::marker]:!text-white [&_ol>li::marker]:!text-white [&_ul>li::marker]:!content-['•'] [&_ul>li::marker]:!font-white dark:text-white [&_li::marker]:fill-white [&_li::marker]:stroke-black [&_ul>li::before]:bg-white [&_li]:pl-1"
      style={{
        "--tw-prose-bullets": "white",
        "--tw-prose-counters": "white",
      }}
      dangerouslySetInnerHTML={{ __html: content || "Content not available" }}
    />
  </div>
));

const TechnicalAnalysis = () => {
  const { whatsNewData } = useWhatsNew();
  const niftyTechData = whatsNewData?.[0]?.nifty_tech_analysis?.[0]
    ? {
        description:
          whatsNewData?.[0]?.bank_nifty_tech_analysis[0].description || "",
        resistance_pivots:
          whatsNewData?.[0]?.bank_nifty_tech_analysis[0].resistance_pivots ||
          [],
        support_pivots:
          whatsNewData?.[0]?.bank_nifty_tech_analysis[0].support_pivots || [],
      }
    : {
        description: "",
        resistance_pivots: [],
        support_pivots: [],
        id: null,
      };

  // Extract Bank Nifty Technical Analysis data
  const bankNiftyTechData = whatsNewData?.[0]?.bank_nifty_tech_analysis?.[0]
    ? {
      description: whatsNewData?.[0]?.bank_nifty_tech_analysis?.[0]?.description || "",
      resistance_pivots: whatsNewData?.[0]?.bank_nifty_tech_analysis?.[0]?.resistance_pivots || [],
      support_pivots: whatsNewData?.[0]?.bank_nifty_tech_analysis?.[0]?.support_pivots || [],
      // You could also include the formatted versions if needed
      formatted_resistance: (whatsNewData?.[0]?.bank_nifty_tech_analysis?.[0]?.resistance_pivots || [])
        .map(pivot => parseFloat(pivot.replace(/,/g, ''))),
      formatted_support: (whatsNewData?.[0]?.bank_nifty_tech_analysis?.[0]?.support_pivots || [])
        .map(pivot => parseFloat(pivot.replace(/,/g, '')))
    }
    : {
        description: "",
        resistance_pivots: [],
        support_pivots: [],
        id: null,
      };

  // Create fallback data in case API data is not available
  const fallbackNiftyData = {
    description:
      "<p>Nifty 50 analysis not available. Please check back later.</p>",
    resistance_pivots: ["22,104", "22,138", "22,191"],
    support_pivots: ["21,997", "21,964", "21,910"],
  };

  const fallbackBankNiftyData = {
    description:
      "<p>Bank Nifty analysis not available. Please check back later.</p>",
    resistance_pivots: ["48,354", "48,460", "48,632"],
    support_pivots: ["48,010", "47,903", "47,732"],
  };

  // Use actual data if available, otherwise use fallback
  const niftyData = niftyTechData.description
    ? niftyTechData
    : fallbackNiftyData;
  const bankNiftyData = bankNiftyTechData.description
    ? bankNiftyTechData
    : fallbackBankNiftyData;

  return (
    <div className="bg-[#220C39] border border-[#6A11CB] rounded-lg flex flex-col lg:flex-row">
      <AnalysisCard
        title="Nifty Technical Analysis"
        description={niftyData.description}
        resistancePivots={niftyData.resistance_pivots}
        supportPivots={niftyData.support_pivots}
      />
      <AnalysisCard
        title="Bank Nifty Technical Analysis"
        description={bankNiftyData.description}
        resistancePivots={bankNiftyData.resistance_pivots}
        supportPivots={bankNiftyData.support_pivots}
      />
    </div>
  );
};

export default TechnicalAnalysis;
