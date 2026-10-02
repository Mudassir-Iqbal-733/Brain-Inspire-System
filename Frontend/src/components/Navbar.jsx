import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HiX, HiChevronDown } from 'react-icons/hi';
import { FaArrowRight } from 'react-icons/fa';
import logo from '../assets/Logo.png';
import whiteLogo from '../assets/Logo-white.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
      children: [
        { name: 'Overview', href: '/about/overview' },
        { name: 'Director Message', href: '/about/director-message' },
        { name: 'Managing Director Message', href: '/about/managing-director-message' },
        { name: 'The Princeley State', href: '/about/princely-state' },
      ],
    },
    { name: 'Programs', href: '/programs' },
    { name: 'Why BISE', href: '/why-bise' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href) => {
    if (!href) return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const isAboutActive = () =>
    location.pathname.startsWith('/about');

  return (
    <nav className="sticky top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a href="/" className="flex items-center">
            <img
              src={logo}
              alt="Brain Inspire"
              className="h-12 md:h-14 w-auto"
            />
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
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 z-60 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-gradient-to-b from-[#0F1E4A] to-[#1E3A8A] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <img src={whiteLogo} alt="Brain Inspire" className="h-10 w-auto" />

            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-white p-1 hover:text-[#38BDF8] transition-colors duration-200"
              aria-label="Close menu"
            >
              <HiX />
            </button>
          </div>

          <ul className="p-4 flex flex-col gap-1 flex-1 overflow-y-auto">
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.name}>
                  <button
                    onClick={() => setAboutOpen(!aboutOpen)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 font-medium rounded-lg border-l-4 transition-all duration-200 ${
                      isAboutActive()
                        ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-[#38BDF8]'
                        : 'border-transparent text-white hover:border-[#38BDF8] hover:bg-[#38BDF8]/15 hover:text-[#38BDF8]'
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
                      aboutOpen ? 'max-h-80 mt-1' : 'max-h-0'
                    }`}
                  >
                    {link.children.map((child) => (
                      <li key={child.name}>
                        <a
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-2.5 ml-4 text-sm rounded-lg border-l-2 transition-all duration-200 ${
                            isActive(child.href)
                              ? 'border-[#38BDF8] text-[#38BDF8] bg-[#38BDF8]/10'
                              : 'border-white/10 text-gray-300 hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#38BDF8]/10'
                          }`}
                        >
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 font-medium rounded-lg border-l-4 transition-all duration-200 ${
                      isActive(link.href)
                        ? 'border-[#38BDF8] bg-[#38BDF8]/15 text-[#38BDF8]'
                        : 'border-transparent text-white hover:border-[#38BDF8] hover:bg-[#38BDF8]/15 hover:text-[#38BDF8]'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              )
            )}

            <li className="pt-3">
              <a
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-5 py-3 rounded-full font-semibold text-sm hover:bg-white hover:text-[#0F1E4A] transition-colors duration-300"
              >
                Apply Now
                <FaArrowRight className="text-xs" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-55"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;