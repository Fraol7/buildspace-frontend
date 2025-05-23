import React from 'react'
// import Header from '@/components/LandingPage/Header';
import HeroSection from '@/components/LandingPage/HeroSection';
import Mission from '@/components/LandingPage/Mission';
import WhyBuildSpace from '@/components/LandingPage/WhyBuildSpace';
import FundingSection from '@/components/LandingPage/FundingSection';
import InnovationJourney from '@/components/LandingPage/InnovationJourney';
import AppShowcase from '@/components/LandingPage/AppShowcase';
import Footer from '@/components/LandingPage/Footer';

const LandingPage = () => {
  return (
    <>
      {/* <div className="text-red-800 font-bold text-4xl p-6">Landing Page</div> */}
      <HeroSection />
      <Mission />
      <WhyBuildSpace />
      <FundingSection />
      <InnovationJourney />
      <AppShowcase />
      <Footer />
    </>
  )
}

export default LandingPage;