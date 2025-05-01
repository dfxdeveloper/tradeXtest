import React, {lazy} from 'react'
import NiftyCards from './NiftyCards';
import TrendingStocks from './TrendingStocks';
import NiftyBankNifty from './NiftyBankNifty';
import SectorHeatMap from './SectorHeatMap';
import AiMarketDigest from './AiMarketDigest';
import NewsPulse from './NewsPulse';
import UpcomingEvents from './UpcomingEvents';
const AiMarketDashboard = lazy(() => import("../indianEquity/AIMarketIntelligence"));
function IndianEquity() {
  return (
    <>
    <AiMarketDashboard/>
    <NiftyCards/>
    <TrendingStocks/>
    <NiftyBankNifty/>
    <SectorHeatMap/>
    <NewsPulse/>
    <AiMarketDigest/>
    <UpcomingEvents/>
    </>
  )
}

export default IndianEquity