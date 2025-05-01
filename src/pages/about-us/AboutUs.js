import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../about-us/HeroSection";
import Discover from "../about-us/Discover";
import KeyFeatures from "../about-us/KeyFeatures";
import JoinNow from "../about-us/JoinNow";
import OurMission from "../about-us/OurMission";
import WhoWeAre from "../about-us/WhoWeAre";

// Enhanced parallax hook with additional animation states
const useParallax = (ref) => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollPosition = (windowHeight - rect.top) / windowHeight;
        setOffset(scrollPosition * 100);

        // Set visibility when element comes into view
        if (!isVisible && rect.top < windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, isVisible]);

  return { offset, isVisible };
};

// Enhanced ParallaxSection with multiple animation options
const ParallaxSection = ({
  children,
  className = "",
  animationType = "",
  noSpacing = false,
}) => {
  const sectionRef = React.useRef(null);
  const { offset, isVisible } = useParallax(sectionRef);

  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: isVisible ? 1 : 0,
      transform: "translateY(0)",
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      margin: 0,
      padding: 0,
    };

    if (!isVisible) {
      switch (animationType) {
        case "fade-up":
          return {
            ...baseStyles,
            transform: "translateY(100px)",
            opacity: 0,
          };
        case "fade-down":
          return {
            ...baseStyles,
            transform: "translateY(-100px)",
            opacity: 0,
          };
        case "fade-left":
          return {
            ...baseStyles,
            transform: "translateX(-100px)",
            opacity: 0,
          };
        case "fade-right":
          return {
            ...baseStyles,
            transform: "translateX(100px)",
            opacity: 0,
          };
        case "zoom":
          return {
            ...baseStyles,
            transform: "scale(0.8)",
            opacity: 0,
          };
        default:
          return baseStyles;
      }
    }

    // Add parallax effect for visible elements
    return {
      ...baseStyles,
      transform: `translateY(${offset * 0.3}px)`,
    };
  };

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...getAnimationStyles(),
        marginTop: noSpacing ? "" : undefined, // Compensate for any sub-pixel rendering gaps
      }}
    >
      <div
        className="transition-transform duration-300"
        style={{ margin: 0, padding: 0 }}
      >
        {children}
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-[#0E051B]"
      style={{ margin: 0, padding: 0 }}
    >
      <Header />
      <HeroSection />

      <ParallaxSection className="bg-[#0E051B]" animationType="fade-up">
        <Discover />
      </ParallaxSection>

      <ParallaxSection className="bg-[#0E051B]" animationType="fade-up">
        <OurMission />
      </ParallaxSection>

      <ParallaxSection className="bg-[#0E051B]" animationType="fade-up">
        <KeyFeatures />
      </ParallaxSection>

      <ParallaxSection className="bg-[#0E051B]" animationType="fade-up">
        <WhoWeAre />
      </ParallaxSection>

        <JoinNow />
  

      <Footer />
    </div>
  );
};

export default AboutUs;
