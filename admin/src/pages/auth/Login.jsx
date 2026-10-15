import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import api from '../../lib/axios';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/admin/login', {
        email: form.email,
        password: form.password,
      });

      const responseData = response.data;
      const token = responseData?.data?.token;
      const user = responseData?.data?.user;

      if (!token) {
        setError('Token not received from server');
        setLoading(false);
        return;
      }

      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user || {}));

      setSuccess('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid email or password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4 py-16 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-[#2D2B6F] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-[#2D2B6F]/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg shadow-[#38BDF8]/40 mb-5">
              <FaLock />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-300 text-sm">
              Sign in to access the admin panel
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 bg-red-500/15 border border-red-500/30 text-red-200 rounded-xl px-4 py-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-start gap-3 bg-green-500/15 border border-green-500/30 text-green-200 rounded-xl px-4 py-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shrink-0"></span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38BDF8] text-sm" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white/15 focus:ring-2 focus:ring-[#38BDF8]/30 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38BDF8] text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white/15 focus:ring-2 focus:ring-[#38BDF8]/30 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#38BDF8] hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-[#38BDF8]/30 hover:bg-white hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="text-sm" />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Brain Inspire System of Education
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;