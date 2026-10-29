import { useEffect, useMemo } from 'react';
import whatsappLogo from "../assets/WhatsAppButton.png";
import useContactStore from '../store/useContactStore';

const WhatsAppButton = () => {
  const { socialData, fetchContactData } = useContactStore();

  useEffect(() => {
    fetchContactData();
  }, [fetchContactData]);

  // API ke social links se whatsapp URL nikalo
  const whatsappUrl = useMemo(() => {
    const links = socialData?.links || [];
    const wa = links.find(
      (l) => String(l.platform).toLowerCase() === 'whatsapp'
    );
    if (!wa?.url) return null;

    // Agar URL already wa.me/... ya api.whatsapp.com/... hai, to as-is use karo
    if (/wa\.me|api\.whatsapp\.com/i.test(wa.url)) {
      return wa.url;
    }

    // Warna URL se sirf digits nikal ke wa.me banao
    const digits = wa.url.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}` : null;
  }, [socialData]);

  if (!whatsappUrl) return null;

  const message = "Hello, I would like to know more about your programs.";
  const finalUrl = `${whatsappUrl}${whatsappUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;

  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-10 sm:bottom-5 sm:right-5"
    >
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-md shadow-green-500/25 transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14">
        <img
          src={whatsappLogo}
          alt="WhatsApp"
          className="h-full w-full rounded-full object-cover"
        />

        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-blue-500 ring-2 ring-white">
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-500" />
        </span>
      </span>
    </a>
  );
};

export default WhatsAppButton;