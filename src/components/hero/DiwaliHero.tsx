import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { HeroStatsBar } from './HeroStatsBar'
import { DiwaliFireworks } from './DiwaliFireworks'
import {
  diwaliSlides,
  DIWALI_SLIDE_INTERVAL_MS,
  type DiwaliSlide,
} from '../../data/diwaliHero'

const IMG = {
  ribbon: '/diwali/dhamaka-banner.webp',
  showcase: '/diwali/cloud-showcase.webp',
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

/** Hanging festive lantern — gold frame, glowing window, purple tassel */
function Lantern({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const uid = useId()
  const gold = `lt-gold${uid}`
  const glow = `lt-glow${uid}`
  return (
    <motion.svg
      viewBox="0 0 60 170"
      aria-hidden
      className={`origin-top drop-shadow-[0_8px_18px_rgba(255,150,30,0.45)] ${className}`}
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id={gold} x1="0" x2="1">
          <stop offset="0" stopColor="#b86b0c" />
          <stop offset=".5" stopColor="#ffd56a" />
          <stop offset="1" stopColor="#b86b0c" />
        </linearGradient>
        <radialGradient id={glow} cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#fff6c9" />
          <stop offset=".45" stopColor="#ffc443" />
          <stop offset="1" stopColor="#f07a12" />
        </radialGradient>
      </defs>
      <line x1="30" y1="0" x2="30" y2="52" stroke="#c98a2a" strokeWidth="1.4" />
      <circle cx="30" cy="52" r="3" fill={`url(#${gold})`} />
      <path d="M18 64 Q30 50 42 64 Z" fill={`url(#${gold})`} />
      <rect x="15" y="63" width="30" height="5" rx="1.5" fill={`url(#${gold})`} />
      <path d="M17 68 H43 L47 98 L43 128 H17 L13 98 Z" fill={`url(#${glow})`} />
      <path
        d="M17 68 H43 L47 98 L43 128 H17 L13 98 Z M30 68 V128 M13 98 H47 M22 68 L20 128 M38 68 L40 128"
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth="2"
      />
      <rect x="15" y="127" width="30" height="5" rx="1.5" fill={`url(#${gold})`} />
      <path d="M21 132 H39 L34 140 H26 Z" fill={`url(#${gold})`} />
      <circle cx="30" cy="142" r="2.6" fill="#ffcf5a" />
      <path d="M26 144 H34 L36 168 H24 Z" fill="#7a1fa2" />
      <path d="M27 146 V166 M30 146 V168 M33 146 V166" stroke="#a23bd1" strokeWidth=".8" />
    </motion.svg>
  )
}

/** Drooping fairy-light garland across the top */
function StringLights({ className = '' }: { className?: string }) {
  const bulbs = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13
    return { x: 10 + t * 580, y: 6 + Math.sin(t * Math.PI) * 34 }
  })
  return (
    <svg viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden className={className}>
      <path d="M10 6 Q300 74 590 6" fill="none" stroke="#c9a05a" strokeWidth="1.2" opacity=".7" />
      {bulbs.map((b, i) => (
        <g key={i} className="diwali-twinkle" style={{ animationDelay: `${(i % 5) * 0.4}s` }}>
          <circle cx={b.x} cy={b.y + 3} r="7" fill="#ffd36b" opacity=".35" />
          <circle cx={b.x} cy={b.y + 3} r="2.6" fill="#fff3c2" />
        </g>
      ))}
    </svg>
  )
}

/** Soft firework / sparkle burst */
function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={`diwali-twinkle ${className}`}>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        const r1 = i % 2 ? 18 : 12
        const r2 = i % 2 ? 46 : 36
        return (
          <line
            key={i}
            x1={50 + Math.cos(a) * r1}
            y1={50 + Math.sin(a) * r1}
            x2={50 + Math.cos(a) * r2}
            y2={50 + Math.sin(a) * r2}
            stroke="#f6c453"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="50" cy="50" r="3" fill="#ffe7a3" />
    </svg>
  )
}

const BOKEH = [
  { l: '4%', t: '30%', s: 46, o: 0.5 },
  { l: '10%', t: '68%', s: 28, o: 0.45 },
  { l: '2%', t: '86%', s: 60, o: 0.35 },
  { l: '38%', t: '12%', s: 22, o: 0.5 },
  { l: '47%', t: '78%', s: 36, o: 0.35 },
  { l: '58%', t: '8%', s: 30, o: 0.45 },
  { l: '88%', t: '40%', s: 50, o: 0.45 },
  { l: '94%', t: '70%', s: 34, o: 0.5 },
  { l: '80%', t: '88%', s: 54, o: 0.35 },
  { l: '70%', t: '22%', s: 18, o: 0.55 },
]

function FestiveBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbff] via-[#f4f0ff] to-[#ece6ff]" />
      <div className="absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[#ffd98a]/25 blur-3xl" />
      <div className="absolute right-[18%] top-[18%] h-[460px] w-[460px] rounded-full bg-[#c7b6ff]/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[#ffc46b]/20 blur-3xl" />

      {BOKEH.map((b, i) => (
        <span
          key={i}
          className="absolute"
          style={{ left: b.l, top: b.t, width: b.s, height: b.s, opacity: b.o }}
        >
          <span
            className="diwali-twinkle block h-full w-full rounded-full bg-[radial-gradient(circle,#ffe6a8_0%,#ffd27a66_45%,transparent_70%)]"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        </span>
      ))}

      <StringLights className="absolute left-0 top-16 h-12 w-[46%] sm:h-16 lg:top-[72px]" />
      <StringLights className="absolute right-0 top-[72px] hidden h-16 w-[40%] lg:block" />

      <Sparkle className="absolute left-[40%] top-[6%] hidden h-20 w-20 opacity-60 lg:block" />
      <Sparkle className="absolute right-[6%] top-[30%] h-16 w-16 opacity-60 sm:h-24 sm:w-24" />
      <Sparkle className="absolute left-[2%] bottom-[24%] hidden h-14 w-14 opacity-50 sm:block" />

      <Lantern className="absolute left-[1.5%] top-16 h-20 w-7 sm:h-36 sm:w-12 lg:top-[72px] lg:h-44 lg:w-14 lg:max-[1399px]:hidden" />
      <Lantern
        delay={0.8}
        className="absolute left-[7%] top-16 hidden h-24 w-9 sm:block lg:hidden"
      />
      <Lantern
        delay={0.4}
        className="absolute right-[7%] top-16 lg:top-[72px] hidden h-28 w-10 sm:block lg:h-40 lg:w-14"
      />
      <Lantern
        delay={1.2}
        className="absolute right-[1.5%] top-16 lg:top-[72px] h-24 w-8 sm:h-40 sm:w-14 lg:h-52 lg:w-16"
      />
    </div>
  )
}

const gradientText =
  'bg-gradient-to-r from-[#8a2be2] to-[#a533e8] bg-clip-text text-transparent'

/** Small diya-tipped divider used around the centred subtitle */
function Flourish({ flip = false }: { flip?: boolean }) {
  return (
    <span
      aria-hidden
      className={`hidden h-0.5 w-10 rounded-full sm:block ${
        flip
          ? 'bg-gradient-to-l from-transparent to-[#f0a92a]'
          : 'bg-gradient-to-r from-transparent to-[#f0a92a]'
      }`}
    />
  )
}

function SlideContent({ slide }: { slide: DiwaliSlide }) {
  return (
    <>
      {slide.showRibbon && (
        <img
          src={IMG.ribbon}
          alt="Diwali Dhamaka Offers"
          className="mx-auto w-full max-w-[280px] drop-shadow-[0_8px_18px_rgba(230,150,20,0.35)] sm:max-w-[320px] lg:mx-0 lg:max-w-[290px] lg:-translate-x-[5%] xl:max-w-[310px]"
          draggable={false}
        />
      )}

      {slide.titleImage && (
        <img
          src={slide.titleImage.src}
          alt={slide.titleImage.alt}
          className="mx-auto w-full max-w-[340px] drop-shadow-[0_14px_30px_rgba(110,40,200,0.35)] sm:max-w-[400px] lg:mx-0 lg:max-w-[380px] xl:max-w-[420px]"
          draggable={false}
        />
      )}

      {slide.heading && (
        <p className="mt-3 text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-[#1a1773] sm:mt-4 sm:text-5xl lg:mt-3 lg:text-[2.6rem] xl:text-[3rem]">
          {slide.heading.lines.map((line, i) => (
            <span
              key={line}
              className={`block ${slide.heading?.highlight.includes(i) ? gradientText : ''}`}
            >
              {line}
            </span>
          ))}
        </p>
      )}

      {slide.subtitle?.style === 'line' && (
        <p className="mt-4 flex items-center justify-center gap-3 text-[15px] font-medium text-gray-600 sm:text-lg lg:mt-3 lg:justify-start lg:text-base xl:text-lg">
          <span className="hidden h-0.5 w-10 rounded-full bg-gradient-to-r from-[#a533e8] to-[#7b61ff] sm:block" />
          {slide.subtitle.text}
        </p>
      )}

      {slide.subtitle?.style === 'centered' && (
        <div className="mx-auto mt-3 max-w-[400px] text-center lg:mx-0 lg:max-w-[380px] xl:max-w-[420px]">
          <p className="text-[1.6rem] font-extrabold leading-tight text-[#1a1773] sm:text-3xl lg:text-[1.7rem] xl:text-[1.9rem]">
            {slide.subtitle.text}
          </p>
          {slide.subtitle.small && (
            <p className="mt-1 flex items-center justify-center gap-3 text-base font-medium text-gray-600 sm:text-xl lg:text-lg">
              <Flourish />
              {slide.subtitle.small}
              <Flourish flip />
            </p>
          )}
        </div>
      )}

      {slide.offerImage && (
        <div
          className="relative mx-auto mt-4 w-full max-w-[360px] sm:mt-5 sm:max-w-[400px] lg:mx-0 lg:mt-4 lg:max-w-[350px] lg:translate-x-[calc(var(--bleed)*-1)] xl:max-w-[380px]"
          style={
            {
              aspectRatio: slide.offerImage.aspect,
              '--bleed': slide.offerImage.bleed ?? '0%',
            } as CSSProperties
          }
        >
          <img
            src={slide.offerImage.src}
            alt={slide.offerImage.alt}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(110,40,200,0.35)]"
            draggable={false}
          />
        </div>
      )}

      {slide.regularPrice && (
        <p className="mt-3 flex items-center justify-center gap-2 text-base font-semibold text-gray-700 sm:text-lg lg:mt-2 lg:justify-start">
          Regular Price
          <span className="text-[#e0245e] line-through decoration-2">{slide.regularPrice}</span>
        </p>
      )}

      {slide.tagline && (
        <p className="mx-auto mt-3 max-w-[420px] text-base font-semibold leading-snug text-[#1a1773] sm:text-lg lg:mx-0">
          {slide.tagline.text}{' '}
          <span className="text-[#8a2be2]">{slide.tagline.highlight}</span>
        </p>
      )}
    </>
  )
}

