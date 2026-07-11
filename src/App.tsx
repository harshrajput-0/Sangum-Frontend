// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/modules/marketing/pages/LandingPage'
import AboutPage from '@/modules/marketing/pages/AboutPage'
import { PublicLayout } from './layouts/PublicLayout'
import ContactPage from './modules/marketing/pages/ContactPage'

import LegalHubPage from '@/modules/marketing/pages/LegalHubPage'
import TermsPage from '@/modules/marketing/legal/TermsOfServicePage'
import PrivacyPage from '@/modules/marketing/legal/PrivacyPolicyPage'
import DisclaimerPage from '@/modules/marketing/legal/DisclaimerPage'
import CookiePolicyPage from '@/modules/marketing/legal/CookiePolicyPage'

import AuthLayout from '@/layouts/AuthLayout';
import RegisterPage from './modules/auth/pages/RegisterPage'
import PreviewTestingPage from './modules/marketing/pages/PreviewTestingPage'





function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* /legal, /legal/terms, /legal/privacy, /legal/disclaimer, /legal/cookies */}
        <Route path="/legal">
          <Route index element={<LegalHubPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
          <Route path="cookies" element={<CookiePolicyPage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
      <Route path="/test" element={<PreviewTestingPage />}/>
      <Route path="/register" element={<RegisterPage />} />

      </Route>

      
    </Routes>
  )
}

export default App