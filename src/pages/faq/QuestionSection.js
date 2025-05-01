import React, { useState } from "react";
import cross from "../../assets/images/cross.png";
import faqSection_bg from "../../assets/images/faqSection_bg.png"


function QuestionSection() {
  const [openQuestions, setOpenQuestions] = useState([]);

  const faqData = {
    general: {
      title: "Candlestick Types",
      questions: [
        {
          id: "g1",
          question: "What candlestick types does TradeXpert offer for analysis?",
          answer:
            "TradeXpert offers a variety of candlestick patterns such as Doji, Hammer, Engulfing, and more. These patterns help in identifying market trends, reversals, and potential trade setups.",
        },
        {
          id: "g2",
          question: "How can I use candlestick patterns in my trading strategy?",
          answer: "Candlestick patterns provide insights into market sentiment. By analyzing these patterns on different time frames, you can make more informed decisions about entry and exit points.",
        },
        {
          id: "g3",
          question: "Can I customize the candlestick chart to suit my preferences?",
          answer: "Yes, you can customize your chart display by selecting different candlestick patterns and time frames based on your trading strategy.",
        },
        {
          id: "g4",
          question: "Are candlestick patterns available for all trading assets (equity, crypto, forex)?",
          answer: "Yes, candlestick analysis is available for all asset classes, including equity, cryptocurrency, and forex, providing a unified toolset for diverse market conditions.",
        },
        {
          id: "g5",
          question: "How do I interpret complex candlestick signals?",
          answer: "TradeXpert provides real-time explanations and guides for interpreting candlestick signals, helping you understand the context of each pattern to improve your trading accuracy.",
        },
      ],
    },
    pricing: {
      title: "Chart Patterns",
      questions: [
        {
          id: "p1",
          question: "What chart patterns can I analyze with TradeXpert?",
          answer: " TradeXpert supports a wide range of chart patterns, including head and shoulders, double top/bottom, triangles, and flags, which are essential for forecasting future market movements.",
        },
        {
          id: "p2",
          question: "Can I use chart patterns on multiple timeframes?",
          answer: "Yes, you can analyze chart patterns on different timeframes, allowing you to trade short-term or long-term based on your preferences.",
        },
        {
          id: "p3",
          question: "How can chart patterns help in developing a trading strategy?",
          answer: "By recognizing key chart patterns, you can identify potential trend reversals or continuations, which helps in setting precise buy and sell orders to enhance your strategy.",
        },{
          id: "p4",
          question: "Are chart patterns applicable to all contract types (equity, crypto, forex)?",
          answer: "Yes, TradeXpert’s chart patterns are available across all asset types, ensuring that you can apply your analysis regardless of the market you trade in.",
        },{
          id: "p5",
          question: "Does TradeXpert offer real-time alerts for chart patterns?",
          answer: "Yes, you can set up real-time alerts to notify you when specific chart patterns form, so you can act quickly on potential trading opportunities.",
        },
      ],
    },
    product: {
      title: "Trading Strategies",
      questions: [
        {
          id: "pr1",
          question: "What types of trading strategies are available on TradeXpert?",
          answer: "TradeXpert offers both default and custom trading strategies, designed to cater to various trading styles, from momentum-based to value investing.",
        },
        {
          id: "pr2",
          question: "Can I create my own custom trading strategy?",
          answer: "Yes, TradeXpert allows you to design your own custom strategies by combining various technical indicators and conditions that align with your trading goals.",
        },
        {
          id: "pr3",
          question: "How does the default trading strategy work?",
          answer: "Our default strategies are designed based on historical data and proven technical analysis methods. They provide an effective starting point for both beginners and advanced traders.",
        },
        {
          id: "pr4",
          question: "Can I backtest my strategies before applying them?",
          answer: "Yes, TradeXpert offers a backtesting feature, allowing you to test your strategies against historical data to assess their potential effectiveness.",
        }, {
          id: "pr5",
          question: "Are trading strategies effective across multiple asset classes?",
          answer: "Absolutely. You can apply both default and custom strategies to equities, cryptocurrencies, and forex, adapting to various market dynamics.",
        },
      ],
    },
    trading: {
      title: "Hidden Signals",
      questions: [
        {
          id: "t1",
          question: "What are hidden signals on TradeXpert?",
          answer: " Hidden signals are advanced trading indicators that identify subtle market trends and price movements that may not be visible through traditional analysis methods.",
        },
        {
          id: "t2",
          question: " How do I spot hidden signals in my charts?",
          answer: "TradeXpert’s advanced algorithms highlight hidden signals directly on your charts, making it easy to spot them without manual analysis.",
        },
        {
          id: "t3",
          question: "Are hidden signals reliable for predicting market movements?",
          answer: "While no tool guarantees 100% accuracy, hidden signals are based on complex market analysis, providing valuable insights that enhance your decision-making process.",
        },
        {
          id: "t4",
          question: "Can hidden signals be used in conjunction with candlestick or chart pattern analysis?",
          answer: "Yes, hidden signals can be combined with candlestick and chart pattern analysis to confirm potential trends, increasing the reliability of your trades.",
        },
        {
          id: "t5",
          question: "Do hidden signals work across different contract types (equity, crypto, forex)?",
          answer: "Yes, hidden signals are applicable across all asset classes, giving you an edge whether you are trading in equities, crypto, or forex markets.",
        },
      ],
    },
    news: {
      title: "Real News",
      questions: [
        {
          id: "n1",
          question: "What type of real-time news does TradeXpert provide?",
          answer: "TradeXpert delivers real-time financial news, including market updates, economic data releases, company earnings reports, and geopolitical events that could impact asset prices.",
        },
        {
          id: "n2",
          question: "How does real news affect my trading decisions?",
          answer: "Staying updated with real news helps you anticipate market reactions to events and adjust your trades accordingly, allowing you to make timely and informed decisions.",
        },
        {
          id: "n3",
          question: "Can I filter news by specific markets or assets?",
          answer: "Yes, you can filter news based on asset classes like equities, crypto, or forex, helping you stay focused on relevant developments.",
        },
        {
          id: "n4",
          question: "Is real news available for all trading contracts (equity, crypto, forex)?",
          answer: "Yes, TradeXpert provides real-time news across all contract types, ensuring you are well-informed about events impacting various markets.",
        },
        {
          id: "n5",
          question: "How do I receive notifications for important news events?",
          answer: "You can set up personalized notifications to alert you about significant market-moving events, ensuring that you never miss crucial information.",
        },
      ],
    },
    coommonsense: {
      title: "Commonsense Trading",
      questions: [
        {
          id: "cm1",
          question: "What is common sense trading on TradeXpert?",
          answer: "Commonsense trading is about applying simple, effective trading principles, such as managing risk, setting realistic goals, and using technical analysis to make more logical and less emotional decisions.",
        },
        {
          id: "cm2",
          question: "How does common sense trading improve my performance?",
          answer: "By following commonsense principles, you avoid impulsive decisions and focus on strategies that are grounded in market reality, leading to better long-term results.",
        },
        {
          id: "cm3",
          question: "Does TradeXpert offer guidance on common sense trading?",
          answer: "Yes, TradeXpert offers educational resources and tools that emphasize common sense trading, helping you build a disciplined approach to the markets.",
        },
        {
          id: "cm4",
          question: "Can commonsense trading be applied across all assets (equity, crypto, forex)?",
          answer: "Absolutely. Commonsense trading principles are universal and can be applied to equities, crypto, and forex markets for consistent and rational decision-making.",
        },
        {
          id: "cm5",
          question: "Are there specific strategies within commonsense trading for each contract type?",
          answer: "Yes, TradeXpert’s commonsense trading strategies are tailored to each asset class, ensuring you can implement sensible and strategic approaches regardless of the market.",
        },
      ],
    },
  };

  // Modified toggle function to handle multiple open questions
  const toggleQuestion = (questionId) => {
    if (openQuestions.includes(questionId)) {
      // Remove question from open questions if it's already open
      setOpenQuestions(openQuestions.filter((id) => id !== questionId));
    } else {
      // Add question to open questions if it's closed
      setOpenQuestions([...openQuestions, questionId]);
    }
  };

  return (
    <>
      <div 
        style={{
          backgroundImage: `url(${faqSection_bg})`,
          backgroundSize: "cover",
          // backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="max-w-6xl mx-auto container">
          {/* Heading Section */}
          <div className="container p-5 mb-6">
            <h1 className="lg:text-5xl md:text-3xl text-2xl text-center font-gilroy text-white font-bold flex justify-center">
              FAQs
            </h1>
            <p className="text-[#B039FF] flex justify-center mt-4 lg:text-lg md:text-base text-base font-light text-center lg:px-24 md:px-16 px-2">
              Find answers to some common questions others have asked
            </p>
          </div>

          <div className="relative h-[10px] overflow-hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 10"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient
                  id="borderGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
               
                >
                  <stop offset="0%" style={{ stopColor: "#AD4AFF" }} />
                  <stop offset="100%" style={{ stopColor: "#2575FC" }} />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="1.5"
                    result="blur"
                  />
                  <feComposite in="blur" operator="over" />
                </filter>
              </defs>

              <rect
                x="0"
                y="0"
                width="600"
                height="1"
                fill="url(#borderGradient)"
                opacity="0.4"
                filter="url(#glow)"
              />
            </svg>
          </div>

          {/* FAQ Section with top padding to create spacing below the highlighted line */}
          <div className="container gap-8 lg:pt-20 pt-16 p-8">
            {Object.entries(faqData).map(([section, data]) => (
              <div key={section} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center">
                    <img src={cross} alt="Icon" className="h-7 w-7" loading="lazy"/>
                  </div>
                  <h2 className="lg:text-2xl text-xl py-4 font-gilroy font-bold text-white">
                    {data.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {data.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`rounded-lg transition-all duration-300 ${
                        openQuestions.includes(q.id)
                          ? "text-white shadow-lg bg-blur bg-[radial-gradient(90%_116%_at_50%_0%,_rgba(168,113,255,0.4)_0%,_#1A0E27_100%)]"
                          : "bg-purple-900/20"
                      }`}
                    >
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full text-left p-4 flex justify-between items-center"
                      >
                        <span className="text-white font-gilroy font-medium lg:text-lg text-base">
                          {q.question}
                        </span>
                        <span className="text-purple-400 text-xl">
                          {openQuestions.includes(q.id) ? "−" : "+"}
                        </span>
                      </button>
                      {openQuestions.includes(q.id) && (
                        <div className="px-4 pb-4 font-gilroy font-medium md:text-base text-sm">
                          {q.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionSection;
