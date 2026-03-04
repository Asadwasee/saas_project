import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useApi from '../hooks/useApi'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { data: allBlogs, loading } = useApi('/blogs')
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (allBlogs) {
      const found = allBlogs.find(b => b.slug === slug)
      setPost(found)
    }
  }, [allBlogs, slug])

  if (loading) return <div className="loader">Loading Article...</div>
  if (!post) return <div>Post not found</div>

  return (
    <div className="blog-detail-container">
      <header className="detail-hero">
        <span className="badge">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="author-info">
            <span>By {post.author?.name || 'Admin'}</span> • <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
      </header>
      
      <article className="blog-body" dangerouslySetInnerHTML={{ __html: post.content }} />
      
    </div>
  )
}