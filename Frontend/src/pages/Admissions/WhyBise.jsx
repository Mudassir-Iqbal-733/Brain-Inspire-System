import PageHeader from '../../components/common/PageHeader';
import {
  FaGraduationCap,
  FaBookOpen,
  FaRocket,
  FaAward,
  FaUsers,
  FaHandshake,
  FaCheckCircle,
  FaBrain,
  FaTrophy,
  FaLightbulb,
  FaUserGraduate,
  FaStar,
} from 'react-icons/fa';

const WhyBise = () => {
  const intro =
    'Are you looking for a professional course that can prove to be a healthy source of earning in this brave world? A program that may lead Pakistan on the track of progress, a course that meets your dreams and future aspirations, and imparts you with the highest skilled and standard study about different technical skills.';

  const features = [
    {
      icon: <FaGraduationCap />,
      title: 'Degree Values',
      desc: 'These programs help you find attractive professional status in society and start your own business. Today the requirements of the world are quite varied and wide in range, and because of extreme competition, many academic programs have been started to ensure a bright future. Our program is embodied with skilled qualities which will ensure students their bright future and provide good opportunities for jobs.',
    },
    {
      icon: <FaBookOpen />,
      title: 'Standard Education',
      desc: 'There are many talented and industrious students who fail to brighten their future due to the lack of professional courses. In this regard, our program will make them experts in varied skills so they can easily adjust themselves to any overseas environment.',
    },
    {
      icon: <FaRocket />,
      title: 'Entrepreneurs',
      desc: 'Our vision is not to orient students as job seekers rather to embellish them with such attributes which may broaden the ways for them to be job creators. They will be capable to start their own business on the broad spectrum of the world.',
    },
    {
      icon: <FaAward />,
      title: 'Acknowledgement',
      desc: 'Our sole focus is to equip you with essential life skills and empower you with modern technical knowledge and stimulate leadership skills in you.',
    },
    {
      icon: <FaUsers />,
      title: 'Faculty',
      desc: 'Our staff members are highly experienced and competent professionals who have profound knowledge and highly inspirational skills to put you on the track of the competent world. By interacting with our staff, you will enjoy and learn a lot.',
    },
  ];

  const coreValues = [
    { icon: <FaHandshake />, label: 'Honesty and up righteousness' },
    { icon: <FaCheckCircle />, label: 'Authenticity' },
    { icon: <FaUsers />, label: 'Mutual collaboration between staff' },
    { icon: <FaBrain />, label: 'Consciousness' },
    { icon: <FaTrophy />, label: 'Distinction' },
    { icon: <FaLightbulb />, label: 'Innovation and creativity' },
    { icon: <FaUserGraduate />, label: 'Nurture with high quality faculty' },
    { icon: <FaStar />, label: 'Maintain Excellency' },
  ];

  return (
    <>
      <PageHeader
        title="Why BISE"
        breadcrumbs={[{ label: 'Why BISE' }]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Why Choose Us
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-5">
              Why Choose BISE
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:border-[#38BDF8]/40 hover:shadow-2xl hover:shadow-[#38BDF8]/10 hover:-translate-y-1 overflow-hidden ${
                  i === 4 ? 'lg:col-span-1 md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-[#0F1E4A] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="w-12 h-px bg-[#38BDF8]"></span>
                  <span className="text-[#38BDF8] text-xs font-bold tracking-[0.2em] uppercase">
                    Our Principles
                  </span>
                  <span className="w-12 h-px bg-[#38BDF8]"></span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  Core{' '}
                  <span className="text-[#38BDF8] relative">
                    Values
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#38BDF8]/40 rounded-full"></span>
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {coreValues.map((value, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#38BDF8]/40 hover:-translate-y-1"
                  >
                    <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-sm">
                      {value.icon}
                    </span>
                    <p className="text-gray-200 text-sm leading-relaxed pt-1.5 font-medium">
                      {value.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyBise;