import { useEffect, useState } from 'react';

const useLoader = (delay = 800) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
};

export default useLoader;