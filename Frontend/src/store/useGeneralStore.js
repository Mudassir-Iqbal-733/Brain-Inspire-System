import { create } from 'zustand';
import api from '../lib/axios';

const useGeneralStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchGeneralSettings: async (force = false) => {
    if (!force && get().data) return;

    set({ loading: true, error: null });
    try {
      const res = await api.get('/general-settings');
      set({ data: res.data.data, loading: false });
    } catch (error) {
      console.error('Failed to load general settings', error);
      set({
        loading: false,
        error:
          error?.response?.data?.message ||
          'Failed to load general settings',
      });
    }
  },
}));

export default useGeneralStore;