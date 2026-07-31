import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { demoForm } from '../data/content'
import {
  DemoApiError,
  getCeviousApiBase,
  submitDemoRequest,
  validateReferralCode,
} from '../lib/ceviousDemoApi'
import { showToast } from '../lib/toast'

interface DemoRequestModalProps {
  open: boolean
  onClose: () => void
}

type DemoFormState = {
  name: string
  email: string
  companyName: string
  mobile: string
  country: string
  state: string
  message: string
  referralCode: string
}

type DemoFormErrors = Partial<Record<keyof DemoFormState, string>>

const initialForm: DemoFormState = {
  name: '',
  email: '',
  companyName: '',
  mobile: '',
  country: 'India',
  state: '',
  message: '',
  referralCode: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REFERRAL_CODE_MAX = 20

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function validateForm(form: DemoFormState): DemoFormErrors {
  const errors: DemoFormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Enter at least 2 characters'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if (!form.companyName.trim()) {
    errors.companyName = 'Company name is required'
  }

  const mobileDigits = digitsOnly(form.mobile)
  if (!form.mobile.trim() || mobileDigits.length < 10) {
    errors.mobile = 'Enter a valid mobile number (10–15 digits)'
  } else if (mobileDigits.length > 15) {
    errors.mobile = 'Mobile number is too long'
  }

  if (!form.country.trim()) {
    errors.country = 'Country is required'
  }

  if (!form.state.trim()) {
    errors.state = 'State is required'
  }

  return errors
}

const inputClass =
  'w-full h-10 px-3.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary'
const labelClass = 'text-sm font-medium text-gray-700'

type ReferralStatus = 'empty' | 'idle' | 'checking' | 'valid' | 'invalid'

