'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // Swapped Navigation out for Pagination
import 'swiper/css';
import 'swiper/css/pagination'; // Import Swiper pagination styles

const testimonials = [
  {
    name: 'Ahmed Hassan',
    role: 'Homeowner',
    location: 'F-10, Islamabad',
    rating: 5,
    text: 'Excellent CCTV installation service! The team was professional and completed the work on time. Highly recommended for security solutions.',
  },
  {
    name: 'Sarah Khan',
    role: 'Business Owner',
    location: 'Blue Area, Islamabad',
    rating: 5,
    text: 'AF TECHNOLOGIES installed our office solar system. Great quality work and significant reduction in electricity bills!',
  },
  {
    name: 'Muhammad Ali',
    role: 'Resident',
    location: 'DHA, Islamabad',
    rating: 5,
    text: 'Professional team with quality products. The CCTV system works perfectly and the mobile app is very user-friendly.',
  },
  {
    name: 'Ayesha Tariq',
    role: 'Entrepreneur',
    location: 'G-11, Islamabad',
    rating: 5,
    text: 'Very happy with the alarm system installed by AF TECHNOLOGIES. Top-notch service and support!',
  },
  {
    name: 'Bilal Ahmed',
    role: 'Store Owner',
    location: 'I-8, Islamabad',
    rating: 5,
    text: 'Reliable security solutions with excellent after-sales support. Highly recommend!',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative subtle technological background grid element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Heading Group */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[#0D6EFD] text-xs uppercase font-bold tracking-widest bg-blue-50 px-4 py-2 rounded-full inline-block mb-3">
            Client Validation Matrix
          </span>
          <h2 className="text-[#1E293B] text-4xl font-extrabold tracking-tight mb-4">
            Testimonials & Case Feedback
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Discover how AF Technologies designs, deploys, and secures high-availability operations for regional residential complexes and commercial enterprises.
          </p>
        </div>

        {/* Swiper Layout Wrapper Wrapper */}
        <div className="relative pb-16"> {/* Bottom padding creates clean separate space for dots */}
          <Swiper
            slidesPerView="auto"
            spaceBetween={40}
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.custom-swiper-pagination', // Maps container to an external div below the track
            }}
            modules={[Pagination, Autoplay]}
            className="w-full !px-4 custom-testimonials-swiper"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!w-[320px] sm:!w-[420px] md:!w-[520px] lg:!w-[600px]"
              >
                {/* Premium Glassmorphic Card Container Framework */}
                <div className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-8 h-[260px] shadow-[0_15px_30px_-10px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(13,110,253,0.08)] transition-all duration-400 flex flex-col justify-between group relative">
                  
                  {/* Decorative Quote Mark */}
                  <div className="absolute top-6 right-8 text-slate-100 text-5xl font-serif pointer-events-none group-hover:text-blue-50 transition-colors duration-300 select-none">
                    “
                  </div>

                  {/* Main Speech Content */}
                  <div className="relative z-10">
                    <p className="text-[#475569] text-sm md:text-base font-medium leading-relaxed italic line-clamp-4 group-hover:text-[#1E293B] transition-colors duration-300">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Identity Footer Deck Area */}
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-3 relative z-10">
                    <div>
                      <div className="font-bold text-[#1E293B] text-base group-hover:text-[#0D6EFD] transition-colors duration-300">
                        {item.name}
                      </div>
                      <div className="text-xs font-semibold text-[#64748B] tracking-wide mt-0.5">
                        {item.role} <span className="text-[#2DBE4E] mx-1.5">•</span> {item.location}
                      </div>
                    </div>

                    {/* Micro-Accented Star Cluster Module */}
                    <div className="flex gap-0.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      {Array.from({ length: item.rating }, (_, i) => (
                        <svg 
                          key={i} 
                          className="w-3.5 h-3.5 text-[#2DBE4E]" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dedicated External Target Element for Pagination Dots */}
          <div className="custom-swiper-pagination absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-20"></div>
        </div>

      </div>
    </section>
  );
}