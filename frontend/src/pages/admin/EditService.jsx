import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import AdminLayout from "../../components/admin/AdminLayout";
import toast from "react-hot-toast";
import { Save, PlusCircle, Trash, ArrowLeft, Settings, Type } from "lucide-react";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Service data fetch kar rahe hain
    api.get("/services").then((res) => {
      const service = res.data.find((s) => s._id === id);
      setForm(service);
    });
  }, [id]);

  const updateDetail = (index, field, value) => {
    const updated = [...form.details];
    updated[index][field] = value;
    setForm({ ...form, details: updated });
  };

  const addDetail = () => {
    setForm({
      ...form,
      details: [...form.details, { heading: "", body: "" }],
    });
  };

  const removeDetail = (index) => {
    const updated = form.details.filter((_, i) => i !== index);
    setForm({ ...form, details: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/services/${id}`, form);
      toast.success("Service updated successfully! ✨");
      navigate("/admin/services");
    } catch (err) {
      toast.error("Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return (
    <div className="flex h-screen items-center justify-center text-white italic animate-pulse">
      Loading Configuration...
    </div>
  );

  return (
    <AdminLayout>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <button 
            onClick={() => navigate("/admin/services")}
            className="text-accent flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-2 hover:underline"
          >
            <ArrowLeft size={16} /> Back to List
          </button>
          <h1 className="text-3xl font-black italic uppercase">
            Edit <span className="text-accent">Configuration</span>
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Content & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-8 rounded-4xl border border-line bg-surface/20 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Type size={14} /> Service Title
              </label>
              <input
                className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none font-bold text-lg transition-all"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">Description</label>
              <textarea
                rows="4"
                className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none text-muted leading-relaxed"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          {/* Dynamic Details Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold italic uppercase tracking-tight">Feature Blocks</h3>
              <button
                type="button"
                onClick={addDetail}
                className="text-accent flex items-center gap-2 font-bold text-sm bg-accent/10 px-4 py-2 rounded-xl hover:bg-accent/20 transition-all"
              >
                <PlusCircle size={18} /> Add Feature
              </button>
            </div>

            {form.details?.map((detail, index) => (
              <div key={index} className="glass p-6 rounded-3xl border border-line relative group bg-surface/10">
                <button
                  type="button"
                  onClick={() => removeDetail(index)}
                  className="absolute top-4 right-4 text-danger p-2 hover:bg-danger/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash size={18} />
                </button>
                <input
                  placeholder="Feature Heading (e.g., Cloud Security)"
                  className="w-full bg-transparent border-b border-line py-2 mb-4 font-black text-white outline-none focus:border-accent uppercase italic tracking-tighter"
                  value={detail.heading}
                  onChange={(e) => updateDetail(index, "heading", e.target.value)}
                />
                <textarea
                  placeholder="Describe this feature..."
                  className="w-full bg-transparent outline-none text-muted text-sm resize-none"
                  rows="2"
                  value={detail.body}
                  onChange={(e) => updateDetail(index, "body", e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Meta Settings */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-4xl border border-line bg-surface/30 space-y-6 sticky top-10">
            <div className="flex items-center gap-2 text-accent mb-2">
              <Settings size={20} />
              <h3 className="font-bold uppercase italic">Meta Settings</h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">URL Slug</label>
              <input
                className="w-full bg-bg/20 border border-line rounded-xl p-3 text-accent italic text-sm outline-none cursor-not-allowed opacity-70"
                value={form.slug}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">Icon (Lucide Name)</label>
              <input
                className="w-full bg-bg/50 border border-line rounded-xl p-3 outline-none focus:border-accent text-sm"
                value={form.icon || ""}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">Theme Color</label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  className="w-12 h-12 bg-transparent border-none outline-none cursor-pointer"
                  value={form.color || "#6366f1"}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <span className="text-xs font-mono text-muted uppercase">{form.color}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-solid w-full py-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {loading ? "Saving..." : <><Save size={20} /> Update Changes</>}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}