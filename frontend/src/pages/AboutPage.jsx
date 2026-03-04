// import { useEffect, useRef } from "react";

// const timelineEvents = [
//   {
//     year: "2019",
//     title: "Founded",
//     desc: "Codecelix was born from a shared belief that AI should be accessible to every product team, not just Fortune 500 companies.",
//   },
//   {
//     year: "2020",
//     title: "First 100 Clients",
//     desc: "Reached our first milestone with 100 paying clients across fintech, healthcare, and e-commerce verticals.",
//   },
//   {
//     year: "2021",
//     title: "Series A — $4.2M",
//     desc: "Secured seed funding to expand our automation engine and grow the engineering team to 30 people.",
//   },
//   {
//     year: "2022",
//     title: "Platform v2 Launch",
//     desc: "Launched the redesigned platform with real-time analytics, a no-code workflow builder, and multilingual support.",
//   },
//   {
//     year: "2023",
//     title: "10,000 Teams",
//     desc: "Crossed 10K active teams globally with automations running across 40+ countries.",
//   },
//   {
//     year: "2024",
//     title: "Enterprise Tier",
//     desc: "Introduced dedicated enterprise contracts, SSO, and a 24/7 success team for high-volume clients.",
//   },
// ];

// const team = [
//   {
//     name: "Aria Voss",
//     role: "CEO & Co-Founder",
//     emoji: "🧠",
//     bio: "Former ML lead at Stripe. Passionate about removing friction between humans and automation.",
//   },
//   {
//     name: "Liam Osei",
//     role: "CTO",
//     emoji: "⚙️",
//     bio: "Built distributed systems at Cloudflare. Obsessed with sub-100ms response times.",
//   },
//   {
//     name: "Nadia Petrov",
//     role: "Head of Design",
//     emoji: "🎨",
//     bio: "Design systems architect. Previously shaped product at Figma and Linear.",
//   },
//   {
//     name: "Carlos Mbeki",
//     role: "Head of Growth",
//     emoji: "📈",
//     bio: "Growth strategist with a background in product-led growth at Notion and Airtable.",
//   },
//   {
//     name: "Yuki Tanaka",
//     role: "Lead Engineer",
//     emoji: "🚀",
//     bio: "Full-stack engineer, open-source contributor, and performance fanatic.",
//   },
//   {
//     name: "Priya Anand",
//     role: "Head of Customer Success",
//     emoji: "💬",
//     bio: "Turns complex onboardings into simple wins. 99% retention rate on Enterprise tier.",
//   },
// ];

// const values = [
//   {
//     icon: "🔍",
//     title: "Transparency",
//     desc: "Every decision we make — from pricing to product roadmaps — is shared openly with our community.",
//   },
//   {
//     icon: "⚡",
//     title: "Speed",
//     desc: "We ship fast, iterate faster, and believe slow software is just as broken as buggy software.",
//   },
//   {
//     icon: "🤝",
//     title: "Partnership",
//     desc: "We treat every client relationship as a long-term partnership, not a transaction.",
//   },
// ];

// export default function AboutPage() {
//   const timelineRef = useRef(null);
//   const teamRef = useRef(null);
//   const valuesRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-in");
//           }
//         });
//       },
//       { threshold: 0.12 }
//     );

//     const items = document.querySelectorAll(
//       ".tl-item, .team-card, .value-card"
//     );
//     items.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="about-page">
//       {/* Hero */}
//       <section className="section-block about-hero">
//         <p className="eyebrow">About Codecelix</p>
//         <h1>We build the automation layer for AI-first teams</h1>
//         <p className="hero-copy">
//           From a two-person experiment to a platform powering 12,800 teams —
//           here is the story, the people, and the mission behind Codecelix.
//         </p>
//       </section>

//       {/* Timeline */}
//       <section className="section-block" ref={timelineRef}>
//         <div className="section-head">
//           <p className="eyebrow">Our Journey</p>
//           <h2>A timeline of milestones</h2>
//         </div>

//         <div className="timeline">
//           {timelineEvents.map((event, i) => (
//             <div
//               key={event.year}
//               className={`tl-item ${i % 2 === 0 ? "tl-left" : "tl-right"}`}
//               style={{ animationDelay: `${i * 100}ms` }}
//             >
//               <div className="tl-connector">
//                 <span className="tl-dot" />
//               </div>
//               <div className="tl-card">
//                 <span className="tl-year">{event.year}</span>
//                 <h3>{event.title}</h3>
//                 <p className="muted">{event.desc}</p>
//               </div>
//             </div>
//           ))}
//           <div className="tl-line" />
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="section-block" ref={valuesRef}>
//         <div className="section-head">
//           <p className="eyebrow">What We Stand For</p>
//           <h2>Mission, Vision &amp; Values</h2>
//         </div>

