import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="glass site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-title">Codecelix SaaS</p>
        </div>
        <div className="footer-links">
          <Link to="/pricing">Pricing</Link>
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="footer-copy footer-right">2026 Codecelix SaaS</p>
      </div>
    </footer>
  );
}
