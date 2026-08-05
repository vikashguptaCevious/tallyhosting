import { API_URL } from '../config/env'

export const LEAD_SOURCE = 'Lead from TallyHosting'
const ASSIGNED_BY_ID = 3940

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

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  return {
    firstName: parts[0] || fullName,
    lastName: parts.slice(1).join(' '),
  }
}

/** Build the Bitrix crm.lead.add `fields` object (nginx proxies this body as-is). */
function buildBitrixFields(payload: LeadPayload) {
  if (payload.formType === 'contact') {
    const { firstName, lastName } = splitName(payload.name)
    return {
      TITLE: `${LEAD_SOURCE} - Contact Us`,
      NAME: firstName,
      LAST_NAME: lastName || undefined,
      EMAIL: [{ VALUE: payload.email, VALUE_TYPE: 'WORK' }],
      PHONE: payload.phone ? [{ VALUE: payload.phone, VALUE_TYPE: 'WORK' }] : undefined,
      COMMENTS: [
        LEAD_SOURCE,
        '',
        'Form: Contact Us',
        '',
        'Message:',
        payload.message?.trim() || 'N/A',
      ].join('\n'),
      SOURCE_DESCRIPTION: LEAD_SOURCE,
      ASSIGNED_BY_ID,
    }
  }

  return {
    TITLE: `${LEAD_SOURCE} - Become a Partner`,
    NAME: payload.firstName,
    LAST_NAME: payload.lastName,
    COMPANY_TITLE: payload.companyName,
    EMAIL: [{ VALUE: payload.workEmail, VALUE_TYPE: 'WORK' }],
    PHONE: [{ VALUE: payload.mobile, VALUE_TYPE: 'WORK' }],
    COMMENTS: [
      LEAD_SOURCE,
      '',
      'Form: Become a Partner',
      `Country: ${payload.country}`,
      payload.companyWebsite ? `Website: ${payload.companyWebsite}` : '',
      `Partnership Models: ${payload.partnershipModels.join(', ') || 'N/A'}`,
      '',
      'Interest:',
      payload.interest?.trim() || 'N/A',
    ]
      .filter(Boolean)
      .join('\n'),
    SOURCE_DESCRIPTION: LEAD_SOURCE,
    ASSIGNED_BY_ID,
  }
}

export async function submitBitrixLead(payload: LeadPayload): Promise<BitrixLeadResponse> {
  const endpoint = bitrixLeadEndpoint()
  const body = { fields: buildBitrixFields(payload) }
  console.log(`${LEAD_SOURCE} — form submission:`, payload)

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Could not reach the server. Please check your connection and try again.')
  }

  const rawBody = await response.text()
  let bitrix: {
    result?: number
    leadId?: number
    success?: boolean
    error?: string
    error_description?: string
  } | null = null

  try {
    bitrix = JSON.parse(rawBody)
  } catch {
    bitrix = null
  }

  console.log(`${LEAD_SOURCE} — Bitrix response:`, bitrix ?? rawBody)

  if (!bitrix) {
    throw new Error(
      `Lead endpoint returned HTTP ${response.status} (not JSON). Check nginx /api/bitrix/lead → Bitrix proxy.`,
    )
  }

  // Bitrix replies { result: <leadId> }; the older Node proxy replied { success, leadId }.
  const leadId = bitrix.result ?? bitrix.leadId
  if (response.ok && !bitrix.error && (leadId || bitrix.success)) {
    return { success: true, leadId }
  }

  throw new Error(
    bitrix.error_description ||
      bitrix.error ||
      `Failed to create lead in Bitrix24 (HTTP ${response.status}): ${rawBody.slice(0, 200)}`,
  )
}
