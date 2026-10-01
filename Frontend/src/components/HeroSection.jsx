import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider mb-3 uppercase">
            Welcome to Brain Inspire
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-[#0F1E4A]">
            Build Your Future With{' '}
            <span className="text-[#38BDF8]">Digital Skills</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            Brain Inspire System of Education is a leading institute in Bahawalpur dedicated to
            empowering students with industry-relevant digital skills. We offer practical,
            hands-on training in Web Development, Graphic Design, Digital Marketing, MS Office,
            and Freelancing. Our expert trainers bring real-world experience to every classroom,
            helping you gain the knowledge and confidence needed to succeed in today's
            competitive digital world.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="/programs"
              className="bg-[#38BDF8] text-[#0F1E4A] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2 hover:bg-[#0F1E4A] hover:text-white transition-colors duration-300"
            >
              Explore Programs
              <FaArrowRight className="text-xs sm:text-sm" />
            </a>

            <a
              href="/contact"
              className="border-2 border-[#0F1E4A] text-[#0F1E4A] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base flex items-center gap-2 hover:bg-[#0F1E4A] hover:text-white transition-colors duration-300"
            >
              <FaPhoneAlt className="text-xs sm:text-sm" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;