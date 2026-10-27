import { Link } from 'react-router-dom'
import { Check, ChevronRight, Gift, Sparkles } from 'lucide-react'
import {
  launchOffer,
  pricingPlansIndia,
  pricingPlansSaudi,
} from '../data/content'
import {
  campaignBonuses,
  campaignPlans,
  DIWALI_CAMPAIGN_PATH,
  DIWALI_CLAIM_PATH,
  savingsPercent,
} from '../data/diwaliCampaign'
import { DIWALI_OFFER } from '../config/env'
import { useCountry } from '../context/CountryContext'
import { AnimatedSection } from './AnimatedSection'

/** One card's worth of display data — regular plans and Diwali plans both map to this */
type PlanCard = {
  name: string
  subtitle: string
  currency: string
  price: number
  period: string
  features: string[]
  popular: boolean
  cta: string
  /** Diwali only: struck-through price + savings badge */
  regularPrice?: number
  savePercent?: number
  /** Diwali only: claim page link (regular plans scroll to #contact) */
  to?: string
}

export function PricingSection() {
  const { countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'
  const isDiwali = DIWALI_OFFER && !isSaudi

  const cards: PlanCard[] = isDiwali
    ? campaignPlans.map((p) => ({
        name: p.name,
        subtitle: p.subtitle,
        currency: p.currency,
        price: p.price,
        period: p.period,
        features: p.features,
        popular: Boolean(p.popular),
        cta: `Claim ${p.currency}${p.price} Offer`,
        regularPrice: p.regularPrice,
        savePercent: savingsPercent(p),
        to: `${DIWALI_CLAIM_PATH}?plan=${p.id}`,
      }))
    : (isSaudi ? pricingPlansSaudi : pricingPlansIndia)
  const valueNote = isSaudi ? launchOffer.valueNoteSaudi : launchOffer.valueNote

  const ctaClass = (popular: boolean) =>
    `group flex items-center justify-center gap-1.5 text-center py-3 rounded-xl text-sm font-semibold transition-colors ${
      popular
        ? isSaudi
          ? 'bg-[#087a3c] text-white hover:bg-[#066b34]'
          : 'bg-primary text-white hover:bg-primary-dark'
        : isSaudi
          ? 'border-2 border-[#087a3c]/30 text-[#087a3c] hover:bg-[#087a3c]/5'
          : 'border-2 border-primary/30 text-primary hover:bg-primary/5'
    }`

  return (
    <section id="pricing" className="pt-16 pb-10 lg:pt-20 lg:pb-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 lg:mb-16">
          {isDiwali && (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#fff3d6] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#b8650a] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Diwali Dhamaka Prices
            </p>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy">
            Simple Plans. Powerful Features.
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_1fr_1fr_auto] gap-6 items-stretch">
          {cards.map((plan, i) => (
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
                    {isDiwali ? '✨ Most Loved This Diwali' : 'Most Popular'}
                  </div>
                )}

                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-navy">{plan.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>
                    </div>
                    {plan.savePercent !== undefined && (
                      <span className="flex-shrink-0 rounded-full bg-[#ffe9ec] px-2.5 py-1 text-xs font-bold text-[#e0245e]">
                        Save {plan.savePercent}%
                      </span>
                    )}
                  </div>
                  <div className="mt-3 mb-6">
                    {plan.regularPrice !== undefined && (
                      <span className="block text-sm font-semibold text-gray-400 line-through decoration-[#e0245e] decoration-2">
                        {plan.currency}
                        {plan.regularPrice}
                      </span>
                    )}
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

                  {plan.to ? (
                    <Link to={plan.to} className={ctaClass(plan.popular)}>
                      {plan.cta}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <a href="#contact" className={ctaClass(plan.popular)}>
                      {plan.cta}
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection delay={0.35}>
            {isDiwali ? (
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a0f5c] via-[#4b1a8f] to-[#7b2ff0] p-6 lg:p-8 text-white flex flex-col min-w-[240px]">
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#ffc443]/25 blur-2xl" />
                <span className="relative inline-block self-start text-[10px] font-bold tracking-widest uppercase bg-[#ffc443]/20 text-[#ffd56a] px-3 py-1 rounded-full mb-4">
                  Diwali Dhamaka
                </span>

                <h3 className="relative text-xl font-extrabold leading-tight">Free with every plan</h3>
                <p className="relative text-2xl font-extrabold text-[#ffd56a] mt-1">
                  Up to {Math.max(...campaignPlans.map(savingsPercent))}% OFF
                </p>

                <ul className="relative mt-6 space-y-3 flex-1">
                  {campaignBonuses.map((b) => (
                    <li key={b.title} className="flex items-center gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-[#ffd56a] flex-shrink-0" strokeWidth={2.5} />
                      {b.title}
                    </li>
                  ))}
                </ul>

                <Link
                  to={DIWALI_CAMPAIGN_PATH}
                  className="relative mt-6 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ffd56a] to-[#f59e0b] py-3 text-sm font-bold text-[#3b1a00] transition-transform hover:-translate-y-0.5"
                >
                  View Diwali Offer
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
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
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
