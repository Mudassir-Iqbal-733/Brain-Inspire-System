import { create } from 'zustand';
import api from '../lib/axios';

const useBlogsStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,

  fetchBlogs: async (force = false) => {
    if (!force && get().blogs.length > 0) return;

    set({ loading: true, error: null });
    try {
      const res = await api.get('/blogs');
      set({ blogs: res.data.data || [], loading: false });
    } catch (error) {
      console.error('Failed to load blogs', error);
      set({
        loading: false,
        error: error?.response?.data?.message || 'Failed to load blogs',
      });
    }
  },

  pageSeo: null,
  seoLoading: false,

  fetchPageSeo: async () => {
    if (get().pageSeo) return;

    set({ seoLoading: true });
    try {
      const res = await api.get('/blogs/page-seo');
      set({ pageSeo: res.data.data, seoLoading: false });
    } catch (error) {
      console.error('Failed to load blogs SEO', error);
      set({ seoLoading: false });
    }
  },

  blogDetails: {},
  blogFetching: false,

  fetchBlogById: async (id) => {
    if (get().blogDetails[id]) return;

    set({ blogFetching: true });
    try {
      const res = await api.get(`/blog/${id}`);
      set((state) => ({
        blogDetails: { ...state.blogDetails, [id]: res.data.data },
        blogFetching: false,
      }));
    } catch (error) {
      console.error('Failed to load blog detail', error);
      set({ blogFetching: false });
    }
  },

  commentsByBlog: {},
  commentsLoading: false,

  fetchComments: async (blogId) => {
    set({ commentsLoading: true });
    try {
      const res = await api.get(`/blogs/${blogId}/comments`);
      set((state) => ({
        commentsByBlog: {
          ...state.commentsByBlog,
          [blogId]: res.data.data || [],
        },
        commentsLoading: false,
      }));
    } catch (error) {
      console.error('Failed to load comments', error);
      set({ commentsLoading: false });
    }
  },

  commentSubmitting: false,
  commentSuccess: false,
  commentError: null,

  resetCommentStatus: () =>
    set({ commentSuccess: false, commentError: null }),

  addComment: async (blogId, payload) => {
    set({ commentSubmitting: true, commentSuccess: false, commentError: null });

    try {
      const res = await api.post('/comments', { blog_id: blogId, ...payload });
      set({ commentSubmitting: false, commentSuccess: true });

      const fresh = await api.get(`/blogs/${blogId}/comments`);
      set((state) => ({
        commentsByBlog: {
          ...state.commentsByBlog,
          [blogId]: fresh.data.data || [],
        },
      }));

      return { ok: true, data: res.data };
    } catch (error) {
      const validationErrors = error?.response?.data?.errors || null;
      let message =
        error?.response?.data?.message ||
        error?.message ||
        'Failed to post comment';

      if (validationErrors) {
        message = Object.values(validationErrors).flat().join(' ');
      }

      set({ commentSubmitting: false, commentError: message });
      return { ok: false, error: message };
    }
  },
}));

export default useBlogsStore;