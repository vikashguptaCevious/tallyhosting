import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { partnerForm } from '../data/content'
import { submitBitrixLead } from '../lib/bitrix'
import { showToast } from '../lib/toast'

interface BecomePartnerModalProps {
  open: boolean
  onClose: () => void
}

const initialForm = {
  firstName: '',
  lastName: '',
  companyName: '',
  companyWebsite: '',
  workEmail: '',
  mobile: '',
  country: 'India',
  partnershipModels: [] as string[],
  interest: '',
}

export function BecomePartnerModal({ open, onClose }: BecomePartnerModalProps) {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const toggleModel = (model: string) => {
    setForm((prev) => ({
      ...prev,
      partnershipModels: prev.partnershipModels.includes(model)
        ? prev.partnershipModels.filter((m) => m !== model)
        : [...prev.partnershipModels, model],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      formType: 'partner' as const,
      firstName: form.firstName,
      lastName: form.lastName,
      companyName: form.companyName,
      companyWebsite: form.companyWebsite,
      workEmail: form.workEmail,
      mobile: form.mobile,
      country: form.country,
      partnershipModels: form.partnershipModels,
      interest: form.interest,
    }

    setSubmitting(true)

    try {
      await submitBitrixLead(payload)
      setForm(initialForm)
      onClose()
      showToast('Thanks! Our partnership team will reach out shortly.', 'success')
    } catch (error) {
      console.error('Become a Partner form submission failed:', error)
      showToast(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        'error',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setForm(initialForm)
    onClose()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="Close dialog"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-3xl my-8 max-h-[calc(100vh-4rem)] bg-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-200 bg-gray-50">
              <div>
                <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  {partnerForm.badge}
                </p>
                <h2 id="partner-modal-title" className="text-2xl sm:text-3xl font-bold text-navy">
                  {partnerForm.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-xl">
                  {partnerForm.description}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-5">
                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-center">
                  <label className="text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    required
                    placeholder={partnerForm.fields.firstName}
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-center">
                  <label className="text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    required
                    placeholder={partnerForm.fields.lastName}
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-center">
                  <label className="text-sm font-medium text-gray-700">Company name</label>
                  <input
                    type="text"
                    required
                    placeholder={partnerForm.fields.companyName}
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-center">
                  <label className="text-sm font-medium text-gray-700">Company website</label>
                  <input
                    type="text"
                    placeholder={partnerForm.fields.companyWebsite}
                    value={form.companyWebsite}
                    onChange={(e) => setForm({ ...form, companyWebsite: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-center">
                  <label className="text-sm font-medium text-gray-700">Work email</label>
                  <input
                    type="email"
                    required
                    placeholder={partnerForm.fields.workEmail}
                    value={form.workEmail}
                    onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-center">
                  <label className="text-sm font-medium text-gray-700">Mobile number</label>
                  <PhoneInput
                    defaultCountry="in"
                    preferredCountries={['in', 'us', 'gb', 'ae', 'sg']}
                    value={form.mobile}
                    onChange={(phone) => setForm({ ...form, mobile: phone })}
                    placeholder={partnerForm.fields.mobile}
                    required
                    className="partner-phone-input"
                    inputClassName="partner-phone-input__field"
                    countrySelectorStyleProps={{
                      buttonClassName: 'partner-phone-input__country-btn',
                      dropdownStyleProps: {
                        className: 'partner-phone-input__dropdown',
                      },
                    }}
                  />
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-center">
                  <label className="text-sm font-medium text-gray-700">
                    {partnerForm.fields.country}
                  </label>
                  <div className="relative">
                    <select
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full appearance-none px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    >
                      {partnerForm.countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start pt-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 leading-snug">
                      {partnerForm.fields.partnershipLabel}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{partnerForm.fields.partnershipHint}</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    {partnerForm.partnershipModels.map((model) => (
                      <label key={model} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={form.partnershipModels.includes(model)}
                          onChange={() => toggleModel(model)}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/40"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-navy">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start pt-2">
                  <label className="text-sm font-medium text-gray-700 leading-snug">
                    {partnerForm.fields.interestLabel}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={partnerForm.fields.interestPlaceholder}
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition-colors"
                >
                  {partnerForm.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 text-sm font-bold text-navy border-2 border-navy rounded-xl bg-white hover:bg-navy hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : partnerForm.submit}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
