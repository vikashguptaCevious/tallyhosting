import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'
import { heroSlides } from '../data/content'

function HeroBlueBg() {
  return (
    <div className="absolute top-0 right-0 hidden lg:block pointer-events-none z-0 select-none">
      {/* Soft glow behind shape */}
      <div className="absolute top-10 right-0 w-[260px] h-[75vh] bg-sky-400/20 blur-3xl rounded-full" />

      {/* Main curved shape */}
      <div
        className="relative w-[210px] xl:w-[250px] h-[70vh] mt-8 overflow-hidden"
        style={{ borderBottomLeftRadius: '58% 48%', borderTopLeftRadius: '8% 5%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8] via-primary to-[#003366]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Shine streak */}
        <div className="absolute -top-10 -left-10 w-32 h-[120%] bg-white/10 rotate-[25deg] blur-sm hero-shine" />

        {/* Inner glow ring */}
        <div
          className="absolute top-8 left-3 w-[85%] h-[40%] rounded-full border border-white/20"
          style={{ borderRadius: '50% 0 0 50%' }}
        />
      </div>

      {/* Floating decorative orbs */}
      <div className="absolute top-28 -left-6 w-16 h-16 rounded-full border-2 border-sky-300/40 bg-sky-100/20 backdrop-blur-sm hero-orb-1" />
      <div className="absolute top-1/2 -left-3 w-10 h-10 rounded-full bg-white/30 blur-[2px] hero-orb-2" />
      <div className="absolute bottom-32 -left-5 w-20 h-20 rounded-full border border-primary/30 bg-primary/5 hero-orb-3" />

      {/* Small accent dots */}
      <div className="absolute top-40 right-[220px] xl:right-[260px] w-2 h-2 rounded-full bg-sky-400/60" />
      <div className="absolute top-52 right-[200px] xl:right-[240px] w-1.5 h-1.5 rounded-full bg-primary/40" />
    </div>
  )
}

function SlideContent({ slide }: { slide: (typeof heroSlides)[number] }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center w-full min-h-[480px] lg:min-h-[520px]">
      <div className="text-left order-2 lg:order-1 px-1">
        {slide.variant === 'blue' && (
          <>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              ☁️ Cloud Hosting for Tally
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
              <span className="text-primary">{slide.title}</span>
              <br />
              <span className="text-gray-800">{slide.subtitle}</span>
            </h1>
            <p className="mt-5 text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg">
              {slide.description}
            </p>
            {'price' in slide && slide.price && (
              <p className="mt-4 text-lg font-bold text-primary">{slide.price}</p>
            )}
          </>
        )}

        {slide.variant === 'gradient' && (
          <>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
              <span className="text-primary">{slide.title}</span>
              <br />
              {slide.highlight && <span className="text-primary-dark">{slide.highlight}</span>}
              {slide.subtitle && (
                <>
                  <br />
                  <span className="text-gray-700 text-2xl lg:text-3xl xl:text-4xl">{slide.subtitle}</span>
                </>
              )}
            </h1>
            {slide.description && (
              <p className="mt-5 text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg">
                {slide.description}
              </p>
            )}
          </>
        )}

        {slide.variant === 'light' && slide.bullets && (
          <>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
              <span className="text-primary">{slide.title}</span>
              <br />
              <span className="text-gray-800">{slide.highlight}</span>
            </h1>
            <ul className="mt-6 space-y-2.5">
              {slide.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-gray-700 text-sm lg:text-base">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Try Free Now
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary text-sm font-semibold rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative z-10 px-2">
        <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}

export function HeroSlider() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-white overflow-hidden flex items-center pt-20"
    >
      <HeroBlueBg />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 z-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          onBeforeInit={(swiper) => {
            if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
              swiper.params.pagination.el = '.hero-pagination-dots'
            }
          }}
          onInit={(swiper) => {
            swiper.pagination.init()
            swiper.pagination.render()
            swiper.pagination.update()
          }}
          pagination={{
            clickable: true,
            el: '.hero-pagination-dots',
            bulletClass: 'hero-bullet',
            bulletActiveClass: 'hero-bullet-active',
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor
          simulateTouch
          allowTouchMove
          touchRatio={1}
          threshold={5}
          longSwipesRatio={0.3}
          speed={650}
          loop
          slidesPerView={1}
          spaceBetween={0}
          resistance
          resistanceRatio={0.85}
          className="hero-swiper w-full overflow-hidden"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="!h-auto">
              <SlideContent slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hero-pagination-dots flex justify-center gap-2 mt-8" />
      </div>
    </section>
  )
}
