import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { User, Menu, ChevronDown, LogOut, X, ChevronLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/auth";
import { useUserCredentials } from "../../components/context/user";
import { getCookie, removeCookie } from "../../services/cookie";

import tradeXlogo from "../../assets/icons/tradeXlogo.svg";
import whatsnewicon from "../../assets/images/whatsnew.svg";
import Support from "../../assets/images/support.svg";
import Plan from "../../assets/images/plan.svg";
import Profile from "../../assets/images/profile.svg";
import Home from "../../assets/images/home.svg";
import Screener from "../../assets/images/bar-chart-2.svg";
import Strategy from "../../assets/images/customstrategy.svg";
import Config from "../../assets/images/configuration.svg";
// import Expert from "../../assets/images/expert_advice.svg";

/* Components */
import Loading from "../../components/Loading";
// import ExpertAdvice from "../expertadvice/ExpertAdvice";
import MyProfile from "./MyProfile";
import Dashboard from "./DashboardV2";
import Configuration from "./Configuration";
import SupportContact from "./SupportContact";
import MyPlan from "./MyPlan";
import MarketScreener from "./MarketScreenerV2";
/* import CustomStrategy from "./CustomStrategyV2"; */
import CustomStrategy from "./CustomStrategyV3";
import WhatsNewToday from "./WhatsNewToday";
import SubscriptionRestriction from "../../components/SubscriptionRestriction";
import localStorageWithExpiry from "../../utils/localstorage";

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getActiveTabFromRoute = () => {
    const pathMap = {
      "/dashboard": "Dashboard",
      "/dashboard/whatsnewtoday": "Whats New Today",
      "/dashboard/marketscreener": "Market Screener",
      "/dashboard/customstrategy": "Custom Strategy",
      "/dashboard/configure": "Watchlist",
      // "/dashboard/expertadvice": "Expert Advice",
      "/dashboard/profile": "Profile",
      "/dashboard/plan": "Plan",
      "/dashboard/support": "Support",
    };
    return pathMap[location.pathname] || "Dashboard";
  };
  const [activeTab, setActiveTab] = useState(getActiveTabFromRoute());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false);
  const { authData, logout } = useContext(AuthContext);

  const {
    data: user,
    refreshUserData,
    isLoading: userLoading,
  } = useUserCredentials();

  const moreDropdownRef = useRef(null);
  const pricingDropdownRef = useRef(null);
  const initialLoader = useRef(true);
  const sidebarRef = useRef(null);

  const handleLogout = async () => {
    logout();
    removeCookie("token");
    localStorageWithExpiry.clearItems([
      "authData",
      "market_close_data_cache",
      "cachedSignals",
      "hero_section",
      "home_news_cache",
      "news_cache",
    ]);
    await refreshUserData();
    navigate("/");
  };

  useLayoutEffect(() => {
    const cookieToken = getCookie("token");
    if (cookieToken === null) {
      localStorage.removeItem("authData");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    (async () => {
      if (!user && initialLoader.current) {
        await refreshUserData().finally(() => {
          initialLoader.current = false;
        });
      }
    })();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setIsMoreDropdownOpen(false);
      }
      if (
      pricingDropdownRef.current &&
        !pricingDropdownRef.current.contains(event.target)
      ) {
        setIsPricingDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle sidebar hover events
  const handleSidebarMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleSidebarMouseLeave = () => {
    setIsCollapsed(true);
  };

  const moreLinks = [
    {
      path: "/faq",
      label: "FAQ",
    },
    {
      path: "/about-us",
      label: "About Us",
    },
  ];

  const pricingDropdownLinks = [
    { path: "/pricing/individual", label: "Individual Pricing" },
    { path: "/pricing/business", label: "Business Pricing" },
  ];

  const handleMoreNavigation = (path) => {
    setIsMoreDropdownOpen(false);
    setIsHeaderOpen(false);
    navigate(path);
  };

  const handlePricingNavigation = (path) => {
    setIsPricingDropdownOpen(false);
    setIsHeaderOpen(false);
    navigate(path);
  };

  const handleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarOpen(true);
    setIsHeaderOpen(false);
  };

  const handleHeader = (e) => {
    e.preventDefault();
    setIsHeaderOpen(true);
    setIsSidebarOpen(false);
  };

  // Update route mapping
  const tabRouteMap = {
    Dashboard: "/dashboard",
    "Whats New Today": "/dashboard/whatsnewtoday",
    "Market Screener": "/dashboard/marketscreener",
    "Custom Strategy": "/dashboard/customstrategy",
    Watchlist: "/dashboard/configure",
    // "Expert Advice": "/dashboard/expertadvice",
    Profile: "/dashboard/profile",
    Plan: "/dashboard/plan",
    Support: "/dashboard/support",
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Navigate to corresponding route
    const route = tabRouteMap[tab];
    if (route) {
      navigate(route);
    }

    // Close sidebar/header on mobile
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
      setIsHeaderOpen(false);
    }
  };

  const renderContent = () => {
    const isPlanActive = user?.subscription?.status === 1;
    const needsUpgrade = user?.subscription?.plan === 1;

    switch (activeTab) {
      case "Dashboard":
        return isPlanActive ? (
          <Dashboard />
        ) : (
          <SubscriptionRestriction userData={user} />
        );

      case "Whats New Today":
        return <WhatsNewToday />;

      case "Market Screener":
        return <MarketScreener/>
     /*    return isPlanActive && !needsUpgrade ? (
          <MarketScreener />
        ) : (
          <SubscriptionRestriction userData={user} />
        );
 */
      case "Custom Strategy":
       return <CustomStrategy/>
        /* return isPlanActive && !needsUpgrade ? (
          <CustomStrategy />
        ) : (
          <SubscriptionRestriction userData={user} />
        );
 */
      case "Watchlist":
        return <Configuration />;

      // case "Expert Advice":
      //   return <ExpertAdvice />;

      case "Profile":
        return <MyProfile authData={authData} />;

      case "Plan":
        return <MyPlan />;

      case "Support":
        return <SupportContact />;

      default:
        return <Dashboard />;
    }
  };

  if (!user && initialLoader.current && userLoading) {
    return <Loading />;
  }

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";

  const DesktopMoreDropdown = () => (
    <div className="relative inline-block text-left" ref={moreDropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMoreDropdownOpen(!isMoreDropdownOpen);
        }}
        className="group flex items-center space-x-2 text-white 
           py-1.5 rounded-full"
      >
        <span className="text-sm font-medium font-gilroy text-white group-hover:text-purple-400 transition-all duration-300">
          More
        </span>
        <ChevronDown
          className={`w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-purple-400 
            transition-all duration-300 ease-out
            ${isMoreDropdownOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isMoreDropdownOpen && (
        <div
          className="absolute right-0 mt-3 w-[200px] rounded-xl 
            bg-[#AE42FF57] backdrop-blur-lg
            shadow-2xl shadow-black/20
            border border-white/10
            py-1 z-50"
        >
          {moreLinks.map((link) => (
            <button
              key={link.path}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                handleMoreNavigation(link.path);
              }}
              className="flex items-center w-full px-3 py-2.5 text-sm text-white/80 
                hover:bg-white/10 active:bg-white/5
                transition-all duration-200 group"
            >
              <span className="transform group-hover:translate-x-1 transition-all duration-200">
                {link.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const DesktopPricingDropdown = () => (
    <div className="relative inline-block text-left" ref={pricingDropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsPricingDropdownOpen(!isPricingDropdownOpen);
        }}
        className="group flex items-center space-x-2 text-white 
         py-1.5 rounded-full"
      >
        <span className="text-sm font-medium font-gilroy text-white group-hover:text-purple-400 transition-all duration-300">
        Pricing
        </span>
        <ChevronDown
          className={`w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-purple-400 
            transition-all duration-300 ease-out
            ${isPricingDropdownOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isPricingDropdownOpen && (
        <div
          className="absolute right-0 mt-3 w-[200px] rounded-xl 
            bg-[#AE42FF57] backdrop-blur-lg
            shadow-2xl shadow-black/20
            border border-white/10
            py-1 z-50"
        >
          {pricingDropdownLinks.map((link) => (
            <button
              key={link.path}
              onClick={(e) => {
                e.stopPropagation();
                handlePricingNavigation(link.path);
              }}
              className="flex items-center w-full px-3 py-2.5 text-sm text-white/80 
                hover:bg-white/10 active:bg-white/5
                transition-all duration-200 group"
            >
              <span className="transform group-hover:translate-x-1 transition-all duration-200">
                {link.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <>
      <div className="h-screen flex dashboard_bg">
        {/* Mobile Toggle Button */}
        {!isSidebarOpen && (
          <button
            onClick={handleSidebar}
            className="lg:hidden fixed z-50 mt-2 left-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
          className={`fixed lg:sticky top-0 sidebar_bg h-screen flex-none ${sidebarWidth} overflow-hidden transition-all duration-300 z-40 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Header Section */}
          <div className="relative p-4 flex items-center justify-between border-b border-white/10">
            {/* Logo - Hidden when collapsed */}
            <Link
              to="/"
              className={`transition-all duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              <img
                alt="TradeXpert"
                src={tradeXlogo}
                className="h-8 w-[80%] cursor-pointer"
                loading="lazy"
              />
            </Link>

            {/* Toggle indicator - just visual, not a button anymore */}
            <div
              className={`
                flex items-center justify-center
                w-10 h-10
                bg-[#220C39]
                text-white
                rounded-full
                border-2 border-[#6A11CB]
                transition-all duration-300 ease-out
                ${isCollapsed ? "mx-auto" : "ml-auto"}
              `}
            >
              <ChevronLeft
                size={24}
                className={`
                  transform transition-transform duration-500
                  ${isCollapsed ? "rotate-180" : "rotate-0"}
                `}
              />
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Breadcrumb - Hidden when collapsed */}
          {!isCollapsed && (
            <div className="px-4 py-3 text-sm bg-white/5">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Home</span>
                <span>›</span>
                <span className="text-purple-400">{activeTab}</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="mt-2 px-2">
            {[
              {
                name: "Dashboard",
                route: "/dashboard",
                icon: () => (
                  <img
                    src={Home}
                    alt="Dashboard"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
              {
                name: "Whats New Today",
                route: "/dashboard/whatsnewtoday",
                icon: () => (
                  <img
                    src={whatsnewicon}
                    alt="What's New"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
              {
                name: "Market Screener",
                route: "/dashboard/marketscreener",
                icon: () => (
                  <img
                    src={Screener}
                    alt="Screener"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
              {
                name: "Custom Strategy",
                route: "/dashboard/customstrategy",
                icon: () => (
                  <img
                    src={Strategy}
                    alt="Custom Strategy"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
              {
                name: "Watchlist",
                route: "/dashboard/configure",
                icon: () => (
                  <img
                    src={Config}
                    alt="Watchlist"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
              // {
              //   name: "Expert Advice",
              //   route: "/dashboard/expertadvice",
              //   icon: () => (
              //     <img
              //       src={Expert}
              //       alt="Expert advice"
              //       className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
              //     />
              //   ),
              // },
              {
                name: "Profile",
                route: "/dashboard/profile",
                icon: () => (
                  <img
                    src={Profile}
                    alt="Profile"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
              {
                name: "Plan",
                route: "/dashboard/plan",
                icon: () => (
                  <img
                    src={Plan}
                    alt="Plan"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
              {
                name: "Support",
                route: "/dashboard/support",
                icon: () => (
                  <img
                    src={Support}
                    alt="Support"
                    className={`${isCollapsed ? "w-8 h-8" : "w-6 h-6"} mx-3`}
                  />
                ),
              },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name)}
                className={`flex items-center w-full px-4 py-2 mb-2 text-sm text-gray-300 rounded-lg transition-all duration-200 ${
                  activeTab === item.name
                    ? "bg-purple-700 shadow-lg shadow-purple-700/50"
                    : "hover:bg-purple-700/30"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.name : undefined}
              >
                {typeof item.icon === "function" ? (
                  item.icon()
                ) : (
                  <item.icon
                    size={isCollapsed ? 32 : 24}
                    className={isCollapsed ? "mx-auto" : "mr-3"}
                  />
                )}
                <span
                  className={`transition-all duration-300 ${
                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`absolute bottom-4 left-2 right-2 flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-700/30 hover:text-white rounded-lg transition-all duration-200 ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut
              size={isCollapsed ? 24 : 20}
              className={isCollapsed ? "mx-auto" : "mr-3"}
            />
            <span
              className={`transition-all duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-[#1a1625] border-b border-gray-700">
            <div className="flex items-center justify-between h-14 px-4">
              {/* Logo section */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-white">
                  {/* Your logo component */}
                </Link>
              </div>

              {/* Centered navigation */}
              <nav className="flex items-center justify-center space-x-10 flex-grow">
                <Link
                  to="/"
                  className="text-md text-white font-gilroy hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/feature"
                  className="text-md text-white font-gilroy hover:text-purple-400 transition-colors"
                >
                  Feature
                </Link>
                <Link
                  to="/news"
                  className="text-md text-white font-gilroy hover:text-purple-400 transition-colors"
                >
                  News
                </Link>
                <Link
                  to="/learningplatform"
                  className="text-md text-white font-gilroy hover:text-purple-400 transition-colors"
                >
                  Learning Platform
                </Link>
            <DesktopPricingDropdown/>

                {/* <Link
                  to="/hiddeninsights"
                  className="text-md text-white font-gilroy hover:text-purple-400 transition-colors"
                >
                  Hidden Insights
                </Link> */}

                <DesktopMoreDropdown />
              </nav>

              {/* User section */}
              <div className="flex items-center flex-shrink-0">
                <span className="text-sm text-white mr-2">
                  {authData?.user?.full_name}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <User size={16} className="text-gray-300" />
                </div>
              </div>
            </div>
          </header>
          {/* Mobile Header */}
          <header className="lg:hidden fixed top-0 left-0 right-0 z-10 bg-[#1a1625] border-b border-gray-700 px-8 py-2">
            <div className="flex items-center justify-between">
              <Link to="/">
                <img
                  alt="TradeXpert"
                  src={tradeXlogo}
                  className="h-8 mx-10 my-2 lg:w-auto md:w-[80%] w-[60%] space-x-4S cursor-pointer"
                  loading="lazy"
                />
              </Link>
              <button
                onClick={handleHeader}
                className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center"
              >
                <User size={16} className="text-gray-300" />
              </button>
            </div>
          </header>

          {/* Mobile Navigation Menu */}
          <div
            className={`fixed right-0 w-64 h-screen transition-transform duration-300 z-40 ${
              isHeaderOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ backgroundColor: "#231A30" }}
          >
            <div className="p-4 flex flex-end justify-end items-center">
              <button
                onClick={() => setIsHeaderOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-2 px-2">
              <Link
                to="/"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg transition-colors hover:bg-purple-700"
              >
                Home
              </Link>
              <Link
                to="/feature"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg transition-colors hover:bg-purple-700"
              >
                Feature
              </Link>
              <Link
                to="/news"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg transition-colors hover:bg-purple-700"
              >
                News
              </Link>
              <Link
                to="/learningplatform"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg transition-colors hover:bg-purple-700"
              >
                Learning Platform
              </Link>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsPricingDropdownOpen(!isPricingDropdownOpen)
                  }
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg transition-colors hover:bg-purple-700"
                >
                  Pricing
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isPricingDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isPricingDropdownOpen && (
                  <div className="mt-1 px-2 py-1 bg-purple-900/20 rounded-lg">
                    {pricingDropdownLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsHeaderOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-700/50 rounded-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* <Link
                to="/hiddeninsights"
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg transition-colors hover:bg-purple-700"
              >
                Hidden Insights
              </Link> */}
              {/* More dropdown section */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsMoreDropdownOpen(!isMoreDropdownOpen)
                  }
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 rounded-lg transition-colors hover:bg-purple-700"
                >
                  Pricing
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isMoreDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isMoreDropdownOpen && (
                  <div className="mt-1 px-2 py-1 bg-purple-900/20 rounded-lg">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsHeaderOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-purple-700/50 rounded-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
