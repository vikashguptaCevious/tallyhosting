import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Ban,
  Check,
  Cloud,
  Eye,
  Lock,
  Mail,
  Shield,
  SlidersHorizontal,
  Smartphone,
} from 'lucide-react'
import { useCountry } from '../context/CountryContext'
import {
  privacyHighlights,
  privacyPolicyMeta,
  privacySectionSummary,
  privacySections,
  type PrivacySection,
} from '../data/privacyPolicy'

function HeroCloud({ className }: { className?: string }) {
  return (
    <Cloud
      className={className}
      strokeWidth={1.25}
      aria-hidden
    />
  )
}

function HighlightIcon({ icon }: { icon: (typeof privacyHighlights)[number]['icon'] }) {
  const className = 'h-5 w-5 text-primary'
  switch (icon) {
    case 'shield':
      return <Shield className={className} aria-hidden />
    case 'ban':
      return <Ban className={className} aria-hidden />
    case 'sliders':
      return <SlidersHorizontal className={className} aria-hidden />
    case 'eye':
      return <Eye className={className} aria-hidden />
    default:
      return <Shield className={className} aria-hidden />
  }
}

function BulletList({ items, isSaudi }: { items: string[]; isSaudi: boolean }) {
  const checkClass = isSaudi ? 'text-[#087a3c]' : 'text-primary'
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-gray-600">
          <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${checkClass}`} strokeWidth={2.5} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SectionBlock({
  section,
  isSaudi,
  enhanced,
}: {
  section: PrivacySection
  isSaudi: boolean
  enhanced?: boolean
}) {
  const headingAccent = isSaudi ? 'text-[#087a3c]' : 'text-primary'
  const cardBorder = isSaudi ? 'border-[#087a3c]/15' : 'border-primary/15'

  return (
    <section id={`section-${section.number}`} className="scroll-mt-28">
      <div
        className={`rounded-2xl border bg-white p-6 shadow-sm sm:p-8 ${
          enhanced ? `${cardBorder} shadow-md` : 'border-gray-100'
        }`}
      >
        <h2 className="text-xl font-bold text-navy sm:text-2xl">
          <span className={headingAccent}>{section.number}.</span> {section.title}
        </h2>

        {section.intro && (
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">{section.intro}</p>
        )}

        {section.paragraphs?.map((p) => (
          <p key={p.slice(0, 40)} className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            {p}
          </p>
        ))}

        {section.bullets && (
          <div className={`mt-6 ${section.bullets.length > 6 ? 'grid gap-6 sm:grid-cols-2' : ''}`}>
            <BulletList items={section.bullets} isSaudi={isSaudi} />
          </div>
        )}

        {section.subsections?.map((sub) => (
          <div key={sub.title} className="mt-8 border-t border-gray-100 pt-8">
            <h3 className="text-lg font-semibold text-navy">{sub.title}</h3>
            {sub.intro && (
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{sub.intro}</p>
            )}
            {sub.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                {p.includes('https://') ? (
                  <>
                    {p.split('https://')[0]}
                    <a
                      href={`https://${p.split('https://')[1]}`}
                      className={`font-medium underline-offset-2 hover:underline ${headingAccent}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://{p.split('https://')[1]}
                    </a>
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
            {sub.bullets && (
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <BulletList items={sub.bullets.slice(0, Math.ceil(sub.bullets.length / 2))} isSaudi={isSaudi} />
                <BulletList items={sub.bullets.slice(Math.ceil(sub.bullets.length / 2))} isSaudi={isSaudi} />
              </div>
            )}
          </div>
        ))}

        {enhanced && (
          <>
            <div className="mt-10 flex justify-center lg:justify-end">
              <div
                className={`relative flex h-44 w-full max-w-xs items-center justify-center rounded-2xl ${
                  isSaudi ? 'bg-[#e8f5ec]' : 'bg-primary-light'
                }`}
              >
                <Shield
                  className={`absolute left-8 top-8 h-14 w-14 ${isSaudi ? 'text-[#087a3c]/30' : 'text-primary/35'}`}
                  strokeWidth={1.25}
                  aria-hidden
                />
                <Lock
                  className={`absolute bottom-10 left-1/2 h-10 w-10 -translate-x-1/2 ${isSaudi ? 'text-[#087a3c]' : 'text-primary'}`}
                  aria-hidden
                />
                <Smartphone
                  className={`absolute right-8 top-10 h-12 w-12 ${isSaudi ? 'text-[#087a3c]/50' : 'text-primary/50'}`}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {privacyHighlights.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl border p-4 ${cardBorder} bg-gray-50/80`}
                >
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                      isSaudi ? 'bg-[#e8f5ec]' : 'bg-primary-light'
                    }`}
                  >
                    <HighlightIcon icon={item.icon} />
                  </div>
                  <h4 className="text-sm font-bold text-navy">{item.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {section.number === 16 && (
          <div className="mt-6 space-y-2 text-sm text-gray-600 sm:text-base">
            <p className="font-semibold text-navy">Tally Hosting</p>
            <p>
              Email:{' '}
              <a
                href={`mailto:${privacyPolicyMeta.contactEmail}`}
                className={`font-medium ${headingAccent} hover:underline`}
              >
                {privacyPolicyMeta.contactEmail}
              </a>
            </p>
            <p>
              Website:{' '}
              <a
                href={privacyPolicyMeta.contactWebsite}
                className={`font-medium ${headingAccent} hover:underline`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {privacyPolicyMeta.contactWebsite}
              </a>
            </p>
            <p>Address: {privacyPolicyMeta.contactAddress}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export function PrivacyPolicyPage() {
  const { countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'
  const [activeSection, setActiveSection] = useState(1)

  const badgeClass = isSaudi
    ? 'border-[#087a3c]/30 bg-[#087a3c]/10 text-[#087a3c]'
    : 'border-primary/30 bg-primary/10 text-primary'

  const ctaGradient = isSaudi
    ? 'from-[#0b8a47] to-[#22c55e]'
    : 'from-[#8b5cf6] to-[#6366f1]'

  useEffect(() => {
    const ids = privacySections.map((s) => `section-${s.number}`)
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          const num = Number(visible.target.id.replace('section-', ''))
          if (!Number.isNaN(num)) setActiveSection(num)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (num: number) => {
    document.getElementById(`section-${num}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(num)
  }

  const overviewSections = privacySections.filter((s) => s.number >= 2 && s.number <= 7)

  return (
    <main className="min-h-screen bg-[#f4f5f9]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pb-24">
        <div
          className={`pointer-events-none absolute inset-0 ${
            isSaudi
              ? 'bg-gradient-to-br from-navy via-[#0a1f14] to-navy'
              : 'bg-gradient-to-br from-navy via-[#1a1040] to-navy'
          }`}
        />
        <div
          className={`pointer-events-none absolute -right-16 top-16 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96 ${
            isSaudi ? 'bg-[#087a3c]/20' : 'bg-primary/25'
          }`}
        />
        <HeroCloud
          className={`pointer-events-none absolute right-[8%] top-[18%] h-40 w-40 text-primary/25 sm:h-56 sm:w-56 lg:h-72 lg:w-72 ${
            isSaudi ? 'text-[#087a3c]/25' : ''
          }`}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span
              className={`inline-flex rounded-full border px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] sm:text-xs ${badgeClass}`}
            >
              PRIVACY POLICY
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Privacy <span className={isSaudi ? 'text-[#4ade80]' : 'text-primary'}>Policy</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-gray-300 sm:text-base">
              Learn how Tally Hosting collects, uses, and protects your information when you use our
              website and services.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Effective Date:{' '}
              <span className="font-medium text-gray-200">{privacyPolicyMeta.effectiveDate}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">On this page</p>
              <nav className="mt-4 max-h-[min(70vh,520px)] space-y-1 overflow-y-auto pr-1" aria-label="Privacy policy sections">
                {privacySections.map((s) => {
                  const active = activeSection === s.number
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => scrollToSection(s.number)}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-xs leading-snug transition sm:text-[13px] ${
                        active
                          ? isSaudi
                            ? 'bg-[#e8f5ec] font-semibold text-[#087a3c]'
                            : 'bg-primary-light font-semibold text-primary'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                      }`}
                    >
                      {s.number}. {s.title}
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main column */}
          <div className="min-w-0 space-y-8">
            <SectionBlock section={privacySections[0]} isSaudi={isSaudi} enhanced />

            {/* Overview cards 2–7 */}
            <div className="grid gap-4 sm:grid-cols-2">
              {overviewSections.map((section) => (
                <div
                  key={section.id}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-primary/20 hover:shadow-md"
                >
                  <h3 className="text-base font-bold text-navy">
                    {section.number}. {section.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 line-clamp-3">
                    {privacySectionSummary(section)}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.number)}
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${
                      isSaudi ? 'text-[#087a3c]' : 'text-primary'
                    }`}
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              ))}
            </div>

            {privacySections.slice(1).map((section) => (
              <SectionBlock key={section.id} section={section} isSaudi={isSaudi} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy py-14 sm:py-16">
        <div
          className={`pointer-events-none absolute inset-0 ${
            isSaudi ? 'bg-[#087a3c]/5' : 'bg-primary/5'
          }`}
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Have Any <span className={isSaudi ? 'text-[#4ade80]' : 'text-primary'}>Questions?</span>
            </h2>
            <div className="mt-5 space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <Mail className={`h-4 w-4 ${isSaudi ? 'text-[#4ade80]' : 'text-primary'}`} aria-hidden />
                Email:{' '}
                <a
                  href={`mailto:${privacyPolicyMeta.contactEmail}`}
                  className="text-white hover:underline"
                >
                  {privacyPolicyMeta.contactEmail}
                </a>
              </p>
              <p>
                Website:{' '}
                <a
                  href={privacyPolicyMeta.contactWebsite}
                  className="text-white hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.tallyhosting.com
                </a>
              </p>
            </div>
          </div>
          <Link
            to="/#contact"
            className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 ${ctaGradient}`}
          >
            Contact Us
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  )
}
