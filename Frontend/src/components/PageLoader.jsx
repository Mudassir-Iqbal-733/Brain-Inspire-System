import { useEffect, useState } from 'react';
import useSliderStore from '../store/useSliderStore';
import useHomeLoaderStore from '../store/useHomeLoaderStore';

const PageLoader = ({ children }) => {
  const { sliders, loading, fetchSliders } = useSliderStore();
  const setHomeLoading = useHomeLoaderStore((s) => s.setHomeLoading);

  const [imagesReady, setImagesReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeDone(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!sliders || sliders.length === 0) {
      setImagesReady(true);
      return;
    }

    let loaded = 0;
    const total = sliders.length;
    let cancelled = false;

    sliders.forEach((slide) => {
      const src =
        slide.image ||
        slide.image_url ||
        slide.img ||
        slide.src;

      if (!src) {
        loaded++;
        if (loaded === total && !cancelled) setImagesReady(true);
        return;
      }

      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === total && !cancelled) setImagesReady(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total && !cancelled) setImagesReady(true);
      };
    });

    return () => {
      cancelled = true;
    };
  }, [sliders, loading]);

  const ready = minTimeDone && !loading && imagesReady;

  useEffect(() => {
    setHomeLoading(!ready);

    window.dispatchEvent(
      new CustomEvent('homeLoadingStatus', { detail: { loading: !ready } })
    );
  }, [ready, setHomeLoading]);

  if (!ready) {
    return (
      <div className="fixed inset-0 z-999 bg-[#2D2B6F] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col items-center px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#38BDF8]"></span>
            <span className="text-[#38BDF8] text-xs font-bold tracking-[0.3em] uppercase">
              BISE
            </span>
            <span className="w-12 h-px bg-[#38BDF8]"></span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-wide text-center">
            Brain Inspire
          </h1>

          <p className="text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-10 text-center">
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