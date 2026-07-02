import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { contactSection } from '../data/content'
import { submitBitrixLead } from '../lib/bitrix'
import { AnimatedSection } from './AnimatedSection'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const payload = {
      formType: 'contact' as const,
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
    }

    setSubmitting(true)

    try {
      await submitBitrixLead(payload)
      e.currentTarget.reset()
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">{contactSection.heading}</h2>
            <p className="text-white/85 text-lg mb-8 leading-relaxed">{contactSection.description}</p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-300 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">{contactSection.office.title}</p>
                  <p className="text-white/80 text-sm mt-1 leading-relaxed">
                    {contactSection.office.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-amber-300 flex-shrink-0" />
                <a href={`mailto:${contactSection.email}`} className="hover:underline">
                  {contactSection.email}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-amber-300 flex-shrink-0" />
                <span>{contactSection.phone}</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800"
            >
              <h3 className="text-xl font-bold text-primary mb-6">{contactSection.formTitle}</h3>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder={contactSection.fields.name}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={contactSection.fields.email}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={contactSection.fields.phone}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                />
                <textarea
                  name="message"
                  placeholder={contactSection.fields.message}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitted
                    ? `✓ ${contactSection.successMessage}`
                    : submitting
                      ? 'Sending...'
                      : contactSection.submitLabel}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
