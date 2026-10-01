import { FaArrowRight, FaClock } from 'react-icons/fa';
import AiImage from '../assets/AiImage.jpg';
import FreelancingImage from '../assets/FreelancingImage.jpg';
import EnglishImage from '../assets/EnglishImage.jpg';
import AccountingImage from '../assets/AccountingImage.jpg';
import ShopifyImage from '../assets/ShopifyImage.jpg';
import DarazImage from '../assets/DarazImage.jpg';
import VideoImage from '../assets/VideoImage.jpg';
import GraphicImage from '../assets/GraphicImage.jpg';

const ProgramsSection = () => {
  const programs = [
    {
      id: 1,
      title: 'AI Automation',
      code: 'D-AIA',
      duration: '6 Months',
      desc: 'Master AI tools and automation workflows to build smart solutions for modern businesses.',
      image: AiImage,
    },
    {
      id: 2,
      title: 'Certification of Freelancing',
      code: 'C-FL',
      duration: '3 Months',
      desc: 'Learn freelancing platforms, client handling, and earning strategies to start your career.',
      image: FreelancingImage,
    },
    {
      id: 3,
      title: 'Diploma of Advance English',
      code: 'D-AE',
      duration: '6 Months',
      desc: 'Advanced English language skills for professional communication and career growth.',
      image: EnglishImage,
    },
    {
      id: 4,
      title: 'Certificate of Computerized Accounting',
      code: 'C-CA',
      duration: '4 Months',
      desc: 'Practical accounting with software tools to prepare you for real industry roles.',
      image: AccountingImage,
    },
    {
      id: 5,
      title: 'Diploma in Mastering Shopify Training',
      code: 'DM-ST',
      duration: '5 Months',
      desc: 'Build, manage, and scale Shopify stores with hands-on ecommerce training.',
      image: ShopifyImage,
    },
    {
      id: 6,
      title: 'Daraz Seller Ecommerce Training',
      code: 'DS-ET',
      duration: '3 Months',
      desc: 'Learn Daraz selling, product listing, and online store growth strategies.',
      image: DarazImage,
    },
    {
      id: 7,
      title: 'Diploma in Video Editing',
      code: 'D-VE',
      duration: '4 Months',
      desc: 'Professional video editing, color grading, and motion graphics skills.',
      image: VideoImage,
    },
    {
      id: 8,
      title: 'Diploma in Graphic Designing',
      code: 'D-GD',
      duration: '5 Months',
      desc: 'Master graphic design with Adobe tools for print and digital media.',
      image: GraphicImage,
    },
  ];

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#38BDF8]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-[#38BDF8]"></span>
              <span className="text-[#2563EB] text-xs font-bold tracking-[0.2em] uppercase">
                Our Programs
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F1E4A] leading-[1.1]">
              Programs We{' '}
              <span className="text-[#38BDF8] relative">
                Offer
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#38BDF8]/40 rounded-full"></span>
              </span>
            </h2>
          </div>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md md:text-right">
            Industry-focused programs designed to build real skills and open
            real career doors for every student.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#38BDF8]/10 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E4A] via-[#0F1E4A]/30 to-transparent opacity-90"></div>

                <div className="absolute top-4 left-4">
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#0F1E4A] bg-[#38BDF8] px-3 py-1.5 rounded-full shadow-lg">
                    {program.code}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white leading-snug drop-shadow-lg">
                    {program.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center gap-1.5 text-[#2563EB] bg-[#38BDF8]/10 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <FaClock className="text-[10px]" />
                    {program.duration}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                  {program.desc}
                </p>

                <a
                  href={`/programs/${program.id}`}
                  className="inline-flex items-center justify-between gap-2 pt-4 border-t border-gray-100 group/link"
                >
                  <span className="text-[#0F1E4A] text-sm font-bold group-hover/link:text-[#2563EB] transition-colors duration-300">
                    Learn More
                  </span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0F1E4A] text-white transition-all duration-300 group-hover/link:bg-[#38BDF8] group-hover/link:text-[#0F1E4A] group-hover/link:translate-x-1">
                    <FaArrowRight className="text-xs" />
                  </span>
                </a>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#38BDF8] to-[#2563EB] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 md:mt-16">
          <a
            href="/programs"
            className="group inline-flex items-center gap-3 bg-[#38BDF8] text-[#0F1E4A] px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-[#38BDF8]/30 hover:shadow-2xl hover:shadow-[#38BDF8]/50 hover:scale-105"
          >
            <span>View All Programs</span>
            <span className="w-7 h-7 rounded-full bg-[#0F1E4A] text-[#38BDF8] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <FaArrowRight className="text-xs" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;