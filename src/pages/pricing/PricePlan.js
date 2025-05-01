import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentPage_bg from "../../assets/images/Payment_bg_1.png";
import { getCookie } from "../../services/cookie";
import { useUserCredentials } from "../../components/context/user";
import { useConstants } from "../../components/context/constants";
import Loading from "../../components/Loading";

const PricePlan = ({ subscriptions }) => {
  const {
    data: user,
    refreshUserData,
    isLoading: userLoading,
  } = useUserCredentials();
  const {
    constants,
    fetchConstants,
    loading: constantsLoading,
  } = useConstants();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(4);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [token, setToken] = useState(null);

  useLayoutEffect(() => {
    if (token === null) {
      const cookieToken = getCookie("token");
      if (cookieToken === null) {
        localStorage.removeItem("authData");
      } else {
        setToken(cookieToken);
      }
    }
  }, [navigate, token]);

  useEffect(() => {
    if (!constants && !constantsLoading) {
      fetchConstants();
    }
  }, [constants, fetchConstants, constantsLoading]);

  useEffect(() => {
    if (!user && !userLoading) {
      refreshUserData();
    }
  }, [user, userLoading]);

  const PLAN_TYPE_MAPPING = {
    1: "basic",
    2: "pro",
    3: "premium",
  };

  const PLAN_FEATURES = {
    basic: {
      contracts: {
        check: () => true,
        text: (sub) =>
          `Max ${sub.max_contracts} Contracts across only ${sub.allowed_contract_types} contract types`,
      },
      timeframes: {
        check: (sub) => sub.max_timeframes !== 0,
        text: (sub) => `Max ${sub.max_timeframes} Timeframes`,
      },
      newstags: {
        check: (sub) => sub.max_news_tags !== 0,
        text: (sub) => `News- Max ${sub.max_news_tags} tags`,
      },
      candlesticks: {
        check: (sub) => sub.candlesticks?.max_candlestick > 0,
        text: (sub) =>
          `${sub.candlesticks.max_candlestick} candlesticks + ${sub.candlesticks.max_chart_pattern} chart patterns`,
      },
      allerts: {
        check: (sub) => sub.alert.real_time === true,
        text: () => `Real-time alerts via Telegram & app`,
      },
      fullaccess: {
        check: (sub) => sub.research_reports === true,
        text: () => ` Access to All Research Reports`,
      },
    },
    premium: {
      contracts: {
        check: () => true,
        text: (sub) =>
          `Max ${sub.max_contracts} Contracts across all contract types`,
      },
      timeframes: {
        check: (sub) => sub.max_timeframes === -1,
        text: () => "Access to all timeframes",
      },
      news: {
        check: (sub) => sub.max_news_tags === -1,
        text: () => `Unlimited news tags`,
      },
      candlesticks: {
        check: (sub) => sub.candlesticks.is_unlimited === true,
        text: () => "100+ candlesticks & chart patterns",
      },
      realTimeAlerts: {
        check: (sub) => sub.alert.real_time === true,
        text: () => "Real-time alerts via Telegram & app",
      },
      defaultstrategies: {
        check: (sub) => sub.strategies.default.is_unlimited === true,
        text: () => "100+ Default Strategies",
      },
      customStrategies: {
        check: (sub) => sub.strategies.custom.is_unlimited === true,
        text: () => " Unlimited Custom Strategies",
      },
      screen: {
        check: (sub) => sub.plan_type === 3,
        text: () => `Access to Screener`,
      },
      commonSenseTrading: {
        check: (sub) => sub.common_sense_trading === true,
        text: () => `CommonSense Trading`,
      },
      apiAccess: {
        check: (sub) => sub.apiAccess.is_available === true,
        text: () => `API Access to Signals`,
      },
      FOStrategy: {
        check: (sub) => sub.strategies.fO.is_unlimited === true,
        text: () => `All F&O Strategies`,
      },
      proprietaryStrategy: {
        check: (sub) => sub.strategies.proprietary.is_unlimited === true,
        text: () => `All Proprietary Strategies`,
      },
      researchReports: {
        check: (sub) => sub.research_reports === true,
        text: () => `Access to All Research Reports`,
      },
      learningModule: {
        check: (sub) => sub.plan_type === 3,
        text: () => `Access to Community & Learning Modules`,
      },
    },
    pro: {
      contracts: {
        check: () => true,
        text: (sub) =>
          `Max ${sub.max_contracts} Contracts across all contract types`,
      },
      timeframes: {
        check: (sub) => sub.max_timeframes === -1,
        text: (sub) => ` Access to all timeframes`,
      },
      newstags: {
        check: (sub) => sub.max_news_tags !== 0,
        text: (sub) => `News- Max ${sub.max_news_tags} tags`,
      },
      candlesticks: {
        check: (sub) => sub.candlesticks?.is_unlimited,
        text: (sub) => `100+ candlesticks & chart patterns`,
      },
      allerts: {
        check: (sub) => sub.alert.real_time === true,
        text: () => `Real-time alerts via Telegram & app`,
      },
      defaultstrategies: {
        check: (sub) => sub.strategies.default.count !== 0,
        text: (sub) => `${sub.strategies.default.count} Default Strategies`,
      },
      customstrategies: {
        check: (sub) => sub.strategies.custom.count !== 0,
        text: (sub) => `${sub.strategies.custom.count} Custom Strategies`,
      },
      screen: {
        check: (sub) => sub.plan_type === 2,
        text: () => `Access to Screener`,
      },
      api_access: {
        check: (sub) => sub.apiAccess.is_available === true,
        text: () => "API Access to Signals",
      },
      FOStrategies: {
        check: (sub) => sub.strategies.fO.count !== 0,
        text: (sub) => `${sub.strategies.fO.count} F&O Strategies`,
      },
      proprietaryStrategies: {
        check: (sub) => sub.strategies.proprietary.count !== 0,
        text: (sub) =>
          `${sub.strategies.proprietary.count} Proprietary Strategies`,
      },
      researchReports: {
        check: (sub) => sub.research_reports === true,
        text: () => `Access to All Research Reports`,
      },
      learningModule: {
        check: (sub) => sub.plan_type === 2,
        text: () => ` Access to Community & Learning Modules`,
      },
    },
  };

  const getFeaturesList = (subscription) => {
    const planType =
      typeof subscription.plan_type === "number"
        ? PLAN_TYPE_MAPPING[subscription.plan_type]?.toLowerCase()
        : subscription.plan_type?.toLowerCase();

    const featureMapping = PLAN_FEATURES[planType];

    if (!featureMapping) {
      console.error(`Invalid plan type: ${subscription.plan_type}`);
      return [`Unknown plan type: ${subscription.plan_type}`];
    }

    return Object.entries(featureMapping).reduce(
      (features, [key, { check, text }]) => {
        if (check(subscription)) {
          features.push(text(subscription));
        }
        return features;
      },
      []
    );
  };

  const renderPricingCard = (subscription) => {
    const hoverClasses =
      hoveredCard === subscription.plan_type
        ? "hover:shadow-[0_0_0_2px_#AD4AFF,0_0_0_4px_#2575FC] hover:rounded-2xl hover:bg-[radial-gradient(90%_116%_at_50%_0%,_rgba(168,113,255,0.4)_0%,_#0E051B_100%)]"
        : "hover:bg-[radial-gradient(90%_116%_at_50%_0%,_rgba(168,113,255,0.4)_0%,_#0E051B_100%)]";

    const price =
      duration === 4 ? subscription.cost.yearly : subscription.cost.monthly;

    const period = duration === 4 ? "year" : "month";

    return (
      <div
        className={`bg-[#0E051B] rounded-lg ${hoverClasses} p-8 text-white shadow-lg`}
        onMouseEnter={() => setHoveredCard(subscription.plan_type)}
        onMouseLeave={() => setHoveredCard(null)}
        key={subscription.plan_type}
      >
        <div className="flex justify-between items-center">
          <h2 className="lg:text-2xl md:text-xl text-lg font-semibold font-gilroy">
            {subscription.plan_name}
          </h2>
          {token && user?.subscription?.price === price && (
            <span className="bg-green-600 px-3 py-1 rounded-full text-xs text-white capitalize ">
              {
                constants?.STATUS?.find(
                  (item) => item.value === user?.subscription?.status
                )?.label
              }
            </span>
          )}
        </div>
        <div className="lg:text-5xl md:text-3xl text-2xl font-bold mt-4">
          ${price}
          <span className="text-sm text-gray-400">/{period}</span>
        </div>
        {token === null && (
          <button
            className="bg-gradient-to-b from-[#B039FF] to-[#A871FF] hover:opacity-90 mt-6 w-full py-2 rounded text-white font-gilroy md:text-lg text-base font-medium"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Start Free Trial
          </button>
        )}
        {token && user?.subscription?.price === price ? null : (
          <div>
            {!token && "or skip trial and"}{" "}
            <button
              className="bg-purple-500 hover:opacity-90 mt-4 py-2 px-3 rounded text-white text-base font-medium"
              onClick={() => {
                let locationState = {
                  state: {
                    subscriptionData: {
                      plan_name: subscription.plan_name,
                      subscription_id: subscription._id,
                      plan: subscription.plan_type,
                      duration: duration,
                      price: price,
                    },
                  },
                  replace: true,
                };
                navigate(token ? "/billing" : "/signup", locationState);
              }}
            >
              {token ? "Upgrade now" : "Pay Now"}
            </button>
          </div>
        )}
        <div className="mt-6 border-t border-gray-700 pt-4">
          <p className="text-purple-300 text-lg font-semibold font-gilroy">
            Key Features
          </p>
          <ul className="mt-4 space-y-2 text-base font-gilroy">
            {getFeaturesList(subscription).map((feature, index) => (
              <li key={index}>✔ {feature}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (userLoading || constantsLoading) {
    return <Loading />;
  }

  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    if (a.plan_type === 3) return 1;
    if (b.plan_type === 3) return -1;
  
    return a.plan_type - b.plan_type;
  });

  return (
    <div
      className="text-white pb-3.5 pt-24 px-15"
      style={{
        backgroundImage: `url(${PaymentPage_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <h1 className="lg:text-5xl md:text-3xl text-2xl text-center font-gilroy text-white font-bold flex justify-center">
          Pick the Right Plan for Your Journey
        </h1>
        <p className="text-white flex justify-center mt-4 lg:text-lg text-base font-light text-center lg:px-24 md:px-16 px-2">
          Explore a range of carefully designed plans that cater to your unique
          needs and aspirations. Whether you're just starting out or looking to
          enhance your journey, we have the perfect solution to help you achieve
          your goals with ease and confidence.
        </p>
      </div>

      <div className="flex items-center justify-center mt-20">
        <div className="flex bg-transparent border border-white rounded-full p-1">
          <button
            className={`py-2 px-8 md:px-10 lg:px-12 md:text-xl text-lg rounded-full text-white transition-all font-bold font-gilroy ${
              duration === 2
                ? "bg-gradient-to-b from-[#B039FF] to-[#A871FF]"
                : "bg-transparent"
            }`}
            onClick={() => setDuration(2)}
          >
            Monthly
          </button>
          <button
            className={`py-2 px-8 md:px-10 lg:px-12 md:text-xl text-lg rounded-full text-white transition-all font-bold font-gilroy ${
              duration === 4
                ? "bg-gradient-to-b from-[#B039FF] to-[#A871FF]"
                : "bg-transparent"
            }`}
            onClick={() => setDuration(4)}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:p-20 p-8 container">
        {sortedSubscriptions?.length > 0 &&
          sortedSubscriptions.map((subscription) =>
            renderPricingCard(subscription)
          )}
      </div>
    </div>
  );
};

export default PricePlan;