import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import useLoader from '../../hooks/useLoader';
import { FaGraduationCap, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const CareerGuidance = () => {
  const loading = useLoader();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    province: '',
    city: '',
    area: '',
    source: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const courses = [
    'AI Automation',
    'Certification of Freelancing',
    'Diploma of Advance English',
    'Certificate of Computerized Accounting',
    'Diploma in Computerized Accounting',
    'Certification of Basic English Language',
    'Diploma in Mastering Shopify Training',
    'Daraz Seller Ecommerce Training',
    'Certification in Advance English',
    'Diploma in Computer Architecture Designing',
    'Diploma in Video Editing',
    'Diploma in Graphic Designing',
    'Advance SEO Training',
    'WordPress Development',
    'Web Technology',
    'Office Management (COM)',
    'Office Management (DOM)',
    'Web Designing',
    'Web Development',
    'C Programming',
    'Python Programming',
    'Advance UI/UX Training',
  ];

  const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir', 'Islamabad'];

  const cities = {
    Punjab: ['Bahawalpur', 'Lahore', 'Multan', 'Rawalpindi', 'Faisalabad', 'Gujranwala', 'Sialkot', 'Other'],
    Sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Other'],
    'Khyber Pakhtunkhwa': ['Peshawar', 'Abbottabad', 'Mardan', 'Swat', 'Other'],
    Balochistan: ['Quetta', 'Gwadar', 'Turbat', 'Other'],
    'Gilgit-Baltistan': ['Gilgit', 'Skardu', 'Hunza', 'Other'],
    'Azad Kashmir': ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Other'],
    Islamabad: ['Islamabad'],
  };

  const sources = [
    'Facebook',
    'Instagram',
    'YouTube',
    'WhatsApp',
    'Friend / Family',
    'Google Search',
    'Walk-in Visit',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value, ...(name === 'province' && { city: '' }) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({
      name: '',
      email: '',
      phone: '',
      course: '',
      province: '',
      city: '',
      area: '',
      source: '',
    });
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200';
  const labelClass = 'block text-sm font-bold text-[#0F1E4A] mb-2';

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Apply Now"
        breadcrumbs={[
          { label: 'Admissions', href: '/admissions/why-bise' },
          { label: 'Apply Online' }]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Get Guidance
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
              Career Guidance
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Not sure which program is right for you? Fill out this form and
              our team will guide you toward the best career path.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
              <div className="bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

                <div className="relative">
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg mb-5">
                    <FaGraduationCap />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    Why Career Guidance?
                  </h3>

                  <ul className="space-y-3">
                    {[
                      'Personalized program recommendations',
                      'Free career counseling session',
                      'Industry-expert advice',
                      'Guidance on freelancing & jobs',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <FaCheckCircle className="text-[#38BDF8] text-sm mt-1 shrink-0" />
                        <span className="text-gray-200 text-sm leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
                <h4 className="text-base font-bold text-[#0F1E4A] mb-3">
                  Need help?
                </h4>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Call us directly for immediate assistance.
                </p>
                <a
                  href="tel:03004506850"
                  className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
                >
                  0300-4506850
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full"></div>

              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] mb-2">
                  Career Guidance Form
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-8">
                  Fill in your details and we'll get back to you soon.
                </p>

                {submitted && (
                  <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
                    <FaCheckCircle className="text-green-600 shrink-0" />
                    Thank you! Your request has been submitted successfully.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="0300-0000000"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Select Course</label>
                      <select
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Select Course</option>
                        {courses.map((c, i) => (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Select Province</label>
                      <select
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Select Province</option>
                        {provinces.map((p, i) => (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Select City</label>
                      <select
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        disabled={!form.province}
                        className={`${inputClass} ${
                          !form.province ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="">Select City</option>
                        {form.province &&
                          cities[form.province]?.map((c, i) => (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Select Area</label>
                      <input
                        type="text"
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        required
                        placeholder="Your area / locality"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>How Do You Know About Us?</label>
                      <select
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">Select Source</option>
                        {sources.map((s, i) => (
                          <option key={i} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-7 py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2D2B6F] hover:text-white transition-all duration-300 hover:scale-[1.02]"
                  >
                    <FaPaperPlane className="text-sm" />
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerGuidance;