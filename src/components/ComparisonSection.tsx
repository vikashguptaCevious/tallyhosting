import {
  X,
  Check,
  CloudUpload,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import { comparisonData, heroContent } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function ComparisonSection() {
  return (
    <section className="relative w-full bg-[#efe9ff] pt-2 pb-0">
      {/* Bottom only fades to white — top = exact hero bottom pink */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-gray-100" />

      {/* Dark card — flat top edge so the join stays perfectly horizontal */}
      <div className="relative z-10 w-full overflow-hidden rounded-none rounded-b-[2rem] bg-[#05031f] pt-10 pb-10 text-white lg:rounded-b-[2.5rem] lg:pt-14 lg:pb-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_48%,rgba(111,52,255,0.2),transparent_34%),radial-gradient(circle_at_40%_0%,rgba(99,68,245,0.1),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(123,97,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(123,97,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="relative z-10 mx-auto mb-8 max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] text-primary sm:text-xs">
              WHY CHOOSE TALLYHOSTING
            </span>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
              Why Businesses Choose <span className="text-primary">TallyHosting</span> Over
              <span className="block">Traditional Cloud Providers</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
              Enterprise security, automated backups, business continuity and performance—
              everything your accounting business needs in one managed cloud platform.
            </p>
          </AnimatedSection>

          {/* Cards + visual — full width, lg se side-by-side */}
          <div className="relative z-10 grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-8">
            <AnimatedSection delay={0.1} className="w-full min-w-0">
              <div className="relative grid w-full gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="w-full overflow-hidden rounded-2xl border border-rose-400/25 bg-gradient-to-b from-rose-500/10 to-white/[0.035]">
                  <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                      <CloudUpload className="h-5 w-5" />
                    </span>
                    <h3 className="font-bold text-rose-400">{comparisonData.typical.title}</h3>
                  </div>
                  <ul className="space-y-0 px-4 py-3 sm:px-5">
                    {comparisonData.typical.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 border-b border-white/[0.07] py-2.5 text-xs text-white/80 last:border-0 sm:text-sm"
                      >
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-500">
                          <X className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile: VS between stacked cards */}
                <div className="relative z-20 flex items-center justify-center sm:hidden -my-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/70 bg-[#090527] text-base font-extrabold shadow-[0_0_30px_rgba(123,97,255,0.8)]">
                    VS
                  </div>
                </div>

                <div className="w-full overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-b from-primary/15 to-white/[0.04]">
                  <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <CloudUpload className="h-5 w-5" />
                    </span>
                    <h3 className="font-bold text-primary">{comparisonData.tallyHosting.title}</h3>
                  </div>
                  <ul className="space-y-0 px-4 py-3 sm:px-5">
                    {comparisonData.tallyHosting.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 border-b border-white/[0.07] py-2.5 text-xs text-white/90 last:border-0 sm:text-sm"
                      >
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desktop/tablet: VS centered between side-by-side cards */}
                <div className="absolute left-1/2 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/70 bg-[#090527] text-base font-extrabold shadow-[0_0_30px_rgba(123,97,255,0.8)] sm:flex lg:h-14 lg:w-14 lg:text-lg">
                  VS
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection
              delay={0.2}
              className="relative flex min-h-[280px] w-full items-center justify-center lg:min-h-0"
            >
              <div className="absolute h-56 w-56 rounded-full bg-primary/25 blur-3xl lg:h-64 lg:w-64" />
              <div className="absolute left-[8%] top-[24%] flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <CloudUpload className="h-5 w-5" />
              </div>
              <div className="absolute right-[6%] top-[18%] flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="absolute right-[8%] bottom-[18%] flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <UsersRound className="h-5 w-5" />
              </div>
              <img
                src={heroContent.heroImage}
                alt="TallyHosting secure cloud infrastructure"
                className="relative z-10 w-full max-w-[420px] object-contain drop-shadow-[0_0_45px_rgba(123,97,255,0.45)] lg:max-w-none"
                draggable={false}
              />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
