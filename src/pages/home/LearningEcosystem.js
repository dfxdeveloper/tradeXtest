import React from "react";
import Learning from "../../assets/images/learning_ecosystem.svg";

const LearningEcosystem = () => {
  return (
    <section className="bg-[#0E051B] border border-[#6A11CB] text-white p-8 rounded-lg flex flex-col lg:flex-row-reverse">
      {/* Right Section: Image (top on mobile/tablet) */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:ml-8">
        <img
          src={Learning}
          alt="Institutional Trading"
          className="rounded-lg shadow-lg w-full h-auto"
          loading="lazy"
        />
      </div>

      {/* Left Section: Content (bottom on mobile/tablet) */}
      <div className="w-full lg:w-1/2">
        <div className="space-y-4">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Learning Ecosystem
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-6">
              Comprehensive education system from basics to advanced trading
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {[
              {
                title: "Live Trading Sessions",
                description:
                  "Learn from professional traders in real-time markets",
              },
              {
                title: "Interactive Simulations",
                description: "Practice with real market conditions risk-free",
              },
              {
                title: "Structured Courses",
                description: "Progressive learning path with certification",
              },
              {
                title: "Expert Mentoring",
                description: "1-on-1 guidance from experienced traders",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#1F0B38] p-4 rounded-lg hover:bg-[#2A0F4C] transition-colors duration-300"
              >
                <h3 className="text-white font-semibold mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningEcosystem;
