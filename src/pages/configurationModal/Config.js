import React, { useState, useEffect, useContext, useCallback } from "react";
import { X, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import NewsConfiguration from "./NewsConfig";
import PatternConfiguration from "./PatternConfig";
import { AuthContext } from "../../components/context/auth";
import { ConstantsContext } from "../../components/context/constants";
import axiosInstance from "../../utils/axiosHelper";
import { toastStyles } from "../../utils";
import { useUserCredentials } from "../../components/context/user";
import { getCookie } from "../../services/cookie";
import AddPairModal from "../dashboard/modals/AddPairModal";
import { TIME_FRAMES } from "../../utils/constants";

const ConfigurationModal = ({ isOpen, onClose }) => {
  const { authData, setAuthData } = useContext(AuthContext);
  const { constants } = useContext(ConstantsContext);
  const {
    data: user,
    refreshUserData,
    isLoading: userLoading,
  } = useUserCredentials();
  const [isSaving, setIsSaving] = useState(false);

  const [activeTab, setActiveTab] = useState("Market & Timeframes");
  const [selectedTimeframes, setSelectedTimeframes] = useState(["10m", "1h"]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    Crypto: false,
    US_Equity: false,
    Indian_Equity: false,
    Forex: false,
  });

  const [isCryptoPairModalOpen, setIsCryptoPairModalOpen] = useState(false);
  const [isIndianStockModalOpen, setIsIndianStockModalOpen] = useState(false);
  const [isUsStockModalOpen, setIsUsStockModalOpen] = useState(false);
  const [isForexModalOpen, setIsForexModalOpen] = useState(false);

  const [marketDetails, setMarketDetails] = useState({
    Crypto: [],
    US_Equity: [],
    Indian_Equity: [],
    Forex: [],
  });

  const [markets, setMarkets] = useState({
    Crypto: [],
    US_Equity: [],
    Indian_Equity: [],
    Forex: [],
  });

  const tabs = ["Market & Timeframes", "News", "Patterns"];

  const setWatchlistDetails = useCallback(async (watchlist) => {
    try {
      setLoading({
        Crypto: true,
        US_Equity: true,
        Indian_Equity: true,
        Forex: true,
      });
      if (Array.isArray(watchlist) && watchlist.length > 0) {
        const companies = watchlist;

        const categorizedData = companies.reduce(
          (acc, company) => {
            if (!company.category) return acc;
            if (!acc.marketDetails[company.category]) {
              acc.marketDetails[company.category] = [];
              acc.markets[company.category] = [];
            }
            acc.marketDetails[company.category].push(company);
            acc.markets[company.category].push(company.identifier);
            return acc;
          },
          { marketDetails: {}, markets: {} }
        );

        setMarketDetails((prev) => ({
          ...prev,
          ...categorizedData.marketDetails,
        }));

        setMarkets((prev) => ({
          ...prev,
          ...categorizedData.markets,
        }));
      }
    } catch (error) {
      console.error("Error fetching watchlist details:", error);
    } finally {
      setLoading({
        Crypto: false,
        US_Equity: false,
        Indian_Equity: false,
        Forex: false,
      });
    }
  }, []);

  const fetchDefaultPairs = async () => {
    const categories = {
      Indian_Equity: {
        categoryName: "Indian_Equity",
        identifiers: ["HDFCBANK", "RELIANCE", "ADANIPORTS"],
      },
      Crypto: {
        categoryName: "Crypto",
        identifiers: ["X:BTCUSD", "X:ETHUSD"],
      },
    };

    const updateStates = async (key, responses) => {
      const companies = responses.flatMap((res) => res?.companies || []);
      setMarkets((prev) => ({
        ...prev,
        [key]: companies.map(({ identifier }) => identifier),
      }));
      setMarketDetails((prev) => ({
        ...prev,
        [key]: companies,
      }));
    };

    const fetchCategoryData = async (key, category) => {
      try {
        setLoading((prev) => ({ ...prev, [key]: true }));
        const responses = await Promise.all(
          category.identifiers.map((identifier) =>
            axiosInstance.get("user/company", {
              params: { category: category.categoryName, identifier },
            })
          )
        );
        await updateStates(key, responses);
      } catch (error) {
        console.error(`Error fetching default ${key} pairs:`, error);
      } finally {
        setLoading((prev) => ({ ...prev, [key]: false }));
      }
    };

    const fetchAllData = async () => {
      await Promise.all(
        Object.entries(categories).map(([key, category]) =>
          fetchCategoryData(key, category)
        )
      );
    };

    return await fetchAllData();
  };

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      if (!user) {
        refreshUserData();
      } else if (user && !user.is_first_visit) {
        navigate("/dashboard");
      } else if (
        user?.is_first_visit &&
        user?.watchlist_details?.length === 0
      ) {
        fetchDefaultPairs();
      } else if (user?.watchlist_details?.length) {
        setWatchlistDetails(user?.watchlist_details);
      }
      if (user?.preferred_time_interval?.length) {
        setSelectedTimeframes(user.preferred_time_interval);
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, user, setWatchlistDetails]);

  const handleAddToWatchlist = async () => {
    setIsSaving(true);
    try {
      const selectedPairs = [
        ...marketDetails.Crypto.map((item) => item.identifier),
        ...marketDetails.US_Equity.map((item) => item.identifier),
        ...marketDetails.Indian_Equity.map((item) => item.identifier),
        ...marketDetails.Forex.map((item) => item.identifier),
      ];
      if (selectedPairs.length === 0) {
        throw new Error("Please select atleast one of category");
      } else if (selectedTimeframes.length === 0) {
        throw new Error("Please select atleast one timeframe");
      }

      await axiosInstance.put("user/update", {
        watchlist: selectedPairs, // Send as an array of strings
        preferred_time_interval: selectedTimeframes, // Already an array
      });

      await refreshUserData();

      // Update both localStorage and AuthContext with the response data
      const updatedAuthData = {
        ...authData,
        user: {
          ...authData.user,
          watchlist: selectedPairs, // Store as an array of strings
          preferred_time_interval: selectedTimeframes,
        },
      };

      // Update localStorage
      localStorage.setItem("authData", JSON.stringify(updatedAuthData));

      // Update AuthContext
      setAuthData(updatedAuthData);

      toast.success("Markets and Timeframes Updated Successfully", toastStyles);
      setActiveTab("News");
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error(error.message, toastStyles);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTimeframeChange = (timeframeValue) => {
    const maxTimeframes = user?.subscription_details?.[0]?.max_timeframes;
    const planType = user?.subscription_details?.[0]?.plan_type;
    setSelectedTimeframes((prev) => {
      const isTimeframeSelected = prev.includes(timeframeValue);
      if (isTimeframeSelected) {
        return prev.filter((t) => t !== timeframeValue);
      } else if (planType === 1) {
        if (maxTimeframes !== -1 && prev.length < maxTimeframes) {
          return [...prev, timeframeValue];
        } else {
          toast.error(
            `You can select up to ${maxTimeframes} timeframes.`,
            toastStyles
          );
          return prev;
        }
      } else {
        return [...prev, timeframeValue];
      }
    });
  };

  const isTimeframeSelected = (timeframeValue) => {
    return selectedTimeframes.includes(timeframeValue);
  };

  // Market handlers
  const handleMarketOperation = async (
    operation,
    market,
    pair,
    companyObject
  ) => {
    if (operation === "add") {
      if (markets[market].includes(pair)) return false;

      const maxContractTypes =
          user?.subscription_details?.[0]?.allowed_contract_types,
        maxContracts = user?.subscription_details?.[0]?.max_contracts;
      const updatedTempMarket = {
        ...markets,
        [market]: [...markets[market], pair],
      };
      const totalCompanies = Object.values(updatedTempMarket).flat().length;
      const activeMarketCategories = Object.values(updatedTempMarket).filter(
        (market) => market.length > 0
      ).length;
      if (maxContracts !== -1 && totalCompanies > maxContracts) {
        const errorMessage = `Maximum number of contracts (${maxContracts}) exceeded.`;
        toast.error(errorMessage, toastStyles);
        return true;
      }
      if (
        maxContractTypes !== -1 &&
        activeMarketCategories > maxContractTypes
      ) {
        const errorMessage = `Maximum number of contract types (${maxContractTypes}) exceeded.`;
        toast.error(errorMessage, toastStyles);
        return true;
      }

      setMarkets((prev) => ({
        ...prev,
        [market]: [...prev[market], pair],
      }));
      setMarketDetails((prev) => ({
        ...prev,
        [market]: [...prev[market], companyObject],
      }));

      return { success: true, message: "Company added successfully" };
    } else if (operation === "remove") {
      setMarkets((prev) => ({
        ...prev,
        [market]: prev[market].filter((p) => p !== pair),
      }));

      setMarketDetails((prev) => ({
        ...prev,
        [market]: prev[market].filter((item) => item.identifier !== pair),
      }));
      return true;
    }

    return null;
  };

  const renderMarketSection = (title, marketKey, modalSetter, buttonText) => {
    const marketData = markets[marketKey];
    const isLoading = loading[marketKey];

    return (
      <div className="p-4 bg-[#1A1625] rounded-lg">
        <h3 className="text-white mb-3">{title}</h3>
        <div className="space-y-2 mb-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            marketData.map((pair, idx) => (
              <div
                key={idx}
                className="flex items-center bg-[#220C39] rounded-lg p-2"
              >
                <span className="text-gray-300 flex-1">{pair}</span>
                <X
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white"
                  onClick={() =>
                    handleMarketOperation("remove", marketKey, pair)
                  }
                />
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => modalSetter(true)}
          className="w-full bg-[#220C39] flex items-center justify-center space-x-2 py-2 border border-[#6A11CB] rounded-lg text-white hover:bg-purple-600/10"
        >
          <Plus className="w-4 h-4" />
          <span>{buttonText}</span>
        </button>
      </div>
    );
  };

  const MarketTimeframe = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg">Market</h2>
      </div>
      <div className="bg-[#220C39] border border-[#6A11CB] rounded-xl p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {renderMarketSection(
            "Crypto",
            "Crypto",
            setIsCryptoPairModalOpen,
            "Add Crypto pair"
          )}
          {renderMarketSection(
            "US equity",
            "US_Equity",
            setIsUsStockModalOpen,
            "Add US Stock"
          )}
          {renderMarketSection(
            "Indian equity",
            "Indian_Equity",
            setIsIndianStockModalOpen,
            "Add Indian Stock"
          )}
          {renderMarketSection(
            "Forex",
            "Forex",
            setIsForexModalOpen,
            "Add Forex pair"
          )}
        </div>
      </div>

      <div>
        <h2 className="text-white text-lg mb-4">Timeframes</h2>
        <div className="bg-[#220C39] border border-[#6A11CB] rounded-xl p-6">
          <h2 className="text-white text-lg mb-6">Timeframe 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            {TIME_FRAMES.map((timeframe) => {
              const isChecked = isTimeframeSelected(timeframe.value);
              return (
                <label
                  key={timeframe.value}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-white cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleTimeframeChange(timeframe.value)}
                      className="peer appearance-none w-5 h-5 border border-white rounded bg-transparent checked:border-[#6A11CB] checked:bg-[#6A11CB] transition-colors cursor-pointer"
                    />
                    {isChecked && (
                      <Check
                        className="absolute w-3.5 h-3.5 text-white opacity-100 pointer-events-none"
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <span className="text-white text-sm">{timeframe.label}</span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center space-x-8 mt-28">
          <button
            onClick={handleAddToWatchlist}
            disabled={isSaving}
            className={`px-6 py-2 rounded-lg text-white transition-colors text-sm ${
              isSaving
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isSaving ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "News":
        return (
          <NewsConfiguration
            onSaveAndNextTab={() => {
              // Find the index of the current active tab
              const currentTabIndex = tabs.findIndex(
                (tab) => tab === activeTab
              );

              // Move to the next tab, or wrap around to the first tab if at the end
              const nextTabIndex = (currentTabIndex + 1) % tabs.length;
              setActiveTab(tabs[nextTabIndex]);
            }}
          />
        );
      case "Patterns":
        return <PatternConfiguration />;
      default:
        return <MarketTimeframe />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-gray-900 text-left shadow-xl transition-all w-full max-w-6xl">
          <Toaster />

          {/* Close button */}
          {/* <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button> */}

          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Configure your trading preference
              </h2>
              <p className="text-gray-400 mt-2">
                Customize your market selections, timeframes, and trading
                patterns
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-gray-900 rounded-full p-2 mb-6 flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeTab === tab
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="mb-6">
              {renderContent()}
              <AddPairModal
                isOpen={isCryptoPairModalOpen}
                onClose={() => setIsCryptoPairModalOpen(false)}
                onAddPair={(pair, obj) =>
                  handleMarketOperation("add", "Crypto", pair, obj)
                }
                existingPairs={markets.Crypto}
                category="Crypto"
                title="Add Crypto Pair"
              />

              <AddPairModal
                isOpen={isUsStockModalOpen}
                onClose={() => setIsUsStockModalOpen(false)}
                onAddPair={(pair, obj) =>
                  handleMarketOperation("add", "US_Equity", pair, obj)
                }
                existingPairs={markets.US_Equity}
                category="US_Equity"
                title="Add US Stock"
              />

              <AddPairModal
                isOpen={isIndianStockModalOpen}
                onClose={() => setIsIndianStockModalOpen(false)}
                onAddPair={(pair, obj) =>
                  handleMarketOperation("add", "Indian_Equity", pair, obj)
                }
                existingPairs={markets.Indian_Equity}
                category="Indian_Equity"
                title="Add Indian Stock"
              />

              <AddPairModal
                isOpen={isForexModalOpen}
                onClose={() => setIsForexModalOpen(false)}
                onAddPair={(pair, obj) =>
                  handleMarketOperation("add", "Forex", pair, obj)
                }
                existingPairs={markets.Forex}
                category="Forex"
                title="Add Forex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationModal;
