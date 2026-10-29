import { create } from 'zustand';
import api from '../lib/axios';

const useProgramsStore = create((set, get) => ({
  programs: [],
  pageSeo: null,
  programDetails: {},
  loading: false,
  isFetching: false,

  fetchPrograms: async (keyword = '', type = '', force = false) => {
    if (!force && keyword === '' && type === '' && get().programs.length > 0) {
      return;
    }

    set({ loading: true });
    try {
      const res = await api.get(`/programs?keyword=${keyword}&type=${type}`);
      set({ programs: res.data.data || [], loading: false });
    } catch (error) {
      console.error('Failed to load programs', error);
      set({ loading: false });
    }
  },

  fetchPageSeo: async () => {
    if (get().pageSeo) return;

    try {
      const res = await api.get('/programs/page-seo');
      set({ pageSeo: res.data.data });
    } catch (error) {
      console.error('Failed to load SEO', error);
    }
  },

  fetchProgramById: async (id) => {
    set({ isFetching: true });
    try {
      const res = await api.get(`/programs/${id}`);
      set((state) => ({
        programDetails: { ...state.programDetails, [id]: res.data.data },
        isFetching: false,
      }));
    } catch (error) {
      console.error('Failed to load program detail', error);
      set({ isFetching: false });
    }
  },
}));

export default useProgramsStore;