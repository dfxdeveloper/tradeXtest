import React, { useState } from "react";
import clsx from "clsx";
import RequestDemoModal from "./RequestDemoModal";

const TABS = [
  "Enterprise Trading Signals",
  "Data And API Services",
  "Brokerage Integration Service",
  "White Label Solution",
];

const PRICING_CONTENT = [
  {
    starter: {
      title: "STARTER PLAN",
      description:
        "Essential trading signals for growing businesses. Automated alerts across multiple asset classes.",
      price: {
        monthly: "1000 ",
        yearly: "10200 ",
      },
      features: [
        "5 custom trading strategies",
        "Dedicated AI Trading Bots",
        "200+ automated chart pattern recognition",
        "Business hours support (9am-6pm)",
        "Single delivery channel (Telegram/WhatsApp/Email)",
        "Advance Backtesting reports with performance metrics",
        "Multi-asset coverage (Equities, Forex, Crypto, F&O)",
      ],
    },
    professional: {
      title: "PROFESSIONAL",
      description:
        "Advanced algorithmic trading solutions with dedicated support and customized strategy development.",
      contact: true,
      features: [
        "Unlimited Custom AI-powered trading strategies",
        "24/7 dedicated technical support",
        "Multi-channel delivery (Telegram, WhatsApp, API)",
        "Advanced risk management parameters",
        "Dedicated account manager",
        "Monthly strategy optimization sessions",
      ],
    },
  },
  {
    starter: {
      title: "STARTER PLAN",
      comingSoon: true,
      description:
        "Essential market data services with technical indicators for equities, forex, and crypto markets.",
      price: {
        monthly: "500",
        yearly: "5100",
      },
      features: [
        "Historical price data for all contract types",
        "300+ advanced technical indicators with all pre-built strategies",
        "REST API access with documentation",
        "Daily pre market summary reports",
        "Standard data refresh rates",
        "Business hours technical support",
        "Multi-timeframe support (1min to monthly)",
      ],
    },
    professional: {
      title: "PROFESSIONAL",
      description:
        "Comprehensive real-time market data with advanced technical analysis tools and full API access.",
      contact: false,
      features: [
        "Custom API request",
        "Real-time data across all major global exchanges",
        "300+ advanced technical indicators with customizable parameters",
        "Complete API suite with webhook integrations",
        "Real time news with sentiment analysis",
        "Multi-timeframe support (1min to monthly)",
        "Dedicated support engineer",
      ],
    },
  },
  {
    starter: {
      title: "STARTER PLAN",
      description:
        "Essential brokerage connectivity for automated order execution and account management.",
      price: {
        monthly: "30",
        yearly: "306",
      },
      user: true,
      features: [
        "API connection to major brokerages",
        "Real-time order routing & execution",
        "Access to Position management tools",
        "Trade confirmation notifications",
        "Standard security protocols",
        "Business hours technical support",
      ],
    },
    professional: {
      title: "PROFESSIONAL",
      description:
        "Advanced multi-broker integration with comprehensive portfolio management and custom development.",
      contact: true,
      features: [
        "Integration with 50+ global brokerages",
        "Sub-millisecond execution speeds",
        "Multi-account portfolio management",
        "Advanced risk control parameters",
        "Custom webhook integrations",
        "Dedicated implementation specialist",
      ],
    },
  },
  {
    starter: null,
    professional: {
      title: "PROFESSIONAL",
      description:
        "Enterprise-grade white-label trading solution fully customized to your organization's brand and requirements.",
      contact: true,
      starter: false,
      features: [
        "Complete visual customization (colors, logos, typography)",
        "Custom domain and branded login experience",
        "Tailored feature set based on client needs",
        "Comprehensive admin dashboard with user management",
        "Marketing materials and launch support",
        "Dedicated account management",
        "Revenue diversification opportunities",
        "Ongoing updates and feature enhancements",
      ],
    },
  },
];

