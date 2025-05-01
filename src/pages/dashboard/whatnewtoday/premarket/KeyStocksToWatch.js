import React from 'react';
import MajorEventsToday from "../../../../assets/images/major_events_today.svg"
import { useWhatsNew } from '../../../../components/context/whatsnew';

const KeyStocksToWatch = () => {
  const { whatsNewData } = useWhatsNew();
   
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

  // Default dummy data for fallback
  const bullishStocks = [
    {
      name: "Reliance Industries",
      details: "- Q3 net profit surged 15% to ₹20,539 crore, driven by strong refining and telecom revenue."
    },
    {
      name: "Tata Consultancy Services (TCS)",
      details: "- Reported ₹11,500 crore net profit with 18% YoY growth, boosted by strong deal wins."
    },
    {
      name: "HDFC Bank",
      details: "- Net interest income (NII) rose 23% to ₹19,600 crore, with healthy loan growth of 18%."
    },
    {
      name: "Infosys",
      details: "- Announced $2.5 billion deal wins in Q4, leading to a 12% revenue increase."
    },
    {
      name: "Larsen & Toubro (L&T)",
      details: "- Secured new infrastructure contracts worth ₹32,500 crore, boosting order book."
    },
    {
      name: "Asian Paints",
      details: "- Recorded 20% YoY growth in sales as demand for decorative paints surged."
    }
  ];
  
  const bearishStocks = [
    {
      name: "Adani Enterprises",
      details: "- Stock fell 8% as regulatory scrutiny and Hindenburg report concerns resurfaced."
    },
    {
      name: "Zomato",
      details: "- Reported a ₹390 crore loss in Q4 due to high operational expenses and lower margins."
    },
    {
      name: "Paytm",
      details: "- Declined 12% as RBI imposed restrictions on digital wallets, impacting transaction volume."
    },
    {
      name: "Yes Bank",
      details: "- NPA ratio increased to 4.5%, raising concerns over asset quality and profitability."
    },
    {
      name: "Vedanta",
      details: "- Plunged 10% as debt concerns and falling commodity prices impacted investor sentiment."
    },
    {
      name: "SpiceJet",
      details: "- Loss widened to ₹1,200 crore as high fuel costs and regulatory hurdles weighed on finances."
    }
  ];
  
  // Check if we have actual data from the context
  const hasBullishData = whatsNewData?.[0]?.bullish_outlook;
  const hasBearishData = whatsNewData?.[0]?.bearish_outlook;

  const StockList = ({ title, stocks, textColor, content }) => (
    <div className="w-full border border-[#6A11CB] bg-[#1A1625] rounded-lg lg:w-1/2 p-6 space-y-4">
      <h2 className={`text-xl font-medium ${textColor}`}>{title}</h2>
      {/* If content is provided, use ContentSection, otherwise use the stock list */}
      {content ? (
        <ContentSection content={content} />
      ) : (
        <ul className="space-y-4 list-disc pl-4">
          {stocks.map((stock, index) => (
            <li key={index} className="text-white marker:text-white">
              <span className="font-medium">{stock.name} </span>
              <span className="text-white text-sm">{stock.details}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="bg-[#220C39] border border-[#6A11CB] rounded-lg p-6 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg">
          <img src={MajorEventsToday} className='mr-2 w-10'/>
        </div>
        <h1 className="text-white text-2xl font-medium">Key Stocks to Watch</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        <StockList
          title="Bullish Outlook"
          stocks={bullishStocks}
          textColor="text-[#24B924]"
          content={hasBullishData}
          className="border border-[#6A11CB]"
        />
        <StockList
          title="Bearish Outlook"
          stocks={bearishStocks}
          textColor="text-[#FF0000]"
          content={hasBearishData}
        />
      </div>
    </div>
  );
};

export default KeyStocksToWatch;