import React from "react";
import MajorEventsToday from "../../../../assets/images/major_events_today.svg";
import { useWhatsNew } from "../../../../components/context/whatsnew";

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

const MarketBulletin = () => {
  const { whatsNewData } = useWhatsNew();

  return (
    <div className="bg-[#220C39] border border-[#6A11CB] rounded-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg">
          <img src={MajorEventsToday} className="mr-2 w-10" alt="Major Events Today" />
        </div>
        <h2 className="text-white text-xl font-medium">Market Bulletin</h2>
      </div>

      <div className="text-white text-base">
        <ContentSection content={whatsNewData?.[0]?.market_bulletin} />
      </div>
    </div>
  );
};

export default MarketBulletin;