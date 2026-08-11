import { useState } from 'react'
import { Link } from 'react-router-dom'
import { footerData } from '../data/content'
import { useCountry } from '../context/CountryContext'
import { BecomePartnerModal } from './BecomePartnerModal'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881.001 1.44 1.44 0 012.881-.001z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.065 2.065 0 11-4.13 0 2.065 2.065 0 014.13 0zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Footer() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const { countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/tallyhosting',
      Icon: InstagramIcon,
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61590513163769#',
      Icon: FacebookIcon,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/tallyhosting',
      Icon: LinkedInIcon,
    },
  ]

  return (
    <>
      <footer id="company" className="bg-navy text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mb-12">
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img
                  src="/images/tallyhosting-logo.png"
                  alt="TallyHosting"
                  className={`h-12 sm:h-14 w-auto object-contain ${
                    isSaudi ? '[filter:hue-rotate(-125deg)_saturate(1.35)_brightness(0.95)]' : ''
                  }`}
                />
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">{footerData.description}</p>
              <div className="flex gap-3">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:contents">
              {footerData.columns.map((col) => (
                <div key={col.title}>
                  <h3 className="text-sm font-bold text-white mb-4">{col.title}</h3>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => {
                      if (typeof link === 'string') {
                        return (
                          <li key={link}>
                            <a
                              href="#"
                              className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              {link}
                            </a>
                          </li>
                        )
                      }

                      if ('action' in link && link.action === 'modal') {
                        return (
                          <li key={link.label}>
                            <button
                              type="button"
                              onClick={() => setPartnerModalOpen(true)}
                              className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              {link.label}
                            </button>
                          </li>
                        )
                      }

                      if ('href' in link) {
                        const href = link.href as string
                        const isInternal =
                          href.startsWith('/') && !href.startsWith('/#') && !href.startsWith('http')

                        return (
                          <li key={link.label}>
                            {isInternal ? (
                              <Link
                                to={href}
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                              >
                                {link.label}
                              </Link>
                            ) : (
                              <a
                                href={href}
                                target={'external' in link && link.external ? '_blank' : undefined}
                                rel={
                                  'external' in link && link.external
                                    ? 'noopener noreferrer'
                                    : undefined
                                }
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                              >
                                {link.label}
                              </a>
                            )}
                          </li>
                        )
                      }

                      return null
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} TallyHosting. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2.5">
              <img
                src={footerData.makeInIndiaLogo}
                alt="Indian Flag"
                className="h-6 w-auto object-contain rounded-sm"
              />
              <span className="text-sm text-gray-400 font-medium">Made in India</span>
            </div>
          </div>
        </div>
      </footer>

      <BecomePartnerModal open={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} />
    </>
  )
}
