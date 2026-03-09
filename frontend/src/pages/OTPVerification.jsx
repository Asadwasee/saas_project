import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const OTPVerification = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const email = state?.email || ''

  const [otp, setOtp] = useState(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timer, setTimer] = useState(300) // 5 minutes
  const inputRefs = useRef([])

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      toast.error('Session lost. Please register again.')
      navigate('/register')
    }
  }, [email, navigate])

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  // Handle each digit input
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return // only digits
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // take only last char
    setOtp(newOtp)
    // Auto-focus next
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste (paste all 6 digits at once)
  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join('')
    if (otpString.length < 6) {
      toast.error('Please enter the complete 6-digit OTP')
      return
    }
    if (timer <= 0) {
      toast.error('OTP has expired. Please request a new one.')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${API}/api/auth/verify-otp`, {
        email,
        otp: otpString
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      toast.success(`🎉 Welcome to Codecelix, ${res.data.user.name}!`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed')
      // Clear OTP on wrong attempt
      setOtp(Array(6).fill(''))
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await axios.post(`${API}/api/auth/resend-otp`, { email })
      toast.success('New OTP sent to your email!')
      setOtp(Array(6).fill(''))
      setTimer(300)
      inputRefs.current[0]?.focus()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#1a1412] border border-[#2a1f1a] rounded-3xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 bg-[#ff4d00]/10 border-2 border-[#ff4d00] rounded-2xl
                            flex items-center justify-center text-3xl"
            >
              📧
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              We sent a 6-digit OTP to{' '}
              <span className="text-[#ff4d00] font-medium">{email}</span>
            </p>
          </div>

          {/* OTP Input Boxes */}
          <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2
                           bg-[#2a1f1a] text-white transition-all duration-200 outline-none
                           ${
                             digit
                               ? 'border-[#ff4d00] text-[#ff4d00]'
                               : 'border-[#3a2a22] focus:border-[#ff4d00]'
                           }`}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center mb-6">
            {timer > 0 ? (
              <p className="text-gray-500 text-sm">
                OTP expires in{' '}
                <span
                  className={`font-mono font-bold ${timer <= 60 ? 'text-red-400' : 'text-[#ff4d00]'}`}
                >
                  {formatTime(timer)}
                </span>
              </p>
            ) : (
              <p className="text-red-400 text-sm font-medium">
                OTP has expired
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || otp.join('').length < 6}
            className="w-full bg-[#ff4d00] hover:bg-[#e64400] disabled:opacity-50
                       disabled:cursor-not-allowed text-white font-semibold py-3.5
                       rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Verifying...
              </>
            ) : (
              '✓  Verify & Create Account'
            )}
          </button>

          {/* Resend */}
          <p className="text-center text-gray-500 text-sm mt-5">
            Didn't receive the OTP?{' '}
            <button
              onClick={handleResend}
              disabled={resending || timer > 240} // allow resend only after 60s
              className="text-[#ff4d00] hover:underline font-medium disabled:opacity-40
                         disabled:cursor-not-allowed disabled:no-underline"
            >
              {resending ? 'Sending...' : 'Resend OTP'}
            </button>
          </p>
          {timer > 240 && (
            <p className="text-center text-gray-600 text-xs mt-1">
              You can resend after {formatTime(timer - 240)}
            </p>
          )}

          {/* Back link */}
          <p className="text-center text-gray-600 text-xs mt-4">
            Wrong email?{' '}
            <Link
              to="/register"
              className="text-gray-400 hover:text-white underline"
            >
              Go back & register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification
