import { useEffect } from 'react';
import useHeaderStore from '../store/useHeaderStore';
import useContactStore from '../store/useContactStore';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
  FaGraduationCap,
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

const TopBar = () => {
  const { data, fetchHeader } = useHeaderStore();
  const { socialData, fetchContactData } = useContactStore();

  useEffect(() => {
    fetchHeader();
    fetchContactData();
  }, [fetchHeader, fetchContactData]);

  if (!data) return null;

  const mapLink = data.map_address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.map_address)}`
    : '#';

  const apiSocialLinks = (socialData?.links || [])
    .filter((link) => link?.url && link?.platform)
    .map((link) => ({
      name: link.platform,
      href: link.url,
      icon: socialIconMap[String(link.platform).toLowerCase()] || FaFacebookF,
    }));

  return (
    <div className="bg-[#0F1E4A] text-white">
      <div className="lg:hidden px-3 py-1.5">
        <div className="flex items-center justify-between gap-2 text-[10px]">
          {data.phone && (
            <a
              href={`tel:${data.phone}`}
              className="flex items-center gap-1 hover:text-[#38BDF8] transition-colors shrink-0"
            >
              <FaPhoneAlt className="text-[#38BDF8] text-[9px]" />
              <span>{data.phone}</span>
            </a>
          )}

          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="flex items-center gap-1 hover:text-[#38BDF8] transition-colors shrink-0"
            >
              <FaEnvelope className="text-[#38BDF8] text-[9px]" />
              <span>{data.email}</span>
            </a>
          )}

          {data.map_address && (
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#38BDF8] transition-colors shrink-0"
            >
              <FaMapMarkerAlt className="text-[#38BDF8] text-[9px]" />
              <span className="truncate max-w-80px">{data.map_address}</span>
            </a>
          )}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center gap-4 px-8 py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-2 transition-colors duration-300 hover:text-[#38BDF8]"
              >
                <FaPhoneAlt className="shrink-0 text-[#38BDF8]" />
                <span>{data.phone}</span>
              </a>
            )}

            {data.email && (
              <a
                href={`mailto:${data.email}`}
                aria-label="Email Brain Inspire"
                className="flex items-center gap-2 transition-colors duration-300 hover:text-[#38BDF8]"
              >
                <FaEnvelope className="shrink-0 text-[#38BDF8]" />
                <span className="break-all">{data.email}</span>
              </a>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-wider">
            <FaGraduationCap className="shrink-0 text-2xl text-[#38BDF8]" />
            <span className="text-white">
              Reality Is Our <span className="text-[#38BDF8]">Success</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-3 text-sm">
            {data.map_address && (
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors duration-300 hover:text-[#38BDF8]"
              >
                <FaMapMarkerAlt className="shrink-0 text-[#38BDF8]" />
                <span className="truncate max-w-200px">Bahawalpur,Pakistan</span>
              </a>
            )}

            {apiSocialLinks.length > 0 && (
              <>
                <div className="h-5 w-px bg-white/20" />

                <div className="flex items-center gap-3">
                  {apiSocialLinks.map(({ name, href, icon: Icon }, idx) => (
                    <a
                      key={`${name}-${idx}`}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;