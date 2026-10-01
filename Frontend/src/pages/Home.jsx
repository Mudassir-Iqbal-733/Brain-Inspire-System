import React from 'react'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import WhyChooseSection from '../components/WhyChooseSection'
import TestimonialSection from '../components/Testinomial'
import SlideSection from '../components/SlideSection'
import DirectorMessage from '../components/DirectorMessage'
import CoreValues from '../components/CoreValues'
import ProgramsSection from '../components/ProgramsSection'
import MissionVision from '../components/MissionVission'
import PageLoader from '../components/PageLoader'

const Home = () => {
  return (
    <>
    <PageLoader />
    <SlideSection />
    <HeroSection />
    <DirectorMessage />
    <CoreValues />
    <MissionVision />
    <ProgramsSection />
    <TestimonialSection />
    
    {/* <StatsSection />
    <WhyChooseSection /> */}
    </>
  )
}

export default Home