import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

const ALL = 'All'

// Build categories dynamically
function buildCategories(blogs) {
  const cats = [...new Set(blogs.map((b) => b.category).filter(Boolean))]
  return [ALL, ...cats]
}

// Format date
function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Estimate read time
function readTime(content = '') {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL)

  const { data: apiBlogRaw, loading, error } = useApi('/blogs')

  // Normalize API data
  const blogs = useMemo(() => {
    if (!apiBlogRaw?.length) return []

    return apiBlogRaw.map((b) => ({
      _id: b._id,
      slug: b.slug,
      title: b.title,
      category: b.category || 'General',
      author: b.author?.name || b.author || 'Codecelix Team',
      date: formatDate(b.createdAt || b.date),
      readTime: b.readTime || readTime(b.content),
      excerpt:
        b.excerpt ||
        (b.content || '').replace(/<[^>]+>/g, '').slice(0, 160) + '…',
      content: b.content || '',
      tags: b.tags || []
    }))
  }, [apiBlogRaw])

  const categories = useMemo(() => buildCategories(blogs), [blogs])

  // Safe category (prevents invalid category state)
  const safeActiveCategory = categories.includes(activeCategory)
    ? activeCategory
    : ALL

  // Filter blogs
  const filtered = useMemo(() => {
    let result = blogs

    if (safeActiveCategory !== ALL) {
      result = result.filter((b) => b.category === safeActiveCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()

      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return result
  }, [blogs, search, safeActiveCategory])

  return (
    <div className="blog-page">
      <section className="section-block page-intro">
        <p className="eyebrow">Blog</p>
        <h1>Insights from the Codecelix team</h1>
        <p className="hero-copy">
          Engineering deep-dives, growth strategies, and product thinking from
          the people building the platform.
        </p>
      </section>

      <section className="section-block">
        {/* Search */}
        <div className="blog-search-wrap">
          <Icon name="search" size={16} className="blog-search-icon-svg" />
          <input
            className="blog-search"
            type="search"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="api-loading">
            <Icon name="spinner" size={22} className="spin-icon" />
            <span>Loading posts…</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="api-error">
            <Icon name="exclamation-circle" size={18} />
            <span>Could not load posts — {error}</span>
          </div>
        )}

        {/* Categories */}
        {!loading && !error && (
          <div className="filter-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${safeActiveCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="blog-empty">
            <p className="muted">No posts match your search.</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && filtered.length > 0 && (
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <article
                className="blog-card"
                key={post._id}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="blog-card-top">
                  <span className="blog-cat-badge">{post.category}</span>

                  <span className="muted blog-read-time">
                    <Icon
                      name="clock"
                      size={13}
                      style={{ marginRight: 4, verticalAlign: 'middle' }}
                    />
                    {post.readTime}
                  </span>
                </div>

                <h3>{post.title}</h3>

                <p className="muted blog-excerpt">{post.excerpt}</p>

                <div className="blog-card-footer">
                  <div className="blog-meta">
                    <span className="blog-author-dot" />
                    <span className="blog-author">{post.author}</span>
                    <span className="muted blog-date">· {post.date}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="btn btn-outline blog-read-btn"
                  >
                    Read
                    <Icon
                      name="arrow-right"
                      size={13}
                      style={{ marginLeft: 4 }}
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
