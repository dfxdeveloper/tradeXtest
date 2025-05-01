import React, { useEffect, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import axiosInstance from "../../utils/axiosHelper";
// import ExitRules from "./strategy/ExitRules";
import StrategyEntryRules from "./strategy/StrategyEntryRules";
import AddStrategyModal from "../../components/strategy/AddStrategyModal";
import { Toaster } from "react-hot-toast";

const ManageStrategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("entry");

  const handleStrategySelect = (strategy) => {
    setSelectedStrategy(strategy);
    setIsDropdownOpen(false);
  };

  const handleAddNewStrategy = (newStrategy) => {
    setStrategies([...strategies, newStrategy]);
    setSelectedStrategy(newStrategy);
  };

  const fetchStrategy = async (signal) => {
    try {
      const response = await axiosInstance("user/strategy?type=custom", {
        ...(signal && { signal }),
      });
      setStrategies(response.data);
      if (selectedStrategy) {
        const updatedStrategy = response.data.find(
          (strategy) => strategy._id === selectedStrategy._id
        );
        setSelectedStrategy(updatedStrategy || null);
      }
    } catch (e) {
      console.error("Error fetching strategies", e);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchStrategy(signal);
    return () => controller.abort();
  }, []);

  return (
    <>
      <Toaster />
      <div className="w-full max-w-6xl mx-auto p-6 sm:p-4">
        <h1 className="px-2 font-bold text-3xl">Custom Strategy</h1>
        <div className="bg-[#1D2049] rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-md sm:text-xl font-bold text-white">
              Manage Strategies
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="mr-2 w-5 h-5" /> Create New Strategy
            </button>
          </div>

          <div className="relative mb-6">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-2 bg-[#13111C] text-gray-400 rounded-lg flex justify-between items-center"
            >
              <span className="capitalize">
                {selectedStrategy
                  ? selectedStrategy.label
                  : "Select a strategy"}
              </span>
              <ChevronDown
                className={`transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute w-full mt-2 bg-[#13111C] rounded-lg shadow-lg z-10">
                {strategies.map((strategy, index) => (
                  <div
                    key={index}
                    onClick={() => handleStrategySelect(strategy)}
                    className="p-2 text-white hover:bg-[#2A2736] cursor-pointer capitalize"
                  >
                    {strategy.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedStrategy && (
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 py-2">
              <div>
                <label className="text-[#FFFFFF] text-md font-semibold mb-3 block">
                  Strategy Name
                </label>
                <input
                  type="text"
                  value={selectedStrategy.name}
                  onChange={(e) =>
                    setSelectedStrategy((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-2 rounded bg-[#13111C] text-white border border-[#6A11CB] focus:ring-0 text-sm"
                />
              </div>
              <div className="">
                <label className="text-[#FFFFFF] text-md font-semibold mb-3 block">
                  Strategy Description
                </label>
                <input
                  type="text"
                  value={selectedStrategy.description}
                  onChange={(e) =>
                    setSelectedStrategy((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-2 py-2 rounded bg-[#13111C] text-white border border-[#6A11CB] focus:ring-0 text-sm"
                />
              </div>
            </div>
          )}
        </div>
        {selectedStrategy && (
          <div className="mt-6 rounded-lg">
            <div className="bg-gradient-to-r from-[rgba(255,255,255,0.192)] to-[rgba(255,255,255,0.24)] backdrop-blur-[29.7px] rounded-lg flex mb-5 mt-5 py-5 justify-center space-x-10 w-[70%] mx-auto">
              <button
                onClick={() => setActiveTab("entry")}
                className={`px-4 py-2 rounded ${
                  activeTab === "entry"
                    ? "bg-[#B039FF] text-white"
                    : "text-white border border-[#B039FF]"
                }`}
              >
                Entry Rules
              </button>
              <button
                onClick={() => setActiveTab("exit")}
                className={`px-4 py-2 rounded ${
                  activeTab === "exit"
                    ? "bg-[#B039FF] text-white"
                    : "text-white border border-[#B039FF]"
                }`}
              >
                Exit Rules
              </button>
            </div>

            <div className="py-4">
              {activeTab === "entry" ? (
                <StrategyEntryRules
                  strategyName={selectedStrategy.name}
                  description={selectedStrategy.description}
                  groups={selectedStrategy.groups}
                  strategyId={selectedStrategy._id}
                  refreshStrategy={fetchStrategy}
                />
              ) : (
                <div className="py-4">
                  {/* <ExitRules /> */}
                  Comming Soon...
                </div>
              )}
            </div>
          </div>
        )}

        <AddStrategyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddStrategy={handleAddNewStrategy}
          refreshStrategy={fetchStrategy}
        />
      </div>
    </>
  );
};

export default ManageStrategy;
