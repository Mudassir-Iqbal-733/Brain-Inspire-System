import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../lib/axios';
import { 
  FaPlus, FaTimes, FaGraduationCap, FaBook, FaRocket, 
  FaFileAlt, FaVideo, FaCheckCircle, FaInfoCircle, FaChevronDown,
  FaCog, FaListUl, FaClipboardList, FaFileSignature
} from 'react-icons/fa';

const iconMap = {
  FaGraduationCap, FaBook, FaRocket, FaFileAlt, FaVideo, FaCheckCircle, FaInfoCircle
};

const iconOptions = [
  { value: 'FaGraduationCap', label: 'Graduation Cap' },
  { value: 'FaBook', label: 'Book' },
  { value: 'FaRocket', label: 'Rocket' },
  { value: 'FaFileAlt', label: 'Document' },
  { value: 'FaVideo', label: 'Video' },
  { value: 'FaCheckCircle', label: 'Check' },
  { value: 'FaInfoCircle', label: 'Info' },
];

const IconSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const SelectedIcon = iconMap[value] || FaCheckCircle;

  return (
    <div className="relative w-full md:w-48 shrink-0">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-3 py-2 border rounded-lg bg-white text-sm">
        <div className="flex items-center gap-2">
          <SelectedIcon className="text-[#0F1E4A]" />
          <span className="truncate">{iconOptions.find(o => o.value === value)?.label || 'Icon'}</span>
        </div>
        <FaChevronDown />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {iconOptions.map((opt) => {
            const Icon = iconMap[opt.value];
            return (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setIsOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 text-sm">
                <Icon /> {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('why');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    why_title: '', why_desc: '', rules_notice: '',
    seo_title: '', seo_description: '', seo_keywords: ''
  });
  
  const [whyCards, setWhyCards] = useState([]);
  const [rulesCategories, setRulesCategories] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [requiredDocs, setRequiredDocs] = useState([]);

  const ensureArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try { const p = JSON.parse(val); return Array.isArray(p) ? p : []; } 
    catch (e) { return []; }
  };

  const loadData = (data) => {
    if (!data) return;
    setFormData({
      why_title: data.why_title || '',
      why_desc: data.why_desc || '',
      rules_notice: data.rules_notice || '',
      seo_title: data.seo_title || '',
      seo_description: data.seo_description || '',
      seo_keywords: data.seo_keywords || '',
    });
    setWhyCards(ensureArray(data.why_cards));
    setRulesCategories(ensureArray(data.rules_categories));
    setProcessSteps(ensureArray(data.process_steps));
    setRequiredDocs(ensureArray(data.required_docs));
  };

  useEffect(() => {
    api.get('/admission-settings').then(res => {
      loadData(res.data.data);
    }).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading('Saving...');
    
    try {
      const payload = {
        why_title: formData.why_title || '',
        why_desc: formData.why_desc || '',
        rules_notice: formData.rules_notice || '',
        seo_title: formData.seo_title || '',
        seo_description: formData.seo_description || '',
        seo_keywords: formData.seo_keywords || '',
        why_cards: whyCards || [],
        rules_categories: rulesCategories || [],
        process_steps: processSteps || [],
        required_docs: requiredDocs || []
      };

      const res = await api.post('/admin/admission-settings', payload);

      if (res.data && res.data.data) {
        loadData(res.data.data);
      }

      toast.update(toastId, { render: 'Saved successfully!', type: 'success', isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error("Backend Error Details:", error.response?.data);
      
      let errorMsg = 'Failed to save';
      if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    } finally {
      setSaving(false);
    }
  };

  const addItem = (setter, arr, defaultItem) => setter([...arr, defaultItem]);
  const removeItem = (setter, arr, index) => { const newArr = [...arr]; newArr.splice(index, 1); setter(newArr); };
  const updateItem = (setter, arr, index, field, value) => {
    const newArr = [...arr];
    if(field) newArr[index][field] = value; else newArr[index] = value;
    setter(newArr);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  
  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] outline-none text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  const tabs = [
    { id: 'why', name: 'Why Choose', icon: FaInfoCircle },
    { id: 'rules', name: 'Rules & Regs', icon: FaListUl },
    { id: 'steps', name: 'Procedure', icon: FaClipboardList },
    { id: 'docs', name: 'Documents', icon: FaFileSignature },
    { id: 'seo', name: 'SEO', icon: FaCog },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F1E4A]">Admissions Page Settings</h2>
          <p className="text-sm text-gray-500">Manage all content for the admissions page.</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={saving} 
          className="bg-[#0F1E4A] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md disabled:opacity-50 w-full sm:w-auto"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-[#0F1E4A] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon /> {tab.name}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* WHY CHOOSE TAB */}
        {activeTab === 'why' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="font-bold text-lg mb-4 text-[#0F1E4A]">Why Choose BISE</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input type="text" name="why_title" value={formData.why_title} onChange={handleChange} className={inputClass} placeholder="Title" />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="why_desc" value={formData.why_desc} onChange={handleChange} className={inputClass} placeholder="Description" rows="3" />
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm text-[#0F1E4A]">Cards</h4>
                <button type="button" onClick={() => addItem(setWhyCards, whyCards, { icon: 'FaBook', title: '', desc: '' })} className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1"><FaPlus /> Add Card</button>
              </div>
              <div className="space-y-3">
                {whyCards.map((card, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-2 bg-gray-50 p-3 rounded-lg border">
                    <IconSelector value={card.icon} onChange={(val) => updateItem(setWhyCards, whyCards, i, 'icon', val)} />
                    <input type="text" value={card.title} onChange={(e) => updateItem(setWhyCards, whyCards, i, 'title', e.target.value)} className={inputClass} placeholder="Card Title" />
                    <input type="text" value={card.desc} onChange={(e) => updateItem(setWhyCards, whyCards, i, 'desc', e.target.value)} className={inputClass} placeholder="Card Desc" />
                    <button type="button" onClick={() => removeItem(setWhyCards, whyCards, i)} className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg shrink-0 hover:bg-red-500 hover:text-white transition"><FaTimes /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RULES TAB */}
        {activeTab === 'rules' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="font-bold text-lg mb-4 text-[#0F1E4A]">Rules & Regulations</h3>
            <div>
              <label className={labelClass}>Important Notice</label>
              <textarea name="rules_notice" value={formData.rules_notice} onChange={handleChange} className={inputClass} placeholder="Important Notice Text" rows="2" />
            </div>
            
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm text-[#0F1E4A]">Categories & Points</h4>
                <button type="button" onClick={() => addItem(setRulesCategories, rulesCategories, { title: '', points: [] })} className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1"><FaPlus /> Add Category</button>
              </div>
              <div className="space-y-4">
                {rulesCategories.map((cat, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex gap-2 mb-3">
                      <input type="text" value={cat.title} onChange={(e) => updateItem(setRulesCategories, rulesCategories, i, 'title', e.target.value)} className={inputClass} placeholder="Category Title (e.g. Admission Rules)" />
                      <button type="button" onClick={() => removeItem(setRulesCategories, rulesCategories, i)} className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg shrink-0 hover:bg-red-500 hover:text-white transition"><FaTimes /></button>
                    </div>
                    <button type="button" onClick={() => { const newArr = [...rulesCategories]; newArr[i].points.push(''); setRulesCategories(newArr); }} className="text-xs text-[#0F1E4A] font-bold mb-3 flex items-center gap-1"><FaPlus /> Add Point</button>
                    <div className="space-y-2 pl-4 border-l-2 border-[#0F1E4A]/20">
                      {cat.points.map((point, pIndex) => (
                        <div key={pIndex} className="flex gap-2">
                          <input type="text" value={point} onChange={(e) => { const newArr = [...rulesCategories]; newArr[i].points[pIndex] = e.target.value; setRulesCategories(newArr); }} className={inputClass} placeholder="Rule point..." />
                          <button type="button" onClick={() => { const newArr = [...rulesCategories]; newArr[i].points.splice(pIndex, 1); setRulesCategories(newArr); }} className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg shrink-0 hover:bg-red-500 hover:text-white transition"><FaTimes /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEPS TAB */}
        {activeTab === 'steps' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-[#0F1E4A]">Admission Procedure Steps</h3>
              <button type="button" onClick={() => addItem(setProcessSteps, processSteps, { icon: 'FaFileAlt', title: '', desc: '' })} className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1"><FaPlus /> Add Step</button>
            </div>
            <div className="space-y-3">
              {processSteps.map((step, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-2 bg-gray-50 p-3 rounded-lg border">
                  <IconSelector value={step.icon} onChange={(val) => updateItem(setProcessSteps, processSteps, i, 'icon', val)} />
                  <input type="text" value={step.title} onChange={(e) => updateItem(setProcessSteps, processSteps, i, 'title', e.target.value)} className={inputClass} placeholder="Step Title" />
                  <input type="text" value={step.desc} onChange={(e) => updateItem(setProcessSteps, processSteps, i, 'desc', e.target.value)} className={inputClass} placeholder="Step Desc" />
                  <button type="button" onClick={() => removeItem(setProcessSteps, processSteps, i)} className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg shrink-0 hover:bg-red-500 hover:text-white transition"><FaTimes /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCS TAB */}
        {activeTab === 'docs' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-[#0F1E4A]">Required Documents</h3>
              <button type="button" onClick={() => addItem(setRequiredDocs, requiredDocs, '')} className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1"><FaPlus /> Add Doc</button>
            </div>
            <div className="space-y-2">
              {requiredDocs.map((doc, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={doc} onChange={(e) => updateItem(setRequiredDocs, requiredDocs, i, null, e.target.value)} className={inputClass} placeholder="Document Name" />
                  <button type="button" onClick={() => removeItem(setRequiredDocs, requiredDocs, i)} className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg shrink-0 hover:bg-red-500 hover:text-white transition"><FaTimes /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === 'seo' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h3 className="font-bold text-lg mb-4 text-[#0F1E4A]">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>SEO Title</label>
                <input type="text" name="seo_title" value={formData.seo_title} onChange={handleChange} className={inputClass} placeholder="e.g. Admissions | Brain Inspire" />
              </div>
              
              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea name="seo_description" value={formData.seo_description} onChange={handleChange} rows="3" className={inputClass} placeholder="Short description for search engines..." />
              </div>
              
              <div>
                <label className={labelClass}>SEO Keywords</label>
                <input type="text" name="seo_keywords" value={formData.seo_keywords} onChange={handleChange} className={inputClass} placeholder="e.g. admission, apply online, courses" />
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};

export default Admissions;