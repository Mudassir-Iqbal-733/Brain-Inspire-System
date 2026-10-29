import { useEffect } from 'react';
import useGeneralStore from '../store/useGeneralStore';

const DynamicFavicon = () => {
  const { data, fetchGeneralSettings } = useGeneralStore();

  useEffect(() => {
    fetchGeneralSettings();
  }, [fetchGeneralSettings]);

  useEffect(() => {
    if (!data?.favicon) return;

    // Remove all existing icon links
    document
      .querySelectorAll("link[rel*='icon']")
      .forEach((el) => el.parentNode.removeChild(el));

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = data.favicon.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
    link.href = data.favicon;

    document.head.appendChild(link);
  }, [data?.favicon]);

  return null;
};

export default DynamicFavicon;