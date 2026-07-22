import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Cloud,
  ShieldPlus,
  UserRoundCog,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { heroContent } from '../../data/content'

const iconMap: Record<string, LucideIcon> = {
  cloud: Cloud,
  shieldPlus: ShieldPlus,
  userShield: UserRoundCog,
  refresh: RefreshCw,
}

function CardContent({
  highlight,
  label,
  icon,
}: {
  highlight: string
  label: string
  icon: string
}) {
  const Icon = iconMap[icon]
  return (
    <>
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-primary" strokeWidth={1.85} />
      </div>
      <div className="min-w-0 leading-tight">
        <p className="text-xs sm:text-sm font-bold text-navy">{highlight}</p>
        <p className="text-[11px] sm:text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </>
  )
}

function FloatingCard({
  delay,
  children,
}: {
  delay: number
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg shadow-primary/15 border border-white/90 px-3 py-2.5 w-[160px] sm:w-[176px]"
    >
      {children}
    </motion.div>
  )
}

export function HeroVisual() {
  const cards = heroContent.floatingCards

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] lg:min-h-full flex items-center justify-center">
        {/* Exact BG — flush top + right, no rounded box */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroContent.heroBgImage}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
          />
          {/* Soft edge blends so the right-side image feels part of the section */}
          <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#f8f5ff] via-[#f8f5ff]/35 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-[#f8f5ff]/50 to-transparent pointer-events-none" />
        </div>

        <img
          src={heroContent.heroAbsoluteImage}
          alt="Secure Tally Cloud VPS"
          className="relative z-10 w-[70%] sm:w-[66%] lg:w-[60%] h-auto object-contain max-h-[240px] sm:max-h-[320px] lg:max-h-[380px] xl:max-h-[410px] translate-x-0 -translate-y-1 sm:-translate-x-8 sm:-translate-y-3 lg:-translate-x-10 lg:-translate-y-4 mx-auto drop-shadow-[0_20px_50px_rgba(123,97,255,0.25)]"
          draggable={false}
        />

        <div className="hidden sm:flex absolute z-20 right-8 xl:right-12 top-[28%] flex-col gap-1.5">
          {cards.map((card, i) => (
            <FloatingCard key={`${card.highlight}-${card.label}`} delay={0.25 + i * 0.06}>
              <CardContent {...card} />
            </FloatingCard>
          ))}
        </div>

        {/* Mobile only: cards remain inside the image area */}
        <div className="sm:hidden absolute z-20 left-1.5 right-1.5 bottom-3 grid grid-cols-4 gap-1">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
              className="flex min-w-0 flex-col items-center justify-center rounded-lg border border-white/90 bg-white/95 px-1 py-1.5 text-center shadow-md backdrop-blur-md"
            >
              <div className="mb-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-primary/10">
                {(() => {
                  const Icon = iconMap[card.icon]
                  return <Icon className="h-3 w-3 text-primary" strokeWidth={1.85} />
                })()}
              </div>
              <div className="min-w-0 w-full leading-tight">
                <p className="truncate text-[8px] font-bold text-navy">{card.highlight}</p>
                <p className="truncate text-[7px] font-medium text-gray-500">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
