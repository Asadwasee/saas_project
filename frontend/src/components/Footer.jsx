import { Link } from "react-router-dom";
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Cpu 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-line bg-surface/80 backdrop-blur-xl">
      {/* Top Animated Glow Line */}
      <div className="absolute top-0 left-0 w-full h-1px bg-linear-to-r from-transparent via-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand & Social Section */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-accent/20 text-white">
                <Cpu size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white uppercase">Codecelix</span>
            </Link>
            <p className="text-muted text-base leading-relaxed mb-8 max-w-sm">
              Next-generation AI automation for ambitious product teams. Scaling human potential through smart engineering.
            </p>
            
            {/* Social Icons - Ab Lucide components use ho rahe hain */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/5 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/5 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/5 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Solutions</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link to="/services" className="hover:text-accent transition-colors">AI Models</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">Automations</Link></li>
              <li><Link to="/pricing" className="hover:text-accent transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Resource</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link to="/blog" className="hover:text-accent transition-colors">Our Blog</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">Support</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="md:col-span-4">
            <div className="p-px rounded-2xl bg-linear-to-br from-line to-transparent">
              <div className="bg-bg/50 p-6 rounded-[15px] backdrop-blur-sm">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-accent" /> Join the waitlist
                </h4>
                <p className="text-xs text-muted mb-4">Get early access to our new AI agent features.</p>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Enter email" 
                    className="grow bg-surface/50 border border-line rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent text-white"
                  />
                  <button className="bg-accent hover:bg-accent-2 text-white p-2 rounded-lg transition-all shadow-lg shadow-accent/20 active:scale-95">
                    <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-muted font-medium">
            © {currentYear} CODECELIX AGENTIC SYSTEMS.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-muted">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <span className="flex items-center gap-1.5 text-emerald-500/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}