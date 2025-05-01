import React from "react";
import Teaching_pic from "../../assets/images/Teaching.png";
import Module from "../../assets/images/module.svg";
import Live from "../../assets/images/live.svg";
import videos from "../../assets/images/videos.svg";
import Certified from "../../assets/images/certified.svg";
import Juniors from "../../assets/images/juniors.svg";
import LeaningSection_bg from "../../assets/images/LearningSection_bg.png";

function LearningSession() {
  const cardData = [
    {
      title: "Modules",
      image: Module, // replace with the actual image path
    },
    {
      title: "Live",
      image: Live, // replace with the actual image path
    },
    {
      title: " Videos",
      image: videos, // replace with the actual image path
    },
    {
      title: "Certificates",
      image: Certified, // replace with the actual image path
    },
    {
      title: "Juniors",
      image: Juniors, // replace with the actual image path
    },
  ];
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${LeaningSection_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="grid lg:grid-cols-2 py-20 container">
          <div className="flex self-center">
            <img
              className="lg:p-10 "
              src={Teaching_pic}
              alt="Teaching"
              loading="lazy"
            />
          </div>
          <div className="lg:p-10 p-5 container">
            <h3 className=" text-2xl lg:text-5xl font-gilroy lg:leading-tight flex md:justify-start justify-center md:text-left md:text-3xl text-center pt-4 text-white font-bold">
              Welcome to Tradexpert's Learning Hub!
            </h3>
            <p className="text-white text-base md:text-xl font-gilroy flex justify-center md:text-left text-center pb-1 pt-4 font-light">
              Are you ready to unlock the secrets of trading? Whether you're
              just starting out or looking to refine your skills, you've come to
              the right place. At Tradexpert, we believe that understanding
              trading indicators is the key to smarter, more confident trading.
              <br />
              In this Learning Hub, we’ll guide you through all the essential
              trading indicators that can help you make informed decisions in
              the markets. From the basics to advanced strategies, we break
              things down in a way that’s easy to understand and apply. No
              jargon, no fluff—just clear and simple insights!
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 py-10 container">
          {cardData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white/20 p-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image} // use the image from the cardData array
                alt={`${item.title} icon`}
                className="w-16 h-16 mb-4 flex"
                loading="lazy"
              />
              <h3 className="font-bold text-lg mb-2 text-white">
                {item.title}
              </h3>
              {/* <p className="text-sm text-white">
                Click to explore our {item.title.toLowerCase()}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LearningSession;
