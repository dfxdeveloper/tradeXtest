import React, { useState } from "react";
import StrategyEntryRules from "../../pages/dashboard/strategy/StrategyEntryRules";

const AddEdit = ({ values, setValues, onClose }) => {
  const [activeTab, setActiveTab] = useState("entry");

  const handleChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
          Create New Strategy
        </h2>
      </div>
      <div className="bg-[#1D2049] p-4 rounded-lg">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label className="text-white text-sm md:text-md font-semibold mb-2 block">
              Strategy Name
            </label>
            <input
              type="text"
              value={values?.name || ""}
              name="name"
              placeholder="Enter Strategy Name"
              className="w-full px-3 py-2 rounded bg-[#13111C] text-white border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
              onChange={handleChangeValues}
            />
          </div>
          <div>
            <label className="text-white text-sm md:text-md font-semibold mb-2 block">
              Strategy Description
            </label>
            <input
              type="text"
              value={values?.description || ""}
              name="description"
              placeholder="Enter Strategy Description"
              className="w-full px-3 py-2 rounded bg-[#13111C] text-white border border-[#6A11CB] focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
              onChange={handleChangeValues}
            />
          </div>
        </div>

        <div className="rounded-lg flex mt-5 justify-center gap-6 w-full md:w-[70%] mx-auto">
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

      <div>
        {activeTab === "entry" ? (
          <StrategyEntryRules
            strategyName={values?.name || ""}
            description={values?.description || ""}
            groups={values?.groups}
            strategyId={values?._id}
            onClose={onClose}
          />
        ) : (
          <div className="text-center pt-4">
            {/* <ExitRules /> */}
            Comming soon...
          </div>
        )}
      </div>
    </>
  );
};

export default AddEdit;
