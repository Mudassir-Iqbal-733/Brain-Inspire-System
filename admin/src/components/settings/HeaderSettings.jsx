import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/axios';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const HeaderSettings = () => {
  const [headerId, setHeaderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    logoText: '',
    phone: '',
    email: '',
    mapAddress: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/header-settings');

        if (res.data.data) {
          setHeaderId(res.data.data.id);
          setFormData({
            logoText: res.data.data.logo_text || '',
            phone: res.data.data.phone || '',
            email: res.data.data.email || '',
            mapAddress: res.data.data.map_address || '',
          });
          setPreview(res.data.data.logo_image);
        }
      } catch (error) {
        console.error('Error fetching header settings:', error);
        toast.error('Failed to load header settings');
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setImageFile(file);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/image/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const tempImageId =
        response.data?.image?.id || response.data?.data?.id;

      if (!tempImageId) {
        toast.error('Image uploaded but ID not received.');
        return;
      }

      setImageId(tempImageId);
      setPreview(URL.createObjectURL(file));
      toast.success('Logo uploaded successfully');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.image?.[0] ||
        'Image upload failed.';
      toast.error(message);
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        logo_text: formData.logoText,
        phone: formData.phone,
        email: formData.email,
        map_address: formData.mapAddress,
      };

      if (imageId) {
        data.image_id = imageId;
      }

      if (headerId) {
        await api.post(`/admin/header-settings/${headerId}`, data);
      } else {
        await api.post('/admin/header-settings', data);
      }

      toast.success('Header settings saved successfully!');
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      console.error('Error saving header settings:', error);

      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(', ');
        toast.error(errorMessages);
      } else {
        toast.error(error.response?.data?.message || 'Failed to save settings.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1E4A]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Header Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your website header information.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo Image</label>

          {uploadingImage ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-[#0F1E4A] rounded-2xl bg-blue-50/50 h-24 w-24">
              <div className="inline-block w-6 h-6 border-4 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50 mb-3 overflow-hidden relative group">
              {preview ? (
                <img src={preview} alt="Logo Preview" className="w-full h-full object-contain" />
              ) : (
                <span className="text-xs">Logo</span>
              )}

              <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-xs font-bold">
                Change
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {!preview && !uploadingImage && (
            <input
              type="file"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0F1E4A]/10 file:text-[#0F1E4A] hover:file:bg-[#0F1E4A]/20 transition"
            />
          )}
          <p className="text-xs text-gray-400 mt-2">Recommended: 200x60px. PNG/JPG/SVG.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Logo Text</label>
          <input
            type="text"
            name="logoText"
            value={formData.logoText}
            onChange={handleChange}
            placeholder="Enter logo text"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaPhoneAlt className="text-sm" />
            </span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaEnvelope className="text-sm" />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Map Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaMapMarkerAlt className="text-sm" />
            </span>
            <input
              type="text"
              name="mapAddress"
              value={formData.mapAddress}
              onChange={handleChange}
              placeholder="Enter website address"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all"
            />
          </div>
        </div>

        <div className="md:col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="bg-[#0F1E4A] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md shadow-[#0F1E4A]/30 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save Header Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeaderSettings;