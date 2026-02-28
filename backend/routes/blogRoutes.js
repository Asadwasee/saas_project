const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getBlogs); // Public can see blogs
router.post('/', protect, createBlog); // Only admin (logged in) can post
router.delete('/:id', protect, deleteBlog);

module.exports = router;