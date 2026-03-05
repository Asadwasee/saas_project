const express = require("express");
const router = express.Router();

const {
  getServices,
  createService,
  updateService
} = require("../controllers/serviceController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getServices);

router.post("/", protect, createService);

router.put("/:id", protect, updateService);

module.exports = router;