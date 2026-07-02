import {
  Server,
  Rocket,
  TrendingUp,
  Wallet,
  Users,
  type LucideIcon,
} from 'lucide-react'
import {
  infrastructureLogos,
  complianceBadges,
  trustHighlights,
} from '../../data/content'
import { AnimatedSection } from '../AnimatedSection'

const highlightIcons: Record<string, LucideIcon> = {
  server: Server,
  rocket: Rocket,
  trending: TrendingUp,
  wallet: Wallet,
  users: Users,
}

export function TrustInfrastructureSection() {
  return (
    <section className="py-12 lg:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
          <AnimatedSection>
            <p className="text-sm font-semibold text-gray-500 mb-6">
              Powered by Trusted Cloud Infrastructure
            </p>
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
              {infrastructureLogos.map((logo) =>
                logo.src ? (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="h-8 lg:h-9 w-auto object-contain opacity-90"
                  />
                ) : (
                  <div
                    key={logo.name}
                    className="flex items-center justify-center h-9 px-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <span className="text-sm font-bold text-navy/70 tracking-wide">
                      {logo.text}
                    </span>
                  </div>
                )
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-sm font-semibold text-gray-500 mb-6">
              Secured. Certified. Compliant.
            </p>
            <div className="flex flex-wrap gap-4">
              {complianceBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-primary/20 bg-primary/5 text-center px-2"
                >
                  <span className="text-xs font-extrabold text-primary leading-tight">
                    {badge.label}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-500 mt-0.5">
                    {badge.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.15} className="mt-12 lg:mt-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {trustHighlights.map((item) => {
              const Icon = highlightIcons[item.icon]
              return (
                <div key={item.title} className="text-center px-2">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-navy mb-1">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
