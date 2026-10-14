import { Spin } from 'antd';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loader;