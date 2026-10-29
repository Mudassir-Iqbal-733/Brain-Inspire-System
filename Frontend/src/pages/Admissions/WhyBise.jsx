import { useEffect } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import SEO from '../../components/SEO';
import useAdmissionStore from '../../store/useAdmissionStore';
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
  FaInfoCircle,
} from 'react-icons/fa';

const iconMap = {
  FaGraduationCap: <FaGraduationCap />,
  FaBookOpen: <FaBookOpen />,
  FaRocket: <FaRocket />,
  FaAward: <FaAward />,
  FaUsers: <FaUsers />,
  FaHandshake: <FaHandshake />,
  FaCheckCircle: <FaCheckCircle />,
  FaBrain: <FaBrain />,
  FaTrophy: <FaTrophy />,
  FaLightbulb: <FaLightbulb />,
  FaUserGraduate: <FaUserGraduate />,
  FaStar: <FaStar />,
  FaInfoCircle: <FaInfoCircle />,
};

const WhyBise = () => {
  const { data, fetchAdmissionsData, loading } = useAdmissionStore();

  useEffect(() => {
    fetchAdmissionsData();
  }, [fetchAdmissionsData]);

  if (loading || !data) return <Loader />;

  const coreValues = data.rules_points || [];

  return (
    <>
      <SEO
        title={data.seo_title || "Why BISE | Brain Inspire"}
        description={data.seo_description || "Why choose Brain Inspire System of Education — quality education, expert faculty, and career-focused programs."}
        keywords={data.seo_keywords || "why BISE, best institute Bahawalpur, quality education"}
      />

      <PageHeader
        title={data.why_title || "Why BISE"}
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
              {data.why_title || "Why Choose BISE"}
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {data.why_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {data.why_cards?.map((card, i) => (
              <div
                key={i}
                className={`group relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:border-[#38BDF8]/40 hover:shadow-2xl hover:shadow-[#38BDF8]/10 hover:-translate-y-1 overflow-hidden ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {iconMap[card.icon] || <FaCheckCircle />}
                  </div>

                  <h3 className="text-xl font-bold text-[#0F1E4A] mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {coreValues.length > 0 && (
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
                  {coreValues.map((point, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-[#38BDF8]/40 hover:-translate-y-1"
                    >
                      <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-sm">
                        {iconMap[point.icon] || <FaStar />}
                      </span>
                      <p className="text-gray-200 text-sm leading-relaxed pt-1.5 font-medium">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default WhyBise;