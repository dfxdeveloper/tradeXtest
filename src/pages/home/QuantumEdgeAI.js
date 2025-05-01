import React from "react";

const QuantumEdgeAI = () => {
  const features = [
    {
      title: "Quantum Pattern Detection",
      description:
        "Identifies complex market patterns across multiple timeframes using quantum-inspired algorithms",
    },
    {
      title: "Global Market Analysis",
      description:
        "Real-time analysis of interconnected global market movements",
    },
    {
      title: "Smart Research Assistant",
      description:
        "AI-powered research combining fundamental and technical analysis",
    },
    {
      title: "Predictive Analytics",
      description:
        "Forecasts market movements with advanced machine learning models",
    },
    {
      title: "Natural Language Interface",
      description:
        "Ask complex market questions in plain English and get instant insights",
    },
    {
      title: "Personalized Insights",
      description:
        "Custom trading suggestions based on your style and goals",
    },
  ];

  const advantages = [
    {
      title: "01 Superior Analysis",
      description:
        "Forecasts market movements with advanced machine learning models",
    },
    {
      title: "02 Enhanced Decision-Making",
      description:
        "Provides actionable insights through quantum-inspired algorithms",
    },
    {
        title: "03 Advanced Risk Management",
        description:
          "Mitigates risks effectively with predictive analytics and real-time data insights.",
      },
  ];

  return (
    <section className="quantumedge_bg font-Gilroy-Regular text-white">
      <div className="container w-full p-12 ">
        {/* Quantum Edge AI Section */}
        <div className="mb-12 p-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">QuantumEdge AI</h2>
          <p className="text-white mb-8 text-lg">
            Harness quantum-inspired AI for predictive market intelligence
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#220C39] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Quantum Advantage Section */}
        <div className="p-4">
          <h2 className="text-2xl lg:text-3xl mb-4 font-bold ">
            The Quantum Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-[#220C39] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {advantage.title}
                </h3>
                <p className="text-white">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuantumEdgeAI;
