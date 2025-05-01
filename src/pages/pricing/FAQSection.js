import React, { useState } from 'react';

const FAQSection = () => {
  // Sample FAQ data
  const faqs = [
    {
      question: "What services does TradeXpeart offer?",
      answer: "We offer comprehensive trading solutions including market analysis, real-time trading signals, portfolio management, and educational resources."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity, but typically range from 2-8 weeks for full implementation."
    },
    {
      question: "Do you offer ongoing support after the website launch?",
      answer: "Yes, we provide continuous support and maintenance services to ensure your trading platform runs smoothly."
    },
    {
      question: "Can I see examples of your previous work?",
      answer: "Yes, we have a portfolio of successful projects and can provide case studies upon request."
    },
    {
      question: "What is your pricing structure like?",
      answer: "We offer flexible pricing plans tailored to your specific needs and trading volume."
    },
    {
      question: "Do you provide hosting services?",
      answer: "Yes, we offer secure and reliable hosting solutions optimized for trading platforms."
    },
    {
      question: "How do you handle revisions during the process?",
      answer: "We have a structured revision process with multiple review phases to ensure satisfaction."
    },
    {
      question: "Can you help with content creation for my website?",
      answer: "Yes, our team includes content specialists who can create engaging trading-related content."
    },
    {
      question: "Is SEO included in your web design packages?",
      answer: "Yes, all our packages include basic SEO optimization with options for advanced SEO services."
    },
    {
      question: "What makes TradeXpeart different from other agencies?",
      answer: "Our specialized focus on trading platforms and deep industry expertise sets us apart."
    }
  ];

  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState(null);

  // Toggle FAQ open/close
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#020204] bg-gradient-to-l from-[#020204] via-[#0f0117] to-[#4e1276] p-4 md:p-8 lg:p-12">
      {/* Purple Gradient Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-30"
            
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto text-center mb-12">
        <div className="inline-block px-4 py-1 font-gilroy bg-purple-900/50 rounded-full text-purple-300 text-sm mb-4">
          FAQ's
        </div>
        <h2 className="lg:text-5xl md:text-3xl text-2xl font-gilroy font-bold text-white mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-gilroy">
          Answers to common questions about our services, processes, and what sets us apart.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto relative">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur rounded-2xl overflow-hidden border border-purple-500/20"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full p-6 text-left flex justify-between items-center hover:bg-purple-900/20 transition-all duration-200"
            >
              <span className="text-white font-medium font-gilroy">{faq.question}</span>
              <span className={`text-purple-500 transition-transform duration-200 ${
                openFaq === index ? 'rotate-45' : ''
              }`}>
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                openFaq === index ? 'max-h-96 p-6 pt-0' : 'max-h-0'
              }`}
            >
              <p className="text-gray-300 font-gilroy">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions Section */}
      <div className="mt-12 text-center relative">
        <div className="inline-flex items-center gap-4">
          <span className="text-gray-300">Still Have a Question</span>
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors duration-200">
            Ask Question
          </button>
        </div>
      </div>

      {/* CSS for twinkling stars animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default FAQSection;