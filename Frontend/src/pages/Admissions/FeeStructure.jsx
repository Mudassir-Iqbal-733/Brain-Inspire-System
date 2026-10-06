import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import useLoader from '../../hooks/useLoader';
import { FaWallet, FaChevronDown, FaCheckCircle, FaClock, FaArrowLeft, FaSearch } from 'react-icons/fa';
import SEO from '../../components/SEO';

const FeeStructure = () => {
  const loading = useLoader();

  const [searchParams] = useSearchParams();
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedProgram, setSelectedProgram] = useState('');

  const years = ['2026', '2025'];

  const programsData = {
    'ai-automation': { name: 'AI Automation', code: 'D-AIA', duration: '6 Months', months: 6, monthly: '5,000' },
    'freelancing': { name: 'Certification of Freelancing', code: 'C-FL', duration: '3 Months', months: 3, monthly: '5,000' },
    'advance-english': { name: 'Diploma of Advance English', code: 'D-AE', duration: '6 Months', months: 6, monthly: '5,000' },
    'certified-accounting': { name: 'Certificate of Computerized Accounting', code: 'C-CA', duration: '4 Months', months: 4, monthly: '5,000' },
    'diploma-accounting': { name: 'Diploma in Computerized Accounting', code: 'D-CA', duration: '6 Months', months: 6, monthly: '5,000' },
    'basic-english': { name: 'Certification of Basic English Language', code: 'CB-EL', duration: '3 Months', months: 3, monthly: '5,000' },
    'shopify': { name: 'Diploma in Mastering Shopify Training', code: 'DM-ST', duration: '5 Months', months: 5, monthly: '5,000' },
    'daraz': { name: 'Daraz Seller Ecommerce Training', code: 'DS-ET', duration: '3 Months', months: 3, monthly: '5,000' },
    'certified-english': { name: 'Certification in Advance English', code: 'CA-EL', duration: '4 Months', months: 4, monthly: '5,000' },
    'computer-architecture': { name: 'Diploma in Computer Architecture Designing', code: 'D-CAD', duration: '6 Months', months: 6, monthly: '5,000' },
    'video-editing': { name: 'Diploma in Video Editing', code: 'D-VE', duration: '4 Months', months: 4, monthly: '5,000' },
    'graphic-designing': { name: 'Diploma in Graphic Designing', code: 'D-GD', duration: '5 Months', months: 5, monthly: '5,000' },
    'seo': { name: 'Advance SEO Training', code: 'A-SEO', duration: '3 Months', months: 3, monthly: '5,000' },
    'wordpress': { name: 'WordPress Development', code: 'D-WP', duration: '4 Months', months: 4, monthly: '5,000' },
    'web-technology': { name: 'Web Technology', code: 'C-WT', duration: '5 Months', months: 5, monthly: '5,000' },
    'office-com': { name: 'Office Management (COM)', code: 'COM', duration: '3 Months', months: 3, monthly: '5,000' },
    'office-dom': { name: 'Office Management (DOM)', code: 'DOM', duration: '6 Months', months: 6, monthly: '5,000' },
    'web-designing': { name: 'Web Designing', code: 'C-WD', duration: '4 Months', months: 4, monthly: '5,000' },
    'web-development': { name: 'Web Development', code: 'D-WD', duration: '6 Months', months: 6, monthly: '5,000' },
    'c-programming': { name: 'C Programming', code: 'C-CP', duration: '3 Months', months: 3, monthly: '5,000' },
    'python': { name: 'Python Programming', code: 'D-PP', duration: '4 Months', months: 4, monthly: '5,000' },
    'ui-ux': { name: 'Advance UI/UX Training', code: 'A-UX', duration: '5 Months', months: 5, monthly: '5,000' },
  };

  useEffect(() => {
    const yearParam = searchParams.get('year');
    const programParam = searchParams.get('program');

    if (yearParam && years.includes(yearParam)) {
      setSelectedYear(yearParam);
    }

    if (programParam) {
      setSelectedProgram(programParam);
    }
  }, [searchParams]);

  const currentProgram = selectedProgram ? programsData[selectedProgram] : null;

  const totalFee = currentProgram
    ? (parseInt(currentProgram.monthly.replace(',', '')) * currentProgram.months).toLocaleString()
    : '0';

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

          <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-12">
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-[#2D2B6F] text-white font-bold text-sm sm:text-base pl-6 pr-14 py-3.5 sm:py-4 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 shadow-lg shadow-[#2D2B6F]/20 hover:bg-[#1E3A8A] transition-colors duration-300"
              >
                {years.map((year) => (
                  <option key={year} value={year} className="bg-white text-[#0F1E4A]">
                    Year {year}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#38BDF8]">
                <FaChevronDown />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="appearance-none bg-white text-[#0F1E4A] font-bold text-sm sm:text-base pl-6 pr-14 py-3.5 sm:py-4 rounded-full cursor-pointer border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 shadow-lg hover:border-[#38BDF8] transition-colors duration-300 min-w-260px sm:min-w-300px"
              >
                <option value="">-- Select a Program --</option>
                {Object.entries(programsData).map(([slug, program]) => (
                  <option key={slug} value={slug}>
                    {program.name}
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
                      <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-md mb-4">
                        {currentProgram.code}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                        {currentProgram.name}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base">
                        Complete fee structure and duration details
                      </p>
                    </div>

                    <div className="shrink-0">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-4 text-center">
                        <p className="text-[#38BDF8] text-xs font-bold tracking-wider uppercase mb-1">
                          Monthly Fee
                        </p>
                        <p className="text-white text-3xl sm:text-4xl font-black">
                          Rs. {currentProgram.monthly}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] text-lg">
                          <FaClock />
                        </div>
                        <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
                          Duration
                        </p>
                      </div>
                      <p className="text-white text-2xl font-bold">
                        {currentProgram.months}{' '}
                        <span className="text-base font-medium text-gray-300">
                          Months
                        </span>
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] text-lg">
                          <FaWallet />
                        </div>
                        <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider">
                          Monthly
                        </p>
                      </div>
                      <p className="text-white text-2xl font-bold">
                        Rs.{' '}
                        <span className="text-base font-medium text-gray-300">
                          {currentProgram.monthly}
                        </span>
                      </p>
                    </div>

                    <div className="bg-[#38BDF8] rounded-2xl p-5 shadow-lg shadow-[#38BDF8]/25">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0F1E4A]/15 text-[#0F1E4A] text-lg">
                          <FaWallet />
                        </div>
                        <p className="text-[#0F1E4A] text-xs font-bold uppercase tracking-wider">
                          Total Fee
                        </p>
                      </div>
                      <p className="text-[#0F1E4A] text-2xl font-black">
                        Rs.{' '}
                        <span className="text-base font-bold">{totalFee}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
                    <h4 className="text-white font-bold text-base mb-4">
                      Fee Breakdown
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                        <span className="text-gray-300 text-sm">Monthly Fee</span>
                        <span className="text-white font-semibold text-sm">
                          Rs. {currentProgram.monthly}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                        <span className="text-gray-300 text-sm">Duration</span>
                        <span className="text-white font-semibold text-sm">
                          {currentProgram.months} Months
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-gray-300 text-sm">Total Fee</span>
                        <span className="text-[#38BDF8] font-bold text-base">
                          Rs. {totalFee}
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
                      to="/programs"
                      className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 hover:border-[#38BDF8]/50 transition-all duration-300"
                    >
                      <FaArrowLeft className="text-xs" />
                      Back to Programs
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
                  All programs at just Rs. 5,000 per month — quality education
                  within your budget.
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
                  Choose from 3 to 6-month programs based on your goals and
                  availability.
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
                  Transparent fee structure — no registration, no extra costs.
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