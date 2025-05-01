import React from "react";

const cardData = [
  { index: "NIFTY 50", change: "+0.6%", value: "22,714", color: "text-[#00D200]", progress: 40 },
  { index: "SENSEX", change: "+0.6%", value: "74,571", color: "text-[#00D200]", progress: 35 },
  { index: "BANK NIFTY", change: "+0.6%", value: "48,123", color: "text-[#00D200]", progress: 50 },
  { index: "MIDCAP", change: "+0.6%", value: "45,982", color: "text-[#00D200]", progress: 45 },
  { index: "FINNIFTY", change: "-0.6%", value: "21,345", color: "text-[#AB0505]", progress: 30 },
];

function NiftyCards() {
  return (
    <div className="w-full px-2 py-1 sm:px-4 sm:py-2 md:px-6 md:py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="w-full h-[160px] rounded-xl px-5 py-4 shadow-md border border-gray-700 flex flex-col"
          >
            <h3 className="text-white font-gilroy font-medium">{card.index}</h3>
            <p className={`text-sm font-semibold font-gilroy mt-1 ${card.color}`}>{card.change}</p>
            <p className="text-[#2575FC] text-xl font-semibold mt-2">{card.value}</p>

            
            <div className="mt-auto pt-4">
              <div className="relative w-full h-[6px] bg-[#D9D9D9] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#2575FC]"
                  style={{ width: `${card.progress}%`, borderRadius: "9999px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NiftyCards;
