import { Carousel } from 'antd';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import Hero1 from '../assets/1.JPG.jpeg';
import Hero2 from '../assets/2.JPG.jpeg';
import Hero3 from '../assets/3.jpg.jpeg';
import Hero4 from '../assets/4.JPG.jpeg';
import Hero5 from '../assets/5.JPG.jpeg';
import Hero6 from '../assets/6.JPG.jpeg';
import Hero7 from '../assets/7.JPG.jpeg';
import Hero8 from '../assets/8.jpg.jpeg';
import Hero9 from '../assets/9.JPG.jpeg';
import Hero10 from '../assets/10.JPG.jpeg';
import Hero11 from '../assets/12.jpeg';
import Hero12 from '../assets/13.JPG.jpeg';

const SlideSection = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      carouselRef.current?.next();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const images = [
    Hero1,
    Hero2,
    Hero3,
    Hero4,
    Hero5,
    Hero6,
    Hero7,
    Hero8,
    Hero9,
    Hero10,
    Hero11,
    Hero12,
  ];

  return (
    <div className="relative">
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .bg-animate {
          animation: slowZoom 8s linear infinite;
        }
        @media (max-width: 768px) {
          .bg-animate {
            animation: none;
          }
        }
      `}</style>

      <Carousel
        ref={carouselRef}
        autoplay={false}
        dots={true}
        arrows={false}
      >
        {images.map((img, index) => (
          <div key={index}>
            <div className="relative min-h-[calc(100vh-4.5rem)] md:h-[calc(100vh-7rem)] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-animate"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundPosition: 'center center',
                }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1E4A]/50 via-[#0F1E4A]/20 to-transparent"></div>
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

export default SlideSection;