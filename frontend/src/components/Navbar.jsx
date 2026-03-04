import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Cpu, 
  LogIn, 
  UserPlus, 
  LogOut, 
  LayoutDashboard, 
  ChevronRight,
  User 
} from "lucide-react";
import ThemeToggle from './ThemeToggle';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ── SYNC WITH LOCALSTORAGE ──
  // Jab page load ho toh check karo user login hai ya nahi
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-100 px-4 py-4 pointer-events-none">
      <nav className="max-w-7xl mx-auto glass border border-line rounded-2xl bg-surface/60 backdrop-blur-xl transition-all duration-300 pointer-events-auto">
        <div className="flex items-center justify-between px-6 py-3">
          
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20">
              <Cpu size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white uppercase hidden sm:block">
              Codecelix
            </span>
          </NavLink>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all hover:text-accent ${isActive ? 'text-accent' : 'text-muted'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Admin Link (Only if Role is admin) */}
            {user?.role === 'admin' && (
              <NavLink to="/admin" className="text-sm font-bold text-accent-2 flex items-center gap-1 border-l border-line pl-6">
                <LayoutDashboard size={16} /> Admin
              </NavLink>
            )}
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="hidden md:flex items-center gap-3 ml-2">
              {!user ? (
                <>
                  <Link to="/login" className="text-sm font-medium text-muted hover:text-white transition-colors">Login</Link>
                  <Link to="/register" className="btn btn-solid px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-accent/20">Get Started</Link>
                </>
              ) : (
                <div className="flex items-center gap-4 border-l border-line pl-4">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                        <User size={16} />
                      </div>
                      <span className="text-sm font-bold text-white max-w-25 truncate">
                        {user.name.split(' ')[0]}
                      </span>
                   </div>
                   <button 
                    onClick={handleLogout}
                    className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-all"
                    title="Logout"
                   >
                    <LogOut size={18} />
                   </button>
                </div>
              )}
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-150 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-2 p-6 bg-surface/95 border-t border-line">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="text-lg font-semibold text-muted hover:text-accent flex items-center justify-between p-2 rounded-lg transition-all">{link.label} <ChevronRight size={18} opacity={0.5} /></NavLink>
            ))}
            
            <div className="pt-6 mt-2 border-t border-line flex flex-col gap-4">
              {!user ? (
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn btn-solid w-full justify-center rounded-xl py-4 flex items-center gap-2 text-lg">Sign Up Free</Link>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <User className="text-accent" size={24} />
                    <div>
                      <p className="text-white font-bold leading-none">{user.name}</p>
                      <p className="text-xs text-muted mt-1">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="flex items-center justify-center gap-3 text-danger font-black py-4 border border-danger/20 rounded-xl bg-danger/5 w-full"><LogOut size={20} /> Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}