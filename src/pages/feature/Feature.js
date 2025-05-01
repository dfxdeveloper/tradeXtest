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
import StrategyBuilder from './StrategyBuilder'
import MultiAssetSupport from './MultiAssetsSupport'
import AlertsAndNotification from './AlertsAndNotification'
import ChartAnalysis from './ChartAnalysis'
import StrategyBacktesting from './StrategyBacktesting'
import ExpertMarketplace from './ExpertMarketplace'
import PremarketReport from './PremarketReport'

function Feature() {
  return (
    <>
    <Header/>
    <HeroSection/>
    <StrategyBuilder/>
    <MultiAssetSupport/>
    <AlertsAndNotification/>
    <ChartAnalysis/>
    <RealTimeNews/>
    <StrategyBacktesting/>
    <HiddenSignals/>
    <ExpertMarketplace/>
    <PremarketReport/>
    <CommonSenseTrading/>

    <CandleStickType/>
    <NeverMissUpdate/>
    <ChartPatterns/>
    <TradingStrategies/>
    <Footer/>
    </>
  )
}

export default Feature