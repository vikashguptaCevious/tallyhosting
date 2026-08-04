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

type SecurityFeature = {
  title: string
  description: string
  image: string
  imageAlt: string
  icon: LucideIcon | 'aws'
  footerIcon: LucideIcon
  footerTitle: string
  footerText: string
}

const features: SecurityFeature[] = [
  {
    title: 'Two-Factor Authentication (2FA)',
    description:
      'Add an extra layer of security to every login with email-based 2FA protection.',
    image: '/cardImage/twofector.webp',
    imageAlt: 'Two-Factor Authentication',
    icon: Lock,
    footerIcon: ShieldCheck,
    footerTitle: 'Stronger Access Control',
    footerText: 'Protects your data from unauthorized access and login attempts.',
  },
  {
    title: 'Device Binding',
    description:
      'Restrict access only to trusted devices and prevent unauthorized logins.',
    image: '/cardImage/devicebinding.webp',
    imageAlt: 'Device Binding',
    icon: Smartphone,
    footerIcon: MonitorSmartphone,
    footerTitle: 'Trusted Devices Only',
    footerText: 'Ensure secure access from your registered devices.',
  },
  {
    title: 'High Availability Cloud',
    description:
      '99.9% uptime with redundant infrastructure for seamless and uninterrupted access.',
    image: '/cardImage/highavail.webp',
    imageAlt: 'High Availability Cloud',
    icon: Cloud,
    footerIcon: Timer,
    footerTitle: '99.9% Uptime',
    footerText: 'Stay connected with reliable and uninterrupted performance.',
  },
  {
    title: 'Hosted on AWS',
    description:
      'Enterprise-grade infrastructure hosted on Amazon Web Services for maximum reliability.',
    image: '/cardImage/awsimg.webp',
    imageAlt: 'Hosted on AWS',
    icon: 'aws',
    footerIcon: Globe,
    footerTitle: 'Global Infrastructure',
    footerText: 'Powered by AWS for scalability, speed and security.',
  },
]

function TitleIcon({ icon }: { icon: SecurityFeature['icon'] }) {
  if (icon === 'aws') {
    return (
      <span className="text-[10px] font-extrabold lowercase leading-none tracking-tight text-primary">
        aws
      </span>
    )
  }

  const Icon = icon
  return <Icon className="h-4 w-4 text-primary" strokeWidth={1.85} />
}

export function AdvancedSecuritySection() {
  return (
    <section id="features" className="relative w-full bg-gray-50 pt-6 pb-16 lg:pt-8 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
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
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => {
            const FooterIcon = feature.footerIcon

            return (
              <article
                key={feature.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-6"
              >
                <div className="mb-5 flex h-[180px] items-center justify-center sm:h-[200px]">
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className={`h-full w-full object-contain ${
                      feature.icon === 'aws' ? '' : 'country-accent-image'
                    }`}
                    draggable={false}
                  />
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/5">
                    <TitleIcon icon={feature.icon} />
                  </span>
                  <h3 className="text-sm font-bold leading-snug text-navy sm:text-[15px]">
                    {feature.title}
                  </h3>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>

                <div className="mx-auto mb-5 h-0.5 w-10 rounded-full bg-primary" />

                <div className="mt-auto flex items-start gap-3 rounded-xl bg-primary/5 px-3.5 py-3.5">
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
