import React from "react";
import right_img from "../../assets/images/Trade-Smarter-right-img.png";
import { Link } from "react-router-dom";

function TradeSmarter() {
  return (
    <>
      <section className="bg-customBlack">
        <div className="py-16 xl:py-28">
          <div className="lg:w-4/5 md:w-11/12 background-tradesmarter-img md:mx-auto border md:flex lg:gap-8 border-[#B266FF] rounded-3xl py-6 mx-4 px-6 lg:px-10 md:py-10 lg:py-8 xl:py-16 items-center">
            <div className="lg:w-3/5 md:w-9/12 text-center md:text-left">
              <h1 className="text-[#B266FF] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-gilroy font-bold pb-6 md:pb-8 xl:pb-12">
                From Basics to Brilliance
              </h1>
              <h2 className="text-[#F3ECFE] font-gilroy font-semibold text-xl lg:text-xl xl:text-2xl pb-2">
                Master Your Skills with Ease!
              </h2>
              <p className="text-[#FFFFFF] font-gilroy font-regular text-base pb-8 xl:pb-16">
                Explore our comprehensive learning platform, designed to equip
                you with essential trading skills and insights. Access
                interactive courses, webinars, and a rich resource library to
                enhance your trading expertise.
              </p>
              <div className="flex justify-center md:block">
                <Link
                  to="/learning"
                  className="bg-[#B266FF] text-[#F3ECFE] font-gilroy font-bold px-8 py-2 rounded-lg"
                >
                  Start Learning
                </Link>
              </div>
            </div>

            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <img
                src={right_img}
                alt="Trade-Smarter-right-img"
                className="max-w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TradeSmarter;
