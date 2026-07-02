import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm shadow-primary/5 border-b border-gray-100/80'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex-shrink-0 flex items-center group">
            <img
              src="/images/tallyhosting-logo.png"
              alt="TallyHosting"
              className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          <div className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary/5 hover:border-primary transition-all duration-300"
            >
              Partner Login
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              Customer Login
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
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
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="px-4 pt-3 flex flex-col gap-2">
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="block px-5 py-2.5 text-sm font-semibold text-primary border border-primary/30 rounded-xl text-center hover:bg-primary/5 transition-colors"
                  >
                    Partner Login
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="block px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl text-center hover:bg-primary-dark transition-colors"
                  >
                    Customer Login
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
