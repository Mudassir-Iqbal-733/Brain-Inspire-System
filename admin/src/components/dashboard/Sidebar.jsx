import { Link, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaBlog, FaComment, FaAddressBook,
  FaEnvelopeOpenText, FaInfoCircle, FaBookOpen,
  FaUserGraduate, FaFileAlt, FaImages, FaTimes
} from 'react-icons/fa';
import api from '../../lib/axios';

const Sidebar = ({ currentPath, isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard/settings', icon: FaTachometerAlt },
    { name: 'About', path: '/admin/dashboard/about', icon: FaInfoCircle },
    { name: 'Admission Settings', path: '/admin/dashboard/admissions', icon: FaUserGraduate },
    { name: 'Student Forms', path: '/admin/dashboard/admission-list', icon: FaFileAlt },
    { name: 'Programs', path: '/admin/dashboard/programs', icon: FaBookOpen },
    { name: 'Gallery', path: '/admin/dashboard/gallery', icon: FaImages },
    { name: 'Blogs', path: '/admin/dashboard/blogs', icon: FaBlog },
    { name: 'Comments', path: '/admin/dashboard/comments', icon: FaComment },
    { name: 'Contact', path: '/admin/dashboard/contact', icon: FaAddressBook },
    { name: 'Feedbacks', path: '/admin/dashboard/feedbacks', icon: FaEnvelopeOpenText },
  ];

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
    <>
      {/* Mobile Overlay Background */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-0 left-0 h-screen w-72 bg-[#2D2B6F] text-white flex flex-col shadow-2xl shrink-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <Link to="/admin/dashboard/settings" className="flex items-center gap-2.5" onClick={closeSidebar}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#2563EB] flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-[#38BDF8]/40">
              B
            </div>
            <div>
              <p className="text-sm font-bold leading-tight text-white">Brain Inspire</p>
              <p className="text-[10px] text-[#38BDF8] font-semibold tracking-wider uppercase">Admin Panel</p>
            </div>
          </Link>
          
          {/* Mobile Close Button */}
          <button onClick={closeSidebar} className="lg:hidden text-white/70 hover:text-white">
            <FaTimes className="text-xl" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = currentPath.startsWith(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeSidebar} // Mobile par click karte hi band ho jaye
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-[#38BDF8] to-[#2563EB] text-white shadow-lg shadow-[#38BDF8]/40'
                    : 'text-gray-200 hover:bg-[#38BDF8]/20 hover:text-white'
                }`}
              >
                <Icon className="text-base" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;