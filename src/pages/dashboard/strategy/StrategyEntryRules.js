import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { toastStyles } from "../../../utils";
import axiosInstance from "../../../utils/axiosHelper";
import GroupCondition from "../../../components/GroupCondition";
const defaultGroup = [
  {
    condition: "",
    rules: [
      {
        key: "",
        attribute: "",
        operator: "",
        fieldExpression: "",
        value: "",
        nested: null,
        nestedOperator: "",
        conditionOperator: "",
      },
    ],
  },
];
const StrategyEntryRules = (props) => {
  const [groups, setGroups] = useState([
    {
      condition: "",
      rules: [
        {
          key: "",
          attribute: "",
          operator: "",
          fieldExpression: "",
          value: "",
          nested: null,
          nestedOperator: "",
          conditionOperator: "",
        },
      ],
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(null);
  const [isError, setIsError] = useState(null);

  const validateGroups = useMemo(() => {
    for (const group of groups) {
      for (const rule of group.rules) {
        if (!rule.key || !rule.attribute || !rule.value)
          return "All fields are required (key, attribute, value).";

        if (rule.key === "indicators") {
          if (!rule.fieldExpression || !rule.operator)
            return "Indicators require a field expression and operator.";
        } else {
          if (!rule.category) return "Invalid category in the rule.";
        }
      }
    }
    return "";
  }, [groups]);

  useEffect(() => {
    if (isProcessing !== null && validateGroups) {
      setIsError(validateGroups);
    } else {
      setIsError("");
    }
  }, [groups, isProcessing, validateGroups]);

  useEffect(() => {
    if (
      props?.groups?.length > 0 &&
      JSON.stringify(props?.groups) !== JSON.stringify(groups)
    ) {
      setGroups(props.groups);
    }
  }, [props.groups]);

  // Get Screen Data
  const handleSaveScreener = async () => {
    if (validateGroups) {
      setIsError(validateGroups);
      return;
    }
    try {
      setIsProcessing(true);

      const body = {
        name: props?.strategyName,
        description: props?.description,
        groups,
      };
      if (props?.strategyId) {
        await axiosInstance.put(
          `user/strategy/custom-strategy/${props?.strategyId}`,
          body
        );
      } else {
        await axiosInstance.post("user/strategy/custom-strategy", body);
      }
      toast.success(
        "Great! Your strategy has been saved successfully. ",
        toastStyles
      );
      setGroups(defaultGroup);
      props?.onClose();
      setIsError("");
      // props?.refreshStrategy();
    } catch (err) {
      const e = err.message || "Failed to apply screener.";
      toast.error(e, toastStyles);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-4 lg:p-0 md:p-0 text-white">
        <GroupCondition groups={groups} setGroups={setGroups} />

        {isError && (
          <div className="text-red-500 text-sm">
            <strong>Error:</strong> {isError}
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSaveScreener}
            className={`px-6 py-2 rounded bg-[#B039FF] text-white transition-all duration-300 hover:bg-[#9A2EE6] active:scale-95 ${
              isProcessing ? "cursor-not-allowed" : ""
            }`}
            disabled={isProcessing || isError}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              "Save Strategy"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default StrategyEntryRules;
