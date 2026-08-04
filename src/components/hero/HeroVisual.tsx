import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Cloud,
  ShieldPlus,
  UserRoundCog,
  RefreshCw,
  Lock,
  type LucideIcon,
} from 'lucide-react'
import { useCountry } from '../../context/CountryContext'

const iconMap: Record<string, LucideIcon> = {
  cloud: Cloud,
  shieldPlus: ShieldPlus,
  userShield: UserRoundCog,
  refresh: RefreshCw,
  lock: Lock,
}

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  )
}

function CardIcon({
  icon,
  isSaudi,
  size = 'md',
}: {
  icon: string
  isSaudi: boolean
  size?: 'sm' | 'md'
}) {
  const sizeClass = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'

  if (icon === 'tally') {
    return (
      <img
        src="/images/tally-optimize-icon.png"
        alt=""
        aria-hidden
        className={`${sizeClass} rounded-[2px] object-cover`}
        draggable={false}
      />
    )
  }
  if (icon === 'google') return <GoogleIcon className={sizeClass} />

  const Icon = iconMap[icon] ?? Cloud
  return (
    <Icon
      className={`${sizeClass} ${isSaudi ? 'text-[#087a3c]' : 'text-primary'}`}
      strokeWidth={1.85}
    />
  )
}

function CardContent({
  highlight,
  label,
  icon,
  isSaudi,
}: {
  highlight: string
  label: string
  icon: string
  isSaudi: boolean
}) {
  return (
    <>
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isSaudi ? 'bg-[#e8f5ec]' : 'bg-primary/10'
        }`}
      >
        <CardIcon icon={icon} isSaudi={isSaudi} />
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
  isSaudi,
}: {
  delay: number
  children: ReactNode
  isSaudi: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`flex items-center gap-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border px-3 py-2.5 w-[168px] sm:w-[188px] ${
        isSaudi
          ? 'shadow-[#087a3c]/15 border-[#dcece1]'
          : 'shadow-primary/15 border-white/90'
      }`}
    >
      {children}
    </motion.div>
  )
}

function FloatingCards({
  cards,
  isSaudi,
}: {
  cards: { highlight: string; label: string; icon: string }[]
  isSaudi: boolean
}) {
  return (
    <>
      <div className="hidden sm:flex absolute z-20 right-8 xl:right-12 top-[28%] flex-col gap-1.5">
        {cards.map((card, i) => (
          <FloatingCard
            key={`${card.highlight}-${card.label}`}
            delay={0.25 + i * 0.06}
            isSaudi={isSaudi}
          >
            <CardContent {...card} isSaudi={isSaudi} />
          </FloatingCard>
        ))}
      </div>

      <div className="sm:hidden absolute z-20 left-1.5 right-1.5 bottom-3 grid grid-cols-4 gap-1">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
            className="flex min-w-0 flex-col items-center justify-center rounded-lg border border-white/90 bg-white/95 px-1 py-1.5 text-center shadow-md backdrop-blur-md"
          >
            <div
              className={`mb-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md ${
                isSaudi ? 'bg-[#e8f5ec]' : 'bg-primary/10'
              }`}
            >
              <CardIcon icon={card.icon} isSaudi={isSaudi} size="sm" />
            </div>
            <div className="min-w-0 w-full leading-tight">
              <p className="truncate text-[8px] font-bold text-navy">{card.highlight}</p>
              <p className="truncate text-[7px] font-medium text-gray-500">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export function HeroVisual() {
  const { content, countryId } = useCountry()
  const cards = content.floatingCards
  const isComposite = content.visualMode === 'composite'
  const isSaudi = countryId === 'saudi-arabia'

  return (
    <div className="relative w-full h-full" key={countryId}>
      <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] lg:min-h-full flex items-center justify-center">
        {isComposite ? (
          <>
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-[#f3faf5] to-[#deefe3]" />
            <div className="absolute inset-y-0 left-0 z-[1] w-[20%] bg-gradient-to-r from-white via-white/75 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 z-[1] h-[16%] bg-gradient-to-t from-[#edf7f0] via-[#edf7f0]/60 to-transparent pointer-events-none" />
            <div className="absolute right-[8%] top-[14%] z-[1] h-52 w-52 rounded-full bg-[#0b8a47]/10 blur-3xl pointer-events-none" />
            <motion.img
              key={content.heroCompositeImage}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              src={content.heroCompositeImage}
              alt="Secure Tally Cloud in Saudi Arabia"
              className="relative z-10 w-[98%] sm:w-[94%] lg:w-[96%] xl:w-full h-auto object-contain max-h-[300px] sm:max-h-[390px] lg:max-h-[445px] xl:max-h-[475px] lg:-translate-x-2 mx-auto drop-shadow-[0_22px_42px_rgba(0,108,53,0.22)]"
              draggable={false}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 z-0">
              <img
                src={content.heroBgImage}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover object-center"
                draggable={false}
              />
              <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#f8f5ff] via-[#f8f5ff]/35 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-[#f8f5ff]/50 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#efe9ff] via-[#efe9ff]/70 to-transparent pointer-events-none" />
            </div>

            <img
              src={content.heroAbsoluteImage}
              alt="Secure Tally Cloud VPS"
              className="relative z-10 w-[70%] sm:w-[66%] lg:w-[60%] h-auto object-contain max-h-[240px] sm:max-h-[320px] lg:max-h-[380px] xl:max-h-[410px] translate-x-0 -translate-y-1 sm:-translate-x-8 sm:-translate-y-3 lg:-translate-x-10 lg:-translate-y-4 mx-auto drop-shadow-[0_20px_50px_rgba(123,97,255,0.25)]"
              draggable={false}
            />
          </>
        )}

        <FloatingCards cards={cards} isSaudi={isSaudi} />
      </div>
    </div>
  )
}
