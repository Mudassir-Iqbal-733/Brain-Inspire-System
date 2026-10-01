import { useState } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import Testinomial1 from '../assets/Testinomial1.jpg';
import Testinomial2 from '../assets/Hero_1.jpg';
import Testinomial3 from '../assets/Testinomial3.jpg';
import Testinomial4 from '../assets/Testinomial4.jpg';
import Testinomial5 from '../assets/Hero_2.jpg';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      quote: "Brain Inspire changed my career completely. The trainers are experienced and the hands-on projects gave me real confidence.",
      name: 'Ayesha Khan',
      role: 'Web Developer, Bahawalpur',
      initials: 'AK',
    },
    {
      id: 2,
      rating: 5,
      quote: "Best institute in Bahawalpur. I learned graphic design from scratch and now working as a freelancer with international clients.",
      name: 'Ahmed Raza',
      role: 'Graphic Designer, Freelancer',
      initials: 'AR',
    },
    {
      id: 3,
      rating: 5,
      quote: "The practical training and career support helped me land my first job. Highly recommended for anyone who wants real skills.",
      name: 'Fatima Noor',
      role: 'Digital Marketer, Multan',
      initials: 'FN',
    },
    {
      id: 4,
      rating: 5,
      quote: "Affordable fees, expert teachers, and a friendly environment. I completed MS Office course and it helped me in my job.",
      name: 'Bilal Hussain',
      role: 'Office Assistant, Bahawalpur',
      initials: 'BH',
    },
  ];

  const collageImages = [Testinomial2, Testinomial1, Testinomial5, Testinomial3, Testinomial4];

  const [current, setCurrent] = useState(0);
  const active = testimonials[current];

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const goNext = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative bg-gradient-to-br from-[#0F1E4A] via-[#1E3A8A] to-[#2563EB] py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider mb-3 uppercase">
            Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            What Our Students Say
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-1 mb-5 md:mb-6">
              {Array.from({ length: active.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg md:text-xl" />
              ))}
            </div>

            <div className="relative mb-6 md:mb-8">
              <FaQuoteRight className="absolute -top-2 -left-1 text-[#38BDF8]/20 text-5xl md:text-6xl" />
              <p className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-snug">
                {active.quote}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[#38BDF8] text-[#0F1E4A] font-bold text-base md:text-lg">
                  {active.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">
                    {active.name}
                  </p>
                  <p className="text-[#38BDF8] text-xs md:text-sm">
                    {active.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#0F1E4A]/50 backdrop-blur-md text-white border border-white/20 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300"
                >
                  <FaChevronLeft className="text-sm md:text-base" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#0F1E4A]/50 backdrop-blur-md text-white border border-white/20 hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300"
                >
                  <FaChevronRight className="text-sm md:text-base" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-[#38BDF8]'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 h-80 sm:h-96 md:h-[28rem]">
            <div className="col-span-3 row-span-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={collageImages[0]}
                alt="Student"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="col-span-3 row-span-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={collageImages[1]}
                alt="Student"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={collageImages[2]}
                alt="Student"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={collageImages[3]}
                alt="Student"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="col-span-2 row-span-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={collageImages[4]}
                alt="Student"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;