// import { useParams, Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { blogsData } from '../data/blogsData' // ✅ FIXED (was './BlogPage')

// const initialCommentForm = { name: '', email: '', body: '' }

// export default function BlogDetailPage() {
//   const { slug } = useParams()
//   const post = blogsData.find((b) => b.slug === slug)

//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       name: 'Jordan Park',
//       date: '2 days ago',
//       body: 'Really well-articulated. The section on reliability hit close to home — we ran into exactly that problem last quarter.'
//     },
//     {
//       id: 2,
//       name: 'Miriam Schulz',
//       date: '1 day ago',
//       body: 'Would love a follow-up on observability patterns for LLM pipelines specifically. Great post.'
//     }
//   ])

//   const [form, setForm] = useState(initialCommentForm)
//   const [errors, setErrors] = useState({})
//   const [submitted, setSubmitted] = useState(false)
//   const [visible, setVisible] = useState(false)

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 60)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//     return () => clearTimeout(t)
//   }, [slug])

//   const validate = () => {
//     const e = {}
//     if (!form.name.trim()) e.name = 'Name is required.'
//     if (!form.email.trim()) {
//       e.email = 'Email is required.'
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       e.email = 'Enter a valid email address.'
//     }
//     if (!form.body.trim()) {
//       e.body = 'Comment cannot be empty.'
//     } else if (form.body.trim().length < 10) {
//       e.body = 'Comment must be at least 10 characters.'
//     }
//     return e
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const nextErrors = validate()
//     setErrors(nextErrors)
//     if (Object.keys(nextErrors).length === 0) {
//       setComments((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           name: form.name,
//           date: 'Just now',
//           body: form.body
//         }
//       ])
//       setForm(initialCommentForm)
//       setSubmitted(true)
//       setTimeout(() => setSubmitted(false), 4000)
//     }
//   }

//   if (!post) {
//     return (
//       <section className="section-block not-found">
//         <p className="eyebrow">404</p>
//         <h1>Post not found</h1>
//         <Link className="btn btn-solid" to="/blog">
//           Back to Blog
//         </Link>
//       </section>
//     )
//   }

//   const related = blogsData
//     .filter((b) => b.slug !== slug && b.category === post.category)
//     .slice(0, 2)

//   return (
//     <div className={`blog-detail-page ${visible ? 'detail-visible' : ''}`}>
//       {/* Hero */}
//       <section className="section-block blog-detail-hero">
//         <div className="blog-detail-meta">
//           <span className="blog-cat-badge">{post.category}</span>
//           <span className="muted blog-read-time">{post.readTime}</span>
//         </div>
//         <h1>{post.title}</h1>
//         <p className="hero-copy blog-detail-excerpt">{post.excerpt}</p>
//         <div className="blog-detail-author-row">
//           <div className="blog-author-avatar">{post.author.charAt(0)}</div>
//           <div>
//             <p className="blog-author">{post.author}</p>
//             <p className="muted" style={{ fontSize: '0.8rem' }}>
//               {post.date}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="section-block blog-content-block">
//         <div
//           className="blog-content"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         />
//         <div className="blog-tags">
//           {post.tags.map((tag) => (
//             <span className="blog-tag" key={tag}>
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* Related Posts */}
//       {related.length > 0 && (
//         <section className="section-block">
//           <div className="section-head">
//             <p className="eyebrow">More in {post.category}</p>
//             <h2>Related posts</h2>
//           </div>
//           <div className="blog-related-grid">
//             {related.map((r) => (
//               <Link
//                 to={`/blog/${r.slug}`}
//                 className="blog-related-card"
//                 key={r.id}
//               >
//                 <span className="blog-cat-badge">{r.category}</span>
//                 <h3>{r.title}</h3>
//                 <p className="muted">{r.excerpt}</p>
//                 <span className="blog-related-arrow">→</span>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Comments */}
//       <section className="section-block">
//         <div className="section-head">
//           <p className="eyebrow">Discussion</p>
//           <h2>
//             {comments.length} Comment{comments.length !== 1 ? 's' : ''}
//           </h2>
//         </div>

