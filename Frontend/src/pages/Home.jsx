import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TestimonialSection from '../components/Testinomial';
import SlideSection from '../components/SlideSection';
import DirectorMessage from '../components/DirectorMessage';
import CoreValues from '../components/CoreValues';
import ProgramsSection from '../components/ProgramsSection';
import MissionVision from '../components/MissionVission';
import PageLoader from '../components/PageLoader';
import SEO from '../components/SEO';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <>
      <SEO
        title="Home"
        description="Brain Inspire System of Education — Professional courses in Bahawalpur"
        keywords="courses, Bahawalpur, IT training"
      />
      <SlideSection />
      <HeroSection />
      <DirectorMessage />
      <CoreValues />
      <MissionVision />
      <ProgramsSection />
      <TestimonialSection />
    </>
  );
};

export default Home;