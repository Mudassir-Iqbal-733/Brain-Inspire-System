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
import Hero1 from '../assets/1.JPG.jpeg';
import Hero2 from '../assets/2.JPG.jpeg';
import Hero3 from '../assets/3.jpg.jpeg';
import Hero5 from '../assets/5.JPG.jpeg';
import Hero6 from '../assets/6.JPG.jpeg';
import Hero7 from '../assets/7.JPG.jpeg';
import Hero8 from '../assets/8.jpg.jpeg';
import Hero9 from '../assets/9.JPG.jpeg';
import Hero10 from '../assets/10.JPG.jpeg';
import Hero11 from '../assets/12.jpeg';
import Hero12 from '../assets/13.JPG.jpeg';

const Home = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const images = [
    Hero1, Hero2, Hero3, Hero5, Hero6, Hero7,
    Hero8, Hero9, Hero10, Hero11, Hero12,
  ];

  useEffect(() => {
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) setImagesLoaded(true);
      };
    });
  }, []);

  if (!imagesLoaded) return <PageLoader />;

  return (
    <>
      <SEO
        title="BISE - Brain Inspire System of Education"
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