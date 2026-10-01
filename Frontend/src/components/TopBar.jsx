import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-[#1E3A8A] text-white text-xs sm:text-sm md:text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
          <a
            href="tel:03004506850"
            className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors duration-200"
          >
            <FaPhoneAlt className="text-xs sm:text-sm" />
            <span>0300-4506850</span>
          </a>

          <a
            href="tel:0622301240"
            className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors duration-200"
          >
            <FaPhoneAlt className="text-xs sm:text-sm" />
            <span>062-2301240</span>
          </a>

          <a
            href="mailto:bisebahawalpur786@gmail.com"
            className="flex items-center gap-2 hover:text-[#38BDF8] transition-colors duration-200"
          >
            <FaEnvelope className="text-xs sm:text-sm" />
            <span className="break-all">bisebahawalpur786@gmail.com</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://www.facebook.com/braininspire786"
            aria-label="Facebook"
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-colors duration-200"
          >
            <FaFacebookF className="text-sm md:text-base" />
          </a>

          <a
            href="https://www.instagram.com/braininspire786?stkn=dmU4MGRhcTJpaWlz"
            aria-label="Instagram"
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-colors duration-200"
          >
            <FaInstagram className="text-sm md:text-base" />
          </a>

          <a
            href="https://wa.me/923004506850"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-colors duration-200"
          >
            <FaWhatsapp className="text-sm md:text-base" />
          </a>

          <a
            href="https://youtube.com/@braininspire786?si=KLqViSIniUTBaRv7"
            aria-label="YouTube"
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-colors duration-200"
          >
            <FaYoutube className="text-sm md:text-base" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;