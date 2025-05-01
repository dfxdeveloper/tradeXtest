import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AiIcon from "../../../../assets/images/ai_icon.svg";

const UpcomingIPOs = [
  {
    company: "SMC Global Securities Ltd.",
    date: "Apr 8, 2025",
    priceRange: "₹1,000 - ₹1,100",
    lotSize: 50,
    subscription: "221.52x"
  },
  {
    company: "Adani Power Ltd.",
    date: "Apr 12, 2025",
    priceRange: "₹2,300 - ₹2,450",
    lotSize: 25,
    subscription: "105.36x"
  },
  {
    company: "Reliance Digital Ltd.",
    date: "Apr 15, 2025",
    priceRange: "₹800 - ₹850",
    lotSize: 30,
    subscription: "189.74x"
  },
  {
    company: "Tata Electronics Ltd.",
    date: "Apr 22, 2025",
    priceRange: "₹1,200 - ₹1,300",
    lotSize: 40,
    subscription: "150.21x"
  },
  {
    company: "Sun Pharma Advanced Ltd.",
    date: "Apr 28, 2025",
    priceRange: "₹950 - ₹1,050",
    lotSize: 45,
    subscription: "98.65x"
  }
];

function UpcomingIpos() {
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = UpcomingIPOs.length;
  const getActiveDotIndex = (currentSlideIndex) => {
    if (currentSlideIndex === 0) return 0; 
    if (currentSlideIndex === totalSlides - 1) return 2; 
    return 1; 
  };

  const handleDotClick = (index) => {
    if (sliderRef.current) {
      if (index === 0) {
        sliderRef.current.slickGoTo(0);
      } else if (index === 1) {
        const middleSlide = Math.floor(totalSlides / 2);
        sliderRef.current.slickGoTo(middleSlide);
      } else if (index === 2) {
        sliderRef.current.slickGoTo(totalSlides - 1);
      }
    }
  };

  const ipoSettings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(UpcomingIPOs.length, 3),
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(UpcomingIPOs.length, 3),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(UpcomingIPOs.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ],
  };

  return (
    <div className="text-white mb-4 md:p-4 p-2 pb-10 pt-5 lg:px-6 xl:px-6 2xl:px-6 w-full">
      <div
        className="border border-gray-700 mt-2 rounded-xl p-2 sm:p-3 md:p-6 shadow-xl backdrop-blur-3xl"
        style={{
          background:
            "linear-gradient(88.3deg, rgba(255, 255, 255, 0.0664) 0%, rgba(255, 255, 255, 0.0352) 99.66%)",
        }}
      >
        <div className="flex items-center mb-2 md:mb-2 w-full max-w-xs rounded-full border border-gray-700 backdrop-blur-3xl space-x-2 px-2 py-0.5">
          <img className="p-1 rounded-full h-9 w-9" src={AiIcon} alt="AI Icon" />
          <h2 className="text-xl font-euclid font-semibold truncate">
            Upcoming IPOs
          </h2>
        </div>

        <div className="relative px-1 py-4">
          <Slider ref={sliderRef} {...ipoSettings}>
            {UpcomingIPOs.map((ipo, idx) => (
              <div key={idx} className="px-2 py-2">
                <div className="bg-gradient-to-r from-[#522272] to-[#220C39] border-l-[4px] border-solid border-[#BB7DFF] rounded-3xl h-full relative overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-md font-euclid text-white font-semibold">{ipo.company}</h3>
                      <span className="text-xs font-euclid font-regular text-[#BF85FF]">{ipo.date}</span>
                    </div>
                    
                    <div className="bg-[#2575FC] font-euclid text-white text-xs font-bold px-2 py-1 rounded-full w-16 mb-2 text-center">
                      IPO
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-euclid text-sm text-white">Price Range:</span>
                        <span className="font-euclid text-sm text-white font-medium">{ipo.priceRange}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-white text-sm font-euclid">Lot Size:</span>
                        <span className="font-medium text-sm text-white font-euclid">{ipo.lotSize}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-white text-sm font-euclid">Subscription:</span>
                        <span className="font-medium text-white text-sm font-euclid">{ipo.subscription}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex justify-center mt-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                className="cursor-pointer mx-1"
              >
                <div
                  className={`rounded-full transition-all duration-300 ease-in-out ${
                    getActiveDotIndex(currentSlide) === index 
                      ? "bg-white w-2 h-2 transform scale-125 shadow-glow" 
                      : "bg-white bg-opacity-50 w-2 h-2"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #6d28d9;
          border-radius: 8px;
        }
        .shadow-glow {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}

export default UpcomingIpos;