import HeroSection from '../components/HeroSection';
import Testimonial from '../components/Testinomial';
import SlideSection from '../components/SlideSection';
import DirectorMessage from '../components/DirectorMessage';
import CoreValues from '../components/CoreValues';
import ProgramsSection from '../components/ProgramsSection';
import MissionVision from '../components/MissionVission';
import PageLoader from '../components/PageLoader';
import SEO from '../components/SEO';
import ProgramsVideo from '../components/ProgramsVideo';

const Home = () => {
  return (
    <PageLoader>
      <SEO
        title="BISE - Brain Inspire System of Education Pvt Ltd"
        description="Brain Inspire System of Education — Professional courses in Bahawalpur"
        keywords="courses, Bahawalpur, IT training"
      />
      <SlideSection />
      <HeroSection />
      <DirectorMessage />
      <CoreValues />
      <MissionVision />
      <ProgramsSection />
      <ProgramsVideo />
      <Testimonial />
    </PageLoader>
  );
};

export default Home;