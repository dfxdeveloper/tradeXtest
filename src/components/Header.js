import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../components/context/auth";
import logo from "../assets/icons/tradeXlogo.svg";
import menuIcon from "../assets/icons/header-oper-icon.png";
import closeIcon from "../assets/icons/header-close-icon.png";
import { useNavigate, Link } from "react-router-dom";
import { ChevronDown, LogOut, LayoutDashboard, User } from "lucide-react";
import localStorageWithExpiry from "../utils/localstorage";
import { useUserCredentials } from "./context/user";
const UserMenu = () => {
  const { authData, logout } = useContext(AuthContext);
  const { refreshUserData } = useUserCredentials();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardClick = () => {
    navigate("/dashboard");
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    logout();
    localStorageWithExpiry.clearItems([
      "authData",
      "market_close_data_cache",
      "cachedSignals",
      "hero_section",
      "home_news_cache",
      "news_cache",
    ]);
    await refreshUserData();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="relative inline-block text-left px-2" ref={dropdownRef}>
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="group flex items-center space-x-1.5 text-white 
                   px-1.5 sm:px-2 py-1  rounded-full
                   bg-white/10 hover:bg-white/15
                   transition-all duration-300 ease-out
                   focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <div
          className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden 
                      bg-white/10 flex items-center justify-center
                      transition-all duration-300"
        >
          <User
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 
                         group-hover:text-white transition-all duration-300"
          />
        </div>

        <div className="flex items-center space-x-1">
          <span
            className="text-xs sm:text-sm font-medium max-w-[80px] sm:max-w-[120px] truncate
                         text-white/90 group-hover:text-white transition-all duration-300"
          >
            {authData?.user.full_name || "User"}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-white/80 group-hover:text-white
                       transition-all duration-300 ease-out
                       ${isUserMenuOpen ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </button>

      <div
        className={`absolute right-0 mt-2 w-[250px] sm:w-[280px] rounded-xl 
                   bg-[#AE42FF57] backdrop-blur-lg
                   shadow-lg shadow-black/20
                   transform transition-all duration-200 ease-out origin-top-right z-50
                   border border-white/10
                   ${
                     isUserMenuOpen
                       ? "translate-y-0 opacity-100 scale-100"
                       : "translate-y-2 opacity-0 scale-95 pointer-events-none"
                   }`}
      >
        <div className="p-2.5 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden 
                          bg-white/10 flex-shrink-0 flex items-center justify-center"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-medium text-white/90 truncate">
                {authData?.user.full_name || "User"}
              </span>
              <span className="text-xs text-white/60 truncate">
                {authData?.user.email || ""}
              </span>
            </div>
          </div>
        </div>

        <div className="py-1">
          <button
            onClick={handleDashboardClick}
            className="flex items-center w-full px-2.5 py-2 text-sm text-white/80 
                     hover:bg-white/10 active:bg-white/5
                     transition-all duration-200 group"
          >
            <LayoutDashboard
              className="h-4 w-4 mr-2 text-white/60 
                                    group-hover:text-white group-hover:scale-110
                                    transition-all duration-200"
            />
            <span className="transform group-hover:translate-x-1 transition-all duration-200">
              Dashboard
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2.5 py-2 text-sm text-red-400
                     hover:bg-red-500/10 active:bg-red-500/5
                     transition-all duration-200 group"
          >
            <LogOut
              className="h-4 w-4 mr-2 text-red-400/80
                            group-hover:text-red-400 group-hover:scale-110
                            transition-all duration-200"
            />
            <span className="transform group-hover:translate-x-1 transition-all duration-200">
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
// Main Header Component
const Header = () => {
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const moreDropdownRef = useRef(null);
  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/news", label: "News" },
    { path: "/feature", label: "Feature" },
    { path: "/learning", label: "Learning Platform" },
    { path: "/pricing", label: "Pricing" },
    { path: "/insights", label: "Hidden Insights" },
  ];
  const moreLinks = [
    { path: "/faq", label: "FAQ" },
    { path: "/about-us", label: "About Us" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setIsMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMobileMenuClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleMoreItemClick = (path) => {
    navigate(path);
    setIsMoreDropdownOpen(false);
    setIsMenuOpen(false);
  };
  return (
    <div className="bg-customBlack mb-0">
      <div className="relative container">
        <div className="relative z-10">
          <nav className="relative">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="TradeXpert Logo"
                  className="lg:w-60 md:w-60 w-44"
                  loading="lazy"
                />
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center lg:gap-4 xl:gap-6">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-white lg:text-base xl:text-lg font-gilroy font-normal hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Updated More Dropdown */}
                <div
                  className="relative inline-block text-left"
                  ref={moreDropdownRef}
                >
                  <button
                    onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                    className="group flex items-center space-x-2 text-white 
                             px-2 sm:px-3 py-1.5 rounded-full
                             bg-white/10 hover:bg-white/15
                             transition-all duration-300 ease-out
                             focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <span className="text-sm font-medium text-white/90 group-hover:text-white transition-all duration-300">
                      More
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 sm:w-4 sm:h-4 text-white/80 group-hover:text-white
                               transition-all duration-300 ease-out
                               ${
                                 isMoreDropdownOpen ? "rotate-180" : "rotate-0"
                               }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-[200px] rounded-xl 
                               bg-[#AE42FF57]  backdrop-blur-lg
                              shadow-2xl shadow-black/20
                              transform transition-all duration-200 ease-out origin-top-right z-50
                              border border-white/10
                              ${
                                isMoreDropdownOpen
                                  ? "translate-y-0 opacity-100 scale-100"
                                  : "translate-y-2 opacity-0 scale-95 pointer-events-none"
                              }`}
                  >
                    <div className="py-1">
                      {moreLinks.map((link) => (
                        <button
                          key={link.path}
                          onClick={() => handleMoreItemClick(link.path)}
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
                  </div>
                </div>
              </div>

              {/* Desktop User Menu */}
              <div className="hidden lg:flex items-center space-x-4">
                {authData ? (
                  <UserMenu authData={authData} logout={logout} />
                ) : (
                  <Link
                    to="/login"
                    className="bg-[#B266FF] text-white px-8 py-2 rounded-md text-lg font-gilroy font-bold hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button and User Menu */}
              <div className="lg:hidden flex items-center gap-3">
                {authData ? (
                  <UserMenu authData={authData} logout={logout} />
                ) : (
                  /*  <Link
                    to="/login"
                    className="bg-[#B266FF] text-white px-4 py-2 rounded-md text-sm font-gilroy font-bold hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Link> */
                  <></>
                )}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white flex items-center"
                >
                  <img
                    src={isMenuOpen ? closeIcon : menuIcon}
                    alt="Menu Icon"
                    className="lg:h-10 md:h-10 h-8 md:w-8 sm:w-20 mt-2"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden fixed inset-0 z-50">
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                <div className="relative h-full w-full max-w-sm bg-[#0E051B] bg-opacity-95 shadow-lg">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-full text-white"
                    >
                      <img
                        src={closeIcon}
                        alt="Close Icon"
                        className="h-10 w-10"
                        loading="lazy"
                      />
                    </button>
                  </div>
                  <div className="px-4 py-10 space-y-3">
                    {navigationLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => handleMobileMenuClick(link.path)}
                        className="text-white block w-full text-left px-3 py-2 text-base font-gilroy font-normal hover:bg-gray-800/40 rounded-md transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                    <div className="space-y-1">
                      {moreLinks.map((link) => (
                        <button
                          key={link.path}
                          onClick={() => handleMobileMenuClick(link.path)}
                          className="text-white block w-full text-left px-3 py-2 text-base font-gilroy font-normal hover:bg-gray-800/40 rounded-md transition-colors ml-4"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                    {!authData && (
                      <Link
                        to="/login"
                        className="bg-[#B266FF] text-white px-8 py-2 rounded-md text-lg font-gilroy font-bold mt-4 block text-center hover:opacity-90 transition-opacity"
                      >
                        Get Started
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Header;
