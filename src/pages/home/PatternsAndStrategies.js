import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import chart_img from "../../assets/images/chart-photo.png";
import chart_img_2 from "../../assets/images/chart-photo-2.png";

function Card({ image, title, description }) {
  const descriptionLimit = 130;
  const isLongDescription = Array.isArray(description)
    ? false
    : description.length > descriptionLimit;

  return (
    <div
      className="
      bg-[#220C39] 
      border 
      border-[#B039FF] 
      rounded-2xl 
      overflow-hidden 
      p-4 
      flex 
      flex-col 
      h-[500px] 
      items-center 
      text-center
      mx-2
    "
    >
      <img
        src={image}
        alt={title}
        className="
          w-full 
          max-w-[300px] 
          h-48 
          object-cover 
          rounded-2xl 
          mb-4
        "
        loading="lazy"
      />
      <div
        className="
        pt-4 
        flex 
        flex-col 
        flex-grow 
        items-center 
        text-center 
        max-w-xs
      
      "
      >
        <h3
          className="
          text-white 
          font-gilroy 
          font-bold 
          text-xl 
          mb-3
          truncate  // Truncate long titles
        "
        >
          {title}
        </h3>
        <div
          className="
          flex-grow 
          overflow-auto  // Allow scrolling if content is too long
          w-full
        "
        >
          {Array.isArray(description) ? (
            <ul
              className="
              text-white 
              font-gilroy 
              font-regular 
              text-base 
              pb-6 
              list-disc 
              pl-5 
              text-left 
              max-w-xs
            "
            >
              {description.map((item, index) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="
              text-white 
              font-gilroy 
              font-regular 
              text-base 
              pb-6
            "
            >
              {isLongDescription ? (
                <>
                  {description.slice(0, descriptionLimit)}...
                  <span
                    className="
                    text-[#B266FF] 
                    font-gilroy 
                    font-light 
                    cursor-pointer 
                    ml-1 
                    hover:underline
                  "
                  >
                    Read More
                  </span>
                </>
              ) : (
                description
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
function PatternsAndStrategies() {
  const cardData = [
    {
      image: chart_img,
      title: "Real-Time Pattern Scanner",
      description: [
        "Detects bullish/bearish chart patterns",
        "Momentum analysis across multiple timeframes",
        "Identifies support/resistance levels",
        "Provides success rate indicators and risk/reward calculations",
      ],
    },
    {
      image: chart_img_2,
      title: "Professional Edge Features",
      description: [
        "Instant trading signals via Telegram/WhatsApp for quick gains.",
        "Quant-driven trade recommendations for informed decisions.",
        "Machine learning for pattern and trend recognition.",
      ],
    },
    {
      image: chart_img_2,
      title: "Trading Strategies",
      description: [
        "Build strategies without coding",
        "Combine technical indicators and backtest with historical data",
        "Set custom entry/exit rules, auto-sync with brokers",
        "Save and clone successful strategies",
      ],
    },
    {
      image: chart_img_2,
      title: "Hidden Market Signals",
      description: [
        "Track institutional money flow and dark pool activity",
        "Identify unusual volume patterns and smart money movements",
        "Leverages proprietary quant indicators and order flow analysis",
      ],
    },
    {
      image: chart_img_2,
      title: "News Impact Tracker",
      description: [
        "Real-time news sentiment and market impact analysis",
        "Economic calendar integration and breaking news alerts",
        "Social media sentiment tracking",
        "Central bank policy updates",
      ],
    },
    {
      image: chart_img_2,
      title: "Trading Academy",
      description: [
        "Structured learning paths from basics to advanced",
        "Live trading sessions and interactive workshops",
        "Real-time market analysis and development tutorials",
        "Weekly market outlook webinars and community forums",
      ],
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-l from-[#020204] via-[#0f0117] to-[#3b0061]">
      <h1
        className="
        text-white 
        text-center 
        font-gilroy 
        font-bold 
        text-2xl 
        md:text-3xl 
        lg:text-5xl 
        py-8 
        lg:py-16
      "
      >
        Chart Patterns and Strategies
      </h1>
      <div className="container lg:pb-16">
        <Slider {...settings}>
          {cardData.map((item, index) => (
            <div key={index} className="p-2 flex justify-center">
              <Card
                image={item.image}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default PatternsAndStrategies;
