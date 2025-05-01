import React from 'react';
import Star from "../../assets/images/missionstar.svg";
import Users from "../../assets/images/mission2.svg";
import Skull from "../../assets/images/ribbinmission.svg";
import Hourglass from "../../assets/images/mission4.svg";
import Grid from "../../assets/images/mission5.svg";
import Headphones from "../../assets/images/mission6.svg";

const MissionCard = ({ Icon, title, description }) => (
  <div className="relative mt-6">
    {/* Icon container positioned at the top edge */}
    <div className="absolute -top-6 left-6 w-12 h-12 bg-[#00020F] rounded-lg flex items-center justify-center">
      <img src={Icon} alt={title} className="w-8 h-8" loading="lazy"/>
    </div>
    
    {/* Card content */}
    <div className="bg-[#00020F] p-8 rounded-2xl hover:bg-[#000300] transition-all duration-300 min-h-[280px]">
      <h3 className="text-2xl font-semibold font-gilroy mb-4 mt-4 text-white">{title}</h3>
      <p className="text-[#A7ADBE] font-gilroy font-regular text-base leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const OurMission = () => {
  const cards = [
    {
      icon: Star,
      title: "Education-First Approach",
      description: "We transform learning from a transactional experience to an educational journey. Our Learning Hub goes beyond surface-level information, diving deep into the core principles of trading. By breaking down complex market concepts into clear, actionable insights, we empower traders to build a solid foundation of knowledge. Our approach ensures users understand not just how to trade, but why markets move, creating informed and confident traders."
    },
    {
      icon: Users,
      title: "Comprehensive Market Coverage",
      description: "TradeXpert bridges the gaps between different trading markets, offering a unified view of financial ecosystems. Whether you're interested in cryptocurrencies, forex, stocks, or futures and options, our platform provides integrated insights that reveal the interconnected nature of global markets. We help traders see beyond individual market silos, understanding how different financial instruments interact and influence each other."
    },
    {
      icon: Skull,
      title: "Real-Time Market Intelligence",
      description: "Our platform revolutionizes market learning through intelligent, real-time information. Live trading signals decode complex market patterns, instant news updates provide crucial economic context, and customizable strategy tools adapt to individual trading styles. We transform raw data into meaningful insights, giving users the knowledge to make informed, strategic trading decisions."
    },
    {
      icon: Hourglass,
      title: "Our Commitment",
      description: "We are educators, not financial advisors. Our mission is to demystify trading, providing transparent, unbiased market information. We focus on developing critical thinking skills, helping users navigate the complex world of trading with confidence. Our goal is to empower learners, not to promise unrealistic returns or market predictions"
    },
    {
      icon: Grid,
      title: "Technology-Driven Learning Experience",
      description: "Leveraging cutting-edge technology, we create an immersive learning environment. Advanced algorithms and interactive modules transform complex financial information into intuitive, accessible content. Our platform offers personalized learning paths, simulated trading environments, and adaptive technologies that make sophisticated market insights easily understandable for traders at every level. "
    },
    {
      icon: Headphones,
      title: "Community and Collaborative Learning",
      description: "TradeXpert is more than a platform—it's a vibrant community of learning and growth. Through interactive forums, expert-led webinars, and collaborative discussion groups, traders share knowledge, experiences, and insights. We break down the isolation of trading, creating a supportive network where collective wisdom flourishes and individual traders can learn and grow together."
    }
  ];

  return (
    <section className="w-full min-h-screen bg-[#1A0B2E] py-16 px-4 mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-gilroy font-bold lg:text-4xl font-bold mb-8 md:mb-12 text-center text-white">
          What Sets Us Apart
        </h2>
        <div className="text-center mb-8">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-10 lg:grid-cols-3 gap-8 md:gap-8">
          {cards.map((card, index) => (
            <MissionCard
              key={index}
              Icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;