import { Check, Gift } from 'lucide-react'
import {
  launchOffer,
  pricingPlansIndia,
  pricingPlansSaudi,
} from '../data/content'
import { useCountry } from '../context/CountryContext'
import { AnimatedSection } from './AnimatedSection'

export function PricingSection() {
  const { countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'
  const pricingPlans = isSaudi ? pricingPlansSaudi : pricingPlansIndia
  const valueNote = isSaudi ? launchOffer.valueNoteSaudi : launchOffer.valueNote

  return (
    <section id="pricing" className="pt-16 pb-10 lg:pt-20 lg:pb-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy">
            Simple Plans. Powerful Features.
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-stretch">
          {pricingPlans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div
                className={`relative h-full flex flex-col bg-white rounded-2xl border shadow-sm overflow-hidden ${
                  plan.popular
                    ? isSaudi
                      ? 'border-[#087a3c] shadow-lg shadow-[#087a3c]/10 ring-2 ring-[#087a3c]/20'
                      : 'border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20'
                    : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div
                    className={`text-white text-center text-xs font-bold py-2 tracking-wider uppercase ${
                      isSaudi ? 'bg-[#087a3c]' : 'bg-primary'
                    }`}
                  >
                    Most Popular
                  </div>
                )}

                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-navy">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>
                  <div className="mt-3 mb-6">
                    <span className="text-3xl font-extrabold text-navy">
                      {plan.currency}
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500">/{plan.period}</span>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isSaudi ? 'text-[#087a3c]' : 'text-primary'
                          }`}
                          strokeWidth={2.5}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`block text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
                      plan.popular
                        ? isSaudi
                          ? 'bg-[#087a3c] text-white hover:bg-[#066b34]'
                          : 'bg-primary text-white hover:bg-primary-dark'
                        : isSaudi
                          ? 'border-2 border-[#087a3c]/30 text-[#087a3c] hover:bg-[#087a3c]/5'
                          : 'border-2 border-primary/30 text-primary hover:bg-primary/5'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection delay={0.35}>
            <div
              className={`h-full rounded-2xl p-6 lg:p-8 text-white flex flex-col min-w-[240px] ${
                isSaudi
                  ? 'bg-gradient-to-br from-[#0a9250] to-[#05602e]'
                  : 'bg-gradient-to-br from-primary to-primary-dark'
              }`}
            >
              <span className="inline-block self-start text-[10px] font-bold tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full mb-4">
                {launchOffer.badge}
              </span>

              <h3 className="text-xl font-extrabold leading-tight">{launchOffer.title}</h3>
              <p className="text-2xl font-extrabold text-amber-300 mt-1">{launchOffer.subtitle}</p>

              <ul className="mt-6 space-y-3 flex-1">
                {launchOffer.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-amber-300 flex-shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm font-semibold text-amber-200">{valueNote}</p>

              <div className="mt-4 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Gift className="w-10 h-10 text-white/80" strokeWidth={1.25} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
