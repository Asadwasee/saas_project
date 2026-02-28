const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const { getProjects, createProject } = require('../controllers/projectController');
const { getStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Auth
router.post('/login', loginUser);

// Projects (Case Studies)
router.get('/projects', getProjects);
router.post('/projects', protect, createProject); // Only admin can add

// Dashboard
router.get('/stats', protect, getStats);

module.exports = router;