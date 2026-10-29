import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../lib/axios';
import { FaUser, FaEnvelope, FaLock, FaSave } from 'react-icons/fa';

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('admin_user') || '{}');
    if (adminData) {
      setFormData({
        name: adminData.name || '',
        email: adminData.email || '',
        password: '',
        confirm_password: '',
      });
    }
    setFetching(false);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirm_password) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    const toastId = toast.loading('Updating profile...');

    try {
      const res = await api.post('/admin/profile', {
        name: formData.name,
        email: formData.email,
        password: formData.password || null,
        password_confirmation: formData.confirm_password || null,
      });

      localStorage.setItem('admin_user', JSON.stringify(res.data.data));

      toast.update(toastId, { render: 'Profile updated successfully!', type: 'success', isLoading: false, autoClose: 3000 });
      setFormData({ ...formData, password: '', confirm_password: '' });
      
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      let errorMsg = 'Failed to update';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      }
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-10">Loading...</div>;

  const inputClass = "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#38BDF8] outline-none transition-all";

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0F1E4A]">Admin Profile</h2>
        <p className="text-sm text-gray-500">Manage your account credentials.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold text-[#0F1E4A] mb-2">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaUser />
              </span>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className={inputClass} 
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0F1E4A] mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className={inputClass} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#0F1E4A] mb-2">New Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaLock />
                </span>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Leave blank to keep current"
                  className={inputClass} 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0F1E4A] mb-2">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FaLock />
                </span>
                <input 
                  type="password" 
                  name="confirm_password" 
                  value={formData.confirm_password} 
                  onChange={handleChange} 
                  placeholder="Confirm new password"
                  className={inputClass} 
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#38BDF8] hover:bg-[#2563EB] text-[#0F1E4A] hover:text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition disabled:opacity-50"
            >
              <FaSave /> {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminProfile;