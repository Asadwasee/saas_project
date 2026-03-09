// const express = require("express");
// const router = express.Router();

// const {
//   getServices,
//   createService,
//   updateService
// } = require("../controllers/serviceController");

// const { protect } = require("../middleware/authMiddleware");

// router.get("/", getServices);

// router.post("/", protect, createService);

// router.put("/:id", protect, updateService);

// module.exports = router;

const express = require('express')
const router = express.Router()
const Service = require('../models/Service')
const { protect } = require('../middleware/authMiddleware')

router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 })
    res.json(services)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug })
    if (!service) return res.status(404).json({ message: 'Service not found' })
    res.json(service)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/', protect, async (req, res) => {
  try {
    const service = await Service.create(req.body)
    res.status(201).json(service)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.put('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.json(service)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.delete('/:id', protect, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
