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
            author: req.user.id 
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

// @desc    Update a blog
// @route   PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
    try {
        const { title, slug, content, category, image, description } = req.body;
        
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Data update karein
        blog.title = title || blog.title;
        blog.slug = slug || blog.slug;
        blog.content = content || blog.content;
        blog.category = category || blog.category;
        blog.image = image || blog.image;
        blog.description = description || blog.description;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
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