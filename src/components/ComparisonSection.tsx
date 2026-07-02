import { X, Check } from 'lucide-react'
import { comparisonData, heroContent } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function ComparisonSection() {
  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy">
            Why Choose <span className="text-primary">TallyHosting</span> Over Others?
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center">
          <AnimatedSection delay={0.1}>
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                {/* Typical Cloud Provider */}
                <div>
                  <div className="bg-rose-50 px-3 py-3.5 sm:px-4 sm:py-4 text-center border-b border-rose-100">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-rose-600 leading-tight">
                      {comparisonData.typical.title}
                    </h3>
                  </div>
                  <ul className="p-3 sm:p-5 pr-2 sm:pr-3 space-y-2.5 sm:space-y-3">
                    {comparisonData.typical.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-sm text-gray-700 leading-snug"
                      >
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* VS badge — center column */}
                <div className="flex items-center justify-center px-3 sm:px-4 border-x border-gray-100 self-stretch">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-extrabold text-primary text-sm sm:text-lg">VS</span>
                  </div>
                </div>

                {/* TallyHosting */}
                <div>
                  <div className="bg-emerald-50 px-3 py-3.5 sm:px-4 sm:py-4 text-center border-b border-emerald-100">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-emerald-600 leading-tight">
                      {comparisonData.tallyHosting.title}
                    </h3>
                  </div>
                  <ul className="p-3 sm:p-5 pl-2 sm:pl-3 space-y-2.5 sm:space-y-3">
                    {comparisonData.tallyHosting.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-sm text-gray-700 leading-snug"
                      >
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="hidden lg:flex justify-center items-center">
            <img
              src={heroContent.heroImage}
              alt="TallyHosting Infrastructure"
              className="w-full max-w-[420px] xl:max-w-[480px] h-auto object-contain"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
