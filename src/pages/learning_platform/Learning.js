import React from 'react'
import MasterTradingStrategies from './MasterTradingStrategies'
import LearningSession from './LearningSession.js'
import AboutTradeXpert from './AboutTradeXpert.js'
import Footer from '../../components/Footer.js'
import Header from '../../components/Header.js';

function Learning() {
  return (
    <>
    <Header/>
    <MasterTradingStrategies/>
    <LearningSession/>
    <AboutTradeXpert/>
    <Footer/>
    </>
  )
}

export default Learning