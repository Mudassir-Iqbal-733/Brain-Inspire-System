import { create } from 'zustand';
import api from '../lib/axios';

const useAboutStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchAbout: async () => {
    if (get().data) return;

    set({ loading: true, error: null });
    try {
      const res = await api.get('/about-settings');
      set({ data: res.data.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to load about data', loading: false });
    }
  },
}));

export default useAboutStore;