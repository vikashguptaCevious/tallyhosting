import { API_URL } from '../config/env'

export const LEAD_SOURCE = 'Lead from TallyHosting'

function bitrixLeadEndpoint(): string {
  const explicitUrl = (import.meta.env.VITE_BITRIX_LEAD_URL ?? '').trim().replace(/\/+$/, '')
  if (explicitUrl) return explicitUrl

  const base = API_URL.replace(/\/+$/, '')
  return base ? `${base}/api/bitrix/lead` : '/api/bitrix/lead'
}

export type ContactLeadPayload = {
  formType: 'contact'
  name: string
  email: string
  phone?: string
  message?: string
}

export type PartnerLeadPayload = {
  formType: 'partner'
  firstName: string
  lastName: string
  companyName: string
  companyWebsite?: string
  workEmail: string
  mobile: string
  country: string
  partnershipModels: string[]
  interest?: string
}

export type LeadPayload = ContactLeadPayload | PartnerLeadPayload

export type BitrixLeadResponse = {
  success: boolean
  leadId?: number
  error?: string
}

export async function submitBitrixLead(payload: LeadPayload): Promise<BitrixLeadResponse> {
  const endpoint = bitrixLeadEndpoint()
  console.log(`${LEAD_SOURCE} — form submission:`, payload)

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.')
  }

  const rawBody = await response.text()
  let result: BitrixLeadResponse | null = null
  try {
    result = JSON.parse(rawBody) as BitrixLeadResponse
  } catch {
    result = null
  }

  console.log(`${LEAD_SOURCE} — Bitrix response:`, result ?? rawBody)

  // A non-JSON reply means the request never reached the lead handler — typically a
  // static host answering POST /api/bitrix/lead itself (405) instead of the Node server.
  if (!result) {
    throw new Error(
      `Lead endpoint "${endpoint}" is not available (HTTP ${response.status}). ` +
        'Run the Node server (npm start) behind this domain, or set VITE_BITRIX_LEAD_URL to a host that serves it.',
    )
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Failed to create lead in Bitrix24')
  }

  return result
}
