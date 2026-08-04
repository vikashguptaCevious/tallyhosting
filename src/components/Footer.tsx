import { useState } from 'react'
import { Link } from 'react-router-dom'
import { footerData } from '../data/content'
import { useCountry } from '../context/CountryContext'
import { BecomePartnerModal } from './BecomePartnerModal'

export function Footer() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const { countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'

  const socialLinks = [
    { name: 'Facebook', label: 'f' },
    { name: 'LinkedIn', label: 'in' },
    { name: 'YouTube', label: '▶' },
    { name: 'Twitter', label: 'X' },
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
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-xs font-bold"
                  >
                    {s.label}
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
