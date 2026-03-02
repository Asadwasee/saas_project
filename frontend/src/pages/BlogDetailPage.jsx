// import { useParams, Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// // import { blogsData } from './BlogPage'
// import { blogsData } from '../data/blogsData'

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

//         {/* Tags */}
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

//         {/* Comment Form */}
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

//       {/* Back Link */}
//       <div style={{ marginTop: '10px' }}>
//         <Link className="btn btn-outline" to="/blog">
//           ← Back to Blog
//         </Link>
//       </div>
//     </div>
//   )
// }

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { blogsData } from '../data/blogsData' // ✅ FIXED (was './BlogPage')

const initialCommentForm = { name: '', email: '', body: '' }

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = blogsData.find((b) => b.slug === slug)

  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Jordan Park',
      date: '2 days ago',
      body: 'Really well-articulated. The section on reliability hit close to home — we ran into exactly that problem last quarter.'
    },
    {
      id: 2,
      name: 'Miriam Schulz',
      date: '1 day ago',
      body: 'Would love a follow-up on observability patterns for LLM pipelines specifically. Great post.'
    }
  ])

  const [form, setForm] = useState(initialCommentForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => clearTimeout(t)
  }, [slug])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) {
      e.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email address.'
    }
    if (!form.body.trim()) {
      e.body = 'Comment cannot be empty.'
    } else if (form.body.trim().length < 10) {
      e.body = 'Comment must be at least 10 characters.'
    }
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name,
          date: 'Just now',
          body: form.body
        }
      ])
      setForm(initialCommentForm)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  if (!post) {
    return (
      <section className="section-block not-found">
        <p className="eyebrow">404</p>
        <h1>Post not found</h1>
        <Link className="btn btn-solid" to="/blog">
          Back to Blog
        </Link>
      </section>
    )
  }

  const related = blogsData
    .filter((b) => b.slug !== slug && b.category === post.category)
    .slice(0, 2)

  return (
    <div className={`blog-detail-page ${visible ? 'detail-visible' : ''}`}>
      {/* Hero */}
      <section className="section-block blog-detail-hero">
        <div className="blog-detail-meta">
          <span className="blog-cat-badge">{post.category}</span>
          <span className="muted blog-read-time">{post.readTime}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="hero-copy blog-detail-excerpt">{post.excerpt}</p>
        <div className="blog-detail-author-row">
          <div className="blog-author-avatar">{post.author.charAt(0)}</div>
          <div>
            <p className="blog-author">{post.author}</p>
            <p className="muted" style={{ fontSize: '0.8rem' }}>
              {post.date}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-block blog-content-block">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="blog-tags">
          {post.tags.map((tag) => (
            <span className="blog-tag" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related Posts */}
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
                key={r.id}
              >
                <span className="blog-cat-badge">{r.category}</span>
                <h3>{r.title}</h3>
                <p className="muted">{r.excerpt}</p>
                <span className="blog-related-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Comments */}
      <section className="section-block">
        <div className="section-head">
          <p className="eyebrow">Discussion</p>
          <h2>
            {comments.length} Comment{comments.length !== 1 ? 's' : ''}
          </h2>
        </div>

        <div className="comments-list">
          {comments.map((c) => (
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
                placeholder="Share your thoughts..."
              />
              {errors.body && <p className="error-text">{errors.body}</p>}
            </div>
            <button className="btn btn-solid" type="submit">
              Post Comment
            </button>
            {submitted && (
              <p className="success-text comment-success">
                ✓ Comment posted successfully!
              </p>
            )}
          </form>
        </div>
      </section>

      <div style={{ marginTop: '10px' }}>
        <Link className="btn btn-outline" to="/blog">
          ← Back to Blog
        </Link>
      </div>
    </div>
  )
}
