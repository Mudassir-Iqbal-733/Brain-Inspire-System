import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaArrowLeft,
  FaClock,
  FaWallet,
  FaCheckCircle,
  FaGraduationCap,
  FaChevronDown,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import useLoader from '../../hooks/useLoader';
import programsData from '../../data/programs.json';
import SEO from '../../components/SEO';

const ProgramDetails = () => {
  const loading = useLoader();

  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2026');

  const years = ['2026', '2025'];

  const program = programsData.find(
    (p) => p.course_code === slug || String(p.id) === slug
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (loading) return <Loader />;

  if (!program) {
    return (
      <>
      <SEO
          title="Program Not Found"
          description="The program you're looking for doesn't exist at Brain Inspire."
          keywords="not found, program"
        />
        <PageHeader
          title="Program Not Found"
          breadcrumbs={[
            { label: 'Programs', href: '/programs' },
            { label: 'Not Found' },
          ]}
        />

        <section className="bg-white py-16 md:py-24 overflow-hidden">
          <div className="max-w-2xl mx-auto  sm:px-6 lg:px-8 text-center py-16 px-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-3xl mb-4">
              <FaGraduationCap />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#0F1E4A] mb-2">
              Program Not Found
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              The program you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
            >
              <FaArrowLeft className="text-xs" />
              Browse All Programs
            </Link>
          </div>
        </section>
      </>
    );
  }

  const monthlyFee = program.fees?.[selectedYear]?.monthly_fee || 0;
  const totalFee = program.fees?.[selectedYear]?.total_fee || 0;
  const courseContents = program.modules
    ? program.modules.flatMap((m) => m.course_contents)
    : program.course_contents || [];

  const relatedPrograms = programsData
    .filter((p) => p.id !== program.id && p.type === program.type)
    .slice(0, 3);

  const handleApply = () => {
    navigate(`/admissions/apply-online?program=${program.course_code || program.id}`);
  };

  return (
    <>
    <SEO
        title={program.title}
        description={`Enroll in ${program.title} at Brain Inspire System of Education. ${program.duration_months || ''} ${program.type || ''} course.`}
        keywords={`${program.title}, ${program.type}, ${program.course_code}, BISE courses`}
      />
      <PageHeader
        title={program.title}
        breadcrumbs={[
          { label: 'Programs', href: '/programs' },
          { label: program.title },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-[#2563EB] text-sm font-semibold hover:text-[#38BDF8] transition-colors duration-200 mb-8"
          >
            <FaArrowLeft className="text-xs" />
            Back to All Programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
            <div className="lg:col-span-2">
              <div className="relative rounded-3xl overflow-hidden h-64 sm:h-80 md:h-96 mb-8">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0F1E4A] via-[#0F1E4A]/30 to-transparent"></div>

                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  {program.course_code && (
                    <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-full shadow-lg">
                      {program.course_code}
                    </span>
                  )}
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-white bg-white/20 backdrop-blur-md border border-white/25 px-3 py-1.5 rounded-full">
                    {program.type}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
                  {program.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                  {program.duration_months && (
                    <span className="flex items-center gap-2 bg-[#38BDF8]/10 text-[#2563EB] px-4 py-2 rounded-full text-sm font-semibold">
                      <FaClock className="text-xs" />
                      {program.duration_months} Months
                    </span>
                  )}

                  {program.platform && (
                    <span className="flex items-center gap-2 bg-gray-100 text-[#0F1E4A] px-4 py-2 rounded-full text-sm font-semibold">
                      <FaExternalLinkAlt className="text-xs" />
                      {program.platform}
                    </span>
                  )}

                  <span className="flex items-center gap-2 bg-gray-100 text-[#0F1E4A] px-4 py-2 rounded-full text-sm font-semibold">
                    <FaGraduationCap className="text-xs" />
                    {program.type}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#0F1E4A] mb-5 flex items-center gap-3">
                  <span className="w-1 h-6 bg-[#38BDF8] rounded-full"></span>
                  Course Contents
                </h2>

                {program.modules ? (
                  <div className="space-y-6">
                    {program.modules.map((module) => (
                      <div key={module.module}>
                        <p className="text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3">
                          Module {module.module}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {module.course_contents.map((content, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <FaCheckCircle className="text-[#38BDF8] text-sm mt-0.5 shrink-0" />
                              <span className="text-gray-700 text-sm leading-relaxed">
                                {content}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {courseContents.map((content, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <FaCheckCircle className="text-[#38BDF8] text-sm mt-0.5 shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {content}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#0F1E4A] mb-5 flex items-center gap-3">
                  <span className="w-1 h-6 bg-[#38BDF8] rounded-full"></span>
                  What You'll Learn
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Practical Skills', desc: 'Hands-on training with real projects' },
                    { label: 'Expert Guidance', desc: 'Learn from industry professionals' },
                    { label: 'Certification', desc: 'Get recognized certificate' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 rounded-2xl p-4"
                    >
                      <FaCheckCircle className="text-[#38BDF8] text-lg mb-3" />
                      <p className="text-[#0F1E4A] font-bold text-sm mb-1">
                        {item.label}
                      </p>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="relative bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

                  <div className="relative">
                    <p className="text-[#38BDF8] text-xs font-bold tracking-wider uppercase mb-2">
                      Fee Structure
                    </p>

                    <h3 className="text-white text-xl font-bold mb-6">
                      Course Fee Details
                    </h3>

                    <div className="mb-5">
                      <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-2">
                        Select Year
                      </label>
                      <div className="relative">
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="appearance-none w-full bg-white/10 text-white font-bold text-sm pl-4 pr-10 py-3 rounded-xl cursor-pointer border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 hover:bg-white/15 transition-colors duration-300"
                        >
                          {years.map((year) => (
                            <option key={year} value={year} className="bg-white text-[#0F1E4A]">
                              Year {year}
                            </option>
                          ))}
                        </select>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#38BDF8]">
                          <FaChevronDown className="text-xs" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-4">
                      <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10">
                        <span className="text-gray-300 text-sm">Monthly Fee</span>
                        <span className="text-white font-bold text-sm">
                          Rs. {monthlyFee.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10">
                        <span className="text-gray-300 text-sm">Duration</span>
                        <span className="text-white font-bold text-sm">
                          {program.duration_months || 'N/A'} Months
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-gray-300 text-sm">Total Fee</span>
                        <span className="text-[#38BDF8] font-bold text-base">
                          Rs. {totalFee.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleApply}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-4 rounded-full font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-white hover:scale-[1.02] transition-all duration-300 mb-3"
                    >
                      Apply Now
                      <FaArrowRight className="text-xs" />
                    </button>

                    <Link
                      to={`/admissions/fee-structure?program=${program.course_code || program.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 hover:border-[#38BDF8]/50 transition-all duration-300"
                    >
                      <FaWallet className="text-xs" />
                      Full Fee Details
                    </Link>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                  <h4 className="text-[#0F1E4A] font-bold text-base mb-4">
                    Quick Info
                  </h4>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#2563EB] text-sm">
                        <FaGraduationCap />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Type</p>
                        <p className="text-[#0F1E4A] font-bold text-sm">{program.type}</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#2563EB] text-sm">
                        <FaClock />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Duration</p>
                        <p className="text-[#0F1E4A] font-bold text-sm">
                          {program.duration_months || 'N/A'} Months
                        </p>
                      </div>
                    </li>

                    {program.platform && (
                      <li className="flex items-start gap-3">
                        <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#2563EB] text-sm">
                          <FaExternalLinkAlt />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Platform</p>
                          <p className="text-[#0F1E4A] font-bold text-sm">
                            {program.platform}
                          </p>
                        </div>
                      </li>
                    )}
                  </ul>

                  <div className="mt-5 pt-5 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-medium mb-2">
                      Need Help?
                    </p>
                    <a
                      href="tel:03004506850"
                      className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-4 py-2.5 rounded-full font-bold text-xs hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
                    >
                      Call: 0300-4506850
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedPrograms.length > 0 && (
            <div className="pt-12 md:pt-16 border-t border-gray-100">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-12 h-px bg-[#38BDF8]"></span>
                  <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                    Related Programs
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1E4A] leading-tight">
                  You May Also Like
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                {relatedPrograms.map((related) => (
                  <Link
                    key={related.id}
                    to={`/programs/${related.course_code || related.id}`}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#38BDF8]/10 flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#0F1E4A] via-[#0F1E4A]/30 to-transparent opacity-90"></div>

                      <div className="absolute top-4 left-4">
                        <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-full">
                          {related.type}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-base font-bold text-white leading-snug drop-shadow-lg line-clamp-2">
                          {related.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between gap-2">
                      <span className="text-[#2563EB] text-xs font-bold">
                        {related.duration_months
                          ? `${related.duration_months} Months`
                          : 'View Details'}
                      </span>
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F1E4A] text-white transition-all duration-300 group-hover:bg-[#38BDF8] group-hover:text-[#0F1E4A] group-hover:translate-x-1">
                        <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProgramDetails;