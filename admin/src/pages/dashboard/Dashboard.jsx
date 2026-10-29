import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  FaDesktop, FaWindowMaximize, FaUserTie, FaCog, 
  FaShareAlt, FaRegWindowRestore, FaImages, 
  FaVideo, FaGlobe
} from 'react-icons/fa';

const Dashboard = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Header', path: '/admin/dashboard/settings/header', icon: FaDesktop },
    { name: 'Footer', path: '/admin/dashboard/settings/footer', icon: FaWindowMaximize },
    { name: 'General', path: '/admin/dashboard/settings/general', icon: FaGlobe },
    { name: 'Hero Slider', path: '/admin/dashboard/settings/slider', icon: FaImages },
    { name: 'Director', path: '/admin/dashboard/settings/director', icon: FaUserTie },
    { name: 'Managing Director', path: '/admin/dashboard/settings/managing-director', icon: FaUserTie },
    { name: 'Social Media', path: '/admin/dashboard/settings/social', icon: FaShareAlt },
    { name: 'Videos', path: '/admin/dashboard/settings/videos', icon: FaVideo },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="bg-[#0F1E4A] p-5 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl font-bold">Website Settings</h1>
          <p className="text-gray-300 text-xs sm:text-sm mt-1">Manage your website settings</p>
        </div>

        {/* Responsive Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border-b border-gray-100 bg-gray-50/50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname.includes(tab.path);

            return (
              <NavLink
                key={tab.name}
                to={tab.path}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 sm:py-4 text-xs sm:text-sm font-medium transition-all duration-300 border-b-2
                  ${isActive 
                    ? 'border-[#0F1E4A] text-[#0F1E4A] bg-white' 
                    : 'border-transparent text-gray-500 hover:text-[#0F1E4A] hover:bg-gray-100'
                  }`}
              >
                <Icon className={`text-lg sm:text-base ${isActive ? 'text-[#38BDF8]' : 'text-gray-400'}`} />
                <span className="text-center">{tab.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;