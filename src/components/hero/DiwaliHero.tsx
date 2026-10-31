import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { HeroStatsBar } from './HeroStatsBar'
import { DiwaliFireworks } from './DiwaliFireworks'
import { FestiveBackground } from './DiwaliDecor'
import {
  diwaliSlides,
  DIWALI_SLIDE_INTERVAL_MS,
  type DiwaliSlide,
} from '../../data/diwaliHero'
import { DIWALI_CLAIM_PATH } from '../../data/diwaliCampaign'

const IMG = {
  ribbon: '/diwali/dhamaka-banner.webp',
  showcase: '/diwali/cloud-showcase.webp',
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

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

/** One offer banner — also reused on the campaign page to show the slide that was clicked */
export function SlideContent({ slide }: { slide: DiwaliSlide }) {
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
          className="mx-auto w-full max-w-[360px] drop-shadow-[0_14px_30px_rgba(110,40,200,0.35)] sm:max-w-[440px] lg:mx-0 lg:max-w-[420px] lg:-translate-x-[6%] xl:max-w-[470px]"
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

function OfferSlider() {
  const [active, setActive] = useState(0)
  const touchX = useRef<number | null>(null)
  const count = diwaliSlides.length

  // Always rotates (no hover pause — the whole banner is a link, so the cursor often rests on it).
  // Restarts after every change, so a manual dot/swipe still gets a full interval.
  useEffect(() => {
    if (count < 2) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % count), DIWALI_SLIDE_INTERVAL_MS)
    return () => window.clearTimeout(id)
  }, [active, count])

  // Straight to the claim form with the slide's plan picked; `offer` keeps the clicked banner
  // on the claim page's "Back to Diwali offers" link
  const offerHref = `${DIWALI_CLAIM_PATH}?offer=${diwaliSlides[active].id}&plan=${diwaliSlides[active].plan}`

  const go = (dir: number) => setActive((i) => (i + dir + count) % count)

  return (
    <div
      className="text-center lg:text-left"
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

      {/* All slides share one grid cell → height never jumps. Whole offer opens the claim page;
          tabIndex -1 keeps the CTA below as the single keyboard stop for the same link. */}
      <Link
        to={offerHref}
        tabIndex={-1}
        className="grid cursor-pointer"
        aria-roledescription="carousel"
        aria-label="Diwali offers"
      >
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
      </Link>

      <div className="mt-5 flex flex-col items-center gap-4 sm:mt-6 lg:mt-5 lg:items-start lg:gap-3">
        <Link
          to={offerHref}
          className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#6a2ee8] via-[#7b2ff0] to-[#a533e8] py-2.5 pl-7 pr-2.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(110,45,230,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(110,45,230,0.45)] sm:text-lg"
        >
          Grab Diwali Offer
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/80 transition-transform group-hover:translate-x-0.5">
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </span>
        </Link>

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

export function DiwaliHero() {
  return (
    <>
      <FestiveBackground />
      <DiwaliFireworks className="absolute inset-0 z-[5] h-full w-full" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 pt-10 sm:pt-12 lg:min-h-[500px] lg:grid-cols-[44%_56%] lg:gap-4 lg:pt-4 lg:pb-6 xl:min-h-[520px]">
          {/* Left — rotating offer slides */}
          <motion.div {...fadeUp(0.05)}>
            <OfferSlider />
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
