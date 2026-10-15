import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaGraduationCap,
} from 'react-icons/fa';

const TopBar = () => {
  const mapLink =
    'https://www.google.com/maps/search/?api=1&query=Brain+Inspire+System+of+Education+Bahawalpur';

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/braininspire786',
      icon: FaFacebookF,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/braininspire786?stkn=dmU4MGRhcTJpaWlz',
      icon: FaInstagram,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/923004506850',
      icon: FaWhatsapp,
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@braininspire786?si=KLqViSiniUTBaRv7',
      icon: FaYoutube,
    },
  ];

  return (
    <div className="bg-[#0F1E4A] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-4 py-3 sm:px-6 lg:grid-cols-3 lg:gap-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm lg:justify-start">
          <a
            href="tel:+923004506850"
            className="flex items-center gap-2 transition-colors duration-300 hover:text-[#38BDF8]"
          >
            <FaPhoneAlt className="shrink-0 text-[#38BDF8]" />
            <span>0300-4506850</span>
          </a>

          <a
            href="mailto:bisebahawalpur786@gmail.com"
            aria-label="Email Brain Inspire"
            className="flex items-center gap-2 transition-colors duration-300 hover:text-[#38BDF8]"
          >
            <FaEnvelope className="shrink-0 text-[#38BDF8]" />
            <span className="break-all">
              bisebahawalpur786@gmail.com
            </span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-center text-xs font-extrabold uppercase tracking-wider sm:text-sm">
          <FaGraduationCap className="shrink-0 text-xl text-[#38BDF8] sm:text-2xl" />
          <span className="text-white">
            Reality Is Our{' '}
            <span className="text-[#38BDF8]">Success</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs sm:text-sm lg:justify-end">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors duration-300 hover:text-[#38BDF8]"
          >
            <FaMapMarkerAlt className="shrink-0 text-[#38BDF8]" />
            <span>Bahawalpur, Pakistan</span>
          </a>

          <div className="hidden h-5 w-px bg-white/20 sm:block" />

          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-[#38BDF8] hover:text-[#0F1E4A]"
              >
                <Icon className="text-xs" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;