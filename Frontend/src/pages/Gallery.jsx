import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaArrowRight, FaCamera } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import Loader from '../components/Loader';
import SEO from '../components/SEO';
import useGalleryStore from '../store/useGalleryStore';

const Gallery = () => {
  const { categories, images, pageSeo, fetchGallery, fetchPageSeo, loading } = useGalleryStore();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetchGallery();
    fetchPageSeo();
  }, [fetchGallery, fetchPageSeo]);

  if (loading) return <Loader />;

  const filteredItems = selectedCategory === 'All'
    ? images
    : images.filter((item) => 
        item.category?.name === selectedCategory || item.category_id === selectedCategory
      );

  return (
    <>
      <SEO
        title={pageSeo?.seo_title || "Gallery | Brain Inspire"}
        description={pageSeo?.seo_description || "View photos and memorable moments from Brain Inspire System of Education — campus, events, students, and more."}
        keywords={pageSeo?.seo_keywords || "gallery, BISE photos, campus life, events, Bahawalpur"}
      />

      <PageHeader
        title="Gallery"
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Our Moments
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
              Life at Brain Inspire
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Explore our campus, events, and the vibrant moments that define
              our learning community.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-12">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30 scale-105'
                  : 'bg-gray-100 text-[#0F1E4A] hover:bg-[#38BDF8]/20 hover:text-[#2563EB]'
              }`}
            >
              All
            </button>
            
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  selectedCategory === cat.name
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30 scale-105'
                    : 'bg-gray-100 text-[#0F1E4A] hover:bg-[#38BDF8]/20 hover:text-[#2563EB]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16 px-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-3xl mb-4">
                <FaCamera />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#0F1E4A] mb-2">
                No Photos Found
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxImage(item)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-[#38BDF8]/10 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title || 'Gallery Image'}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0F1E4A] via-[#0F1E4A]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    {item.category && (
                      <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1 rounded-full mb-2">
                        {item.category.name}
                      </span>
                    )}
                    <h3 className="text-lg font-bold leading-tight drop-shadow-lg line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 md:mt-20 bg-[#2D2B6F] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

            <div className="relative text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                Want to Join Our Community?
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                Be part of the moments that define excellence. Apply now and
                start your journey with Brain Inspire.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/admissions/apply-online"
                  className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-white transition-all duration-300"
                >
                  Apply Now
                  <FaArrowRight className="text-xs" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 hover:border-[#38BDF8]/50 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white text-xl hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300"
            aria-label="Close"
          >
            <FaTimes />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full"
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />

            <div className="mt-4 text-center">
              {lightboxImage.category && (
                <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1 rounded-full mb-2">
                  {lightboxImage.category.name}
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {lightboxImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;