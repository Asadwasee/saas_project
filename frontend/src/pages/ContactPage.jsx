import { useState } from 'react'
import api from '../api/api'
import toast from 'react-hot-toast'

const initialState = {
  name: '',
  email: '',
  subject: 'Website Inquiry', // Backend field added
  message: ''
}

export default function ContactPage() {
  const [formData, setFormData] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      // Backend route is singular /contact
      await api.post('/api/contact', formData)
      toast.success('Message sent! Our team will contact you soon.')
      setFormData(initialState)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section-block">
      <div className="section-head text-center mb-12">
        <p className="eyebrow text-accent font-bold uppercase tracking-widest">
          Contact
        </p>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase">
          Talk to Codecelix
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="glass border border-line rounded-3xl overflow-hidden min-h-100">
          <iframe
            className="w-full h-full grayscale opacity-70 hover:grayscale-0 transition-all"
            title="Codecelix map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.558319326!2d74.3411!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjAnMjguMCJF!5e0!3m2!1sen!2spk!4v1625555555555!5m2!1sen!2spk"
            loading="lazy"
          />
        </div>

        <form
          className="glass border border-line p-8 md:p-12 rounded-3xl space-y-6 bg-surface/20"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted">
              Full Name
            </label>
            <input
              className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none transition-all"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Asad Waseem"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none transition-all"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="asad@codecelix.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted">
              Project Brief
            </label>
            <textarea
              rows="4"
              className="w-full bg-bg/50 border border-line rounded-2xl p-4 focus:border-accent outline-none transition-all resize-none"
              value={formData.message}
              required
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Tell us about your project..."
            />
          </div>

          <button
            disabled={loading}
            className="btn btn-solid w-full py-5 rounded-2xl font-black text-lg shadow-lg shadow-accent/20 disabled:opacity-50"
            type="submit"
          >
            {loading ? 'Sending...' : 'Deploy Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
