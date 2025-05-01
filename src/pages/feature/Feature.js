import React from 'react'
import HeroSection from './HeroSection'
import CandleStickType from './CandleStickType'
import NeverMissUpdate from './NeverMissUpdate'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ChartPatterns from './ChartPatterns'
import TradingStrategies from './TradingStategies'
import HiddenSignals from './HiddenSignals'
import RealTimeNews from './RealTimeNews'
import CommonSenseTrading from './CommonSenseTrading'

function Feature() {
  return (
    <>
    <Header/>
    <HeroSection/>
    <CandleStickType/>
    <NeverMissUpdate/>
    <ChartPatterns/>
    <TradingStrategies/>
    <HiddenSignals/>
    <RealTimeNews/>
    <CommonSenseTrading/>
    <Footer/>
    </>
  )
}

export default Feature