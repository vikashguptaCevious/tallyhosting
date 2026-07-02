import { motion } from 'framer-motion'
import {
  ArrowRight,
  Play,
  Shield,
  Server,
  Cloud,
  Lock,
  RefreshCw,
  Activity,
  type LucideIcon,
} from 'lucide-react'
import { heroContent } from '../../data/content'
import { HeroVisual } from './HeroVisual'

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  server: Server,
  cloud: Cloud,
  lock: Lock,
  refresh: RefreshCw,
  activity: Activity,
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export function HeroSection() {
  return (
    <section id="home" className="relative bg-white overflow-hidden pt-20 pb-10 lg:pt-22 lg:pb-14">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/30 via-white to-white pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center">
          {/* Top text — mobile: 1st | desktop: left column top */}
          <div className="order-1 text-center lg:text-left">
            <motion.span
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full mb-5"
            >
              <span>🇮🇳</span>
              {heroContent.badge}
            </motion.span>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-[1.75rem] sm:text-4xl lg:text-[2.35rem] xl:text-[2.65rem] font-extrabold leading-[1.15] tracking-tight text-navy"
            >
              {heroContent.heading.taglines.map((line) => (
                <span key={line.highlight} className="block">
                  {line.prefix}
                  <span className={line.color}>{line.highlight}</span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {heroContent.description}
            </motion.p>
          </div>

          {/* VPS image — mobile: 2nd | desktop: right column */}
          <div className="order-2 relative lg:row-span-2 -my-2 sm:my-0">
            <HeroVisual />
          </div>

          {/* Bottom content — mobile: 3rd | desktop: left column bottom */}
          <div className="order-3 text-center lg:text-left max-lg:-mt-2 sm:mt-0">
            <motion.p {...fadeUp(0.35)} className="text-sm sm:text-base text-gray-700">
              {heroContent.audience.prefix}
              <span className="font-bold text-navy">{heroContent.audience.highlight}</span>
            </motion.p>

            <motion.div
              {...fadeUp(0.4)}
              className="mt-7 grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-xl mx-auto lg:mx-0"
            >
              {heroContent.featureIcons.map((item) => {
                const Icon = iconMap[item.icon]
                return (
                  <div key={item.label} className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-gray-600 font-medium text-center leading-tight">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
            >
              <a
                href={heroContent.cta.primary.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                {heroContent.cta.primary.label}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={heroContent.cta.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-primary/30 text-primary text-sm font-semibold rounded-xl hover:bg-primary/5 transition-all"
              >
                <Play className="w-4 h-4 fill-primary" />
                {heroContent.cta.secondary.label}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
