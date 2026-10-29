import { useState, useEffect } from 'react';
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram,
  FaWhatsapp, FaYoutube, FaTwitter, FaLinkedinIn, FaTiktok, FaPaperPlane,
} from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import Loader from '../components/Loader';
import SEO from '../components/SEO';
import useContactStore from '../store/useContactStore';

const socialIconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
};

const Contact = () => {
  const {
    contactData,
    socialData,
    loading,
    fetchContactData,
    submitFeedback,
    submitting,
    submitSuccess,
    submitError,
    resetFeedbackStatus,
  } = useContactStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
  });

  useEffect(() => {
    fetchContactData();
  }, [fetchContactData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitSuccess || submitError) resetFeedbackStatus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitFeedback(form);

    if (result.ok) {
      setForm({ name: '', email: '', phone: '', issue: '' });
    }
  };

  if (loading || !contactData) return <Loader />;

  return (
    <>
      <SEO
        title="Contact Us"
        description="Brain Inspire System of Education — Professional courses in Bahawalpur"
        keywords="courses, Bahawalpur, IT training"
      />
      <PageHeader
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Get in Touch
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-3">
              Brain Inspire System of Education (Pvt) Ltd
            </h1>

            <p className="text-[#2563EB] text-sm md:text-base font-semibold italic mb-5">
              Reality Is Our Success
            </p>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              We'd love to hear from you. Reach out for admissions, program
              details, or any queries — our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <div className="space-y-6">
              <div className="bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                    Contact Information
                  </h3>

                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-lg shadow-lg">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#38BDF8] mb-1">
                          Address
                        </p>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {contactData.address}
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-lg shadow-lg">
                        <FaPhoneAlt />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#38BDF8] mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${contactData.phone}`}
                          className="block text-gray-200 text-sm hover:text-[#38BDF8] transition-colors duration-200"
                        >
                          {contactData.phone}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-lg shadow-lg">
                        <FaEnvelope />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#38BDF8] mb-1">
                          Email
                        </p>
                        <a
                          href={`mailto:${contactData.email}`}
                          className="block text-gray-200 text-sm hover:text-[#38BDF8] transition-colors duration-200 break-all"
                        >
                          {contactData.email}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {socialData?.links && socialData.links.length > 0 && (
                <div className="bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

                  <div className="relative">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-5">
                      Follow Us
                    </h3>

                    <div className="flex items-center gap-3 flex-wrap">
                      {socialData.links.map((link, index) => {
                        const Icon = socialIconMap[link.platform] || FaFacebookF;
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={link.platform}
                            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#38BDF8] hover:text-[#0F1E4A] transition-all duration-300 hover:scale-110"
                          >
                            <Icon />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {contactData.map_url && (
                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-72 sm:h-80">
                  <iframe
                    title="Location Map"
                    src={contactData.map_url}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden h-fit lg:sticky lg:top-24">
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full"></div>

              <div className="relative">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] mb-2">
                  Feedback Form
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-8">
                  Use this form to give your feedback or report any problem.
                </p>

                {submitSuccess && (
                  <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Thank you! Your feedback has been submitted.
                  </div>
                )}

                {submitError && (
                  <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#0F1E4A] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F1E4A] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F1E4A] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="0300-0000000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0F1E4A] mb-2">
                      Issue
                    </label>
                    <textarea
                      name="issue"
                      value={form.issue}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Write your feedback or issue..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-7 py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2D2B6F] hover:text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#0F1E4A] border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        Send Your Feedback
                      </>
                    )}
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

export default Contact;