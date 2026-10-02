import { Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import headerBg from '../../assets/photo-collage.png.png';

const PageHeader = ({ title, subtitle = 'BISE', breadcrumbs = [] }) => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <img
        src={headerBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-[#2D2B6F]/85"></div>

      <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#38BDF8]/15 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-12 h-px bg-[#38BDF8]"></span>
            <span className="text-[#38BDF8] text-xs font-bold tracking-[0.2em] uppercase">
              {subtitle}
            </span>
            <span className="w-12 h-px bg-[#38BDF8]"></span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
            {title}
          </h1>

          <nav className="flex items-center justify-center flex-wrap gap-2 text-sm">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-gray-200 hover:text-[#38BDF8] transition-colors duration-200"
            >
              <FaHome className="text-xs" />
              Home
            </Link>

            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                <FaChevronRight className="text-[#38BDF8]/70 text-[10px]" />
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="text-gray-200 hover:text-[#38BDF8] transition-colors duration-200"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#38BDF8] font-semibold">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;