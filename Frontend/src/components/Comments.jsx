import { useState, useEffect } from 'react';
import { FaComment, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import api from '../lib/axios';

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/blogs/${blogId}/comments`);
      setComments(response.data?.data || response.data || []);
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/comments', {
        ...form,
        blog_id: blogId,
      });

      setSuccess('Comment submitted! It will appear after approval.');
      setForm({ name: '', email: '', comment: '' });

      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      const errors = err.response?.data?.errors;
      let message = err.response?.data?.message || 'Failed to submit comment.';

      if (errors) {
        const first = Object.values(errors)[0]?.[0];
        if (first) message = first;
      }

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200';

  return (
    <div className="space-y-8">
      <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white flex items-center justify-center shrink-0">
            <FaComment />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F1E4A]">
              Comments ({comments.length})
            </h2>
            <p className="text-xs text-gray-500">Share your thoughts with us</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-gray-100 rounded-2xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white flex items-center justify-center font-bold shrink-0">
                    {c.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0F1E4A] truncate">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(c.created_at)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {c.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
        <h3 className="text-lg md:text-xl font-bold text-[#0F1E4A] mb-1">
          Leave a Comment
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Your email will not be published. Comments are moderated.
        </p>

        {success && (
          <div className="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
            <FaCheckCircle className="text-green-600 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#0F1E4A] mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0F1E4A] mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0F1E4A] mb-2">
              Comment *
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Write your comment here..."
              className={`${inputClass} resize-none`}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2563EB] hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></span>
                Posting...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Post Comment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;