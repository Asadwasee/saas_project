import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import { servicesData } from './ServicesPage'
import { servicesData } from '../data/servicesData'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = servicesData.find((s) => s.slug === slug)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Small delay so entering animation plays
    const t = setTimeout(() => setVisible(true), 60)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => clearTimeout(t)
  }, [slug])

  if (!service) {
    return (
      <section className="section-block not-found">
        <p className="eyebrow">404</p>
        <h1>Service not found</h1>
        <Link className="btn btn-solid" to="/services">
          Back to Services
        </Link>
      </section>
    )
  }

  return (
    <div className={`svc-detail-page ${visible ? 'detail-visible' : ''}`}>
      {/* Hero */}
      <section
        className="section-block svc-detail-hero"
        style={{ '--svc-color': service.color }}
      >
        <div className="svc-detail-icon-wrap">
          <span className="svc-detail-icon">{service.icon}</span>
          <div className="svc-detail-ring svc-detail-ring-1" />
          <div className="svc-detail-ring svc-detail-ring-2" />
          <div className="svc-detail-ring svc-detail-ring-3" />
        </div>
        <p className="eyebrow">Service</p>
        <h1>{service.title}</h1>
        <p className="hero-copy">{service.summary}</p>
        <div className="svc-detail-stats">
          {service.stats.map((stat) => (
            <div className="svc-detail-stat" key={stat}>
              {stat}
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">How It Works</p>
          <h2>Key capabilities</h2>
        </div>
        <div className="svc-detail-list">
          {service.details.map((item, i) => (
            <div
              className="svc-detail-item"
              key={item.heading}
              style={{
                animationDelay: `${i * 120}ms`,
                '--svc-color': service.color
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

      {/* CTA */}
      <section className="section-block svc-detail-cta">
        <p className="eyebrow">Get Started</p>
        <h2>Ready to add {service.title} to your stack?</h2>
        <p className="muted">
          Start a free trial today. No credit card required. Cancel anytime.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-solid" to="/pricing">
            View Pricing
          </Link>
          <Link className="btn btn-outline" to="/services">
            ← All Services
          </Link>
        </div>
      </section>
    </div>
  )
}
