import { Carousel } from 'antd';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useSliderStore from '../store/useSliderStore';
import useHomeLoaderStore from '../store/useHomeLoaderStore';

const SlideSection = () => {
  const carouselRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const { sliders, fetchSliders, loading } = useSliderStore();
  const homeLoading = useHomeLoaderStore((s) => s.homeLoading);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  useEffect(() => {
    if (sliders.length === 0) return;

    const timer = setInterval(() => {
      carouselRef.current?.next();
    }, 4000);

    return () => clearInterval(timer);
  }, [sliders]);

  if (homeLoading) return null;

  if (loading || sliders.length === 0) {
    return <div className="h-[70vh] md:h-[calc(100vh-7rem)] bg-gray-200 animate-pulse w-full"></div>;
  }

  return (
    <div className="relative">
      <Carousel
        ref={carouselRef}
        autoplay={false}
        dots={true}
        arrows={false}
        speed={1200}
        afterChange={(index) => setCurrent(index)}
      >
        {sliders.map((slide, index) => (
          <div key={slide.id}>
            <div className="relative h-[70vh] md:h-[calc(100vh-7rem)] overflow-hidden">
              <motion.div
                key={`${index}-${current}`}
                className="absolute inset-0 bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 20%',
                }}
                initial={{ scale: 1 }}
                animate={{ scale: current === index ? 1.08 : 1 }}
                transition={{ duration: 6, ease: 'easeOut' }}
              />

              <div className="absolute inset-0 bg-linear-to-r from-[#0F1E4A]/60 via-[#0F1E4A]/25 to-transparent" />

              {(slide.title || slide.subtitle) && (
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20">
                  {slide.title && (
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="text-white text-3xl md:text-5xl font-bold mb-4 max-w-2xl drop-shadow-lg"
                    >
                      {slide.title}
                    </motion.h1>
                  )}
                  {slide.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="text-gray-200 text-base md:text-xl max-w-xl drop-shadow-md"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </Carousel>

      <button
        onClick={() => carouselRef.current?.prev()}
        aria-label="Previous slide"
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#0F1E4A]/50 backdrop-blur-md text-white border border-white/20 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300"
      >
        <FaChevronLeft className="text-sm md:text-lg" />
      </button>

      <button
        onClick={() => carouselRef.current?.next()}
        aria-label="Next slide"
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#0F1E4A]/50 backdrop-blur-md text-white border border-white/20 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300"
      >
        <FaChevronRight className="text-sm md:text-lg" />
      </button>
    </div>
  );
};

export default SlideSection;