const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: String, 
    description: { type: String, required: true },
    color: String, 
    details: [
        {
            heading: String,
            body: String
        }
    ]
},
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);