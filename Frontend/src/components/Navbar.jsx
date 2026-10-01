import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import {
  FaArrowRight,
  FaHome,
  FaInfoCircle,
  FaGraduationCap,
  FaStar,
  FaBlog,
  FaPhoneAlt,
} from 'react-icons/fa';
import logo from '../assets/Logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: <FaHome /> },
    { name: 'About', href: '/about', icon: <FaInfoCircle /> },
    { name: 'Programs', href: '/programs', icon: <FaGraduationCap /> },
    { name: 'Why BISE', href: '/why-bise', icon: <FaStar /> },
    { name: 'Blog', href: '/blog', icon: <FaBlog /> },
    { name: 'Contact', href: '/contact', icon: <FaPhoneAlt /> },
  ];

  return (
    <>
      <nav className="relative w-full bg-white shadow-sm z-50">
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
          className={`fixed top-0 right-0 h-full w-72 sm:w-80 z-[60] transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full bg-gradient-to-b from-[#0F1E4A] to-[#1E3A8A] shadow-2xl flex flex-col">
            <div className="bg-white flex items-center justify-between p-4 border-b border-gray-200">
              <img src={logo} alt="Brain Inspire" className="h-10 w-auto" />

              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-[#0F1E4A] p-1 hover:text-[#38BDF8] transition-colors duration-200"
                aria-label="Close menu"
              >
                <HiX />
              </button>
            </div>

            <ul className="p-4 flex flex-col gap-1 flex-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-3 px-4 py-3 text-white font-medium rounded-lg border-l-4 border-transparent hover:border-[#38BDF8] hover:bg-[#38BDF8]/15 hover:text-[#38BDF8] transition-all duration-200"
                  >
                    <span className="text-base text-[#38BDF8] group-hover:text-white transition-colors duration-200">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}

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
            className="fixed inset-0 bg-black/40 z-[55]"
          ></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;