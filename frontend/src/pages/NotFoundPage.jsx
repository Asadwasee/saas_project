export default function NotFoundPage() {
  return (
    <section className="section-block not-found">
      <p className="eyebrow">404</p>
      <h1>This page drifted into the lava void</h1>
      <p className="hero-copy">The route you entered does not exist. Return home and continue exploring Codecelix SaaS.</p>
      <div className="lava-ring" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <a className="btn btn-solid" href="/">
        Back to Home
      </a>
    </section>
  );
}
