const links = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function SimpleNavbar() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="simple-nav-wrap">
      <nav className="simple-nav">
        <span className="brand-name">Codecelix SaaS</span>
        <div className="simple-nav-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={path === link.href ? "active" : ""}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
