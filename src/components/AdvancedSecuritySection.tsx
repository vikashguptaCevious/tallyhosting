import { useState } from 'react'
import {
  Lock,
  Smartphone,
  Cloud,
  ShieldCheck,
  MonitorSmartphone,
  Timer,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

type SecurityFeature = {
  title: string
  description: string
  image: string
  imageAlt: string
  icon: LucideIcon | 'aws'
  footerIcon: LucideIcon
  footerTitle: string
  footerText: string
  number: string
}

const features: SecurityFeature[] = [
  {
    title: 'Two-Factor Authentication (2FA)',
    description:
      'Add an extra layer of security to every login with email-based 2FA protection.',
    image: '/advancesecurity/2FA.webp',
    imageAlt: 'Two-Factor Authentication',
    icon: Lock,
    footerIcon: ShieldCheck,
    footerTitle: 'Stronger Access Control',
    footerText: 'Protects your data from unauthorized access and login attempts.',
    number: '.01',
  },
  {
    title: 'Device Binding',
    description:
      'Restrict access only to trusted devices and prevent unauthorized logins.',
    image: '/advancesecurity/Device%20Binding.webp',
    imageAlt: 'Device Binding',
    icon: Smartphone,
    footerIcon: MonitorSmartphone,
    footerTitle: 'Trusted Devices Only',
    footerText: 'Ensure secure access from your registered devices.',
    number: '.02',
  },
  {
    title: 'High Availability Cloud',
    description:
      '99.9% uptime with redundant infrastructure for seamless and uninterrupted access.',
    image: '/advancesecurity/HA%20Cloud.webp',
    imageAlt: 'High Availability Cloud',
    icon: Cloud,
    footerIcon: Timer,
    footerTitle: '99.9% Uptime',
    footerText: 'Stay connected with reliable and uninterrupted performance.',
    number: '.03',
  },
  {
    title: 'Hosted on AWS',
    description:
      'Enterprise-grade infrastructure hosted on Amazon Web Services for maximum reliability.',
    image: '/advancesecurity/AWS.webp',
    imageAlt: 'Hosted on AWS',
    icon: 'aws',
    footerIcon: Globe,
    footerTitle: 'Global Infrastructure',
    footerText: 'Powered by AWS for scalability, speed and security.',
    number: '.04',
  },
]

function TitleIcon({ icon }: { icon: SecurityFeature['icon'] }) {
  if (icon === 'aws') {
    return (
      <span className="text-[10px] font-extrabold lowercase leading-none tracking-tight text-white">
        aws
      </span>
    )
  }

  const Icon = icon
  return <Icon className="h-4 w-4 text-white" strokeWidth={2} />
}

export function AdvancedSecuritySection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="features" className="relative w-full bg-white pt-6 pb-16 lg:pt-8 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] text-primary sm:text-xs">
            ENTERPRISE CLOUD CAPABILITIES
          </span>
          <h2 className="mt-5 text-2xl font-extrabold leading-tight text-navy sm:text-3xl lg:text-4xl">
            Advanced Security and Infrastructure Features to{' '}
            <span className="text-primary">Safeguard Your Business.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Built with enterprise-grade technology and hosted on world-class infrastructure to
            deliver performance, reliability and peace of mind.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-col gap-4 lg:h-[560px] lg:flex-row lg:gap-4">
            {features.map((feature, i) => {
              const FooterIcon = feature.footerIcon
              const isActive = activeIndex === i

              return (
                <article
                  key={feature.title}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  tabIndex={0}
                  className={`group flex cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out outline-none ${
                    isActive
                      ? 'border-primary/20 shadow-[0_16px_40px_rgba(123,97,255,0.14)] lg:flex-[2.9]'
                      : 'border-gray-100 lg:flex-[0.55]'
                  }`}
                >
                  {/* Collapsed: title top + big number bottom */}
                  {!isActive && (
                    <div className="flex h-full min-h-[220px] flex-col justify-between px-4 py-5 lg:min-h-0 lg:px-5 lg:py-6">
                      <h3 className="text-sm font-bold leading-snug text-navy lg:text-[15px]">
                        {feature.title}
                      </h3>
                      <span className="mt-8 self-end text-5xl font-extrabold tracking-tight text-navy/90 lg:mt-auto lg:text-6xl xl:text-7xl">
                        {feature.number}
                      </span>
                    </div>
                  )}

                  {/* Expanded: content top + full-width rounded image bottom */}
                  {isActive && (
                    <div className="flex h-full flex-col p-5 sm:p-6">
                      <div className="mb-3 flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
                          <TitleIcon icon={feature.icon} />
                        </span>
                        <h3 className="text-base font-bold leading-snug text-navy sm:text-lg">
                          {feature.title}
                        </h3>
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-gray-500">
                        {feature.description}
                      </p>

                      <div className="mb-4 h-0.5 w-10 rounded-full bg-primary" />

                      <div className="mb-5 flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center text-primary">
                          <FooterIcon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-primary">{feature.footerTitle}</p>
                          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-[13px]">
                            {feature.footerText}
                          </p>
                        </div>
                      </div>

                      <div className="relative mt-auto w-full">
                        <img
                          src={feature.image}
                          alt={feature.imageAlt}
                          className="h-[260px] w-full rounded-2xl object-cover object-center sm:h-[290px] lg:h-[320px]"
                          draggable={false}
                        />
                        <span className="pointer-events-none absolute right-4 bottom-3 text-4xl font-extrabold tracking-tight text-white/90 drop-shadow-md sm:text-5xl">
                          {feature.number}
                        </span>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
