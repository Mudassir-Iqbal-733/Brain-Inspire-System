import PageHeader from '../../components/common/PageHeader';
import { FaQuoteLeft } from 'react-icons/fa';
import messagesData from '../../data/messages.json';
import managingDirector from '../../assets/6.JPG.jpeg';

const ManagingDirector = () => {
  const data = messagesData.managingDirector;

  return (
    <>
      <PageHeader
        title="Managing Director Message"
        breadcrumbs={[
          { label: 'About', href: '/about/managing-director-message' },
          { label: 'Managing Director Message' },
        ]}
      />

      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="relative bg-[#2D2B6F] rounded-3xl py-14 md:py-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#38BDF8]/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-[#38BDF8]/20 rounded-3xl blur-2xl"></div>

                    <div className="relative w-56 sm:w-64 md:w-72 lg:w-full max-w-xs aspect-square rounded-3xl overflow-hidden border-4 border-[#38BDF8] shadow-2xl">
                      <img
                        src={managingDirector}
                        alt={data.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-[#0F1E4A] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
                      {data.badge}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 text-center lg:text-left">
                  <FaQuoteLeft className="text-[#38BDF8]/30 text-4xl md:text-5xl mb-4 mx-auto lg:mx-0" />

                  <p className="text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider mb-3 uppercase">
                    Managing Director Message
                  </p>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                    {data.name}
                  </h2>

                  <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                    {data.paragraphs.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/15">
                    <p className="text-white font-bold text-base sm:text-lg">
                      {data.name}
                    </p>
                    <p className="text-[#38BDF8] text-xs sm:text-sm font-medium">
                      {data.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default ManagingDirector;