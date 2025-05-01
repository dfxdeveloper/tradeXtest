import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Upcoming_ipos from "../../../../assets/images/upcoming_ipos.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWhatsNew } from "../../../../components/context/whatsnew";

function UpcomingIPOs() {
  const { whatsNewData } = useWhatsNew();
  
  // Get IPO data from API response
  const ipos = whatsNewData?.[0]?.upcoming_ipos || [];
  
  const formatDate = (dateString) => {
    // Check if the date is already formatted
    if (typeof dateString === 'string' && dateString.includes('-')) {
      return dateString;
    }
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const CustomPrevArrow = ({ onClick }) => (
    <div
      className="flex items-center justify-center
                w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
                bg-[#220C39]
                text-white
                rounded-full
                border-2 border-[#6A11CB]
                transition-all duration-300 ease-out
                cursor-pointer
                hover:bg-[#2d104c] hover:scale-105"
      onClick={onClick}
    >
      <ChevronLeft size={typeof window !== 'undefined' && window.innerWidth < 640 ? 18 : 24} />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div
      className="flex items-center justify-center
                w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
                bg-[#220C39]
                text-white
                rounded-full
                border-2 border-[#6A11CB]
                transition-all duration-300 ease-out
                cursor-pointer
                hover:bg-[#2d104c] hover:scale-105"
      onClick={onClick}
    >
      <ChevronRight size={typeof window !== 'undefined' && window.innerWidth < 640 ? 18 : 24} />
    </div>
  );

  // Dynamically adjust settings based on number of IPOs
  const settings = {
    dots: ipos.length > 1, // Only show dots if there's more than one IPO
    infinite: ipos.length > 1, // Only make it infinite if there's more than one IPO
    speed: 500,
    slidesToShow: Math.min(ipos.length, 3), // Show max 3 slides, or fewer if fewer IPOs
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    autoplay: ipos.length > 1, // Only autoplay if there's more than one IPO
    autoplaySpeed: 5000,
    pauseOnHover: true,
    swipeToSlide: ipos.length > 1, // Only allow swiping if there's more than one IPO
    dotsClass: "slick-dots custom-indicator",
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "8px",
            padding: "8px 0",
            margin: 0,
            listStyle: "none",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className="custom-dot"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.5,
          transition: "all 0.3s ease",
        }}
      />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(ipos.length, 3),
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(ipos.length, 2),
          slidesToScroll: 1,
          centerMode: ipos.length > 1,
          centerPadding: ipos.length > 1 ? "30px" : "0",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: ipos.length > 1,
          centerPadding: ipos.length > 1 ? "60px" : "0",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: ipos.length > 1,
          centerPadding: ipos.length > 1 ? "40px" : "0",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: ipos.length > 1,
          centerPadding: ipos.length > 1 ? "20px" : "0",
        },
      },
    ],
  };

  // Create refs to access the slider methods
  const sliderRef = React.useRef(null);

  const goToPrev = () => {
    if (sliderRef.current && ipos.length > 1) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current && ipos.length > 1) {
      sliderRef.current.slickNext();
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Add CSS for active dots
      const style = document.createElement('style');
      style.innerHTML = `
        .custom-indicator .slick-active .custom-dot {
          background-color: white !important;
          opacity: 1 !important;
          transform: scale(1.3);
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // If no IPO data is available, don't render anything
  if (ipos.length === 0) {
    return null;
  }

  return (
    <div className="relative bg-[#220C39] border border-[#6A11CB] p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <img src={Upcoming_ipos} className="w-6 sm:w-8 md:w-10" alt="Upcoming IPOs" />
        <h1 className="text-xl sm:text-2xl font-bold text-white">Upcoming IPOs</h1>
      </div>

      {/* For single IPO, display without carousel */}
      {ipos.length === 1 ? (
        <div className="flex justify-center px-1">
          <div className="w-full max-w-md">
            <div className="border border-[#6A11CB] rounded-lg bg-[#1A1625] p-3 sm:p-4 md:p-6 shadow-md">
              <h2 className="text-base sm:text-lg font-bold text-[#D595FF] mb-2 sm:mb-4 truncate">
                {ipos[0].company_name}
              </h2>
              <hr className="border-purple-700 mb-2 sm:mb-4" />
              <div className="text-xs sm:text-sm text-purple-300 space-y-1 sm:space-y-2">
                <p className="flex justify-between">
                  <span className="text-white">Date:</span>
                  <span className="text-white font-semibold">
                    {formatDate(ipos[0].dates)}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white">Price Range:</span>
                  <span className="text-white font-semibold">
                    {ipos[0].price_range}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white">Lot Size:</span>
                  <span className="text-white font-semibold">{ipos[0].lot_size}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-white">Subscription:</span>
                  <span className="text-white font-semibold">
                    {ipos[0].subscription}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Multiple IPOs - Use carousel */
        <>
          <div className="relative px-1">
            <Slider ref={sliderRef} {...settings}>
              {ipos.map((ipo, index) => (
                <div key={index} className="px-2 sm:px-3 py-2">
                  <div className="border border-[#6A11CB] rounded-lg bg-[#1A1625] p-3 sm:p-4 md:p-6 shadow-md h-full">
                    <h2 className="text-base sm:text-lg font-bold text-[#D595FF] mb-2 sm:mb-4 truncate">
                      {ipo.company_name}
                    </h2>
                    <hr className="border-purple-700 mb-2 sm:mb-4" />
                    <div className="text-xs sm:text-sm text-purple-300 space-y-1 sm:space-y-2">
                      <p className="flex justify-between">
                        <span className="text-white">Date:</span>
                        <span className="text-white font-semibold">
                          {formatDate(ipo.dates)}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white">Price Range:</span>
                        <span className="text-white font-semibold">
                          {ipo.price_range}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white">Lot Size:</span>
                        <span className="text-white font-semibold">{ipo.lot_size}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white">Subscription:</span>
                        <span className="text-white font-semibold">
                          {ipo.subscription}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Navigation buttons only for multiple IPOs */}
          <div className="flex justify-center gap-4 sm:gap-8 md:gap-10 mt-10 sm:mt-12 md:mt-16">
            <CustomPrevArrow onClick={goToPrev} />
            <CustomNextArrow onClick={goToNext} />
          </div>
        </>
      )}
    </div>
  );
}

export default UpcomingIPOs;