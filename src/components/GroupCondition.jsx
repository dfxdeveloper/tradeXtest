import React, { Fragment, useEffect, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";

import {
  COMPARISON_OPERATOR,
  DEFAULT_TRENDS,
  OPERATORS,
  PATTERN_SIGNALS_SECTIONS,
  SCREENER,
  STRATEGY_CATEGORIES,
} from "../utils/constants";
import { generatePreview } from "../utils/helperFunction";
import axiosInstance from "../utils/axiosHelper";
import IndicatorModal from "../pages/dashboard/ScreenerModals/IndicatorModal";

const Operator = ({ operator, handleOnChangeOperator, isGroupOperator }) => (
  <div className={`flex justify-center ${isGroupOperator ? "mx-4" : ""}`}>
    <div className="relative">
      <select
        className="bg-[#1A1625] text-white rounded px-4 py-1 appearance-none min-w-[80px] text-center text-sm border border-[#3A3348]"
        value={operator}
        onChange={(e) => handleOnChangeOperator(e.target.value)}
      >
        <option value="and">AND</option>
        <option value="or">OR</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
    </div>
  </div>
);

const RemoveButton = ({ onClick }) => (
  <button className="p-2 hover:bg-gray-700 rounded" onClick={onClick}>
    <Trash2 className="h-5 w-5 text-red-500" />
  </button>
);

const ConditionRow = ({
  rules,
  onUpdate,
  onRemove,
  isNested,
  label,
  initialData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSide, setModalSide] = useState(null);
  const [selectedIndicator, setSelectedIndicator] = useState("");
  const [selectedIndicatorOptions, setSelectedIndicatorOptions] = useState([]);

  const handleIndicatorSelection = (indicatorName, side) => {
    const indicator = initialData.indicators.find(
      (item) => item.name === indicatorName
    );
    if (indicator?.options?.length > 0) {
      setSelectedIndicator(indicatorName);
      setSelectedIndicatorOptions(indicator.options);
      setModalSide(side);
      setIsModalOpen(true);
    } else {
      if (side === "lhs") {
        onUpdate("attribute", indicatorName);
      } else {
        onUpdate("value", indicatorName);
      }
    }
  };

  const handleModalSubmit = (attribute) => {
    if (modalSide === "lhs") {
      onUpdate("attribute", attribute);
    } else if (modalSide === "rhs") {
      onUpdate("value", attribute);
    }
    setIsModalOpen(false);
  };

  const handleTypeChange = (e) => {
    onUpdate("fieldExpression", e.target.value);
  };

  return (
    <div
      className={`${isNested ? "ml-6 pl-2 border-l-2 border-[#3A3348]" : ""}`}
    >
      {label && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-[#8B78FF]">{label}</span>
          {onRemove && <RemoveButton onClick={onRemove} />}
        </div>
      )}

      <div className="flex gap-2 items-start my-2">
        <div className="flex-1 flex gap-2">
          {/* 1st Dropdown: Select Indicator/Strategy/Pattern */}
          <div className="relative w-full sm:flex-1">
            <select
              className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
              value={rules.key}
              onChange={(e) => onUpdate("key", e.target.value)}
            >
              <option value="">Select</option>
              <option value="indicators">Indicator</option>
              <option value="strategies">Strategy</option>
              <option value="patterns">Pattern</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Show Indicator Modal if selected indicator has options */}
          {isModalOpen && selectedIndicator && (
            <IndicatorModal
              indicator={selectedIndicator}
              options={selectedIndicatorOptions}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleModalSubmit}
            />
          )}

          {/* Indicator */}
          {rules.key === "indicators" && (
            <>
              {/* LHS Indicator */}
              <div className="relative w-full sm:flex-1">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.attribute.split("_")[0]}
                  onChange={(e) =>
                    handleIndicatorSelection(e.target.value, "lhs")
                  }
                >
                  <option value="">Select Indicator</option>
                  {initialData.indicators.map((indicator, index) => (
                    <option key={index} value={indicator.name}>
                      {indicator.lable}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Conditional Operator */}
              <div className="relative w-full sm:w-40">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.operator || ""}
                  onChange={(e) => onUpdate("operator", e.target.value)}
                >
                  <option value="">Select Operator</option>
                  {OPERATORS.map((op, index) => (
                    <option key={index} value={op?.value}>
                      {op?.symbol}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Type Selection */}
              <div className="relative w-full sm:w-40">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none capitalize"
                  value={rules.fieldExpression}
                  onChange={handleTypeChange}
                >
                  <option value="">Select Type</option>
                  {COMPARISON_OPERATOR.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* RHS Value or Indicator */}
              {rules.fieldExpression === "value" ? (
                <div className="relative w-full sm:flex-1">
                  <input
                    type="number"
                    value={rules.value || ""}
                    onChange={(e) => onUpdate("value", e.target.value)}
                    className="w-full bg-[#1A1625] text-white rounded px-3 py-2"
                  />
                </div>
              ) : (
                <div className="relative w-full sm:flex-1">
                  <select
                    className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                    value={rules.value.split("_")[0]}
                    onChange={(e) =>
                      handleIndicatorSelection(e.target.value, "rhs")
                    }
                  >
                    <option value="">Select Indicator</option>
                    {initialData.indicators.map((indicator, index) => (
                      <option key={index} value={indicator.name}>
                        {indicator.lable}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              )}
            </>
          )}

          {/* Strategy */}
          {rules.key === "strategies" && (
            <>
              {/* First Dropdown: Category Selection */}
              <div className="relative w-full sm:flex-1">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.category || ""}
                  onChange={(e) => onUpdate("category", e.target.value)}
                >
                  <option value="">Select Category</option>
                  {STRATEGY_CATEGORIES.map((category, index) => (
                    <option
                      key={`${category.value}-${index}`}
                      value={category.value}
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Second Dropdown: Strategy Selection */}
              <div className="relative w-full sm:flex-1">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.attribute}
                  onChange={(e) => onUpdate("attribute", e.target.value)}
                  disabled={!rules.category}
                >
                  <option value="">Select Strategy</option>
                  {initialData.strategies.length > 0 &&
                    initialData.strategies
                      .flatMap((group) => group.strategies)
                      .filter(
                        (strategy) => strategy.category === rules.category
                      )
                      .map((strategy, index) => (
                        <option key={index} value={strategy.name}>
                          {strategy.label}
                        </option>
                      ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Third Dropdown: Strategy Selection */}
              <div className="relative w-full sm:flex-1">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.value}
                  onChange={(e) => onUpdate("value", e.target.value)}
                  disabled={!rules.category}
                >
                  <option value="">Select Trend</option>
                  {DEFAULT_TRENDS.map((trends, index) => (
                    <option key={index} value={trends?.value}>
                      {trends?.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </>
          )}

          {/* Pattern */}
          {rules.key === "patterns" && (
            <>
              {/* First Dropdown: Category Selection */}
              <div className="relative w-full sm:flex-1">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.category || ""}
                  onChange={(e) => {
                    onUpdate("category", e.target.value);
                  }}
                >
                  <option value="">Select Category</option>
                  {PATTERN_SIGNALS_SECTIONS.map((section) => (
                    <option key={section.category} value={section.category}>
                      {section.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Second Dropdown: Pattern Selection */}
              <div className="relative w-full sm:flex-1">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.attribute}
                  onChange={(e) => onUpdate("attribute", e.target.value)}
                  disabled={!rules.category}
                >
                  <option value="">Select Pattern</option>
                  {initialData.patterns.length > 0 &&
                    initialData.patterns
                      .filter((pattern) => pattern.category === rules.category)
                      .map((patterns, index) => (
                        <option key={index} value={patterns.name}>
                          {patterns.label}
                        </option>
                      ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Third Dropdown: Trend Selection */}
              <div className="relative w-full sm:flex-1">
                <select
                  className="w-full bg-[#1A1625] text-gray-300 rounded px-3 py-2 appearance-none border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  value={rules.value}
                  onChange={(e) => onUpdate("value", e.target.value)}
                  disabled={!rules.category}
                >
                  <option value="">Select Trend</option>
                  {DEFAULT_TRENDS.map((trends, index) => (
                    <option key={index} value={trends?.value}>
                      {trends?.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </>
          )}
        </div>
        {onRemove && <RemoveButton onClick={onRemove} />}
      </div>
    </div>
  );
};

const GroupCondition = ({ groups, setGroups }) => {
  const [initialData, setInitialData] = useState({
    indicators: [],
    strategies: [],
    patterns: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const [indicatorsResult, strategiesResult, patternResult] =
          await Promise.allSettled([
            axiosInstance.get("user/strategy/indicators", { signal }),
            axiosInstance.get("user/strategy", { signal }),
            axiosInstance.get("user/pattern-type/?limit=100", { signal }),
          ]);

        if (signal.aborted) return; // Ignore state updates if request was aborted

        const indicators =
          indicatorsResult.status === "fulfilled"
            ? indicatorsResult.value?.data || []
            : [];

        const strategies =
          strategiesResult.status === "fulfilled"
            ? strategiesResult.value?.data || []
            : [];

        const patterns =
          patternResult.status === "fulfilled"
            ? patternResult?.value?.signals || []
            : [];

        setInitialData({ indicators, strategies, patterns });
      } catch (error) {
        if (!signal.aborted) {
          setInitialData({
            indicators: [],
            strategies: [],
            patterns: [],
          });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  const addGroup = () => {
    if (groups.length < SCREENER.MAX_GROUPS) {
      setGroups([
        ...groups,
        {
          condition: "and",
          rules: [
            {
              key: "",
              attribute: "",
              operator: "",
              value: "",
              nested: null,
              nestedOperator: "",
              conditionOperator: "",
            },
          ],
        },
      ]);
    }
  };

  const addCondition = (groupIndex) => {
    if (groups[groupIndex].rules.length < SCREENER.MAX_CONDITIONS_PER_GROUP) {
      const updatedGroups = [...groups];
      updatedGroups[groupIndex].rules.push({
        key: "",
        attribute: "",
        operator: "",
        value: "",
        nested: null,
        nestedOperator: "",
        conditionOperator: "and",
      });
      setGroups(updatedGroups);
    }
  };

  const updateConditionOperator = (groupIndex, conditionIndex, value) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules[conditionIndex].conditionOperator = value;
    setGroups(updatedGroups);
  };

  const updateGroupOperator = (groupIndex, value) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].condition = value;
    setGroups(updatedGroups);
  };

  const updateNestedOperator = (groupIndex, conditionIndex, value) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules[conditionIndex].nestedOperator = value;
    setGroups(updatedGroups);
  };

  const updateCondition = (groupIndex, conditionIndex, field, value) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules[conditionIndex][field] = value;
    setGroups(updatedGroups);
  };

  const updateNestedCondition = (groupIndex, conditionIndex, field, value) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules[conditionIndex].nested[field] = value;
    setGroups(updatedGroups);
  };

  const removeGroup = (groupIndex) => {
    const updatedGroups = [...groups];
    updatedGroups.splice(groupIndex, 1);
    setGroups(updatedGroups);
  };

  const removeCondition = (groupIndex, conditionIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules.splice(conditionIndex, 1);
    setGroups(updatedGroups);
  };

  const removeNestedCondition = (groupIndex, conditionIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules[conditionIndex].nested = null;
    updatedGroups[groupIndex].rules[conditionIndex].nestedOperator = "and";
    setGroups(updatedGroups);
  };

  const addNestedCondition = (groupIndex, conditionIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].rules[conditionIndex].nested = {
      key: "",
      operator: "",
      value: "",
    };
    setGroups(updatedGroups);
  };

  return (
    <>
      {groups?.length > 0 &&
        groups.map((group, groupIndex) => (
          <Fragment key={groupIndex}>
            {/* Group Operator */}
            {groupIndex > 0 && (
              <Operator
                operator={group.condition}
                handleOnChangeOperator={(value) =>
                  updateGroupOperator(groupIndex, value)
                }
                isGroupOperator={true}
                key={`groupIndex-${groupIndex}`}
              />
            )}
            <div className="relative bg-[#1D2049] rounded-lg p-4 my-2 border border-[#3A3348]">
              {/* Group header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-[#8B78FF]">
                    Group {groupIndex + 1}
                  </h2>
                  {groups.length > 1 && (
                    <RemoveButton onClick={() => removeGroup(groupIndex)} />
                  )}
                </div>
              </div>

              {group.rules.length > 0 &&
                group.rules.map((condition, conditionIndex) => (
                  <div key={conditionIndex} className="mb-2">
                    {conditionIndex > 0 && (
                      <Operator
                        operator={condition.conditionOperator}
                        handleOnChangeOperator={(value) =>
                          updateConditionOperator(
                            groupIndex,
                            conditionIndex,
                            value
                          )
                        }
                        key={`groupIndex-conditionIndex-${conditionIndex}`}
                      />
                    )}

                    {/* Main Condition */}
                    <ConditionRow
                      rules={condition}
                      onUpdate={(field, value) =>
                        updateCondition(
                          groupIndex,
                          conditionIndex,
                          field,
                          value
                        )
                      }
                      onRemove={
                        group.rules.length > 1
                          ? () => removeCondition(groupIndex, conditionIndex)
                          : null
                      }
                      initialData={initialData}
                    />

                    {/* Nested Condition */}
                    {/* {condition.nested && (
                  <>
                    <Operator
                      operator={condition.nestedOperator}
                      handleOnChangeOperator={(value) =>
                        updateNestedOperator(groupIndex, conditionIndex, value)
                      }
                    />
                    <ConditionRow
                      rules={condition.nested}
                      onUpdate={(field, value) =>
                        updateNestedCondition(
                          groupIndex,
                          conditionIndex,
                          field,
                          value
                        )
                      }
                      onRemove={() =>
                        removeNestedCondition(groupIndex, conditionIndex)
                      }
                      isNested
                      label="Nested Group"
                    />
                  </>
                )} */}

                    {/* Add Nested Condition Button */}
                    {/* {!condition.nested && (
                  <button
                    className="mt-2 ml-2 px-2 py-1 bg-[#3A3348] hover:bg-[#4A4358] text-[#8B78FF] rounded text-xs"
                    onClick={() =>
                      addNestedCondition(groupIndex, conditionIndex)
                    }
                  >
                    + Add Nested Group
                  </button>
                )} */}
                  </div>
                ))}

              {/* Add Condition Button */}
              <button
                className="flex-1 sm:flex-none px-3 py-1 bg-[#220C39] hover:bg-purple-700 text-white rounded-md text-sm"
                onClick={() => addCondition(groupIndex)}
              >
                + Add Condition
              </button>
            </div>
          </Fragment>
        ))}

      <div className="my-3 text-center">
        {groups?.length < SCREENER.MAX_GROUPS && (
          <button
            className="bg-[#6A11CB] hover:bg-purple-600 text-white px-4 py-2 rounded-2xl font-medium"
            onClick={addGroup}
          >
            + Add Group
          </button>
        )}
      </div>

      <div className="mt-2 bg-[#6A11CB] text-white p-3 rounded-lg mb-3 capitalize">
        Preview: {generatePreview(groups)}
      </div>
    </>
  );
};

export default GroupCondition;
