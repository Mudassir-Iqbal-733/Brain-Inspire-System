import { create } from 'zustand';
import api from '../lib/axios';

const useAdmissionStore = create((set, get) => ({
  // ===== Admission Settings (for Procedure page) =====
  data: null,
  loading: false,

  fetchAdmissionsData: async () => {
    if (get().data) return;

    set({ loading: true });
    try {
      const res = await api.get('/admission-settings');
      set({ data: res.data.data, loading: false });
    } catch (error) {
      console.error('Failed to load admissions data', error);
      set({ loading: false });
    }
  },

  // ===== Submit Admission Form =====
  submitting: false,
  submitSuccess: false,
  submitError: null,

  resetSubmitStatus: () =>
    set({ submitSuccess: false, submitError: null }),

  submitAdmission: async (payload) => {
    set({ submitting: true, submitSuccess: false, submitError: null });

    try {
      const res = await api.post('/admissions', payload);
      set({ submitting: false, submitSuccess: true });
      return { ok: true, data: res.data };
    } catch (error) {
      // Laravel validation errors come as { errors: { field: [...] } }
      const validationErrors = error?.response?.data?.errors;
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong. Please try again.';

      if (validationErrors) {
        message = Object.values(validationErrors).flat().join(' ');
      }

      set({ submitting: false, submitError: message });
      return { ok: false, error: message, fieldErrors: validationErrors };
    }
  },
}));

export default useAdmissionStore;