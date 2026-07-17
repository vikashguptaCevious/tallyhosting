import { Navbar } from './components/Navbar'
import { HeroPage } from './components/hero'
import { WhyChooseSection } from './components/WhyChooseSection'
import { DarkFeatureSection } from './components/DarkFeatureSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { ComparisonSection } from './components/ComparisonSection'
import { PricingSection } from './components/PricingSection'
import { CTABanner } from './components/CTABanner'
import { FAQSection } from './components/FAQSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/Widgets'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      <Navbar />
      <main>
        <HeroPage />
        <ComparisonSection />
        <WhyChooseSection />
        <DarkFeatureSection />
        <HowItWorksSection />
        <PricingSection />
        <CTABanner />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
