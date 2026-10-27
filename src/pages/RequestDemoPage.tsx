import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarCheck, Check, CircleCheck } from 'lucide-react'
import { demoForm, DEMO_PAGE_PATH } from '../data/content'
import { DemoRequestForm } from '../components/DemoRequestForm'
import { Seo } from '../components/Seo'
import { breadcrumbSchema } from '../lib/seoSchemas'

const demoPerks = [
  'Live walkthrough of Tally on Cloud',
  'Migration plan for your existing data',
  'Pricing that fits your team size',
  'Answers from a Tally cloud expert',
]

export function RequestDemoPage() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  // Cancel returns to wherever the visitor came from; direct visits go home
  const goBack = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0
    if (idx > 0) navigate(-1)
    else navigate('/')
  }

  return (
    <main className="relative overflow-x-clip bg-gradient-to-b from-primary-light via-white to-white">
      <Seo
        title="Request a Demo"
        description="Book a free, personalised TallyHosting demo. See Tally on Cloud in action, get a migration plan and pricing for your team."
        canonicalPath={DEMO_PAGE_PATH}
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Request a Demo', path: DEMO_PAGE_PATH },
        ])}
      />
      {/* Navbar spacer */}
      <div className="h-16 lg:h-[72px]" />
      <div className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[38%_1fr] lg:gap-14 lg:px-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:pt-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">
            {demoForm.badge}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            {demoForm.title}
          </h1>
          <p className="mt-3 max-w-md leading-relaxed text-gray-600">{demoForm.description}</p>

          <ul className="mt-8 space-y-3.5">
            {demoPerks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm font-medium text-gray-700 sm:text-base">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden items-center gap-3 rounded-2xl border border-primary/10 bg-white/70 p-4 lg:flex">
            <CalendarCheck className="h-8 w-8 flex-shrink-0 text-primary" strokeWidth={1.5} />
            <p className="text-sm text-gray-600">
              Our team usually reaches out within <strong className="text-navy">one business day</strong> to
              schedule your demo.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          {submitted ? (
            <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-xl shadow-primary/5 sm:px-10">
              <CircleCheck className="h-14 w-14 text-emerald-500" strokeWidth={1.5} />
              <h2 className="mt-5 text-2xl font-bold text-navy">Thank you!</h2>
              <p className="mt-2 max-w-sm text-gray-600">
                Your demo request has been received. Our team will contact you shortly to schedule
                it.
              </p>
              <Link
                to="/"
                className="mt-7 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <DemoRequestForm
              onSuccess={() => {
                setSubmitted(true)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              onCancel={goBack}
            />
          )}
        </motion.div>
      </div>
    </main>
  )
}
