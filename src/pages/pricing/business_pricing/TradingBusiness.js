import React, { useState } from "react";
import { Headphones, BookOpenText } from "lucide-react";
import question from "../../../assets/images/about_question.svg";
import RequestDemoModal from "./RequestDemoModal";

export default function TradingBusiness() {
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  return (
    <>

<div className="consult_schedule_bg text-center py-24 px-4 text-white font-euclid">
      <div className="flex items-center justify-center gap-4 p-2 bg-[#0E051B] max-w-fit mx-auto border border-[#26014F] rounded-full mb-10">
        <div className="flex items-center gap-3 pl-3 pr-2">
          <div className="border border-[#480096] rounded-full p-1.5">
            <img
              alt="question"
              className="w-5 h-5"
              src={question}
              loading="lazy"
            />
          </div>
          <span className="text-gray-300 text-sm">Still Have a Question</span>
        </div>
        <button className="bg-[linear-gradient(180deg,_#B039FF_0%,_#A871FF_100%)] hover:bg-purple-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200">
          Ask Question
        </button>
      </div>
      <h1 className="text-4xl font-regular font-euclid text-white leading-snug">
        Ready to Transform Your <br />
        Trading Business?
      </h1>
      <div className="flex justify-center items-center mt-10">
        <button onClick={() => setIsRequestModalOpen(true)} className="bg-[linear-gradient(180deg,_#B039FF_0%,_#A871FF_100%)] hover:bg-purple-600 text-white flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-lg">
          <Headphones size={18} />
          <span>Schedule a Consultation</span>
        </button>
      </div>
      <div className="max-w-5xl mx-auto mt-10 text-white font-euclid text-base sm:text-xl leading-relaxed">
        <p>
          Or contact our enterprise team directly at{" "}
          <span className="text-white font-semibold underline underline-offset-4 decoration-white">
          support@tradexpert.ai
          </span>{" "}
          or{" "}
          <span className="text-white font-semibold underline underline-offset-4 decoration-white">
          +91 9607053478
          </span>
        </p>
      </div>
    </div>
    <RequestDemoModal
    isOpen={isRequestModalOpen}
    onClose={() => setIsRequestModalOpen(false)}
  />
    </>
  

  );
}
