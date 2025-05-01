import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const testimonials = [
  {
    quote:
      "Achieved 3x increase in course completion rates and 85% student satisfaction after implementing our education platform.",
    name: "MS Trading Academy",
    industry: "Financial Education Services",
  },
  {
    quote:
      "Realized 22% improvement in portfolio performance and 40% reduction in analysis time using our institutional trading signals.",
    name: "Equisense Research",
    industry: "Wealth Management Firm",
  },
  {
    quote:
      "Experienced 35% increase in client retention and 42% growth in trading volume within 6 months of implementing our white-label solution.",
    name: "TradeMagic Educare",
    industry: "Financial and Brokerage Services",
  },
];

const faqs = [
  {
    question: "What trading assets does TradeXpert support?",
    answer:
      "Our platform supports multiple asset classes including equities, forex, cryptocurrencies, and F&O (futures and options). We provide comprehensive coverage across global markets with over 1,000 financial instruments.",
  },
  {
    question: "How long does implementation typically take?",
    answer:
      "Implementation timelines vary by service package and customization needs. Most setups follow our proven 6-phase process: Discovery (1-2 weeks), Setup (2-3 weeks), Development (3-4 weeks), Testing (1-2 weeks), Deployment (1 week), and ongoing Support.",
  },
  {
    question: "What makes your AI algorithms different?",
    answer:
      "Our algorithms combine reinforcement learning, neural networks, and proprietary pattern recognition systems. Unlike competitors, we integrate sentiment analysis with technical indicators and provide multi-timeframe signals with documented backtesting results.",
  },
  {
    question: "Do you offer white-label solutions?",
    answer:
      "Yes, our white-label platform allows businesses to offer our technology under their own brand with complete visual customization, custom domains, and tailored feature sets based on client needs.",
  },
  {
    question: "Can I integrate with my existing systems?",
    answer:
      "Absolutely! We offer comprehensive API services and custom webhook integrations that connect seamlessly with your existing platforms, CRMs, and brokerage accounts.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "Support varies by package from business hours to 24/7 dedicated support. All plans include technical assistance, while premium tiers include dedicated account managers, strategy consultations, and implementation specialists.",
  },
  {
    question: "How accurate are your trading signals?",
    answer:
      "Our signals achieve 98% accuracy in identifying specific technical patterns. However, all trading carries risk, and past performance isn't indicative of future results. We provide detailed backtesting reports for transparency.",
  },
  {
    question: "Can you customize trading strategies for specific needs?",
    answer:
      "Yes, we develop custom algorithms tailored to your specific requirements. Our team works closely with you to understand your investment philosophy and builds strategies that align with your objectives and risk parameters.",
  },
  {
    question: "What security measures do you implement?",
    answer:
      "We maintain enterprise-grade encryption, secure cloud infrastructure on AWS/Azure, regular security audits, and compliance with financial regulations including GDPR and relevant data protection standards.",
  },
  {
    question: "Do you offer educational resources?",
    answer:
      "Yes, we provide comprehensive educational resources including structured learning modules, webinars, strategy libraries, and simulated trading environments. Our certification programs and mentoring options are available in premium packages.",
  },
];

export default function TestimonialsAndFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq_bg text-white px-6 py-16 font-euclid w-full flex justify-center">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-euclid font-bold mb-2">
          Trusted by Financial Industry Leaders
          </h2>
          <p className="text-white  font-regular font-euclid">
          See how businesses like yours achieve success with TradeXpert{" "}
            <span className="text-[#B27AFF] font-semibold">TradeXpert</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 mb-20">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#B039FF] p-6 text-left border border-[#B27AFF33] bg-[linear-gradient(123.67deg,_rgba(255,255,255,0.07)_-1.5%,_rgba(255,255,255,0)_98.37%)] shadow-md"
            >
              {/* <div className="flex items-center mb-4">
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border-2 border-[#B27AFF]"
                />
              </div> */}
              <p className="italic font-euclid text-white mb-6 leading-relaxed">
                {item.quote}
              </p>
              <p className="text-white font-euclid font-semibold text-base mb-1">
                {item.name}
              </p>
              <p className="italic text-sm font-euclid text-white">
                {item.industry}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-euclid font-bold mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-[#DFDFDF] font-regular font-euclid">
              Answers to common questions about our services, process, and what
              sets us apart.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#1F1929] border border-[#480096] rounded-xl p-4"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex justify-between items-center text-left text-white font-semibold text-base focus:outline-none"
                >
                  {faq.question}
                  <span className="ml-2 text-white font-regular font-euclid">
                    {openIndex === i ? (
                      <div className="bg-[#34036A] rounded-full p-1">
                        <Minus size={20} className="text-white font-sm" />
                      </div>
                    ) : (
                      <div className="bg-[#34036A] rounded-full p-1">
                        <Plus size={20} className="text-white font-sm" />
                      </div>
                    )}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="mt-3 text-sm text-white font-regular font-euclid">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
