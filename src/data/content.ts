export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const heroContent = {
  badge: "India's Trusted Tally Cloud Hosting Platform",
  taglines: [
    { prefix: 'Built for ', highlight: 'Bharat.', color: 'text-accent' },
    { prefix: 'Powered by ', highlight: 'AI.', color: 'text-primary' },
    { prefix: 'Secured in ', highlight: 'India.', color: 'text-accent-green' },
  ],
  description:
    'TallyHosting delivers blazing fast, secure and AI-powered cloud hosting for Tally and business applications.',
  features: [
    { label: '100% Data in India' },
    { label: 'AI-Powered Management' },
    { label: '24x7 Expert Support' },
  ],
  cta: {
    primary: { label: 'Explore Plans', href: '#pricing' },
    secondary: { label: 'Talk to an Expert', href: '#contact' },
  },
  socialProof: 'Trusted by 8,000+ Businesses & 250+ Tally Partners',
  heroImage: '/images/hero%20img.webp',
  makeInIndiaLogo: '/images/make%20in%20india%20logo.webp',
  trustCardFeatures: [
    {
      icon: 'flag',
      title: '100% Data Residency in India',
      description: 'Your data stays in India, always.',
    },
    {
      icon: 'shield',
      title: 'Indian Data Sovereignty',
      description: 'We respect Indian laws. Your data. Your control.',
    },
    {
      icon: 'lock',
      title: 'Enterprise Grade Security',
      description: 'ISO 27001, SOC 2 Compliant, 24×7 Security Monitoring.',
    },
    {
      icon: 'map',
      title: 'Built for Bharat',
      description: 'Designed, Developed & Hosted in India.',
    },
  ],
}

export const heroPartnerLogos = [
  { name: 'Tally', src: '/images/tally-logo.png' },
  { name: 'Busy', src: '/images/busy-logo.png' },
  { name: 'Marg', src: '/images/marg-logo.png' },
  { name: 'SAP', src: '/images/sap-logo.png' },
  // { name: 'Zoho', src: '/images/ZOHO_New.png' },
]

export const logoCloudLogos = [
  ...heroPartnerLogos,
  { name: 'AWS', src: '/images/aws-logo.png' },
  { name: 'Azure', src: '/images/azure-logo.png' },
  { name: 'Google Cloud', src: '/images/google-cloud-logo.png' },
]

export const heroFeatureCards = [
  {
    icon: 'gauge',
    title: 'Tally Optimized',
    description: 'Built exclusively for Tally. Faster performance, smoother experience.',
  },
  {
    icon: 'shield',
    title: 'Secure Cloud Infrastructure',
    description: 'Advanced security, firewall, DDoS protection & encrypted data.',
  },
  {
    icon: 'devices',
    title: 'Anytime, Anywhere Access',
    description: 'Access your Tally from desktop, mobile or browser securely.',
  },
  {
    icon: 'sparkles',
    title: 'AI-Powered Insights',
    description: 'Smart monitoring, anomaly detection & proactive alerts with AI.',
  },
  {
    icon: 'backup',
    title: 'Automated Backup & DR',
    description: 'Automated backup with Disaster Recovery for business continuity.',
  },
  {
    icon: 'headphones',
    title: '24x7 Expert Support',
    description: 'Real humans. Real support. Always available when you need.',
  },
]

export const heroStats = [
  { value: 10000, suffix: '+', label: 'Happy Businesses', icon: 'users' },
  { value: 250, suffix: '+', label: 'Tally Partners', icon: 'handshake' },
  { value: 99, suffix: '.99%', label: 'Uptime Guarantee', icon: 'shield' },
  { value: 24, suffix: '/7', label: 'Expert Support', icon: 'headphones' },
  { value: 17, suffix: '+', label: 'Years of Trust', icon: 'award' },
]

export const partnerOffer = {
  title: 'Launch Offer for Partners!',
  cta: { label: 'Become a Partner', href: '#contact' },
}

export const infrastructureLogos = [
  { name: 'AWS', src: '/images/aws-logo.png' },
  { name: 'CtrlS', text: 'CtrlS' },
  { name: 'NTT', text: 'NTT' },
  { name: 'Google Cloud', src: '/images/google-cloud-logo.png' },
  { name: 'Azure', src: '/images/azure-logo.png' },
]

