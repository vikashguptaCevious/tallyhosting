import { motion } from 'framer-motion'
import { Flag, Shield, Lock, MapPin, type LucideIcon } from 'lucide-react'
import { heroContent } from '../../data/content'

const iconMap: Record<string, LucideIcon> = {
  flag: Flag,
  shield: Shield,
  lock: Lock,
  map: MapPin,
}

export function TrustCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl shadow-primary/10 border border-gray-100 p-5 xl:p-6 ${className}`}
    >
      <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-gray-100">
        <img
          src={heroContent.makeInIndiaLogo}
          alt="Make in India"
          className="h-16 w-16 xl:h-[4.5rem] xl:w-[4.5rem] object-contain flex-shrink-0 bg-transparent"
        />
        <p className="text-sm font-bold tracking-wide text-gray-700 leading-tight">
          MAKE IN INDIA
        </p>
      </div>

      <ul className="space-y-4">
        {heroContent.trustCardFeatures.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <li key={item.title} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-[13px] xl:text-sm font-semibold text-gray-600 leading-snug">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11px] xl:text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function HeroCenterImage() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <motion.img
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        src={heroContent.heroImage}
        alt="Secure Tally Cloud Hosting"
        className="relative z-10 w-full h-auto object-contain max-h-[460px] sm:max-h-[540px] lg:max-h-[700px] xl:max-h-[760px] 2xl:max-h-[820px]"
        draggable={false}
      />
    </div>
  )
}

export function HeroVisualMobile() {
  return (
    <div className="relative w-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-sm mx-auto"
      >
        <TrustCard />
      </motion.div>
      <HeroCenterImage />
    </div>
  )
}
