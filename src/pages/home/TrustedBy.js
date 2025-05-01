import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import partner_logo from "../../assets/images/trusted-partner.png";

function TrustedBy() {
  const settings = {
    dots: true, // Enables pagination
    arrows: false,
    infinite: true, // Enables infinite loop
    speed: 500,
    slidesToShow: 4, // Number of slides to show
    slidesToScroll: 1,
    autoplay: true, // Enables autoplay
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
      },
    ],
  };

  return (
    <>
      <section className="bg-customBlack">
        <h1 className="text-white text-center font-gilroy font-bold text-2xl md:text-3xl lg:text-5xl py-12 md:py-16">
          Trusted by Companies
        </h1>
        <div className="container pb-20 lg:pb-28">
          <Slider {...settings}>
            <div className="partner-logo">
              <img
                src={partner_logo}
                alt="Partner Logo"
                className="grayscale-effect"
                loading="lazy"
              />
            </div>
            <div className="partner-logo">
              <img
                src={partner_logo}
                alt="Partner Logo"
                className="grayscale-effect"
                loading="lazy"
              />
            </div>
            <div className="partner-logo">
              <img
                src={partner_logo}
                alt="Partner Logo"
                className="grayscale-effect"
                loading="lazy"
              />
            </div>
            <div className="partner-logo">
              <img
                src={partner_logo}
                alt="Partner Logo"
                className="grayscale-effect"
                loading="lazy"
              />
            </div>
            <div className="partner-logo">
              <img
                src={partner_logo}
                alt="Partner Logo"
                className="grayscale-effect"
                loading="lazy"
              />
            </div>
            <div className="partner-logo">
              <img
                src={partner_logo}
                alt="Partner Logo"
                className="grayscale-effect"
                loading="lazy"
              />
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
}

export default TrustedBy;
