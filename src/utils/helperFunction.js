import { OPERATORS, MARKET_IDENTIFIER } from "./constants";

export const generateConditionFormula = (group) => {
  // Create a mapping of operator values to their symbols
  const OP = OPERATORS.reduce((acc, op) => {
    acc[op.value] = op.symbol;
    return acc;
  }, {});

  if (!group || !group.rules || group.rules.length === 0) {
    return ""; // Return empty string if the group is invalid or has no rules
  }

  let formula = "";

  group.rules.forEach((rule, index) => {
    let ruleFormula = "";

    if (rule.condition) {
      // Handle nested group
      ruleFormula = generateConditionFormula(rule); // Recursively generate formula for nested rules
    } else {
      // Handle individual rule
      const { key, attribute, operator, value, fieldExpression } = rule;

      if (!key || !attribute || !operator || !value) {
        return; // Skip invalid or empty rules
      }

      if (key === MARKET_IDENTIFIER.Indicator) {
        if (fieldExpression) {
          ruleFormula = `${attribute} ${OP[operator]} ${value}`; // Value is another indicator
        } else {
          ruleFormula = `${attribute} ${OP[operator]} ${value}`; // Value is a literal
        }
      } else if (key === MARKET_IDENTIFIER.Strategy) {
        ruleFormula = `${attribute} ${OP[operator]} ${value}`;
      } else if (key === MARKET_IDENTIFIER.Pattern) {
        ruleFormula = `${attribute} ${OP[operator]} ${value}`;
      }
    }

    if (ruleFormula) {
      if (index > 0) {
        // Replace "AND" with "&&" and "OR" with "||"
        formula += ` ${group.condition === "AND" ? "&&" : "||"} `;
      }
      formula += ruleFormula;
    }
  });

  // Wrap the formula in parentheses only if it contains multiple rules or nested groups
  if (group.rules.length > 1 || group.rules.some((rule) => rule.condition)) {
    return `( ${formula} )`;
  }

  return formula;
};

const OP = OPERATORS.reduce((acc, op) => {
  acc[op.value] = op.symbol;
  return acc;
}, {});

export const generatePreview = (groups) => {
  return groups
    .map((group, groupIndex) => {
      const rulesPreview = group.rules
        .map((rule, ruleIndex) => {
          const operatorSymbol = rule.attribute && OP[rule.operator || "eq"];
          const conditionOperator =
            ruleIndex > 0 && rule.conditionOperator
              ? ` ${rule.conditionOperator.toUpperCase()} `
              : "";
          return `${conditionOperator}${rule.attribute} ${operatorSymbol} ${rule.value}`;
        })
        .join("");

      return groupIndex > 0
        ? ` ${group.condition.toUpperCase()} (${rulesPreview})`
        : `(${rulesPreview})`;
    })
    .join("")
    .replace(/_/g, " ");
};
