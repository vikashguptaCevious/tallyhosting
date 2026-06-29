import { trustedCompanies } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function TrustedBySection() {
  const doubled = [...trustedCompanies, ...trustedCompanies]

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Trusted Over 2500+ Companies
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          <div className="flex animate-marquee">
            {doubled.map((company, i) => (
              <div
                key={`${company}-${i}`}
                className="flex-shrink-0 mx-8 px-8 py-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <span className="text-lg font-bold text-gray-400 whitespace-nowrap tracking-wider">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
