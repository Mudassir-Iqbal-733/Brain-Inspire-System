import { useRef, useState } from 'react';
import { Carousel } from 'antd';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';
import GraphicDesigning from '../assets/Graphic Designing.mp4';

const ProgramsVideo = () => {
  const carouselRef = useRef(null);
  const videoRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);

  const videos = [
    { id: 1, title: 'Graphic Designing', src: GraphicDesigning },
  ];

  const handlePlay = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) {
        v.pause();
        v.currentTime = 0;
      }
    });

    video.play().catch(() => {});
    setPlayingIndex(index);
  };

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
          v.currentTime = 0;
        }
      });
      video.play().catch(() => {});
      setPlayingIndex(index);
    } else {
      video.pause();
      setPlayingIndex(null);
    }
  };

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
    videoRefs.current.forEach((v) => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });
    setPlayingIndex(null);
  };

  return (
    <section className="relative bg-gray-50 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-12 h-px bg-[#38BDF8]"></span>
            <span className="text-[#2563EB] text-xs font-bold tracking-[0.3em] uppercase">
              Watch & Learn
            </span>
            <span className="w-12 h-px bg-[#38BDF8]"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F1E4A] leading-[1.1] mb-6">
            Programs in{' '}
            <span className="text-[#38BDF8] relative inline-block">
              Action
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#38BDF8]/40 rounded-full"></span>
            </span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Get a glimpse of what our students are creating with our
            industry-focused programs.
          </p>
        </div>

        <div className="relative max-w-[360px] mx-auto">
          <div className="absolute -inset-4 bg-linear-to-br from-[#38BDF8]/10 to-[#2563EB]/10 rounded-[2rem] blur-2xl pointer-events-none"></div>

          <div className="relative">
            <Carousel
              ref={carouselRef}
              dots={true}
              arrows={false}
              autoplay={false}
              infinite={false}
              speed={500}
              afterChange={handleSlideChange}
            >
              {videos.map((video, index) => (
                <div key={video.id}>
                  <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl shadow-[#0F1E4A]/20">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.src}
                      className="w-full h-full object-cover"
                      loop
                      playsInline
                      preload="metadata"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white text-lg font-bold drop-shadow-lg">
                        {video.title}
                      </h3>
                    </div>

                    {playingIndex !== index && (
                      <button
                        onClick={() => handlePlay(index)}
                        aria-label={`Play ${video.title}`}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors duration-300 group"
                      >
                        <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#38BDF8] text-[#0F1E4A] text-2xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                          <FaPlay className="ml-1" />
                        </span>
                      </button>
                    )}

                    {playingIndex === index && (
                      <button
                        onClick={() => handleVideoClick(index)}
                        aria-label="Pause video"
                        className="absolute inset-0"
                      />
                    )}
                  </div>
                </div>
              ))}
            </Carousel>

            <button
              onClick={() => carouselRef.current?.prev()}
              disabled={currentIndex === 0}
              aria-label="Previous"
              className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-[#0F1E4A] text-white border border-[#0F1E4A] hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => carouselRef.current?.next()}
              disabled={currentIndex === videos.length - 1}
              aria-label="Next"
              className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-[#0F1E4A] text-white border border-[#0F1E4A] hover:bg-[#38BDF8] hover:text-[#0F1E4A] hover:border-[#38BDF8] hover:scale-110 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsVideo;