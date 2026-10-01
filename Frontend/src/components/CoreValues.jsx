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

const CoreValues = () => {
  const values = [
    {
      id: 1,
      icon: <FaHandshake />,
      title: 'Honesty and up Righteousness',
      desc: 'We uphold truth, integrity, and moral values in everything we do.',
    },
    {
      id: 2,
      icon: <FaCheckCircle />,
      title: 'Authenticity',
      desc: 'We stay true to our purpose, our people, and our promise of quality.',
    },
    {
      id: 3,
      icon: <FaUsers />,
      title: 'Mutual Collaboration Between Staff',
      desc: 'Our staff works together as one team to bring the best for our students.',
    },
    {
      id: 4,
      icon: <FaBrain />,
      title: 'Consciousness',
      desc: 'We stay aware and responsible in our teaching, learning, and growth.',
    },
    {
      id: 5,
      icon: <FaTrophy />,
      title: 'Distinction',
      desc: 'We aim to stand out through excellence in every program we offer.',
    },
    {
      id: 6,
      icon: <FaLightbulb />,
      title: 'Innovation and Creativity',
      desc: 'We embrace new ideas and creative methods to deliver modern education.',
    },
    {
      id: 7,
      icon: <FaUserGraduate />,
      title: 'Nurture with High Quality Faculty',
      desc: 'Our expert trainers mentor every student with care and dedication.',
    },
    {
      id: 8,
      icon: <FaAward />,
      title: 'Maintain Excellency',
      desc: 'We continuously raise the bar to deliver the highest standard of learning.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#38BDF8]/10 text-[#2563EB] text-xs font-semibold tracking-wider uppercase mb-4">
            Our Principles
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-5">
            Core Values
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            The principles that guide our mission, shape our culture, and define
            the way we teach, mentor, and grow together at Brain Inspire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 md:p-7 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#38BDF8]/30"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0F1E4A] to-[#1E3A8A] text-white text-2xl shadow-lg transition-all duration-500 group-hover:from-[#38BDF8] group-hover:to-[#2563EB] group-hover:scale-110 group-hover:rotate-6">
                    {value.icon}
                  </div>

                  <span className="text-5xl font-bold text-gray-100 group-hover:text-[#38BDF8]/20 transition-colors duration-500 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0F1E4A] mb-3 leading-snug group-hover:text-[#2563EB] transition-colors duration-300">
                  {value.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;