import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import toast from "react-hot-toast";
import { Save, Image as ImageIcon, Type, Hash } from "lucide-react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    category: "",
    description: "",
    content: ""
  });

  const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/blogs", form);
      toast.success("Article published successfully! 🖋️");
      navigate("/admin/blogs");
    } catch (err) {
      toast.error("Failed to publish blog. Check all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black italic uppercase">Draft <span className="text-accent">New Article</span></h1>
        <p className="text-muted italic">Share your insights with the world.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-4xl border border-line bg-surface/20 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Type size={14} /> Blog Title
              </label>
              <input 
                required
                className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none text-xl font-bold" 
                placeholder="The Future of AI in Web Design"
                value={form.title} 
                onChange={(e) => {
                  const val = e.target.value;
                  setForm({...form, title: val, slug: generateSlug(val)});
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">Article Content (Markdown/HTML supported)</label>
              <textarea 
                required
                rows="15" 
                className="w-full bg-bg/50 border border-line rounded-2xl p-6 focus:border-accent outline-none leading-relaxed text-muted" 
                placeholder="Write your story here..."
                value={form.content} 
                onChange={(e) => setForm({...form, content: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-4xl border border-line bg-surface/30 space-y-6 sticky top-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Hash size={14} /> URL Slug
              </label>
              <input 
                className="w-full bg-bg/20 border border-line rounded-xl p-3 text-accent italic text-sm outline-none" 
                value={form.slug} readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> Cover Image URL
              </label>
              <input 
                className="w-full bg-bg/50 border border-line rounded-xl p-3 outline-none focus:border-accent text-sm" 
                placeholder="https://images.unsplash.com/..."
                value={form.image} 
                onChange={(e) => setForm({...form, image: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">Category</label>
              <select 
                className="w-full bg-bg/50 border border-line rounded-xl p-3 outline-none focus:border-accent text-sm text-white"
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value})}
              >
                <option value="">Select Category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-solid w-full py-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 shadow-xl shadow-accent/20 transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? "Publishing..." : <><Save size={20} /> Publish Article</>}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}