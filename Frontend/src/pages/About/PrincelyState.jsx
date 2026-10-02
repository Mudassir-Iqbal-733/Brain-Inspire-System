import PageHeader from '../../components/common/PageHeader';
import { FaCrown, FaBookOpen, FaLandmark, FaFlag, FaGraduationCap } from 'react-icons/fa';
import princelyBg from '../../assets/bwppic.jpg';

const PrincelyState = () => {
  const intro = [
    'Bahawalpur was one of the most prominent princely states of the Indian subcontinent, ruled by the Daudpotra Abbasi dynasty with a rich history dating back to the early 18th century. It stood as one of the largest Muslim princely states, second only to Hyderabad, and was celebrated for its visionary leadership and progressive governance.',
    'During the reign of Nawab Sir Sadiq Muhammad Khan Abbasi V (1904–1966), the state achieved remarkable development in education, healthcare, and infrastructure. Bahawalpur was widely recognized as a model of a welfare state, setting an example for the entire region.',
  ];

  const heritage = [
    'The culture of Bahawalpur is a unique blend of ancient Hakra civilization, Hindu traditions, and Islamic influence, with Saraiki as its primary language.',
    'The state was once known as the "Land of Gardens," possessing the finest canal system in the subcontinent — the Sutlej Valley Project — which transformed vast desert lands into fertile farmland.',
  ];

  const education = [
    'Bahawalpur has a long and proud tradition of education. As early as the 10th century, Uch Sharif was already a renowned center of Islamic learning in the subcontinent.',
    'During the reign of Nawab Sadiq, the state invested heavily in education and established institutions such as Jamia Abbasia (predecessor of Islamia University Bahawalpur) and Sadiq Public School, laying a strong foundation for the region\'s educational development.',
    'By the eve of Pakistan\'s independence, the state had established multiple girls\' schools and colleges, with a rapidly growing number of female students.',
  ];

  const pakistan = [
    'Bahawalpur holds the unique honor of being the first princely state to accede to Pakistan, having signed the Instrument of Accession on October 3, 1947.',
    'Nawab Sadiq played a significant role in the founding and consolidation of Pakistan, and gifted a precious Rolls-Royce car to Quaid-e-Azam Jinnah as a token of his unwavering support.',
  ];

  const connection = [
    'At Brain Inspire System of Education, we carry forward this rich educational legacy of Bahawalpur. Just as the Nawabs of Bahawalpur once used education and welfare to transform the destiny of a region, we empower young minds through practical skills and technical training.',
    'Our mission continues this spirit of progress, ensuring that the next generation of Bahawalpur — and Pakistan — is equipped with the knowledge, skills, and vision to build a brighter future.',
  ];

  return (
    <>
      <PageHeader
        title="The Princely State"
        breadcrumbs={[
          { label: 'About', href: '/about/overview' },
          { label: 'The Princely State' },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden mb-12 md:mb-16">
            <img
              src={princelyBg}
              alt="Bahawalpur Princely State"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#2D2B6F] via-[#2D2B6F]/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <p className="text-[#38BDF8] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2">
                Historical Heritage
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                Bahawalpur — A Legacy of Vision & Progress
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="lg:col-span-2 bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full"></div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-xl">
                      <FaCrown />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0F1E4A]">
                      Introduction
                    </h2>
                    <p className="text-[#2563EB] text-xs md:text-sm font-medium">
                      The Princely State of Bahawalpur
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {intro.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-xl mb-5">
                  <FaLandmark />
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                  Quick Facts
                </h3>

                <ul className="space-y-3 text-gray-200 text-sm">
                  <li className="flex justify-between gap-3 pb-2 border-b border-white/10">
                    <span className="text-gray-400">Founded</span>
                    <span className="font-semibold">Early 18th Century</span>
                  </li>
                  <li className="flex justify-between gap-3 pb-2 border-b border-white/10">
                    <span className="text-gray-400">Dynasty</span>
                    <span className="font-semibold">Daudpotra Abbasi</span>
                  </li>
                  <li className="flex justify-between gap-3 pb-2 border-b border-white/10">
                    <span className="text-gray-400">Joined Pakistan</span>
                    <span className="font-semibold">Oct 3, 1947</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-gray-400">Language</span>
                    <span className="font-semibold">Saraiki</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="group relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-[#38BDF8]/40 hover:shadow-2xl hover:shadow-[#38BDF8]/10 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-40"></div>
                    <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                      <FaBookOpen />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] leading-tight">
                      Cultural Heritage
                    </h2>
                    <p className="text-[#2563EB] text-xs md:text-sm font-medium mt-1">
                      A rich cultural tapestry
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                  {heritage.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="group relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-[#38BDF8]/40 hover:shadow-2xl hover:shadow-[#38BDF8]/10 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-40"></div>
                    <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                      <FaGraduationCap />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] leading-tight">
                      Educational Tradition
                    </h2>
                    <p className="text-[#2563EB] text-xs md:text-sm font-medium mt-1">
                      A legacy of learning
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                  {education.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2D2B6F] rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden mb-12 md:mb-16">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                    <FaFlag />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    First to Join Pakistan
                  </h2>
                  <p className="text-[#38BDF8] text-xs md:text-sm font-medium mt-1">
                    A historic decision
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-200 text-sm md:text-base leading-relaxed max-w-3xl">
                {pakistan.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-[#38BDF8]/10 via-white to-[#2563EB]/10 border border-[#38BDF8]/30 rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                    <FaGraduationCap />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] leading-tight">
                    Our Connection
                  </h2>
                  <p className="text-[#2563EB] text-xs md:text-sm font-medium mt-1">
                    Continuing the legacy
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed max-w-4xl">
                {connection.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrincelyState;