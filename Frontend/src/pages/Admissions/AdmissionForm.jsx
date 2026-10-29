import { useState, useEffect } from 'react';
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import SEO from '../../components/SEO';
import useAdmissionStore from '../../store/useAdmissionStore';
import useProgramsStore from '../../store/useProgramsStore'; // 👈 new import

const initialForm = {
  fullName: '',
  fatherName: '',
  cnic: '',
  dob: '',
  gender: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  city: '',
  province: '',
  lastQualification: '',
  lastInstitute: '',
  passingYear: '',
  marks: '',
  course: '',
  duration: '',
  source: '',
  notes: '',
};

const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Gilgit-Baltistan',
  'Azad Kashmir',
  'Islamabad',
];

const SOURCES = [
  'Facebook',
  'Instagram',
  'YouTube',
  'WhatsApp',
  'Friend / Family',
  'Google Search',
  'Walk-in Visit',
  'Other',
];

const AdmissionForm = () => {
  // admission store
  const {
    loading: settingsLoading,
    fetchAdmissionsData,
    submitAdmission,
    submitting,
    submitSuccess,
    submitError,
    resetSubmitStatus,
  } = useAdmissionStore();

  // programs store
  const {
    programs,
    loading: programsLoading,
    fetchPrograms,
  } = useProgramsStore();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAdmissionsData();
    if (programs.length === 0) {
      fetchPrograms();
    }
  }, [fetchAdmissionsData, fetchPrograms, programs.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (errors[name]) {
      setErrors((err) => ({ ...err, [name]: '' }));
    }
    if (submitSuccess || submitError) {
      resetSubmitStatus();
    }
  };

  const validate = () => {
    const e = {};

    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.fatherName.trim()) e.fatherName = 'Father name is required';
    if (!form.cnic.trim()) e.cnic = 'CNIC is required';
    if (!form.dob) e.dob = 'Date of birth is required';
    if (!form.gender) e.gender = 'Gender is required';

    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'Invalid email address';
    }

    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.province) e.province = 'Province is required';
    if (!form.lastQualification) e.lastQualification = 'Qualification is required';
    if (!form.course) e.course = 'Course selection is required';

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      fatherName: form.fatherName.trim(),
      cnic: form.cnic.trim(),
      dob: form.dob,
      gender: form.gender,
      email: form.email.trim(),
      phone: form.phone.trim(),
      whatsapp: form.whatsapp.trim() || null,
      address: form.address.trim(),
      city: form.city.trim(),
      province: form.province,
      lastQualification: form.lastQualification,
      lastInstitute: form.lastInstitute.trim() || null,
      passingYear: form.passingYear.trim() || null,
      marks: form.marks.trim() || null,
      course: form.course,
      duration: form.duration || null,
      source: form.source || null,
      notes: form.notes.trim() || null,
    };

    const result = await submitAdmission(payload);

    if (result.ok) {
      setForm(initialForm);
      setErrors({});
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else if (result.fieldErrors) {
      const mapped = {};
      Object.keys(result.fieldErrors).forEach((key) => {
        mapped[key] = result.fieldErrors[key][0];
      });
      setErrors(mapped);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200';
  const labelClass = 'block text-sm font-bold text-[#0F1E4A] mb-2';
  const errorClass = 'text-red-500 text-xs mt-1';

  if (settingsLoading) return <Loader />;

  return (
    <>
      <SEO
        title="Admission Form"
        description="Fill the online admission form at Brain Inspire System of Education, Bahawalpur."
        keywords="admission form, apply, BISE, Bahawalpur, enrollment"
      />

      <PageHeader
        title="Admission Form"
        breadcrumbs={[
          { label: 'Admissions', href: '/admissions/why-bise' },
          { label: 'Admission Form' },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1E4A] mb-3">
              Online Admission Form
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Fill in your details carefully. Fields marked with * are required.
            </p>
          </div>

          {submitSuccess && (
            <div className="mb-8 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
              <FaCheckCircle className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">Admission submitted successfully!</p>
                <p>Our team will contact you shortly. Thank you for choosing BISE.</p>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mb-8 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <FaExclamationTriangle className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">Submission failed</p>
                <p>{submitError}</p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-8"
          >
            {/* ===== PERSONAL ===== */}
            <div>
              <h3 className="text-lg font-bold text-[#0F1E4A] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#38BDF8] rounded-full"></span>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className={inputClass} />
                  {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Father's Name *</label>
                  <input type="text" name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Enter father's name" className={inputClass} />
                  {errors.fatherName && <p className={errorClass}>{errors.fatherName}</p>}
                </div>
                <div>
                  <label className={labelClass}>CNIC / B-Form *</label>
                  <input type="text" name="cnic" value={form.cnic} onChange={handleChange} placeholder="35202-XXXXXXX-X" className={inputClass} />
                  {errors.cnic && <p className={errorClass}>{errors.cnic}</p>}
                </div>
                <div>
                  <label className={labelClass}>Date of Birth *</label>
                  <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} />
                  {errors.dob && <p className={errorClass}>{errors.dob}</p>}
                </div>
                <div>
                  <label className={labelClass}>Gender *</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className={errorClass}>{errors.gender}</p>}
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="0300-0000000" className={inputClass} />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelClass}>WhatsApp (Optional)</label>
                  <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="0300-0000000" className={inputClass} />
                </div>
              </div>
            </div>

            {/* ===== ADDRESS ===== */}
            <div>
              <h3 className="text-lg font-bold text-[#0F1E4A] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#38BDF8] rounded-full"></span>
                Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Complete Address *</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="House / Street / Area" className={inputClass} />
                  {errors.address && <p className={errorClass}>{errors.address}</p>}
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Bahawalpur" className={inputClass} />
                  {errors.city && <p className={errorClass}>{errors.city}</p>}
                </div>
                <div>
                  <label className={labelClass}>Province *</label>
                  <select name="province" value={form.province} onChange={handleChange} className={inputClass}>
                    <option value="">Select Province</option>
                    {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.province && <p className={errorClass}>{errors.province}</p>}
                </div>
              </div>
            </div>

            {/* ===== ACADEMIC ===== */}
            <div>
              <h3 className="text-lg font-bold text-[#0F1E4A] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#38BDF8] rounded-full"></span>
                Academic Background
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Last Qualification *</label>
                  <select name="lastQualification" value={form.lastQualification} onChange={handleChange} className={inputClass}>
                    <option value="">Select Qualification</option>
                    <option value="Matric">Matric</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.lastQualification && <p className={errorClass}>{errors.lastQualification}</p>}
                </div>
                <div>
                  <label className={labelClass}>Last Institute</label>
                  <input type="text" name="lastInstitute" value={form.lastInstitute} onChange={handleChange} placeholder="School / College name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Passing Year</label>
                  <input type="text" name="passingYear" value={form.passingYear} onChange={handleChange} placeholder="2024" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Marks / Grade</label>
                  <input type="text" name="marks" value={form.marks} onChange={handleChange} placeholder="850/1100 or A+" className={inputClass} />
                </div>
              </div>
            </div>

            {/* ===== COURSE FROM API ===== */}
            <div>
              <h3 className="text-lg font-bold text-[#0F1E4A] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#38BDF8] rounded-full"></span>
                Course Selection
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Select Course *</label>
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    disabled={programsLoading || programs.length === 0}
                    className={inputClass}
                  >
                    <option value="">
                      {programsLoading
                        ? 'Loading courses...'
                        : programs.length === 0
                        ? 'No courses available'
                        : 'Select Course'}
                    </option>

                    {programs.map((p) => {
                      const value = p.title || p.name || p.program_name || p.slug;
                      const label = p.title || p.name || p.program_name || p.slug;
                      return (
                        <option key={p.id || value} value={value}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                  {errors.course && <p className={errorClass}>{errors.course}</p>}
                </div>

                <div>
                  <label className={labelClass}>Preferred Duration</label>
                  <select name="duration" value={form.duration} onChange={handleChange} className={inputClass}>
                    <option value="">Select Duration</option>
                    <option value="3 Months">3 Months</option>
                    <option value="4 Months">4 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>How Did You Know About Us?</label>
                  <select name="source" value={form.source} onChange={handleChange} className={inputClass}>
                    <option value="">Select Source</option>
                    {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* ===== NOTES ===== */}
            <div>
              <label className={labelClass}>Additional Notes (Optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} placeholder="Any additional information..." className={`${inputClass} resize-none`}></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-7 py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2D2B6F] hover:text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-sm" />
                  Submit Admission Form
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AdmissionForm;