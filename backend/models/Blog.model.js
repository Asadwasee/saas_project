const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: true,
      enum: ['Development', 'Design', 'Artificial Intelligence', 'Business'],
      trim: true
    },
    author: {
      type: String,
      default: 'Codecelix Team'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchema)
