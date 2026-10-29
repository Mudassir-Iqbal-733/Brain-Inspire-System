import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../lib/axios';
import { FaPlus, FaTrash, FaEdit, FaImage, FaTimes, FaSearch, FaCog, FaGraduationCap } from 'react-icons/fa';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [keyword, setKeyword] = useState('');
  const [courseType, setCourseType] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false); // Naya State
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '', code: '', duration: '',
    registration_fee: 0, misc_fee: 0, course_fee: 0, certificate_fee: 0
  });
  
  const [seoData, setSeoData] = useState({
    seo_title: '', seo_description: '', seo_keywords: '',
    global_what_will_learn: []
  });

  const [courseContent, setCourseContent] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/programs?keyword=${keyword}&type=${courseType}`);
      setPrograms(res.data.data);
    } catch (error) {
      toast.error('Failed to load programs');
    } finally {
      setLoading(false);
    }
  };

  const fetchSeoSettings = async () => {
    try {
      const res = await api.get('/programs/page-seo');
      if (res.data.data) {
        setSeoData({
          seo_title: res.data.data.seo_title || '',
          seo_description: res.data.data.seo_description || '',
          seo_keywords: res.data.data.seo_keywords || '',
          global_what_will_learn: res.data.data.global_what_will_learn || [],
        });
      }
    } catch (error) {
      console.error("Failed to load SEO");
    }
  };

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPrograms();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, courseType]);

  const totalFee = Number(formData.registration_fee) + Number(formData.misc_fee) + Number(formData.course_fee) + Number(formData.certificate_fee);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value) => {
    const arr = [...courseContent];
    arr[index][field] = value;
    setCourseContent(arr);
  };

  const addArrayItem = () => {
    setCourseContent([...courseContent, { title: '', desc: '' }]);
  };

  const removeArrayItem = (index) => {
    const arr = [...courseContent];
    arr.splice(index, 1);
    setCourseContent(arr);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', code: '', duration: '', registration_fee: 0, misc_fee: 0, course_fee: 0, certificate_fee: 0 });
    setCourseContent([]);
    setImageFile(null);
    setPreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (program) => {
    setEditingId(program.id);
    setFormData({
      title: program.title, code: program.code, duration: program.duration,
      registration_fee: program.registration_fee, misc_fee: program.misc_fee,
      course_fee: program.course_fee, certificate_fee: program.certificate_fee
    });
    setCourseContent(program.course_content || []);
    setImageFile(null);
    setPreview(program.image);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(false); 
    setSaving(true);
    const toastId = toast.loading('Saving program...');
    
    try {
      let tempImageId = null;
      if (imageFile) {
        const imgData = new FormData();
        imgData.append('image', imageFile);
        const tempRes = await api.post('/image/add', imgData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        tempImageId = tempRes.data?.image?.id || tempRes.data?.data?.id;
      }

      const data = {
        ...formData,
        course_content: courseContent.filter(c => c.title || c.desc),
        total_fee: totalFee,
        image_id: tempImageId
      };

      if (editingId) {
        await api.post(`/admin/programs/${editingId}`, data);
      } else {
        await api.post('/admin/programs', data);
      }

      toast.update(toastId, { render: 'Program saved successfully!', type: 'success', isLoading: false, autoClose: 3000 });
      fetchPrograms();
    } catch (error) {
      let errorMessage = 'Failed to save program';
      if (error.response?.data?.errors) {
        errorMessage = Object.values(error.response.data.errors).flat().join(', ');
      }
      toast.update(toastId, { render: errorMessage, type: 'error', isLoading: false, autoClose: 5000 });
    } finally {
      setSaving(false);
    }
  };

  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Saving SEO...');
    try {
      const payload = {
        seo_title: seoData.seo_title,
        seo_description: seoData.seo_description,
        seo_keywords: seoData.seo_keywords,
        global_what_will_learn: seoData.global_what_will_learn
      };
      await api.post('/admin/programs/page-seo', payload);
      toast.update(toastId, { render: 'SEO Saved!', type: 'success', isLoading: false, autoClose: 3000 });
      setIsSeoModalOpen(false);
      fetchSeoSettings();
    } catch (error) {
      let errorMsg = 'Failed to save SEO';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      }
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  const handleGlobalSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Saving Global Settings...');
    try {
      const payload = {
        seo_title: seoData.seo_title,
        seo_description: seoData.seo_description,
        seo_keywords: seoData.seo_keywords,
        global_what_will_learn: seoData.global_what_will_learn
      };
      await api.post('/admin/programs/page-seo', payload);
      toast.update(toastId, { render: 'Global Settings Saved!', type: 'success', isLoading: false, autoClose: 3000 });
      setIsGlobalModalOpen(false);
      fetchSeoSettings();
    } catch (error) {
      let errorMsg = 'Failed to save';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      }
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/admin/programs/${id}`);
          toast.success('Program deleted');
          fetchPrograms();
        } catch (error) {
          toast.error('Failed to delete');
        }
      }
    });
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none text-sm transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-7xl mx-auto pb-10">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F1E4A]">Programs Management</h2>
          <p className="text-sm text-gray-500">Manage all your courses and programs.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
          <div className="relative w-full sm:w-60">
            <input 
              type="text" 
              placeholder="Search..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F1E4A] outline-none text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <select
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            className="w-full sm:w-40 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0F1E4A] outline-none text-sm bg-white"
          >
            <option value="">All Types</option>
            <option value="certification">Certification</option>
            <option value="diploma">Diploma</option>
          </select>

          <button 
            onClick={() => setIsGlobalModalOpen(true)} 
            className="bg-white text-[#0F1E4A] border border-gray-300 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition w-full sm:w-auto justify-center font-medium whitespace-nowrap"
            title="Global What Will You Learn"
          >
            <FaGraduationCap /> Global Learn
          </button>
          
          <button 
            onClick={() => setIsSeoModalOpen(true)} 
            className="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition w-full sm:w-auto justify-center font-medium whitespace-nowrap"
          >
            <FaCog /> SEO
          </button>

          <button 
            onClick={openAddModal} 
            className="bg-[#0F1E4A] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#2563EB] transition shadow-md w-full sm:w-auto justify-center font-medium whitespace-nowrap"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Title & Code</th>
                <th className="p-4 font-semibold">Duration</th>
                <th className="p-4 font-semibold">Total Fee</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1E4A] mx-auto"></div>
                  </td>
                </tr>
              ) : programs.length > 0 ? (
                programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      {program.image ? (
                        <img src={program.image} alt={program.title} className="w-16 h-12 object-cover rounded-lg border border-gray-200" />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          <FaImage />
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[#0F1E4A]">{program.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{program.code}</p>
                    </td>
                    <td className="p-4 text-gray-600">{program.duration}</td>
                    <td className="p-4 font-bold text-[#2563EB]">Rs {program.total_fee}</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openEditModal(program)} className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(program.id)} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No programs found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#0F1E4A]">
                {editingId ? 'Edit Program' : 'Add New Program'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Program Title *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className={inputClass} placeholder="e.g. Web Development" />
                </div>
                <div>
                  <label className={labelClass}>Program Code *</label>
                  <input type="text" name="code" value={formData.code} onChange={handleChange} required className={inputClass} placeholder="e.g. CERT-01" />
                </div>
                <div>
                  <label className={labelClass}>Duration *</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className={inputClass} placeholder="e.g. 3 Months" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className={labelClass}>Program Image</label>
                  <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 relative overflow-hidden group">
                    {preview ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <FaImage className="text-2xl mb-1" />
                        <span className="text-xs">Upload Image</span>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition text-sm font-medium">
                      {preview ? 'Change Image' : 'Choose Image'}
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="block text-sm font-bold text-[#0F1E4A]">Fee Structure</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Registration Fee</label>
                      <input type="number" name="registration_fee" value={formData.registration_fee} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Misc. Fee</label>
                      <input type="number" name="misc_fee" value={formData.misc_fee} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Course Fee</label>
                      <input type="number" name="course_fee" value={formData.course_fee} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Certificate Fee</label>
                      <input type="number" name="certificate_fee" value={formData.certificate_fee} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-sm font-medium text-[#0F1E4A]">Total Fee (Auto):</span>
                    <span className="text-lg font-bold text-[#2563EB]">Rs {totalFee}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-sm text-[#0F1E4A]">Course Content</h4>
                  <button type="button" onClick={addArrayItem} className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg hover:bg-[#2563EB] flex items-center gap-1">
                    <FaPlus /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {courseContent.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" placeholder="Title" value={item.title} onChange={(e) => handleArrayChange(i, 'title', e.target.value)} className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0F1E4A]" />
                      <input type="text" placeholder="Description" value={item.desc} onChange={(e) => handleArrayChange(i, 'desc', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0F1E4A]" />
                      <button type="button" onClick={() => removeArrayItem(i)} className="w-9 h-9 flex items-center justify-center bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white shrink-0">
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  {courseContent.length === 0 && <p className="text-xs text-gray-400">No content added.</p>}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="bg-[#0F1E4A] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#2563EB] transition shadow-md disabled:opacity-50 flex items-center gap-2">
                  {saving ? 'Saving...' : (editingId ? 'Update Program' : 'Save Program')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* SEO Modal */}
      {isSeoModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#0F1E4A]">Programs Page SEO</h3>
              <button onClick={() => setIsSeoModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSeoSubmit} className="p-6 space-y-4">
              <div>
                <label className={labelClass}>SEO Title</label>
                <input 
                  type="text" 
                  name="seo_title" 
                  value={seoData.seo_title} 
                  onChange={(e) => setSeoData({...seoData, seo_title: e.target.value})} 
                  className={inputClass} 
                  placeholder="e.g. Programs | BISE" 
                />
              </div>
              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea 
                  name="seo_description" 
                  value={seoData.seo_description} 
                  onChange={(e) => setSeoData({...seoData, seo_description: e.target.value})} 
                  rows="3" 
                  className={inputClass} 
                  placeholder="Short description for search engines..." 
                />
              </div>
              <div>
                <label className={labelClass}>SEO Keywords</label>
                <input 
                  type="text" 
                  name="seo_keywords" 
                  value={seoData.seo_keywords} 
                  onChange={(e) => setSeoData({...seoData, seo_keywords: e.target.value})} 
                  className={inputClass} 
                  placeholder="e.g. courses, programs, certifications" 
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="submit" className="bg-[#0F1E4A] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#2563EB] transition">
                  Save SEO Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GLOBAL WHAT WILL YOU LEARN Modal */}
      {isGlobalModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#0F1E4A]">Global "What Will You Learn"</h3>
              <button onClick={() => setIsGlobalModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleGlobalSubmit} className="p-6 space-y-4">
              <p className="text-sm text-gray-500 mb-4">
                These points will be displayed on every program's detail page automatically.
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-sm text-[#0F1E4A]">Points</label>
                  <button 
                    type="button" 
                    onClick={() => {
                      const newArr = [...seoData.global_what_will_learn, { title: '', desc: '' }];
                      setSeoData({...seoData, global_what_will_learn: newArr});
                    }} 
                    className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <FaPlus /> Add
                  </button>
                </div>
                {seoData.global_what_will_learn.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Title" 
                      value={item.title} 
                      onChange={(e) => {
                        const newArr = [...seoData.global_what_will_learn];
                        newArr[i].title = e.target.value;
                        setSeoData({...seoData, global_what_will_learn: newArr});
                      }} 
                      className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0F1E4A]" 
                    />
                    <input 
                      type="text" 
                      placeholder="Description" 
                      value={item.desc} 
                      onChange={(e) => {
                        const newArr = [...seoData.global_what_will_learn];
                        newArr[i].desc = e.target.value;
                        setSeoData({...seoData, global_what_will_learn: newArr});
                      }} 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0F1E4A]" 
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        const newArr = [...seoData.global_what_will_learn];
                        newArr.splice(i, 1);
                        setSeoData({...seoData, global_what_will_learn: newArr});
                      }} 
                      className="w-9 h-9 flex items-center justify-center bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white shrink-0"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                {seoData.global_what_will_learn.length === 0 && <p className="text-xs text-gray-400">No points added.</p>}
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="submit" className="bg-[#0F1E4A] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#2563EB] transition">
                  Save Global Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Programs;