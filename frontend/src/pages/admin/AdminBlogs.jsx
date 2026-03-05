import useApi from "../../hooks/useApi";
import api from "../../api/api";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Edit3, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminBlogs() {
  const { data: blogs, loading, refetch } = useApi("/blogs");

  const SERVER_URL = "http://localhost:5000"; 

  // Image Logic: Seed data aur Admin data dono handle karne ke liye
  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/400x400?text=No+Image";
    if (img.startsWith('http')) return img; // Admin URL
    if (img.startsWith('uploads/')) return `${SERVER_URL}/${img}`; // Seed path logic
    return `${SERVER_URL}/uploads/${img}`; // Admin file logic
  };

  const deleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Blog deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-white italic">Accessing Archives...</div>;

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase italic text-white">Content <span className="text-accent">Library</span></h1>
          <p className="text-muted italic text-sm">Manage your agency's thought leadership and articles.</p>
        </div>
        <Link to="/admin/blogs/create" className="btn btn-solid flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg shadow-accent/20">
          <Plus size={18} /> Compose New Blog
        </Link>
      </div>

      <div className="glass border border-line rounded-4xl overflow-hidden bg-surface/20">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-muted text-[10px] uppercase tracking-[0.2em] border-b border-line font-black italic">
            <tr>
              <th className="px-8 py-6">Article Details</th>
              <th className="px-8 py-6">Category</th>
              <th className="px-8 py-6">Status</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {blogs?.map((blog) => (
              <tr key={blog._id} className="hover:bg-white/2 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={getImageUrl(blog.image)} 
                      alt={blog.title} 
                      className="w-12 h-12 rounded-xl object-cover border border-line bg-surface/50 shadow-inner" 
                      onError={(e) => { e.target.src = "https://placehold.co/400x400?text=No+Image"; }}
                    />
                    <div>
                      <div className="font-bold text-white group-hover:text-accent transition-colors italic uppercase leading-tight">{blog.title}</div>
                      <div className="text-[10px] text-muted italic mt-1 tracking-wider uppercase font-bold">/{blog.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-black px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent uppercase tracking-widest italic">
                    {blog.category || "General"}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-green-500 uppercase italic tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/blog/${blog.slug}`} target="_blank" className="p-2 hover:bg-white/5 text-muted rounded-xl transition-all" title="View Live">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/admin/blogs/edit/${blog._id}`} className="p-2 hover:bg-accent/10 text-white rounded-xl transition-all" title="Edit Article">
                      <Edit3 size={18} />
                    </Link>
                    <button onClick={() => deleteBlog(blog._id)} className="p-2 hover:bg-danger/10 text-danger rounded-xl transition-all" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!blogs || blogs.length === 0) && (
          <div className="text-center py-20 text-muted italic font-bold uppercase tracking-widest opacity-50">
            Empty Archive — No articles found
          </div>
        )}
      </div>
    </AdminLayout>
  );
}