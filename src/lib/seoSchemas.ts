import { absoluteUrl, DEFAULT_DESCRIPTION, SITE_NAME } from '../components/Seo'
import { WEBSITE_URL } from '../config/env'
import { contactSection, faqSection, footerData } from '../data/content'

const ORG_ID = `${WEBSITE_URL}/#organization`
const WEBSITE_ID = `${WEBSITE_URL}/#website`

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: WEBSITE_URL,
  logo: absoluteUrl('/images/tallyhosting-logo.png'),
  description: DEFAULT_DESCRIPTION,
  email: contactSection.email,
  telephone: contactSection.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C-89, 2nd Floor, Sector-2',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: contactSection.phone,
    email: contactSection.email,
    contactType: 'customer support',
    areaServed: ['IN', 'SA'],
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: footerData.social.map((s) => s.href.replace(/#$/, '')),
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: WEBSITE_URL,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Tally on Cloud Hosting',
  serviceType: 'Tally cloud hosting',
  description: DEFAULT_DESCRIPTION,
  provider: { '@id': ORG_ID },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'Saudi Arabia' },
  ],
  url: WEBSITE_URL,
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSection.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
