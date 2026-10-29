import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaExclamationTriangle, FaEye, FaCog
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../lib/axios';

const Blogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  // SEO States
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [seoData, setSeoData] = useState({
    seo_title: '', seo_description: '', seo_keywords: ''
  });

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/blogs');
      setBlogs(response.data?.data || response.data || []);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to load blogs.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeoSettings = async () => {
    try {
      const res = await api.get('/blogs/page-seo');
      if (res.data.data) {
        setSeoData({
          seo_title: res.data.data.seo_title || '',
          seo_description: res.data.data.seo_description || '',
          seo_keywords: res.data.data.seo_keywords || '',
        });
      }
    } catch (error) {
      console.error("Failed to load SEO");
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchSeoSettings();
  }, []);

  const handleDelete = async (id) => {
    setDeleting(true);

    try {
      await api.delete(`/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setDeleteId(null);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Failed to delete blog.';
      setError(message);
    } finally {
      setDeleting(false);
    }
  };

  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Saving SEO...');
    try {
      await api.post('/admin/blogs/page-seo', seoData);
      toast.update(toastId, { render: 'Page SEO Saved!', type: 'success', isLoading: false, autoClose: 3000 });
      setIsSeoModalOpen(false);
      fetchSeoSettings();
    } catch (error) {
      let errorMsg = 'Failed to save SEO';
      if (error.response?.data?.message) errorMsg = error.response.data.message;
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1E4A]">All Blogs</h1>
          <p className="text-gray-600 text-sm mt-1">Manage all your blog posts from here.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSeoModalOpen(true)} 
            className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border border-gray-300 px-5 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all duration-300"
          >
            <FaCog /> SEO
          </button>

          <Link
            to="/admin/dashboard/blogs/create"
            className="inline-flex items-center justify-center gap-2 bg-[#0F1E4A] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#0F1E4A]/30 hover:bg-[#2563EB] transition-all duration-300"
          >
            <FaPlus /> Add Blog
          </Link>
        </div>
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
            placeholder="Search blogs by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#0F1E4A] focus:bg-white focus:ring-2 focus:ring-[#0F1E4A]/20 transition-all duration-200"
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm mt-4">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0F1E4A]/10 text-[#0F1E4A] text-2xl mb-4">
              <FaPlus />
            </div>
            <h3 className="text-lg font-bold text-[#0F1E4A] mb-2">
              {searchQuery ? 'No Blogs Found' : 'No Blogs Yet'}
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              {searchQuery ? 'Try a different search term.' : 'Create your first blog post to get started.'}
            </p>
            {!searchQuery && (
              <Link
                to="/admin/dashboard/blogs/create"
                className="inline-flex items-center gap-2 bg-[#0F1E4A] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#2563EB] transition-all duration-300"
              >
                <FaPlus /> Add Blog
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Author</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
                  <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Views</th>
                  <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {blog.image ? (
                          <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#0F1E4A]/10 flex items-center justify-center text-[#0F1E4A] shrink-0">
                            <FaPlus className="text-sm" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#0F1E4A] truncate">{blog.title}</p>
                          <p className="text-xs text-gray-500 truncate md:hidden">{blog.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 hidden md:table-cell">{blog.author}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell">{blog.category?.name || `Category ${blog.category_id}`}</td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-[#0F1E4A]">
                        <FaEye className="text-[#2563EB] text-xs" /> {blog.views_count ?? 0}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 hidden lg:table-cell">
                      {new Date(blog.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => navigate(`/admin/dashboard/blogs/edit/${blog.id}`)} className="w-9 h-9 flex items-center justify-center rounded-lg text-[#2563EB] bg-[#2563EB]/10 hover:bg-[#2563EB] hover:text-white transition-all duration-300">
                          <FaEdit className="text-sm" />
                        </button>
                        <button onClick={() => setDeleteId(blog.id)} className="w-9 h-9 flex items-center justify-center rounded-lg text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all duration-300">
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xl"><FaExclamationTriangle /></div>
              <div>
                <h3 className="text-lg font-bold text-[#0F1E4A] mb-1">Delete Blog?</h3>
                <p className="text-gray-600 text-sm">This action cannot be undone. The blog will be permanently deleted.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} disabled={deleting} className="inline-flex items-center gap-2 bg-gray-100 text-[#0F1E4A] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all duration-300 disabled:opacity-60">
                <FaTimes /> Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting} className="inline-flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-all duration-300 disabled:opacity-60">
                {deleting ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Deleting...</> : <><FaTrash /> Delete</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SEO Modal */}
      {isSeoModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#0F1E4A]">Blogs Page SEO</h3>
              <button onClick={() => setIsSeoModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSeoSubmit} className="p-6 space-y-4">
              <div>
                <label className={labelClass}>SEO Title</label>
                <input 
                  type="text" 
                  name="seo_title" 
                  value={seoData.seo_title} 
                  onChange={(e) => setSeoData({...seoData, seo_title: e.target.value})} 
                  className={inputClass} 
                  placeholder="e.g. Our Blogs | Brain Inspire" 
                />
              </div>
              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea 
                  name="seo_description" 
                  value={seoData.seo_description} 
                  onChange={(e) => setSeoData({...seoData, seo_description: e.target.value})} 
                  rows="3" 
                  className={inputClass} 
                  placeholder="Short description for search engines..." 
                />
              </div>
              <div>
                <label className={labelClass}>SEO Keywords</label>
                <input 
                  type="text" 
                  name="seo_keywords" 
                  value={seoData.seo_keywords} 
                  onChange={(e) => setSeoData({...seoData, seo_keywords: e.target.value})} 
                  className={inputClass} 
                  placeholder="e.g. blogs, news, articles" 
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="submit" className="bg-[#0F1E4A] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#2563EB] transition">
                  Save SEO Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Blogs;