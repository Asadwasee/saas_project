// import { NavLink } from 'react-router-dom'

// const links = [
//   { label: 'Home', to: '/' },
//   { label: 'About', to: '/about' },
//   { label: 'Services', to: '/services' },
//   { label: 'Blog', to: '/blog' },
//   { label: 'Pricing', to: '/pricing' },
//   { label: 'Case Studies', to: '/case-studies' },
//   { label: 'FAQ', to: '/faq' },
//   { label: 'Contact', to: '/contact' }
// ]

// export default function SimpleNavbar() {
//   return (
//     <header className="simple-nav-wrap">
//       <nav className="simple-nav">
//         <span className="brand-name">Codecelix SaaS</span>

//         <div className="simple-nav-links">
//           {links.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               className={({ isActive }) => (isActive ? 'active' : '')}
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </div>
//       </nav>
//     </header>
//   )
// }

// src/components/SimpleNavbar.jsx
// UPDATED: fully responsive with mobile hamburger menu (SVG icon, no emoji)

import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import Icon from './Icons'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
]

function isActive(href) {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (href === '/') return path === '/'
  return path === href || path.startsWith(href + '/')
}

export default function SimpleNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="simple-nav-wrap">
      <nav className="simple-nav">
        {/* Brand */}
        <a
          className="brand-name"
          href="/"
          aria-label="Codecelix SaaS home"
          onClick={closeMenu}
        >
          Codecelix SaaS
        </a>

        {/* Desktop links */}
        <div className="simple-nav-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="simple-nav-right">
          <ThemeToggle />
          {/* Hamburger — visible on mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              /* X icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                width={22}
                height={22}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                width={22}
                height={22}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`mobile-menu-link ${isActive(link.href) ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {link.label}
            <Icon name="chevron-right" size={14} />
          </a>
        ))}
      </div>
    </header>
  )
}
