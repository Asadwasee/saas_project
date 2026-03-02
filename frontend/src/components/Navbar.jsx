import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  return (
    <header className="nav-wrap">
      <nav className="glass nav-bar">
        <div className="nav-inner">
          <NavLink to="/" className="brand" aria-label="Codecelix SaaS home">
            <span className="brand-mark" aria-hidden="true" />
            Codecelix SaaS
          </NavLink>

          <div className="nav-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button className="btn btn-solid">Start Trial</button>
        </div>
      </nav>
    </header>
  );
}
