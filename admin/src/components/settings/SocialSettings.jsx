import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../lib/axios';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
  FaPlus,
  FaTimes,
  FaChevronDown,
  FaLink,
  FaCheckCircle,
} from 'react-icons/fa';

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
};

const platformMeta = {
  facebook: { label: 'Facebook', color: 'bg-[#1877F2]', placeholder: 'https://facebook.com/yourpage' },
  instagram: { label: 'Instagram', color: 'bg-[#E4405F]', placeholder: 'https://instagram.com/yourhandle' },
  whatsapp: { label: 'WhatsApp', color: 'bg-[#25D366]', placeholder: '923004506850 (without +)' },
  youtube: { label: 'YouTube', color: 'bg-[#FF0000]', placeholder: 'https://youtube.com/@yourchannel' },
  twitter: { label: 'Twitter / X', color: 'bg-[#1DA1F2]', placeholder: 'https://twitter.com/yourhandle' },
  linkedin: { label: 'LinkedIn', color: 'bg-[#0A66C2]', placeholder: 'https://linkedin.com/company/yourcompany' },
  tiktok: { label: 'TikTok', color: 'bg-[#000000]', placeholder: 'https://tiktok.com/@yourhandle' },
};

const platformOptions = Object.keys(platformMeta).map((key) => ({
  value: key,
  label: platformMeta[key].label,
}));

const IconSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const SelectedIcon = iconMap[value] || FaFacebookF;
  const meta = platformMeta[value] || platformMeta.facebook;

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all text-sm"
      >
        <div className="flex items-center gap-3">
          <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-white text-xs ${meta.color}`}>
            <SelectedIcon />
          </span>
          <span className="font-semibold text-[#0F1E4A] capitalize">{value}</span>
        </div>
        <FaChevronDown
          className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-64 overflow-y-auto py-1">
            {platformOptions.map((opt) => {
              const Icon = iconMap[opt.value];
              const m = platformMeta[opt.value];
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition ${
                    value === opt.value ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-white text-xs ${m.color}`}>
                    <Icon />
                  </span>
                  <span className="text-sm font-medium text-[#0F1E4A]">{m.label}</span>
                  {value === opt.value && (
                    <FaCheckCircle className="ml-auto text-[#2563EB] text-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const SocialSettings = () => {
  const [socialId, setSocialId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/social-settings');
        if (res.data.data) {
          setSocialId(res.data.data.id);
          setLinks(res.data.data.links || []);
        }
      } catch (error) {
        toast.error('Failed to load data');
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const handleLinkChange = (index, field, value) => {
    const arr = [...links];
    arr[index] = { ...arr[index], [field]: value };
    setLinks(arr);
  };

  const addLink = () => {
    setLinks([...links, { platform: 'facebook', url: '' }]);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedLinks = links
        .filter((l) => l.url.trim() !== '')
        .map((link) => {
          let url = link.url.trim();
          if (link.platform === 'whatsapp') {
            const cleanNumber = url.replace(/[^0-9]/g, '');
            url = `https://wa.me/${cleanNumber}`;
          }
          return { ...link, url };
        });

      const data = { links: formattedLinks };

      if (socialId) {
        await api.post(`/admin/social-settings/${socialId}`, data);
      } else {
        await api.post('/admin/social-settings', data);
      }

      toast.success('Social settings saved!');
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Failed to save social settings.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-10 h-10 border-4 border-[#38BDF8] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm mt-4">Loading social settings...</p>
      </div>
    );
  }

  const inputClass =
    'flex-1 w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-sm text-[#0F1E4A] placeholder-gray-400 focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] outline-none transition-all';

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-[#0F1E4A]">Social Media Settings</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your social media links. These appear in the top bar and footer.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-[#38BDF8]/10 text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-full">
          <FaLink />
          {links.filter((l) => l.url.trim()).length} active
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6"
      >
        {/* Add button */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-[#0F1E4A]">Social Links</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Add one link per platform.
            </p>
          </div>
          <button
            type="button"
            onClick={addLink}
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-[#2563EB]/30 hover:bg-[#0F1E4A] transition-all duration-300 hover:scale-105"
          >
            <FaPlus className="text-[10px]" />
            Add Link
          </button>
        </div>

        {/* Links list */}
        <div className="space-y-3">
          {links.map((link, index) => {
            const meta = platformMeta[link.platform] || platformMeta.facebook;
            const Icon = iconMap[link.platform] || FaFacebookF;

            return (
              <div
                key={index}
                className="group relative bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:border-[#38BDF8]/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                  {/* Icon preview */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl text-white text-lg shadow-lg shrink-0 ${meta.color}`}
                  >
                    <Icon />
                  </div>

                  {/* Platform selector */}
                  <div className="w-full md:w-48 z-20">
                    <IconSelector
                      value={link.platform}
                      onChange={(val) => handleLinkChange(index, 'platform', val)}
                    />
                  </div>

                  {/* URL input */}
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    className={inputClass}
                    placeholder={meta.placeholder}
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="w-11 h-11 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200 shrink-0"
                    title="Remove"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            );
          })}

          {links.length === 0 && (
            <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-2xl mb-3">
                <FaLink />
              </div>
              <h3 className="text-sm font-bold text-[#0F1E4A] mb-1">No links yet</h3>
              <p className="text-xs text-gray-500 mb-4">
                Add your social media accounts to display them on the site.
              </p>
              <button
                type="button"
                onClick={addLink}
                className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
              >
                <FaPlus className="text-[10px]" />
                Add Your First Link
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#0F1E4A] hover:bg-[#2563EB] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#0F1E4A]/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Saving...
              </>
            ) : (
              'Save Social Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialSettings;