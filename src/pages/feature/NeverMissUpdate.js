import React from "react";
import BitcoinIcon from "../../assets/images/Bitcoin.svg";
import TradeIcon from "../../assets/images/Trade.svg";
import TradingIcon from "../../assets/images/Trading.svg";
import ReportIcon from "../../assets/images/Report.svg";
import StockIcon from "../../assets/images/Stock.svg";

const icons = [
  { id: 1, icon: BitcoinIcon, text: "Decode the Market" },
  { id: 2, icon: TradeIcon, text: "Unlock Market Potential" },
  { id: 3, icon: TradingIcon, text: "Spot the Signals" },
  { id: 4, icon: ReportIcon, text: "Master Indicators" },
  { id: 5, icon: StockIcon, text: "News That Trades" },
];

const NeverMissUpdate = () => {
  return (
    <div className="flex justify-center bg-black p-10 gap-10 flex-wrap">
      {icons.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md text-white border border-[#6A11CB] rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <img
            src={item.icon}
            alt={item.text}
            className="w-6 h-6"
            loading="lazy"
          />
          <span className="text-sm">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default NeverMissUpdate;
