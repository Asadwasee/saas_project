// import { useParams, Link } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// // import { servicesData } from './ServicesPage'
// import { servicesData } from '../data/servicesData'

// export default function ServiceDetailPage() {
//   const { slug } = useParams()
//   const service = servicesData.find((s) => s.slug === slug)
//   const [visible, setVisible] = useState(false)

//   useEffect(() => {
//     // Small delay so entering animation plays
//     const t = setTimeout(() => setVisible(true), 60)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//     return () => clearTimeout(t)
//   }, [slug])

//   if (!service) {
//     return (
//       <section className="section-block not-found">
//         <p className="eyebrow">404</p>
//         <h1>Service not found</h1>
//         <Link className="btn btn-solid" to="/services">
//           Back to Services
//         </Link>
//       </section>
//     )
//   }

//   return (
//     <div className={`svc-detail-page ${visible ? 'detail-visible' : ''}`}>
//       {/* Hero */}
//       <section
//         className="section-block svc-detail-hero"
//         style={{ '--svc-color': service.color }}
//       >
//         <div className="svc-detail-icon-wrap">
//           <span className="svc-detail-icon">{service.icon}</span>
//           <div className="svc-detail-ring svc-detail-ring-1" />
//           <div className="svc-detail-ring svc-detail-ring-2" />
//           <div className="svc-detail-ring svc-detail-ring-3" />
//         </div>
//         <p className="eyebrow">Service</p>
//         <h1>{service.title}</h1>
//         <p className="hero-copy">{service.summary}</p>
//         <div className="svc-detail-stats">
//           {service.stats.map((stat) => (
//             <div className="svc-detail-stat" key={stat}>
//               {stat}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Details */}
//       <section className="section-block">
//         <div className="section-head">
//           <p className="eyebrow">How It Works</p>
//           <h2>Key capabilities</h2>
//         </div>
//         <div className="svc-detail-list">
//           {service.details.map((item, i) => (
//             <div
//               className="svc-detail-item"
//               key={item.heading}
//               style={{
//                 animationDelay: `${i * 120}ms`,
//                 '--svc-color': service.color
//               }}
//             >
//               <div className="svc-detail-num">
//                 {String(i + 1).padStart(2, '0')}
//               </div>
//               <div>
//                 <h3>{item.heading}</h3>
//                 <p className="muted">{item.body}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="section-block svc-detail-cta">
//         <p className="eyebrow">Get Started</p>
//         <h2>Ready to add {service.title} to your stack?</h2>
//         <p className="muted">
//           Start a free trial today. No credit card required. Cancel anytime.
//         </p>
//         <div className="hero-actions">
//           <Link className="btn btn-solid" to="/pricing">
//             View Pricing
//           </Link>
//           <Link className="btn btn-outline" to="/services">
//             ← All Services
//           </Link>
//         </div>
//       </section>
//     </div>
//   )
// }

// src/pages/ServiceDetailPage.jsx
// UPDATED: emojis → SVG icons | service data from GET /api/services (filtered by slug)

import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

const iconMap = {
  FaRobot: 'bot',
  FaChartBar: 'bar-chart',
  FaShoppingBag: 'shopping-bag',
  FaLink: 'link',
  FaComments: 'chat-bubble',
  FaShieldAlt: 'shield-check',
  bot: 'bot',
  'bar-chart': 'bar-chart',
  'shopping-bag': 'shopping-bag',
  link: 'link',
  'chat-bubble': 'chat-bubble',
  'shield-check': 'shield-check'
}

const colorCycle = [
  '#f47b30',
  '#4a9cf5',
  '#a78bfa',
  '#34d399',
  '#fb923c',
  '#f87171'
]

