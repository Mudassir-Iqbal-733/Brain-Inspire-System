import MissionVission from '../../components/MissionVission';
import PageHeader from '../../components/common/PageHeader';

import { FaQuoteLeft, FaRocket } from 'react-icons/fa';

const Overview = () => {
  const intro = [
    'BISE have been created and visioned by highly skilled interdisciplinary team each is expert in his or her own field. Together we craft curricula with integrated multimedia elements and didactic visuals nurturing with foundational concepts about different computing and language skills.',
    'Our project rests on passionate commitment to impart life-long skills to students. We take pride in equipping individuals with knowledge to survive in professional milieu as well as instilling in them sense of duty to the society.',
    'It is a technical program which may illumine the brains of young generation and broadens their visions by inciting their hidden potentials and make them aware of their own inner qualities which may lead them on the hard and bumpy track of the immense difficult universe.',
    'The prime function of this project is to give acknowledgement about different skills to the students.',
  ];

  const futurePlans = [
    'Enhancing and strengthening activities',
    'Faculty expansion',
    'Launch project in different cities',
    'Rank improving',
    'Nurture our project with latest modern technologies',
  ];

  return (
    <>
      <PageHeader
        title="Overview"
        breadcrumbs={[
          { label: 'About', href: '/about/overview' },
          { label: 'Overview' },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 mb-12 md:mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#38BDF8]/10 to-transparent rounded-bl-full"></div>

            <div className="relative flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-30"></div>
                <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-xl">
                  <FaQuoteLeft />
                </div>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#0F1E4A]">
                  Introduction
                </h2>
                <p className="text-[#2563EB] text-xs md:text-sm font-medium">
                  Who we are
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              {intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mb-12 md:mb-16">
           <MissionVission rounded />
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#2563EB]/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#38BDF8] rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-linear-to-br from-[#38BDF8] to-[#2563EB] text-white text-2xl shadow-lg">
                    <FaRocket />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0F1E4A] leading-tight">
                    Future Plans
                  </h2>
                  <p className="text-[#2563EB] text-xs md:text-sm font-medium mt-1">
                    What's coming next
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {futurePlans.map((plan, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4 transition-all duration-300 hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/40 hover:-translate-y-1"
                  >
                    <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#38BDF8] text-[#0F1E4A] text-xs font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed pt-1">
                      {plan}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;