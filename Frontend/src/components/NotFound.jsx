import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';
import SEO from './SEO';

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist on Brain Inspire System of Education."
        keywords="404, not found, error page"
      />

      <section className="relative bg-linear-to-br from-[#0F1E4A] via-[#2D2B6F] to-[#1E3A8A] min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-[#38BDF8]/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-[#38BDF8]/20 rounded-full"></div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#38BDF8]/20 rounded-full blur-3xl"></div>

            <h1 className="relative text-8xl sm:text-9xl md:text-[12rem] font-black text-white leading-none tracking-tighter">
              4
              <span className="text-[#38BDF8] inline-block animate-pulse">0</span>
              4
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-12 h-px bg-[#38BDF8]"></span>
            <span className="text-[#38BDF8] text-xs font-bold tracking-[0.3em] uppercase">
              Page Not Found
            </span>
            <span className="w-12 h-px bg-[#38BDF8]"></span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Oops! Something went wrong
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            The page you're looking for doesn't exist, has been moved, or is
            temporarily unavailable. Let's get you back on track.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#38BDF8]/30 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <FaHome className="text-sm" />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-white/20 hover:border-[#38BDF8]/50 transition-all duration-300"
            >
              <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
              Go Back
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-xs sm:text-sm mb-4">
              Or try one of these pages
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about/overview' },
                { name: 'Programs', href: '/programs' },
                { name: 'Contact', href: '/contact-us' },
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.href}
                  className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#38BDF8] text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full hover:bg-white/5 transition-all duration-200"
                >
                  <FaSearch className="text-[10px]" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;