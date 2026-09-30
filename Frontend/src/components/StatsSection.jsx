import { FaAward, FaUsers, FaCheckCircle, FaWifi } from 'react-icons/fa';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: <FaAward />,
      value: '11+',
      label: 'Years Excellence',
    },
    {
      id: 2,
      icon: <FaUsers />,
      value: '15+',
      label: 'Expert Staff',
    },
    {
      id: 3,
      icon: <FaCheckCircle />,
      value: '100%',
      label: 'Campus WiFi',
    },
    {
      id: 4,
      icon: <FaWifi />,
      value: '24/7',
      label: 'Free Internet',
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative bg-white border border-gray-200 rounded-xl p-5 sm:p-6 text-center overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#38BDF8] hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-[#1E3A8A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gray-100 text-[#2563EB] text-2xl sm:text-3xl mb-3 transition-all duration-300 group-hover:bg-[#38BDF8] group-hover:text-white group-hover:scale-110">
                  {stat.icon}
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1E4A] mb-1 transition-colors duration-300 group-hover:text-white">
                  {stat.value}
                </h3>

                <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600 transition-colors duration-300 group-hover:text-[#38BDF8]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;