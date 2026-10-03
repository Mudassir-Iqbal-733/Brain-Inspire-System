import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HiX, HiChevronDown } from 'react-icons/hi';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../assets/Logo.png';
import whiteLogo from '../assets/Logo-white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);
  const [feeOpen, setFeeOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
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
      children: [
        { name: 'Why BISE', href: '/admissions/why-bise' },
        { name: 'Apply Online', href: '/admissions/apply-online' },
        {
          name: 'Fee Structure',
          children: [
            { name: 'Year 2026', href: '/admissions/fee-structure?year=2026' },
            { name: 'Year 2025', href: '/admissions/fee-structure?year=2025' },
          ],
        },
        { name: 'Rules & Regulations', href: '/admissions/rules-regulations' },
      ],
    },
    // { name: 'Blog', href: '/' },
    { name: 'Contact', href: '/contact-us' },
  ];

  const isActive = (href) => {
    if (!href) return false;
    if (href === '/') return location.pathname === '/';
    const [path, query] = href.split('?');
    if (query) {
      return location.pathname === path && location.search.includes(query);
    }
    return location.pathname.startsWith(path);
  };

  const isSectionActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    if (!isOpen) {
      setAboutOpen(false);
      setAdmissionsOpen(false);
      setFeeOpen(false);
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
          <a href="/" className="flex items-center">
            <img src={logo} alt="Brain Inspire" className="h-12 md:h-14 w-auto" />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex flex-col items-end justify-center gap-1.5 w-10 h-10 p-1"
            aria-label="Toggle menu"
          >
            <span className="w-7 h-0.5 bg-[#0F1E4A] rounded-full transition-all duration-300 group-hover:bg-[#38BDF8]"></span>
            <span className="w-5 h-0.5 bg-[#0F1E4A] rounded-full transition-all duration-300 group-hover:w-7 group-hover:bg-[#38BDF8]"></span>
            <span className="w-7 h-0.5 bg-[#0F1E4A] rounded-full transition-all duration-300 group-hover:bg-[#38BDF8]"></span>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 z-60 transform transition-transform duration-300 ${
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
              if (link.name === 'About') {
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 font-medium rounded-xl transition-all duration-300 ${
                        isSectionActive('/about')
                          ? 'bg-[#38BDF8] text-[#0F1E4A] shadow-lg shadow-[#38BDF8]/25'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{link.name}</span>
                      <HiChevronDown
                        className={`text-lg transition-transform duration-300 ${
                          aboutOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        aboutOpen ? 'max-h-96 mt-2' : 'max-h-0'
                      }`}
                    >
                      <div className="bg-white/5 rounded-xl p-2 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.name}>
                            <a
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={`block px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                                isActive(child.href)
                                  ? 'bg-[#38BDF8] text-[#0F1E4A] font-semibold shadow-md shadow-[#38BDF8]/20'
                                  : 'text-gray-200 hover:bg-[#38BDF8]/20 hover:text-[#38BDF8]'
                              }`}
                            >
                              {child.name}
                            </a>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </li>
                );
              }

              if (link.name === 'Admissions') {
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => setAdmissionsOpen(!admissionsOpen)}
                      className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 font-medium rounded-xl transition-all duration-300 ${
                        isSectionActive('/admissions')
                          ? 'bg-[#38BDF8] text-[#0F1E4A] shadow-lg shadow-[#38BDF8]/25'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{link.name}</span>
                      <HiChevronDown
                        className={`text-lg transition-transform duration-300 ${
                          admissionsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        admissionsOpen ? 'max-h-500px mt-2' : 'max-h-0'
                      }`}
                    >
                      <div className="bg-white/5 rounded-xl p-2 space-y-1">
                        {link.children.map((child) =>
                          child.children ? (
                            <li key={child.name}>
                              <button
                                onClick={() => setFeeOpen(!feeOpen)}
                                className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                                  isSectionActive('/admissions/fee-structure')
                                    ? 'bg-[#38BDF8] text-[#0F1E4A] font-semibold shadow-md shadow-[#38BDF8]/20'
                                    : 'text-gray-200 hover:bg-[#38BDF8]/20 hover:text-[#38BDF8]'
                                }`}
                              >
                                <span>{child.name}</span>
                                <HiChevronDown
                                  className={`text-base transition-transform duration-300 ${
                                    feeOpen ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>

                              <ul
                                className={`overflow-hidden transition-all duration-300 ${
                                  feeOpen ? 'max-h-40 mt-1' : 'max-h-0'
                                }`}
                              >
                                <div className="bg-white/5 rounded-lg p-1.5 space-y-1 ml-3">
                                  {child.children.map((subChild) => (
                                    <li key={subChild.name}>
                                      <a
                                        href={subChild.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-2 text-xs rounded-md transition-all duration-300 ${
                                          isActive(subChild.href)
                                            ? 'bg-[#38BDF8] text-[#0F1E4A] font-semibold'
                                            : 'text-gray-300 hover:bg-[#38BDF8]/20 hover:text-[#38BDF8]'
                                        }`}
                                      >
                                        {subChild.name}
                                      </a>
                                    </li>
                                  ))}
                                </div>
                              </ul>
                            </li>
                          ) : (
                            <li key={child.name}>
                              <a
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                                  isActive(child.href)
                                    ? 'bg-[#38BDF8] text-[#0F1E4A] font-semibold shadow-md shadow-[#38BDF8]/20'
                                    : 'text-gray-200 hover:bg-[#38BDF8]/20 hover:text-[#38BDF8]'
                                }`}
                              >
                                {child.name}
                              </a>
                            </li>
                          )
                        )}
                      </div>
                    </ul>
                  </li>
                );
              }

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3.5 font-medium rounded-xl transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-[#38BDF8] text-[#0F1E4A] shadow-lg shadow-[#38BDF8]/25'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}

            <li className="pt-4">
              <a
                href="/admissions/apply-online"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] transition-all duration-300"
              >
                Apply Online
                <FaArrowRight className="text-xs" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-55"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;