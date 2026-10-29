import { useEffect, useMemo } from 'react';
import MarqueePackage from 'react-fast-marquee';
import useGalleryStore from '../store/useGalleryStore';

const Marquee = MarqueePackage.default;

const Testimonial = () => {
  const { images, fetchGallery } = useGalleryStore();

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const imageUrls = useMemo(() => {
    if (!Array.isArray(images)) return [];
    return images
      .map((img) => img.image || img.url || img.path)
      .filter(Boolean);
  }, [images]);

  if (imageUrls.length === 0) return null;

  return (
    <section className="overflow-hidden bg-[#2D2B6F] py-12 sm:py-16">
      <div className="mb-10 px-4 text-center">
        <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wider text-[#38BDF8]">
          LIFE AT BRAIN INSPIRE
        </span>

        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Explore Our{" "}
          <span className="text-[#38BDF8]">Campus Life</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
          Discover our vibrant classrooms, dedicated teachers, and talented
          students shaping a brighter future through learning and excellence.
        </p>

        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <span className="h-1 w-10 rounded-full bg-[#38BDF8]" />
          <span className="h-1 w-3 rounded-full bg-white/60" />
          <span className="h-1 w-3 rounded-full bg-white/30" />
        </div>
      </div>

      <Marquee
        direction="left"
        speed={45}
        autoFill={true}
        pauseOnHover={false}
        gradient={false}
      >
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="w-[260px] px-2 sm:w-[320px] sm:px-3 lg:w-[380px]"
          >
            <div className="h-52 overflow-hidden rounded-2xl border border-white/10 shadow-xl sm:h-60 md:h-72">
              <img
                src={url}
                alt={`Brain Inspire campus life ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Testimonial;