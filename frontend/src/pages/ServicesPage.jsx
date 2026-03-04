// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { servicesData } from '../data/servicesData' // ✅ import from separate file

// export default function ServicesPage() {
//   const [hovered, setHovered] = useState(null)

//   return (
//     <div className="services-page">
//       <section className="section-block page-intro">
//         <p className="eyebrow">Services</p>
//         <h1>Everything your AI-first team needs</h1>
//         <p className="hero-copy">
//           Six core service pillars. Each one built to integrate deeply with your
//           existing stack and scale as your team grows.
//         </p>
//       </section>

//       <section className="section-block">
//         <div className="services-grid">
//           {servicesData.map((service, i) => (
//             <article
//               className={`svc-card ${hovered === service.id ? 'svc-hovered' : ''}`}
//               key={service.id}
//               style={{
//                 '--svc-color': service.color,
//                 animationDelay: `${i * 80}ms`
//               }}
//               onMouseEnter={() => setHovered(service.id)}
//               onMouseLeave={() => setHovered(null)}
//             >
//               <div className="svc-icon-wrap">
//                 <span className="svc-icon">{service.icon}</span>
//                 <div className="svc-icon-ring" />
//               </div>
//               <h3>{service.title}</h3>
//               <p className="muted svc-tagline">{service.tagline}</p>
//               <div className="svc-stats">
//                 {service.stats.map((stat) => (
//                   <span className="svc-stat" key={stat}>
//                     {stat}
//                   </span>
//                 ))}
//               </div>
//               <Link
//                 to={`/services/${service.slug}`}
//                 className="btn btn-outline svc-btn"
//               >
//                 View Details →
//               </Link>
//             </article>
//           ))}
//         </div>
//       </section>
//     </div>
//   )
// }

// src/pages/ServicesPage.jsx
// UPDATED: emojis → SVG icons | data fetched from GET /api/services

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

// ── Icon mapping: backend stores icon as a string key ────────────────────────
// The backend Service model has an `icon` field (e.g. "FaRobot").
// We map those legacy strings to our SVG icon names here.
// Add new mappings as you add services in the DB.
const iconMap = {
  FaRobot: 'bot',
  FaChartBar: 'bar-chart',
  FaShoppingBag: 'shopping-bag',
  FaLink: 'link',
  FaComments: 'chat-bubble',
  FaShieldAlt: 'shield-check',
  // also accept our own keys directly
  bot: 'bot',
  'bar-chart': 'bar-chart',
  'shopping-bag': 'shopping-bag',
  link: 'link',
  'chat-bubble': 'chat-bubble',
  'shield-check': 'shield-check'
}

// Color palette cycled by index when the API doesn't supply a color
const colorCycle = [
  '#f47b30',
  '#4a9cf5',
  '#a78bfa',
  '#34d399',
  '#fb923c',
  '#f87171'
]

// Fallback data shown while loading or on error
const fallbackServices = [
  {
    _id: '1',
    title: 'AI Automation',
    icon: 'bot',
    description:
      'End-to-end workflow automation powered by large language models.',
    slug: 'ai-automation'
  },
  {
    _id: '2',
    title: 'Data Insights',
    icon: 'bar-chart',
    description:
      'Real-time dashboards, anomaly detection, and scheduled reports.',
    slug: 'data-insights'
  },
  {
    _id: '3',
    title: 'Digital Products',
    icon: 'shopping-bag',
    description: 'Full suite of APIs, SDKs, and no-code builders.',
    slug: 'digital-products'
  },
  {
    _id: '4',
    title: 'Integrations',
    icon: 'link',
    description: 'Native integrations with 500+ platforms.',
    slug: 'integrations'
  },
  {
    _id: '5',
    title: 'AI Chat & Agents',
    icon: 'chat-bubble',
    description: 'Build and deploy AI agents trained on your knowledge base.',
    slug: 'ai-chat'
  },
  {
    _id: '6',
    title: 'Security & Compliance',
    icon: 'shield-check',
    description: 'SOC2 Type II certified, GDPR ready, zero-trust architecture.',
    slug: 'security'
  }
]

export default function ServicesPage() {
  const [hovered, setHovered] = useState(null)
  const { data: apiServices, loading, error } = useApi('/services')

  const services = apiServices?.length ? apiServices : fallbackServices

  return (
    <div className="services-page">
      <section className="section-block page-intro">
        <p className="eyebrow">Services</p>
        <h1>Everything your AI-first team needs</h1>
        <p className="hero-copy">
          Six core service pillars. Each one built to integrate deeply with your
          existing stack and scale as your team grows.
        </p>
      </section>

      <section className="section-block">
        {loading && (
          <div className="api-loading">
            <Icon name="spinner" size={22} className="spin-icon" />
            <span>Loading services…</span>
          </div>
        )}
        {error && !loading && (
          <div className="api-error">
            <Icon name="exclamation-circle" size={18} />
            <span>Could not load services. Showing defaults.</span>
          </div>
        )}

        <div className="services-grid">
          {services.map((service, i) => {
            const resolvedIcon = iconMap[service.icon] || 'cog'
            const color = service.color || colorCycle[i % colorCycle.length]
            // Build slug: prefer service.slug, else slugify the title
            const slug =
              service.slug ||
              service.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')

            return (
              <article
                className={`svc-card ${hovered === (service._id || service.id) ? 'svc-hovered' : ''}`}
                key={service._id || service.id}
                style={{ '--svc-color': color, animationDelay: `${i * 80}ms` }}
                onMouseEnter={() => setHovered(service._id || service.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="svc-icon-wrap">
                  <span className="svc-icon">
                    <Icon name={resolvedIcon} size={28} />
                  </span>
                  <div className="svc-icon-ring" />
                </div>
                <h3>{service.title}</h3>
                <p className="muted svc-tagline">{service.description}</p>
                <Link
                  to={`/services/${slug}`}
                  className="btn btn-outline svc-btn"
                >
                  View Details{' '}
                  <Icon
                    name="arrow-right"
                    size={14}
                    style={{ marginLeft: 4 }}
                  />
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
