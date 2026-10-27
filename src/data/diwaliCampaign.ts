/**
 * Diwali Dhamaka campaign page — all copy, prices and dates live here.
 * Edit this file to change the offer; the page and lead form read from it.
 */

export const DIWALI_CAMPAIGN_PATH = '/diwali-dhamaka-compaign'

/** Lead form page — `?plan=<id>` preselects a plan */
export const DIWALI_CLAIM_PATH = `${DIWALI_CAMPAIGN_PATH}/claim`

/** Sent with every lead so the CRM can tell campaigns apart */
export const DIWALI_CAMPAIGN_ID = 'diwali-dhamaka-2026'

/** Countdown target (IST). The timer hides itself once this passes. */
export const DIWALI_OFFER_ENDS_AT = '2026-11-15T23:59:59+05:30'

export type CampaignPlanId = 'normal' | 'plus' | 'secure'

export type CampaignPlan = {
  id: CampaignPlanId
  name: string
  subtitle: string
  currency: string
  /** Festive price per month */
  price: number
  /** Regular price per month, shown struck through */
  regularPrice: number
  period: string
  features: string[]
  popular?: boolean
}

export const campaignPlans: CampaignPlan[] = [
  {
    id: 'normal',
    name: 'Normal',
    subtitle: 'Ideal for Small Businesses',
    currency: '₹',
    price: 299,
    regularPrice: 499,
    period: 'Month',
    features: [
      'Secure Cloud Access',
      'Enterprise Infrastructure',
      'DDoS Protection',
      'Ticket Support',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    subtitle: 'Ideal for Growing Businesses',
    currency: '₹',
    price: 399,
    regularPrice: 599,
    period: 'Month',
    features: [
      'Everything in Normal +',
      'Google Backup',
      'Encrypted Backup',
      'Monthly Image Snapshot',
    ],
    popular: true,
  },
  {
    id: 'secure',
    name: 'Secure',
    subtitle: 'Ideal for CA Firms & Enterprises',
    currency: '₹',
    price: 499,
    regularPrice: 699,
    period: 'Month',
    features: [
      'Everything in Plus +',
      'Device Binding',
      'Disaster Recovery Ready',
      'Weekly Image Snapshot',
      'Login Audit Trail',
      'Priority Support',
    ],
  },
]

export const savingsPercent = (plan: CampaignPlan) =>
  Math.round(((plan.regularPrice - plan.price) / plan.regularPrice) * 100)

export const campaignBonuses = [
  { icon: 'truck', title: 'Free Migration', text: 'We move your Tally data to the cloud for you.' },
  { icon: 'cloud', title: 'Google Backup', text: 'Daily off-site backup, free for 12 months.' },
  { icon: 'shield', title: 'Security Setup', text: '2FA / MFA and firewall configured on day one.' },
  { icon: 'headphones', title: '24/7 Support', text: 'Real Tally experts, even on festival days.' },
] as const

export const campaignSteps = [
  { title: 'Pick your plan', text: 'Choose the Diwali plan that fits your team.' },
  { title: 'Share your details', text: 'Our team calls you back within a few hours.' },
  { title: 'Go live on cloud', text: 'Your Tally is up and running in 24 hours.' },
]

export const campaignUserOptions = ['1 user', '2–5 users', '6–10 users', '11–25 users', '25+ users']

export const campaignFaqs = [
  {
    q: 'Till when is the Diwali Dhamaka offer valid?',
    a: 'The festive prices apply to orders confirmed before the countdown on this page ends.',
  },
  {
    q: 'Will the Diwali price change after the first month?',
    a: 'No. The price you lock in during the offer stays the same for your billing term.',
  },
  {
    q: 'Do I need to buy a new Tally licence?',
    a: 'No. Your existing TallyPrime or Tally ERP 9 licence works on our cloud.',
  },
  {
    q: 'How long does it take to get started?',
    a: 'Most businesses are live within 24 hours, including data migration.',
  },
]
