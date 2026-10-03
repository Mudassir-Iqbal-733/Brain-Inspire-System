import {
  FaHandshake,
  FaCheckCircle,
  FaUsers,
  FaBrain,
  FaTrophy,
  FaLightbulb,
  FaUserGraduate,
  FaAward,
} from 'react-icons/fa';
import about from '../data/about.json';

const CoreValues = () => {
  const icons = [
    <FaHandshake />,
    <FaCheckCircle />,
    <FaUsers />,
    <FaBrain />,
    <FaTrophy />,
    <FaLightbulb />,
    <FaUserGraduate />,
    <FaAward />,
  ];

  const descriptions = [
    'We uphold truth, integrity, and moral values in everything we do.',
    'We stay true to our purpose, our people, and our promise of quality.',
    'Our staff works together as one team to bring the best for our students.',
    'We stay aware and responsible in our teaching, learning, and growth.',
    'We aim to stand out through excellence in every program we offer.',
    'We embrace new ideas and creative methods to deliver modern education.',
    'Our expert trainers mentor every student with care and dedication.',
    'We continuously raise the bar to deliver the highest standard of learning.',
  ];

  const values = about.coreValues.map((title, index) => ({
    id: index + 1,
    icon: icons[index],
    title,
    desc: descriptions[index],
  }));

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-[#2d2b6f] text-xs font-bold tracking-[0.2em] uppercase mb-5">
            <span className="w-8 h-px bg-[#2d2b6f]" />
            Our Principles
            <span className="w-8 h-px bg-[#2d2b6f]" />
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#171642] tracking-tight mb-5">
            Core Values
          </h2>

          <p className="text-gray-500 text-base md:text-lg leading-8 max-w-2xl mx-auto">
            The principles that guide our mission, shape our culture, and define
            the way we teach, mentor, and grow together at Brain Inspire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {values.map((value, index) => (
            <article
              key={value.id}
              className="group relative bg-white border border-gray-200 rounded-2xl p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#2d2b6f]/30 hover:shadow-[0_20px_45px_rgba(45,43,111,0.10)]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#2d2b6f] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-center justify-between mb-7">
                <div className="w-14 h-14 rounded-xl bg-[#2d2b6f] flex items-center justify-center text-white text-xl shadow-[0_8px_20px_rgba(45,43,111,0.20)] transition-all duration-500 group-hover:scale-105">
                  {value.icon}
                </div>

                <span className="text-sm font-bold tracking-widest text-gray-300 group-hover:text-[#2d2b6f]/30 transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="w-10 h-2px bg-[#2d2b6f]/20 mb-5 transition-all duration-500 group-hover:w-16 group-hover:bg-[#2d2b6f]" />

              <h3 className="text-lg font-bold text-[#171642] leading-7 mb-3">
                {value.title}
              </h3>

              <p className="text-sm text-gray-500 leading-7">
                {value.desc}
              </p>

              <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-[#2d2b6f]/3 group-hover:bg-[#2d2b6f]/6 transition-all duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;