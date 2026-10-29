import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import api from '../lib/axios';
import {
  FaPlus, FaTimes, FaStar, FaHeart, FaShieldAlt, FaUsers,
  FaCheckCircle, FaLightbulb, FaHandshake, FaAward, FaChevronDown,
  FaBook, FaGraduationCap, FaRocket, FaBullseye, FaMedal, FaGlobe,
  FaChartLine, FaClock, FaThumbsUp, FaSmile, FaFire, FaLeaf,
  FaGem, FaCrown, FaPuzzlePiece, FaRegCompass, FaDesktop,
  FaMicroscope, FaSeedling, FaBalanceScale, FaUserTie, FaRegClock,
  FaCog, FaQuoteLeft, FaEye, FaListUl,
  // Naye icons screenshot ke liye
  FaBrain, FaCertificate, FaUsersCog, FaUserShield, FaBalanceScaleLeft
} from 'react-icons/fa';

const iconMap = {
  FaStar, FaHeart, FaShieldAlt, FaUsers,
  FaCheckCircle, FaLightbulb, FaHandshake, FaAward,
  FaBook, FaGraduationCap, FaRocket, FaBullseye, FaMedal, FaGlobe,
  FaChartLine, FaClock, FaThumbsUp, FaSmile, FaFire, FaLeaf,
  FaGem, FaCrown, FaPuzzlePiece, FaRegCompass, FaDesktop,
  FaMicroscope, FaSeedling, FaBalanceScale, FaUserTie, FaRegClock,
  // Naye icons add kiye gaye
  FaBrain, FaCertificate, FaUsersCog, FaUserShield, FaBalanceScaleLeft
};

const iconOptions = [
  { value: 'FaStar', label: 'Star' },
  { value: 'FaHeart', label: 'Heart' },
  { value: 'FaShieldAlt', label: 'Shield' },
  { value: 'FaUsers', label: 'Users' },
  { value: 'FaCheckCircle', label: 'Check Circle (Authenticity)' },
  { value: 'FaLightbulb', label: 'Bulb (Innovation)' },
  { value: 'FaHandshake', label: 'Handshake' },
  { value: 'FaAward', label: 'Award' },
  { value: 'FaBook', label: 'Book' },
  { value: 'FaGraduationCap', label: 'Graduation Cap' },
  { value: 'FaRocket', label: 'Rocket' },
  { value: 'FaBullseye', label: 'Target' },
  { value: 'FaMedal', label: 'Medal (Distinction)' },
  { value: 'FaGlobe', label: 'Globe' },
  { value: 'FaChartLine', label: 'Chart / Growth' },
  { value: 'FaClock', label: 'Clock' },
  { value: 'FaThumbsUp', label: 'Thumbs Up' },
  { value: 'FaSmile', label: 'Smile' },
  { value: 'FaFire', label: 'Fire' },
  { value: 'FaLeaf', label: 'Leaf' },
  { value: 'FaGem', label: 'Gem' },
  { value: 'FaCrown', label: 'Crown' },
  { value: 'FaPuzzlePiece', label: 'Puzzle' },
  { value: 'FaRegCompass', label: 'Compass' },
  { value: 'FaDesktop', label: 'Computer' },
  { value: 'FaMicroscope', label: 'Microscope' },
  { value: 'FaSeedling', label: 'Seedling' },
  { value: 'FaBalanceScale', label: 'Balance Scale' },
  { value: 'FaUserTie', label: 'Professional' },
  { value: 'FaRegClock', label: 'Time' },
  
  // Screenshot wale naye icons
  { value: 'FaBalanceScaleLeft', label: 'Scale (Integrity)' },
  { value: 'FaUsersCog', label: 'Team Cog (Collaboration)' },
  { value: 'FaBrain', label: 'Brain (Consciousness)' },
  { value: 'FaUserShield', label: 'Shield User (Nurture)' },
  { value: 'FaCertificate', label: 'Certificate (Excellence)' },
];

const DROPDOWN_HEIGHT = 260;
const GAP = 4;

const IconSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  const SelectedIcon = iconMap[value] || FaStar;

  const calculatePosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + GAP,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    calculatePosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0F1E4A] outline-none transition-all"
      >
        <div className="flex items-center gap-2">
          <SelectedIcon className="text-[#0F1E4A]" />
          <span className="text-sm">
            {iconOptions.find((o) => o.value === value)?.label || 'Select Icon'}
          </span>
        </div>
        <FaChevronDown
          className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen &&
        position &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              maxHeight: `${DROPDOWN_HEIGHT}px`,
              zIndex: 9999,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {iconOptions.map((opt) => {
              const Icon = iconMap[opt.value] || FaStar;
              const isSelected = value === opt.value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition ${
                    isSelected ? 'bg-blue-50 text-[#0F1E4A]' : 'text-gray-700'
                  }`}
                >
                  <Icon
                    className={
                      isSelected ? 'text-[#0F1E4A]' : 'text-gray-500'
                    }
                  />
                  <span className="text-sm">{opt.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
};

const AboutSettings = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [aboutId, setAboutId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    introduction_para: '',
    mission_para: '',
    vision_para: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
  });

  const [coreValues, setCoreValues] = useState([]);
  const [futurePlans, setFuturePlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/about-settings');
        if (res.data.data) {
          const data = res.data.data;
          setAboutId(data.id);
          setFormData({
            introduction_para: data.introduction_para || '',
            mission_para: data.mission_para || '',
            vision_para: data.vision_para || '',
            seo_title: data.seo_title || '',
            seo_description: data.seo_description || '',
            seo_keywords: data.seo_keywords || '',
          });

          const fetchedCore = data.core_values || [];
          const formattedCore = fetchedCore.map((item) => {
            if (typeof item === 'string')
              return { title: item, desc: '', icon: 'FaStar' };
            return { ...item, icon: item.icon || 'FaStar' };
          });

          setCoreValues(formattedCore);
          setFuturePlans(data.future_plans || []);
        }
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoreChange = (index, field, value) => {
    setCoreValues((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addCoreValue = () => {
    setCoreValues([...coreValues, { title: '', desc: '', icon: 'FaStar' }]);
  };

  const removeCoreValue = (index) => {
    setCoreValues(coreValues.filter((_, i) => i !== index));
  };

  const handlePlanChange = (index, value) => {
    const arr = [...futurePlans];
    arr[index] = value;
    setFuturePlans(arr);
  };

  const addFuturePlan = () => {
    setFuturePlans([...futurePlans, '']);
  };

  const removeFuturePlan = (index) => {
    setFuturePlans(futurePlans.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        core_values: coreValues.filter(
          (val) => val.title.trim() !== '' || val.desc.trim() !== ''
        ),
        future_plans: futurePlans.filter((val) => val.trim() !== ''),
      };

      if (aboutId) {
        await api.post(`/admin/about-settings/${aboutId}`, data);
      } else {
        await api.post('/admin/about-settings', data);
      }

      toast.success('About Settings Saved!');
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join(', ')
          : 'Failed to save.');
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-10">Loading...</div>;

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] focus:border-[#0F1E4A] outline-none transition-all';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  const tabs = [
    { id: 'intro', name: 'Introduction', icon: FaQuoteLeft },
    { id: 'mv', name: 'Mission & Vision', icon: FaEye },
    { id: 'core', name: 'Core Values', icon: FaStar },
    { id: 'future', name: 'Future Plans', icon: FaListUl },
    { id: 'seo', name: 'SEO', icon: FaCog },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F1E4A]">
            About Page Settings
          </h2>
          <p className="text-sm text-gray-500">
            Manage content for the about page.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#0F1E4A] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md disabled:opacity-50 w-full sm:w-auto"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

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
        {activeTab === 'intro' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-[#0F1E4A]">
              Introduction
            </h3>
            <div>
              <label className={labelClass}>Introduction Paragraph</label>
              <textarea
                name="introduction_para"
                value={formData.introduction_para}
                onChange={handleChange}
                rows="6"
                className={inputClass}
                placeholder="Enter introduction..."
              />
            </div>
          </div>
        )}

        {activeTab === 'mv' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-[#0F1E4A]">
              Mission & Vision
            </h3>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Mission Paragraph</label>
                <textarea
                  name="mission_para"
                  value={formData.mission_para}
                  onChange={handleChange}
                  rows="4"
                  className={inputClass}
                  placeholder="Enter mission..."
                />
              </div>
              <div>
                <label className={labelClass}>Vision Paragraph</label>
                <textarea
                  name="vision_para"
                  value={formData.vision_para}
                  onChange={handleChange}
                  rows="4"
                  className={inputClass}
                  placeholder="Enter vision..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'core' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-[#0F1E4A]">
                Core Values
              </h3>
              <button
                type="button"
                onClick={addCoreValue}
                className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#2563EB]"
              >
                <FaPlus /> Add Value
              </button>
            </div>
            <div className="space-y-4">
              {coreValues.map((val, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-3 items-start bg-gray-50 p-4 rounded-lg border"
                >
                  <div className="w-full md:w-1/4">
                    <IconSelector
                      value={val.icon}
                      onChange={(newIcon) =>
                        handleCoreChange(index, 'icon', newIcon)
                      }
                    />
                  </div>

                  <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-1">
                      <input
                        type="text"
                        value={val.title}
                        onChange={(e) =>
                          handleCoreChange(index, 'title', e.target.value)
                        }
                        className={`${inputClass} font-semibold`}
                        placeholder="Title (e.g. Integrity)"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={val.desc}
                        onChange={(e) =>
                          handleCoreChange(index, 'desc', e.target.value)
                        }
                        className={inputClass}
                        placeholder="Short description..."
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCoreValue(index)}
                    className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition shrink-0"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {coreValues.length === 0 && (
                <p className="text-sm text-gray-400">
                  No core values added.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'future' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-[#0F1E4A]">
                Future Plans
              </h3>
              <button
                type="button"
                onClick={addFuturePlan}
                className="text-xs bg-[#0F1E4A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#2563EB]"
              >
                <FaPlus /> Add Plan
              </button>
            </div>
            <div className="space-y-3">
              {futurePlans.map((val, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handlePlanChange(index, e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Expand to new cities"
                  />
                  <button
                    type="button"
                    onClick={() => removeFuturePlan(index)}
                    className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition shrink-0"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              {futurePlans.length === 0 && (
                <p className="text-sm text-gray-400">
                  No future plans added.
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-[#0F1E4A]">
              SEO Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>SEO Title</label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. About Us | Brain Inspire"
                />
              </div>

              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea
                  name="seo_description"
                  value={formData.seo_description}
                  onChange={handleChange}
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
                  value={formData.seo_keywords}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. education, skills, bahawalpur"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AboutSettings;