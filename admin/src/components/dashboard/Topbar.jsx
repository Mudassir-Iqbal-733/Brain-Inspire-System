import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaChevronDown, FaBars } from 'react-icons/fa';
import api from '../../lib/axios';

const Topbar = ({ toggleSidebar }) => { 
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let user = {};
  try {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) user = JSON.parse(storedUser);
  } catch (error) {
    user = {};
  }

  const handleLogout = async () => {
    try {
      await api.post('/admin/logout');
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      navigate('/', { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        
        {/* Left Side - Hamburger Menu (Mobile) */}
        <div className="flex items-center w-1/3">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <FaBars className="text-xl" />
          </button>
          
        </div>

        {/* Center - Text (Responsive) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full px-2">
          <h1 className="text-sm sm:text-lg md:text-xl font-bold text-[#0F1E4A] tracking-wide truncate">
            Brain Inspire System
          </h1>
          <p className="hidden sm:block text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest">
            Admin Dashboard
          </p>
        </div>

        {/* Right Side - Profile Dropdown */}
        <div className="flex items-center justify-end w-1/3 relative z-10">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 py-1.5 px-2 sm:pr-3 sm:pl-3 rounded-full transition border border-transparent hover:border-gray-200"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#2563EB] text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-md">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-[#0F1E4A] leading-tight">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-gray-500">{user?.email || 'admin@bise.com'}</p>
            </div>
            <FaChevronDown className={`text-[10px] sm:text-xs text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-gray-800">
              <Link 
                to="/admin/dashboard/profile" 
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition"
              >
                <FaUser className="text-[#38BDF8]" /> My Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;