export const complianceBadges = [
  { label: 'ISO 27001', sublabel: 'Certified' },
  { label: 'SOC 2', sublabel: 'TYPE II' },
  { label: 'DPCI', sublabel: 'COMPLIANT' },
]

export const trustHighlights = [
  {
    icon: 'server',
    title: 'No Hardware Cost',
    description: '100% Cloud. 0% Capex.',
  },
  {
    icon: 'rocket',
    title: 'Quick Setup',
    description: 'Get started in minutes.',
  },
  {
    icon: 'trending',
    title: 'Scalable on Demand',
    description: 'Upgrade resources anytime.',
  },
  {
    icon: 'wallet',
    title: 'Cost Effective',
    description: 'Pay only for what you use.',
  },
  {
    icon: 'users',
    title: 'Trusted by Experts',
    description: 'Preferred by CA & Businesses.',
  },
]

export const heroSlides = [
  {
    id: 1,
    title: 'TallyHosting',
    subtitle: 'Tally On Cloud',
    description:
      'Securely Work Remotely With Tally On Cloud For Accounting With Any Tally Version Anytime, Anywhere, Any device.',
    price: 'Starting @ Rs.699 /user /month',
    image: '/images/banner-cloud.png',
    variant: 'blue' as const,
  },
  {
    id: 2,
    title: 'Most Secure',
    highlight: 'Tally on Cloud',
    subtitle: 'For Tally ERP9',
    description:
      'Over 1.6 million businesses across 100 countries are satisfactorily using Tally on Cloud. Tally from anywhere, anytime, any OS/Device.',
    image: '/images/banner-network.png',
    variant: 'gradient' as const,
  },
  {
    id: 3,
    title: 'Fast Secure',
    highlight: 'Simply Amazing',
    bullets: [
      'Simple & Useful',
      'Designed for your Business',
      'Tally data stores on enterprise-class data centre',
      'Anytime Anywhere Any device',
      'Automatic Tally Backup with DRaaS service',
      '24/7 IT Support',
    ],
    image: '/images/banner-laptop.png',
    variant: 'light' as const,
  },
]

export const acronisFeatures = [
  { icon: '🔒', title: 'Full Image Backup', text: 'Shield your entire system - OS files, apps, settings, the works!' },
  { icon: '🔄', title: 'Active Disk Cloning', text: 'Clone your active Windows system effortlessly.' },
  { icon: '🛡️', title: 'Active Protection', text: 'AI-powered defense against real-time ransomware.' },
  { icon: '🌐', title: 'Access Anywhere', text: 'Grab files from your Acronis Cloud backup anywhere, anytime.' },
]

export const whyTallyCards = [
  {
    icon: '☁️',
    title: 'Cloud Solution',
    description: 'Access Tally on Cloud anywhere at anytime at your convenience.',
  },
  {
    icon: '🖨️',
    title: 'Remote Printers',
    description: 'Generate & Print your Invoices anywhere while working in the office or at home.',
  },
  {
    icon: '💰',
    title: 'Reasonable Cost',
    description: 'Reasonable Cost according to your requirements. Pay monthly, quarterly or yearly. No Signup fees.',
  },
  {
    icon: '🔐',
    title: 'Highly Secured & Backup',
    description: 'With no direct access allowed to any users your Tally is safeguarded against all the attacks.',
  },
]

