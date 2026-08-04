import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Shield,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import { useCountry } from '../../context/CountryContext'
import { DemoRequestModal } from '../DemoRequestModal'
import { HeroVisual } from './HeroVisual'
import { HeroStatsBar } from './HeroStatsBar'

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  shield: Shield,
  shieldCheck: ShieldCheck,
  rocket: Rocket,
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

export function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false)
  const { content, countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'

  return (
    <section
      id="home"
      className={`relative overflow-x-clip pb-8 lg:pb-10 ${
        isSaudi ? 'bg-white' : ''
      }`}
    >
      {/* Navbar spacer — visual starts flush below this */}
      <div className="h-16 lg:h-[72px]" />

      {/* Section gradient — soft fade, no hard mid-hero cut */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isSaudi
            ? 'bg-gradient-to-b from-white via-[#f8fcf9] to-[#edf7f0]'
            : 'bg-gradient-to-b from-[#f8f5ff] via-[#f5f0ff] to-[#efe9ff]'
        }`}
      />
      <div
        className={`absolute inset-0 pointer-events-none ${
          isSaudi
            ? 'bg-gradient-to-r from-white via-white/70 to-[#e9f5ed]/50'
            : 'bg-gradient-to-r from-white/50 via-[#f8f5ff]/20 to-transparent'
        }`}
      />
      {/* Pink only behind stats bar (low) — keeps full-width join straight */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[6.5rem] sm:h-28 lg:h-[7.5rem] ${
          isSaudi ? 'bg-[#edf7f0]' : 'bg-[#efe9ff]'
        }`}
      />

      <div className="relative">
        {/* Right visual — chipka top + right edge (desktop only) */}
        <div
          className={`hidden lg:block absolute top-0 right-0 bottom-0 z-10 ${
            isSaudi ? 'w-[58%] xl:w-[59%]' : 'w-[54%] xl:w-[52%]'
          }`}
        >
          <HeroVisual />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Mobile order: intro → image → buttons/tags
            Desktop: left column = intro + buttons/tags, right = absolute visual
          */}
          <div
            className={`grid grid-cols-1 gap-4 lg:gap-0 items-start min-h-0 lg:min-h-[480px] xl:min-h-[500px] ${
              isSaudi ? 'lg:grid-cols-[46%_54%]' : 'lg:grid-cols-2'
            }`}
          >
            <div className="contents lg:flex lg:flex-col lg:pr-6 lg:pt-10 lg:pb-2 lg:text-left">
              {/* Intro — always first */}
              <div className="order-1 text-center lg:text-left pt-7 sm:pt-8 lg:pt-0 pb-2">
                <motion.span
                  key={`badge-${content.heading.line1}`}
                  {...fadeUp(0.05)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold tracking-wide rounded-full mb-4 ${
                    isSaudi
                      ? 'bg-[#e8f5ec] text-[#087a3c]'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <Shield className="w-4 h-4" strokeWidth={2.25} />
                  {content.badge}
                </motion.span>

                <motion.h1
                  key={`heading-${content.heading.line1}`}
                  {...fadeUp(0.1)}
                  className={`text-[2.15rem] sm:text-5xl font-extrabold leading-[1.14] tracking-tight ${
                    isSaudi
                      ? 'text-[#111827] lg:text-[2.2rem] xl:text-[2.45rem]'
                      : 'text-navy lg:text-[2.85rem] xl:text-[3.35rem]'
                  }`}
                >
                  <span className={`block ${isSaudi ? 'lg:whitespace-nowrap' : ''}`}>
                    {content.heading.line1}
                  </span>
                  <span className={`block ${isSaudi ? 'text-[#07813f]' : 'text-primary'}`}>
                    {content.heading.line2}
                  </span>
                </motion.h1>

                <motion.p
                  key={`desc-${content.heading.line1}`}
                  {...fadeUp(0.15)}
                  className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  {content.description}
                </motion.p>
              </div>

              {/* Buttons + tags — mobile: after image (order-3), desktop: under intro */}
              <div className="order-3 text-center lg:text-left">
                <motion.div
                  {...fadeUp(0.2)}
                  className="mt-5 sm:mt-6 lg:mt-7 flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
                >
                  <button
                    type="button"
                    onClick={() => setDemoOpen(true)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white text-sm sm:text-base font-semibold rounded-xl transition-all hover:shadow-lg ${
                      isSaudi
                        ? 'bg-[#087a3c] hover:bg-[#066b34] hover:shadow-[#087a3c]/25'
                        : 'bg-primary hover:bg-primary-dark hover:shadow-primary/25'
                    }`}
                  >
                    {content.cta.primary.label}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={content.cta.secondary.href}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border text-navy text-sm sm:text-base font-semibold rounded-xl transition-all ${
                      isSaudi
                        ? 'border-[#d7e8dc] hover:border-[#087a3c]/40 hover:bg-[#e8f5ec]'
                        : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    {content.cta.secondary.label}
                  </a>
                </motion.div>

                <motion.div
                  {...fadeUp(0.25)}
                  className="mt-6 sm:mt-7 lg:mt-8 grid grid-cols-4 gap-2 lg:flex lg:flex-wrap lg:items-center lg:justify-start lg:gap-x-7 lg:gap-y-3"
                >
                  {content.featureIcons.map((item) => {
                    const Icon = iconMap[item.icon]
                    return (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1 text-center lg:inline-flex lg:flex-row lg:items-center lg:gap-2 lg:whitespace-nowrap lg:text-left"
                      >
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 ${
                            isSaudi ? 'text-[#087a3c]' : 'text-primary'
                          }`}
                          strokeWidth={1.75}
                        />
                        <span
                          className={`text-[10px] leading-tight font-bold sm:text-xs lg:text-sm ${
                            isSaudi ? 'text-[#087a3c]' : 'text-primary'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    )
                  })}
                </motion.div>
              </div>
            </div>

            {/* Mobile image — between intro and buttons */}
            <div className="order-2 lg:hidden">
              <HeroVisual />
            </div>
          </div>

          <div className="mt-5 sm:mt-6 lg:-mt-8 xl:-mt-10 relative z-30">
            <HeroStatsBar />
          </div>
        </div>
      </div>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  )
}
