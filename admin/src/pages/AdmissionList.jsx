import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import api from '../lib/axios';
import { FaTrash, FaEye, FaTimes } from 'react-icons/fa';

const AdmissionList = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchAdmissions = async () => {
    try {
      const res = await api.get('/admin/admissions');
      setAdmissions(res.data.data);
    } catch (error) {
      toast.error('Failed to load admissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/admin/admissions/${id}`);
          toast.success('Deleted successfully');
          fetchAdmissions();
        } catch (error) {
          toast.error('Failed to delete');
        }
      }
    });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <h2 className="text-xl font-bold text-[#0F1E4A] mb-6">Student Admissions</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admissions.map((adm) => (
                <tr key={adm.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-bold text-[#0F1E4A]">{adm.full_name}</p>
                    <p className="text-xs text-gray-500">{adm.father_name}</p>
                  </td>
                  <td className="p-4">
                    <p>{adm.phone}</p>
                    <p className="text-xs text-gray-500">{adm.email}</p>
                  </td>
                  <td className="p-4 font-medium text-[#2563EB]">{adm.course}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(adm.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelected(adm)}
                        className="w-9 h-9 inline-flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDelete(adm.id)}
                        className="w-9 h-9 inline-flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {admissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No admissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0F1E4A] text-white p-5 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold">Admission Details</h3>
                <p className="text-xs text-gray-300">#{selected.id}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Personal */}
              <Section title="Personal Information">
                <Field label="Full Name" value={selected.full_name} />
                <Field label="Father's Name" value={selected.father_name} />
                <Field label="CNIC / B-Form" value={selected.cnic} />
                <Field
                  label="Date of Birth"
                  value={selected.dob ? new Date(selected.dob).toLocaleDateString() : null}
                />
                <Field label="Gender" value={selected.gender} />
                <Field label="Email" value={selected.email} />
                <Field label="Phone" value={selected.phone} />
                <Field label="WhatsApp" value={selected.whatsapp} />
              </Section>

              {/* Address */}
              <Section title="Address">
                <Field label="Address" value={selected.address} full />
                <Field label="City" value={selected.city} />
                <Field label="Province" value={selected.province} />
              </Section>

              {/* Academic */}
              <Section title="Academic Background">
                <Field label="Last Qualification" value={selected.last_qualification} />
                <Field label="Last Institute" value={selected.last_institute} />
                <Field label="Passing Year" value={selected.passing_year} />
                <Field label="Marks / Grade" value={selected.marks_grade} />
              </Section>

              {/* Course */}
              <Section title="Course Selection">
                <Field label="Course" value={selected.course} />
                <Field label="Preferred Duration" value={selected.preferred_duration} />
                <Field label="Source" value={selected.source} />
              </Section>

              {/* Notes */}
              {selected.additional_notes && (
                <Section title="Additional Notes">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">
                    {selected.additional_notes}
                  </p>
                </Section>
              )}

              {/* Meta */}
              <Section title="Submission Info">
                <Field label="Status" value={selected.status} />
                <Field
                  label="Submitted On"
                  value={
                    selected.created_at
                      ? new Date(selected.created_at).toLocaleString()
                      : 'N/A'
                  }
                />
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h4 className="text-sm font-bold text-[#0F1E4A] mb-3 pb-2 border-b border-gray-100">
      {title}
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {children}
    </div>
  </div>
);

const Field = ({ label, value, full }) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
      {label}
    </p>
    <p className="text-sm text-[#0F1E4A] mt-0.5 break-words">
      {value || <span className="text-gray-400 italic">N/A</span>}
    </p>
  </div>
);

export default AdmissionList;