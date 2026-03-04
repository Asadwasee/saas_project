import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useApi from '../hooks/useApi'
import Icon from '../components/Icons'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { data: services, loading, error } = useApi('/services')
  const [visible, setVisible] = useState(false)

  // Service dhoondne ka logic
  const service = services?.find((s) => s.slug === slug)

  useEffect(() => {
    if (service) {
      // Small delay for entering animation (CSS transition)
      const t = setTimeout(() => setVisible(true), 60)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return () => clearTimeout(t)
    }
  }, [service, slug])

  // 1. Loading State
  if (loading) {
    return (
      <section className="section-block loading-state" style={{ textAlign: 'center', padding: '100px' }}>
        <Icon name="spinner" size={40} className="spin-icon" />
        <p className="muted" style={{ marginTop: '20px' }}>Fetching service details...</p>
      </section>
    )
  }

  // 2. Error or Not Found State
  if (!service) {
    return (
      <section className="section-block not-found">
        <p className="eyebrow">404</p>
        <h1>Service not found</h1>
        <p className="muted">The requested service "{slug}" could not be located.</p>
        <Link className="btn btn-solid" to="/services" style={{ marginTop: '20px' }}>
          Back to Services
        </Link>
      </section>
    )
  }

  // Colors and details extraction
  const color = service.color || '#6366f1'
  const details = service.details || []
  const resolvedIcon = service.icon || 'bot'

  return (
    <div className={`svc-detail-page ${visible ? 'detail-visible' : ''}`}>
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section
        className="section-block svc-detail-hero"
        style={{ '--svc-color': color }}
      >
        <div className="svc-hero-content">
          <div className="svc-hero-icon">
            <Icon name={resolvedIcon} size={48} />
          </div>
          <p className="eyebrow">Service Pillar</p>
          <h1>{service.title}</h1>
          <p className="hero-copy">{service.description}</p>
        </div>
      </section>

      {/* ── Capabilities Section ────────────────────────────────── */}
      {details.length > 0 && (
        <section className="section-block">
          <div className="svc-detail-grid-header">
            <h2>Capabilities & Features</h2>
            <p className="muted">
              Deep-dive into what makes our {service.title} approach unique and
              effective for modern engineering teams.
            </p>
          </div>
          <div className="svc-detail-list">
            {details.map((item, i) => (
              <div
                className="svc-detail-item"
                key={i}
                style={{ 
                  animationDelay: `${i * 120}ms`, 
                  '--svc-color': color 
                }}
              >
                <div className="svc-detail-num">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3>{item.heading}</h3>
                  <p className="muted">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA Section ─────────────────────────────────────────── */}
      <section className="section-block svc-detail-cta">
        <p className="eyebrow">Get Started</p>
        <h2>Ready to add {service.title} to your stack?</h2>
        <p className="muted">
          Start a free trial today. No credit card required. Cancel anytime.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '30px' }}>
          <Link className="btn btn-solid" to="/pricing">
            View Pricing
          </Link>
          <Link className="btn btn-outline" to="/services">
            <Icon
              name="chevron-right"
              size={14}
              style={{ transform: 'rotate(180deg)', marginRight: 8 }}
            />
            All Services
          </Link>
        </div>
      </section>
    </div>
  )
}