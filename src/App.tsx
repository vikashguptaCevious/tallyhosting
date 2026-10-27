import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/Widgets'
import { ToastHost } from './components/ToastHost'
import { CountryProvider } from './context/CountryContext'
import { HomePage } from './pages/HomePage'
import { BlogListPage } from './pages/BlogListPage'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { DiwaliCampaignPage } from './pages/DiwaliCampaignPage'
import { DiwaliClaimPage } from './pages/DiwaliClaimPage'
import { RequestDemoPage } from './pages/RequestDemoPage'
import { DEMO_PAGE_PATH } from './data/content'
import { DIWALI_CAMPAIGN_PATH, DIWALI_CLAIM_PATH } from './data/diwaliCampaign'

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <CountryProvider>
        <div className="min-h-screen bg-white text-gray-800 antialiased">
          <ScrollToTopOnNavigate />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path={DEMO_PAGE_PATH} element={<RequestDemoPage />} />
            <Route path={DIWALI_CAMPAIGN_PATH} element={<DiwaliCampaignPage />} />
            <Route path={DIWALI_CLAIM_PATH} element={<DiwaliClaimPage />} />
            <Route
              path="/diwali-dhamaka-campaign"
              element={<Navigate to={DIWALI_CAMPAIGN_PATH} replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <ScrollToTop />
          <ToastHost />
        </div>
      </CountryProvider>
    </BrowserRouter>
  )
}

export default App
