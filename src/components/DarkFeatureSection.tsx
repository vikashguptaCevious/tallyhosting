import { CloudCog, RefreshCw, Check, Shield, type LucideIcon } from 'lucide-react'
import { darkFeatureSection, heroContent } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  backup: CloudCog,
  continuity: RefreshCw,
}

export function DarkFeatureSection() {
  return (
    <section id="solutions" className="py-16 lg:py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#1a1040] to-navy pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection className="flex justify-center items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-primary/25 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
              <img
                src={heroContent.heroImage}
                alt="Secure Tally Cloud Infrastructure"
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(123,97,255,0.35)]"
                draggable={false}
              />
            </div>
          </AnimatedSection>

          <div>
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-10">
                {darkFeatureSection.heading.prefix}
                <span className="text-accent">{darkFeatureSection.heading.highlight}</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {darkFeatureSection.columns.map((col, i) => {
                const Icon = iconMap[col.icon]
                return (
                  <AnimatedSection key={col.title} delay={i * 0.1}>
                    <div className="mb-4">
                      <Icon className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                      <h3 className="text-base font-bold text-white">{col.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
