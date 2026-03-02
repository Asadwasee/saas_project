import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { blogsData, categories } from '../data/blogsData' // ✅ imported, not exported here

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    let result = blogsData
    if (activeCategory !== 'All') {
      result = result.filter((b) => b.category === activeCategory)
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
  }, [search, activeCategory])

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
          <span className="blog-search-icon">🔍</span>
          <input
            className="blog-search"
            type="search"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filtered.length === 0 ? (
          <div className="blog-empty">
            <p className="muted">No posts match your search.</p>
          </div>
        ) : (
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <article
                className="blog-card"
                key={post.id}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="blog-card-top">
                  <span className="blog-cat-badge">{post.category}</span>
                  <span className="muted blog-read-time">{post.readTime}</span>
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
                    Read →
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
