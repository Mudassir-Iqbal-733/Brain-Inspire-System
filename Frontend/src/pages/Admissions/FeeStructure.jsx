import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import useLoader from '../../hooks/useLoader';
import { FaWallet, FaChevronDown, FaCheckCircle, FaClock, FaArrowLeft, FaSearch } from 'react-icons/fa';
import SEO from '../../components/SEO';
import programsData from '../../data/programs.json';

const FeeStructure = () => {
  const loading = useLoader();

  const [searchParams] = useSearchParams();
  const [selectedProgramCode, setSelectedProgramCode] = useState('');

  useEffect(() => {
    const programParam = searchParams.get('program');
    if (programParam) {
      setSelectedProgramCode(programParam);
    }
  }, [searchParams]);

  const currentProgram = programsData.find(
    (p) => p.course_code === selectedProgramCode
  );

  if (loading) return <Loader />;

  return (
    <>
      <SEO
        title="Fee Structure"
        description="View complete fee structure for all programs at Brain Inspire System of Education."
        keywords="fee structure, BISE fees, course fees Bahawalpur"
      />
      <PageHeader
        title="Fee Structure"
        breadcrumbs={[
          { label: 'Admissions', href: '/admissions/why-bise' },
          { label: 'Fee Structure' },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Admission Fees
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
              Fee Structure
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              View the complete fee details for your chosen program.
            </p>
          </div>

          <div className="flex justify-center mb-8 md:mb-12">
            <div className="relative w-full max-w-md">
              <select
                value={selectedProgramCode}
                onChange={(e) => setSelectedProgramCode(e.target.value)}
                className="appearance-none w-full bg-white text-[#0F1E4A] font-bold text-sm sm:text-base pl-6 pr-14 py-3.5 sm:py-4 rounded-full cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 shadow-lg hover:border-[#38BDF8] transition-colors duration-300"
              >
                <option value="">-- Select a Program --</option>
                {programsData.map((program, index) => (
                  <option key={index} value={program.course_code}>
                    {program.course_name}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#2563EB]">
                <FaChevronDown />
              </div>
            </div>
          </div>

          {!currentProgram && (
            <div className="max-w-2xl mx-auto text-center py-12 md:py-16 px-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-3xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F1E4A] mb-2">
                Select a Program
              </h3>
              <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto mb-6">
                Choose a program from the dropdown above to view its complete
                fee structure and duration details.
              </p>
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
              >
                <FaArrowLeft className="text-xs" />
                Browse All Programs
              </Link>
            </div>
          )}

          {currentProgram && (
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                    <div>
                      {currentProgram.course_code && (
                        <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-md mb-4">
                          {currentProgram.course_code}
                        </span>
                      )}
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                        {currentProgram.course_name}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base">
                        Complete fee structure and duration details
                      </p>
                    </div>

                    {currentProgram.fees_structure?.total_fee != null && (
                      <div className="shrink-0">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-4 text-center">
                          <p className="text-[#38BDF8] text-xs font-bold tracking-wider uppercase mb-1">
                            Total Fee
                          </p>
                          <p className="text-white text-3xl sm:text-4xl font-black">
                            Rs. {currentProgram.fees_structure.total_fee.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {currentProgram.course_duration && (
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] text-lg">
                          <FaClock />
                        </div>
                        <div>
                          <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
                            Duration
                          </p>
                          <p className="text-white text-xl font-bold">
                            {currentProgram.course_duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
                    <h4 className="text-white font-bold text-base mb-4">
                      Fee Breakdown
                    </h4>

                    <div className="space-y-3">
                      {currentProgram.fees_structure?.registration_fee != null && (
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                          <span className="text-gray-300 text-sm">Registration Fee</span>
                          <span className="text-white font-semibold text-sm">
                            Rs. {currentProgram.fees_structure.registration_fee.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {currentProgram.fees_structure?.misc_fee != null && (
                        <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
                          <span className="text-gray-300 text-sm leading-tight">
                            Misc. Fee
                            <span className="block text-gray-400 text-xs mt-0.5">
                              (Electricity, UPS & Photocopy)
                            </span>
                          </span>
                          <span className="text-white font-semibold text-sm whitespace-nowrap">
                            Rs. {currentProgram.fees_structure.misc_fee.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {currentProgram.fees_structure?.course_fee != null && (
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                          <span className="text-gray-300 text-sm">Course Fee</span>
                          <span className="text-white font-semibold text-sm">
                            Rs. {currentProgram.fees_structure.course_fee.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {currentProgram.fees_structure?.certificate_fee != null && (
                        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                          <span className="text-gray-300 text-sm">Certificate Fee</span>
                          <span className="text-white font-semibold text-sm">
                            Rs. {currentProgram.fees_structure.certificate_fee.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-gray-300 text-sm font-bold">Total Fee</span>
                        <span className="text-[#38BDF8] font-bold text-base">
                          Rs. {currentProgram.fees_structure?.total_fee?.toLocaleString() || '—'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Affordable', 'Quality Education', 'Expert Trainers'].map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        <FaCheckCircle className="text-[#38BDF8] text-[10px]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/admissions/apply-online"
                      className="inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                      Apply Online
                    </Link>
                    <Link
                      to={`/programs/${currentProgram.course_code}`}
                      className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 hover:border-[#38BDF8]/50 transition-all duration-300"
                    >
                      <FaArrowLeft className="text-xs" />
                      View Program Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 md:mt-16 max-w-4xl mx-auto bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-lg mb-4">
                  <FaWallet />
                </div>
                <h4 className="text-[#0F1E4A] font-bold text-base mb-2">
                  Affordable Fees
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Quality education within your budget — flexible fee structures
                  for every program.
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-lg mb-4">
                  <FaClock />
                </div>
                <h4 className="text-[#0F1E4A] font-bold text-base mb-2">
                  Flexible Duration
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose from different program durations based on your goals
                  and availability.
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-lg mb-4">
                  <FaCheckCircle />
                </div>
                <h4 className="text-[#0F1E4A] font-bold text-base mb-2">
                  No Hidden Charges
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Transparent fee structure — no hidden charges or extra costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeeStructure;