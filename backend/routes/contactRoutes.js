const express = require('express');
const router = express.Router();
const { submitForm, getMessages, markAsRead } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public route: Koi bhi contact kar sakta hai
router.post('/', submitForm);

// Protected routes: Sirf admin messages dekh sakta hai
router.get('/', protect, getMessages);
router.put('/:id', protect, markAsRead);

module.exports = router;