import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import toast from "react-hot-toast";
import { Save, PlusCircle, Trash } from "lucide-react";

export default function CreateService() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", slug: "", icon: "", description: "", color: "#ff4d00",
    details: [{ heading: "", body: "" }]
  });

  const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/services", form);
      toast.success("Service created successfully! 🚀");
      navigate("/admin/services");
    } catch (err) {
      toast.error("Error creating service");
    }
  };

  const updateDetail = (index, field, value) => {
    const updated = [...form.details];
    updated[index][field] = value;
    setForm({ ...form, details: updated });
  };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black">Configure <span className="text-accent">New Service</span></h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 glass p-8 rounded-3xl border border-line">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">Service Title</label>
            <input 
              className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none" 
              value={form.title} 
              onChange={(e) => {
                const val = e.target.value;
                setForm({...form, title: val, slug: generateSlug(val)});
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">URL Slug</label>
            <input 
              className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none italic text-accent" 
              value={form.slug} readOnly
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">Icon Name (Lucide)</label>
            <input 
              className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none" 
              value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted uppercase">Theme Color</label>
            <input 
              type="color" className="w-full h-14 bg-bg/50 border border-line rounded-2xl p-1 outline-none cursor-pointer" 
              value={form.color} onChange={(e) => setForm({...form, color: e.target.value})}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-muted uppercase">Short Description</label>
            <textarea 
              rows="3" className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none" 
              value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Technical Details</h3>
            <button 
              type="button" 
              onClick={() => setForm({...form, details: [...form.details, {heading:"", body:""}]})}
              className="text-accent flex items-center gap-2 font-bold text-sm"
            >
              <PlusCircle size={20} /> Add Block
            </button>
          </div>

          {form.details.map((detail, index) => (
            <div key={index} className="glass p-6 rounded-2xl border border-line relative group">
              <button 
                type="button" 
                onClick={() => setForm({...form, details: form.details.filter((_, i) => i !== index)})}
                className="absolute top-4 right-4 text-danger opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash size={18} />
              </button>
              <input 
                placeholder="Heading (e.g., Performance Optimization)"
                className="w-full bg-transparent border-b border-line py-2 mb-4 font-bold text-white outline-none focus:border-accent"
                value={detail.heading} onChange={(e) => updateDetail(index, "heading", e.target.value)}
              />
              <textarea 
                placeholder="Detailed explanation..."
                className="w-full bg-transparent outline-none text-muted text-sm"
                value={detail.body} onChange={(e) => updateDetail(index, "body", e.target.value)}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-solid w-full py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3">
          <Save size={24} /> Finalize & Publish Service
        </button>
      </form>
    </AdminLayout>
  );
}