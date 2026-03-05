const User = require('../models/User');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const Service = require('../models/Service');

exports.getStats = async (req, res) => {
  try {

    const userCount = await User.countDocuments();
    const projectCount = await Project.countDocuments();
    const messageCount = await Contact.countDocuments();
    const serviceCount = await Service.countDocuments();

    res.json({
      success: true,
      stats: {
        users: userCount,
        services: serviceCount,
        messages: messageCount,
        revenueData: [400, 800, 600, 1200, 1000, 1500]
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analytics Error" });
  }
};