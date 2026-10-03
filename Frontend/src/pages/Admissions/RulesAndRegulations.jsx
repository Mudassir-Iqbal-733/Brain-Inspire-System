import PageHeader from '../../components/common/PageHeader';
import {
  FaUserCheck,
  FaClock,
  FaMoneyBillWave,
  FaBan,
  FaShieldAlt,
  FaBook,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUsers,
  FaMobileAlt,
  FaIdCard,
  FaChartLine,
  FaHandshake,
} from 'react-icons/fa';
import rulesData from '../../data/rules.json';

const icons = [
  <FaUserCheck />,
  <FaClock />,
  <FaMoneyBillWave />,
  <FaBan />,
  <FaShieldAlt />,
  <FaBook />,
  <FaMobileAlt />,
  <FaUsers />,
  <FaIdCard />,
  <FaChartLine />,
  <FaHandshake />,
];

const RulesAndRegulations = () => {
  const { notice, sections } = rulesData;

  return (
    <>
      <PageHeader
        title="Rules & Regulations"
        breadcrumbs={[
          { label: 'Admissions', href: '/admissions/why-bise' },
          { label: 'Rules & Regulations' },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Institute Policies
              </span>
              <span className="w-12 h-px bg-[#38BDF8]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1E4A] leading-tight mb-5">
              Rules & Regulations
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              To ensure a disciplined, respectful, and productive learning
              environment, all students of Brain Inspire System of Education
              are required to follow the rules and regulations outlined below.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10 md:mb-14">
            <div className="bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

              <div className="relative flex flex-col sm:flex-row items-start gap-5">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                    <FaExclamationTriangle />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Important Notice
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {notice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {sections.map((section, i) => (
              <div
                key={section.id}
                className="group relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:border-[#38BDF8]/40 hover:shadow-2xl hover:shadow-[#38BDF8]/10 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-40"></div>
                      <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                        {icons[i] || <FaCheckCircle />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-[#0F1E4A] leading-tight">
                        {section.title}
                      </h3>
                      <p className="text-[#2563EB] text-xs md:text-sm font-medium mt-1">
                        {section.rules.length} Rules
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {section.rules.map((rule, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <FaCheckCircle className="text-[#38BDF8] text-sm mt-1 shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 bg-linear-to-br from-[#38BDF8]/10 via-white to-[#2563EB]/10 border border-[#38BDF8]/30 rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="relative text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg mb-6">
                <FaHandshake />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] leading-tight mb-4">
                Have Questions?
              </h3>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                If you have any questions about our rules and regulations, or
                need clarification on any policy, please don't hesitate to
                reach out to our administration team.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#0F1E4A] px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#38BDF8]/30 hover:bg-[#2D2B6F] hover:text-white transition-all duration-300"
                >
                  Contact Administration
                </a>
                <a
                  href="tel:03004506850"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#0F1E4A] px-6 py-3.5 rounded-full font-bold text-sm hover:border-[#38BDF8] hover:text-[#2563EB] transition-all duration-300"
                >
                  Call: 0300-4506850
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RulesAndRegulations;