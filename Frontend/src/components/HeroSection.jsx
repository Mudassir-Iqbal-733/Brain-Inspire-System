import { Carousel } from 'antd';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaUserTie, FaLaptopCode, FaCheckCircle, FaHeadset, FaCertificate, FaAward, FaBookOpen } from 'react-icons/fa';
import { useRef } from 'react';
import Hero1 from '../assets/Hero_1.jpg';
import hero2 from '../assets/Hero_2.jpg';

const HeroSection = () => {
  const carouselRef = useRef(null);

  const slides = [
    {
      id: 1,
      tag: 'SKILLS TODAY | SUCCESS TOMORROW',
      titleLine1: 'Learn Skills.',
      titleLine2: 'Build Your Future.',
      paragraph:
        'A degree gives you knowledge. Skills help you apply it. With Brain Inspire, access learning opportunities designed to help you gain relevant knowledge, practical skills and career confidence.',
      subText: '30+ Courses',
      image: Hero1,
      features: [
        { icon: <FaUserTie />, label: 'Expert Instructors' },
        { icon: <FaLaptopCode />, label: 'Hands-on Projects' },
        { icon: <FaCheckCircle />, label: '100% Practical' },
        { icon: <FaHeadset />, label: 'Career Support' },
      ],
    },
    {
      id: 2,
      tag: 'LEARN | GROW | GET CERTIFIED',
      titleLine1: 'Certified Skills.',
      titleLine2: 'Brighter Career.',
      paragraph:
        'Get industry-recognized certifications that open real career doors. Learn practical skills, prove your expertise, and stand out in todays competitive job market.',
      subText: '15+ Certifications',
      image: hero2,
      features: [
        { icon: <FaCertificate />, label: 'Verified Certificates' },
        { icon: <FaAward />, label: 'Industry Approved' },
        { icon: <FaBookOpen />, label: 'Skill-Based Learning' },
        { icon: <FaHeadset />, label: 'Lifetime Support' },
      ],
    },
  ];

  return (
    <div className="relative">
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.25); }
        }
        .bg-animate {
          animation: slowZoom 10s linear infinite;
        }
        @media (max-width: 768px) {
          .bg-animate {
            animation: none;
          }
        }
      `}</style>

      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={3000}
        dots={true}
        arrows={false}
      >
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="relative min-h-[calc(100vh-4.5rem)] md:h-[calc(100vh-7rem)] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-animate"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundPosition: 'center center',
                }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E4A]/95 via-[#0F1E4A]/80 to-[#0F1E4A]/50 md:to-[#0F1E4A]/35"></div>

              <div className="relative w-full py-10 md:py-10 flex items-center min-h-[calc(100vh-4.5rem)] md:min-h-0 md:h-[calc(100vh-7rem)]">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 w-full">
                  <div className="max-w-xl">
                    <p className="text-[#38BDF8] text-[10px] sm:text-sm font-semibold tracking-wider mb-2 uppercase">
                      {slide.tag}
                    </p>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 text-white">
                      {slide.titleLine1}
                      <br />
                      <span className="text-[#38BDF8]">{slide.titleLine2}</span>
                    </h1>

                    <p className="text-gray-200 text-xs sm:text-base mb-2 leading-relaxed">
                      {slide.paragraph}
                    </p>

                    <p className="text-[#38BDF8] font-semibold text-xs sm:text-base mb-5">
                      {slide.subText}
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                      <button className="bg-[#38BDF8] text-[#0F1E4A] px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-base flex items-center gap-2 hover:bg-white transition-colors duration-300">
                        Explore Programs
                        <FaArrowRight className="text-[10px] sm:text-xs" />
                      </button>
                      <button className="border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-base hover:bg-white hover:text-[#0F1E4A] transition-colors duration-300">
                        Contact Us
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 border-t border-white/20 pt-4">
                      {slide.features.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 sm:gap-2 text-gray-200 text-[10px] sm:text-sm"
                        >
                          <span className="text-[#38BDF8] text-xs sm:text-base">{f.icon}</span>
                          <span>{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <button
        onClick={() => carouselRef.current?.prev()}
        aria-label="Previous slide"
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#0F1E4A]/40 backdrop-blur-md text-white border border-white/20 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300"
      >
        <FaChevronLeft className="text-sm md:text-lg" />
      </button>

      <button
        onClick={() => carouselRef.current?.next()}
        aria-label="Next slide"
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#0F1E4A]/40 backdrop-blur-md text-white border border-white/20 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300"
      >
        <FaChevronRight className="text-sm md:text-lg" />
      </button>
    </div>
  );
};

export default HeroSection;