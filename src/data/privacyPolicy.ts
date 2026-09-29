export const privacyPolicyMeta = {
  effectiveDate: '15 September 2026',
  contactEmail: 'support@tallyhosting.com',
  contactWebsite: 'https://tallyhosting.com/',
  contactAddress: 'C89, 2nd Floor, Sector 2, Noida, Uttar Pradesh',
}

export type PrivacySection = {
  id: string
  number: number
  title: string
  intro?: string
  paragraphs?: string[]
  bullets?: string[]
  subsections?: {
    title: string
    intro?: string
    bullets?: string[]
    paragraphs?: string[]
  }[]
}

export const privacyHighlights = [
  {
    title: 'Your Data is Secure',
    description: 'We use reasonable administrative, technical, and organizational measures to protect your information.',
    icon: 'shield' as const,
  },
  {
    title: "We Don't Sell Your Data",
    description: 'We collect only what is reasonably necessary to provide and improve our services.',
    icon: 'ban' as const,
  },
  {
    title: "You're in Control",
    description: 'Depending on applicable law, you may request access, correction, or deletion of your Personal Data.',
    icon: 'sliders' as const,
  },
  {
    title: 'Transparent Practices',
    description: 'This policy explains what we collect, why we use it, and when we may share it.',
    icon: 'eye' as const,
  },
]

