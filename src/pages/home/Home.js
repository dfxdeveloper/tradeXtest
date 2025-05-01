import React from 'react';
import Header from '../../components/Header';
import Herosection from './Herosection';
import TradingSignals from './TradingSignals';
import NewsSection from './NewsSection';
import Footer from '../../components/Footer';
import RealTimeStock from './RealTimeStock';
import PatternsAndStrategies from './PatternsAndStrategies';
import TradeSmarter from './TradeSmarter';
import WhyInvestors from './WhyInvesters';
import NextGenTrading from './NextGenTrading';

function Home() {
  return (
    <>
      <Header/>
      <Herosection/>
      <TradingSignals/>
      <NextGenTrading/>
      <NewsSection/>
      <RealTimeStock/>
      <PatternsAndStrategies/>
      <TradeSmarter/>
      <WhyInvestors/>
      {/* <TrustedBy/> */}
      <Footer/>
    </>
  )
}

export default Home