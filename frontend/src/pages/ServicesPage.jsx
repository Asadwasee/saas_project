// import { useState } from 'react'
// import { Link } from 'react-router-dom'

// export const servicesData = [
//   {
//     id: 'ai-automation',
//     slug: 'ai-automation',
//     icon: '🤖',
//     title: 'AI Automation',
//     tagline:
//       'Let machines handle the repetitive so your team can focus on the creative.',
//     summary:
//       'End-to-end workflow automation powered by large language models. Connect any API, trigger actions on events, and build pipelines that never sleep.',
//     details: [
//       {
//         heading: 'Smart Trigger Engine',
//         body: 'Define conditions in plain English. Our engine converts them into executable logic and monitors your data streams 24/7.'
//       },
//       {
//         heading: 'Multi-Step Pipelines',
//         body: 'Chain unlimited actions across tools — Slack, Notion, Salesforce, custom APIs — without writing a single line of glue code.'
//       },
//       {
//         heading: 'Error Recovery',
//         body: 'Automatic retry logic, dead-letter queues, and Slack alerts ensure no automation silently fails in production.'
//       }
//     ],
//     stats: ['98M+ runs/month', '99.97% uptime', '<80ms avg latency'],
//     color: '#f47b30'
//   },
//   {
//     id: 'data-insights',
//     slug: 'data-insights',
//     icon: '📊',
//     title: 'Data Insights',
//     tagline: 'Transform raw events into decisions your whole team can act on.',
//     summary:
//       'Real-time dashboards, anomaly detection, and scheduled reports — all connected to your existing data warehouse with zero ETL setup.',
//     details: [
//       {
//         heading: 'Live Dashboards',
//         body: 'Stream events directly into visual dashboards. Every metric updates within seconds of the underlying data changing.'
//       },
//       {
//         heading: 'Anomaly Alerts',
//         body: 'ML models trained on your baseline automatically surface outliers and send alerts before customers notice.'
//       },
//       {
//         heading: 'Scheduled Reports',
//         body: 'Build and schedule PDF or Slack reports for any audience — exec, engineering, or client-facing — with a drag-and-drop editor.'
//       }
//     ],
//     stats: ['500+ connectors', 'Sub-5s refresh', 'SOC2 certified'],
//     color: '#4a9cf5'
//   },
//   {
//     id: 'digital-products',
//     slug: 'digital-products',
//     icon: '🛍️',
//     title: 'Digital Products',
//     tagline:
//       'Ship scalable digital products faster with our composable platform.',
//     summary:
//       'A full suite of APIs, SDKs, and no-code builders to help you launch SaaS features, internal tools, and customer-facing portals without rebuilding from scratch.',
//     details: [
//       {
//         heading: 'Component Library',
//         body: 'Drop in battle-tested UI components — auth, billing, analytics — and customize them to match your brand.'
//       },
//       {
//         heading: 'API-First Architecture',
//         body: 'Every feature is headless by default. Build your own front end or use our white-label templates.'
//       },
//       {
//         heading: 'Marketplace',
//         body: 'Publish your own integrations to the Codecelix Marketplace and earn revenue on every install.'
//       }
//     ],
//     stats: ['60+ components', 'TypeScript SDK', 'MIT licensed'],
//     color: '#a78bfa'
//   },
//   {
//     id: 'integrations',
//     slug: 'integrations',
//     icon: '🔗',
//     title: 'Integrations',
//     tagline: 'Connect every tool your team already uses in under 5 minutes.',
//     summary:
//       'Native integrations with 500+ platforms. OAuth-based, no credential storage, and bi-directional syncing out of the box.',
//     details: [
//       {
//         heading: 'OAuth 2.0 Security',
//         body: 'All connections use OAuth 2.0. We never store your passwords or API keys — only short-lived access tokens.'
//       },
//       {
//         heading: 'Bi-Directional Sync',
//         body: 'Changes flow both ways. Update a record in Salesforce and see it reflected in your database within seconds.'
//       },
//       {
//         heading: 'Custom Webhooks',
//         body: 'Not in our catalog? Add any HTTP endpoint as a custom integration and map its payload with our visual field mapper.'
//       }
//     ],
//     stats: [
//       '500+ integrations',
//       'Bi-directional sync',
//       'No credential storage'
//     ],
//     color: '#34d399'
//   },
//   {
//     id: 'ai-chat',
//     slug: 'ai-chat',
//     icon: '💬',
//     title: 'AI Chat & Agents',
//     tagline: 'Deploy intelligent agents that understand your business context.',
//     summary:
//       'Build and deploy AI agents trained on your documentation, CRM, and knowledge base. Handle support, sales qualification, and onboarding automatically.',
//     details: [
//       {
//         heading: 'Context-Aware Training',
//         body: 'Upload docs, URLs, or connect your knowledge base. The agent learns your product and answers with precision.'
//       },
//       {
//         heading: 'Human Escalation',
//         body: 'Define confidence thresholds. Below the threshold, the agent routes the conversation to the right human team member.'
//       },
//       {
//         heading: 'Analytics & Improvement',
//         body: 'See every conversation, review low-confidence answers, and fine-tune with one click.'
//       }
//     ],
//     stats: ['95%+ resolution rate', 'Multilingual', 'GDPR compliant'],
//     color: '#fb923c'
//   },
//   {
//     id: 'security',
//     slug: 'security',
//     icon: '🔒',
//     title: 'Security & Compliance',
//     tagline: 'Enterprise-grade security built in from day one, not bolted on.',
//     summary:
//       'SOC2 Type II certified, GDPR ready, and built with zero-trust architecture. Security reviews, audit logs, and role-based access for every tier.',
//     details: [
//       {
//         heading: 'Zero-Trust Architecture',
//         body: 'Every request is authenticated and authorized independently. No implicit trust between services.'
//       },
//       {
//         heading: 'Audit Logs',
//         body: 'Immutable, timestamped logs of every action. Export to your SIEM or query directly in the dashboard.'
//       },
//       {
//         heading: 'Role-Based Access',
//         body: 'Fine-grained permissions down to individual fields. Assign roles per workspace, project, or resource.'
//       }
//     ],
//     stats: ['SOC2 Type II', 'GDPR ready', 'Zero-trust'],
//     color: '#f87171'
//   }
// ]

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

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesData } from '../data/servicesData' // ✅ import from separate file

export default function ServicesPage() {
  const [hovered, setHovered] = useState(null)

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
        <div className="services-grid">
          {servicesData.map((service, i) => (
            <article
              className={`svc-card ${hovered === service.id ? 'svc-hovered' : ''}`}
              key={service.id}
              style={{
                '--svc-color': service.color,
                animationDelay: `${i * 80}ms`
              }}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="svc-icon-wrap">
                <span className="svc-icon">{service.icon}</span>
                <div className="svc-icon-ring" />
              </div>
              <h3>{service.title}</h3>
              <p className="muted svc-tagline">{service.tagline}</p>
              <div className="svc-stats">
                {service.stats.map((stat) => (
                  <span className="svc-stat" key={stat}>
                    {stat}
                  </span>
                ))}
              </div>
              <Link
                to={`/services/${service.slug}`}
                className="btn btn-outline svc-btn"
              >
                View Details →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
