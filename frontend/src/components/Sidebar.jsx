// export default function Sidebar() {
//   return (
//     <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 p-6">
//       <h2 className="text-2xl font-bold mb-10 text-blue-400">Admin Panel</h2>
//       <nav className="flex flex-col gap-5 text-sm font-medium">
//         <a href="/" className="hover:text-blue-400 transition">
//           📊 Dashboard
//         </a>
//         <a href="/blogs" className="hover:text-blue-400 transition">
//           📝 Blogs
//         </a>
//         <a href="/projects" className="hover:text-blue-400 transition">
//           🗂️ Projects
//         </a>
//         <a href="/services" className="hover:text-blue-400 transition">
//           ⚙️ Services
//         </a>
//         <a href="/contact" className="hover:text-blue-400 transition">
//           📩 Messages
//         </a>
//       </nav>
//     </aside>
//   )
// }

import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 p-6">
      <h2 className="text-2xl font-bold mb-10 text-blue-400">Admin Panel</h2>

      <nav className="flex flex-col gap-5 text-sm font-medium">
        <Link to="/">📊 Dashboard</Link>
        <Link to="/blogs">📝 Blogs</Link>
        <Link to="/projects">🗂️ Projects</Link>
        <Link to="/services">⚙️ Services</Link>
        <Link to="/contact">📩 Messages</Link>
      </nav>
    </aside>
  )
}
