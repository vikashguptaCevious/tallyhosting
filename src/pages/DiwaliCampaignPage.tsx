import { useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  Headphones,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import { AnimatedSection } from '../components/AnimatedSection'
import { DiwaliFireworks } from '../components/hero/DiwaliFireworks'
import { FestiveBackground, Lantern, Sparkle, StringLights } from '../components/hero/DiwaliDecor'
import { SlideContent } from '../components/hero/DiwaliHero'
import { diwaliSlides } from '../data/diwaliHero'
import {
  campaignBonuses,
  campaignFaqs,
  campaignPlans,
  campaignSteps,
  DIWALI_CAMPAIGN_PATH,
  DIWALI_CLAIM_PATH,
  savingsPercent,
  type CampaignPlanId,
} from '../data/diwaliCampaign'
import { breadcrumbSchema } from '../lib/seoSchemas'
import { Countdown } from '../components/campaign/OfferCountdown'
import { burstFireworks } from '../lib/fireworks'
import { rememberCampaignSource } from '../lib/campaignLeads'

const IMG = {
  badge: '/diwali/dhamaka-70-off.webp',
  showcase: '/diwali/cloud-showcase.webp',
}

const bonusIcons: Record<(typeof campaignBonuses)[number]['icon'], LucideIcon> = {
  truck: Truck,
  cloud: Cloud,
  shield: ShieldCheck,
  headphones: Headphones,
}

const gradientText = 'bg-gradient-to-r from-[#8a2be2] to-[#a533e8] bg-clip-text text-transparent'
const goldText = 'bg-gradient-to-r from-[#ffd56a] via-[#ffb000] to-[#ffd56a] bg-clip-text text-transparent'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' as const },
})

