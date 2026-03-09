const User = require('../models/User')
const OTP = require('../models/OTP.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')

// ─── SEND OTP ────────────────────────────────────────────────────────────────
exports.sendOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    // Check duplicate email
    const exists = await User.findOne({ email: email.toLowerCase() })
    if (exists)
      return res.status(400).json({ message: 'Email is already registered' })

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // ✅ Store PLAIN password — User model's pre('save') hook will hash it once
    await OTP.deleteMany({ email: email.toLowerCase() })
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      name,
      password: password // ← plain password, NOT hashed here
    })

    // Send OTP email
    await sendEmail({
      to: email,
      subject: 'Your Codecelix Verification OTP',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;
                    background:#1a1412;color:#fff;padding:40px;border-radius:20px;
                    border:1px solid #2a1f1a;">
          <div style="text-align:center;margin-bottom:24px;">
            <h1 style="color:#ff4d00;margin:0;font-size:28px;letter-spacing:2px;">
              ⚡ CODECELIX
            </h1>
          </div>
          <h2 style="text-align:center;color:#fff;font-size:22px;">
            Email Verification
          </h2>
          <p style="color:#aaa;text-align:center;font-size:15px;">
            Hi <strong style="color:#fff">${name}</strong>, use the OTP below to verify
            your email and activate your account.
          </p>
          <div style="background:#2a1f1a;border:2px solid #ff4d00;border-radius:16px;
                      padding:28px;text-align:center;margin:30px 0;">
            <p style="color:#aaa;margin:0 0 8px;font-size:13px;letter-spacing:1px;">
              ONE-TIME PASSWORD
            </p>
            <h1 style="color:#ff4d00;letter-spacing:12px;font-size:42px;margin:0;">
              ${otp}
            </h1>
          </div>
          <p style="color:#888;text-align:center;font-size:13px;">
            ⏱ This OTP expires in <strong style="color:#ff4d00">5 minutes</strong>.
            Do not share it with anyone.
          </p>
          <hr style="border-color:#2a2a2a;margin:24px 0;" />
          <p style="color:#555;text-align:center;font-size:12px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `
    })

    res.status(200).json({ message: 'OTP sent to your email' })
  } catch (err) {
    console.error('sendOTP error:', err)
    res.status(500).json({ message: 'Failed to send OTP. Try again.' })
  }
}

// ─── VERIFY OTP & CREATE ACCOUNT ─────────────────────────────────────────────
exports.verifyOTPAndRegister = async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp)
      return res.status(400).json({ message: 'Email and OTP are required' })

    const record = await OTP.findOne({ email: email.toLowerCase() })

    if (!record)
      return res.status(400).json({
        message: 'OTP expired or not found. Please register again.'
      })

    if (record.otp !== otp.trim())
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' })

    // ✅ User.create() triggers pre('save') → hashes password exactly once
    const user = await User.create({
      name: record.name,
      email: record.email,
      password: record.password, // ← plain password from OTP record
      role: 'user'
    })

    // Delete used OTP record
    await OTP.deleteMany({ email: email.toLowerCase() })

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('verifyOTP error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// ─── RESEND OTP ───────────────────────────────────────────────────────────────
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body

    const record = await OTP.findOne({ email: email.toLowerCase() })

    if (!record)
      return res.status(400).json({
        message: 'Session expired. Please register again.'
      })

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    record.otp = newOtp
    record.createdAt = new Date()
    await record.save()

    await sendEmail({
      to: email,
      subject: 'Your New Codecelix OTP',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;
                    background:#1a1412;color:#fff;padding:40px;border-radius:20px;
                    border:1px solid #2a1f1a;">
          <h1 style="color:#ff4d00;text-align:center;">⚡ CODECELIX</h1>
          <h2 style="text-align:center;">New OTP Code</h2>
          <div style="background:#2a1f1a;border:2px solid #ff4d00;border-radius:16px;
                      padding:28px;text-align:center;margin:30px 0;">
            <h1 style="color:#ff4d00;letter-spacing:12px;font-size:42px;margin:0;">
              ${newOtp}
            </h1>
          </div>
          <p style="color:#888;text-align:center;font-size:13px;">
            Expires in <strong style="color:#ff4d00">5 minutes</strong>.
          </p>
        </div>
      `
    })

    res.status(200).json({ message: 'New OTP sent to your email' })
  } catch (err) {
    console.error('resendOTP error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    // ✅ .select('+password') needed only if User model has select:false on password
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' })

    // ✅ Use model's matchPassword method OR bcrypt.compare directly
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// const jwt = require('jsonwebtoken')
// const User = require('../models/User')

// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
//   )
// }

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required.' })
//     }

//     const existingUser = await User.findOne({ email: email.toLowerCase() })
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists.' })
//     }

//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       password,
//       role: 'user'
//     })

//     return res.status(201).json({
//       message: 'Account created successfully.',
//       token: generateToken(user),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     })
//   } catch (error) {
//     console.error('Register Error:', error.message)
//     return res.status(500).json({
//       message: 'Server error during registration.',
//       error: error.message
//     })
//   }
// }

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password required.' })
//     }

//     const user = await User.findOne({ email: email.toLowerCase() })
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password.' })
//     }

//     const isMatch = await user.matchPassword(password)
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password.' })
//     }

//     return res.status(200).json({
//       message: 'Login successful.',
//       token: generateToken(user),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     })
//   } catch (error) {
//     console.error('Login Error:', error.message)
//     return res.status(500).json({
//       message: 'Server error during login.',
//       error: error.message
//     })
//   }
// }

// module.exports = { register, login }