//         <div className="comments-list">
//           {comments.map((c) => (
//             <div className="comment-item" key={c.id}>
//               <div className="comment-avatar">{c.name.charAt(0)}</div>
//               <div className="comment-body-wrap">
//                 <div className="comment-header">
//                   <span className="comment-name">{c.name}</span>
//                   <span className="muted comment-date">{c.date}</span>
//                 </div>
//                 <p className="comment-body muted">{c.body}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="comment-form-shell">
//           <h3>Leave a comment</h3>
//           <form onSubmit={handleSubmit} noValidate className="comment-form">
//             <div className="comment-form-row">
//               <div className="comment-field">
//                 <label htmlFor="c-name">Name</label>
//                 <input
//                   id="c-name"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   placeholder="Your name"
//                 />
//                 {errors.name && <p className="error-text">{errors.name}</p>}
//               </div>
//               <div className="comment-field">
//                 <label htmlFor="c-email">Email</label>
//                 <input
//                   id="c-email"
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   placeholder="you@example.com"
//                 />
//                 {errors.email && <p className="error-text">{errors.email}</p>}
//               </div>
//             </div>
//             <div className="comment-field">
//               <label htmlFor="c-body">Comment</label>
//               <textarea
//                 id="c-body"
//                 rows="4"
//                 value={form.body}
//                 onChange={(e) => setForm({ ...form, body: e.target.value })}
//                 placeholder="Share your thoughts..."
//               />
//               {errors.body && <p className="error-text">{errors.body}</p>}
//             </div>
//             <button className="btn btn-solid" type="submit">
//               Post Comment
//             </button>
//             {submitted && (
//               <p className="success-text comment-success">
//                 ✓ Comment posted successfully!
//               </p>
//             )}
//           </form>
//         </div>
//       </section>

//       <div style={{ marginTop: '10px' }}>
//         <Link className="btn btn-outline" to="/blog">
//           ← Back to Blog
//         </Link>
//       </div>
//     </div>
//   )
// }

// src/pages/BlogDetailPage.jsx
// UPDATED: emojis → SVG icons | blog fetched from GET /api/blogs (filtered by slug)

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'
import api from '../api/api'

