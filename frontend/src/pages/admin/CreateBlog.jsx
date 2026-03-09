import { useState } from 'react'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import toast from 'react-hot-toast'
import { Save, Image as ImageIcon, Type, Hash, FileText } from 'lucide-react'

export default function CreateBlog() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    image: '',
    category: '',
    description: '',
    content: ''
  })

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .trim()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Validate all required fields before sending
    if (!form.title.trim()) return toast.error('Blog title is required')
    if (!form.slug.trim()) return toast.error('URL slug is required')
    if (!form.content.trim()) return toast.error('Article content is required')
    if (!form.category) return toast.error('Please select a category')
    if (!form.description.trim())
      return toast.error('Short description is required')

    setLoading(true)
    try {
      await api.post('/blogs', form)
      toast.success('Article published successfully! 🖋️')
      navigate('/admin/blogs')
    } catch (err) {
      console.error(err)
      toast.error(
        err.response?.data?.message ||
          'Failed to publish blog. Check all fields.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-black italic uppercase">
          Draft <span className="text-accent">New Article</span>
        </h1>
        <p className="text-muted italic">Share your insights with the world.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* ── Main Content ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-4xl border border-line bg-surface/20 space-y-6">
            {/* Title */}
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
                  const val = e.target.value
                  setForm({ ...form, title: val, slug: generateSlug(val) })
                }}
              />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <FileText size={14} /> Short Description (Excerpt)
              </label>
              <textarea
                required
                rows="3"
                className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none text-muted text-sm leading-relaxed"
                placeholder="A brief summary of the article (2-3 sentences)..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">
                Article Content (Markdown/HTML supported)
              </label>
              <textarea
                required
                rows="15"
                className="w-full bg-bg/50 border border-line rounded-2xl p-6 focus:border-accent outline-none leading-relaxed text-muted"
                placeholder="Write your story here..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* ── Sidebar ──────────────────────────────────── */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-4xl border border-line bg-surface/30 space-y-6 sticky top-10">
            {/* URL Slug — ✅ Now Editable */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Hash size={14} /> URL Slug
              </label>
              <input
                required
                className="w-full bg-bg/20 border border-line rounded-xl p-3 text-accent italic text-sm outline-none focus:border-accent"
                placeholder="my-blog-post-title"
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: generateSlug(e.target.value) })
                }
              />
              <p className="text-xs text-muted">
                Auto-filled from title. You can edit it.
              </p>
            </div>

            {/* Cover Image URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> Cover Image URL
              </label>
              <input
                className="w-full bg-bg/50 border border-line rounded-xl p-3 outline-none focus:border-accent text-sm"
                placeholder="https://images.unsplash.com/..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              {/* ✅ Image Preview */}
              {form.image && (
                <img
                  src={form.image}
                  alt="Cover Preview"
                  className="w-full h-32 object-cover rounded-xl mt-2 border border-line"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted uppercase tracking-widest">
                Category
              </label>
              <select
                required
                className="w-full bg-bg/50 border border-line rounded-xl p-3 outline-none focus:border-accent text-sm text-white"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-solid w-full py-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 shadow-xl shadow-accent/20 transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <Save size={20} /> Publish Article
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}