export default function EnterprisePricing() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [billing, setBilling] = useState("yearly");
  const [activeTab, setActiveTab] = useState(0);

  const isYearly = billing === "yearly";

  return (
    <div
      id="enterprise-pricing"
      className="enterprise_pricing_bg text-white py-16 px-4 md:px-20 font-euclid"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Enterprise Pricing
        </h2>
        <p className="mb-6 text-md">
          Flexible options to meet your organization’s needs
        </p>

        <div className="flex justify-center mb-8">
          <div className="relative flex border border-[#2F2F6A] rounded-full px-1 py-1 w-[350px]">
            <div
              className={clsx(
                "absolute top-[4px] bottom-[4px] w-[calc(50%-4px)] rounded-full bg-[radial-gradient(167.31%_100%_at_50.43%_23.61%,_#6037FF_0%,_#B27AFF_100%)] transition-all",
                billing === "monthly" ? "left-[4px]" : "left-[calc(50%+4px)]",
                "z-0"
              )}
            ></div>

            <button
              onClick={() => setBilling("monthly")}
              className={clsx(
                "w-1/2 py-2 rounded-full transition-all z-10",
                billing === "monthly"
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={clsx(
                "w-1/2 py-2 rounded-full transition-all z-10",
                billing === "yearly"
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              )}
            >
              Yearly
            </button>
          </div>
        </div>

        {isYearly && (
          <p className="text-[#5D9AFF] font-semibold italic mb-6">
            Save 15% with annual billing
          </p>
        )}

        <div className="flex justify-center gap-6 mb-4 flex-wrap">
          {TABS.map((tab, index) => (
            <button
              key={index}
              className={clsx(
                "px-6 py-2 text-sm font-semibold transition-all rounded-full",
                activeTab === index
                  ? "text-white bg-[radial-gradient(167.31%_100%_at_50.43%_23.61%,_#6037FF_0%,_#B27AFF_100%)] shadow-md"
                  : "text-white/50 hover:text-white"
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full mt-2 mb-10 flex justify-center">
          <div
            className="w-full max-w-4xl h-[2px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #5C5A84 0 10px, transparent 10px 20px)",
              opacity: 0.6,
            }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {!(TABS[activeTab] === "White Label Solution") && (
            <StarterCard
              data={PRICING_CONTENT[activeTab]?.starter}
              isYearly={isYearly}
            />
          )}
          <ProfessionalCard
            setIsRequestModalOpen={setIsRequestModalOpen}
            data={PRICING_CONTENT[activeTab]?.professional}
            fullWidth={TABS[activeTab] === "White Label Solution"}
          />
        </div>
      </div>
      <RequestDemoModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
}

function StarterCard({ data, isYearly }) {
  if (!data) return null;
  const discountedPrice = data.price - data.price * 0.15;
  return (
    <div className="bg-[#1F1929] p-4 rounded-2xl text-left">
      <h3 className="text-md font-medium mb-2">{data.title}</h3>
      <p className="text-[#F3ECFEB2] text-sm mb-6">{data.description}</p>
      <p className="text-4xl font-bold text-[#F3ECFE] mb-4">
        $
        {isYearly
          ? data.price.yearly.toLocaleString()
          : data.price.monthly.toLocaleString()}
        <span className="text-sm font-normal text-[#F3ECFEB2]">
          {data.user === true ? "/user/month" : "/month"}
        </span>
      </p>
      <div className="border-b border-[#FFFFFF1A] pb-4 mb-6">
        {/*  <button className="w-full bg-[#35254F] hover:bg-purple-700 transition-all py-1 rounded-md">
          Subscribe Now
        </button> */}
      </div>
      <p className="italic text-sm text-[#B27AFF] mb-3">Key Features</p>
      <ul className="mt-6 space-y-2 text-sm text-white">
        {data.features.map((feature, i) => (
          <li key={i}>
            <span className="mr-2">✔</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProfessionalCard({ data, fullWidth, setIsRequestModalOpen }) {
  if (!data) return null;
  return (
    <>
      <div
        className={clsx(
          "p-4 rounded-2xl shadow-lg text-left flex flex-col items-center",
          fullWidth
            ? "col-span-2 max-w-2xl mx-auto bg-gradient-to-b from-purple-400/40 to-[#0E051B] border border-[#2575FC]"
            : "bg-gradient-to-b from-purple-400/40 to-[#0E051B] border border-purple-700"
        )}
      >
        <h3 className="text-md font-medium mb-2">{data.title}</h3>
        <p className="text-[#F3ECFEB2] text-sm mb-6 text-center">
          {data.description}
        </p>
        {data.contact ? (
          <p className="text-3xl font-bold text-[#F3ECFE] mb-4">Contact Us</p>
        ) : (
          <p className="text-4xl font-bold text-[#F3ECFE] mb-4">Coming Soon</p>
        )}
        <div className="border-b border-[#FFFFFF1A] pb-4 mb-6 w-full flex justify-center">
          {data.contact && (
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className={clsx(
                data.starter === false ? "w-3/4" : "w-full",
                "bg-[linear-gradient(180deg,_#B039FF_0%,_#A871FF_100%)] hover:bg-[#a04de0] transition-all py-1 rounded-md"
              )}
            >
              Contact Us
            </button>
          )}
        </div>

        <p className="italic text-sm text-[#B27AFF] mb-3">Key Features</p>
        <ul className="mt-6 space-y-2 text-sm text-white">
          {data.features.map((feature, i) => (
            <li key={i}>
              <span className="mr-2">✔</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
