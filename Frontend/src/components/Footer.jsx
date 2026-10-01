import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import herobg from '../assets/herobg.png';
import logo from '../assets/Logo.png';

const Footer = () => {
  const programs = [
    'Web Development',
    'Graphic Design',
    'Digital Marketing',
    'MS Office',
    'Freelancing',
  ];

  const pages = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      <div className="absolute inset-0 bg-[#0F1E4A]/95"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center justify-center bg-white rounded-2xl px-4 py-3 mb-5 shadow-xl border border-white/20">
              <img src={logo} alt="Brain Inspire" className="h-12 sm:h-14 w-auto object-contain" />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto sm:mx-0">
              Brain Inspire System of Education — empowering students with
              industry-focused skills, expert guidance, and a brighter future.
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <a
                href="https://www.facebook.com/braininspire786"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="https://www.instagram.com/braininspire786?stkn=dmU4MGRhcTJpaWlz"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="https://wa.me/923004506850"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300 hover:scale-110"
              >
                <FaWhatsapp className="text-sm" />
              </a>
              <a
                href="https://youtube.com/@braininspire786?si=KLqViSIniUTBaRv7"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="text-sm" />
              </a>
            </div>
          </div>

          {/* Programs + Pages + Contact — same line */}
          <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-3 sm:contents">
            <div className="text-center sm:text-left">
              <h3 className="text-[11px] sm:text-base font-bold mb-3 sm:mb-5 relative pb-2 after:absolute after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:bottom-0 after:w-8 sm:after:w-12 after:h-0.5 after:bg-[#38BDF8] uppercase tracking-wider">
                Programs
              </h3>

              <ul className="space-y-1.5 sm:space-y-2.5">
                {programs.map((program, i) => (
                  <li key={i}>
                    <a
                      href="/programs"
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] sm:hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {program}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-[11px] sm:text-base font-bold mb-3 sm:mb-5 relative pb-2 after:absolute after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:bottom-0 after:w-8 sm:after:w-12 after:h-0.5 after:bg-[#38BDF8] uppercase tracking-wider">
                Pages
              </h3>

              <ul className="space-y-1.5 sm:space-y-2.5">
                {pages.map((page, i) => (
                  <li key={i}>
                    <a
                      href={page.href}
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] sm:hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {page.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-[11px] sm:text-base font-bold mb-3 sm:mb-5 relative pb-2 after:absolute after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:bottom-0 after:w-8 sm:after:w-12 after:h-0.5 after:bg-[#38BDF8] uppercase tracking-wider whitespace-nowrap">
                Contact Us
              </h3>

              <ul className="space-y-1.5 sm:space-y-4">
                <li className="flex items-center gap-1.5 sm:gap-3">
                  <FaPhoneAlt className="text-[#38BDF8] shrink-0 text-[10px] sm:text-sm" />
                  <div className="flex flex-col gap-0.5 sm:gap-1 text-left">
                    <a
                      href="tel:03004506850"
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] transition-colors duration-300 whitespace-nowrap"
                    >
                      0300-4506850
                    </a>
                    <a
                      href="tel:0622301240"
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] transition-colors duration-300 whitespace-nowrap"
                    >
                      062-2301240
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-1.5 sm:gap-3">
                  <FaEnvelope className="text-[#38BDF8] shrink-0 text-[10px] sm:text-sm" />
                  <a
                    href="mailto:bisebahawalpur786@gmail.com"
                    className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] transition-colors duration-300 break-all text-left"
                  >
                    bisebahawalpur786@gmail.com
                  </a>
                </li>

                <li className="flex items-center gap-1.5 sm:gap-3">
                  <FaMapMarkerAlt className="text-[#38BDF8] shrink-0 text-[10px] sm:text-sm" />
                  <span className="text-gray-300 text-[10px] sm:text-sm leading-relaxed text-left">
                    Bahawalpur, Punjab, Pakistan
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 mt-10 sm:mt-12 pt-5 text-center">
          <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">
            © {new Date().getFullYear()} Brain Inspire System of Education. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;