import React, { useState } from "react";
import { ChevronDown, Settings, Trash2 } from "lucide-react";
import IndicatorModal from "../ScreenerModals/IndicatorModal";
import ScreeningResult from "../ScreenerModals/ScreeningResult";

const ExitRules = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      items: [
        {
          type: "condition",
          data: {
            id: 1,
            type: "Select",
            operator: "AND",
            subType: "",
            option: "",
            value: "",
            comparisonType: "",
            indicatorSettings: null,
            secondaryIndicator: null,
          },
        },
      ],
    },
  ]);
  const [selectedMarket, setSelectedMarket] = useState("US Equity");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Daily");
  const [showIndicatorModal, setShowIndicatorModal] = useState(false);
  const [currentEditingCondition, setCurrentEditingCondition] = useState(null);
  const [isSecondaryIndicator, setIsSecondaryIndicator] = useState(false);
  const [stopLoss, setStopLoss] = useState("2");
  const [takeProfit, setTakeProfit] = useState("2");

  const markets = ["US Equity", "Indian Equity", "Forex", "Crypto"];
  const timeframes = [
    "1 Minute",
    "5 Minutes",
    "15 Minutes",
    "30 Minutes",
    "1 Hour",
    "4 Hours",
    "Daily",
    "Weekly",
  ];
  const strategies = [
    "RSI-MACD Confluence",
    "Triple Screen",
    "Momentum Range",
    "Volume Breakout",
    "Trend Following",
  ];
  const patterns = [
    "Doji",
    "Engulfing",
    "Hammer",
    "Shooting Star",
    "Morning Star",
    "Evening Star",
  ];
  const comparisonTypes = ["Value", "Indicator"];

  const getStrategyOptions = (strategy) => {
    switch (strategy) {
      case "RSI-MACD Confluence":
      case "Triple Screen":
        return ["Bullish", "Bearish"];
      case "Momentum Range":
        return ["Bullish", "Bearish", "Consolidation", "Breakout"];
      case "Volume Breakout":
        return ["Breakout_up", "Breakout_down"];
      case "Trend Following":
        return ["Strong_uptrend", "Strong_downtrend"];
      default:
        return [];
    }
  };

  const getOperators = (type) => {
    if (type === "Indicator") {
      return ["<", ">", "=", "≥", "≤"];
    }
    return [];
  };

  const removeNestedGroup = (parentGroupId, nestedGroupId) => {
    setGroups(
      groups.map((group) => {
        if (group.id === parentGroupId) {
          return {
            ...group,
            items: group.items.filter(
              (item) =>
                !(item.type === "group" && item.data.id === nestedGroupId)
            ),
          };
        }
        return group;
      })
    );
  };

  const addNestedGroup = (parentGroupId) => {
    setGroups(
      groups.map((group) => {
        if (group.id === parentGroupId) {
          const newNestedGroup = {
            type: "group",
            data: {
              id:
                group.items.filter((item) => item.type === "group").length + 1,
              items: [
                {
                  type: "condition",
                  data: {
                    id: 1,
                    type: "Select",
                    operator: "OR",
                    subType: "",
                    option: "",
                    value: "",
                    indicatorSettings: null,
                  },
                },
              ],
            },
            operator: "OR",
          };

          // If there are existing items, set the last item's operator to "OR"
          if (group.items.length > 0) {
            const lastItem = group.items[group.items.length - 1];
            if (lastItem.type === "condition") {
              lastItem.data.operator = "OR";
            } else {
              lastItem.operator = "OR";
            }
          }

          return {
            ...group,
            items: [...group.items, newNestedGroup],
          };
        }
        return group;
      })
    );
  };

  const addCondition = (groupId) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          const newCondition = {
            type: "condition",
            data: {
              id:
                group.items.filter((item) => item.type === "condition").length +
                1,
              type: "Select",
              operator: "AND",
              subType: "",
              option: "",
              value: "",
              indicatorSettings: null,
            },
          };

          if (group.items.length > 0) {
            const lastItem = group.items[group.items.length - 1];
            if (lastItem.type === "condition") {
              lastItem.data.operator = "AND";
            } else {
              lastItem.operator = "AND";
            }
          }

          return {
            ...group,
            items: [...group.items, newCondition],
          };
        }
        return group;
      })
    );
  };

  const updateItemOperator = (groupId, itemIndex, newOperator) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          const updatedItems = [...group.items];
          if (updatedItems[itemIndex]) {
            if (updatedItems[itemIndex].type === "condition") {
              updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                data: {
                  ...updatedItems[itemIndex].data,
                  operator: newOperator,
                },
              };
            } else {
              updatedItems[itemIndex] = {
                ...updatedItems[itemIndex],
                operator: newOperator,
              };
            }
          }
          return {
            ...group,
            items: updatedItems,
          };
        }
        return group;
      })
    );
  };

  const updateCondition = (groupId, conditionId, updates) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            items: group.items.map((item) => {
              if (item.type === "condition" && item.data.id === conditionId) {
                return {
                  ...item,
                  data: { ...item.data, ...updates },
                };
              }
              return item;
            }),
          };
        }
        return group;
      })
    );
  };

  const handleIndicatorSubmit = (indicatorSettings) => {
    if (currentEditingCondition) {
      const { groupId, conditionId } = currentEditingCondition;
      if (isSecondaryIndicator) {
        updateCondition(groupId, conditionId, {
          secondaryIndicator: { ...indicatorSettings },
        });
      } else {
        updateCondition(groupId, conditionId, {
          subType: indicatorSettings.indicator,
          indicatorSettings: { ...indicatorSettings },
        });
      }
    }
    setShowIndicatorModal(false);
    setCurrentEditingCondition(null);
    setIsSecondaryIndicator(false);
  };

  const openIndicatorModal = (groupId, conditionId) => {
    setCurrentEditingCondition({ groupId, conditionId });
    setShowIndicatorModal(true);
  };

  const updateConditionOperator = (groupId, conditionId, newOperator) => {
    updateCondition(groupId, conditionId, { operator: newOperator });
  };

  const removeCondition = (groupId, conditionId) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            items: group.items.filter(
              (item) =>
                !(item.type === "condition" && item.data.id === conditionId)
            ),
          };
        }
        return group;
      })
    );
  };

  const ConditionRow = ({ groupId, condition, isFirst, isNested }) => {
    const handleTypeChange = (newType) => {
      let updates = {
        type: newType,
        option: "",
        value: "",
        comparisonType: "",
        secondaryIndicator: null,
      };

      if (newType === "Strategy") {
        updates.subType = "RSI-MACD Confluence";
        updates.option = "Bullish";
      } else if (newType === "Pattern") {
        updates.subType = patterns[0];
      } else if (newType === "Indicator") {
        setCurrentEditingCondition({ groupId, conditionId: condition.id });
        setShowIndicatorModal(true);
      }

      updateCondition(groupId, condition.id, updates);
    };

    const handleStrategyChange = (strategy) => {
      const options = getStrategyOptions(strategy);
      updateCondition(groupId, condition.id, {
        subType: strategy,
        option: options[0],
      });
    };

    const handleComparisonTypeChange = (type) => {
      updateCondition(groupId, condition.id, {
        comparisonType: type,
        value: "",
        secondaryIndicator: null,
      });
    };

    const openSecondaryIndicatorModal = () => {
      setIsSecondaryIndicator(true);
      setCurrentEditingCondition({ groupId, conditionId: condition.id });
      setShowIndicatorModal(true);
    };

    const formatIndicatorSettings = (settings) => {
      if (!settings) return "";

      const parts = [settings.indicator];

      if (settings.length) {
        parts.push(`Length: ${settings.length}`);
      }
      if (settings.deviation) {
        parts.push(`Deviation: ${settings.deviation}`);
      }
      if (settings.source) {
        parts.push(`Source: ${settings.source}`);
      }
      return parts.join(" , ");
    };

    return (
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:flex-1">
            <select
              className="w-full bg-[#1A1625] text-white rounded px-3 py-2 appearance-none"
              value={condition.type || ""}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Indicator">Indicator</option>
              <option value="Strategy">Strategy</option>
              <option value="Pattern">Pattern</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Show selected indicator name */}
          {condition.type === "Indicator" && condition.indicatorSettings && (
            <div className="relative w-full sm:flex-1">
              <input
                type="text"
                className="w-full bg-[#1A1625] text-white rounded px-3 py-2"
                value={formatIndicatorSettings(condition.indicatorSettings)}
                readOnly
              />
            </div>
          )}

          {condition.type === "Strategy" && (
            <div className="relative w-full sm:flex-1">
              <select
                className="w-full bg-[#1A1625] text-white rounded px-3 py-2 appearance-none"
                value={condition.subType || ""}
                onChange={(e) => handleStrategyChange(e.target.value)}
              >
                {strategies.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}

          {condition.type === "Pattern" && (
            <div className="relative w-full sm:flex-1">
              <select
                className="w-full bg-[#1A1625] text-white rounded px-3 py-2 appearance-none"
                value={condition.subType || ""}
                onChange={(e) =>
                  updateCondition(groupId, condition.id, {
                    subType: e.target.value,
                  })
                }
              >
                {patterns.map((pattern) => (
                  <option key={pattern} value={pattern}>
                    {pattern}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}
          {/* Third dropdown - Strategy Options */}
          {condition.type === "Strategy" && condition.subType && (
            <div className="relative w-full sm:flex-1">
              <select
                className="w-full bg-[#1A1625] text-white rounded px-3 py-2 appearance-none"
                value={condition.option || ""}
                onChange={(e) =>
                  updateCondition(groupId, condition.id, {
                    option: e.target.value,
                  })
                }
              >
                {getStrategyOptions(condition.subType).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}

          {/* Third dropdown - Operators */}
          {condition.type === "Indicator" && condition.indicatorSettings && (
            <div className="relative w-full sm:w-40">
              <select
                className="w-full bg-[#1A1625] text-white rounded px-3 py-2 appearance-none"
                value={condition.option || ""}
                onChange={(e) =>
                  updateCondition(groupId, condition.id, {
                    option: e.target.value,
                  })
                }
              >
                {getOperators(condition.type).map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}

          {/* Fourth dropdown - Value/Indicator selection */}
          {condition.type === "Indicator" && condition.indicatorSettings && (
            <div className="relative w-full sm:w-40">
              <select
                className="w-full bg-[#1A1625] text-white rounded px-3 py-2 appearance-none"
                value={condition.comparisonType || ""}
                onChange={(e) => handleComparisonTypeChange(e.target.value)}
              >
                <option value="">Select Type</option>
                {comparisonTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}

          {/* Fifth field - Value input or Indicator selector */}
          {condition.type === "Indicator" &&
            condition.comparisonType === "Value" && (
              <input
                type="number"
                placeholder="Value"
                value={condition.value || ""}
                onChange={(e) =>
                  updateCondition(groupId, condition.id, {
                    value: e.target.value,
                  })
                }
                className="w-full sm:flex-1 bg-[#1A1625] text-white rounded px-3 py-2"
              />
            )}

          {condition.type === "Indicator" &&
            condition.comparisonType === "Indicator" && (
              <div className="relative w-full sm:flex-1">
                <input
                  type="text"
                  onClick={openSecondaryIndicatorModal}
                  className="w-full bg-[#1A1625] text-white rounded px-3 py-2"
                  value={
                    formatIndicatorSettings(condition.secondaryIndicator) ||
                    "Select Second Indicator"
                  }
                  readOnly
                />
              </div>
            )}
          <div className="flex gap-2">
            {condition.type !== "Strategy" && (
              <button className="p-2 hover:bg-gray-700 rounded">
                <Settings className="h-5 w-5 text-gray-400" />
              </button>
            )}

            {!isFirst && (
              <button
                className="p-2 hover:bg-gray-700 rounded"
                onClick={() => removeCondition(groupId, condition.id)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const GroupOperator = ({
    itemIndex,
    groupId,
    operator,
    onOperatorChange,
    isNested,
  }) => {
    return (
      <div className="flex justify-center my-4">
        <div className="relative">
          <select
            className="bg-[#1A1625] text-white rounded px-6 py-1 appearance-none min-w-[100px] text-center"
            value={operator}
            onChange={(e) =>
              onOperatorChange(groupId, itemIndex, e.target.value)
            }
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
    );
  };

  const ConditionGroup = ({ group, depth = 0, parentGroupId = null }) => {
    const isNested = depth > 0;

    return (
      <div
        className={`rounded-lg p-2 sm:p-4 ${
          isNested ? "bg-[#1D2049]" : "bg-[#1D2049]"
        }`}
      >
        {!isNested ? (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h2 className="text-white font-medium">
              Condition Group {group.id}
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => addCondition(group.id)}
                className="flex-1 sm:flex-none px-3 py-1 bg-[#220C39] hover:bg-purple-700 text-white rounded-md text-sm"
              >
                + Add Condition
              </button>
              <button
                onClick={() => addNestedGroup(group.id)}
                className="flex-1 sm:flex-none px-3 py-1 bg-[#220C39] hover:bg-purple-700 text-white rounded-md text-sm"
              >
                + Add Nested Group
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Nested Group {group.id}</h3>
            <button
              onClick={() => removeNestedGroup(parentGroupId, group.id)}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
          </div>
        )}

        {group.items.map((item, index) => (
          <React.Fragment key={`${item.type}-${item.data.id}`}>
            {item.type === "condition" ? (
              <>
                <ConditionRow
                  groupId={group.id}
                  condition={item.data}
                  isFirst={index === 0}
                  isNested={isNested}
                />
                {index < group.items.length - 1 && (
                  <GroupOperator
                    itemIndex={index}
                    groupId={group.id}
                    operator={item.data.operator}
                    onOperatorChange={updateItemOperator}
                    isNested={isNested}
                  />
                )}
              </>
            ) : (
              <>
                <ConditionGroup
                  group={item.data}
                  depth={depth + 1}
                  parentGroupId={group.id}
                />
                {index < group.items.length - 1 && (
                  <GroupOperator
                    itemIndex={index}
                    groupId={group.id}
                    operator={item.operator}
                    onOperatorChange={updateItemOperator}
                    isNested={isNested}
                  />
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-white">
    <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-4 mb-8">
      {/* Take Profit Section */}
      <div className="flex-1 bg-[#FAF5FF38] border border-[#B039FF] rounded-lg p-4">
        <label className="block text-white mb-2">Take Profit</label>
        <div className="flex gap-4">
          <select
            className="bg-gray-900 text-white border border-[#B039FF] rounded px-3 py-2 w-full md:w-48 focus:outline-none"
            defaultValue="Fixed"
          >
            <option>Fixed</option>
          </select>
          <input
            type="text"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            className="bg-gray-900 text-white border border-[#B039FF] rounded px-3 py-2 w-full md:w-48 focus:outline-none"
          />
        </div>
      </div>
  
      {/* Stop Loss Section */}
      <div className="flex-1 bg-[#FAF5FF38] border border-[#B039FF] rounded-lg p-4">
        <label className="block text-white mb-2">Stop Loss</label>
        <div className="flex gap-4">
          <select
            className="bg-gray-900 text-white border border-[#B039FF] rounded px-3 py-2 w-full md:w-48 focus:outline-none"
            defaultValue="Fixed"
          >
            <option>Fixed</option>
          </select>
          <input
            type="text"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="bg-gray-900 text-white border border-[#B039FF] rounded px-3 py-2 w-full md:w-48 focus:outline-none"
          />
        </div>
      </div>
    </div>
  
    {groups.map((group) => (
      <ConditionGroup key={group.id} group={group} />
    ))}
  
    <div className="bg-[#6A11CB] text-white p-3 mt-10 rounded-lg mb-6">
      Preview: Add conditions to see the formula
    </div>
  
    <div className="flex flex-col w-full md:flex-row justify-center gap-6 space-y-4 md:space-y-0 mt-8">
      <button className="px-6 py-2 border border-[#B266FF] rounded text-white bg-[#220C39]">
        Cancel
      </button>
      <button className="px-6 py-2 rounded bg-[#B039FF] text-white">
        Save
      </button>
    </div>
  
    {showIndicatorModal && (
      <IndicatorModal
        onClose={() => setShowIndicatorModal(false)}
        onSubmit={handleIndicatorSubmit}
      />
    )}
  </div>
  );
};

export default ExitRules;
