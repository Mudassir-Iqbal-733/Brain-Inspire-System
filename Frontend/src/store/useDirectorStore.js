import { create } from 'zustand';
import api from '../lib/axios';

const useDirectorStore = create((set, get) => ({
  directors: {},
  loading: false,

  fetchDirector: async (type) => {
    if (get().directors[type]) return;

    set({ loading: true });
    try {
      const res = await api.get(`/director-message?type=${type}`);
      if (res.data.data) {
        set((state) => ({
          directors: { ...state.directors, [type]: res.data.data },
          loading: false
        }));
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error(`Failed to fetch ${type}:`, error);
      set({ loading: false });
    }
  },
}));

export default useDirectorStore;