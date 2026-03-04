const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Yeh missing tha
    icon: String, 
    description: { type: String, required: true },
    color: String, // Yeh bhi missing tha
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