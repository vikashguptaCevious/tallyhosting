import { CUSTOMER_PORTAL_URL, PARTNER_PORTAL_URL } from '../config/env'

export const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Blogs', href: '/blog' },
]

/** @deprecated Prefer importing from `../config/env` directly */
export const partnerLoginUrl = PARTNER_PORTAL_URL
/** @deprecated Prefer importing from `../config/env` directly */
export const customerLoginUrl = CUSTOMER_PORTAL_URL

export const partnerNav = {
  label: 'Partner',
  items: [{ label: 'Become a Partner', action: 'modal' as const }],
}

export const partnerForm = {
  badge: 'PARTNER PROGRAM',
  title: 'Become a Partner',
  description: "Tell us about your business and how you'd like to partner with TallyHosting.",
  countries: ['India', 'United States', 'United Kingdom', 'UAE', 'Singapore', 'Other'],
  partnershipModels: [
    'Co-marketing',
    'Co-selling',
    'Referral',
    'Building solutions and integrations',
    'Training',
  ],
  fields: {
    firstName: 'Jane',
    lastName: 'Smith',
    companyName: 'Acme Technologies Pvt Ltd',
    companyWebsite: 'example.com',
    workEmail: 'jane@example.com',
    mobile: '+91',
    country: 'Country/Region',
    partnershipLabel: 'What is your ideal partnership model with TallyHosting?',
    partnershipHint: 'Select all that apply.',
    interestLabel: 'Why are you interested in partnering with TallyHosting?',
    interestPlaceholder:
      "Describe the business opportunities you'd like to partner with TallyHosting on.",
  },
  cancel: 'Cancel',
  submit: 'Submit application',
}

export const heroContent = {
  badge: 'ENTERPRISE-GRADE TALLY CLOUD',
  heading: {
    line1: "India's Most Secure",
    line2: 'Tally Cloud Platform',
  },
  description:
    'Enterprise-grade Tally Cloud with advanced security, automated backup, disaster recovery and expert support.',
  featureIcons: [
    { label: 'Run Tally Anywhere', icon: 'globe' },
    { label: 'Securely', icon: 'shield' },
    { label: 'Reliably', icon: 'shieldCheck' },
    { label: 'Effortlessly', icon: 'rocket' },
  ],
  cta: {
    primary: { label: 'Start 7-Day Free Trial', href: '#contact' },
    secondary: { label: 'View Pricing', href: '#pricing' },
  },
  /** Product visual used in feature / comparison sections */
  heroImage: '/images/hero%20img.webp',
  /** Hero background (India landmarks) */
  heroBgImage: '/images/Exact%20BG%20(1).webp',
  /** Hero foreground VPS / cloud shield (absolute layer) */
  heroAbsoluteImage: '/images/absolute%20(1).webp',
  floatingCards: [
    { highlight: 'HA-Cloud', label: 'Infrastructure', icon: 'cloud' },
    { highlight: 'Tally Optimize', label: 'Performance', icon: 'tally' },
    { highlight: '2FA Security', label: 'Secure Access', icon: 'userShield' },
    { highlight: 'Automatic Google', label: 'Backup', icon: 'google' },
  ],
}

export const heroStats = [
  { value: 25000, suffix: '+', label: 'Cloud Users', icon: 'users' },
  { value: 18, suffix: '+', label: 'Years Experience', icon: 'award' },
  { value: 100, suffix: '+', label: 'Partners', icon: 'handshake' },
  { value: 99.9, suffix: '%', label: 'Availability', icon: 'check', isDecimal: true, decimals: 1 },
  { value: 10, suffix: '+', label: 'Countries', icon: 'globe' },
]

export const heroPartners = [
  { label: 'Hosted On', name: 'AWS' },
  { label: 'Powered by', name: 'CloudOrc' },
]

export const whyChooseCards = [
  {
    icon: 'shield',
    title: 'Enterprise Security',
    items: ['DDoS Protection', 'SSL Encryption', 'Secure Login'],
  },
  {
    icon: 'backup',
    title: 'Automated Backup',
    items: ['Google Backup', 'Encrypted Backup', 'Snapshot Restore'],
  },
  {
    icon: 'globe',
    title: 'Work From Anywhere',
    items: ['Desktop', 'Laptop', 'Browser', 'Mobile'],
  },
  {
    icon: 'zap',
    title: 'High Performance',
    items: ['Enterprise Hardware', 'Fast SSD Storage', 'Low Latency'],
  },
  {
    icon: 'users',
    title: 'Multi User Access',
    items: ['Multiple Users', 'Role Based Access', 'Centralized Data'],
  },
  {
    icon: 'headphones',
    title: '24x7 Expert Support',
    items: ['Real Engineers', 'Migration Help', 'Ticket Portal'],
  },
]

