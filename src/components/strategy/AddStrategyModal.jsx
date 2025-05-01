import { X } from "lucide-react";
import { useState } from "react";
import StrategyEntryRules from "../../pages/dashboard/strategy/StrategyEntryRules";

const AddStrategyModal = ({
  isOpen,
  onClose,
  onAddStrategy,
  initialStrategyName = "",
  initialDescription = "",
  refreshStrategy,
}) => {
  const [strategyName, setStrategyName] = useState(initialStrategyName);
  const [description, setDescription] = useState(initialDescription);
  const [activeTab, setActiveTab] = useState("entry");

  // const handleAddStrategy = () => {
  //   if (strategyName.trim()) {
  //     onAddStrategy({ name: strategyName, description });
  //     onClose();
  //   }
  // };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg overflow-auto">
        <div className="bg-gradient-to-r from-[rgba(205,156,242,0.4)] to-[rgba(246,243,255,0.4)] backdrop-blur-lg rounded-lg w-full max-w-6xl mx-auto p-6 md:p-8 lg:p-10 max-h-[90vh] overflow-y-auto hide-scrollbar">
          <div className=" flex justify-between items-center mb-6 pb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
              Create New Strategy
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="bg-[#1D2049] p-4 rounded-lg">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 py-4">
              <div>
                <label className="text-white text-sm md:text-md font-semibold mb-2 block">
                  Strategy Name
                </label>
                <input
                  type="text"
                  value={strategyName}
                  placeholder="Enter Strategy Name"
                  className="w-full px-3 py-2 rounded bg-[#13111C] text-white border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                  onChange={(e) => setStrategyName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-white text-sm md:text-md font-semibold mb-2 block">
                  Strategy Description
                </label>
                <input
                  type="text"
                  value={description}
                  placeholder="Enter Strategy Description"
                  className="w-full px-3 py-2 rounded bg-[#13111C] text-white border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[rgba(255,255,255,0.192)] to-[rgba(255,255,255,0.24)] backdrop-blur-[29.7px] rounded-lg flex mb-5 mt-5 py-3 md:py-5 justify-center gap-6 w-full md:w-[70%] mx-auto">
              <button
                onClick={() => setActiveTab("entry")}
                className={`px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base ${
                  activeTab === "entry"
                    ? "bg-[#B039FF] text-white"
                    : "text-white border border-[#B039FF]"
                }`}
              >
                Entry Rules
              </button>
              <button
                onClick={() => setActiveTab("exit")}
                className={`px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base ${
                  activeTab === "exit"
                    ? "bg-[#B039FF] text-white"
                    : "text-white border border-[#B039FF]"
                }`}
              >
                Exit Rules
              </button>
            </div>
          </div>

          <div className="py-4">
            {activeTab === "entry" ? (
              <StrategyEntryRules
                strategyName={strategyName}
                description={description}
                onClose={onClose}
                refreshStrategy={refreshStrategy}
              />
            ) : (
              <div className="py-4">
                {/* <ExitRules /> */}
                Comming soon...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStrategyModal;
