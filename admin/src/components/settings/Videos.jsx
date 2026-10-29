import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../../lib/axios';
import { FaVideo, FaTrash, FaUpload, FaSpinner } from 'react-icons/fa';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const fetchVideos = async () => {
    try {
      const res = await api.get('/videos');
      setVideos(res.data.data);
    } catch (error) {
      console.error("API Error:", error.response?.data);
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 20MB Limit Check
      if (file.size > 20 * 1024 * 1024) {
        toast.error('Video must be less than 20MB');
        e.target.value = null; // Input clear
        setVideoFile(null);
        return;
      }
      setVideoFile(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) return toast.error('Please select a video');

    setUploading(true);
    const toastId = toast.loading('Uploading video...');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('video', videoFile);

      await api.post('/admin/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.update(toastId, { render: 'Video uploaded successfully!', type: 'success', isLoading: false, autoClose: 3000 });
      setTitle('');
      setVideoFile(null);
      e.target.reset();
      fetchVideos();
    } catch (error) {
      let errorMsg = 'Upload failed.';
      if (error.response?.data?.message) errorMsg = error.response.data.message;
      else if (error.response?.data?.errors) {
        errorMsg = Object.values(error.response.data.errors).flat().join(', ');
      }
      
      toast.update(toastId, { render: errorMsg, type: 'error', isLoading: false, autoClose: 5000 });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Video?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/admin/videos/${id}`);
          toast.success('Video deleted');
          fetchVideos();
        } catch (error) {
          toast.error('Failed to delete video');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F1E4A]"></div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F1E4A] outline-none text-sm";

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F1E4A]">Video Management</h2>
          <p className="text-sm text-gray-500">Upload and manage videos (Max 20MB).</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-gray-700">Video Title (Optional)</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className={inputClass} 
              placeholder="e.g. Campus Tour" 
            />
          </div>
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-gray-700">Select Video (MP4, Max 20MB)</label>
            <input 
              type="file" 
              accept="video/mp4,video/x-m4v,video/*" 
              onChange={handleFileChange} 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0F1E4A]/10 file:text-[#0F1E4A] hover:file:bg-[#0F1E4A]/20 transition" 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={uploading} 
            className="bg-[#38BDF8] hover:bg-[#2563EB] text-[#0F1E4A] hover:text-white px-6 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition disabled:opacity-70 h-[42px]"
          >
            {uploading ? (
              <><FaSpinner className="animate-spin" /> Uploading...</>
            ) : (
              <><FaUpload /> Upload Video</>
            )}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group">
            <div className="relative bg-black h-48">
              <video src={video.video_url} controls className="w-full h-full object-contain"></video>
            </div>
            <div className="p-4 flex justify-between items-center mt-auto border-t border-gray-50">
              <div className="flex items-center gap-2">
                <FaVideo className="text-[#38BDF8]" />
                <h3 className="font-bold text-[#0F1E4A] truncate max-w-[200px]">{video.title || 'Untitled Video'}</h3>
              </div>
              <button 
                onClick={() => handleDelete(video.id)} 
                className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition shrink-0"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-500">
            No videos uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;