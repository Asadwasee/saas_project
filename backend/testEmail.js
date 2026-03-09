require('dotenv').config()
const nodemailer = require('nodemailer')

console.log('=== ENV CHECK ===')
console.log('EMAIL_USER:', JSON.stringify(process.env.EMAIL_USER))
console.log('EMAIL_PASS:', JSON.stringify(process.env.EMAIL_PASS))
console.log('=================')

async function test() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  try {
    await transporter.verify()
    console.log('✅ Gmail connection SUCCESSFUL!')
  } catch (err) {
    console.log('❌ Gmail connection FAILED:', err.message)
  }
}

test()
