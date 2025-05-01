import React from "react";
import Card from "./Card";
import { CUSTOM_STRATEGY_TEMPLATE } from "../../utils/constants";

const CustomTemplates = ({ onUseTemplate }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CUSTOM_STRATEGY_TEMPLATE.map((d, i) => (
          <Card
            key={`custom-strategy-template-${i}`}
            activeTab={2}
            customStrategy={d}
            onUseTemplate={onUseTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomTemplates;
