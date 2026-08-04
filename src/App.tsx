import { Navbar } from './components/Navbar'
import { HeroPage } from './components/hero'
import { DarkFeatureSection } from './components/DarkFeatureSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { ComparisonSection } from './components/ComparisonSection'
import { PartnersSection } from './components/PartnersSection'
import { TrustedBySection } from './components/TrustedBySection'
import { AdvancedSecuritySection } from './components/AdvancedSecuritySection'
import { PricingSection } from './components/PricingSection'
import { CTABanner } from './components/CTABanner'
import { FAQSection } from './components/FAQSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/Widgets'
import { ToastHost } from './components/ToastHost'
import { CountryProvider } from './context/CountryContext'

function App() {
  return (
    <CountryProvider>
      <div className="min-h-screen bg-white text-gray-800 antialiased">
        <Navbar />
        <main>
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
        <Footer />
        <ScrollToTop />
        <ToastHost />
      </div>
    </CountryProvider>
  )
}

export default App
