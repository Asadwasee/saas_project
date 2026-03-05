import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Cpu,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  User,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// "About" link yahan add kar diya gaya hai
const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" }, 
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Sync login state
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("codecelix-token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("codecelix-token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="glass-card rounded-4xl border border-white/10 bg-bg/60 backdrop-blur-xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-accent blur opacity-25 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-bg p-2 rounded-xl border border-white/10">
                <Cpu className="text-accent" size={24} />
              </div>
            </div>
            <span className="text-xl font-black tracking-tighter italic uppercase text-white">
              Code<span className="text-accent">celix</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs font-black uppercase tracking-widest transition-all hover:text-accent ${
                    isActive ? "text-accent italic" : "text-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-6">
            <ThemeToggle />
            
            {!user ? (
              <Link to="/login" className="btn btn-solid px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                Join <ChevronRight size={14} />
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <Link to="/admin/dashboard" className="p-2.5 bg-white/5 hover:bg-accent/20 text-white rounded-xl transition-all border border-white/5">
                    <LayoutDashboard size={20} />
                  </Link>
                )}
                <button onClick={handleLogout} className="p-2.5 bg-danger/5 hover:bg-danger/20 text-danger rounded-xl transition-all border border-danger/10">
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-bg/95 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
          
          <div className={`absolute top-24 left-4 right-4 bg-surface border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 transform ${
            menuOpen ? "translate-y-0 scale-100" : "-translate-y-10 scale-95"
          }`}>
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-2xl font-black uppercase italic tracking-tighter flex items-center justify-between ${
                      isActive ? "text-accent" : "text-white"
                    }`
                  }
                >
                  {link.label} <ChevronRight size={24} className="opacity-20" />
                </NavLink>
              ))}

              <div className="h-px bg-white/10 my-2" />

              {!user ? (
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-solid w-full justify-center rounded-xl py-4 flex items-center gap-2 text-lg"
                >
                  Sign Up Free
                </Link>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <User className="text-accent" size={24} />
                    <div>
                      <p className="text-white font-bold">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
                  </div>

                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="btn btn-outline w-full text-center"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 text-danger font-bold py-4 border border-danger/20 rounded-xl bg-danger/5 w-full"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}