import React from "react";
import ConfigurationModal from "../configurationModal/Config";
import loginImage from "../../assets/images/loginForm-image.png";
function Main() {
  return (
    <>
      <div className="grid md:grid-cols-2 h-screen w-screen bg-[#020204] bg-gradient-to-r from-[#020204] via-[#0f0117] to-[#3b0061] overflow-hidden">
        <div className="hidden md:block rounded-md relative">
          <img
            src={loginImage}
            alt="login-form-image"
            className="w-full h-full object-cover md:rounded-none"
            style={{
              borderTopRightRadius: "80px",
              borderBottomRightRadius: "80px",
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-5 pt-60">
            <h1 className="font-gilroy text-4xl text-white font-bold flex justify-center">
              {/* Start Your Trading Journey */}
            </h1>
            <p className="text-white flex justify-center mt-4">
              {/* Setup your Configuration */}
            </p>
          </div>
        </div>
        <div className="flex justify-center max-h-screen overflow-hidden md:p-10 my-5">
          <div className="flex flex-col justify-center px-6 md:py-12 w-full max-w-sm mx-auto"></div>
        </div>
        <ConfigurationModal isOpen={true} />
      </div>
    </>
  );
}

export default Main;
