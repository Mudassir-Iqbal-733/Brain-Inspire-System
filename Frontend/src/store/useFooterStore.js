import { create } from 'zustand';
import api from '../lib/axios';

const useFooterStore = create((set, get) => ({
  footerData: null,
  socialLinks: [],
  loading: false,

  fetchFooterData: async () => {
    if (get().footerData) return;

    set({ loading: true });
    try {
      const [footerRes, socialRes] = await Promise.all([
        api.get('/footer-settings'),
        api.get('/social-settings').catch(() => ({ data: { data: null } }))
      ]);

      set({
        footerData: footerRes.data.data,
        socialLinks: socialRes.data.data?.links || [],
        loading: false
      });
    } catch (error) {
      console.error("Failed to load footer data", error);
      set({ loading: false });
    }
  },
}));

export default useFooterStore;