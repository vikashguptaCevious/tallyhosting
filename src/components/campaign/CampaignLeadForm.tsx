import { useState } from 'react'
import { ChevronDown, Lock } from 'lucide-react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { demoForm } from '../../data/content'
import {
  campaignUserOptions,
  DIWALI_CAMPAIGN_ID,
  type CampaignPlan,
} from '../../data/diwaliCampaign'
import {
  buildCampaignLead,
  submitCampaignLead,
  type CampaignLeadInput,
} from '../../lib/campaignLeads'
import { showToast } from '../../lib/toast'

interface CampaignLeadFormProps {
  plan: CampaignPlan
  /** Called with the submitted details once the lead is accepted */
  onSuccess: (customer: CampaignLeadInput) => void
}

type LeadErrors = Partial<Record<keyof CampaignLeadInput, string>>

const initialForm: CampaignLeadInput = {
  name: '',
  email: '',
  mobile: '',
  companyName: '',
  users: '',
  state: '',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form: CampaignLeadInput): LeadErrors {
  const errors: LeadErrors = {}
  if (form.name.trim().length < 2) errors.name = 'Enter your full name'
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address'
  const digits = form.mobile.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) errors.mobile = 'Enter a valid mobile number'
  if (!form.companyName.trim()) errors.companyName = 'Company name is required'
  if (!form.users) errors.users = 'Select number of users'
  if (!form.state) errors.state = 'Select your state'
  return errors
}

const inputClass =
  'w-full h-11 px-3.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#a533e8]/40 focus:border-[#a533e8]'
const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700'

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-rose-500">{message}</p> : null
}

export function CampaignLeadForm({ plan, onSuccess }: CampaignLeadFormProps) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<LeadErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const updateField = <K extends keyof CampaignLeadInput>(key: K, value: CampaignLeadInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      const customer: CampaignLeadInput = {
        name: form.name.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        companyName: form.companyName.trim(),
        users: form.users,
        state: form.state,
        message: form.message?.trim() || undefined,
      }
      await submitCampaignLead(buildCampaignLead(DIWALI_CAMPAIGN_ID, plan, customer))
      showToast('Your Diwali offer is reserved! Our team will call you shortly.', 'success')
      onSuccess(customer)
    } catch {
      showToast('Could not submit your request. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cl-name" className={labelClass}>
            Full name <span className="text-rose-500">*</span>
          </label>
          <input
            id="cl-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Your name"
            className={`${inputClass} ${errors.name ? 'border-rose-400' : 'border-gray-200'}`}
          />
          <FieldError message={errors.name} />
        </div>

        <div>
          <label htmlFor="cl-company" className={labelClass}>
            Company name <span className="text-rose-500">*</span>
          </label>
          <input
            id="cl-company"
            type="text"
            autoComplete="organization"
            value={form.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            placeholder="Business name"
            className={`${inputClass} ${errors.companyName ? 'border-rose-400' : 'border-gray-200'}`}
          />
          <FieldError message={errors.companyName} />
        </div>

        <div>
          <label className={labelClass}>
            Mobile number <span className="text-rose-500">*</span>
          </label>
          <PhoneInput
            defaultCountry="in"
            preferredCountries={['in', 'ae', 'us', 'gb', 'sg']}
            value={form.mobile}
            onChange={(phone) => updateField('mobile', phone)}
            className="demo-phone-input campaign-phone-input"
            inputClassName={`demo-phone-input__field ${errors.mobile ? 'border-rose-400' : ''}`}
            countrySelectorStyleProps={{
              buttonClassName: 'demo-phone-input__country-btn',
              dropdownStyleProps: { className: 'partner-phone-input__dropdown' },
            }}
          />
          <FieldError message={errors.mobile} />
        </div>

        <div>
          <label htmlFor="cl-email" className={labelClass}>
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="cl-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@company.com"
            className={`${inputClass} ${errors.email ? 'border-rose-400' : 'border-gray-200'}`}
          />
          <FieldError message={errors.email} />
        </div>

        <div>
          <label htmlFor="cl-users" className={labelClass}>
            Tally users <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              id="cl-users"
              value={form.users}
              onChange={(e) => updateField('users', e.target.value)}
              className={`${inputClass} appearance-none pr-9 ${errors.users ? 'border-rose-400' : 'border-gray-200'}`}
            >
              <option value="">Select</option>
              {campaignUserOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <FieldError message={errors.users} />
        </div>

        <div>
          <label htmlFor="cl-state" className={labelClass}>
            State <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              id="cl-state"
              value={form.state}
              onChange={(e) => updateField('state', e.target.value)}
              className={`${inputClass} appearance-none pr-9 ${errors.state ? 'border-rose-400' : 'border-gray-200'}`}
            >
              <option value="">Select</option>
              {demoForm.countryStates.India.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <FieldError message={errors.state} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cl-message" className={labelClass}>
            Anything we should know?{' '}
            <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="cl-message"
            rows={3}
            value={form.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="e.g. number of companies, current Tally setup, preferred call time"
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm focus:border-[#a533e8] focus:outline-none focus:ring-2 focus:ring-[#a533e8]/40"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#6a2ee8] via-[#7b2ff0] to-[#a533e8] py-3.5 text-base font-bold text-white shadow-[0_12px_28px_rgba(110,45,230,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(110,45,230,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting
          ? 'Reserving…'
          : `Reserve ${plan.name} at ${plan.currency}${plan.price}/${plan.period}`}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
        <Lock className="h-3.5 w-3.5" />
        No payment now. Your details are only used to call you about this offer.
      </p>
    </form>
  )
}