export const features = [
  {
    icon: '🌐',
    title: 'Any Tally-Version',
    description:
      'Install your choice of Tally ERP9 Version. Upgrade to your choice of Tally ERP9 Version in future (Tally Subscription is Not Compulsory)',
  },
  {
    icon: '⏰',
    title: 'Access Anytime',
    description:
      'Work during the day or during the night. Data Center Uptime of 99.99 percent. Available 24/7 from anywhere',
  },
  {
    icon: '🖨️',
    title: 'Local Printer',
    description:
      'Supports printing on Local printers and from one location to another location. Centralized printer installation',
  },
  {
    icon: '📱',
    title: 'Anytime, Anywhere, Any Device Access',
    description:
      'Run Tally Anytime, Anywhere & on any Windows or Mac devices. Access virtually from anywhere through RDP & Web browser',
  },
  {
    icon: '🔐',
    title: 'Highly Secured and Backup',
    description:
      'Each user is availed with a particular VM, ensuring less chances of malicious practices. Your Tally is safeguarded against all attackers.',
  },
  {
    icon: '👤',
    title: 'User Friendly',
    description:
      'Your User can simply access Files online from any device at anytime. Work with exported files from any device at any time.',
  },
  {
    icon: '⚙️',
    title: 'Customizations Support',
    description: 'Cloud Support Tally Customization (TDL) support.',
  },
  {
    icon: '🔄',
    title: 'Real-Time Database',
    description:
      'No need to sync between locations. One Tally License can be used for multiple locations. Centralized location of Data.',
  },
]

export const testimonials = [
  {
    name: 'Shrikant',
    role: 'Accounts Manager',
    company: 'Goqii',
    text: 'Satisfactory service and Very quick feed backs',
    avatar: 'S',
  },
  {
    name: 'Nikhil',
    role: 'CA',
    company: 'Kantilal Chhotalal',
    text: 'In a 15 minute chat with Anita from tallyhosting at my office, not only did we get a solution to the problem by offering us a remote tools option, but also resulted in a long term cost savings to my company.',
    avatar: 'N',
  },
  {
    name: 'Barkha M',
    role: 'Owner',
    company: 'RAB House',
    text: 'The best partner of tally! Special mention to Anita, She has helped me in every step of setting up my business and making my business digital.',
    avatar: 'B',
  },
  {
    name: 'Ritesh Chajjed',
    role: 'Owner',
    company: 'Accounts Solution Point',
    text: 'Tally on clouds nice facilities, Nice management any where, Fantastic security data',
    avatar: 'R',
  },
  {
    name: 'Laxmi',
    role: 'Accountant',
    company: 'Black Hawk Security System Pvt. Ltd.',
    text: 'We have received good and prompt service with reasonable fees. Would recommend to others.',
    avatar: 'L',
  },
  {
    name: 'Parag Desai',
    role: 'Manager',
    company: 'Fintree Finance Pvt. Ltd.',
    text: 'We were previously using a different cloud service in which we faced issues. In Tallyhosting, we face problems only if the Internet is not available at our end.',
    avatar: 'P',
  },
]

export const stats = [
  { value: 8000, suffix: '+', label: 'Total Active Users', color: 'text-primary' },
  { value: 1000, suffix: '+', label: 'No of Company', color: 'text-primary' },
  { value: 100, suffix: '+', label: 'Daily Request', color: 'text-emerald-500' },
  { value: 8000, suffix: '+', label: 'Total Request Handle', color: 'text-pink-500' },
]

export const trustedCompanies = [
  'L.S. CHEMICALS',
  'WASAN',
  'ALPHA',
  'BLACK HAWK',
  'GOQii',
  'ISPRAVA',
  'FINTREE',
  'KANTILAL',
]

export const services = [
  'Web Development',
  'Web Hosting',
  'Professional Email',
  'Dedicated VM based',
  'User Based',
]

export const footerFeatures = [
  'Anytime, Anywhere, Any Device Access',
  'Any Tally-Version',
  'Access Anytime',
  'Highly Secured and Backup',
  'User Friendly',
  'Customizations Support',
  'Real-Time Database',
  'Local Printer',
]

export const faqs = [
  {
    q: 'What is Tally on Cloud?',
    a: 'Tally on Cloud allows you to access your Tally ERP9 software remotely from anywhere, on any device, through secure cloud hosting.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plans start at Rs.699 per user per month. We offer flexible monthly, quarterly, and yearly payment options with no signup fees.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes! Each user gets a dedicated VM with no direct access. We also offer Acronis backup protection starting at Rs.250/month for 10GB.',
  },
  {
    q: 'Can I use any Tally version?',
    a: 'Yes, you can install and upgrade to any Tally ERP9 version of your choice. Tally subscription is not compulsory.',
  },
]
