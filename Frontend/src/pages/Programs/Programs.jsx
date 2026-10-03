import { useState, useMemo } from 'react';
import { FaArrowRight, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import programsData from '../../data/programs.json';

const Programs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Certification', 'Diploma', 'Training'];

  const filteredPrograms = useMemo(() => {
    return programsData.filter((program) => {
      const matchesSearch =
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (program.course_code || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (program.platform || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'All' || program.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  return (
    <>
      <PageHeader
        title="Our Programs"
        breadcrumbs={[{ label: 'Programs' }]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Explore All
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
              All Programs We Offer
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Choose from {programsData.length}+ industry-focused programs
              designed to build real skills and open real career doors.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10 md:mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#38BDF8] text-sm pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search programs by name, code or platform..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200 shadow-sm"
                />
              </div>

              <div className="relative">
                <FaFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-[#38BDF8] text-sm pointer-events-none" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none w-full md:w-48 pl-12 pr-10 py-3.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-[#0F1E4A] cursor-pointer focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200 shadow-sm"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === 'All' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-5 flex-wrap">
              <p className="text-sm text-gray-500">
                Showing <span className="font-bold text-[#0F1E4A]">{filteredPrograms.length}</span> program{filteredPrograms.length !== 1 ? 's' : ''}
              </p>

              {(searchQuery || selectedType !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('All');
                  }}
                  className="text-sm text-[#2563EB] font-semibold hover:text-[#38BDF8] transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16 px-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-3xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F1E4A] mb-2">
                No Programs Found
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All');
                }}
                className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {filteredPrograms.map((program) => (
                <Link
                  key={program.id}
                  to={`/programs/${program.course_code || program.id}`}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#38BDF8]/10 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#0F1E4A] via-[#0F1E4A]/30 to-transparent opacity-90"></div>

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {program.course_code && (
                        <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-full shadow-lg">
                          {program.course_code}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-white bg-white/20 backdrop-blur-md border border-white/25 px-3 py-1.5 rounded-full">
                        {program.type}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-bold text-white leading-snug drop-shadow-lg">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {program.duration_months && (
                        <span className="flex items-center gap-1.5 text-[#2563EB] bg-[#38BDF8]/10 px-2.5 py-1 rounded-full text-xs font-semibold">
                          <FaClock className="text-[10px]" />
                          {program.duration_months} Months
                        </span>
                      )}

                      {program.platform && (
                        <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#2563EB] bg-gray-100 px-2.5 py-1 rounded-full">
                          {program.platform}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {program.course_contents
                        ? `${program.course_contents.slice(0, 3).join(', ')}, and more.`
                        : program.modules
                        ? `${program.modules.length} comprehensive modules covering all aspects.`
                        : 'Comprehensive industry-focused training program.'}
                    </p>

                    <div className="inline-flex items-center justify-between gap-2 pt-4 border-t border-gray-100 group/link">
                      <span className="text-[#0F1E4A] text-sm font-bold group-hover/link:text-[#2563EB] transition-colors duration-300">
                        View Details
                      </span>
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F1E4A] text-white transition-all duration-300 group-hover/link:bg-[#38BDF8] group-hover/link:text-[#0F1E4A] group-hover/link:translate-x-1">
                        <FaArrowRight className="text-xs" />
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#38BDF8] to-[#2563EB] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 md:mt-20 bg-[#2D2B6F] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

            <div className="relative text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                Not Sure Which Program to Choose?
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                Get free career guidance from our experts. We'll help you find
                the perfect program based on your goals.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/admissions/apply-online"
                  className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-white transition-all duration-300"
                >
                  Get Free Guidance
                  <FaArrowRight className="text-xs" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 hover:border-[#38BDF8]/50 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;