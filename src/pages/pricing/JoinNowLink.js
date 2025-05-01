import React from "react";
import JoinNow_bg from "../../assets/images/JoinNow_bg.png";
import { Link } from "react-router-dom";

function JoinNowLink() {
  return (
    <>
      <div
        className="bg-[#020204] bg-gradient-to-l from-[#020204] via-[#0f0117] to-[#4e1276] text-white lg:p-20 md:p-10 p-7"
        style={{
          backgroundImage: `url(${JoinNow_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" text-center px-4">
          <h1 className=" font-gilroy text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Master the Markets
          </h1>
          <h2 className="font-gilroy text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Sign Up with TradeXpert Today!
          </h2>
          <Link
            to="/signup"
            className="md:text-xl text-lg font-gilroy px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default JoinNowLink;
