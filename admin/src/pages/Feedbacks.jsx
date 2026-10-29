import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../lib/axios';
import {
  FaTrash,
  FaEnvelope,
  FaPhoneAlt,
  FaSearch,
  FaCommentDots,
  FaCalendarAlt,
} from 'react-icons/fa';

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get('admin/feedbacks');
      setFeedbacks(res.data.data || []);
    } catch (error) {
      console.error('API Error:', error.response);
      toast.error('Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this feedback?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    try {
      await api.delete(`/admin/feedbacks/${id}`);
      toast.success('Deleted successfully');
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return feedbacks;
    return feedbacks.filter(
      (fb) =>
        (fb.name || '').toLowerCase().includes(q) ||
        (fb.email || '').toLowerCase().includes(q) ||
        (fb.phone || '').toLowerCase().includes(q) ||
        (fb.issue || '').toLowerCase().includes(q)
    );
  }, [feedbacks, search]);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto pb-10">
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm mt-4">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F1E4A]">Feedbacks</h1>
          <p className="text-sm text-gray-500">
            Manage user feedback and issues.
            <span className="ml-2 inline-flex items-center bg-[#38BDF8]/10 text-[#2563EB] text-xs font-bold px-2.5 py-0.5 rounded-full">
              {feedbacks.length} total
            </span>
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38BDF8] text-sm pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, or issue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200 shadow-sm"
          />
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-3xl mb-4">
            <FaCommentDots />
          </div>
          <h3 className="text-lg font-bold text-[#0F1E4A] mb-1">
            {search ? 'No matching feedbacks' : 'No feedbacks yet'}
          </h3>
          <p className="text-sm text-gray-500">
            {search
              ? 'Try a different search term.'
              : 'Feedbacks submitted by users will appear here.'}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="mt-4 inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-5 py-2 rounded-full font-bold text-sm hover:bg-[#2D2B6F] hover:text-white transition"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((fb) => (
            <div
              key={fb.id}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#38BDF8]/40 transition-all duration-300 p-5 flex flex-col"
            >
              {/* Top row: name + delete */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {(fb.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#0F1E4A] truncate">
                      {fb.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <FaCalendarAlt className="text-[#38BDF8]" />
                      {formatDate(fb.created_at)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(fb.id)}
                  disabled={deletingId === fb.id}
                  className="shrink-0 w-9 h-9 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete"
                >
                  {deletingId === fb.id ? (
                    <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>

              {/* Contact */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-600 mb-3 pb-3 border-b border-gray-100">
                {fb.email && (
                  <a
                    href={`mailto:${fb.email}`}
                    className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors break-all"
                  >
                    <FaEnvelope className="text-[#38BDF8] shrink-0" />
                    {fb.email}
                  </a>
                )}
                {fb.phone && (
                  <a
                    href={`tel:${fb.phone}`}
                    className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors"
                  >
                    <FaPhoneAlt className="text-[#38BDF8] shrink-0" />
                    {fb.phone}
                  </a>
                )}
              </div>

              {/* Issue */}
              <div className="flex-1">
                <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1.5">
                  Issue
                </p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {fb.issue || 'No issue description'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;