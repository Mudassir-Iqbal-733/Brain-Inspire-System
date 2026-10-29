import { create } from 'zustand';
import api from '../lib/axios';

const useGalleryStore = create((set, get) => ({
  categories: [],
  images: [],
  pageSeo: null,
  loading: false,

  fetchGallery: async () => {
    // Agar data pehle se hai to skip karein
    if (get().images.length > 0) return;

    set({ loading: true });
    try {
      const res = await api.get('/gallery');
      set({
        categories: res.data.categories,
        images: res.data.images,
        loading: false
      });
    } catch (error) {
      console.error("Failed to load gallery", error);
      set({ loading: false });
    }
  },

  fetchPageSeo: async () => {
    if (get().pageSeo) return;
    try {
      const res = await api.get('/gallery/page-seo');
      set({ pageSeo: res.data.data });
    } catch (error) {
      console.error("Failed to load SEO", error);
    }
  },
}));

export default useGalleryStore;