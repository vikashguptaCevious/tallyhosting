import type { IncomingMessage, ServerResponse } from 'node:http'

const LEAD_SOURCE_TAG = 'Lead from TallyHosting'

type ContactLeadPayload = {
  formType: 'contact'
  name: string
  email: string
  phone?: string
  message?: string
}

type PartnerLeadPayload = {
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

type LeadPayload = ContactLeadPayload | PartnerLeadPayload

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  return {
    firstName: parts[0] || fullName,
    lastName: parts.slice(1).join(' '),
  }
}

function buildBitrixFields(payload: LeadPayload, assignedById: number) {
  if (payload.formType === 'contact') {
    const { firstName, lastName } = splitName(payload.name)

    return {
      TITLE: `${LEAD_SOURCE_TAG} - Contact Us`,
      NAME: firstName,
      LAST_NAME: lastName || undefined,
      EMAIL: [{ VALUE: payload.email, VALUE_TYPE: 'WORK' }],
      PHONE: payload.phone ? [{ VALUE: payload.phone, VALUE_TYPE: 'WORK' }] : undefined,
      COMMENTS: [
        LEAD_SOURCE_TAG,
        '',
        'Form: Contact Us',
        '',
        'Message:',
        payload.message?.trim() || 'N/A',
      ].join('\n'),
      SOURCE_DESCRIPTION: LEAD_SOURCE_TAG,
      ASSIGNED_BY_ID: assignedById,
    }
  }

  const comments = [
    LEAD_SOURCE_TAG,
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
    .join('\n')

  return {
    TITLE: `${LEAD_SOURCE_TAG} - Become a Partner`,
    NAME: payload.firstName,
    LAST_NAME: payload.lastName,
    COMPANY_TITLE: payload.companyName,
    EMAIL: [{ VALUE: payload.workEmail, VALUE_TYPE: 'WORK' }],
    PHONE: [{ VALUE: payload.mobile, VALUE_TYPE: 'WORK' }],
    COMMENTS: comments,
    SOURCE_DESCRIPTION: LEAD_SOURCE_TAG,
    ASSIGNED_BY_ID: assignedById,
  }
}

export function createBitrixLeadHandler(env: Record<string, string>) {
  const webhookUrl = env.BITRIX_WEBHOOK_URL?.replace(/\/$/, '')
  const assignedById = Number(env.BITRIX_ASSIGNED_BY_ID) || 3940

  return async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
      return
    }

    if (!webhookUrl) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'BITRIX_WEBHOOK_URL is not configured' }))
      return
    }

    try {
      const rawBody = await readBody(req)
      const payload = JSON.parse(rawBody) as LeadPayload

      console.log(`${LEAD_SOURCE_TAG} — creating Bitrix lead:`, payload)

      const fields = buildBitrixFields(payload, assignedById)

      const bitrixResponse = await fetch(`${webhookUrl}/crm.lead.add.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      })

      const bitrixData = (await bitrixResponse.json()) as {
        result?: number
        error?: string
        error_description?: string
      }

      console.log(`${LEAD_SOURCE_TAG} — Bitrix API result:`, bitrixData)

      if (!bitrixResponse.ok || bitrixData.error) {
        res.statusCode = 502
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            error: bitrixData.error_description || bitrixData.error || 'Bitrix API request failed',
          })
        )
        return
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: true, leadId: bitrixData.result }))
    } catch (error) {
      console.error(`${LEAD_SOURCE_TAG} — Bitrix lead error:`, error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : 'Unexpected server error',
        })
      )
    }
  }
}
