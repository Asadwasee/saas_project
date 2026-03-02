// const links = [
//   { label: 'Home', to: '/' },
//   { label: 'About', to: '/about' }, // ADD
//   { label: 'Services', to: '/services' }, // ADD
//   { label: 'Blog', to: '/blog' }, // ADD
//   { label: 'Pricing', to: '/pricing' },
//   { label: 'Case Studies', to: '/case-studies' },
//   { label: 'FAQ', to: '/faq' },
//   { label: 'Contact', to: '/contact' }
// ]

// export default function SimpleNavbar() {
//   const path = window.location.pathname.replace(/\/+$/, '') || '/'

//   return (
//     <header className="simple-nav-wrap">
//       <nav className="simple-nav">
//         <span className="brand-name">Codecelix SaaS</span>
//         <div className="simple-nav-links">
//           {links.map((link) => (
//             <a
//               key={link.href}
//               href={link.href}
//               className={path === link.href ? 'active' : ''}
//             >
//               {link.label}
//             </a>
//           ))}
//         </div>
//       </nav>
//     </header>
//   )
// }
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' }
]

export default function SimpleNavbar() {
  return (
    <header className="simple-nav-wrap">
      <nav className="simple-nav">
        <span className="brand-name">Codecelix SaaS</span>

        <div className="simple-nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
