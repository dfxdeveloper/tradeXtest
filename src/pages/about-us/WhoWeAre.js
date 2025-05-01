import React from "react";

const StatsCard = ({ number, label }) => (
  <div className="about_cardbg p-8 rounded-2xl backdrop-blur-sm w-full flex flex-col items-center h-[180px]">
    <h2 className="text-4xl font-bold text-[#E5EBFF] font-euclid text-center mt-6">{number}</h2>
    <p className="text-[#A7ADBE] mt-4 font-euclid font-semibold text-center text-sm">{label}</p>
  </div>
);

const WhoWeAre = () => {
  const stats = [
    {
      number: "100+",
      label: "Active Clients"
    },
    {
      number: "5,000+",
      label: "High-Quality Signals Delivered"
    },
    {
      number: "99%",
      label: "Accuracy in Trade Signals"
    },
    {
      number: "100+",
      label: "Top Trading Experts Guiding Your Success"
    }
  ];

  return (
    <div className="bg-[#0E0018] mb-16 lg:mb-0 about_whoweare font-euclid flex items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} number={stat.number} label={stat.label} />
            ))}
          </div>

          {/* Mission Section */}
          <div className="flex flex-col justify-center">
            <div>
              <span className="inline-block bg-[#170026] text-[#B039FF] font-euclid font-regular text-sm px-4 py-2.5 rounded-full mb-6 border border-[#6A11CB]">
                Results & Analytics
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-euclid font-semibold text-white mb-6">
              Shaping the Future with Transformative Results
            </h1>

            <p className="text-white font-euclid font-regular leading-relaxed text-sm opacity-80">
              We don't just deliver services, we create lasting impact through
              cutting-edge strategies and data-driven insights. Our results are
              more than numbers—they are a testament to our ability to drive
              growth, foster innovation, and exceed expectations, no matter the
              industry.
              <br/>
              <br/>
               With every project, we push boundaries, turning
              challenges into opportunities and shaping the future of business
              with proven success. Our relentless pursuit of excellence ensures
              that our clients not only meet their goals but surpass them,
              setting new benchmarks in their respective fields.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;