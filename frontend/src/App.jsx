// import './index.css'
// import HomePage from './pages/HomePage'
// import PricingPage from './pages/PricingPage'
// import CaseStudiesPage from './pages/CaseStudiesPage'
// import FaqPage from './pages/FaqPage'
// import ContactPage from './pages/ContactPage'
// import NotFoundPage from './pages/NotFoundPage'
// import SimpleNavbar from './components/SimpleNavbar'

// const routeMap = {
//   '/': HomePage,
//   '/home': HomePage,
//   '/homepage': HomePage,
//   '/pricing': PricingPage,
//   '/case-studies': CaseStudiesPage,
//   '/faq': FaqPage,
//   '/contact': ContactPage
// }

// function getPathname() {
//   const path = window.location.pathname || '/'
//   if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
//   return path
// }

// function App() {
//   const CurrentPage = routeMap[getPathname()] || NotFoundPage

//   return (
//     <div className="site-shell">
//       <div className="bg-lava bg-lava-a" aria-hidden="true" />
//       <div className="bg-lava bg-lava-b" aria-hidden="true" />
//       <div className="bg-grid" aria-hidden="true" />

//       <SimpleNavbar />
//       <main className="page-wrap">
//         <CurrentPage />
//       </main>
//     </div>
//   )
// }

// export default App

import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Layout & shared components
import SimpleNavbar from './components/SimpleNavbar'
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import ThemeProvider from './context/ThemeProvider' // ✅ CHANGED (was "./context/ThemeContext")

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import PricingPage from './pages/PricingPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        }
      />
      <Route
        path="/home"
        element={
          <PageTransition>
            <HomePage />
          </PageTransition>
        }
      />
      <Route
        path="/about"
        element={
          <PageTransition>
            <AboutPage />
          </PageTransition>
        }
      />
      <Route
        path="/services"
        element={
          <PageTransition>
            <ServicesPage />
          </PageTransition>
        }
      />
      <Route
        path="/services/:slug"
        element={
          <PageTransition>
            <ServiceDetailPage />
          </PageTransition>
        }
      />
      <Route
        path="/blog"
        element={
          <PageTransition>
            <BlogPage />
          </PageTransition>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <PageTransition>
            <BlogDetailPage />
          </PageTransition>
        }
      />
      <Route
        path="/pricing"
        element={
          <PageTransition>
            <PricingPage />
          </PageTransition>
        }
      />
      <Route
        path="/case-studies"
        element={
          <PageTransition>
            <CaseStudiesPage />
          </PageTransition>
        }
      />
      <Route
        path="/faq"
        element={
          <PageTransition>
            <FaqPage />
          </PageTransition>
        }
      />
      <Route
        path="/contact"
        element={
          <PageTransition>
            <ContactPage />
          </PageTransition>
        }
      />
      <Route
        path="*"
        element={
          <PageTransition>
            <NotFoundPage />
          </PageTransition>
        }
      />
    </Routes>
  )
}

function AppShell() {
  return (
    <div className="site-shell">
      <div className="bg-lava bg-lava-a" aria-hidden="true" />
      <div className="bg-lava bg-lava-b" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <SimpleNavbar />
      <main className="page-wrap">
        <AppRoutes />
      </main>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleLoadDone = useCallback(() => setLoading(false), [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        {loading && <LoadingScreen onDone={handleLoadDone} />}
        {!loading && <AppShell />}
      </BrowserRouter>
    </ThemeProvider>
  )
}
