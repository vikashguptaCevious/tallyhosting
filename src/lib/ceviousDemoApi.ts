export type DemoRequestPayload = {
  name: string
  email: string
  companyName: string
  mobileNumber: string
  countryRegion: string
  state: string
  message?: string
  referralCode?: string
  source: 'tallyhosting'
}

export type DemoRequestSuccess = {
  success: true
  id: string
  status: string
  routedTo: 'partner' | 'admin'
  message: string
}

export type DemoApiErrorBody = {
  error?: {
    code?: string
    message?: string
    details?: Array<{ field?: string; message?: string }>
    fields?: Record<string, string>
  }
}

export class DemoApiError extends Error {
  status: number
  code?: string
  fieldErrors: Record<string, string>

  constructor(
    message: string,
    options: { status: number; code?: string; fieldErrors?: Record<string, string> },
  ) {
    super(message)
    this.name = 'DemoApiError'
    this.status = options.status
    this.code = options.code
    this.fieldErrors = options.fieldErrors ?? {}
  }
}

export function getCeviousApiBase(): string {
  return String(import.meta.env.VITE_CEVIOUS_API_BASE || '').replace(/\/$/, '')
}

function mapFieldName(field: string): string {
  const map: Record<string, string> = {
    name: 'name',
    email: 'email',
    companyName: 'companyName',
    mobileNumber: 'mobile',
    mobile: 'mobile',
    countryRegion: 'country',
    country: 'country',
    state: 'state',
    message: 'message',
    referralCode: 'referralCode',
  }
  return map[field] || field
}

function extractFieldErrors(data: DemoApiErrorBody): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  const err = data.error
  if (!err) return fieldErrors

  if (err.code === 'INVALID_REFERRAL_CODE') {
    fieldErrors.referralCode = err.message || 'Invalid referral code'
    return fieldErrors
  }

  if (err.fields && typeof err.fields === 'object') {
    for (const [key, message] of Object.entries(err.fields)) {
      if (message) fieldErrors[mapFieldName(key)] = message
    }
  }

  if (Array.isArray(err.details)) {
    for (const detail of err.details) {
      if (detail?.field && detail?.message) {
        fieldErrors[mapFieldName(detail.field)] = detail.message
      }
    }
  }

  return fieldErrors
}

export async function validateReferralCode(code: string): Promise<{
  success: boolean
  empty?: boolean
  partnerName?: string
  message?: string
}> {
  const trimmed = String(code || '').trim()
  if (!trimmed) return { success: true, empty: true }

  const API_BASE = getCeviousApiBase()
  if (!API_BASE) {
    return { success: false, message: 'VITE_CEVIOUS_API_BASE is not configured in .env' }
  }

  const res = await fetch(
    `${API_BASE}/demo-requests/referral/${encodeURIComponent(trimmed)}`,
  )
  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean
    partnerName?: string
    error?: { message?: string }
  }

  if (!res.ok || !data?.success) {
    return { success: false, message: 'Invalid referral code' }
  }

  return { success: true, partnerName: data.partnerName }
}

export async function submitDemoRequest(
  form: Omit<DemoRequestPayload, 'source'>,
): Promise<DemoRequestSuccess> {
  const API_BASE = getCeviousApiBase()
  if (!API_BASE) {
    throw new DemoApiError('VITE_CEVIOUS_API_BASE is not configured in .env', { status: 0 })
  }

  const res = await fetch(`${API_BASE}/demo-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, source: 'tallyhosting' satisfies DemoRequestPayload['source'] }),
  })

  const data = (await res.json().catch(() => ({}))) as DemoRequestSuccess & DemoApiErrorBody

  if (!res.ok) {
    if (res.status === 429) {
      throw new DemoApiError('Too many requests. Please try again shortly.', {
        status: 429,
        code: 'RATE_LIMITED',
      })
    }

    const fieldErrors = extractFieldErrors(data)
    throw new DemoApiError(data?.error?.message || 'Failed to submit demo request', {
      status: res.status,
      code: data?.error?.code,
      fieldErrors,
    })
  }

  return data as DemoRequestSuccess
}
