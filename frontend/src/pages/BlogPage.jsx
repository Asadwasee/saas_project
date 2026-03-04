import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icons'
import useApi from '../hooks/useApi'

const ALL = 'All'
const SERVER_URL = 'http://localhost:5000'; 

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL)
  const { data: apiBlogs, loading, error } = useApi('/blogs')

  const blogs = useMemo(() => {
    if (!apiBlogs) return []
    return apiBlogs.map(b => ({
      ...b,
      author: b.author?.name || "Codecelix Team",
      date: new Date(b.createdAt).toLocaleDateString(),
      image: b.image ? `${SERVER_URL}/${b.image}` : null 
    }))
  }, [apiBlogs])

  const categories = useMemo(() => [ALL, ...new Set(blogs.map(b => b.category))], [blogs])

  const filtered = blogs.filter(b => {
    const matchesCat = activeCategory === ALL || b.category === activeCategory
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="blog-page container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <section className="section-block">
        <p className="eyebrow">Insights</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Latest from Codecelix</h1>
        
        <div className="blog-search-wrap" style={{ margin: '20px 0' }}>
          <input 
            type="search" 
            placeholder="Search articles..." 
            className="blog-search"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && <div className="loader">Connecting to Backend...</div>}
        {error && <div className="error">Backend Connection Failed. Check if Server is running on 5000.</div>}
        
        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {filtered.map((post) => (
            <article key={post._id} className="blog-card" style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
              {post.image && <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
              <div className="blog-card-content" style={{ padding: '20px' }}>
                <span className="blog-cat-badge" style={{ background: '#f0f0f0', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>{post.category}</span>
                <h3 style={{ margin: '15px 0' }}>{post.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="btn-link" style={{ color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}>Read More →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}