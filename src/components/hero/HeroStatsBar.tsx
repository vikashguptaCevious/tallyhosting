import { Building2, Handshake, ShieldCheck, Award, type LucideIcon } from 'lucide-react'
import { heroStats } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'
import { AnimatedSection } from '../AnimatedSection'

const iconMap: Record<string, LucideIcon> = {
  building: Building2,
  handshake: Handshake,
  shield: ShieldCheck,
  award: Award,
}

function StatItem({
  value,
  suffix,
  label,
  icon,
  isDecimal,
}: {
  value: number
  suffix: string
  label: string
  icon: string
  isDecimal?: boolean
}) {
  const { count, ref } = useCountUp(isDecimal ? 100 : value)
  const Icon = iconMap[icon]

  const displayValue = isDecimal
    ? (count >= 99 ? '99.99' : `${count}.00`)
    : count.toLocaleString()

  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col items-center justify-center text-center px-4 py-5 min-w-0 border-r border-gray-200 last:border-r-0"
    >
      <Icon className="w-5 h-5 text-primary/60 mb-2" strokeWidth={1.5} />
      <div className="text-xl sm:text-2xl font-extrabold text-navy tabular-nums leading-none">
        {displayValue}
        {suffix}
      </div>
      <p className="mt-1.5 text-xs text-gray-500 font-medium">{label}</p>
    </div>
  )
}

export function HeroStatsBar() {
  return (
    <section className="w-full pb-10 lg:pb-14">
      <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {heroStats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
