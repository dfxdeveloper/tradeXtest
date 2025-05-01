import React from "react";
import { formatRelativeTime } from "../../utils";

const Card = ({
  customStrategy,
  activeTab,
  onDelete,
  onEdit,
  onUseTemplate,
}) => {
  return (
    <div className="bg-[#52366E] border-2 border-[#B039FF] rounded-xl p-4">
      <h3 className="text-white font-bold font-gilroy mb-1">
        {customStrategy.label}
      </h3>
      <p className="text-white font-regular font-gilroy text-sm mb-4">
        {customStrategy.description}
      </p>

      <div className="mb-2">
        {customStrategy.signals?.length > 0 &&
          customStrategy.signals.map((signal, idx) => (
            <div
              key={`custom-${signal}-${idx}`}
              className="flex items-center bg-[#75528B] p-2 justify-between mb-2"
            >
              <span className="text-white font-regular font-gilroy text-sm">
                {signal.company_label}
              </span>
              <span className="text-white font-regular font-gilroy text-sm">
                {signal.time_interval}
              </span>
              <div className="flex items-center">
                <span className="bg-[#220C39] text-white font-regular font-gilroy text-xs px-2 py-1 rounded-full">
                  {formatRelativeTime(signal.timestamp)}
                </span>
              </div>
            </div>
          ))}
      </div>

      {activeTab === 1 ? (
        <div className="flex space-x-2 mt-4">
          <button
            className="bg-gradient-to-b from-[#BF82FF] to-[#9246E1] border border-[#B039FF] text-white px-6 py-2 rounded-full text-sm font-medium"
            onClick={() => onEdit(customStrategy)}
          >
            Edit
          </button>
          <button
            className="bg-gradient-to-b from-[#ED4444] to-[#C8224C] border border-[#B039FF] text-white px-6 py-2 rounded-full text-sm font-medium"
            onClick={() => onDelete(customStrategy._id)}
          >
            Delete
          </button>
        </div>
      ) : activeTab === 2 ? (
        <div className="flex justify-center mt-4">
          <button
            className="bg-gradient-to-b from-[#A24AFF] to-[#5F219F] text-white px-6 py-2 rounded-full text-sm font-medium"
            onClick={() =>
              onUseTemplate(JSON.parse(JSON.stringify(customStrategy)))
            }
          >
            Use this template
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Card;
