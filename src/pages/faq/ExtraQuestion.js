import React from "react";
import ExtraQuestion_bg from "../../assets/images/ExtraQuestion_bg.png";

function ExtraQuestion() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  return (
    <>
      <div
        className=" text-white lg:px-20 lg:pb-20 md:p-10  "
        style={{
          backgroundImage: `url(${ExtraQuestion_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="lg:px-20 lg:py-5 px-10 py-3">
          <div className=" justify-center items-center blur_card  container pb-7 ">
            <div className="lg:p-10 md:pt-7 pt-5 ">
              <h3 className="lg:text-4xl md:text-2xl text-xl text-center font-gilroy  text-white font-bold flex justify-center">
                Still have questions?
              </h3>
              <p className="text-white  flex justify-center m-2 lg:text-xl md:text-lg text-base font-light text-center lg:px-24 md:px-16 px-2 py-3">
                We’re Here to Help You with Any Additional Information You Need!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="md:mb-6">
                <span className="font-gilroy text-base font-light ">
                  Message
                </span>
                <textarea
                  className="w-full mt-2 h-28 px-3 py-2 bg-gray-900/60 border border-purple-500/30 rounded-lg 
             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
             focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                  placeholder="Type Here"
                />
              </div>

              <div className="text-center py-3">
                <button
                  type="submit"
                  className=" lg:text-xl md:text-lg text-base font-gilroy px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExtraQuestion;
