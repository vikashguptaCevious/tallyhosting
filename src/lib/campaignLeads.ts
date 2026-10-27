import type { CampaignPlan } from '../data/diwaliCampaign'

export type CampaignLeadInput = {
  name: string
  email: string
  mobile: string
  companyName: string
  users: string
  state: string
  message?: string
}

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
    utm: Record<string, string>
  }
  submittedAt: string
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

function readUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return utm
}

export function buildCampaignLead(
  campaign: string,
  plan: CampaignPlan,
  customer: CampaignLeadInput,
): CampaignLead {
  return {
    platform: 'TALLYHOSTING',
    campaign,
    plan: {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      regularPrice: plan.regularPrice,
      currency: plan.currency,
      period: plan.period,
    },
    customer,
    source: {
      page: window.location.pathname,
      referrer: document.referrer,
      utm: readUtm(),
    },
    submittedAt: new Date().toISOString(),
  }
}

/**
 * Sends a campaign lead.
 * TODO: replace the console log with `POST ${VITE_CEVIOUS_API_BASE}/campaign-leads` (body = this lead)
 * once the backend is live — the form already awaits this and shows an error toast if it throws.
 */
export async function submitCampaignLead(lead: CampaignLead): Promise<void> {
  console.log('[Diwali campaign lead]', lead)
}
