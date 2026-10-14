import { useState, useMemo } from 'react';
import { FaSearch, FaArrowRight, FaCalendar, FaUser, FaTag, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import SEO from '../../components/SEO';
import useLoader from '../../hooks/useLoader';
import Loader from '../../components/Loader';


const Blogs = () => {
  const loading = useLoader();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'News', 'Events', 'Tips', 'Announcements', 'Achievements'];

  
  const blogPosts = [];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.author || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, blogPosts]);

  if (loading) return <Loader />;

  return (
    <>
      <SEO
        title="Blog"
        description="Read latest news, articles, and updates from Brain Inspire System of Education."
        keywords="blog, news, articles, BISE Bahawalpur, education updates"
      />

      <PageHeader
        title="Blogs"
        breadcrumbs={[{ label: 'Blogs' }]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Latest Updates
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
              News & Insights
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Stay updated with the latest news, events, and stories from
              Brain Inspire System of Education.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10 md:mb-12">
            <div className="relative">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#38BDF8] text-sm pointer-events-none" />
              <input
                type="text"
                placeholder="Search blog posts by title, content or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-white text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200 shadow-sm"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30'
                      : 'bg-gray-100 text-[#0F1E4A] hover:bg-[#38BDF8]/20 hover:text-[#2563EB]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16 px-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-3xl mb-4">
                <FaBookOpen />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F1E4A] mb-2">
                {searchQuery || selectedCategory !== 'All'
                  ? 'No Posts Found'
                  : 'Blog Coming Soon'}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-6">
                {searchQuery || selectedCategory !== 'All'
                  ? 'Try adjusting your search or filter to find what you are looking for.'
                  : 'Our blog is being prepared. Please check back soon for updates.'}
              </p>

              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug || post.id}`}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#38BDF8]/10 flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0F1E4A] via-[#0F1E4A]/20 to-transparent opacity-70"></div>

                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-full shadow-lg">
                        <FaTag className="text-[8px]" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1.5">
                        <FaCalendar className="text-[#38BDF8]" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaUser className="text-[#38BDF8]" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F1E4A] leading-snug mb-3 group-hover:text-[#2563EB] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="inline-flex items-center justify-between gap-2 pt-4 border-t border-gray-100">
                      <span className="text-[#0F1E4A] text-sm font-bold group-hover:text-[#2563EB] transition-colors duration-300">
                        Read More
                      </span>
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F1E4A] text-white transition-all duration-300 group-hover:bg-[#38BDF8] group-hover:text-[#0F1E4A] group-hover:translate-x-1">
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
                Never Miss an Update
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                Stay connected with us and be the first to know about new
                courses, events, and announcements.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/admissions/apply-online"
                  className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-white transition-all duration-300"
                >
                  Apply Now
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

export default Blogs;