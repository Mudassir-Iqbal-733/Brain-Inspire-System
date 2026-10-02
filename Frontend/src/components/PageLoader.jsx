import { useEffect, useState } from 'react';
import whiteLogo from '../assets/Logo-white.png';

const PageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-999 bg-[#2D2B6F] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col items-center px-4">
          <div className="relative mb-8">
            <div className="absolute -inset-6 bg-[#38BDF8]/20 rounded-full blur-2xl animate-pulse"></div>

            <div className="relative p-4">
              <img src={whiteLogo} alt="Brain Inspire" className="h-20 w-auto" />
            </div>

            <div className="absolute -inset-2 rounded-2xl border-2 border-[#38BDF8]/40 animate-ping"></div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide text-center">
            Brain Inspire
          </h1>

          <p className="text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-8 text-center">
            System of Education
          </p>

          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#38BDF8] animate-spin"></div>
          </div>

          <p className="text-gray-300 text-xs sm:text-sm mt-6 tracking-wider">
            Loading your experience...
          </p>

          <div className="flex items-center gap-1.5 mt-4">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce delay-150"></span>
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce delay-300"></span>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default PageLoader;