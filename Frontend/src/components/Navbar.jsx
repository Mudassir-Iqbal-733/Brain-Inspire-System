import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import logo from '../assets/Logo.png';
import TopBar from './TopBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Courses', href: '/courses' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <TopBar />
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="/" className="flex items-center">
              <img
                src={logo}
                alt="Brain Inspire"
                className="h-12 md:h-14 w-auto"
              />
            </a>

            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative text-gray-700 font-medium text-base py-2 group transition-colors duration-200 hover:text-[#0F1E4A]"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-[#0F1E4A] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl text-[#0F1E4A]"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <ul className="px-4 pb-4 flex flex-col gap-1 bg-white border-t border-gray-100">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-[#0F1E4A] hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;