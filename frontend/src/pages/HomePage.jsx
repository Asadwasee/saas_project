const highlights = [
  { label: "Active Teams", value: "12.8K" },
  { label: "Automations Run", value: "98M" },
  { label: "Average Time Saved", value: "43%" },
];

export default function HomePage() {
  return (
    <section className="section-block home-hero">
      <p className="eyebrow">Codecelix SaaS</p>
      <h1>Modern workflows for AI-first product teams</h1>
      <p className="hero-copy">A minimal platform with smart automations, real-time insights, and scalable pricing.</p>

      <div className="hero-actions">
        <a className="btn btn-solid" href="/pricing">
          Pricing
        </a>
        <a className="btn btn-outline" href="/case-studies">
          Case Studies
        </a>
        <a className="btn btn-outline" href="/faq">
          FAQ
        </a>
        <a className="btn btn-outline" href="/contact">
          Contact
        </a>
      </div>

      <div className="card-grid three top-gap">
        {highlights.map((item) => (
          <article className="stat-card" key={item.label}>
            <p>{item.label}</p>
            <h3>{item.value}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
