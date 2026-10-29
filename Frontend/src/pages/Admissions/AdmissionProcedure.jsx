import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaFileAlt, FaUserGraduate, FaMoneyBillWave, FaClipboardList, FaInfoCircle } from 'react-icons/fa';
import PageHeader from '../../components/common/PageHeader';
import Loader from '../../components/Loader';
import SEO from '../../components/SEO';
import useAdmissionStore from '../../store/useAdmissionStore';

const iconMap = {
  FaClipboardList: <FaClipboardList />,
  FaFileAlt: <FaFileAlt />,
  FaMoneyBillWave: <FaMoneyBillWave />,
  FaUserGraduate: <FaUserGraduate />,
  FaInfoCircle: <FaInfoCircle />,
};

const AdmissionProcedure = () => {
  const { data, fetchAdmissionsData, loading } = useAdmissionStore();

  useEffect(() => {
    fetchAdmissionsData();
  }, [fetchAdmissionsData]);

  if (loading || !data) return <Loader />;

  const steps = data.process_steps || [];
  const documents = data.required_docs || [];

  return (
    <>
      <SEO
        title={data.seo_title ? `Admission Procedure | ${data.seo_title}` : "Admission Procedure | Brain Inspire"}
        description={data.seo_description || "Learn about the admission procedure, required documents, and steps to apply at Brain Inspire System of Education."}
        keywords={data.seo_keywords || "admission, procedure, documents, BISE, apply, Bahawalpur"}
      />

      <PageHeader
        title="Admission Procedure"
        breadcrumbs={[
          { label: 'Admissions', href: '/admissions/why-bise' },
          { label: 'Apply Online' },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                How to Apply
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-4">
              Admission Procedure
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {data.process_desc || "Follow these simple steps to complete your admission at Brain Inspire System of Education."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-20">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group relative bg-white border border-gray-100 rounded-3xl p-6 transition-all duration-500 hover:border-[#38BDF8]/40 hover:shadow-2xl hover:shadow-[#38BDF8]/10 hover:-translate-y-1"
              >
                <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-[#38BDF8] text-[#0F1E4A] font-bold flex items-center justify-center text-sm shadow-lg">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg mb-5 mt-4 group-hover:scale-110 transition-transform duration-500">
                  {iconMap[step.icon] || <FaInfoCircle />}
                </div>

                <h3 className="text-lg font-bold text-[#0F1E4A] mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {documents.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16 md:mb-20">
              <div className="bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-50"></div>
                      <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                        <FaFileAlt />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        Required Documents
                      </h2>
                      <p className="text-[#38BDF8] text-xs md:text-sm font-medium mt-1">
                        Bring these with your admission form
                      </p>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {documents.map((doc, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <FaCheckCircle className="text-[#38BDF8] text-sm mt-1 shrink-0" />
                        <span className="text-gray-200 text-sm leading-relaxed">
                          {doc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="text-center bg-linear-to-br from-[#38BDF8]/10 via-white to-[#2563EB]/10 border border-[#38BDF8]/30 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] mb-4">
              Ready to Apply?
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-8 max-w-xl mx-auto">
              Fill the admission form and our team will guide you through the
              rest of the process.
            </p>
            <Link
              to="/admissions/admission-form"
              className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
            >
              Proceed to Admission Form
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdmissionProcedure;