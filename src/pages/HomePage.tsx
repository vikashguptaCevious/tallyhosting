import { HeroPage } from '../components/hero'
import { DarkFeatureSection } from '../components/DarkFeatureSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { ComparisonSection } from '../components/ComparisonSection'
import { PartnersSection } from '../components/PartnersSection'
import { TrustedBySection } from '../components/TrustedBySection'
import { AdvancedSecuritySection } from '../components/AdvancedSecuritySection'
import { PricingSection } from '../components/PricingSection'
import { CTABanner } from '../components/CTABanner'
import { FAQSection } from '../components/FAQSection'
import { ContactSection } from '../components/ContactSection'
import { Seo } from '../components/Seo'
import { faqSchema, organizationSchema, serviceSchema, websiteSchema } from '../lib/seoSchemas'

export function HomePage() {
  return (
    <main>
      <Seo
        canonicalPath="/"
        keywords={[
          'Tally on cloud',
          'Tally cloud hosting',
          'TallyPrime on cloud',
          'Tally ERP 9 hosting',
          'Tally remote access',
          'Tally server hosting India',
        ]}
        jsonLd={[organizationSchema, websiteSchema, serviceSchema, faqSchema]}
      />
      <HeroPage />
      <ComparisonSection />
      <PartnersSection />
      <TrustedBySection />
      <AdvancedSecuritySection />
      <DarkFeatureSection />
      <HowItWorksSection />
      <PricingSection />
      <CTABanner />
      <FAQSection />
      <ContactSection />
    </main>
  )
}
