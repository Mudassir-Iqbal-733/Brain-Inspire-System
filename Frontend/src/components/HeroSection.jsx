import { Carousel } from 'antd';
import { FaArrowRight, FaArrowLeft, FaUserTie, FaLaptopCode, FaCheckCircle, FaHeadset, FaCertificate, FaAward, FaBookOpen } from 'react-icons/fa';
import { useRef } from 'react';
import herobg from '../assets/herobg.png';
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
      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={5000}
        dots={true}
        arrows={false}
      >
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="relative bg-cover bg-center md:h-[calc(100vh-7rem)] overflow-hidden"
              style={{ backgroundImage: `url(${herobg})` }}
            >
              <div className="absolute inset-0 bg-[#0F1E4A]/85"></div>

              <div className="relative h-full grid grid-cols-1 md:grid-cols-2">
                <div className="order-2 md:order-1 flex items-center px-5 sm:px-10 lg:px-16 pt-8 pb-8 md:py-10">
                  <div className="w-full max-w-xl">
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
                      <button className="bg-[#2563EB] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-base flex items-center gap-2 hover:bg-[#38BDF8] transition-colors duration-300">
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

                <div className="order-1 md:order-2 h-52 sm:h-80 md:h-full relative">
                  <img
                    src={slide.image}
                    alt={slide.titleLine2}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => carouselRef.current?.prev()}
                    aria-label="Previous slide"
                    className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300"
                  >
                    <FaArrowLeft className="text-xs" />
                  </button>

                  <button
                    onClick={() => carouselRef.current?.next()}
                    aria-label="Next slide"
                    className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300"
                  >
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <button
        onClick={() => carouselRef.current?.prev()}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] transition-all duration-300"
      >
        <FaArrowLeft className="text-base" />
      </button>

      <button
        onClick={() => carouselRef.current?.next()}
        aria-label="Next slide"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] transition-all duration-300"
      >
        <FaArrowRight className="text-base" />
      </button>
    </div>
  );
};

export default HeroSection;