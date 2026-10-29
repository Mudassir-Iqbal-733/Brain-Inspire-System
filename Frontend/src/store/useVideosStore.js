import { create } from 'zustand';
import api from '../lib/axios';

const useVideosStore = create((set, get) => ({
  videos: [],
  loading: false,
  error: null,

  fetchVideos: async (force = false) => {
    if (!force && get().videos.length > 0) return;

    set({ loading: true, error: null });
    try {
      const res = await api.get('/videos');
      set({ videos: res.data.data || [], loading: false });
    } catch (error) {
      console.error('Failed to load videos', error);
      set({
        loading: false,
        error: error?.response?.data?.message || 'Failed to load videos',
      });
    }
  },
}));

export default useVideosStore;