export function DemoRequestModal({ open, onClose }: DemoRequestModalProps) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<DemoFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [referralHint, setReferralHint] = useState('')
  const [referralStatus, setReferralStatus] = useState<ReferralStatus>('empty')
  const referralRequestId = useRef(0)
  const referralDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  useEffect(() => {
    return () => {
      if (referralDebounceRef.current) clearTimeout(referralDebounceRef.current)
    }
  }, [])

  const clearError = (key: keyof DemoFormState) => {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const resetReferralUi = () => {
    setReferralHint('')
    setReferralStatus('empty')
    clearError('referralCode')
  }

  const checkReferralCode = async (rawCode: string, options?: { showMissingEnvToast?: boolean }) => {
    const code = rawCode.trim()
    if (!code) {
      resetReferralUi()
      return { success: true as const, empty: true as const }
    }

    if (!getCeviousApiBase()) {
      if (options?.showMissingEnvToast !== false) {
        showToast('VITE_CEVIOUS_API_BASE is not configured in .env', 'error')
      }
      setReferralHint('')
      setReferralStatus('invalid')
      setErrors((prev) => ({
        ...prev,
        referralCode: 'VITE_CEVIOUS_API_BASE is not configured in .env',
      }))
      return { success: false as const }
    }

    const requestId = ++referralRequestId.current
    setReferralStatus('checking')
    // Keep previous Invalid/Partner hidden while checking — avoid mid-type flash
    clearError('referralCode')
    setReferralHint('')

    try {
      const result = await validateReferralCode(code)
      if (requestId !== referralRequestId.current) {
        return { success: false as const, stale: true as const }
      }

      if (!result.success) {
        setReferralHint('')
        setReferralStatus('invalid')
        setErrors((prev) => ({
          ...prev,
          referralCode: result.message || 'Invalid referral code',
        }))
        return { success: false as const }
      }

      clearError('referralCode')
      setReferralStatus('valid')
      setReferralHint(result.partnerName ? `Partner: ${result.partnerName}` : 'Partner verified')
      return { success: true as const, partnerName: result.partnerName }
    } catch {
      if (requestId !== referralRequestId.current) {
        return { success: false as const, stale: true as const }
      }
      setReferralHint('')
      setReferralStatus('invalid')
      setErrors((prev) => ({ ...prev, referralCode: 'Invalid referral code' }))
      return { success: false as const }
    }
  }

  const scheduleReferralCheck = (code: string) => {
    if (referralDebounceRef.current) clearTimeout(referralDebounceRef.current)

    const trimmed = code.trim()
    if (!trimmed) {
      resetReferralUi()
      return
    }

    setReferralStatus('checking')
    clearError('referralCode')
    setReferralHint('')

    referralDebounceRef.current = setTimeout(() => {
      // Avoid toast spam while typing if env is missing — field error is enough
      void checkReferralCode(trimmed, { showMissingEnvToast: false })
    }, 400)
  }

  const updateField = <K extends keyof DemoFormState>(key: K, value: DemoFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key !== 'referralCode') clearError(key)
  }

  const handleReferralChange = (value: string) => {
    const next = value.toUpperCase().slice(0, REFERRAL_CODE_MAX)
    setForm((prev) => ({ ...prev, referralCode: next }))
    scheduleReferralCheck(next)
  }

  const handleReferralBlur = () => {
    if (referralDebounceRef.current) {
      clearTimeout(referralDebounceRef.current)
      referralDebounceRef.current = null
    }
    void checkReferralCode(form.referralCode, { showMissingEnvToast: true })
  }

  const handleCountryChange = (country: string) => {
    setForm((prev) => ({ ...prev, country, state: '' }))
    clearError('country')
    clearError('state')
  }

  const stateOptions = demoForm.countryStates[form.country] ?? demoForm.countryStates.Other

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!getCeviousApiBase()) {
      showToast('VITE_CEVIOUS_API_BASE is not configured in .env', 'error')
      return
    }

    const referralCode = form.referralCode.trim()
    if (referralCode) {
      if (referralDebounceRef.current) {
        clearTimeout(referralDebounceRef.current)
        referralDebounceRef.current = null
      }

      // Block submit if already known invalid
      if (referralStatus === 'invalid') {
        setErrors((prev) => ({ ...prev, referralCode: 'Invalid referral code' }))
        return
      }

      // Re-validate if not confirmed valid yet (or still checking)
      if (referralStatus !== 'valid') {
        const referral = await checkReferralCode(referralCode, { showMissingEnvToast: true })
        if (!referral.success) return
      }
    }

    setSubmitting(true)
    try {
      const result = await submitDemoRequest({
        name: form.name.trim(),
        email: form.email.trim(),
        companyName: form.companyName.trim(),
        mobileNumber: form.mobile.trim(),
        countryRegion: form.country.trim(),
        state: form.state.trim(),
        message: form.message.trim() || undefined,
        referralCode: referralCode || undefined,
      })

      setForm(initialForm)
      setErrors({})
      resetReferralUi()
      onClose()
      showToast(result.message || 'Demo request submitted successfully', 'success')
    } catch (error) {
      if (error instanceof DemoApiError) {
        if (error.code === 'INVALID_REFERRAL_CODE' || error.fieldErrors.referralCode) {
          setReferralStatus('invalid')
          setReferralHint('')
          setErrors((prev) => ({
            ...prev,
            ...error.fieldErrors,
            referralCode: error.fieldErrors.referralCode || 'Invalid referral code',
          }))
          return
        }

        if (Object.keys(error.fieldErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...error.fieldErrors }))
          return
        }

        if (error.status === 429) {
          showToast('Too many requests. Please try again shortly.', 'error')
          return
        }

        showToast(error.message || 'Failed to submit demo request', 'error')
        return
      }

      showToast('Failed to submit demo request. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    if (referralDebounceRef.current) {
      clearTimeout(referralDebounceRef.current)
      referralDebounceRef.current = null
    }
    setForm(initialForm)
    setErrors({})
    resetReferralUi()
    setSubmitting(false)
    onClose()
  }

  const referralBlocked =
    Boolean(form.referralCode.trim()) &&
    (referralStatus === 'invalid' || referralStatus === 'checking')

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
            className="relative z-10 w-full max-w-2xl my-8 max-h-[calc(100vh-4rem)] bg-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
          >
            <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-200 bg-gray-50">
              <div>
                <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  {demoForm.badge}
                </p>
                <h2 id="demo-modal-title" className="text-xl sm:text-2xl font-bold text-navy">
                  {demoForm.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-xl">
                  {demoForm.description}
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

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0" noValidate>
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-3.5">
                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>
                    Name <span className="text-rose-500">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder={demoForm.fields.name}
                      className={`${inputClass} ${errors.name ? 'border-rose-400' : 'border-gray-200'}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder={demoForm.fields.email}
                      className={`${inputClass} ${errors.email ? 'border-rose-400' : 'border-gray-200'}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>
                    Company name <span className="text-rose-500">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder={demoForm.fields.companyName}
                      className={`${inputClass} ${errors.companyName ? 'border-rose-400' : 'border-gray-200'}`}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-rose-500">{errors.companyName}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>
                    Mobile number <span className="text-rose-500">*</span>
                  </label>
                  <div>
                    <PhoneInput
                      defaultCountry="in"
                      preferredCountries={['in', 'us', 'gb', 'ae', 'sg']}
                      value={form.mobile}
                      onChange={(phone) => updateField('mobile', phone)}
                      placeholder={demoForm.fields.mobile}
                      className="demo-phone-input"
                      inputClassName={`demo-phone-input__field ${errors.mobile ? 'border-rose-400' : ''}`}
                      countrySelectorStyleProps={{
                        buttonClassName: 'demo-phone-input__country-btn',
                        dropdownStyleProps: {
                          className: 'partner-phone-input__dropdown',
                        },
                      }}
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-xs text-rose-500">{errors.mobile}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>
                    {demoForm.fields.country} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className={`${inputClass} appearance-none pr-9 ${errors.country ? 'border-rose-400' : 'border-gray-200'}`}
                    >
                      {demoForm.countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    {errors.country && (
                      <p className="mt-1 text-xs text-rose-500">{errors.country}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>
                    State <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      className={`${inputClass} appearance-none pr-9 ${errors.state ? 'border-rose-400' : 'border-gray-200'}`}
                    >
                      <option value="">{demoForm.fields.state}</option>
                      {stateOptions.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    {errors.state && <p className="mt-1 text-xs text-rose-500">{errors.state}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>Message</label>
                  <textarea
                    rows={2}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={demoForm.fields.message}
                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                  />
                </div>

                <div className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6 items-start">
                  <label className={`${labelClass} sm:pt-2.5`}>Referral code</label>
                  <div>
                    <input
                      type="text"
                      value={form.referralCode}
                      onChange={(e) => handleReferralChange(e.target.value)}
                      onBlur={handleReferralBlur}
                      placeholder={demoForm.fields.referralCode}
                      maxLength={REFERRAL_CODE_MAX}
                      className={`${inputClass} uppercase ${
                        referralStatus === 'invalid' || errors.referralCode
                          ? 'border-rose-400'
                          : referralStatus === 'valid'
                            ? 'border-emerald-400'
                            : 'border-gray-200'
                      }`}
                      autoComplete="off"
                      spellCheck={false}
                      autoCapitalize="characters"
                    />
                    {referralStatus === 'checking' && (
                      <p className="mt-1 text-xs text-gray-400">Checking…</p>
                    )}
                    {referralStatus === 'invalid' && errors.referralCode && (
                      <p className="mt-1 text-xs text-rose-500">{errors.referralCode}</p>
                    )}
                    {referralStatus === 'valid' && referralHint && (
                      <p className="mt-1 text-xs font-medium text-emerald-600">{referralHint}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-xl bg-white hover:bg-gray-100 transition-colors"
                >
                  {demoForm.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting || referralBlocked}
                  className="px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-primary hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : demoForm.submit}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
