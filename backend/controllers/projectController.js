const Project = require('../models/Project');

// @desc    Get all projects with optional category filter
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        const { category } = req.query; // URL query se category pakr rha hai
        const filter = category ? { category } : {};
        
        const projects = await Project.find(filter);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error: Could not fetch projects" });
    }
};

// @desc    Create a new project (Case Study)
// @route   POST /api/projects
exports.createProject = async (req, res) => {
    try {
        // Direct req.body se data create kar rha hai
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project (Optional but useful for Dashboard)
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};