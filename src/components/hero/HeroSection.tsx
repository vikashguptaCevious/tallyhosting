import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Shield,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import { heroContent } from '../../data/content'
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
  return (
    <section id="home" className="relative overflow-x-clip pb-8 lg:pb-10">
      {/* Navbar spacer — visual starts flush below this */}
      <div className="h-16 lg:h-[72px]" />

      {/* Section gradient — soft fade, no hard mid-hero cut */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f5ff] via-[#f5f0ff] to-[#efe9ff] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-[#f8f5ff]/20 to-transparent pointer-events-none" />
      {/* Pink only behind stats bar (low) — keeps full-width join straight */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[6.5rem] bg-[#efe9ff] sm:h-28 lg:h-[7.5rem]" />

      <div className="relative">
        {/* Right visual — chipka top + right edge (desktop only) */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[54%] xl:w-[52%] z-10">
          <HeroVisual />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Mobile order: intro → image → buttons/tags
            Desktop: left column = intro + buttons/tags, right = absolute visual
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-start min-h-0 lg:min-h-[480px] xl:min-h-[500px]">
            <div className="contents lg:flex lg:flex-col lg:pr-6 lg:pt-10 lg:pb-2 lg:text-left">
              {/* Intro — always first */}
              <div className="order-1 text-center lg:text-left pt-7 sm:pt-8 lg:pt-0 pb-2">
                <motion.span
                  {...fadeUp(0.05)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-bold tracking-wide rounded-full mb-4"
                >
                  <Shield className="w-4 h-4" strokeWidth={2.25} />
                  {heroContent.badge}
                </motion.span>

                <motion.h1
                  {...fadeUp(0.1)}
                  className="text-[2.15rem] sm:text-5xl lg:text-[2.85rem] xl:text-[3.35rem] font-extrabold leading-[1.08] tracking-tight text-navy"
                >
                  <span className="block">{heroContent.heading.line1}</span>
                  <span className="block text-primary">{heroContent.heading.line2}</span>
                </motion.h1>

                <motion.p
                  {...fadeUp(0.15)}
                  className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  {heroContent.description}
                </motion.p>
              </div>

              {/* Buttons + tags — mobile: after image (order-3), desktop: under intro */}
              <div className="order-3 text-center lg:text-left">
                <motion.div
                  {...fadeUp(0.2)}
                  className="mt-5 sm:mt-6 lg:mt-7 flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
                >
                  <a
                    href={heroContent.cta.primary.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
                  >
                    {heroContent.cta.primary.label}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={heroContent.cta.secondary.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 text-navy text-sm sm:text-base font-semibold rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    {heroContent.cta.secondary.label}
                  </a>
                </motion.div>

                <motion.div
                  {...fadeUp(0.25)}
                  className="mt-6 sm:mt-7 lg:mt-8 grid grid-cols-4 gap-2 lg:flex lg:flex-wrap lg:items-center lg:justify-start lg:gap-x-7 lg:gap-y-3"
                >
                  {heroContent.featureIcons.map((item) => {
                    const Icon = iconMap[item.icon]
                    return (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1 text-center lg:inline-flex lg:flex-row lg:items-center lg:gap-2 lg:whitespace-nowrap lg:text-left"
                      >
                        <Icon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={1.75} />
                        <span className="text-[10px] leading-tight text-primary font-bold sm:text-xs lg:text-sm">
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
    </section>
  )
}
