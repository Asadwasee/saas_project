import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast' 
import './index.css'

// Layout & shared components
import Navbar from './components/Navbar'
import Footer from './components/Footer' 
import LoadingScreen from './components/LoadingScreen'
import PageTransition from './components/PageTransition'
import ThemeProvider from './context/ThemeProvider'

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
import Login from './pages/Login'
import Register from './pages/Register'

// ── SCROLL TO TOP COMPONENT ──────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
      <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />
      <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
      <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
      <Route path="/services/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
      <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
      <Route path="/blog/:slug" element={<PageTransition><BlogDetailPage /></PageTransition>} />
      <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
      <Route path="/case-studies" element={<PageTransition><CaseStudiesPage /></PageTransition>} />
      <Route path="/faq" element={<PageTransition><FaqPage /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      
      {/* Auth Pages */}
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
      <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
    </Routes>
  )
}

// ── APPSHELL: Main Layout Wrapper ──────────────────
function AppShell() {
  return (
    <div className="site-shell min-h-screen flex flex-col relative">
      {/* Background Decorators */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="bg-lava bg-lava-a" aria-hidden="true" />
        <div className="bg-lava bg-lava-b" aria-hidden="true" />
        <div className="bg-grid opacity-20" aria-hidden="true" />
      </div>

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Main Content */}
      <main className="grow pt-28 md:pt-36 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <AppRoutes />
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleLoadDone = useCallback(() => setLoading(false), [])

  return (
    <ThemeProvider>
      {/* 2. Toaster Configuration: Dark theme ke liye custom styling add ki hai */}
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1412', 
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#ff4d00', 
              secondary: '#fff',
            },
          },
        }}
      />
      
      <BrowserRouter>
        {/* Scroll helper */}
        <ScrollToTop />
        
        {loading ? (
          <LoadingScreen onDone={handleLoadDone} />
        ) : (
          <AppShell />
        )}
      </BrowserRouter>
    </ThemeProvider>
  )
}