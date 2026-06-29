import { Navbar } from './components/Navbar'
import { HeroSlider } from './components/HeroSlider'
import { AcronisSection } from './components/AcronisSection'
import { WhyTallySection } from './components/WhyTallySection'
import { FeaturesSection } from './components/FeaturesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { FunFactsSection } from './components/FunFactsSection'
import { TrustedBySection } from './components/TrustedBySection'
import { FaqSection, ContactSection, Footer } from './components/FaqContactFooter'
import { ScrollToTop } from './components/Widgets'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 antialiased">
      <Navbar />
      <main>
        <HeroSlider />
        <AcronisSection />
        <WhyTallySection />
        <FeaturesSection />
        <TestimonialsSection />
        <FunFactsSection />
        <TrustedBySection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
