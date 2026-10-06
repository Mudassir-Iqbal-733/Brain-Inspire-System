import { Spin } from 'antd';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loader;