// Per-service detail content keyed by slug.
// When backend adds a `details` array to the Service model, remove this.
const detailsMap = {
  'ai-automation': [
    {
      heading: 'Smart Trigger Engine',
      body: 'Define conditions in plain English. Our engine converts them into executable logic and monitors your data streams 24/7.'
    },
    {
      heading: 'Multi-Step Pipelines',
      body: 'Chain unlimited actions across tools — Slack, Notion, Salesforce, custom APIs — without writing a single line of glue code.'
    },
    {
      heading: 'Error Recovery',
      body: 'Automatic retry logic, dead-letter queues, and Slack alerts ensure no automation silently fails in production.'
    }
  ],
  'data-insights': [
    {
      heading: 'Live Dashboards',
      body: 'Stream events directly into visual dashboards. Every metric updates within seconds of the underlying data changing.'
    },
    {
      heading: 'Anomaly Alerts',
      body: 'ML models trained on your baseline automatically surface outliers and send alerts before customers notice.'
    },
    {
      heading: 'Scheduled Reports',
      body: 'Build and schedule PDF or Slack reports for any audience with a drag-and-drop editor.'
    }
  ],
  'digital-products': [
    {
      heading: 'Component Library',
      body: 'Drop in battle-tested UI components — auth, billing, analytics — and customize them to match your brand.'
    },
    {
      heading: 'API-First Architecture',
      body: 'Every feature is headless by default. Build your own front end or use our white-label templates.'
    },
    {
      heading: 'Marketplace',
      body: 'Publish your own integrations and earn revenue on every install.'
    }
  ],
  integrations: [
    {
      heading: 'OAuth 2.0 Security',
      body: 'All connections use OAuth 2.0. We never store your passwords or API keys.'
    },
    {
      heading: 'Bi-Directional Sync',
      body: 'Changes flow both ways. Update a record in Salesforce and see it reflected in your database within seconds.'
    },
    {
      heading: 'Custom Webhooks',
      body: 'Add any HTTP endpoint as a custom integration and map its payload with our visual field mapper.'
    }
  ],
  'ai-chat': [
    {
      heading: 'Context-Aware Training',
      body: 'Upload docs, URLs, or connect your knowledge base. The agent learns your product and answers with precision.'
    },
    {
      heading: 'Human Escalation',
      body: 'Define confidence thresholds. Below the threshold, the agent routes to the right human team member.'
    },
    {
      heading: 'Analytics & Improvement',
      body: 'See every conversation, review low-confidence answers, and fine-tune with one click.'
    }
  ],
  security: [
    {
      heading: 'Zero-Trust Architecture',
      body: 'Every request is authenticated and authorized independently. No implicit trust between services.'
    },
    {
      heading: 'Audit Logs',
      body: 'Immutable, timestamped logs of every action. Export to your SIEM or query directly in the dashboard.'
    },
    {
      heading: 'Role-Based Access',
      body: 'Fine-grained permissions down to individual fields. Assign roles per workspace, project, or resource.'
    }
  ]
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const [visible, setVisible] = useState(false)

  const { data: allServices, loading, error } = useApi('/services')

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => clearTimeout(t)
  }, [slug])

  // ── Loading state ─────────────────────────────────────────────
  if (loading) {
    return (
      <section
        className="section-block"
        style={{ textAlign: 'center', padding: '60px 0' }}
      >
        <div className="api-loading" style={{ justifyContent: 'center' }}>
          <Icon name="spinner" size={28} className="spin-icon" />
          <span>Loading service details…</span>
        </div>
      </section>
    )
  }

  // ── Find service by slug ──────────────────────────────────────
  const service = allServices?.find((s) => {
    const sSlug =
      s.slug ||
      s.title
        ?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    return sSlug === slug
  })

  if (!service && !loading) {
    return (
      <section className="section-block not-found">
        <p className="eyebrow">404</p>
        <h1>Service not found</h1>
        {error && (
          <p className="muted" style={{ marginBottom: 16 }}>
            Could not reach the server.
          </p>
        )}
        <Link className="btn btn-solid" to="/services">
          Back to Services
        </Link>
      </section>
    )
  }

  const resolvedIcon = iconMap[service?.icon] || 'cog'
  const serviceIndex =
    allServices?.findIndex((s) => s._id === service?._id) ?? 0
  const color = service?.color || colorCycle[serviceIndex % colorCycle.length]
  const details = service?.details?.length
    ? service.details
    : detailsMap[slug] || []

  // Stats: prefer DB array, else parse from comma-separated string or show empty
  const stats = Array.isArray(service?.stats)
    ? service.stats
    : typeof service?.stats === 'string'
      ? service.stats.split(',').map((s) => s.trim())
      : []

  return (
    <div className={`svc-detail-page ${visible ? 'detail-visible' : ''}`}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="section-block svc-detail-hero"
        style={{ '--svc-color': color }}
      >
        <div className="svc-detail-icon-wrap">
          <span className="svc-detail-icon">
            <Icon name={resolvedIcon} size={36} />
          </span>
          <div className="svc-detail-ring svc-detail-ring-1" />
          <div className="svc-detail-ring svc-detail-ring-2" />
          <div className="svc-detail-ring svc-detail-ring-3" />
        </div>
        <p className="eyebrow">Service</p>
        <h1>{service.title}</h1>
        <p className="hero-copy">{service.description || service.details}</p>

        {stats.length > 0 && (
          <div className="svc-detail-stats">
            {stats.map((stat) => (
              <div className="svc-detail-stat" key={stat}>
                {stat}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Details ───────────────────────────────────────────── */}
      {details.length > 0 && (
        <section className="section-block">
          <div className="section-head">
            <p className="eyebrow">How It Works</p>
            <h2>Key capabilities</h2>
          </div>
          <div className="svc-detail-list">
            {details.map((item, i) => (
              <div
                className="svc-detail-item"
                key={item.heading}
                style={{ animationDelay: `${i * 120}ms`, '--svc-color': color }}
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

      {/* ── CTA ───────────────────────────────────────────────── */}
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
            <Icon
              name="chevron-right"
              size={14}
              style={{ transform: 'rotate(180deg)', marginRight: 4 }}
            />
            All Services
          </Link>
        </div>
      </section>
    </div>
  )
}
