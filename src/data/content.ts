export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
]

export const partnerLoginUrl = 'https://partner.ceviouscloud.com'
export const customerLoginUrl = 'http://customer.tallyhosting.com/'

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
  badge: "India's Trusted Secure Tally Cloud Platform",
  heading: {
    taglines: [
      { prefix: 'Built for ', highlight: 'Bharat.', color: 'text-accent' },
      { prefix: 'Powered by ', highlight: 'AI.', color: 'text-primary' },
      { prefix: 'Secured in ', highlight: 'India.', color: 'text-accent-green' },
    ],
  },
  description:
    'Run your Tally from anywhere with enterprise-grade cloud infrastructure, automated backups, disaster recovery, and secure remote access.',
  audience: {
    prefix: 'Built for ',
    highlight: 'Businesses, CAs & Growing Teams.',
  },
  featureIcons: [
    { label: 'Secure Remote Access', icon: 'shield' },
    { label: 'Enterprise Infrastructure', icon: 'server' },
    { label: 'Google Backup', icon: 'cloud' },
    { label: 'Device Binding', icon: 'lock' },
    { label: 'Disaster Recovery', icon: 'refresh' },
    { label: '24/7 Monitoring', icon: 'activity' },
  ],
  cta: {
    primary: { label: 'Start Free Consultation', href: '#contact' },
    secondary: { label: 'Book Live Demo', href: '#contact' },
  },
  heroImage: '/images/hero%20img.webp',
  floatingCards: [
    { label: 'Uptime', value: '99.99%' },
    { label: 'Secure Access Anywhere', value: '' },
    { label: 'Users Online', value: '128' },
  ],
}

export const heroStats = [
  { value: 10000, suffix: '+', label: 'Businesses', icon: 'building' },
  { value: 250, suffix: '+', label: 'Tally Partners', icon: 'handshake' },
  { value: 99.99, suffix: '%', label: 'Infrastructure Availability', icon: 'shield', isDecimal: true },
  { value: 18, suffix: '+', label: 'Years of Trust', icon: 'award' },
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

export const pricingPlans = [
  {
    name: 'Normal',
    price: 499,
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
  {
    name: 'Plus',
    price: 599,
    period: 'Month',
    subtitle: 'Ideal for Growing Businesses',
    features: [
      'Everything in Normal +',
      'Google Backup',
      'Encrypted Backup',
      'Monthly Image Snapshot',
      'Email 2FA',
    ],
    cta: 'Choose Plus',
    popular: true,
  },
  {
    name: 'Secure',
    price: 699,
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
]

export const launchOffer = {
  badge: 'LAUNCH OFFER',
  title: 'First 12 Months',
  subtitle: 'FREE Included',
  items: ['Email 2FA', 'Google Backup', 'Migration Assistance', 'Security Setup'],
  valueNote: 'Value Worth ₹2,000+/Year',
}

export const ctaBanner = {
  heading: {
    prefix: 'Ready to Move Your Tally to a ',
    highlight: 'Secure Cloud?',
  },
  description:
    'Get enterprise-grade infrastructure, automated backups, and 24/7 expert support — all in one secure platform.',
  buttons: [
    { label: 'Book a Demo', href: '#contact', variant: 'white' as const },
    { label: 'Talk to an Expert', href: '#contact', variant: 'outline' as const },
  ],
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
    title: 'Mumbai Office',
    address:
      '2/704 Shri Ram Nagar, Purushottam Kheraj Rd, Mulund West, Mumbai, Maharashtra 400080',
  },
  email: 'anita@tallyhosting.co.in',
  phone: '+91 90824 05331 / 9167423035',
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
      links: ['About Us', 'Careers', 'Blog', 'Contact'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Ticket Portal', 'Migration Help', 'Live Chat'],
    },
  ],
  makeInIndiaLogo: '/images/india-flag.png',
}