export const darkFeatureSection = {
  heading: {
    prefix: 'Your Business Deserves More Than ',
    highlight: 'Basic Cloud Hosting',
  },
  columns: [
    {
      icon: 'shield',
      title: 'Security',
      items: ['Device Binding', 'Email MFA / 2FA', 'Login Monitoring', 'Secure Access'],
    },
    {
      icon: 'backup',
      title: 'Backup',
      items: ['Google Backup', 'Encrypted Backup', 'Snapshot Recovery', 'Data Always Safe'],
    },
    {
      icon: 'continuity',
      title: 'Business Continuity',
      items: ['Disaster Recovery', 'High Availability', 'Daily Monitoring', 'Zero Data Loss'],
    },
  ],
}

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Choose Your Plan',
    description: 'Select the plan that fits your business.',
  },
  {
    step: 2,
    title: 'Migration by Experts',
    description: 'Our team migrates your Tally data securely.',
  },
  {
    step: 3,
    title: 'Secure Cloud Setup',
    description: 'We configure, secure & optimize your cloud.',
  },
  {
    step: 4,
    title: 'Start Working Anywhere',
    description: 'Access Tally from anywhere, anytime with total peace.',
  },
]

export const comparisonData = {
  typical: {
    title: 'Typical Cloud Provider',
    items: [
      'Only Remote Access',
      'No Backup',
      'Limited Support',
      'No Disaster Recovery',
      'No Security Layer',
      'No Business Continuity',
      'No Customer Portal',
    ],
  },
  tallyHosting: {
    title: 'TallyHosting',
    items: [
      'Enterprise Infrastructure',
      'Google Backup',
      'Encrypted Backup',
      'Disaster Recovery',
      'Device Binding & 2FA',
      '24/7 Expert Support',
      'Customer Portal & Self Service',
      'Business Continuity',
      'Secure. Backed Up. Business Ready.',
    ],
  },
}

export type PricingPlan = {
  name: string
  price: number
  currency: string
  period: string
  subtitle: string
  features: string[]
  cta: string
  popular: boolean
}

const sharedPlanCopy = {
  normal: {
    name: 'Normal',
    period: 'Month',
    subtitle: 'Ideal for Small Businesses',
    features: [
      'Secure Cloud Access',
      'Enterprise Infrastructure',
      'DDoS Protection',
      'Ticket Support',
    ],
    cta: 'Choose Normal',
    popular: false,
  },
  plus: {
    name: 'Plus',
    period: 'Month',
    subtitle: 'Ideal for Growing Businesses',
    features: [
      'Everything in Normal +',
      'Google Backup',
      'Encrypted Backup',
      'Monthly Image Snapshot',
    ],
    cta: 'Choose Plus',
    popular: true,
  },
  secure: {
    name: 'Secure',
    period: 'Month',
    subtitle: 'Ideal for CA Firms & Enterprises',
    features: [
      'Everything in Plus +',
      'Device Binding',
      'Disaster Recovery Ready',
      'Weekly Image Snapshot',
      'Login Audit Trail',
      'Priority Support',
    ],
    cta: 'Choose Secure',
    popular: false,
  },
}

/** India pricing (INR) */
export const pricingPlansIndia: PricingPlan[] = [
  { ...sharedPlanCopy.normal, price: 499, currency: '₹' },
  { ...sharedPlanCopy.plus, price: 599, currency: '₹' },
  { ...sharedPlanCopy.secure, price: 699, currency: '₹' },
]

/** Saudi Arabia pricing (EUR) */
export const pricingPlansSaudi: PricingPlan[] = [
  { ...sharedPlanCopy.normal, price: 399, currency: '€' },
  { ...sharedPlanCopy.plus, price: 499, currency: '€' },
  { ...sharedPlanCopy.secure, price: 599, currency: '€' },
]

/** @deprecated Prefer country-specific lists via PricingSection */
export const pricingPlans = pricingPlansIndia

export const launchOffer = {
  badge: 'LAUNCH OFFER',
  title: 'First 12 Months',
  subtitle: 'FREE Included',
  items: ['Google Backup', 'Migration Assistance', 'Security Setup'],
  valueNote: 'Value Worth ₹2,000+/Year',
  valueNoteSaudi: 'Value Worth €50+/Year',
}

