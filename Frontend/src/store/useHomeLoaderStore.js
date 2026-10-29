import { create } from 'zustand';

const useHomeLoaderStore = create((set) => ({
  homeLoading: true,
  setHomeLoading: (val) => set({ homeLoading: val }),
}));

export default useHomeLoaderStore;