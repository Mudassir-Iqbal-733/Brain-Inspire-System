import { FaEye, FaBullseye, FaCheckCircle } from 'react-icons/fa';
import about from '../data/about.json';

const MissionVision = ({ rounded = false }) => {
  const { visions, missions } = about.missionVision;

  return (
    <section className={`bg-[#2D2B6F] py-20 md:py-28 overflow-hidden ${rounded ? 'rounded-3xl' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-12 h-px bg-[#38BDF8]"></span>
            <span className="text-[#38BDF8] text-xs font-bold tracking-[0.2em] uppercase">
              Our Purpose
            </span>
            <span className="w-12 h-px bg-[#38BDF8]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Mission &{' '}
            <span className="text-[#38BDF8] relative">
              Vision
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#38BDF8]/40 rounded-full"></span>
            </span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            The driving force behind everything we do at Brain Inspire System
            of Education — our commitment to students, society, and Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <div className="group relative bg-white/4 backdrop-blur-sm border border-white/10 rounded-3xl p-7 sm:p-9 md:p-10 transition-all duration-500 hover:bg-white/6 hover:border-[#38BDF8]/40 hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#38BDF8]/20 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-7">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-40"></div>
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                    <FaEye />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Our Vision
                  </h3>
                  <p className="text-[#38BDF8] text-xs md:text-sm font-medium mt-1">
                    Where we are headed
                  </p>
                </div>
              </div>

              <ul className="space-y-5">
                {visions.map((vision, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 mt-1 text-[#38BDF8] text-base">
                      <FaCheckCircle />
                    </span>
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                      {vision}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="group relative bg-white/4 backdrop-blur-sm border border-white/10 rounded-3xl p-7 sm:p-9 md:p-10 transition-all duration-500 hover:bg-white/6 hover:border-[#38BDF8]/40 hover:-translate-y-1 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#38BDF8]/20 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-7">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-40"></div>
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                    <FaBullseye />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    Our Mission
                  </h3>
                  <p className="text-[#38BDF8] text-xs md:text-sm font-medium mt-1">
                    How we get there
                  </p>
                </div>
              </div>

              <ul className="space-y-5">
                {missions.map((mission, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 mt-1 text-[#38BDF8] text-base">
                      <FaCheckCircle />
                    </span>
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                      {mission}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;