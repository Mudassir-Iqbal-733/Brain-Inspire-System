import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../lib/axios';
import {
  FaPlus,
  FaTimes,
  FaImage,
  FaCloudUploadAlt,
  FaImages,
  FaEye,
} from 'react-icons/fa';

const SliderSettings = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({ title: '', subtitle: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = useRef(null);

  const fetchSliders = async () => {
    try {
      const res = await api.get('/sliders');
      setSliders(res.data.data || []);
    } catch (error) {
      toast.error('Failed to load sliders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const clearImage = () => {
    setImageFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error('Please select an image');
      return;
    }

    setUploading(true);
    const toastId = toast.loading('Uploading slider image...');

    try {
      const imgData = new FormData();
      imgData.append('image', imageFile);

      const tempRes = await api.post('/image/add', imgData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const tempImageId =
        tempRes.data?.image?.id || tempRes.data?.data?.id || tempRes.data?.id;

      if (!tempImageId) throw new Error('Image ID not found in response');

      await api.post('/admin/sliders', {
        title: formData.title || '',
        subtitle: formData.subtitle || '',
        image_id: tempImageId,
      });

      toast.update(toastId, {
        render: 'Slider added successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      setFormData({ title: '', subtitle: '' });
      clearImage();
      fetchSliders();
    } catch (error) {
      let errorMessage = 'Failed to add slider';
      if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors).flat().join(', ');
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.update(toastId, {
        render: errorMessage,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete this slide?',
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
      await api.delete(`/admin/sliders/${id}`);
      toast.success('Deleted successfully');
      setSliders((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-[#0F1E4A] placeholder-gray-400 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all';

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-10 h-10 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm mt-4">Loading sliders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#0F1E4A]">Hero Slider</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage the main hero slider images on your website homepage.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-[#38BDF8]/10 text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-full">
          <FaImages />
          {sliders.length} {sliders.length === 1 ? 'slide' : 'slides'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white shadow-lg">
              <FaPlus />
            </div>
            <div>
              <h3 className="font-bold text-[#0F1E4A]">Add New Slide</h3>
              <p className="text-xs text-gray-500">Upload image + text</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Upload area */}
            <div
              className={`relative w-full h-44 rounded-xl overflow-hidden transition-all duration-300 ${
                dragActive
                  ? 'border-2 border-[#38BDF8] bg-[#38BDF8]/5'
                  : preview
                  ? 'border border-gray-200'
                  : 'border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#38BDF8] hover:bg-[#38BDF8]/5'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-[#0F1E4A] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#38BDF8] transition"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                  <FaCloudUploadAlt className="text-4xl text-[#38BDF8] mb-2" />
                  <span className="text-sm font-semibold text-[#0F1E4A]">
                    Click or drag image here
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Recommended: 1920×800 · JPG / PNG
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              {preview && (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F1E4A] mb-1.5">
                Title <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClass}
                placeholder="Enter slide title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F1E4A] mb-1.5">
                Subtitle <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className={inputClass}
                placeholder="Enter slide subtitle..."
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0F1E4A] hover:bg-[#2563EB] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#0F1E4A]/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]"
            >
              {uploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <FaPlus className="text-xs" />
                  Add Slide
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sliders list */}
        <div className="lg:col-span-2">
          {sliders.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-3xl mb-4">
                <FaImages />
              </div>
              <h3 className="text-lg font-bold text-[#0F1E4A] mb-1">No slides yet</h3>
              <p className="text-sm text-gray-500">
                Add your first hero slide using the form on the left.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sliders.map((slider, index) => (
                <div
                  key={slider.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#38BDF8]/40 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch"
                >
                  {/* Number badge */}
                  <div className="relative shrink-0 sm:w-56 h-40 sm:h-auto overflow-hidden">
                    <img
                      src={slider.image}
                      alt={slider.title || `Slide ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0F1E4A] text-white text-xs font-bold shadow-lg">
                      {index + 1}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                    <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1">
                      Slide #{index + 1}
                    </p>
                    <h4 className="font-bold text-[#0F1E4A] text-base truncate">
                      {slider.title || <span className="text-gray-400 italic font-normal">No Title</span>}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
                      {slider.subtitle || <span className="italic">No Subtitle</span>}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col items-center justify-center gap-2 p-4 sm:border-l border-gray-100">
                    <a
                      href={slider.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                      title="View full image"
                    >
                      <FaEye />
                    </a>
                    <button
                      onClick={() => handleDelete(slider.id)}
                      disabled={deletingId === slider.id}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === slider.id ? (
                        <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <FaTimes />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderSettings;