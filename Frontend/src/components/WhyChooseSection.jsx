import { FaArrowRight, FaUserTie, FaLaptopCode, FaHandshake, FaWallet } from 'react-icons/fa';

const WhyChooseSection = () => {
  const points = [
    { icon: <FaUserTie />, label: 'Industry-experienced trainers' },
    { icon: <FaLaptopCode />, label: 'Hands-on practical training' },
    { icon: <FaHandshake />, label: 'Career guidance & support' },
    { icon: <FaWallet />, label: 'Affordable fee structure' },
  ];

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider mb-3 uppercase">
            Why Choose Us
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
            Why Choose Our Institute
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
            At Brain Inspire System of Education, we believe learning should be practical,
            affordable, and career-focused. Our expert trainers bring real industry
            experience to every classroom, helping students build skills that matter.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 text-left">
            {points.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 transition-all duration-300 hover:border-[#38BDF8] hover:bg-white hover:shadow-md"
              >
                <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#38BDF8]/10 text-[#2563EB] text-base transition-all duration-300 group-hover:bg-[#38BDF8] group-hover:text-white">
                  {item.icon}
                </span>
                <span className="text-gray-700 text-sm sm:text-base font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/about"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-[#38BDF8] transition-colors duration-300"
          >
            Learn More
            <FaArrowRight className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;