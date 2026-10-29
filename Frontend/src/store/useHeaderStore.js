import { create } from 'zustand';
import api from '../lib/axios';

const useHeaderStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchHeader: async () => {
    if (get().data) return;

    set({ loading: true, error: null });
    try {
      const res = await api.get('/header-settings');
      set({ data: res.data.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to load header', loading: false });
    }
  },
}));

export default useHeaderStore;