const express = require('express');
const router = express.Router();
const { createBlog, getBlogs, deleteBlog, updateBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getBlogs); 
router.post('/', protect, createBlog); 
router.put('/:id', protect, updateBlog); 
router.delete('/:id', protect, deleteBlog);

module.exports = router;