export const ctaBanner = {
  heading: {
    prefix: 'Ready to Move Your Tally to a ',
    highlight: 'Secure Cloud?',
  },
  description:
    'Get enterprise-grade infrastructure, automated backups, and 24/7 expert support — all in one secure platform.',
  buttons: [
    { label: 'Book a Demo', href: '#demo', variant: 'white' as const, action: 'demo' as const },
    { label: 'Talk to an Expert', href: '#contact', variant: 'outline' as const },
  ],
}

export const demoForm = {
  badge: 'BOOK A DEMO',
  title: 'Request a Demo',
  description: 'Share your details and our team will schedule a personalized TallyHosting demo.',
  countries: ['India', 'United States', 'United Kingdom', 'UAE', 'Singapore', 'Other'],
  countryStates: {
    India: [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Delhi',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
      'Other',
    ],
    'United States': [
      'Alabama',
      'Alaska',
      'Arizona',
      'California',
      'Colorado',
      'Florida',
      'Georgia',
      'Illinois',
      'Massachusetts',
      'Michigan',
      'New Jersey',
      'New York',
      'North Carolina',
      'Ohio',
      'Pennsylvania',
      'Texas',
      'Virginia',
      'Washington',
      'Other',
    ],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland', 'Other'],
    UAE: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah', 'Other'],
    Singapore: ['Central Region', 'East Region', 'North Region', 'North-East Region', 'West Region', 'Other'],
    Other: ['Other'],
  } as Record<string, string[]>,
  fields: {
    name: 'Your Name',
    email: 'you@company.com',
    companyName: 'Company Name',
    mobile: '+91',
    country: 'Country/Region',
    state: 'Select state',
    message: 'Tell us what you would like to see in the demo (optional)',
    referralCode: 'Referral code (optional)',
  },
  cancel: 'Cancel',
  submit: 'Request Demo',
  successMessage: 'Demo request submitted!',
}

export const faqSection = {
  heading: 'Frequently Asked Questions',
  subheading: 'Everything you need to know about Tally cloud hosting with TallyHosting.',
  items: [
    {
      question: 'What is Tally cloud hosting?',
      answer:
        'Tally cloud hosting lets you run Tally on secure remote servers instead of a local PC. Your team can access Tally from anywhere with an internet connection while your data stays protected on enterprise-grade infrastructure.',
    },
    {
      question: 'Is my Tally data secure on the cloud?',
      answer:
        'Yes. We use encrypted connections, secure access controls, and enterprise-grade data centres in India. Your Tally data is protected with automated backups and multi-layer security so your business information stays safe.',
    },
    {
      question: 'Can multiple users access Tally at the same time?',
      answer:
        'Absolutely. TallyHosting supports multi-user remote access, so your team, accountants, and branch offices can work on Tally simultaneously from different locations without conflicts.',
    },
    {
      question: 'Do you provide automated backups?',
      answer:
        'Yes. Automated daily backups are included with every plan. Your Tally data is backed up regularly so you can recover quickly in case of accidental deletion, hardware failure, or other disruptions.',
    },
    {
      question: 'How long does migration to the cloud take?',
      answer:
        'Most migrations are completed within 24–48 hours. Our team handles the entire process — including data transfer, security setup, and user configuration — with minimal downtime for your business.',
    },
    {
      question: 'What kind of support do you offer?',
      answer:
        'We provide 24/7 expert support via phone, email, and live chat. Whether you need help with setup, troubleshooting, or scaling your plan, our Tally specialists are always available.',
    },
  ],
}

export const contactSection = {
  heading: 'Get In Touch',
  description:
    'Ready to move your Tally to the cloud? Contact us today for a free consultation and quote.',
  office: {
    title: 'Noida Office',
    address:
      'C-89, 2nd Floor, Sector-2, Noida, Uttar Pradesh, 201301, India',
  },
  email: 'contact@tallyhosting.com',
  phone: '+91 9205022262',
  formTitle: 'Enquiry Now',
  submitLabel: 'Send Enquiry',
  successMessage: 'Request Submitted!',
  fields: {
    name: 'Your Name',
    email: 'Your Email',
    phone: 'Phone Number',
    message: 'Your Message',
  },
}

export const footerData = {
  description:
    'Enterprise-grade Tally cloud hosting with secure remote access, automated backups, and 24/7 expert support.',
  social: [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
  ],
  columns: [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Security', 'Backup', 'Disaster Recovery'],
    },
    {
      title: 'Solutions',
      links: ['Businesses', 'CA Firms', 'Multi-Branch', 'Remote Teams'],
    },
    {
      title: 'Partners',
      links: [{ label: 'Become a Partner', action: 'modal' as const }],
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Careers',
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/#contact' },
      ],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Ticket Portal', 'Migration Help', 'Live Chat'],
    },
  ],
  makeInIndiaLogo: '/images/india-flag.png',
}
