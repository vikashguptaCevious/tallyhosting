import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navLinks, partnerNav, customerLoginUrl } from '../data/content'
import { BecomePartnerModal } from './BecomePartnerModal'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [partnerOpen, setPartnerOpen] = useState(false)
  const [mobilePartnerOpen, setMobilePartnerOpen] = useState(false)
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)
  const partnerRef = useRef<HTMLDivElement>(null)

  const openPartnerModal = () => {
    setPartnerOpen(false)
    setMobileOpen(false)
    setMobilePartnerOpen(false)
    setPartnerModalOpen(true)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (partnerRef.current && !partnerRef.current.contains(e.target as Node)) {
        setPartnerOpen(false)
      }
    }
    if (partnerOpen) {
      document.addEventListener('mousedown', onClickOutside)
    }
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [partnerOpen])

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
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
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </a>

          <div className="hidden lg:flex items-center justify-center gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
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
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
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
                          rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
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
            <a
              href={customerLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white border border-gray-200 text-navy text-sm font-semibold rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              Login
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
            >
              Start 14-Day Free Trial
            </a>
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
              className="lg:hidden bg-[#f8f5ff]/98 border-t border-primary/5 overflow-hidden"
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
                            rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
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

                <div className="px-4 pt-3 space-y-2">
                  <a
                    href={customerLoginUrl}
                    onClick={() => setMobileOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-2.5 bg-white border border-gray-200 text-navy text-sm font-semibold rounded-lg text-center hover:border-primary/30 transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="block px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg text-center hover:bg-primary-dark transition-colors"
                  >
                    Start 14-Day Free Trial
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <BecomePartnerModal open={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} />
    </motion.header>
  )
}
