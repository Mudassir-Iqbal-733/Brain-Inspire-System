import whatsappLogo from "../assets/WhatsAppButton.png";

const WhatsAppButton = () => {
  const phoneNumber = "923004506850";
  const message = "Hello, I would like to know more about your programs.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
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