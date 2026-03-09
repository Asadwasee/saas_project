// const express = require('express')
// const router = express.Router()
// const {
//   createBlog,
//   getBlogs,
//   deleteBlog,
//   updateBlog
// } = require('../controllers/blogController')
// const { protect } = require('../middleware/authMiddleware')

// router.get('/', getBlogs)
// router.post('/', protect, createBlog)
// router.put('/:id', protect, updateBlog)
// router.delete('/:id', protect, deleteBlog)

// module.exports = router

const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog.model')
const { protect } = require('../middleware/authMiddleware')

// ✅ Public — get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ✅ Public — get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json(blog)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ✅ Protected — create blog (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { title, slug, description, content, image, category } = req.body

    if (!title || !slug || !description || !content || !category)
      return res
        .status(400)
        .json({ message: 'All required fields must be filled' })

    const exists = await Blog.findOne({ slug })
    if (exists)
      return res
        .status(400)
        .json({ message: 'A blog with this slug already exists' })

    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      image,
      category
    })
    res.status(201).json(blog)
  } catch (err) {
    console.error('Create blog error:', err)
    res.status(500).json({ message: err.message || 'Server error' })
  }
})

// ✅ Protected — update blog
router.put('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    res.json(blog)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// ✅ Protected — delete blog
router.delete('/:id', protect, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ message: 'Blog deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
