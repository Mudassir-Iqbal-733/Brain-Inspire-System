import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/axios';
import { FaImage, FaGlobe } from 'react-icons/fa';

const GeneralSettings = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [headerImagePreview, setHeaderImagePreview] = useState(null);
  const [headerImageId, setHeaderImageId] = useState(null);
  const [uploadingHeader, setUploadingHeader] = useState(false);

  const [faviconPreview, setFaviconPreview] = useState(null);
  const [faviconId, setFaviconId] = useState(null);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/general-settings');
        if (res.data.data) {
          const data = res.data.data;
          setHeaderImagePreview(data.page_header_image);
          setFaviconPreview(data.favicon);
        }
      } catch (error) {
        toast.error('Failed to load settings');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'header') setUploadingHeader(true);
    if (type === 'favicon') setUploadingFavicon(true);

    const toastId = toast.loading(`Uploading ${type}...`);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/image/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Aapke TempImageController ke mutabiq ID 'image' key ke andar hai
      const tempId = response.data?.image?.id;

      if (!tempId) {
        throw new Error("Image uploaded but ID not received.");
      }

      if (type === 'header') {
        setHeaderImageId(tempId);
        setHeaderImagePreview(URL.createObjectURL(file));
      } else {
        setFaviconId(tempId);
        setFaviconPreview(URL.createObjectURL(file));
      }

      toast.update(toastId, { render: 'Image uploaded!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (error) {
      let errorMsg = 'Upload failed';
      if (error.response?.data?.errors?.image) {
        errorMsg = error.response.data.errors.image[0];
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
      console.error("Upload Error:", error.response?.data);
    } finally {
      if (type === 'header') setUploadingHeader(false);
      if (type === 'favicon') setUploadingFavicon(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        header_image_id: headerImageId || null,
        favicon_id: faviconId || null,
      };

      await api.post('/admin/general-settings', data);
      toast.success('General Settings Saved!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-10">Loading...</div>;

  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0F1E4A]">General Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage global website assets like header image and favicon.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-8">
        
        <div>
          <h3 className="font-bold text-md text-[#0F1E4A] mb-3 flex items-center gap-2">
            <FaGlobe className="text-[#2563EB]" /> Page Header Image
          </h3>
          <p className="text-xs text-gray-500 mb-4">This image will be used as the background for page headers. Use a wide image (1920x400px).</p>
          
          <div className="w-full max-w-2xl h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative overflow-hidden group">
            {headerImagePreview ? (
              <img src={headerImagePreview} alt="Header Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaImage className="text-3xl mb-2" />
                <span className="text-sm">Upload Header Image</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition text-sm font-bold">
              {uploadingHeader ? 'Uploading...' : 'Change Image'}
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'header')} className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-md text-[#0F1E4A] mb-3 flex items-center gap-2">
            <FaGlobe className="text-[#2563EB]" /> Website Favicon
          </h3>
          <p className="text-xs text-gray-500 mb-4">The small icon shown in the browser tab. Recommended size: 32x32 or 64x64. Format: PNG, ICO, SVG.</p>
          
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative overflow-hidden group">
            {faviconPreview ? (
              <img src={faviconPreview} alt="Favicon Preview" className="w-full h-full object-contain p-2" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaImage className="text-2xl mb-1" />
                <span className="text-[10px]">Favicon</span>
              </div>
            )}
            <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition text-xs font-bold">
              {uploadingFavicon ? 'Wait...' : 'Change'}
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'favicon')} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button type="submit" disabled={loading || uploadingHeader || uploadingFavicon} className="bg-[#0F1E4A] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md disabled:opacity-50">
            {loading ? 'Saving...' : 'Save General Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
