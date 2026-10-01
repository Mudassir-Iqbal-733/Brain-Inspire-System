import { useEffect, useRef, useState } from 'react';
import { FaBookOpen, FaUserGraduate, FaChalkboardTeacher, FaSmile } from 'react-icons/fa';

const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { id: 1, icon: <FaBookOpen />, target: 15, suffix: '+', label: 'Programs' },
    { id: 2, icon: <FaUserGraduate />, target: 300, suffix: '+', label: 'Students' },
    { id: 3, icon: <FaChalkboardTeacher />, target: 10, suffix: '+', label: 'Expert Trainers' },
    { id: 4, icon: <FaSmile />, target: 100, suffix: '%', label: 'Students Satisfaction' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="bg-gray-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              animate={hasAnimated}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon, target, suffix, label, animate }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let start = 0;
    const duration = 1800;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [animate, target]);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 sm:p-6 text-center overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl">
      {/* Left line - full height */}
      <div className="absolute left-0 top-0 h-full w-0 bg-[#38BDF8] group-hover:w-1 transition-all duration-300"></div>

      {/* Bottom line - full width */}
      <div className="absolute bottom-0 left-0 w-full h-0 bg-[#38BDF8] group-hover:h-1 transition-all duration-300"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gray-100 text-[#2563EB] text-2xl sm:text-3xl mb-3 transition-all duration-300 group-hover:bg-[#38BDF8] group-hover:text-white group-hover:scale-110">
          {icon}
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1E4A] mb-1">
          {count}
          {suffix}
        </h3>

        <p className="text-xs sm:text-sm md:text-base font-medium text-gray-600 group-hover:text-[#2563EB] transition-colors duration-300">
          {label}
        </p>
      </div>
    </div>
  );
};

export default StatsSection;