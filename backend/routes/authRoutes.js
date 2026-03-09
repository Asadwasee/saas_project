const express = require('express')
const router = express.Router()
const {
  sendOTP,
  verifyOTPAndRegister,
  resendOTP,
  login
} = require('../controllers/authController')

router.post('/send-otp', sendOTP)
router.post('/verify-otp', verifyOTPAndRegister)
router.post('/resend-otp', resendOTP)
router.post('/login', login)

module.exports = router

// const express = require('express')
// const router = express.Router()

// const { register, login } = require('../controllers/authController')

// router.post('/register', register)
// router.post('/login', login)

// module.exports = router
