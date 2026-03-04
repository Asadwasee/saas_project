import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      if (res.status === 201) {
        toast.success(`Welcome ${res.data.name}! Account created successfully.`);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong. Try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-block flex items-center justify-center min-h-[85vh]">
      <div className="w-full max-w-md p-8 glass border border-line rounded-3xl bg-surface/40 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Join Codecelix</h2>
          <p className="text-muted text-sm">Create your account to get started.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
              <input 
                required
                type="text" 
                placeholder="Asad Khan" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-bg/50 border border-line rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
              <input 
                required
                type="email" 
                placeholder="asad@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-bg/50 border border-line rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
              <input 
                required
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-bg/50 border border-line rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="btn btn-solid w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold mt-4 shadow-lg shadow-accent/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={18} /> Create Account</>}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-muted">
          Already a member? <Link to="/login" className="text-white font-bold hover:text-accent transition-colors">Sign in here</Link>
        </p>
      </div>
    </section>
  );
}