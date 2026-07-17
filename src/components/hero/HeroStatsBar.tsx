import {
  Users,
  Award,
  Handshake,
  CircleCheck,
  Globe,
  Headphones,
  type LucideIcon,
} from 'lucide-react'
import { heroStats, heroPartners } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'
import { AnimatedSection } from '../AnimatedSection'

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  award: Award,
  handshake: Handshake,
  check: CircleCheck,
  globe: Globe,
}

function StatItem({
  value,
  suffix,
  label,
  icon,
  isDecimal,
  decimals = 1,
}: {
  value: number
  suffix: string
  label: string
  icon: string
  isDecimal?: boolean
  decimals?: number
}) {
  const target = isDecimal ? Math.round(value * Math.pow(10, decimals)) : value
  const { count, ref } = useCountUp(target)
  const Icon = iconMap[icon]

  const displayValue = isDecimal
    ? (count / Math.pow(10, decimals)).toFixed(decimals)
    : count.toLocaleString()

  return (
    <div
      ref={ref}
      className="flex flex-1 items-center justify-center gap-2.5 px-2.5 lg:px-3 py-4 sm:py-5 border-r border-gray-100 last:border-r-0 min-w-0"
    >
      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 lg:w-[18px] lg:h-[18px] text-primary" strokeWidth={1.75} />
      </div>
      <div className="text-left whitespace-nowrap">
        <div className="text-base lg:text-lg font-extrabold text-navy tabular-nums leading-none">
          {displayValue}
          {suffix}
        </div>
        <p className="mt-1 text-[11px] lg:text-xs text-gray-600 font-bold whitespace-nowrap">
          {label}
        </p>
      </div>
    </div>
  )
}

function MobileSupportStat() {
  return (
    <div className="flex flex-1 items-center justify-center gap-2.5 px-2.5 py-4 sm:py-5 border-r border-gray-100 min-w-0 lg:hidden">
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Headphones className="w-4 h-4 text-primary" strokeWidth={1.75} />
      </div>
      <div className="text-left whitespace-nowrap">
        <div className="text-base font-extrabold text-navy leading-none">24×7</div>
        <p className="mt-1 text-[11px] text-gray-600 font-bold whitespace-nowrap">Support</p>
      </div>
    </div>
  )
}

function PartnerBadge({ label, name }: { label: string; name: string }) {
  return (
    <div className="flex items-center gap-1.5 px-1.5 lg:px-2 py-1.5 flex-shrink-0">
      <span className="text-[11px] lg:text-xs text-gray-400 font-semibold whitespace-nowrap">
        {label}
      </span>
      {name === 'AWS' ? (
        <img
          src="/images/amzone.png"
          alt="AWS"
          className="h-7 lg:h-8 w-auto object-contain"
          draggable={false}
        />
      ) : (
        <img
          src="/images/cloudorc.webp"
          alt="CloudOrc"
          className="h-5 lg:h-6 w-auto object-contain"
          draggable={false}
        />
      )}
    </div>
  )
}

export function HeroStatsBar() {
  return (
    <AnimatedSection>
      <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-[0_10px_36px_rgba(123,97,255,0.1)] overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-stretch flex-1 min-w-0">
            {heroStats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
            <MobileSupportStat />
          </div>

          <div className="flex items-center justify-center gap-1.5 lg:gap-2 px-3 lg:px-4 py-3 lg:py-0 border-t lg:border-t-0 lg:border-l border-gray-100 flex-shrink-0">
            {heroPartners.map((partner) => (
              <PartnerBadge key={partner.name} {...partner} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
