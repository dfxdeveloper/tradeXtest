import React from "react";
import { MessageCircle, Share2 } from "lucide-react";

const MarketPulse = () => {
  return (
    <div className="text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Sentiment */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Market Pulse</h1>
          <div className="flex items-center gap-2">
            <div className="bg-[#13B213] text-md font-medium text-white p-2 rounded-lg">
              Bullish 65%
            </div>
            <div className="bg-[#DD3535] text-md font-medium text-white p-2 rounded-lg">
              Bearish 35%
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {/* Card 1 */}
          <div className="bg-[#4C2864] rounded-xl mt-10 p-6 shadow-lg mb-10">
            <div className="relative -mt-10 mb-4">
              <span className="bg-white text-purple-700 text-sm font-semibold px-4 py-2 rounded-full">
                Live Update
              </span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Nifty IT showing string momentum after US tech rally
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/50e2/bbc2/3961dfb1fb031d40ddc0d9f18d6f6392?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T92gvlGQodVBFPnk24ITHi2qXdIVuukeJDJgYg3yJIRLFCcSrgsv4jF2hJkYvJDAaPputHhkNhEqbvoGCi0QC91BVqCtDv08FBG8Gi14LSscx~m6~g6Vz~gu0hLjwtLoZIv1J1LuX-GkuEMs3yQYPK45C2eaC~CNaMbjF5M34sHecjld7GLxztKyIEEE5Kq0KgPbxyDGfSkRddAo-jBHIUYMOvLEUPpyyjgFN5UkVSRRNk3o-sizROaWnyOQhoOraZvzVfi6SLjvXVD82rPaWa7xiHA-BZhzoog-Gfzxvf~Pt0NE9GXUidJDB69kywZ-qznMS4XTCuxcRFIKXwD2Jw__"
                    alt="Priya Mehta"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Priya Mehta</h3>
                    <span className="text-xs bg-[#533E6A] border border-[#B039FF] text-white p-2 rounded-lg">
                      Top IT Analyst
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#E2E2E2]">
                  Learn how to identify market cycles using technical indicators and make informed trading decisions.
                </p>
              </div>
              <p className="text-md text-[#FCFCFC]">Just Now</p>
            </div>
            <div className="flex gap-4 mt-4 text-[#FFD6FF]">
              <div className="flex items-center gap-1 cursor-pointer">
                <MessageCircle size={16} />
                <span>Discuss</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <Share2 size={16} />
                <span>Share</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#4C2864] rounded-xl p-6 shadow-lg">
            <div className="relative -mt-10 mb-4">
              <span className="bg-white text-purple-700 text-sm font-semibold px-4 py-2 rounded-full">
                Breaking News
              </span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  RBI keeps repo rate unchanged at 6.5%
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Positive for</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-[#533E6A] border border-[#B039FF] p-2 rounded-lg text-xs">
                        Bank
                      </span>
                      <span className="bg-[#533E6A] border border-[#B039FF] p-2 rounded-lg text-xs">
                        Real Estate
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Negative for</p>
                    <div className="flex gap-2 mt-2">
                      <span className="bg-[#533E6A] border border-[#B039FF] p-2 rounded-lg text-xs">
                        IT
                      </span>
                      <span className="bg-[#533E6A] border border-[#B039FF] p-2 rounded-lg text-xs">
                        FMCG
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/50e2/bbc2/3961dfb1fb031d40ddc0d9f18d6f6392?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T92gvlGQodVBFPnk24ITHi2qXdIVuukeJDJgYg3yJIRLFCcSrgsv4jF2hJkYvJDAaPputHhkNhEqbvoGCi0QC91BVqCtDv08FBG8Gi14LSscx~m6~g6Vz~gu0hLjwtLoZIv1J1LuX-GkuEMs3yQYPK45C2eaC~CNaMbjF5M34sHecjld7GLxztKyIEEE5Kq0KgPbxyDGfSkRddAo-jBHIUYMOvLEUPpyyjgFN5UkVSRRNk3o-sizROaWnyOQhoOraZvzVfi6SLjvXVD82rPaWa7xiHA-BZhzoog-Gfzxvf~Pt0NE9GXUidJDB69kywZ-qznMS4XTCuxcRFIKXwD2Jw__"
                    alt="Vivek Kumar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Vivek Kumar</h3>
                    <span className="text-xs bg-[#533E6A] border border-[#B039FF] p-2 rounded-lg ">
                      Monetary policy expert
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#E2E2E2] mt-4">
                  Learn how to identify market cycles using technical indicators and make informed trading decisions.
                </p>
              </div>
              <p className="text-md text-[#FCFCFC]">10m ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;