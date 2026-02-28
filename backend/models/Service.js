const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: String, // Icon name (like 'FaRobot')
    description: { type: String, required: true },
    details: String, // Detail page content
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