const scrollToPlans = () =>
  document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function CampaignHero() {
  // ?offer=<slide id> comes from the home hero → show the banner the visitor clicked
  const [params] = useSearchParams()
  const slide = diwaliSlides.find((s) => s.id === params.get('offer')) ?? diwaliSlides[0]

  return (
    <section className="relative overflow-x-clip pb-14 lg:pb-20">
      {/* Navbar spacer */}
      <div className="h-16 lg:h-[72px]" />
      <FestiveBackground />

      <div className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 pt-10 sm:px-6 sm:pt-12 lg:grid-cols-[46%_54%] lg:gap-4 lg:px-8 lg:pt-8">
        <motion.div {...fadeUp(0.05)} className="text-center lg:text-left">
          <h1 className="sr-only">Diwali Dhamaka Offer — Tally on Cloud Hosting</h1>
          <SlideContent slide={slide} />
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
            This Diwali, move your TallyPrime to a secure cloud at festive prices — with free
            migration, Google backup and 24/7 expert support.
          </p>

          <div className="mt-6 flex flex-col items-center gap-6 lg:items-start">
            <button
              type="button"
              onClick={scrollToPlans}
              className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-[#6a2ee8] via-[#7b2ff0] to-[#a533e8] py-2.5 pl-7 pr-2.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(110,45,230,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(110,45,230,0.45)] sm:text-lg"
            >
              Choose Your Diwali Plan
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/80 transition-transform group-hover:translate-y-0.5">
                <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
              </span>
            </button>
            <Countdown />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute inset-[12%] rounded-full bg-[#b9a6ff]/35 blur-3xl" />
          <img
            src={IMG.showcase}
            alt="Tally on cloud with Access Anywhere, 2FA/MFA, Google Backup, Team Collaboration and Encrypted Backup"
            className="relative mx-auto w-full max-w-[560px] lg:max-w-none lg:translate-x-6"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  )
}

function BonusStrip() {
  return (
    <section className="relative z-20 -mt-8 px-4 sm:px-6 lg:-mt-10 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl rounded-3xl border border-[#f0d9a8] bg-white p-5 shadow-[0_20px_50px_rgba(90,40,170,0.12)] sm:p-7">
        <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-[#b8650a]">
          Free with every Diwali plan
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {campaignBonuses.map((b) => {
            const Icon = bonusIcons[b.icon]
            return (
              <div key={b.title} className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:gap-3 lg:text-left">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fff3d6] to-[#ffe2a3] text-[#b8650a]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="mt-2 lg:mt-0">
                  <p className="text-sm font-bold text-navy sm:text-base">{b.title}</p>
                  <p className="mt-0.5 text-xs leading-snug text-gray-500 sm:text-sm">{b.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </AnimatedSection>
    </section>
  )
}

function PlansSection({ claimHref }: { claimHref: (id: CampaignPlanId) => string }) {
  return (
    <section id="plans" data-burst className="scroll-mt-20 px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b8650a]">
            Diwali Dhamaka Prices
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl lg:text-4xl">
            Pick a plan, <span className={gradientText}>lock the festive price</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Prices are per user per month. No payment now — reserve your offer and our team will
            call you.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
          {campaignPlans.map((plan, i) => (
            <AnimatedSection key={plan.id} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl bg-white transition-transform hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-2 border-[#f0a92a] shadow-[0_24px_50px_rgba(110,45,230,0.22)] md:-mt-4'
                    : 'border border-[#e9e0ff] shadow-[0_12px_30px_rgba(90,40,170,0.08)]'
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-[#f59e0b] via-[#ffb000] to-[#f59e0b] py-2 text-center text-xs font-extrabold uppercase tracking-wider text-[#3b1a00]">
                    ✨ Most loved this Diwali
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-navy">{plan.name}</h3>
                      <p className="mt-1 text-xs text-gray-500">{plan.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-[#ffe9ec] px-2.5 py-1 text-xs font-bold text-[#e0245e]">
                      Save {savingsPercent(plan)}%
                    </span>
                  </div>

                  <div className="mt-5">
                    <span className="text-sm font-semibold text-gray-400 line-through decoration-[#e0245e] decoration-2">
                      {plan.currency}
                      {plan.regularPrice}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-extrabold ${gradientText}`}>
                        {plan.currency}
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-500">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="mb-8 mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7b2ff0]" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={claimHref(plan.id)}
                    onClick={() => burstFireworks({ rockets: 2, sparklers: 1 })}
                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#6a2ee8] via-[#7b2ff0] to-[#a533e8] text-white shadow-[0_12px_28px_rgba(110,45,230,0.35)] hover:shadow-[0_16px_34px_rgba(110,45,230,0.45)]'
                        : 'border-2 border-[#7b2ff0]/30 text-[#6a2ee8] hover:bg-[#7b2ff0]/5'
                    }`}
                  >
                    Claim {plan.currency}
                    {plan.price} Offer
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function StepsSection() {
  return (
    <section data-burst className="bg-gradient-to-b from-[#faf7ff] to-[#f4eeff] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="text-center">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Claim your offer in <span className={gradientText}>3 easy steps</span>
          </h2>
        </AnimatedSection>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {campaignSteps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.1} className="text-center">
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd56a] to-[#f59e0b] text-xl font-extrabold text-[#3b1a00] shadow-[0_10px_24px_rgba(245,158,11,0.35)]">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{step.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section data-burst className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="text-center">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Offer FAQs</h2>
        </AnimatedSection>
        <div className="mt-8 space-y-3">
          {campaignFaqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-[#ece4ff] bg-white px-5 py-4 shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                {faq.q}
                <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#7b2ff0] transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section data-burst className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <AnimatedSection className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1f0a48] via-[#3b1478] to-[#6a2ee8] px-6 py-12 text-center sm:px-12 lg:py-14">
        <StringLights className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full opacity-80" />
        <Lantern className="absolute left-4 top-0 hidden h-28 w-10 sm:block" />
        <Lantern delay={0.6} className="absolute right-4 top-0 hidden h-36 w-12 sm:block" />
        <Sparkle className="absolute bottom-6 left-[12%] h-16 w-16 opacity-50" />
        <Sparkle className="absolute right-[14%] top-10 h-12 w-12 opacity-60" />

        <div className="relative">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
            Don't let the <span className={goldText}>festive price</span> slip away
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Join businesses moving their Tally to the cloud this Diwali.
          </p>
          <div className="mt-6 flex justify-center">
            <Countdown dark />
          </div>
          <button
            type="button"
            onClick={scrollToPlans}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffd56a] to-[#f59e0b] px-8 py-3 text-base font-bold text-[#3b1a00] shadow-[0_12px_28px_rgba(245,158,11,0.4)] transition-transform hover:-translate-y-0.5"
          >
            Grab the Offer Now
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </AnimatedSection>
    </section>
  )
}

/** Fire a volley the first time each `[data-burst]` section scrolls into view */
function useSectionBursts() {
  useEffect(() => {
    const sections = document.querySelectorAll('main [data-burst]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.unobserve(entry.target)
          burstFireworks({ rockets: 3, sparklers: 2 })
        }
      },
      { threshold: 0.35 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
}

export function DiwaliCampaignPage() {
  const { search, hash } = useLocation()
  useSectionBursts()

  // First landing keeps its UTM + referrer for the lead, even after moving on to /claim
  useEffect(() => {
    rememberCampaignSource()
  }, [])

  // "Back to Diwali offers" from the claim page lands on #plans
  useEffect(() => {
    if (hash === '#plans') requestAnimationFrame(scrollToPlans)
  }, [hash])

  // Claim page keeps the visitor's UTM / offer params so the lead records the right source
  const claimHref = (id: CampaignPlanId) => {
    const params = new URLSearchParams(search)
    params.set('plan', id)
    return `${DIWALI_CLAIM_PATH}?${params}`
  }

  return (
    <main>
      <Seo
        title="Diwali Dhamaka Offer — Tally on Cloud from ₹299"
        description="Diwali Dhamaka on TallyHosting: Tally on Cloud plans from ₹299/month with free migration, Google backup, security setup and 24/7 support. Limited-time festive offer."
        canonicalPath={DIWALI_CAMPAIGN_PATH}
        image={IMG.badge}
        keywords={['Tally on cloud Diwali offer', 'Tally cloud hosting offer', 'TallyPrime cloud discount']}
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Diwali Dhamaka Offer', path: DIWALI_CAMPAIGN_PATH },
        ])}
      />
      {/* One page-wide fireworks layer — stays in view while scrolling, never blocks clicks.
          Above the navbar (z-50) but below the lead dialog (z-9999) so it never covers the form. */}
      <DiwaliFireworks ambientSparklers className="fixed inset-0 z-[60] h-full w-full" />
      <CampaignHero />
      <BonusStrip />
      <PlansSection claimHref={claimHref} />
      <StepsSection />
      <FaqSection />
      <FinalCta />
    </main>
  )
}
