import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cloud, ChevronDown } from 'lucide-react'
import { navLinks } from '../data/content'

const serviceItems = [
  'USER BASED',
  'DEDICATED VM BASED',
  'WEB DEVELOPMENT',
  'WEB HOSTING',
  'CLOUD',
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

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
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative">
              <Cloud className="w-8 h-8 text-primary fill-primary/20 group-hover:scale-110 transition-transform" />
              <div className="absolute -right-1 top-1 w-4 h-0.5 bg-amber-400 rounded rotate-[-20deg]" />
              <div className="absolute -right-2 top-2.5 w-3 h-0.5 bg-amber-400 rounded rotate-[-20deg]" />
            </div>
            <span className="text-2xl font-bold italic text-primary">TallyHosting</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.label === 'SERVICES' ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="flex items-center gap-1 text-sm font-semibold tracking-wider text-gray-700 hover:text-primary transition-colors">
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                      >
                        {serviceItems.map((item) => (
                          <a
                            key={item}
                            href="#services"
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors"
                          >
                            {item}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold tracking-wider text-gray-700 hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              )
            )}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get Quote
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-gray-700"
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
                    className="block px-4 py-3 text-sm font-semibold tracking-wider text-gray-700 hover:bg-primary/5 hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block mx-4 mt-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full text-center"
                >
                  Get Quote
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