const initialForm = { name: '', email: '', body: '' }

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function readTime(content = '') {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [localComments, setLocalComments] = useState([])

  const { data: allBlogs, loading, error } = useApi('/blogs')

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => clearTimeout(t)
  }, [slug])

  const post = useMemo(() => {
    if (!allBlogs?.length) return null
    return allBlogs.find((b) => b.slug === slug) || null
  }, [allBlogs, slug])

  const related = useMemo(() => {
    if (!allBlogs?.length || !post) return []
    return allBlogs
      .filter((b) => b.slug !== slug && b.category === post.category)
      .slice(0, 2)
  }, [allBlogs, post, slug])

  // Validation
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) {
      e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address.'
    }
    if (!form.body.trim()) e.body = 'Comment cannot be empty.'
    else if (form.body.trim().length < 10)
      e.body = 'Comment must be at least 10 characters.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      // POST comment to contact endpoint (subject = blog title)
      await api.post('/contact', {
        name: form.name,
        email: form.email,
        subject: `Blog comment: ${post?.title || slug}`,
        message: form.body
      })
    } catch {
      // Even if the API fails, show the comment locally (optimistic UI)
    } finally {
      setLocalComments((prev) => [
        ...prev,
        { id: Date.now(), name: form.name, date: 'Just now', body: form.body }
      ])
      setForm(initialForm)
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  // ── Loading ────────────────────────────────────────────────────
  if (loading) {
    return (
      <section
        className="section-block"
        style={{ textAlign: 'center', padding: '60px 0' }}
      >
        <div className="api-loading" style={{ justifyContent: 'center' }}>
          <Icon name="spinner" size={28} className="spin-icon" />
          <span>Loading post…</span>
        </div>
      </section>
    )
  }

  // ── Not found ──────────────────────────────────────────────────
  if (!post) {
    return (
      <section className="section-block not-found">
        <p className="eyebrow">404</p>
        <h1>Post not found</h1>
        {error && (
          <p className="muted" style={{ marginBottom: 16 }}>
            Could not reach the server.
          </p>
        )}
        <Link className="btn btn-solid" to="/blog">
          Back to Blog
        </Link>
      </section>
    )
  }

  const authorName = post.author?.name || post.author || 'Codecelix Team'
  const postDate = formatDate(post.createdAt || post.date)
  const postReadTime = post.readTime || readTime(post.content)
  const tags = post.tags || []
  const allComments = [...localComments]

  return (
    <div className={`blog-detail-page ${visible ? 'detail-visible' : ''}`}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="section-block blog-detail-hero">
        <div className="blog-detail-meta">
          <span className="blog-cat-badge">{post.category}</span>
          <span className="muted blog-read-time">
            <Icon
              name="clock"
              size={13}
              style={{ marginRight: 4, verticalAlign: 'middle' }}
            />
            {postReadTime}
          </span>
        </div>
        <h1>{post.title}</h1>
        <p className="hero-copy blog-detail-excerpt">
          {post.excerpt ||
            (post.content || '').replace(/<[^>]+>/g, '').slice(0, 200) + '…'}
        </p>
        <div className="blog-detail-author-row">
          <div className="blog-author-avatar">{authorName.charAt(0)}</div>
          <div>
            <p className="blog-author">{authorName}</p>
            <p className="muted" style={{ fontSize: '0.8rem' }}>
              {postDate}
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="section-block blog-content-block">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {tags.length > 0 && (
          <div className="blog-tags">
            {tags.map((tag) => (
              <span className="blog-tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* ── Related Posts ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section-block">
          <div className="section-head">
            <p className="eyebrow">More in {post.category}</p>
            <h2>Related posts</h2>
          </div>
          <div className="blog-related-grid">
            {related.map((r) => (
              <Link
                to={`/blog/${r.slug}`}
                className="blog-related-card"
                key={r._id}
              >
                <span className="blog-cat-badge">{r.category}</span>
                <h3>{r.title}</h3>
                <p className="muted">
                  {r.excerpt ||
                    (r.content || '').replace(/<[^>]+>/g, '').slice(0, 120) +
                      '…'}
                </p>
                <span className="blog-related-arrow">
                  <Icon name="arrow-right" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Comments ──────────────────────────────────────────── */}
      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">Discussion</p>
          <h2>
            {allComments.length} Comment{allComments.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {allComments.length > 0 && (
          <div className="comments-list">
            {allComments.map((c) => (
              <div className="comment-item" key={c.id}>
                <div className="comment-avatar">{c.name.charAt(0)}</div>
                <div className="comment-body-wrap">
                  <div className="comment-header">
                    <span className="comment-name">{c.name}</span>
                    <span className="muted comment-date">{c.date}</span>
                  </div>
                  <p className="comment-body muted">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment Form */}
        <div className="comment-form-shell">
          <h3>Leave a comment</h3>
          <form onSubmit={handleSubmit} noValidate className="comment-form">
            <div className="comment-form-row">
              <div className="comment-field">
                <label htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              <div className="comment-field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>
            <div className="comment-field">
              <label htmlFor="c-body">Comment</label>
              <textarea
                id="c-body"
                rows="4"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Share your thoughts…"
              />
              {errors.body && <p className="error-text">{errors.body}</p>}
            </div>
            <button
              className="btn btn-solid"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Icon
                    name="spinner"
                    size={16}
                    className="spin-icon"
                    style={{ marginRight: 6 }}
                  />
                  Posting…
                </>
              ) : (
                'Post Comment'
              )}
            </button>
            {submitted && (
              <p className="success-text comment-success">
                Comment posted successfully.
              </p>
            )}
          </form>
        </div>
      </section>

      <div style={{ marginTop: '10px' }}>
        <Link className="btn btn-outline" to="/blog">
          <Icon
            name="chevron-right"
            size={14}
            style={{ transform: 'rotate(180deg)', marginRight: 4 }}
          />
          Back to Blog
        </Link>
      </div>
    </div>
  )
}
