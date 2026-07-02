import { ArrowRight, Users, Handshake, ShieldCheck, Headphones, Award, Gift } from 'lucide-react'
import { heroStats, partnerOffer } from '../../data/content'
import { useCountUp } from '../../hooks/useCountUp'
import { AnimatedSection } from '../AnimatedSection'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  handshake: Handshake,
  shield: ShieldCheck,
  headphones: Headphones,
  award: Award,
}

function StatItem({
  value,
  suffix,
  label,
  icon,
}: {
  value: number
  suffix: string
  label: string
  icon: string
}) {
  const { count, ref } = useCountUp(value)
  const Icon = iconMap[icon]

  return (
    <div
      ref={ref}
      className="flex flex-1 flex-col items-center justify-center text-center px-3 sm:px-4 py-4 lg:py-5 min-w-0 lg:border-r lg:border-white/10 lg:last:border-r-0"
    >
      <Icon className="w-5 h-5 text-white/50 mb-2" strokeWidth={1.5} />
      <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tabular-nums leading-none whitespace-nowrap">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-1.5 text-[11px] sm:text-xs text-white/60 font-medium leading-snug">
        {label}
      </p>
    </div>
  )
}

export function HeroStatsBar() {
  return (
    <section id="pricing" className="w-full pb-10 lg:pb-14">
      <AnimatedSection className="w-full">
        <div className="w-full bg-gradient-to-r from-navy via-[#1e2a4a] to-[#2a1f5c] overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch">
            <div className="flex-1 min-w-0 px-2 sm:px-4 lg:px-6 py-4 lg:py-5">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap items-center justify-center lg:justify-between w-full">
                {heroStats.map((stat) => (
                  <StatItem key={stat.label} {...stat} />
                ))}
              </div>
            </div>

            <div className="relative shrink-0 w-full lg:w-[min(100%,420px)] xl:w-[440px] bg-gradient-to-br from-primary via-[#7b5cf5] to-primary-dark px-6 py-7 lg:px-8 lg:py-8 flex items-center border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-lg sm:text-xl font-bold text-white leading-snug">
                  {partnerOffer.title}
                </p>
                <a
                  href={partnerOffer.cta.href}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-bold rounded-full hover:bg-primary-light transition-all duration-300 shadow-md"
                >
                  {partnerOffer.cta.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="relative hidden sm:flex flex-col items-center justify-center shrink-0 w-28 lg:w-32">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Gift className="w-10 h-10 lg:w-12 lg:h-12 text-white/70" strokeWidth={1.25} />
                </div>
                <span className="absolute -right-1 top-2 rotate-12 bg-amber-400 text-amber-950 text-[9px] font-extrabold uppercase tracking-wide px-2.5 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  Exclusive Launch Offer
                </span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
