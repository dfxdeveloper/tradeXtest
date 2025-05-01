import { TIME_FRAMES } from "../../utils/constants";

export const TimeSelectDropdown = ({
  label,
  value,
  options,
  onChange,
  icon: Icon,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-purple-600" />
      <span className="text-sm text-white">{label}</span>
    </div>
    <div className="relative w-64">
      <select
        className="block w-full rounded-md bg-[#1A1625] px-4 py-2 text-sm text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option.value || option}
            value={option.value || option}
            className="bg-[#1A1625] text-white"
          >
            {(label === "Timeframe" &&
              TIME_FRAMES.find((el) => el.value === option)?.label) ||
              option.label ||
              option}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export const SelectedStrategies = ({ strategies, onRemove }) => (
  <div className="mb-8 flex flex-wrap items-center gap-4">
    {strategies.map((strategy) => (
      <div key={strategy} className="flex items-center gap-2">
        <span className="text-sm bg-purple-800 py-2 px-4 rounded flex items-center gap-2 capitalize">
          {strategy.replace(/_/g, " ")}
          <button
            onClick={() => onRemove(strategy)}
            className="ml-2 hover:text-red-400"
          >
            ✕
          </button>
        </span>
      </div>
    ))}
  </div>
);
