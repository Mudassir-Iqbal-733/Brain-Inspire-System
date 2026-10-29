import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  FaArrowLeft,
  FaSave,
  FaImage,
  FaTimes,
  FaPlus,
  FaCheck,
} from 'react-icons/fa';
import api from '../../lib/axios';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    shortDesc: '',
    description: '',
    author: '',
    keywords: '',
    category_id: '',
    image_id: null,
    descImg_id: null,
  });

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParent, setNewCategoryParent] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState('');

  const [imagePreview, setImagePreview] = useState(null);
  const [descImagePreview, setDescImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingDescImage, setUploadingDescImage] = useState(false);

  const [fetching, setFetching] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link',],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video',
  ];

  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await api.get('/categories');
      const data = response.data?.data || [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchBlog = async () => {
      setFetching(true);
      setError('');

      try {
        const response = await api.get(`/blog/${id}`);
        const blog = response.data?.data || response.data;

        setForm({
          title: blog.title || '',
          shortDesc: blog.shortDesc || '',
          description: blog.description || '',
          author: blog.author || '',
          keywords: blog.keywords || '',
          category_id: blog.category_id || '',
          image_id: null,
          descImg_id: null,
        });

        if (blog.image) setImagePreview(blog.image);
        if (blog.descImg) setDescImagePreview(blog.descImg);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Failed to load blog.';
        setError(message);
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleDescriptionChange = (value) => {
    setForm({ ...form, description: value });
    setError('');
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (field === 'image_id') setUploadingImage(true);
    if (field === 'descImg_id') setUploadingDescImage(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/image/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const tempImageId = response.data?.image?.id;

      if (!tempImageId) {
        setError('Image uploaded but ID not received.');
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      setForm((prev) => ({ ...prev, [field]: tempImageId }));

      if (field === 'image_id') setImagePreview(previewUrl);
      if (field === 'descImg_id') setDescImagePreview(previewUrl);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.image?.[0] ||
        'Image upload failed.';
      setError(message);
    } finally {
      if (field === 'image_id') setUploadingImage(false);
      if (field === 'descImg_id') setUploadingDescImage(false);
    }
  };

  const removeImage = (field) => {
    setForm((prev) => ({ ...prev, [field]: null }));

    if (field === 'image_id') setImagePreview(null);
    if (field === 'descImg_id') setDescImagePreview(null);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCreatingCategory(true);
    setCategoryError('');

    try {
      const payload = { name: newCategoryName.trim() };
      if (newCategoryParent) payload.parent_id = Number(newCategoryParent);

      const response = await api.post('/categories/add', payload);
      const newCategory = response.data?.data;

      setNewCategoryName('');
      setNewCategoryParent('');
      setShowCategoryModal(false);

      await fetchCategories();

      if (!newCategoryParent && newCategory?.id) {
        setForm((prev) => ({ ...prev, category_id: newCategory.id }));
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.name?.[0] ||
        'Failed to create category.';
      setCategoryError(message);
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        title: form.title,
        shortDesc: form.shortDesc,
        description: form.description,
        author: form.author,
        keywords: form.keywords,
        category_id: form.category_id,
      };

      if (form.image_id) payload.image_id = form.image_id;
      if (form.descImg_id) payload.descImg_id = form.descImg_id;

      if (isEditMode) {
        await api.put(`/blog/${id}`, payload);
        setSuccess('Blog updated successfully!');
      } else {
        await api.post('/blog/add', payload);
        setSuccess('Blog created successfully!');
      }

      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      const errors = err.response?.data?.errors;
      let message = err.response?.data?.message || 'Failed to save blog.';

      if (errors) {
        const firstError = Object.values(errors)[0]?.[0];
        if (firstError) message = firstError;
      }

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200';
  const labelClass = 'block text-sm font-bold text-[#0F1E4A] mb-2';

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm mt-4">Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ReactQuill ki height badhane ke liye custom CSS */}
      <style>{`
        .ql-container.ql-snow {
          min-height: 350px;
        }
        .ql-editor {
          min-height: 350px;
          font-size: 16px;
        }
        @media (min-width: 768px) {
          .ql-container.ql-snow { min-height: 450px; }
          .ql-editor { min-height: 450px; }
        }
      `}</style>

      <div className="flex items-center gap-4">
        <Link
          to="/admin/dashboard/blogs"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-[#0F1E4A] hover:bg-[#38BDF8] hover:text-white hover:border-[#38BDF8] transition-all duration-300"
          aria-label="Back"
        >
          <FaArrowLeft />
        </Link>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1E4A]">
            {isEditMode ? 'Edit Blog Post' : 'Create Blog Post'}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {isEditMode
              ? 'Update the details below and save changes.'
              : 'Fill in the details to create a new blog.'}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <label className={labelClass}>Blog Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Short Description *</label>
            <input
              type="text"
              name="shortDesc"
              value={form.shortDesc}
              onChange={handleChange}
              required
              placeholder="Short one-line summary..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Full Description *</label>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:border-[#38BDF8] focus-within:ring-2 focus-within:ring-[#38BDF8]/20 transition-all duration-200">
              <ReactQuill
                theme="snow"
                value={form.description}
                onChange={handleDescriptionChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your full blog content here..."
                className="quill-editor"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Author *</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                required
                placeholder="Author name..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Category *</label>

              <div className="flex gap-2">
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                  disabled={categoriesLoading}
                  className={`${inputClass} flex-1`}
                >
                  <option value="">
                    {categoriesLoading ? 'Loading...' : 'Select Category'}
                  </option>

                  {categories.map((cat) => (
                    <optgroup key={cat.id} label={cat.name}>
                      <option value={cat.id}>{cat.name} (Main)</option>
                      {cat.subcategories?.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          &nbsp;&nbsp;&nbsp;— {sub.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-[#38BDF8] text-[#0F1E4A] hover:bg-[#2563EB] hover:text-white transition-all duration-300"
                  aria-label="Add category"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Keywords (comma separated)</label>
            <input
              type="text"
              name="keywords"
              value={form.keywords}
              onChange={handleChange}
              placeholder="digital skills, education, technology"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Featured Image (Main)</label>

            {uploadingImage ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-[#38BDF8] rounded-2xl bg-[#38BDF8]/5">
                <div className="inline-block w-10 h-10 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-bold text-[#0F1E4A]">Uploading...</p>
              </div>
            ) : imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage('image_id')}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  aria-label="Remove"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:border-[#38BDF8] cursor-pointer transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center text-xl">
                  <FaImage />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#0F1E4A]">
                    Click to upload main image
                  </p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'image_id')}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <label className={labelClass}>Description Image (Optional)</label>

            {uploadingDescImage ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-[#38BDF8] rounded-2xl bg-[#38BDF8]/5">
                <div className="inline-block w-10 h-10 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-bold text-[#0F1E4A]">Uploading...</p>
              </div>
            ) : descImagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                <img
                  src={descImagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage('descImg_id')}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  aria-label="Remove"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:border-[#38BDF8] cursor-pointer transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center text-xl">
                  <FaPlus />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#0F1E4A]">
                    Click to upload description image
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Optional</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'descImg_id')}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={submitting || uploadingImage || uploadingDescImage}
            className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2563EB] hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></span>
                {isEditMode ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              <>
                <FaSave />
                {isEditMode ? 'Update Blog' : 'Save Blog'}
              </>
            )}
          </button>

          <Link
            to="/admin/blogs"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#0F1E4A] px-6 py-3.5 rounded-xl font-bold text-sm hover:border-[#38BDF8] hover:text-[#2563EB] transition-all duration-300"
          >
            Cancel
          </Link>
        </div>
      </form>

      {showCategoryModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0F1E4A]">Add Category</h3>
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setNewCategoryName('');
                  setNewCategoryParent('');
                  setCategoryError('');
                }}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {categoryError && (
              <div className="mb-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                <span>{categoryError}</span>
              </div>
            )}

            <form onSubmit={handleCreateCategory} className="space-y-5">
              <div>
                <label className={labelClass}>Category Name *</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                  autoFocus
                  placeholder="e.g. Technology, Career"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Parent Category (Optional)</label>
                <select
                  value={newCategoryParent}
                  onChange={(e) => setNewCategoryParent(e.target.value)}
                  className={inputClass}
                >
                  <option value="">None — Main Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty for main, or select a parent for sub-category.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryModal(false);
                    setNewCategoryName('');
                    setNewCategoryParent('');
                    setCategoryError('');
                  }}
                  disabled={creatingCategory}
                  className="inline-flex items-center gap-2 bg-gray-100 text-[#0F1E4A] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all duration-300 disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creatingCategory || !newCategoryName.trim()}
                  className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#2563EB] hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {creatingCategory ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Create
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogForm;