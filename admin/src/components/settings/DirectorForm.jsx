import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/axios';
import { FaImage } from 'react-icons/fa';

const DirectorForm = ({ type, titleLabel }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      
      setFormData({
        name: '',
        title: '',
        email: '',
        phone: '',
        message: '',
      });
      setPreview(null);
      setImageId(null);

      try {
        const res = await api.get(`/director-message?type=${type}`);
        if (res.data.data) {
          const data = res.data.data;
          setFormData({
            name: data.name || '',
            title: data.title || '',
            email: data.email || '',
            phone: data.phone || '',
            message: data.message || '',
          });
          setPreview(data.image);
        }
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [type]);

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
        toast.update(toastId, { render: 'ID not received', type: 'error', isLoading: false, autoClose: 3000 });
        return;
      }

      setImageId(tempImageId);
      setPreview(URL.createObjectURL(file));
      toast.update(toastId, { render: 'Image uploaded!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (err) {
      toast.update(toastId, { render: 'Upload failed!', type: 'error', isLoading: false, autoClose: 3000 });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        type: type,
        name: formData.name,
        title: formData.title,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      if (imageId) data.image_id = imageId;

      await api.post('/admin/director-message', data);
      toast.success('Saved Successfully!');
    } catch (error) {
      let errorMsg = 'Failed to save.';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
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
        <h2 className="text-xl font-bold text-[#0F1E4A]">{titleLabel} Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage information for the {(titleLabel || type || 'director').toLowerCase()}.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          
          {uploadingImage ? (
            <div className="w-32 h-32 border-2 border-dashed border-[#0F1E4A] rounded-lg bg-gray-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0F1E4A]"></div>
            </div>
          ) : (
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 relative group overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <FaImage className="text-2xl mb-1" />
                  <span className="text-[10px]">Upload</span>
                </div>
              )}
              <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-xs font-bold">
                Change
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all" 
            placeholder="Enter Name" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title / Designation</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all" 
            placeholder="e.g. Director" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all" 
            placeholder="Enter Email" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all" 
            placeholder="Enter Phone" 
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            rows="6" 
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all" 
            placeholder="Write the message here..." 
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button 
            type="submit" 
            disabled={loading || uploadingImage} 
            className="bg-[#0F1E4A] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DirectorForm;