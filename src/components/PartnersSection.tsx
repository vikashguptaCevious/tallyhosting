import type { ReactNode } from 'react'
import { AnimatedSection } from './AnimatedSection'

function GoogleLogo() {
  return (
    <svg viewBox="0 0 272 92" className="h-8 w-auto sm:h-9" aria-label="Google" role="img">
      <path
        fill="#EA4335"
        d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      <path
        fill="#FBBC05"
        d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
      />
      <path
        fill="#4285F4"
        d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
      />
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
      <path
        fill="#EA4335"
        d="M262.02 54.58l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
      />
      <path
        fill="#4285F4"
        d="M35.29 41.41V32H67.5c.32 1.68.48 3.7.48 5.96 0 7.56-2.07 16.88-8.74 23.56-6.56 6.88-14.91 10.53-26.07 10.53C15.2 72.05 0 56.85 0 36.02S15.2 0 33.17 0c9.07 0 15.95 3.56 20.95 8.23l-5.96 5.96c-3.7-3.52-8.74-6.23-15-6.23-12.18 0-21.67 9.83-21.67 22.02 0 12.1 9.49 22.02 21.67 22.02 7.9 0 12.35-3.18 15.25-6.1 2.35-2.35 3.9-5.71 4.5-10.32H35.29z"
      />
    </svg>
  )
}

function MicrosoftLogo() {
  return (
    <svg viewBox="0 0 108 24" className="h-6 w-auto sm:h-7" aria-label="Microsoft" role="img">
      <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
      <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
      <rect x="0" y="11.5" width="10.5" height="10.5" fill="#00A4EF" />
      <rect x="11.5" y="11.5" width="10.5" height="10.5" fill="#FFB900" />
      <text
        x="28"
        y="17.5"
        fill="#737373"
        fontFamily="Segoe UI, Arial, sans-serif"
        fontSize="14"
        fontWeight="600"
      >
        Microsoft
      </text>
    </svg>
  )
}

type Partner =
  | { name: string; src: string; className: string; node?: never }
  | { name: string; node: ReactNode; src?: never; className?: never }

const partners: Partner[] = [
  {
    name: 'AWS',
    src: '/images/amzone.png',
    className: 'h-9 sm:h-10 lg:h-11',
  },
  {
    name: 'Google',
    node: <GoogleLogo />,
  },
  {
    name: 'Microsoft',
    node: <MicrosoftLogo />,
  },
  {
    name: 'CloudOrc',
    src: '/images/cloudorc.webp',
    className: 'h-7 sm:h-8 lg:h-9',
  },
  {
    name: 'TallyHosting',
    src: '/images/tallyhosting-logo.png',
    className: 'h-9 sm:h-10 lg:h-11',
  },
]

export function PartnersSection() {
  return (
    <section className="relative z-20 w-full bg-gray-100 pt-6 pb-8 lg:pt-8 lg:pb-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto mb-5 text-center lg:mb-6">
          <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] text-primary shadow-sm sm:text-xs">
            OUR PARTNERS
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="w-full overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-[0_12px_40px_rgba(123,97,255,0.12)]">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6 py-7 sm:gap-x-12 sm:px-10 sm:py-8 lg:justify-evenly lg:gap-x-8 lg:px-12 lg:py-9">
              {partners.map((partner) => (
                <div key={partner.name} className="flex items-center justify-center">
                  {'node' in partner && partner.node ? (
                    partner.node
                  ) : (
                    <img
                      src={partner.src}
                      alt={partner.name}
                      className={`w-auto object-contain ${partner.className}`}
                      draggable={false}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
