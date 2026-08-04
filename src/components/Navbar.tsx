import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { CUSTOMER_PORTAL_URL } from '../config/env'
import { navLinks, partnerNav } from '../data/content'
import { useCountry, type CountryId } from '../context/CountryContext'
import { BecomePartnerModal } from './BecomePartnerModal'
import { DemoRequestModal } from './DemoRequestModal'

function CountryFlag({
  flagImg,
  label,
  className = 'h-4 w-5',
}: {
  flagImg?: string
  label: string
  className?: string
}) {
  if (flagImg) {
    return (
      <img
        src={flagImg}
        alt={`${label} flag`}
        className={`${className} rounded-[2px] object-cover flex-shrink-0`}
        draggable={false}
      />
    )
  }

  return <Globe className="h-4 w-4 text-gray-500 flex-shrink-0" strokeWidth={1.85} aria-hidden />
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [partnerOpen, setPartnerOpen] = useState(false)
  const [mobilePartnerOpen, setMobilePartnerOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false)
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const partnerRef = useRef<HTMLDivElement>(null)
  const countryRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const { countryId, options, selectedOption, setCountryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'

  const openPartnerModal = () => {
    setPartnerOpen(false)
    setMobileOpen(false)
    setMobilePartnerOpen(false)
    setPartnerModalOpen(true)
  }

  const selectCountry = (id: CountryId) => {
    setCountryId(id)
    setCountryOpen(false)
    setMobileCountryOpen(false)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)

      if (currentY < 80) {
        setHidden(false)
      } else if (currentY > lastScrollY.current + 4) {
        setHidden(true)
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) setHidden(false)
  }, [mobileOpen])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (partnerRef.current && !partnerRef.current.contains(e.target as Node)) {
        setPartnerOpen(false)
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false)
      }
    }
    if (partnerOpen || countryOpen) {
      document.addEventListener('mousedown', onClickOutside)
    }
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [partnerOpen, countryOpen])

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden && !mobileOpen ? '-100%' : 0 }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isSaudi
          ? scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-[#087a3c]/10'
            : 'bg-white/95'
          : scrolled
            ? 'bg-[#f8f5ff]/95 backdrop-blur-lg shadow-sm border-b border-primary/5'
            : 'bg-[#f8f5ff]/90'
      }`}
    >
      <nav className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 lg:h-[72px] w-full">
          <a href="#home" className="flex-shrink-0 relative z-10">
            <img
              src="/images/tallyhosting-logo.png"
              alt="TallyHosting"
              className={`h-14 sm:h-16 w-auto object-contain ${
                isSaudi ? '[filter:hue-rotate(-125deg)_saturate(1.35)_brightness(0.95)]' : ''
              }`}
            />
          </a>

          <div className="hidden lg:flex items-center justify-center gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium text-gray-600 transition-colors ${
                  isSaudi ? 'hover:text-[#087a3c]' : 'hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div
              ref={partnerRef}
              className="relative"
              onMouseEnter={() => setPartnerOpen(true)}
              onMouseLeave={() => setPartnerOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors ${
                  isSaudi ? 'hover:text-[#087a3c]' : 'hover:text-primary'
                }`}
                aria-expanded={partnerOpen}
                aria-haspopup="true"
              >
                {partnerNav.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-50 transition-transform ${partnerOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {partnerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48"
                  >
                    <div className="bg-white rounded-xl border border-gray-100 shadow-lg shadow-primary/10 py-2 overflow-hidden">
                      {partnerNav.items.map((item) =>
                        'action' in item && item.action === 'modal' ? (
                          <button
                            key={item.label}
                            type="button"
                            onClick={openPartnerModal}
                            className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <a
                            key={item.label}
                            href={'href' in item ? (item.href as string) : '#contact'}
                            target={'external' in item && item.external ? '_blank' : undefined}
                            rel={
                              'external' in item && item.external ? 'noopener noreferrer' : undefined
                            }
                            onClick={() => setPartnerOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {item.label}
                          </a>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0 relative z-10">
            <div ref={countryRef} className="relative">
              <button
                type="button"
                onClick={() => setCountryOpen((open) => !open)}
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 bg-white border text-navy text-sm font-semibold rounded-lg transition-colors ${
                  isSaudi
                    ? 'border-[#d7e8dc] hover:border-[#087a3c]/40 hover:bg-[#e8f5ec]'
                    : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                }`}
                aria-expanded={countryOpen}
                aria-haspopup="listbox"
                aria-label="Select country"
              >
                <CountryFlag flagImg={selectedOption.flagImg} label={selectedOption.label} />
                <span className="max-w-[7.5rem] truncate">{selectedOption.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-50 transition-transform ${countryOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {countryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 pt-2 w-48 z-20"
                  >
                    <div
                      role="listbox"
                      className="bg-white rounded-xl border border-gray-100 shadow-lg shadow-primary/10 py-2 overflow-hidden"
                    >
                      {options.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          role="option"
                          aria-selected={option.id === selectedOption.id}
                          onClick={() => selectCountry(option.id as CountryId)}
                          className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                            option.id === selectedOption.id
                              ? isSaudi
                                ? 'bg-[#e8f5ec] text-[#087a3c] font-semibold'
                                : 'bg-primary/5 text-primary font-semibold'
                              : isSaudi
                                ? 'text-gray-700 hover:bg-[#e8f5ec] hover:text-[#087a3c]'
                                : 'text-gray-700 hover:bg-primary/5 hover:text-primary'
                          }`}
                        >
                          <CountryFlag flagImg={option.flagImg} label={option.label} />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href={CUSTOMER_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 bg-white border text-navy text-sm font-semibold rounded-lg transition-colors ${
                isSaudi
                  ? 'border-[#d7e8dc] hover:border-[#087a3c]/40 hover:bg-[#e8f5ec]'
                  : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
              }`}
            >
              Login
            </a>
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              className={`px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                isSaudi
                  ? 'bg-[#087a3c] hover:bg-[#066b34]'
                  : 'bg-primary hover:bg-primary-dark'
              }`}
            >
              Start 7-Day Free Trial
            </button>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t overflow-hidden ${
                isSaudi
                  ? 'bg-white/98 border-[#087a3c]/10'
                  : 'bg-[#f8f5ff]/98 border-primary/5'
              }`}
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}

                <button
                  type="button"
                  onClick={() => setMobilePartnerOpen(!mobilePartnerOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary"
                >
                  {partnerNav.label}
                  <ChevronDown
                    className={`w-4 h-4 opacity-50 transition-transform ${mobilePartnerOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {mobilePartnerOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-gray-50/80"
                    >
                      {partnerNav.items.map((item) =>
                        'action' in item && item.action === 'modal' ? (
                          <button
                            key={item.label}
                            type="button"
                            onClick={openPartnerModal}
                            className="block w-full text-left pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:text-primary"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <a
                            key={item.label}
                            href={'href' in item ? (item.href as string) : '#contact'}
                            target={'external' in item && item.external ? '_blank' : undefined}
                            rel={
                              'external' in item && item.external ? 'noopener noreferrer' : undefined
                            }
                            onClick={() => {
                              setMobileOpen(false)
                              setMobilePartnerOpen(false)
                            }}
                            className="block pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:text-primary"
                          >
                            {item.label}
                          </a>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setMobileCountryOpen(!mobileCountryOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary"
                >
                  <span className="inline-flex items-center gap-2">
                    <CountryFlag flagImg={selectedOption.flagImg} label={selectedOption.label} />
                    Country: {selectedOption.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 opacity-50 transition-transform ${mobileCountryOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileCountryOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden bg-gray-50/80"
                    >
                      {options.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => selectCountry(option.id as CountryId)}
                          className={`flex w-full items-center gap-2 pl-8 pr-4 py-2.5 text-sm ${
                            option.id === selectedOption.id
                              ? 'text-primary font-semibold'
                              : 'text-gray-600 hover:text-primary'
                          }`}
                        >
                          <CountryFlag flagImg={option.flagImg} label={option.label} />
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="px-4 pt-3 space-y-2">
                  <a
                    href={CUSTOMER_PORTAL_URL}
                    onClick={() => setMobileOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-2.5 bg-white border border-gray-200 text-navy text-sm font-semibold rounded-lg text-center hover:border-primary/30 transition-colors"
                  >
                    Login
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false)
                      setDemoModalOpen(true)
                    }}
                    className={`block w-full px-5 py-2.5 text-white text-sm font-semibold rounded-lg text-center transition-colors ${
                      isSaudi
                        ? 'bg-[#087a3c] hover:bg-[#066b34]'
                        : 'bg-primary hover:bg-primary-dark'
                    }`}
                  >
                    Start 7-Day Free Trial
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <BecomePartnerModal open={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} />
      <DemoRequestModal open={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
    </motion.header>
  )
}
