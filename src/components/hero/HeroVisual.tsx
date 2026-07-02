import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Server, Globe, Users, CloudDownload, Check } from 'lucide-react'
import { heroContent } from '../../data/content'

const cardBase =
  'absolute z-20 bg-white/90 backdrop-blur-md rounded-xl shadow-lg shadow-primary/10 border border-white/60'

function TrendGraph({ variant }: { variant: 'up' | 'wave' }) {
  const path =
    variant === 'up'
      ? 'M2 18 L8 14 L14 16 L20 10 L28 12 L34 6'
      : 'M2 14 L8 12 L14 14 L20 10 L26 12 L34 8'

  return (
    <svg viewBox="0 0 36 20" className="w-full h-5 mt-2" fill="none" aria-hidden>
      <path
        d={path}
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FloatingCard({
  className,
  delay,
  children,
}: {
  className: string
  delay: number
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`${cardBase} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export function HeroVisual() {
  return (
    <div className="relative w-full flex items-center justify-center min-h-0 sm:min-h-[480px] lg:min-h-[560px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        src={heroContent.heroImage}
        alt="Secure Tally Cloud Infrastructure"
        className="relative z-10 w-full h-auto object-contain max-h-[320px] sm:max-h-[600px] lg:max-h-[680px] xl:max-h-[740px] sm:scale-105 lg:scale-110 animate-hero-float"
        draggable={false}
      />

      {/* Uptime - top right */}
      <FloatingCard className="top-[16%] right-0 sm:right-2 w-[130px] sm:w-[148px] px-3 py-2.5 sm:px-3.5 sm:py-3" delay={0.55}>
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Server className="w-4 h-4 text-primary" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Uptime</p>
            <p className="text-sm sm:text-base font-bold text-primary leading-tight">99.99%</p>
          </div>
        </div>
        <TrendGraph variant="up" />
      </FloatingCard>

      {/* Secure Access - middle right */}
      <FloatingCard className="top-[48%] right-[-4px] sm:right-0 w-[118px] sm:w-[132px] px-3 py-2.5 sm:px-3.5 sm:py-3" delay={0.65}>
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Globe className="w-4 h-4 text-primary" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-semibold text-navy leading-tight">Secure Access</p>
            <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Anywhere</p>
          </div>
        </div>
      </FloatingCard>

      {/* Users Online - top left (mirrors Uptime) */}
      <FloatingCard className="top-[16%] left-0 sm:left-2 w-[130px] sm:w-[148px] px-3 py-2.5 sm:px-3.5 sm:py-3" delay={0.75}>
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-primary" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">Users Online</p>
            <p className="text-sm sm:text-base font-bold text-primary leading-tight">128</p>
          </div>
        </div>
        <TrendGraph variant="wave" />
      </FloatingCard>

      {/* Backup - middle left (mirrors Secure Access) */}
      <FloatingCard className="top-[48%] left-[-4px] sm:left-0 w-[118px] sm:w-[132px] px-3 py-2.5 sm:px-3.5 sm:py-3" delay={0.6}>
        <div className="flex items-start gap-2">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CloudDownload className="w-4 h-4 text-primary" strokeWidth={1.75} />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center ring-2 ring-white">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-semibold text-navy leading-tight">Backup</p>
            <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Protected</p>
          </div>
        </div>
      </FloatingCard>
    </div>
  )
}