//         <div className="mv-grid">
//           <div className="mv-card mv-mission">
//             <span className="mv-icon">🎯</span>
//             <h3>Mission</h3>
//             <p className="muted">
//               To make AI automation accessible, affordable, and reliable for
//               every product team — regardless of size or budget.
//             </p>
//           </div>
//           <div className="mv-card mv-vision">
//             <span className="mv-icon">🔭</span>
//             <h3>Vision</h3>
//             <p className="muted">
//               A world where repetitive work is fully delegated to intelligent
//               systems, freeing humans to do the creative work only they can do.
//             </p>
//           </div>
//         </div>

//         <div className="card-grid three top-gap">
//           {values.map((v, i) => (
//             <div
//               className="value-card"
//               key={v.title}
//               style={{ animationDelay: `${i * 120}ms` }}
//             >
//               <span className="value-icon">{v.icon}</span>
//               <h3>{v.title}</h3>
//               <p className="muted">{v.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Team */}
//       <section className="section-block" ref={teamRef}>
//         <div className="section-head">
//           <p className="eyebrow">The People</p>
//           <h2>Meet the team</h2>
//         </div>

//         <div className="team-grid">
//           {team.map((member, i) => (
//             <div
//               className="team-card"
//               key={member.name}
//               style={{ animationDelay: `${i * 90}ms` }}
//             >
//               <div className="team-avatar">
//                 <span>{member.emoji}</span>
//               </div>
//               <div className="team-info">
//                 <h3>{member.name}</h3>
//                 <p className="team-role">{member.role}</p>
//                 <p className="team-bio muted">{member.bio}</p>
//               </div>
//               <div className="team-hover-overlay">
//                 <p>{member.bio}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// src/pages/AboutPage.jsx
// UPDATED: emojis → SVG icons | team data fetched from backend GET /api/projects
// (re-uses the existing /api/projects endpoint; swap to a dedicated /api/team
//  endpoint once your backend adds it)

import { useEffect } from 'react'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

// ── Static content (timeline / values / mission — not stored in DB) ──────────
const timelineEvents = [
  {
    year: '2019',
    title: 'Founded',
    desc: 'Codecelix was born from a shared belief that AI should be accessible to every product team, not just Fortune 500 companies.'
  },
  {
    year: '2020',
    title: 'First 100 Clients',
    desc: 'Reached our first milestone with 100 paying clients across fintech, healthcare, and e-commerce verticals.'
  },
  {
    year: '2021',
    title: 'Series A — $4.2M',
    desc: 'Secured seed funding to expand our automation engine and grow the engineering team to 30 people.'
  },
  {
    year: '2022',
    title: 'Platform v2 Launch',
    desc: 'Launched the redesigned platform with real-time analytics, a no-code workflow builder, and multilingual support.'
  },
  {
    year: '2023',
    title: '10,000 Teams',
    desc: 'Crossed 10K active teams globally with automations running across 40+ countries.'
  },
  {
    year: '2024',
    title: 'Enterprise Tier',
    desc: 'Introduced dedicated enterprise contracts, SSO, and a 24/7 success team for high-volume clients.'
  }
]

// Fallback team shown while the API loads or if it fails
const fallbackTeam = [
  {
    _id: '1',
    name: 'Aria Voss',
    role: 'CEO & Co-Founder',
    iconName: 'brain',
    bio: 'Former ML lead at Stripe. Passionate about removing friction between humans and automation.'
  },
  {
    _id: '2',
    name: 'Liam Osei',
    role: 'CTO',
    iconName: 'cog',
    bio: 'Built distributed systems at Cloudflare. Obsessed with sub-100ms response times.'
  },
  {
    _id: '3',
    name: 'Nadia Petrov',
    role: 'Head of Design',
    iconName: 'paint-brush',
    bio: 'Design systems architect. Previously shaped product at Figma and Linear.'
  },
  {
    _id: '4',
    name: 'Carlos Mbeki',
    role: 'Head of Growth',
    iconName: 'trending-up',
    bio: 'Growth strategist with a background in product-led growth at Notion and Airtable.'
  },
  {
    _id: '5',
    name: 'Yuki Tanaka',
    role: 'Lead Engineer',
    iconName: 'rocket',
    bio: 'Full-stack engineer, open-source contributor, and performance fanatic.'
  },
  {
    _id: '6',
    name: 'Priya Anand',
    role: 'Head of Customer Success',
    iconName: 'user-group',
    bio: 'Turns complex onboardings into simple wins. 99% retention rate on Enterprise tier.'
  }
]

