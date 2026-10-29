import { useState, useEffect } from 'react';
import {
  FaSearch,
  FaCheck,
  FaTimes,
  FaTrash,
  FaExclamationTriangle,
  FaComment,
} from 'react-icons/fa';
import api from '../../lib/axios';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/admin/comments');
      setComments(response.data?.data || response.data || []);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to load comments.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);

    try {
      await api.patch(`/admin/comments/${id}/status`, { status });
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to update status.';
      setError(message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);

    try {
      await api.delete(`/admin/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
      setDeleteId(null);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to delete comment.';
      setError(message);
    } finally {
      setDeleting(false);
    }
  };

  const filteredComments = comments.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.comment?.toLowerCase().includes(q) ||
      c.blog?.title?.toLowerCase().includes(q)
    );
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1E4A]">
          Comments
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Manage all blog comments from here.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search by name, email, comment, or blog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200"
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm mt-4">Loading comments...</p>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-2xl mb-4">
              <FaComment />
            </div>
            <h3 className="text-lg font-bold text-[#0F1E4A] mb-2">
              {searchQuery ? 'No Comments Found' : 'No Comments Yet'}
            </h3>
            <p className="text-gray-600 text-sm">
              {searchQuery
                ? 'Try a different search term.'
                : 'Comments will appear here once visitors start commenting.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-100 rounded-2xl p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-bold text-[#0F1E4A]">
                        {comment.name}
                      </p>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getStatusColor(
                          comment.status
                        )}`}
                      >
                        {comment.status || 'pending'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 break-all">
                      {comment.email}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 shrink-0">
                    {comment.created_at
                      ? new Date(comment.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">
                    On:{' '}
                    <span className="font-bold text-[#0F1E4A]">
                      {comment.blog?.title || `Blog #${comment.blog_id}`}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {comment.comment}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                  {comment.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusUpdate(comment.id, 'approved')}
                      disabled={updatingId === comment.id}
                      className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-green-500 hover:text-white transition-all duration-300 disabled:opacity-60"
                    >
                      {updatingId === comment.id ? (
                        <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <FaCheck />
                      )}
                      Approve
                    </button>
                  )}

                  {comment.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusUpdate(comment.id, 'rejected')}
                      disabled={updatingId === comment.id}
                      className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg text-xs font-bold hover:bg-yellow-500 hover:text-white transition-all duration-300 disabled:opacity-60"
                    >
                      {updatingId === comment.id ? (
                        <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <FaTimes />
                      )}
                      Reject
                    </button>
                  )}

                  <button
                    onClick={() => setDeleteId(comment.id)}
                    className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all duration-300 ml-auto"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xl">
                <FaExclamationTriangle />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F1E4A] mb-1">
                  Delete Comment?
                </h3>
                <p className="text-gray-600 text-sm">
                  This action cannot be undone. The comment will be permanently
                  deleted.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="inline-flex items-center gap-2 bg-gray-100 text-[#0F1E4A] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all duration-300 disabled:opacity-60"
              >
                <FaTimes />
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="inline-flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-all duration-300 disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;