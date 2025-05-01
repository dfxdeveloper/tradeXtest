import { ArrowRight, BarChart2, Users, Award, ChartBar } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function HeroSection() {
  const [text, setText] = useState('usiness Efficiency');
  const fullText = 'usiness Efficiency';
  const typingSpeed = 150;
  const pauseTime = 2000;
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && text === fullText) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    } else {
      timeout = setTimeout(() => {
        setText(currentText => {
          if (isDeleting) {
            return currentText.slice(0, -1);
          } else {
            return fullText.slice(0, currentText.length + 1);
          }
        });
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <div className="flex flex-col items-center about_hero  min-h-screen bg-gray-50 px-4" style={{marginBottom:"-25px"}}>
      <div className="text-center lg:max-w-4xl max-w-2xl">
        <h1 className="text-white font-bold mt-40 mb-6 text-xl md:text-3xl lg:text-5xl font-gilroy font-bold ">
          <span className="whitespace-nowrap text-white ">Revolutionizing </span>
          <span className="whitespace-nowrap">
            B{text}
          </span>
        </h1>
        
        <p className="text-md md:text-2xl lg:text-3xl text-white mb-8 font-gilroy font-regular">
          <span className="whitespace-nowrap">We offer smart, innovative</span>{' '}
          <span className="whitespace-nowrap"> strategies designed to maximize growth</span>{' '}
          <span className="whitespace-nowrap">and operational efficiency.</span>
        </p>

        <button  className="bg-[#B039FF] font-gilroy font-bold text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors flex items-center justify-center mx-auto">
          Learn More
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default HeroSection;