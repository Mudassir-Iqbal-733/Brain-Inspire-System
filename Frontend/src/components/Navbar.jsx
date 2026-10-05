import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HiX, HiChevronDown } from 'react-icons/hi';
import { FaGraduationCap } from 'react-icons/fa';
import logo from '../assets/Logo.png';
import whiteLogo from '../assets/Logo-white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
      href: '/about/overview',
      children: [
        { name: 'Overview', href: '/about/overview' },
        { name: 'Director Message', href: '/about/director-message' },
        { name: 'Managing Director Message', href: '/about/managing-director-message' },
        { name: 'The Princely State', href: '/about/princely-state' },
      ],
    },
    { name: 'Programs', href: '/programs' },
    {
      name: 'Admissions',
      href: '/admissions/why-bise',
      children: [
        { name: 'Why BISE', href: '/admissions/why-bise' },
        { name: 'Apply Online', href: '/admissions/apply-online' },
        { name: 'Fee Structure', href: '/admissions/fee-structure' },
        { name: 'Rules & Regulations', href: '/admissions/rules-regulations' },
      ],
    },
    { name: 'Contact', href: '/contact-us' },
  ];

  const isActive = (href) => {
    if (!href) return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const isSectionActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    if (!isOpen) {
      setAboutOpen(false);
      setAdmissionsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Brain Inspire" className="h-12 md:h-14 w-auto" />
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                {link.children ? (
                  <>
                    <Link
                      to={link.href}
                      className={`relative flex items-center gap-1.5 py-2 text-[16px] font-semibold tracking-wide transition-colors duration-200 ${
                        isActive(link.href)
                          ? 'text-[#2563EB]'
                          : 'text-gray-700 hover:text-[#2563EB]'
                      }`}
                    >
                      {link.name}
                      <HiChevronDown className="text-sm transition-transform duration-300 group-hover:rotate-180" />
                      <span
                        className={`absolute left-0 -bottom-0.5 h-3px rounded-full bg-[#2563EB] transition-all duration-300 ${
                          isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      ></span>
                    </Link>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-[#0F1E4A]/10 p-2 min-w-250px relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45"></div>

                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block px-4 py-2.5 text-[15px] font-medium rounded-xl transition-all duration-200 ${
                              isActive(child.href)
                                ? 'bg-[#2563EB] text-white font-semibold'
                                : 'text-gray-700 hover:bg-[#2563EB]/8 hover:text-[#2563EB]'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`relative py-2 text-[16px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive(link.href)
                        ? 'text-[#2563EB]'
                        : 'text-gray-700 hover:text-[#2563EB]'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-3px rounded-full bg-[#2563EB] transition-all duration-300 ${
                        isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    ></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link
            to="/admissions/apply-online"
            className="hidden lg:inline-flex items-center gap-2 bg-[#2563EB] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-[#2563EB]/30 hover:bg-[#0F1E4A] transition-all duration-300"
          >
            <FaGraduationCap className="text-base" />
            Apply Online
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden group flex flex-col items-end justify-center gap-1.5 w-10 h-10 p-1"
            aria-label="Toggle menu"
          >
            <span className="w-7 h-0.5 bg-[#0F1E4A] rounded-full transition-all duration-300 group-hover:bg-[#2563EB]"></span>
            <span className="w-5 h-0.5 bg-[#0F1E4A] rounded-full transition-all duration-300 group-hover:w-7 group-hover:bg-[#2563EB]"></span>
            <span className="w-7 h-0.5 bg-[#0F1E4A] rounded-full transition-all duration-300 group-hover:bg-[#2563EB]"></span>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 z-60 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-linear-to-b from-[#0F1E4A] to-[#1E3A8A] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
            <img src={whiteLogo} alt="Brain Inspire" className="h-11 w-auto" />

            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white p-1.5 rounded-lg hover:text-[#38BDF8] hover:bg-white/5 transition-all duration-200"
              aria-label="Close menu"
            >
              <HiX />
            </button>
          </div>

          <ul className="p-5 flex flex-col gap-1.5 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">
            {navLinks.map((link) => {
              if (link.children) {
                const isAbout = link.name === 'About';
                const isAdmissions = link.name === 'Admissions';
                const isMenuOpen = isAbout ? aboutOpen : admissionsOpen;
                const setMenuOpen = isAbout ? setAboutOpen : setAdmissionsOpen;
                const activeSection = isAbout
                  ? isSectionActive('/about')
                  : isSectionActive('/admissions');

                return (
                  <li key={link.name}>
                    <button
                      onClick={() => setMenuOpen(!isMenuOpen)}
                      className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 font-medium rounded-xl transition-all duration-300 ${
                        activeSection
                          ? 'bg-[#38BDF8] text-[#0F1E4A] shadow-lg shadow-[#38BDF8]/25'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{link.name}</span>
                      <HiChevronDown
                        className={`text-lg transition-transform duration-300 ${
                          isMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        isMenuOpen ? 'max-h-96 mt-2' : 'max-h-0'
                      }`}
                    >
                      <div className="bg-white/5 rounded-xl p-2 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              to={child.href}
                              onClick={() => setIsOpen(false)}
                              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                                isActive(child.href)
                                  ? 'bg-[#38BDF8] text-[#0F1E4A] font-semibold shadow-md shadow-[#38BDF8]/20'
                                  : 'text-gray-200 hover:bg-[#38BDF8]/20 hover:text-[#38BDF8]'
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3.5 font-medium rounded-xl transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-[#38BDF8] text-[#0F1E4A] shadow-lg shadow-[#38BDF8]/25'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            <li className="pt-4">
              <Link
                to="/admissions/apply-online"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#2563EB] text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#0F1E4A] transition-all duration-300"
              >
                <FaGraduationCap className="text-base" />
                Apply Online
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-55 lg:hidden"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;