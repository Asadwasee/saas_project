const Blog = require('../models/Blog');

// @desc    Create a new blog
// @route   POST /api/blogs
exports.createBlog = async (req, res) => {
    try {
        const { title, slug, content, category, image } = req.body;
        
        const blog = await Blog.create({
            title,
            slug,
            content,
            category,
            image,
            author: req.user.id // Ye protect middleware se aayega
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json({ message: "Blog removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};