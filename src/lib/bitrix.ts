import { API_URL } from '../config/env'

export const LEAD_SOURCE = 'Lead from TallyHosting'

function bitrixLeadEndpoint(): string {
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
  console.log(`${LEAD_SOURCE} — form submission:`, payload)

  const response = await fetch(bitrixLeadEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const result = (await response.json()) as BitrixLeadResponse

  console.log(`${LEAD_SOURCE} — Bitrix response:`, result)

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Failed to create lead in Bitrix24')
  }

  return result
}
