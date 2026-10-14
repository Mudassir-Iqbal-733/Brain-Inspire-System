import { FaBell } from 'react-icons/fa';

const Topbar = () => {
  let user = {};

  try {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    user = {};
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div>
          <h1 className="text-lg font-bold text-[#0F1E4A]">Admin Panel</h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Brain Inspire System of Education
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <FaBell className="text-lg" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#38BDF8]"></span>
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#38BDF8] to-[#2563EB] flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#0F1E4A] leading-tight">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || 'admin@bise.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;