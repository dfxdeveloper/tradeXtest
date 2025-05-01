import React from "react";
import Arrow from "../../assets/images/whyarrow.png";
import First from "../../assets/images/expertise.svg";
import Second from "../../assets/images/advance-technology.svg";
import Ecosystem from "../../assets/images/ecosystem.svg";
import Partnership from "../../assets/images/partnership.svg";
const WhyInvestors = () => {
  return (
    <section className="bg-[#0D0B21] py-16 relative">
      <div className="container relative">
        {/* Center Title */}
        <div className="text-center pb-10 md:pt-64 xl:pt-20 lg:pt-64 md:mb-0 md:absolute md:left-1/2 md:top-96 md:-translate-x-1/2 md:-translate-y-1/2 z-10">
          <h1 className="text-white text-4xl md:text-5xl font-bold whitespace-nowrap">
            Why Investors
            <br />
            Trust Us
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-80 xl:gap-80 gap-10 md:gap-6 relative  mx-auto">
          {/* Left Column */}
          <div className="space-y-12 md:space-y-56 lg:space-y-56 xl:space-y-56">
            {/* Card 1 */}
            <div className="">
              <div className="relative bg-[#2C2F3A] rounded-2xl py-5 px-2 lg:p-4 lg:p-6 md:p-6 border border-[#B039FF] shadow-lg md:h-[400px] h-[420px] xl:h-[300px] lg:h-[420px]">
                <div className="flex gap-4">
                  <div className="bg-white w-20 h-20 rounded-lg flex-shrink-0">
                    <img
                      src={First}
                      alt="Regulatory"
                      className="w-20 h-20 p-2"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-white text-md lg:text-xl md:text-xl font-bold mb-4">
                      Proven Track Record & Expertise
                    </h3>
                    <ul className="text-white/80 space-y-3 text-sm">
                      <li>
                        • Over 1,000+ successful trading signals delivered with
                        precision.
                      </li>
                      <li>
                        • Expert team of veteran traders and quantitative
                        analysts.
                      </li>
                      <li>
                        • Consistent, audited & backtested performance across
                        various market cycles.
                      </li>
                      <li>
                        • Proprietary trading algorithms that provide reliable
                        insights.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="leftside">
                  <img src={Arrow} alt="arrow" loading="lazy" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative">
              <div className="bg-[#2C2F3A] rounded-2xl py-5 px-2 lg:p-4 lg:p-6 md:p-6 border border-[#B039FF] shadow-lg md:h-[400px] h-[420px] xl:h-[300px] lg:h-[420px]">
                <div className="flex gap-4">
                  <div className="bg-white w-20 h-20 rounded-lg flex-shrink-0">
                    <img
                      src={Second}
                      alt="Technology"
                      className="w-20 h-20 p-2"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">
                      Advanced Technology Infrastructure:
                    </h3>
                    <ul className="text-white/80 space-y-3 text-sm">
                      <li>• 99.9% uptime guarantee for seamless trading.</li>
                      <li>• Real-time data sourced from premium providers.</li>
                      <li>
                        • AI-powered analysis engines for enhanced insights.
                      </li>
                      <li>
                        • Enterprise-level execution speed for optimal
                        performance.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bottomleftside">
                  <img src={Arrow} alt="arrow" loading="lazy" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12 md:space-y-56 lg:space-y-56 xl:space-y-56">
            {/* Card 3 */}
            <div className="">
              <div className="relative bg-[#2C2F3A] rounded-2xl py-5 px-2 lg:p-4 lg:p-6 md:p-6 border border-[#B039FF] shadow-lg md:h-[400px] xl:h-[300px] h-[420px] lg:h-[420px]">
                <div className="rightside">
                  <img src={Arrow} alt="arrow" loading="lazy" />
                </div>
                <div className="flex gap-4">
                  <div className="bg-white w-20 h-20 rounded-lg flex-shrink-0">
                    <img
                      src={Ecosystem}
                      alt="Support"
                      className="w-20 h-20 p-2"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">
                      Comprehensive Support Ecosystem
                    </h3>
                    <ul className="text-white/80 space-y-3 text-sm">
                      <li>
                        • 24/7 dedicated customer support for all inquiries.
                      </li>
                      <li>• Regular platform updates and enhancements.</li>
                      <li>• Live market guidance from experienced analysts.</li>
                      <li>
                        • Continuous learning resources for ongoing development.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="">
              <div className="relative bg-[#2C2F3A] rounded-2xl py-5 px-2 lg:p-4 lg:p-6 md:p-6 border border-[#B039FF] shadow-lg md:h-[400px] xl:h-[300px] h-[420px] lg:h-[420px]">
                <div className="rightbottomside">
                  <img src={Arrow} alt="arrow" loading="lazy" />
                </div>
                <div className="flex gap-4">
                  <div className="bg-white w-20 h-20 rounded-lg flex-shrink-0">
                    <img
                      src={Partnership}
                      alt="Track Record"
                      className="w-20 h-20 p-2"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4">
                      Regulatory Excellence & Partnerships:
                    </h3>
                    <ul className="text-white/80 space-y-3 text-sm">
                      <li>
                        • Collaborations with SEBI-registered research analysts.
                      </li>
                      <li>
                        • Strict adherence to regulatory compliance standards.
                      </li>
                      <li>• Transparent and audited performance tracking.</li>
                      <li>• Institutional-grade risk management protocols.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInvestors;
