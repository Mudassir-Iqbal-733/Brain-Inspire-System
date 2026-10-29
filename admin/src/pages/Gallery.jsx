import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../lib/axios';
import { FaPlus, FaTrash, FaImage, FaCog, FaTimes } from 'react-icons/fa';

const Gallery = () => {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);

  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState({ category_id: '', title: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [seoData, setSeoData] = useState({
    seo_title: '', seo_description: '', seo_keywords: ''
  });

  const fetchGallery = async () => {
    try {
      const res = await api.get('/admin/gallery');
      setCategories(res.data.categories);
      setImages(res.data.images);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const fetchSeoSettings = async () => {
    try {
      const res = await api.get('/gallery/page-seo');
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
    fetchGallery();
    fetchSeoSettings();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;
    try {
      await api.post('/admin/gallery/categories', { name: newCategory });
      toast.success('Category added');
      setNewCategory('');
      fetchGallery();
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: 'Delete Category?',
      text: "All images in this category will also be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.delete(`/admin/gallery/categories/${id}`);
        toast.success('Category deleted');
        fetchGallery();
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!imageFile || !formData.category_id) {
      toast.error('Image and Category are required');
      return;
    }
    setSaving(true);
    const toastId = toast.loading('Uploading...');

    try {
      const imgData = new FormData();
      imgData.append('image', imageFile);
      
      const tempRes = await api.post('/image/add', imgData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const tempImageId = tempRes.data?.image?.id || tempRes.data?.data?.id;

      if (!tempImageId) {
        throw new Error("Image ID not received from backend.");
      }

      await api.post('/admin/gallery/images', {
        category_id: formData.category_id,
        title: formData.title,
        image_id: tempImageId
      });

      toast.update(toastId, { render: 'Image added!', type: 'success', isLoading: false, autoClose: 3000 });
      setFormData({ ...formData, title: '' });
      setImageFile(null);
      setPreview(null);
      fetchGallery();
    } catch (error) {
      let errorMsg = 'Failed to add image';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    } finally {
      setSaving(false);
    }
  };

  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Saving SEO...');
    try {
      await api.post('/admin/gallery/page-seo', seoData);
      toast.update(toastId, { render: 'Page SEO Saved!', type: 'success', isLoading: false, autoClose: 3000 });
      setIsSeoModalOpen(false);
      fetchSeoSettings();
    } catch (error) {
      let errorMsg = 'Failed to save SEO';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  const handleDeleteImage = (id) => {
    Swal.fire({
      title: 'Delete Image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.delete(`/admin/gallery/images/${id}`);
        toast.success('Image deleted');
        fetchGallery();
      }
    });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-8">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h2 className="text-xl font-bold text-[#0F1E4A]">Gallery Management</h2>
        <button 
          onClick={() => setIsSeoModalOpen(true)} 
          className="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition w-full sm:w-auto justify-center font-medium whitespace-nowrap"
        >
          <FaCog /> SEO
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold mb-4">Add Category</h3>
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category Name" className={inputClass} />
            <button type="submit" className="bg-[#0F1E4A] text-white px-4 rounded-lg"><FaPlus /></button>
          </form>
          
          <ul className="mt-4 space-y-2">
            {categories.map(cat => (
              <li key={cat.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                {cat.name}
                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
          <h3 className="font-bold mb-4">Add Image</h3>
          <form onSubmit={handleAddImage} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})} className={inputClass} required>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Image Title (Optional)" className={inputClass} />
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="w-24 h-24 border-2 border-dashed rounded-lg relative overflow-hidden bg-gray-50">
                {preview ? <img src={preview} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-400"><FaImage /></div>}
                <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer text-xs">
                  Upload <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              <button type="submit" disabled={saving} className="bg-[#0F1E4A] text-white px-6 py-2 rounded-lg">
                {saving ? 'Saving...' : 'Add Image'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4">Gallery Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border">
              <img src={img.image} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <button onClick={() => handleDeleteImage(img.id)} className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isSeoModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#0F1E4A]">Gallery Page SEO</h3>
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
                  placeholder="e.g. Our Gallery | Brain Inspire" 
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
                  placeholder="e.g. gallery, campus, events" 
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

export default Gallery;