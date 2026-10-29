import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/axios';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaMap } from 'react-icons/fa';

const ContactSettings = () => {
  const [contactId, setContactId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    email: '',
    mapUrl: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/contact-settings');
        if (res.data.data) {
          const data = res.data.data;
          setContactId(data.id);
          setFormData({
            address: data.address || '',
            phone: data.phone || '',
            email: data.email || '',
            mapUrl: data.map_url || '',
            seo_title: data.seo_title || '',
            seo_description: data.seo_description || '',
            seo_keywords: data.seo_keywords || '',
          });
        }
      } catch (error) {
        toast.error('Failed to load contact data');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        map_url: formData.mapUrl,
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
        seo_keywords: formData.seo_keywords,
      };

      if (contactId) {
        await api.post(`/admin/contact-settings/${contactId}`, data);
      } else {
        await api.post('/admin/contact-settings', data);
      }

      toast.success('Contact Settings Saved!');
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

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0F1E4A]">Contact Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage contact information.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaMapMarkerAlt />
            </span>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              className={`${inputClass} pl-10`} 
              placeholder="Enter full address" 
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaPhoneAlt />
            </span>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className={`${inputClass} pl-10`} 
              placeholder="0300-0000000" 
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaEnvelope />
            </span>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={`${inputClass} pl-10`} 
              placeholder="your@email.com" 
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Google Map Embed URL</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaMap />
            </span>
            <input 
              type="text" 
              name="mapUrl" 
              value={formData.mapUrl} 
              onChange={handleChange} 
              className={`${inputClass} pl-10`} 
              placeholder="https://www.google.com/maps/embed?pb=..." 
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Paste the iframe `src` link from Google Maps Embed.</p>
        </div>

        <div className="md:col-span-2 mt-4 border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-[#0F1E4A] mb-4">SEO Settings (Contact Page)</h3>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>SEO Title</label>
              <input 
                type="text" 
                name="seo_title" 
                value={formData.seo_title} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="e.g. Contact Us | Brain Inspire" 
              />
            </div>
            
            <div>
              <label className={labelClass}>SEO Description</label>
              <textarea 
                name="seo_description" 
                value={formData.seo_description} 
                onChange={handleChange} 
                rows="2" 
                className={inputClass} 
                placeholder="Short description for search engines..." 
              />
            </div>
            
            <div>
              <label className={labelClass}>SEO Keywords</label>
              <input 
                type="text" 
                name="seo_keywords" 
                value={formData.seo_keywords} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="e.g. contact, address, phone" 
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-[#0F1E4A] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save Contact Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactSettings;