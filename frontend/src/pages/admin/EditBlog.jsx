import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import AdminLayout from "../../components/admin/AdminLayout";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    content: "",
    image: "",
  });

  // Blog ka data fetch karna
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get("/blogs");
        const blog = res.data.find((b) => b._id === id);
        if (blog) {
          setForm(blog);
        } else {
          toast.error("Blog not found");
          navigate("/admin/blogs");
        }
      } catch (err) {
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/blogs/${id}`, form);
      toast.success("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-white italic text-center">Loading Blog Data...</div>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate("/admin/blogs")}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors uppercase text-xs font-bold"
          >
            <ArrowLeft size={16} /> Back to Library
          </button>
          <h1 className="text-2xl font-black italic uppercase">Edit <span className="text-accent">Article</span></h1>
        </div>

        <form onSubmit={handleSubmit} className="glass border border-line p-8 rounded-4xl bg-surface/20 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted">Article Title</label>
              <input
                className="w-full bg-white/5 border border-line rounded-xl p-4 outline-none focus:border-accent transition-all"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted">Category</label>
              <input
                className="w-full bg-white/5 border border-line rounded-xl p-4 outline-none focus:border-accent transition-all"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted">Image URL / Filename</label>
            <div className="relative">
              <input
                className="w-full bg-white/5 border border-line rounded-xl p-4 pl-12 outline-none focus:border-accent transition-all"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://images... or uploads/name.jpg"
              />
              <ImageIcon className="absolute left-4 top-4 text-muted" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted">Short Description</label>
            <textarea
              rows="2"
              className="w-full bg-white/5 border border-line rounded-xl p-4 outline-none focus:border-accent transition-all resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted">Full Content (HTML Supported)</label>
            <textarea
              rows="10"
              className="w-full bg-white/5 border border-line rounded-xl p-4 outline-none focus:border-accent transition-all font-mono text-sm"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-solid w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-accent/20"
          >
            {saving ? "Deploying Changes..." : <><Save size={20} /> Update Configuration</>}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}