const values = [
  {
    iconName: 'eye',
    title: 'Transparency',
    desc: 'Every decision we make — from pricing to product roadmaps — is shared openly with our community.'
  },
  {
    iconName: 'bolt',
    title: 'Speed',
    desc: 'We ship fast, iterate faster, and believe slow software is just as broken as buggy software.'
  },
  {
    iconName: 'handshake',
    title: 'Partnership',
    desc: 'We treat every client relationship as a long-term partnership, not a transaction.'
  }
]

// ── Icon map used by team cards when data comes from the API ──────────────────
// The backend User/Team model doesn't have an iconName field yet.
// We cycle through these icons by index as a graceful default.
const teamIconCycle = [
  'brain',
  'cog',
  'paint-brush',
  'trending-up',
  'rocket',
  'user-group'
]

export default function AboutPage() {
  // Fetch team from backend — adjust endpoint once /api/team exists.
  // For now we use /api/projects as a placeholder and fall back gracefully.
  const { data: apiTeam, loading, error } = useApi('/team', { skip: false })

  // Resolve team: prefer API data, fall back to static list
  const team = apiTeam?.length ? apiTeam : fallbackTeam

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('animate-in')
        }),
      { threshold: 0.1 }
    )
    document
      .querySelectorAll('.tl-item, .team-card, .value-card')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [team]) // re-run when team data arrives

  return (
    <div className="about-page">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="section-block about-hero">
        <p className="eyebrow">About Codecelix</p>
        <h1>We build the automation layer for AI-first teams</h1>
        <p className="hero-copy">
          From a two-person experiment to a platform powering 12,800 teams —
          here is the story, the people, and the mission behind Codecelix.
        </p>
      </section>

      {/* ── Timeline ────────────────────────────────────────── */}
      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">Our Journey</p>
          <h2>A timeline of milestones</h2>
        </div>
        <div className="timeline">
          {timelineEvents.map((event, i) => (
            <div
              key={event.year}
              className={`tl-item ${i % 2 === 0 ? 'tl-left' : 'tl-right'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="tl-connector">
                <span className="tl-dot" />
              </div>
              <div className="tl-card">
                <span className="tl-year">{event.year}</span>
                <h3>{event.title}</h3>
                <p className="muted">{event.desc}</p>
              </div>
            </div>
          ))}
          <div className="tl-line" />
        </div>
      </section>

      {/* ── Mission & Vision ────────────────────────────────── */}
      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">What We Stand For</p>
          <h2>Mission, Vision &amp; Values</h2>
        </div>

        <div className="mv-grid">
          <div className="mv-card mv-mission">
            <span className="mv-icon">
              <Icon name="target" size={28} />
            </span>
            <h3>Mission</h3>
            <p className="muted">
              To make AI automation accessible, affordable, and reliable for
              every product team — regardless of size or budget.
            </p>
          </div>
          <div className="mv-card mv-vision">
            <span className="mv-icon">
              <Icon name="telescope" size={28} />
            </span>
            <h3>Vision</h3>
            <p className="muted">
              A world where repetitive work is fully delegated to intelligent
              systems, freeing humans to do the creative work only they can do.
            </p>
          </div>
        </div>

        <div className="card-grid three top-gap">
          {values.map((v, i) => (
            <div
              className="value-card"
              key={v.title}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="value-icon">
                <Icon name={v.iconName} size={26} />
              </span>
              <h3>{v.title}</h3>
              <p className="muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────────── */}
      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">The People</p>
          <h2>Meet the team</h2>
        </div>

        {loading && (
          <div className="api-loading">
            <Icon name="spinner" size={22} className="spin-icon" />
            <span>Loading team…</span>
          </div>
        )}

        {error && !loading && (
          <div className="api-error">
            <Icon name="exclamation-circle" size={18} />
            <span>
              Could not load team from server. Showing default members.
            </span>
          </div>
        )}

        <div className="team-grid">
          {team.map((member, i) => {
            const iconName =
              member.iconName || teamIconCycle[i % teamIconCycle.length]
            return (
              <div
                className="team-card"
                key={member._id || member.name}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="team-avatar">
                  <Icon name={iconName} size={26} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio muted">{member.bio}</p>
                </div>
                <div className="team-hover-overlay">
                  <p>{member.bio}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
