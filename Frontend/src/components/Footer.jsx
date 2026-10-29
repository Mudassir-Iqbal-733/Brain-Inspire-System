import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFooterStore from '../store/useFooterStore';
import useContactStore from '../store/useContactStore';
import herobg from '../assets/herobg.png';

import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, 
  FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, 
  FaTwitter, FaLinkedinIn, FaTiktok 
} from 'react-icons/fa';

const socialIconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
};

const Footer = () => {
  const { footerData, socialLinks, fetchFooterData } = useFooterStore();
  const { contactData, fetchContactData } = useContactStore();

  useEffect(() => {
    fetchFooterData();
    fetchContactData();
  }, [fetchFooterData, fetchContactData]);

  const programs = [
    'Web Development',
    'Graphic Design',
    'Digital Marketing',
    'MS Office',
    'Freelancing',
  ];

  const pages = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/overview' },
    { name: 'Programs', href: '/programs' },
    { name: 'Admissions', href: '/admissions/why-bise' },
    { name: 'Contact', href: '/contact-us' },
  ];

  const mapLink = contactData?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactData.address)}`
    : '#';

  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      <div className="absolute inset-0 bg-[#0F1E4A]/95"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          
          {/* Logo & Description */}
          <div className="text-center sm:text-left">
            {footerData?.logo_image && (
              <div className="inline-flex items-center justify-center mb-5 shadow-xl">
                <img 
                  src={footerData.logo_image} 
                  alt="Logo" 
                  className="h-12 sm:h-14 w-auto object-contain" 
                />
              </div>
            )}

            {footerData?.description && (
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto sm:mx-0">
                {footerData.description}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                {socialLinks.map((link, index) => {
                  const Icon = socialIconMap[link.platform] || FaFacebookF;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.platform}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300 hover:scale-110"
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-[1fr_1fr_1.6fr] gap-3 sm:contents">
            
            {/* Programs */}
            <div className="text-center sm:text-left">
              <h3 className="text-[11px] sm:text-base font-bold mb-3 sm:mb-5 relative pb-2 after:absolute after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:bottom-0 after:w-8 sm:after:w-12 after:h-0.5 after:bg-[#38BDF8] uppercase tracking-wider">
                Programs
              </h3>

              <ul className="space-y-1.5 sm:space-y-2.5">
                {programs.map((program, i) => (
                  <li key={i}>
                    <Link
                      to="/programs"
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] sm:hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {program}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div className="text-center sm:text-left">
              <h3 className="text-[11px] sm:text-base font-bold mb-3 sm:mb-5 relative pb-2 after:absolute after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:bottom-0 after:w-8 sm:after:w-12 after:h-0.5 after:bg-[#38BDF8] uppercase tracking-wider">
                Pages
              </h3>

              <ul className="space-y-1.5 sm:space-y-2.5">
                {pages.map((page, i) => (
                  <li key={i}>
                    <Link
                      to={page.href}
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] sm:hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details from API */}
            <div className="text-center sm:text-left">
              <h3 className="text-[11px] sm:text-base font-bold mb-3 sm:mb-5 relative pb-2 after:absolute after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:bottom-0 after:w-8 sm:after:w-12 after:h-0.5 after:bg-[#38BDF8] uppercase tracking-wider whitespace-nowrap">
                Contact Us
              </h3>

              <ul className="space-y-1.5 sm:space-y-4">
                {contactData?.phone && (
                  <li className="flex items-center gap-1.5 sm:gap-3">
                    <FaPhoneAlt className="text-[#38BDF8] shrink-0 text-[10px] sm:text-sm" />
                    <a
                      href={`tel:${contactData.phone}`}
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] transition-colors duration-300 whitespace-nowrap"
                    >
                      {contactData.phone}
                    </a>
                  </li>
                )}

                {contactData?.email && (
                  <li className="flex items-center gap-1.5 sm:gap-3">
                    <FaEnvelope className="text-[#38BDF8] shrink-0 text-[10px] sm:text-sm" />
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-gray-300 text-[10px] sm:text-sm hover:text-[#38BDF8] transition-colors duration-300 break-all text-left"
                    >
                      {contactData.email}
                    </a>
                  </li>
                )}

                {contactData?.address && (
                  <li className="flex items-center gap-1.5 sm:gap-3">
                    <FaMapMarkerAlt className="text-[#38BDF8] shrink-0 text-[10px] sm:text-sm" />
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-300 text-[10px] sm:text-sm leading-relaxed text-left hover:text-[#38BDF8] transition-colors duration-300"
                    >
                      {contactData.address}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        {footerData?.copyright_text && (
          <div className="border-t border-white/15 mt-10 sm:mt-12 pt-5 text-center">
            <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm">
              {footerData.copyright_text}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;