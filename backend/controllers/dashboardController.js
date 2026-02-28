const User = require('../models/User');
const Project = require('../models/Project');
const Contact = require('../models/Contact');

exports.getStats = async (req, res) => {
    try {
        // Yeh data Dashboard ke charts mein use hoga
        const userCount = await User.countDocuments();
        const projectCount = await Project.countDocuments();
        const messageCount = await Contact.countDocuments();

        res.json({
            success: true,
            stats: {
                users: userCount,
                projects: projectCount,
                messages: messageCount,
                revenueData: [400, 800, 600, 1200, 1000, 1500] // Dummy data for Chart.js
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Analytics Error" });
    }
};