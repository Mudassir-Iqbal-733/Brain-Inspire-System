import { FaQuoteLeft } from 'react-icons/fa';
import directorImage from '../assets/3.JPG.jpeg';

const DirectorMessage = () => {
  return (
    <section className="bg-gradient-to-br from-[#0F1E4A] via-[#1E3A8A] to-[#2563EB] py-14 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 bg-[#38BDF8]/20 rounded-3xl blur-2xl"></div>

              <div className="relative w-56 sm:w-64 md:w-72 lg:w-full max-w-xs aspect-square rounded-3xl overflow-hidden border-4 border-[#38BDF8] shadow-2xl">
                <img
                  src={directorImage}
                  alt="Engineer Muhammad Shafiq Naimat"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-[#0F1E4A] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
                Director BISE
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 text-center lg:text-left">
            <FaQuoteLeft className="text-[#38BDF8]/30 text-4xl md:text-5xl mb-4 mx-auto lg:mx-0" />

            <p className="text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider mb-3 uppercase">
              Director Message
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
              Engineer Muhammad
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#38BDF8] leading-tight mb-6">
              Shafiq Naimat
            </h2>

            <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
              <p>
                Though there is a worldwide explosion of knowledge, the world
                lacks trust and faith in its leaders and academic institutions.
              </p>

              <p>
                At <span className="text-white font-semibold">BISE</span>, I
                believe that my experts try their level best to enhance the
                inner capabilities of the students and impart the right sort of
                education which arises right principles, ethics and moral codes
                in them.
              </p>

              <p>
                My role is to assist you in achieving your academic, personal,
                and career goals by forging a sense of community atmosphere that
                fosters learning and student development. Our{' '}
                <span className="text-[#38BDF8] font-semibold">LABS</span> are
                equipped with the latest and modern infrastructures that will
                aid for the best learning of our students.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <p className="text-white font-bold text-base sm:text-lg">
                Engineer Muhammad Shafiq Naimat
              </p>
              <p className="text-[#38BDF8] text-xs sm:text-sm font-medium">
                Director, Brain Inspire System of Education
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorMessage;