import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBlog,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = ({ currentPath }) => {
  const isActive = (path) => currentPath === path;

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
  };

  return (
    <aside className="sticky top-0 h-screen w-72 bg-[#2D2B6F] text-white flex flex-col shadow-2xl shrink-0">
      <div className="flex items-center gap-2.5 p-5 border-b border-white/10 shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-[#38BDF8]/40">
            B
          </div>
          <div>
            <p className="text-sm font-bold leading-tight text-white">
              Brain Inspire
            </p>
            <p className="text-[10px] text-[#38BDF8] font-semibold tracking-wider uppercase">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
        <Link
          to="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
            isActive('/admin/dashboard')
              ? 'bg-linear-to-r from-[#38BDF8] to-[#2563EB] text-white shadow-lg shadow-[#38BDF8]/40'
              : 'text-white hover:bg-[#38BDF8]/20 hover:text-white'
          }`}
        >
          <FaTachometerAlt className="text-base" />
          Dashboard
        </Link>

        <Link
          to="/admin/blogs"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
            isActive('/admin/blogs')
              ? 'bg-linear-to-r from-[#38BDF8] to-[#2563EB] text-white shadow-lg shadow-[#38BDF8]/40'
              : 'text-white hover:bg-[#38BDF8]/20 hover:text-white'
          }`}
        >
          <FaBlog className="text-base" />
          Blogs
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-white hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
        >
          <FaSignOutAlt className="text-base" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;