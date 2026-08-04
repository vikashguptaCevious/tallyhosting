import { CloudCog, RefreshCw, Check, Shield, type LucideIcon } from 'lucide-react'
import { darkFeatureSection } from '../data/content'
import { useCountry } from '../context/CountryContext'
import { AnimatedSection } from './AnimatedSection'

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  backup: CloudCog,
  continuity: RefreshCw,
}

export function DarkFeatureSection() {
  const { content, countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'

  return (
    <section
      id="solutions"
      className="relative overflow-hidden rounded-[2rem] bg-navy py-16 lg:rounded-[2.5rem] lg:py-24"
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isSaudi
            ? 'bg-gradient-to-br from-navy via-[#0a1f14] to-navy'
            : 'bg-gradient-to-br from-navy via-[#1a1040] to-navy'
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none ${
          isSaudi ? 'bg-[#087a3c]/15' : 'bg-primary/10'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection className="flex justify-center items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full blur-3xl animate-glow-pulse pointer-events-none ${
                  isSaudi ? 'bg-[#087a3c]/25' : 'bg-primary/25'
                }`}
              />
              <img
                key={content.sectionImage}
                src={content.sectionImage}
                alt="Secure Tally Cloud Infrastructure"
                className={`relative z-10 w-full h-auto object-contain ${
                  isSaudi
                    ? 'drop-shadow-[0_0_40px_rgba(8,122,60,0.4)]'
                    : 'drop-shadow-[0_0_40px_rgba(123,97,255,0.35)]'
                }`}
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
                      <Icon
                        className={`w-8 h-8 mb-3 ${isSaudi ? 'text-[#4ade80]' : 'text-primary'}`}
                        strokeWidth={1.5}
                      />
                      <h3 className="text-base font-bold text-white">{col.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isSaudi ? 'text-[#4ade80]' : 'text-primary'
                            }`}
                            strokeWidth={2.5}
                          />
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
