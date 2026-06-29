import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-primary/70 uppercase">
            Testimonial
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-primary">
            What our client say about us
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative px-10 sm:px-12">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-gray-100"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors border border-gray-100"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              grabCursor
              loop
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
              }}
              className="testimonial-swiper pb-4"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative bg-white rounded-2xl p-8 shadow-lg h-full"
                  >
                    <div className="absolute -bottom-2 -right-2 w-full h-full bg-white/50 rounded-2xl -z-10 translate-x-2 translate-y-2" />
                    <Quote className="absolute bottom-6 right-6 w-16 h-16 text-gray-100" />

                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xl">
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">{t.name}</h4>
                        <p className="text-sm text-gray-500">
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-4 relative z-10">{t.text}</p>

                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
