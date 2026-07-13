// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/modules/pages/marketing/LandingPage'

// Public Layout 
import { PublicLayout } from '@/layouts/PublicLayout'
import AboutPage from '@/modules/pages/marketing/AboutPage'
import ContactPage from '@/modules/pages/marketing/ContactPage'
import LegalHubPage from '@/modules/pages/legal/LegalHubPage'
import TermsPage from '@/modules/pages/legal/TermsOfServicePage'
import PrivacyPage from '@/modules/pages/legal/PrivacyPolicyPage'
import DisclaimerPage from '@/modules/pages/legal/DisclaimerPage'
import CookiePolicyPage from '@/modules/pages/legal/CookiePolicyPage'

// Auth Layout 
import AuthLayout from '@/layouts/AuthLayout';
import RegisterPage from '@/modules/auth/pages/RegisterPage'
import LoginPage from '@/modules/auth/pages/LoginPage'

// Bare Layout 
import BareLayout from '@/layouts/BareLayout'
import PreviewTestingPage from '@/testing/PreviewTestingPage'
import NotFound from '@/modules/pages/system/NotFound'

// App Lyout 
import AppLayout from '@/layouts/AppLayout'
import { HomePage, CommunitiesPage, ExplorePage, MessagesPage, NotificationsPage, BookmarksPage, ResourcesPage } from './testing/PlaceHolderPages'



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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<BareLayout />}>
        {/* Catch all non existent routes  */}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/test" element={<PreviewTestingPage />} /> */}

      </Route>

      <Route element={<AppLayout />}>
        <Route path="/test" element={<PreviewTestingPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>


    </Routes>
  )
}

export default App