export const privacySections: PrivacySection[] = [
  {
    id: 'information-collection',
    number: 1,
    title: 'Information Collection and Use',
    intro:
      'We collect different types of information for various purposes to provide, maintain, operate, and improve our Service.',
    subsections: [
      {
        title: '1.1 Personal Data',
        intro:
          'While using our Service, we may ask you to provide certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personal Data may include, but is not limited to:',
        bullets: [
          'First name and last name',
          'Email address',
          'Phone number',
          'Billing and/or mailing address',
          'City, State, Province, ZIP/Postal Code',
          'Company or business name',
          'Account login information',
          'Payment and transaction-related information',
          'Information you provide when contacting customer support',
          'Any other information you voluntarily provide to us',
        ],
        paragraphs: [
          'We collect only the information reasonably necessary to provide our services, process transactions, communicate with you, and operate our business.',
        ],
      },
    ],
  },
  {
    id: 'usage-data',
    number: 2,
    title: 'Usage Data',
    intro:
      'We may also collect information about how the Service is accessed and used ("Usage Data"). Usage Data may include information such as:',
    bullets: [
      "Your computer or mobile device's Internet Protocol (IP) address",
      'Browser type and version',
      'Operating system',
      'Device type',
      'Pages of our Service that you visit',
      'Date and time of your visit',
      'Time spent on pages',
      'Referring and exit pages',
      'Unique device identifiers',
      'Other diagnostic and technical information',
    ],
    paragraphs: [
      'This information may be collected automatically when you access or use our Service.',
    ],
  },
  {
    id: 'tracking-cookies',
    number: 3,
    title: 'Tracking Technologies and Cookies',
    paragraphs: [
      'We use cookies and similar tracking technologies to track activity on our Service and store certain information.',
      'Cookies are small data files that may include an anonymous unique identifier. Cookies are sent to your browser and stored on your device.',
      'We may also use other tracking technologies, including beacons, tags, scripts, pixels, and similar technologies.',
      'These technologies help us understand how users interact with our Service, maintain functionality, improve user experience, and analyse website performance.',
      'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you disable or refuse cookies, certain portions or features of our Service may not function properly.',
    ],
  },
  {
    id: 'use-of-data',
    number: 4,
    title: 'Use of Data',
    intro: 'Tally Hosting may use the information we collect for purposes including:',
    bullets: [
      'To provide, operate, and maintain our Service',
      'To create and manage your account',
      'To process orders, subscriptions, payments, and transactions',
      'To provide customer support',
      'To communicate with you regarding your account or services',
      'To notify you about changes to our Service',
      'To provide information about products, services, offers, or updates where permitted by applicable law',
      'To allow you to participate in interactive features of our Service',
      'To monitor and analyse usage and trends',
      'To detect, prevent, and address technical issues',
      'To protect against fraud, abuse, unauthorized access, and other security threats',
      'To comply with applicable legal and regulatory requirements',
      'To improve our products, services, website, and customer experience',
    ],
  },
  {
    id: 'transfer-of-data',
    number: 5,
    title: 'Transfer of Data',
    paragraphs: [
      'Your information, including Personal Data, may be transferred to and maintained on computers or servers located outside your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.',
      'If you are located outside India and choose to provide information to us, please note that your information, including Personal Data, may be transferred to and processed in India.',
      'By providing your information and using our Service, you acknowledge that such transfers may occur where necessary to provide our services.',
      'Tally Hosting will take reasonable steps to ensure that your Personal Data is treated securely and in accordance with this Privacy Policy and applicable data protection laws.',
    ],
  },
  {
    id: 'disclosure-of-data',
    number: 6,
    title: 'Disclosure of Data',
    intro: 'We may disclose your Personal Data in the following circumstances:',
    subsections: [
      {
        title: 'Legal Requirements',
        intro: 'We may disclose your Personal Data where we believe in good faith that such action is necessary to:',
        bullets: [
          'Comply with a legal obligation',
          'Protect and defend the rights or property of Tally Hosting',
          'Prevent or investigate possible wrongdoing in connection with the Service',
          'Protect the personal safety of users of the Service or the public',
          'Protect against legal liability',
          'Comply with lawful requests from governmental or regulatory authorities',
        ],
      },
      {
        title: 'Business and Service Operations',
        paragraphs: [
          'We may also share information with trusted third-party service providers who assist us in operating our website, processing payments, providing hosting or technical services, delivering communications, providing customer support, or analysing website usage.',
          'Such third parties may have access to Personal Data only to perform services on our behalf and are expected to handle such information appropriately.',
        ],
      },
    ],
  },
  {
    id: 'security-of-data',
    number: 7,
    title: 'Security of Data',
    paragraphs: [
      'The security of your data is important to us.',
      'We use reasonable administrative, technical, and organizational measures designed to protect your Personal Data from unauthorized access, alteration, disclosure, or destruction.',
      'However, please remember that no method of transmission over the Internet or method of electronic storage is completely secure. Therefore, while we strive to use commercially reasonable means to protect your Personal Data, we cannot guarantee its absolute security.',
    ],
  },
  {
    id: 'service-providers',
    number: 8,
    title: 'Service Providers',
    paragraphs: [
      'We may employ third-party companies and individuals ("Service Providers") to facilitate our Service, provide services on our behalf, perform Service-related activities, process payments, provide technical support, or assist us in analysing how our Service is used.',
      'These third parties may have access to your Personal Data only to perform specific tasks on our behalf and are expected not to use or disclose that information for other purposes, except as permitted by applicable law.',
    ],
  },
  {
    id: 'analytics',
    number: 9,
    title: 'Analytics',
    paragraphs: [
      'We may use third-party Service Providers to monitor and analyse the use of our Service.',
    ],
    subsections: [
      {
        title: 'Google Analytics',
        paragraphs: [
          'Google Analytics is a web analytics service provided by Google that tracks and reports website traffic.',
          "Google may use the information collected to monitor and analyse the use of our Service and may combine such information with other Google services in accordance with Google's applicable policies.",
          "You may be able to prevent certain information from being collected by Google Analytics by using Google's available browser add-ons or privacy controls.",
          "For more information about Google's privacy practices, please visit: https://policies.google.com/privacy",
        ],
      },
    ],
  },
  {
    id: 'payment-processing',
    number: 10,
    title: 'Payment Processing',
    paragraphs: [
      'If we offer paid products or services, payments may be processed through third-party payment processors.',
      'We generally do not directly store or process complete payment card details on our own servers when payment processing is handled by a third-party payment provider.',
      'Payment processors may collect and process your payment information in accordance with their own privacy policies and terms.',
      'We recommend reviewing the privacy policy of the relevant payment provider before completing a transaction.',
    ],
  },
  {
    id: 'links-other-sites',
    number: 11,
    title: 'Links to Other Sites',
    paragraphs: [
      'Our Service may contain links to websites or services operated by third parties.',
      "If you click on a third-party link, you will be directed to that third party's website. We strongly recommend that you review the Privacy Policy of every website you visit.",
      'We are not responsible for the privacy practices, content, or policies of third-party websites or services.',
    ],
  },
  {
    id: 'childrens-privacy',
    number: 12,
    title: "Children's Privacy",
    paragraphs: [
      'Our Service is not intended for individuals under the age of 18 ("Children").',
      'We do not knowingly collect personally identifiable information from individuals under the age of 18.',
      'If you are a parent or guardian and believe that your child has provided us with Personal Data, please contact us.',
      'If we become aware that we have collected Personal Data from a child without appropriate consent, we will take reasonable steps to delete that information from our systems.',
    ],
  },
  {
    id: 'privacy-rights',
    number: 13,
    title: 'Your Privacy Rights',
    intro:
      'Depending on your location and applicable law, you may have certain rights regarding your Personal Data, which may include the right to:',
    bullets: [
      'Request access to Personal Data we hold about you',
      'Request correction of inaccurate or incomplete information',
      'Request deletion of your Personal Data where legally permitted',
      'Request restriction of certain processing',
      'Object to certain processing activities',
      'Withdraw consent where processing is based on consent',
      'Request information about how your Personal Data is processed',
    ],
    paragraphs: [
      'To exercise applicable rights, please contact us using the contact information provided below.',
      'We may need to verify your identity before processing certain requests.',
    ],
  },
  {
    id: 'data-retention',
    number: 14,
    title: 'Data Retention',
    paragraphs: [
      'We retain Personal Data only for as long as reasonably necessary for the purposes described in this Privacy Policy, including to provide our services, maintain business and transaction records, comply with legal obligations, resolve disputes, and enforce our agreements.',
      'The specific retention period may vary depending on the type of information and the purpose for which it was collected.',
    ],
  },
  {
    id: 'changes',
    number: 15,
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update our Privacy Policy from time to time.',
      'We will notify you of any changes by posting the updated Privacy Policy on this page.',
      'Where required by applicable law, we may also notify you by email and/or through a prominent notice on our Service before material changes become effective.',
      'You are advised to review this Privacy Policy periodically for any changes.',
      'Changes to this Privacy Policy become effective when they are posted on this page, unless otherwise stated.',
    ],
  },
  {
    id: 'contact-us',
    number: 16,
    title: 'Contact Us',
    paragraphs: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:',
    ],
  },
]

/** Short blurbs for overview cards (sections 2–7) */
export function privacySectionSummary(section: PrivacySection): string {
  if (section.intro) return section.intro
  if (section.paragraphs?.[0]) return section.paragraphs[0]
  return ''
}
