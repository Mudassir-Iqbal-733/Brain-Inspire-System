import { create } from 'zustand';
import api from '../lib/axios';

const useSliderStore = create((set, get) => ({
  sliders: [],
  loading: false,

  fetchSliders: async () => {
    if (get().sliders.length > 0) return;

    set({ loading: true });
    try {
      const res = await api.get('/sliders');
      set({ sliders: res.data.data, loading: false });
    } catch (error) {
      console.error("Failed to load sliders", error);
      set({ loading: false });
    }
  },
}));

export default useSliderStore;