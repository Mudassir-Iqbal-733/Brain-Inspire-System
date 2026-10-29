import { create } from 'zustand';
import api from '../lib/axios';

const useContactStore = create((set, get) => ({
  contactData: null,
  socialData: null,
  loading: false,

  fetchContactData: async () => {
    if (get().contactData) return;

    set({ loading: true });
    try {
      const [contactRes, socialRes] = await Promise.all([
        api.get('/contact-settings'),
        api.get('/social-settings').catch(() => ({ data: { data: null } })),
      ]);

      set({
        contactData: contactRes.data.data,
        socialData: socialRes.data.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  submitting: false,
  submitSuccess: false,
  submitError: null,

  resetFeedbackStatus: () =>
    set({ submitSuccess: false, submitError: null }),

  submitFeedback: async (payload) => {
    set({ submitting: true, submitSuccess: false, submitError: null });

    try {
      const res = await api.post('/feedback', payload);
      set({ submitting: false, submitSuccess: true });
      return { ok: true, data: res.data };
    } catch (error) {
      const validationErrors = error?.response?.data?.errors;

      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to submit feedback.';

      if (validationErrors) {
        message = Object.values(validationErrors).flat().join(', ');
      }

      set({ submitting: false, submitError: message });
      return { ok: false, error: message };
    }
  },
}));

export default useContactStore;