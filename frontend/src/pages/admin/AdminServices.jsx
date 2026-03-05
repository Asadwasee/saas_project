import useApi from "../../hooks/useApi";
import api from "../../api/api";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Edit3, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Icon from "../../components/Icons";

export default function AdminServices() {
  const { data: services, loading, refetch } = useApi("/services");

  const deleteService = async (id) => {
    if (!confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      toast.success("Service Deleted");
      refetch();
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-white italic">Loading Command Center...</div>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic">Services <span className="text-accent">Manager</span></h1>
          <p className="text-muted italic text-sm">Edit and manage your business offerings.</p>
        </div>
        <Link to="/admin/services/create" className="btn btn-solid flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg shadow-accent/20">
          <Plus size={18} /> Add New Service
        </Link>
      </div>

      <div className="glass border border-line rounded-4xl overflow-hidden bg-surface/20">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-muted text-xs uppercase tracking-widest border-b border-line">
            <tr>
              <th className="px-8 py-6">Icon</th>
              <th className="px-8 py-6">Service Title</th>
              <th className="px-8 py-6">Slug</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {services?.map(s => (
              <tr key={s._id} className="hover:bg-white/2 transition-colors group">
                <td className="px-8 py-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-line flex items-center justify-center">
                    <Icon name={s.icon} color={s.color} size={20} />
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="font-bold text-white group-hover:text-accent transition-colors italic uppercase">
                     {s.title}
                   </div>
                </td>
                <td className="px-8 py-6 text-muted text-xs italic">/{s.slug}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-3">
                    <Link to={`/admin/services/edit/${s._id}`} className="p-2 hover:bg-accent/10 text-white rounded-xl transition-all">
                      <Edit3 size={18} />
                    </Link>
                    <button onClick={() => deleteService(s._id)} className="p-2 hover:bg-danger/10 text-danger rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}