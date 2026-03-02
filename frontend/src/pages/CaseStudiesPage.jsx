import { useMemo, useState } from "react";

const categories = ["All", "Fintech", "Ecommerce", "Healthcare"];

const studies = [
  {
    id: 1,
    title: "OrbitPay Fraud Alerts",
    category: "Fintech",
    summary: "Reduced fraud review time by 61% with ML-powered risk scoring.",
    details: "OrbitPay connected Codecelix automations to triage suspicious transactions in real time and route high-risk alerts to analysts.",
  },
  {
    id: 2,
    title: "NovaCart Smart Catalog",
    category: "Ecommerce",
    summary: "Increased product discovery conversions by 34% using AI tagging.",
    details: "NovaCart used semantic product clustering and instant merchandising recommendations across 120k SKUs.",
  },
  {
    id: 3,
    title: "MedFlow Intake Assistant",
    category: "Healthcare",
    summary: "Lowered patient intake friction and cut support calls by 27%.",
    details: "MedFlow automated patient pre-screening and appointment prep with multilingual workflows and secure escalation.",
  },
  {
    id: 4,
    title: "PulseLedger Forecast Engine",
    category: "Fintech",
    summary: "Improved forecasting confidence by 22% across finance operations.",
    details: "PulseLedger deployed custom predictive models and live dashboards for finance and operations teams.",
  },
];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStudy, setActiveStudy] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return studies;
    return studies.filter((study) => study.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="section-block">
      <div className="section-head">
        <p className="eyebrow">Case Studies</p>
        <h1>Real outcomes from AI product teams</h1>
      </div>

      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            className={`chip ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="card-grid two">
        {filtered.map((study, index) => (
          <article className="case-card" key={study.id} style={{ animationDelay: `${index * 90}ms` }}>
            <p className="case-tag">{study.category}</p>
            <h3>{study.title}</h3>
            <p className="muted">{study.summary}</p>
            <button className="btn btn-outline" onClick={() => setActiveStudy(study)}>
              Open Details
            </button>
          </article>
        ))}
      </div>

      {activeStudy && (
        <div className="modal-backdrop" onClick={() => setActiveStudy(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <p className="case-tag">{activeStudy.category}</p>
            <h3>{activeStudy.title}</h3>
            <p className="muted">{activeStudy.details}</p>
            <button className="btn btn-solid" onClick={() => setActiveStudy(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