function OfferSlider({ onQuote }: { onQuote: () => void }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const count = diwaliSlides.length

  useEffect(() => {
    if (paused || count < 2) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), DIWALI_SLIDE_INTERVAL_MS)
    return () => window.clearTimeout(id)
  }, [active, paused, count])

  const go = (dir: number) => setActive((i) => (i + dir + count) % count)

  return (
    <div
      className="text-center lg:text-left"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <h1 className="sr-only">Diwali Dhamaka Offers on Tally Cloud Hosting</h1>

      {/* All slides share one grid cell → height never jumps */}
      <div className="grid" aria-roledescription="carousel" aria-label="Diwali offers">
        {diwaliSlides.map((slide, i) => {
          const isActive = i === active
          return (
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!isActive}
              initial={false}
              animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`col-start-1 row-start-1 self-center ${
                isActive ? '' : 'pointer-events-none'
              }`}
            >
              <SlideContent slide={slide} />
            </motion.div>
          )
        })}
      </div>

      <div className="mt-5 flex flex-col items-center gap-4 sm:mt-6 lg:mt-5 lg:items-start lg:gap-3">
        <button
          type="button"
          onClick={onQuote}
          className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#6a2ee8] via-[#7b2ff0] to-[#a533e8] py-2.5 pl-7 pr-2.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(110,45,230,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(110,45,230,0.45)] sm:text-lg"
        >
          Get Your Festive Quote
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/80 transition-transform group-hover:translate-x-0.5">
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </span>
        </button>

        <div className="flex items-center gap-2">
          {diwaliSlides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show offer ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-8 bg-gradient-to-r from-[#f0a92a] to-[#a533e8]'
                  : 'w-2.5 bg-[#cbbcf5] hover:bg-[#a98ef0]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function DiwaliHero({ onQuote }: { onQuote: () => void }) {
  return (
    <>
      <FestiveBackground />
      <DiwaliFireworks className="absolute inset-0 z-[5] h-full w-full" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 pt-10 sm:pt-12 lg:min-h-[500px] lg:grid-cols-[44%_56%] lg:gap-4 lg:pt-4 lg:pb-6 xl:min-h-[520px]">
          {/* Left — rotating offer slides */}
          <motion.div {...fadeUp(0.05)}>
            <OfferSlider onQuote={onQuote} />
          </motion.div>

          {/* Right — cloud showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute inset-[12%] rounded-full bg-[#b9a6ff]/35 blur-3xl" />
            <img
              src={IMG.showcase}
              alt="Tally on cloud with Access Anywhere, 2FA/MFA, Google Backup, Team Collaboration and Encrypted Backup"
              className="relative mx-auto w-full max-w-[560px] lg:max-w-none lg:translate-x-4 xl:translate-x-8"
              draggable={false}
            />
          </motion.div>
        </div>

        <div className="relative z-30 mt-8 sm:mt-10 lg:mt-4">
          <HeroStatsBar />
        </div>
      </div>
    </>
  )
}
