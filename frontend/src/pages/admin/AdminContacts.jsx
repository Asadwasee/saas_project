import useApi from "../../hooks/useApi";
import api from "../../api/api";
import AdminLayout from "../../components/admin/AdminLayout";
import { Mail, Calendar, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminContacts() {
  // Singular /contact for your backend
  const { data: contacts, loading, refetch } = useApi("/contact");

  const deleteMessage = async (id) => {
    if(!confirm("Delete this message?")) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success("Message deleted");
      refetch();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black italic uppercase">Inbound <span className="text-accent">Leads</span></h1>
        <p className="text-muted italic">Messages from the contact form</p>
      </div>

      <div className="space-y-4">
        {loading && <p className="text-white animate-pulse text-center py-20 italic">Scanning Inbox...</p>}
        {contacts?.length === 0 && <p className="text-muted text-center py-20">No messages found.</p>}
        
        {contacts?.map((msg) => (
          <div key={msg._id} className="glass border border-line p-6 rounded-2xl bg-surface/20 hover:bg-surface/30 transition-all group">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Mail size={16} />
                  </div>
                  <h3 className="font-bold text-white uppercase italic">{msg.name}</h3>
                  <span className="text-[10px] bg-white/5 border border-line px-2 py-0.5 rounded text-muted font-bold uppercase tracking-widest">{msg.subject}</span>
                </div>
                <p className="text-accent text-xs font-medium mb-3">{msg.email}</p>
                <div className="p-4 bg-bg/40 rounded-xl border border-line text-muted text-sm italic">
                  "{msg.message}"
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col justify-between items-end min-w-30">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase">
                  <Calendar size={12} />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
                <button 
                  onClick={() => deleteMessage(msg._id)}
                  className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}