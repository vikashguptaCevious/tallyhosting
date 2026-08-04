import { Cloud, Shield, Server, Headphones, type LucideIcon } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

type TrustCard = {
  quote: string
  tags: string[]
  name: string
  role: string
  initials: string
  icon: LucideIcon
  accent: string
}

const trustCards: TrustCard[] = [
  {
    quote:
      'TallyHosting made our cloud migration seamless. Backups and security give us complete peace of mind.',
    tags: ['Cloud hosting', 'Backup', '2FA'],
    name: 'Rajesh Sharma',
    role: 'CA Firm Owner',
    initials: 'RS',
    icon: Cloud,
    accent: 'bg-primary/15 text-primary',
  },
  {
    quote:
      'Device binding and 2FA protect our client data. We access Tally securely from anywhere now.',
    tags: ['Device Binding', '2FA', 'Security'],
    name: 'Anita Mehta',
    role: 'Finance Head',
    initials: 'AM',
    icon: Shield,
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    quote:
      '99.9% uptime and 24×7 support. Our accounting team never faces downtime during peak season.',
    tags: ['High Availability', 'Support'],
    name: 'Vikram Patel',
    role: 'Business Owner',
    initials: 'VP',
    icon: Server,
    accent: 'bg-sky-100 text-sky-700',
  },
  {
    quote:
      'Migration was handled by their experts. We were live on secure Tally cloud within days.',
    tags: ['Migration', 'Cloud hosting'],
    name: 'Priya Nair',
    role: 'Operations Manager',
    initials: 'PN',
    icon: Headphones,
    accent: 'bg-orange-100 text-orange-700',
  },
  {
    quote:
      'Best decision for our multi-branch retail. Centralized Tally with encrypted Google backup.',
    tags: ['Backup', 'Multi User', 'Retail'],
    name: 'Amit Kumar',
    role: 'Retail Chain Owner',
    initials: 'AK',
    icon: Cloud,
    accent: 'bg-primary/15 text-primary',
  },
  {
    quote:
      'As a CA firm we needed enterprise security. TallyHosting delivers exactly that every day.',
    tags: ['CA Firm', 'Enterprise Security'],
    name: 'Sneha Gupta',
    role: 'Partner, CA Firm',
    initials: 'SG',
    icon: Shield,
    accent: 'bg-rose-100 text-rose-700',
  },
  {
    quote:
      'Customer portal and self-service make managing users simple. Support team is always responsive.',
    tags: ['Portal', 'Support', 'Users'],
    name: 'Arjun Singh',
    role: 'IT Manager',
    initials: 'AS',
    icon: Server,
    accent: 'bg-teal-100 text-teal-700',
  },
  {
    quote:
      'Work from anywhere without compromising compliance. Perfect cloud platform for our exporters.',
    tags: ['Remote Access', 'Compliance'],
    name: 'Neha Kapoor',
    role: 'Export Business',
    initials: 'NK',
    icon: Headphones,
    accent: 'bg-primary/15 text-primary',
  },
]

function TrustTestimonialCard({ card }: { card: TrustCard }) {
  const Icon = card.icon

  return (
    <article className="flex h-full w-[300px] flex-shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:w-[320px] sm:p-6">
      <span className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.accent}`}>
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
        &ldquo;{card.quote}&rdquo;
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
          {card.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-navy">{card.name}</p>
          <p className="truncate text-xs text-gray-500">{card.role}</p>
        </div>
      </div>
    </article>
  )
}

export function TrustedBySection() {
  const loopCards = [...trustCards, ...trustCards]

  return (
    <section className="relative z-20 w-full overflow-hidden bg-gray-50 py-10 lg:py-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-7 text-center lg:mb-8">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] text-primary sm:text-xs">
            Trusted by
          </span>
          <h2 className="mt-3 text-xl font-extrabold text-navy sm:text-2xl lg:text-3xl">
            Businesses that trust <span className="text-primary">TallyHosting</span>
          </h2>
        </AnimatedSection>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-gray-50 to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-gray-50 to-transparent sm:w-20" />

        <div className="flex overflow-hidden">
          <div className="animate-marquee flex w-max items-stretch gap-4 py-2 hover:[animation-play-state:paused] sm:gap-5">
            {loopCards.map((card, i) => (
              <TrustTestimonialCard key={`${card.name}-${i}`} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
