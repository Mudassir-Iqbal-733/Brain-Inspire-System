import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import useLoader from '../../hooks/useLoader';
import SEO from '../../components/SEO';

const AdmissionForm = () => {
  const loading = useLoader();

  const [form, setForm] = useState({
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
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const courses = [
    'Certification in AI Automation',
    'Diploma in Web Development',
    'Certification in Web Designing',
    'Diploma in Graphic Designing',
    'Certification in Graphic Designing',
    'Diploma in Video Editing',
    'Diploma in Computerized Accounting',
    'Certification in Computerized Accounting',
    'Certification in Freelancing',
    'Diploma in Advance SEO',
    'Certification in WordPress',
    'Diploma in Web Technology',
    'Certification in C Programming',
    'Certification in Python Programming',
    'Diploma in Office Management',
    'Certification in Office Management',
    'Diploma in English Language',
    'Certification in Basic English',
    'Diploma in Advance UI/UX',
    'Diploma in Computer Architecture',
    'Daraz Seller E-Commerce Training',
    'Diploma in Mastering Shopify',
    'Diploma in Social Media Marketing',
  ];

  const provinces = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Azad Kashmir',
    'Islamabad',
  ];

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
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!form.cnic.trim()) newErrors.cnic = 'CNIC is required';
    if (!form.dob) newErrors.dob = 'Date of birth is required';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.province) newErrors.province = 'Province is required';
    if (!form.lastQualification) newErrors.lastQualification = 'Qualification is required';
    if (!form.course) newErrors.course = 'Course selection is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const clientEmail = 'bisebahawalpur786@gmail.com';
    const subject = `New Admission Request - ${form.fullName}`;

    const body = [
      'New Admission Request - Brain Inspire System of Education',
      '',
      'PERSONAL INFORMATION',
      `Name: ${form.fullName}`,
      `Father's Name: ${form.fatherName}`,
      `CNIC: ${form.cnic}`,
      `Date of Birth: ${form.dob}`,
      `Gender: ${form.gender}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `WhatsApp: ${form.whatsapp || 'N/A'}`,
      '',
      'ADDRESS',
      `Address: ${form.address}`,
      `City: ${form.city}`,
      `Province: ${form.province}`,
      '',
      'ACADEMIC BACKGROUND',
      `Last Qualification: ${form.lastQualification}`,
      `Last Institute: ${form.lastInstitute || 'N/A'}`,
      `Passing Year: ${form.passingYear || 'N/A'}`,
      `Marks / Grade: ${form.marks || 'N/A'}`,
      '',
      'COURSE SELECTION',
      `Course: ${form.course}`,
      `Duration: ${form.duration || 'N/A'}`,
      `Source: ${form.source || 'N/A'}`,
      '',
      'ADDITIONAL NOTES',
      form.notes || 'N/A',
      '',
      `Submitted on: ${new Date().toLocaleString('en-PK')}`,
    ].join('\n');

    const mailtoLink = `mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);

    setForm({
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
    });
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#0F1E4A] placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/20 transition-all duration-200';
  const labelClass = 'block text-sm font-bold text-[#0F1E4A] mb-2';
  const errorClass = 'text-red-500 text-xs mt-1';

  if (loading) return <Loader />;

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

          {submitted && (
            <div className="mb-8 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
              <FaCheckCircle className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">Thank you! Your admission form is ready to send.</p>
                <p>Your email app has opened with your details. Please click <strong>Send</strong> so your information reaches us.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm space-y-8">

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
                    {provinces.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {errors.province && <p className={errorClass}>{errors.province}</p>}
                </div>
              </div>
            </div>

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

            <div>
              <h3 className="text-lg font-bold text-[#0F1E4A] mb-5 flex items-center gap-3">
                <span className="w-1 h-6 bg-[#38BDF8] rounded-full"></span>
                Course Selection
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Select Course *</label>
                  <select name="course" value={form.course} onChange={handleChange} className={inputClass}>
                    <option value="">Select Course</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
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
                    {sources.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>Additional Notes (Optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} placeholder="Any additional information..." className={`${inputClass} resize-none`}></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-7 py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2D2B6F] hover:text-white transition-all duration-300 hover:scale-[1.02]"
            >
              <FaPaperPlane className="text-sm" />
              Submit Admission Form
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AdmissionForm;