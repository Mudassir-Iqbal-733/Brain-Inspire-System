import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/axios';

const FooterSettings = () => {
  const [footerId, setFooterId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    description: '',
    copyrightText: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/footer-settings');
        
        if (res.data.data) {
          setFooterId(res.data.data.id);
          setFormData({
            description: res.data.data.description || '',
            copyrightText: res.data.data.copyright_text || '',
          });
          setPreview(res.data.data.logo_image);
        }
      } catch (error) {
        console.error('Error fetching footer settings:', error);
        toast.error('Failed to load footer settings.');
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

    const toastId = toast.loading('Uploading image...');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/image/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const tempImageId = response.data?.image?.id || response.data?.data?.id;

      if (!tempImageId) {
        toast.update(toastId, {
          render: 'Image uploaded but ID not received.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      setImageId(tempImageId);
      setPreview(URL.createObjectURL(file));
      
      toast.update(toastId, {
        render: 'Image uploaded successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
      
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.image?.[0] ||
        'Image upload failed.';
      
      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
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
        description: formData.description,
        copyright_text: formData.copyrightText,
      };

      if (imageId) {
        data.image_id = imageId;
      }

      if (footerId) {
        await api.post(`/admin/footer-settings/${footerId}`, data);
      } else {
        await api.post('/admin/footer-settings', data);
      }

      toast.success('Footer Settings Saved Successfully!');
      
      setTimeout(() => {
        window.location.reload(); 
      }, 1500);

    } catch (error) {
      console.error('Error saving footer settings:', error);
      
      let errorMsg = 'Failed to save settings.';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      
      toast.error(errorMsg);
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
        <h2 className="text-xl font-bold text-gray-800">Footer Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your website footer information.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">White Logo (For Dark Background)</label>
          
          {uploadingImage ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 border-2 border-dashed border-[#0F1E4A] rounded-2xl bg-blue-50/50 h-24 w-40">
              <div className="inline-block w-6 h-6 border-4 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="w-40 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-[#0F1E4A] mb-3 overflow-hidden relative group">
              {preview ? (
                <img src={preview} alt="Logo Preview" className="w-full h-full object-contain p-2" />
              ) : (
                <span className="text-xs text-white">Logo</span>
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
          <p className="text-xs text-gray-400 mt-2">Recommended: Transparent PNG or SVG for dark footer.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Footer Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter footer description..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
          <input
            type="text"
            name="copyrightText"
            value={formData.copyrightText}
            onChange={handleChange}
            placeholder="e.g. © 2026 Brain Inspire. All rights reserved."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all"
          />
        </div>

        <div className="mt-4 flex justify-end">
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
              'Save Footer Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FooterSettings;