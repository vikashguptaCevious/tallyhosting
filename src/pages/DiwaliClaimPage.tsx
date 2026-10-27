import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronRight,
  Clock,
  Gift,
  Headphones,
  PartyPopper,
  PhoneCall,
  Rocket,
  ShieldCheck,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import { DiwaliFireworks } from '../components/hero/DiwaliFireworks'
import { FestiveBackground } from '../components/hero/DiwaliDecor'
import { CampaignLeadForm } from '../components/campaign/CampaignLeadForm'
import { Countdown } from '../components/campaign/OfferCountdown'
import {
  campaignBonuses,
  campaignPlans,
  DIWALI_CAMPAIGN_PATH,
  DIWALI_CLAIM_PATH,
  savingsPercent,
  type CampaignPlan,
  type CampaignPlanId,
} from '../data/diwaliCampaign'
import type { CampaignLeadInput } from '../lib/campaignLeads'
import { burstFireworks } from '../lib/fireworks'

const gradientText = 'bg-gradient-to-r from-[#8a2be2] to-[#a533e8] bg-clip-text text-transparent'

const isPlanId = (value: string | null): value is CampaignPlanId =>
  campaignPlans.some((p) => p.id === value)

const nextSteps = [
  { icon: PhoneCall, title: 'Expert call', text: 'A Tally cloud expert calls you within a few hours to confirm your plan.' },
  { icon: Rocket, title: 'Free migration', text: 'We move your Tally data to the cloud — no downtime for your team.' },
  { icon: ShieldCheck, title: 'Go live', text: 'Your team works on Tally from anywhere, secured and backed up daily.' },
]

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = ['Choose plan', 'Your details', 'Expert callback']
  return (
    <ol className="mx-auto mt-8 flex max-w-xl items-center justify-center">
      {steps.map((label, i) => {
        const n = i + 1
        const done = n < step
        const current = n === step
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  done
                    ? 'bg-[#7b2ff0] text-white'
                    : current
                      ? 'bg-gradient-to-br from-[#ffd56a] to-[#f59e0b] text-[#3b1a00] shadow-[0_6px_16px_rgba(245,158,11,0.4)]'
                      : 'border-2 border-[#d9ccff] bg-white text-gray-400'
                }`}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : n}
              </span>
              <span
                className={`whitespace-nowrap text-xs font-semibold sm:text-sm ${
                  current || done ? 'text-navy' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {n < steps.length && (
              <span
                className={`mx-2 mb-6 h-0.5 flex-1 rounded-full sm:mx-3 ${
                  done ? 'bg-[#7b2ff0]' : 'bg-[#e3d9ff]'
                }`}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function SectionTitle({ n, title, text }: { n: number; title: string; text?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#f1ebff] text-sm font-bold text-[#6a2ee8]">
        {n}
      </span>
      <div>
        <h2 className="text-lg font-bold text-navy sm:text-xl">{title}</h2>
        {text && <p className="mt-0.5 text-sm text-gray-500">{text}</p>}
      </div>
    </div>
  )
}

function PlanPicker({
  selected,
  onSelect,
}: {
  selected: CampaignPlanId
  onSelect: (id: CampaignPlanId) => void
}) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Plan">
      {campaignPlans.map((p) => {
        const active = p.id === selected
        return (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(p.id)}
            className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
              active
                ? 'border-[#7b2ff0] bg-[#faf7ff] shadow-[0_10px_24px_rgba(110,45,230,0.15)]'
                : 'border-gray-200 bg-white hover:border-[#c9b5ff]'
            }`}
          >
            {p.popular && (
              <span className="absolute -top-2.5 right-3 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ffb000] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#3b1a00]">
                Most loved
              </span>
            )}
            <div className="flex items-center justify-between">
              <span className="font-bold text-navy">{p.name}</span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  active ? 'border-[#7b2ff0]' : 'border-gray-300'
                }`}
              >
                {active && <span className="h-2.5 w-2.5 rounded-full bg-[#7b2ff0]" />}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-gray-500">{p.subtitle}</p>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className={`text-2xl font-extrabold ${gradientText}`}>
                {p.currency}
                {p.price}
              </span>
              <span className="text-xs text-gray-500">/{p.period}</span>
            </div>
            <p className="mt-0.5 text-xs">
              <span className="text-gray-400 line-through">
                {p.currency}
                {p.regularPrice}
              </span>{' '}
              <span className="font-semibold text-[#e0245e]">Save {savingsPercent(p)}%</span>
            </p>
          </button>
        )
      })}
    </div>
  )
}

function OrderSummary({ plan }: { plan: CampaignPlan }) {
  const discount = plan.regularPrice - plan.price
  return (
    <aside className="overflow-hidden rounded-2xl border border-[#ece4ff] bg-white shadow-[0_16px_40px_rgba(90,40,170,0.1)] lg:sticky lg:top-24">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2a0f5c] via-[#4b1a8f] to-[#7b2ff0] px-6 py-5 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#ffc443]/25 blur-2xl" />
        <p className="relative text-xs font-bold uppercase tracking-widest text-[#ffd56a]">
          Your Diwali offer
        </p>
        <p className="relative mt-1 text-xl font-extrabold">Tally on Cloud — {plan.name}</p>
        <p className="relative text-sm text-white/70">{plan.subtitle}</p>
      </div>

      <dl className="space-y-3 px-6 py-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">Regular price</dt>
          <dd className="text-gray-500 line-through">
            {plan.currency}
            {plan.regularPrice}/mo
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Diwali discount ({savingsPercent(plan)}%)</dt>
          <dd className="font-semibold text-emerald-600">
            − {plan.currency}
            {discount}/mo
          </dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-dashed border-gray-200 pt-3">
          <dt className="font-semibold text-navy">Festive price</dt>
          <dd>
            <span className={`text-2xl font-extrabold ${gradientText}`}>
              {plan.currency}
              {plan.price}
            </span>
            <span className="text-gray-500">/{plan.period}</span>
          </dd>
        </div>
      </dl>

      <div className="border-t border-gray-100 px-6 py-5">
        <p className="flex items-center gap-2 text-sm font-bold text-navy">
          <Gift className="h-4 w-4 text-[#b8650a]" />
          Free with this plan
        </p>
        <ul className="mt-3 space-y-2">
          {campaignBonuses.map((b) => (
            <li key={b.title} className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="h-4 w-4 flex-shrink-0 text-emerald-500" strokeWidth={3} />
              {b.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 bg-[#fdfaf3] px-6 py-5">
        <Countdown />
      </div>
    </aside>
  )
}

export function DiwaliClaimPage() {
  const [params, setParams] = useSearchParams()
  const planParam = params.get('plan')
  const planId: CampaignPlanId = isPlanId(planParam) ? planParam : 'plus'
  const plan = campaignPlans.find((p) => p.id === planId) ?? campaignPlans[0]
  const [submitted, setSubmitted] = useState<CampaignLeadInput | null>(null)

  // Plan lives in the URL so a shared / refreshed link keeps the same selection
  const changePlan = (id: CampaignPlanId) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('plan', id)
        return next
      },
      { replace: true },
    )

  const handleSuccess = (customer: CampaignLeadInput) => {
    setSubmitted(customer)
    burstFireworks({ rockets: 6, sparklers: 3 })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Back link keeps UTM / offer params, drops the plan
  const backParams = new URLSearchParams(params)
  backParams.delete('plan')
  const backQuery = backParams.toString()
  const backHref = `${DIWALI_CAMPAIGN_PATH}${backQuery ? `?${backQuery}` : ''}`

  return (
    <main className="bg-[#fbf9ff]">
      <Seo
        title="Claim Your Diwali Offer"
        description="Reserve your Diwali Dhamaka price on Tally on Cloud. No payment now — our expert will call you to confirm."
        canonicalPath={DIWALI_CLAIM_PATH}
        noindex
      />

      {/* Page header */}
      <section className="relative overflow-x-clip pb-12">
        <div className="h-16 lg:h-[72px]" />
        <FestiveBackground />
        <DiwaliFireworks ambientSparklers className="absolute inset-0 z-[5] h-full w-full" />

        <div className="relative z-20 mx-auto max-w-6xl px-4 pt-8 text-center sm:px-6 lg:px-8 lg:pt-10">
          {/* Soft glow behind the copy so fireworks never hurt readability */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 inset-y-2 -z-10 mx-auto max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,251,255,0.92)_35%,rgba(253,251,255,0)_72%)]"
          />
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#6a2ee8]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={backHref} className="hover:text-[#6a2ee8]">
              Diwali Dhamaka Offer
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-navy">Claim offer</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#1a1773] sm:text-4xl lg:text-5xl"
          >
            {submitted ? (
              <>
                Your offer is <span className={gradientText}>reserved!</span>
              </>
            ) : (
              <>
                Claim Your <span className={gradientText}>Diwali Dhamaka</span> Offer
              </>
            )}
          </motion.h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-600 sm:text-lg">
            {submitted
              ? 'Thank you! Our Tally cloud expert will call you shortly to get you started.'
              : 'Pick your plan, share a few details and lock the festive price — no payment needed today.'}
          </p>

          <Stepper step={submitted ? 3 : 2} />
        </div>
      </section>

      {/* Checkout body */}
      <section className="relative z-20 mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-[#ece4ff] bg-white p-5 shadow-[0_16px_40px_rgba(90,40,170,0.08)] sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd56a] to-[#f59e0b] text-white shadow-[0_10px_24px_rgba(245,158,11,0.4)]">
                  <PartyPopper className="h-8 w-8" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-navy">
                  Thank you, {submitted.name.split(' ')[0]}!
                </h2>
                <p className="mt-2 max-w-md text-gray-600">
                  Your <strong>{plan.name}</strong> plan at{' '}
                  <strong>
                    {plan.currency}
                    {plan.price}/{plan.period}
                  </strong>{' '}
                  is reserved. We'll call you on <strong>{submitted.mobile}</strong> and send
                  details to <strong>{submitted.email}</strong>.
                </p>
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#f6f2ff] px-4 py-3 text-sm text-[#4b1a8f]">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  Expect a call from our expert within a few hours
                </div>
                <Link
                  to={backHref}
                  className="mt-7 rounded-xl bg-gradient-to-r from-[#6a2ee8] to-[#a533e8] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(110,45,230,0.3)]"
                >
                  Back to Diwali offers
                </Link>
              </div>
            ) : (
              <>
                <SectionTitle n={1} title="Choose your plan" text="You can change it anytime before our call." />
                <PlanPicker selected={planId} onSelect={changePlan} />

                <div className="my-8 border-t border-gray-100" />

                <SectionTitle
                  n={2}
                  title="Your details"
                  text="We'll use these to call you and set up your account."
                />
                <div className="mt-5">
                  <CampaignLeadForm plan={plan} onSuccess={handleSuccess} />
                </div>
              </>
            )}
          </div>

          <OrderSummary plan={plan} />
        </div>
      </section>

      {/* What happens next */}
      <section className="border-t border-[#efe8ff] bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-extrabold text-navy sm:text-3xl">
            What happens <span className={gradientText}>next?</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {nextSteps.map((s) => (
              <div key={s.title} className="rounded-2xl border border-[#f0eaff] bg-[#fcfaff] p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fff3d6] to-[#ffe2a3] text-[#b8650a]">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Headphones className="h-4 w-4 text-[#7b2ff0]" />
            Questions? Our support team is available 24/7.
          </p>
        </div>
      </section>
    </main>
  )
}
