import PricingSection from "../components/PricingSection";

export default function PricingPage() {
  return (
    <>
      <section className="section-block page-intro">
        <p className="eyebrow">Pricing Page</p>
        <h1>Flexible plans for every team size</h1>
        <p className="hero-copy">Monthly/yearly billing toggle and side-by-side plan comparison for quick decisions.</p>
      </section>
      <PricingSection />
    </>
  );
}
