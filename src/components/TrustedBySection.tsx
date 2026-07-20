import { AnimatedSection } from './AnimatedSection'

const trustedByItems = [
  'Sharma & Associates CA',
  'Mehta Traders',
  'Patel Exports Pvt Ltd',
  'GreenLeaf Organics',
  'Nova Retail Chain',
  'Singh Logistics',
  'Apex Accounting Hub',
  'Bright Future Schools',
  'Kumar Builders',
  'Oceanic Foods',
  'Digital Pulse Media',
  'Royal Textiles India',
  'SecureBooks CA Firm',
  'Horizon Pharma',
  'Urban Mart Stores',
  'Prime Auto Parts',
]

export function TrustedBySection() {
  const loopItems = [...trustedByItems, ...trustedByItems]

  return (
    <section className="relative z-20 w-full overflow-hidden bg-white py-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-6 text-center lg:mb-7">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] text-primary sm:text-xs">
            Trusted by
          </span>
          <h2 className="mt-3 text-xl font-extrabold text-navy sm:text-2xl lg:text-3xl">
            Businesses that trust <span className="text-primary">TallyHosting</span>
          </h2>
        </AnimatedSection>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="flex overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-3 py-2 sm:gap-4">
            {loopItems.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="inline-flex flex-shrink-0 items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-navy/80 whitespace-nowrap shadow-sm sm:px-5 sm:text-[15px]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
