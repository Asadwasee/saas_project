import { useState } from "react";

const plans = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 15,
    description: "Best for solo operators and side projects.",
    features: ["5 projects", "10K AI credits", "Email support"],
  },
  {
    name: "Growth",
    monthly: 49,
    yearly: 39,
    description: "For teams shipping quickly with collaboration.",
    features: ["25 projects", "100K AI credits", "Priority support"],
    featured: true,
  },
  {
    name: "Scale",
    monthly: 129,
    yearly: 99,
    description: "Enterprise controls and dedicated success manager.",
    features: ["Unlimited projects", "Unlimited AI credits", "24/7 support"],
  },
];

const rows = [
  { feature: "AI Credits", starter: "10K", growth: "100K", scale: "Unlimited" },
  { feature: "Projects", starter: "5", growth: "25", scale: "Unlimited" },
  { feature: "SSO", starter: "-", growth: "-", scale: "Included" },
  { feature: "Automation", starter: "Basic", growth: "Advanced", scale: "Advanced" },
  { feature: "Support", starter: "Email", growth: "Priority", scale: "24/7 Dedicated" },
];

export default function PricingSection() {
  const [cycle, setCycle] = useState("monthly");
  const yearlySave = (plans[1].monthly - plans[1].yearly) * 12;

  return (
    <section className="section-block" id="pricing">
      <div className="section-head">
        <p className="eyebrow">Pricing</p>
        <h2>Simple plans with monthly/yearly billing</h2>
      </div>

      <div className="billing-toggle">
        <button className={`toggle-btn ${cycle === "monthly" ? "active" : ""}`} onClick={() => setCycle("monthly")}>
          Monthly
        </button>
        <button className={`toggle-btn ${cycle === "yearly" ? "active" : ""}`} onClick={() => setCycle("yearly")}>
          Yearly <span className="save-badge">Save ${yearlySave}/yr</span>
        </button>
      </div>

      <div className="card-grid three">
        {plans.map((plan) => (
          <article key={plan.name} className={`price-card ${plan.featured ? "featured" : ""}`}>
            <h3>{plan.name}</h3>
            <p className="price-value">
              <span>$</span>
              {cycle === "monthly" ? plan.monthly : plan.yearly}
              <small>/mo</small>
            </p>
            <p className="muted">{plan.description}</p>
            <button className="btn btn-outline">Choose {plan.name}</button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="table-shell">
        <h3>Comparison Table</h3>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th>Growth</th>
                <th>Scale</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.starter}</td>
                  <td>{row.growth}</td>
                  <td>{row.scale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
