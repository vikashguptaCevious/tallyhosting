import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react'
import { faqs, services, footerFeatures } from '../data/content'
import { AnimatedSection } from './AnimatedSection'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <span className="text-sm font-bold tracking-widest text-primary uppercase">FAQ</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-primary">
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.q} delay={i * 0.05}>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Get In Touch</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Ready to move your Tally to the cloud? Contact us today for a free consultation and
              quote.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Mumbai Office</p>
                  <p className="text-blue-100 text-sm mt-1">
                    2/704 Shri Ram Nagar, Purushottam Kheraj Rd, Mulund West, Mumbai, Maharashtra
                    400080
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-amber-300" />
                <a href="mailto:anita@tallyhost.co.in" className="hover:underline">
                  anita@tallyhost.co.in
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-amber-300" />
                <span>+91 90824 05331 / 9167423035</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800"
            >
              <h3 className="text-xl font-bold text-primary mb-6">Enquiry Now</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all hover:shadow-lg"
                >
                  {submitted ? '✓ Request Submitted!' : 'Send Enquiry'}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-blue-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-gray-600 hover:text-primary text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Features</h3>
            <ul className="space-y-2">
              {footerFeatures.map((f) => (
                <li key={f}>
                  <a href="#services" className="text-gray-600 hover:text-primary text-sm transition-colors">
                    {f}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Contact</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              78 Business Park Promises, 4th Floor, Office No, 418 BMC Building, Bhandup Station
              Road, Bhandup - west, Maharashtra 400080
            </p>
            <p className="mt-3 text-sm text-gray-600">anita@tallyhost.co.in</p>
            <p className="text-sm text-gray-600">+91 90824 05331</p>
          </div>
        </div>

        <div className="border-t border-blue-100 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TallyHost. Designed and Developed with ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
