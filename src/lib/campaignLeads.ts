import type { CampaignPlan } from '../data/diwaliCampaign'
import { getCeviousApiBase } from './ceviousDemoApi'

export type CampaignLeadInput = {
  name: string
  email: string
  mobile: string
  companyName: string
  users: string
  state: string
  message?: string
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const
type UtmKey = (typeof UTM_KEYS)[number]
type Utm = Record<UtmKey, string>

export type CampaignLead = {
  /** Same platform key the backend uses for blogs */
  platform: 'TALLYHOSTING'
  campaign: string
  plan: {
    id: string
    name: string
    price: number
    regularPrice: number
    currency: string
    period: string
  }
  customer: CampaignLeadInput
  source: {
    page: string
    referrer: string
    utm: Utm
  }
  submittedAt: string
}

export type CampaignLeadSuccess = {
  success: true
  id: string
  message: string
}

/* ---------- Visit source (UTM + referrer) ---------- */

const SOURCE_STORAGE_KEY = 'th:campaign-source'

type StoredSource = { referrer: string; utm: Utm }

function emptyUtm(): Utm {
  return { utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' }
}

function readUrlUtm(): Utm | null {
  const params = new URLSearchParams(window.location.search)
  const utm = emptyUtm()
  let found = false
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim()
    if (value) {
      utm[key] = value
      found = true
    }
  }
  return found ? utm : null
}

function readStoredSource(): StoredSource | null {
  try {
    const raw = window.sessionStorage.getItem(SOURCE_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredSource) : null
  } catch {
    return null
  }
}

/**
 * Call on every campaign page mount. The first landing stores its referrer and UTM params so
 * they still reach the API after the visitor moves to /claim (whose URL usually has no UTM).
 * A later landing that carries fresh UTM params replaces the stored UTM.
 */
export function rememberCampaignSource() {
  const stored = readStoredSource()
  const urlUtm = readUrlUtm()
  if (stored && !urlUtm) return
  const next: StoredSource = {
    referrer: stored?.referrer ?? document.referrer ?? '',
    utm: urlUtm ?? emptyUtm(),
  }
  try {
    window.sessionStorage.setItem(SOURCE_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage blocked (private mode, policies) — the current URL is still used on submit
  }
}

export function buildCampaignLead(
  campaign: string,
  plan: CampaignPlan,
  customer: CampaignLeadInput,
): CampaignLead {
  const stored = readStoredSource()
  return {
    platform: 'TALLYHOSTING',
    campaign,
    plan: {
      id: plan.id,
      name: plan.name,
      price: Number(plan.price),
      regularPrice: Number(plan.regularPrice),
      currency: plan.currency,
      period: plan.period,
    },
    customer,
    source: {
      page: window.location.pathname,
      referrer: stored?.referrer ?? document.referrer ?? '',
      utm: readUrlUtm() ?? stored?.utm ?? emptyUtm(),
    },
    submittedAt: new Date().toISOString(),
  }
}

/* ---------- API call ---------- */

const REQUEST_TIMEOUT_MS = 15_000

const CUSTOMER_FIELDS: ReadonlyArray<keyof CampaignLeadInput> = [
  'name',
  'email',
  'mobile',
  'companyName',
  'users',
  'state',
  'message',
]

export type CampaignLeadErrorKind = 'validation' | 'rate-limit' | 'server' | 'network'

export class CampaignLeadError extends Error {
  kind: CampaignLeadErrorKind
  status: number
  code?: string
  /** `customer.*` server errors, keyed by form field */
  fieldErrors: Partial<Record<keyof CampaignLeadInput, string>>
  retryAfterSeconds?: number

  constructor(
    message: string,
    options: {
      kind: CampaignLeadErrorKind
      status: number
      code?: string
      fieldErrors?: Partial<Record<keyof CampaignLeadInput, string>>
      retryAfterSeconds?: number
    },
  ) {
    super(message)
    this.name = 'CampaignLeadError'
    this.kind = options.kind
    this.status = options.status
    this.code = options.code
    this.fieldErrors = options.fieldErrors ?? {}
    this.retryAfterSeconds = options.retryAfterSeconds
  }
}

type CampaignLeadErrorBody = {
  message?: string
  retryAfterSeconds?: number
  error?: {
    code?: string
    message?: string
    retryAfterSeconds?: number
    fields?: Record<string, string>
  }
}

export async function submitCampaignLead(lead: CampaignLead): Promise<CampaignLeadSuccess> {
  const API_BASE = getCeviousApiBase()
  if (!API_BASE) {
    throw new CampaignLeadError('VITE_CEVIOUS_API_BASE is not configured in .env', {
      kind: 'server',
      status: 0,
    })
  }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let res: Response
  try {
    res = await fetch(`${API_BASE}/campaign-leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: controller.signal,
    })
  } catch {
    // Offline, DNS/CORS failure or the 15s timeout
    throw new CampaignLeadError('Network error', { kind: 'network', status: 0 })
  } finally {
    window.clearTimeout(timer)
  }

  const data = (await res.json().catch(() => ({}))) as CampaignLeadSuccess & CampaignLeadErrorBody

  if (res.ok) return data as CampaignLeadSuccess

  if (res.status === 429) {
    const retryAfterSeconds =
      data.error?.retryAfterSeconds ??
      data.retryAfterSeconds ??
      (Number(res.headers.get('Retry-After')) || undefined)
    throw new CampaignLeadError(data.error?.message || data.message || 'Too many submissions', {
      kind: 'rate-limit',
      status: 429,
      code: data.error?.code,
      retryAfterSeconds,
    })
  }

  const message = data.error?.message || data.message || 'Request failed'

  if (res.status === 400 && data.error?.fields) {
    const fieldErrors: Partial<Record<keyof CampaignLeadInput, string>> = {}
    let unmapped = false
    for (const [key, value] of Object.entries(data.error.fields)) {
      const field = key.startsWith('customer.') ? (key.slice(9) as keyof CampaignLeadInput) : null
      if (field && CUSTOMER_FIELDS.includes(field)) fieldErrors[field] = value
      else unmapped = true
    }
    // plan.*, campaign, source.* … can only fail through a site bug — surface it for debugging
    if (unmapped) console.error('[campaign-leads] request rejected', res.status, data)
    throw new CampaignLeadError(message, {
      kind: unmapped ? 'server' : 'validation',
      status: 400,
      code: data.error.code,
      fieldErrors,
    })
  }

  console.error('[campaign-leads] request failed', res.status, data)
  throw new CampaignLeadError(message, { kind: 'server', status: res.status, code: data.error?.code })
}
