import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import ManageStrategy from "../CustomStrategyV3";

const StrategyApp = () => {
  const [view, setView] = useState("strategyList");
  const [activeTab, setActiveTab] = useState("myStrategy");

  // Function to switch between different views
  const switchView = (viewName) => {
    setView(viewName);
  };

  return (
    <div className="min-h-screen">
      {view === "strategyList" && (
        <Strategy
          onCreateClick={() => switchView("customStrategy")}
          onManageStrategy={() => switchView("manageStrategy")}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {view === "customStrategy" && (
        <CustomStrategyComponent
          onBackClick={() => switchView("strategyList")}
          onCreateNewStrategy={() => switchView("manageStrategy")}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {view === "manageStrategy" && (
        <ManageStrategy
          onBackClick={() =>
            switchView(
              activeTab === "myStrategy" ? "customStrategy" : "strategyList"
            )
          }
        />
      )}
    </div>
  );
};

// Strategy component (Empty state)
const Strategy = ({
  onCreateClick,
  onManageStrategy,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="p-8">
      <h1 className="text-white py-8 text-3xl font-medium font-gilroy">
        Custom Strategy
      </h1>

      <div className="bg-custom-strategy rounded-xl p-6 shadow-lg">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            className={`${
              activeTab === "myStrategy" ? "bg-[#9240E8]" : "bg-[#220C39]"
            } border border-[#B039FF] text-white px-4 py-2 rounded-full text-sm font-medium font-gilroy`}
            onClick={() => setActiveTab("myStrategy")}
          >
            My Strategy
          </button>
          <button
            className={`${
              activeTab === "strategyTemplates"
                ? "bg-[#9240E8]"
                : "bg-[#220C39]"
            } border border-[#B039FF] text-white px-4 py-2 rounded-full text-sm font-medium font-gilroy`}
            onClick={() => setActiveTab("strategyTemplates")}
          >
            Strategy Templates
          </button>
        </div>

        {/* Main content area */}
        <div className="flex">
          {activeTab === "myStrategy" ? (
            // Left side - No strategy message (My Strategy tab)
            <div className="bg-gradient-to-b from-[#3E1D6D] to-[#432B73] border border-[#B039FF] rounded-xl p-8 flex flex-col items-center justify-center">
              <h2 className="text-white font-gilroy text-xl font-bold mb-2">
                No Strategy Yet
              </h2>
              <p className="text-white font-gilroy font-regular text-md text-center mb-6">
                You haven't created any custom trading strategy yet
              </p>

              <button
                className="bg-gradient-to-b from-[#B039FF] to-[#6A11CB] hover:bg-purple-700 text-white px-4 py-2 rounded-md mb-8 flex items-center"
                onClick={onCreateClick}
              >
                <span className="mr-2 text-lg font-bold">+</span> Create New
                Strategy
              </button>

              <p className="text-white font-gilroy font-regular text-md text-center mb-4">
                Get started by creating one from scratch or using a templates.
              </p>

              <button
                className="bg-gradient-to-b from-[#B039FF] to-[#6A11CB] hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                onClick={() => setActiveTab("strategyTemplates")}
              >
                Browse Strategy Templates
              </button>
            </div>
          ) : (
            // Strategy Templates tab content
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-[#52366E] border-2 border-[#B039FF] rounded-xl p-4"
                    >
                      <h3 className="text-white font-bold font-gilroy mb-1">
                        Golden Cross
                      </h3>
                      <p className="text-white font-regular font-gilroy text-sm mb-4">
                        A bullish signal when a short-term moving average cross
                      </p>

                      <div className="mb-2">
                        <div className="flex items-center bg-[#75528B] p-2 justify-between mb-2">
                          <span className="text-white font-regular font-gilroy text-sm">
                            AAPL
                          </span>
                          <span className="text-white font-regular font-gilroy text-sm">
                            15m
                          </span>
                          <div className="flex items-center">
                            <span className="bg-[#220C39] text-white font-regular font-gilroy text-xs px-2 py-1 rounded-full">
                              2 hours ago
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center bg-[#75528B] p-2 justify-between mb-2">
                          <span className="text-white font-regular font-gilroy text-sm">
                            AAPL
                          </span>
                          <span className="text-white font-regular font-gilroy text-sm">
                            15m
                          </span>
                          <div className="flex items-center">
                            <span className="bg-[#220C39] text-white font-regular font-gilroy text-xs px-2 py-1 rounded-full">
                              2 hours ago
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <button className="bg-gradient-to-b from-[#A24AFF] to-[#5F219F] text-white px-6 py-2 rounded-full text-sm font-medium">
                          Use this template
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CustomStrategyComponent (with strategies listed)
const CustomStrategyComponent = ({
  onBackClick,
  onCreateNewStrategy,
  activeTab,
  setActiveTab,
}) => {
  return (
    <>
      <div className="flex items-center px-8 py-8 text-white text-2xl font-bold">
        <button
          className="mr-2 text-white rounded-full p-1"
          onClick={onBackClick}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        Custom Strategy
      </div>
      <div className="p-8">
        <div className="p-2 bg-[#1D2049] rounded-lg">
          <div className="rounded-xl p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button
                  className={`${
                    activeTab === "myStrategy"
                      ? "bg-gradient-to-b from-[#9240E8] to-[#5F219F]"
                      : "bg-[#220C39]"
                  } border border-[#B039FF] text-white px-4 py-2 rounded-full text-sm font-medium`}
                  onClick={() => setActiveTab("myStrategy")}
                >
                  My Strategy
                </button>
                <button
                  className={`${
                    activeTab === "strategyTemplates"
                      ? "bg-gradient-to-b from-[#9240E8] to-[#5F219F]"
                      : "bg-[#220C39]"
                  } border border-[#B039FF] text-white px-4 py-2 rounded-full text-sm font-medium`}
                  onClick={() => setActiveTab("strategyTemplates")}
                >
                  Strategy Templates
                </button>
              </div>
              <button
                className="bg-gradient-to-b from-[#B039FF] to-[#6A11CB] border border-[#B039FF] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                onClick={onCreateNewStrategy}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Strategy
              </button>
            </div>
            <div className="p-6">
              {activeTab === "myStrategy" ? (
                // My Strategy content
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array(6)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-[#52366E] border-2 border-[#B039FF] rounded-xl p-4"
                      >
                        <h3 className="text-white font-bold font-gilroy mb-1">
                          Golden Cross
                        </h3>
                        <p className="text-white font-regular font-gilroy text-sm mb-4">
                          A bullish signal when a short-term moving average
                          cross
                        </p>

                        <div className="mb-2">
                          <div className="flex items-center bg-[#75528B] p-2 justify-between mb-2">
                            <span className="text-white font-regular font-gilroy text-sm">
                              AAPL
                            </span>
                            <span className="text-white font-regular font-gilroy text-sm">
                              15m
                            </span>
                            <span className="bg-[#220C39] text-white font-regular font-gilroy text-xs px-2 py-1 rounded-full">
                              2 hours ago
                            </span>
                          </div>

                          {index === 0 && (
                            <div className="flex items-center bg-[#75528B] p-2 justify-between mb-2">
                              <span className="text-white font-regular font-gilroy text-sm">
                                AAPL
                              </span>
                              <span className="text-white font-regular font-gilroy text-sm">
                                1h
                              </span>
                              <span className="bg-[#220C39] text-white font-regular font-gilroy text-xs px-2 py-1 rounded-full">
                                4 days ago
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <button className="bg-gradient-to-b from-[#BF82FF] to-[#9246E1] border border-[#B039FF] text-white px-6 py-2 rounded-full text-sm font-medium">
                            Edit
                          </button>
                          <button className="bg-gradient-to-b from-[#ED4444] to-[#C8224C] border border-[#B039FF] text-white px-6 py-2 rounded-full text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                // Strategy Templates content
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array(6)
                    .fill()
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-[#52366E] border-2 border-[#B039FF] rounded-xl p-4"
                      >
                        <h3 className="text-white font-bold font-gilroy mb-1">
                          Golden Cross
                        </h3>
                        <p className="text-white font-regular font-gilroy text-sm mb-4">
                          A bullish signal when a short-term moving average
                          cross
                        </p>

                        <div className="mb-2">
                          <div className="flex items-center bg-[#75528B] p-2 justify-between mb-2">
                            <span className="text-white font-regular font-gilroy text-sm">
                              AAPL
                            </span>
                            <span className="text-white font-regular font-gilroy text-sm">
                              15m
                            </span>
                            <div className="flex items-center">
                              <span className="bg-[#220C39] text-white font-regular font-gilroy text-xs px-2 py-1 rounded-full">
                                2 hours ago
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center bg-[#75528B] p-2 justify-between mb-2">
                            <span className="text-white font-regular font-gilroy text-sm">
                              AAPL
                            </span>
                            <span className="text-white font-regular font-gilroy text-sm">
                              15m
                            </span>
                            <div className="flex items-center">
                              <span className="bg-[#220C39] text-white font-regular font-gilroy text-xs px-2 py-1 rounded-full">
                                2 hours ago
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <button className="bg-gradient-to-b from-[#B039FF] to-[#6A11CB] text-white px-6 py-2 rounded-full text-sm font-medium">
                            Use this template
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StrategyApp;
