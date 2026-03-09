import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from 'react-icons/fi'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const validate = () => {
    if (!form.name.trim()) {
      toast.error('Name is required')
      return false
    }
    if (!form.email.trim()) {
      toast.error('Email is required')
      return false
    }
    const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRgx.test(form.email)) {
      toast.error('Enter a valid email address')
      return false
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return false
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await axios.post(`${API}/api/auth/send-otp`, {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password
      })
      toast.success('OTP sent! Check your email.')
      navigate('/verify-otp', {
        state: { email: form.email.trim().toLowerCase() }
      })
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to send OTP. Try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-[#1a1412] border border-[#2a1f1a] rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join Codecelix and start building.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide uppercase">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-[#2a1f1a] border border-[#3a2a22] rounded-xl pl-11 pr-4 py-3.5
                             text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d00]
                             focus:ring-1 focus:ring-[#ff4d00] transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-[#2a1f1a] border border-[#3a2a22] rounded-xl pl-11 pr-4 py-3.5
                             text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d00]
                             focus:ring-1 focus:ring-[#ff4d00] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide uppercase">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full bg-[#2a1f1a] border border-[#3a2a22] rounded-xl pl-11 pr-12 py-3.5
                             text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d00]
                             focus:ring-1 focus:ring-[#ff4d00] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 
                             hover:text-[#ff4d00] transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full bg-[#2a1f1a] border rounded-xl pl-11 pr-12 py-3.5
                             text-white placeholder-gray-600 focus:outline-none focus:ring-1
                             transition-all duration-200
                             ${
                               form.confirmPassword &&
                               form.confirmPassword !== form.password
                                 ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                 : 'border-[#3a2a22] focus:border-[#ff4d00] focus:ring-[#ff4d00]'
                             }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 
                             hover:text-[#ff4d00] transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
              {/* Inline mismatch hint */}
              {form.confirmPassword &&
                form.confirmPassword !== form.password && (
                  <p className="text-red-400 text-xs mt-1.5 ml-1">
                    Passwords do not match
                  </p>
                )}
              {form.confirmPassword &&
                form.confirmPassword === form.password && (
                  <p className="text-green-400 text-xs mt-1.5 ml-1">
                    ✓ Passwords match
                  </p>
                )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff4d00] hover:bg-[#e64400] disabled:opacity-60
                         disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl
                         transition-all duration-200 flex items-center justify-center gap-2 mt-2"
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
                  Sending OTP...
                </>
              ) : (
                '→  Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#ff4d00] hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

// // src/pages/Register.jsx
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { User, Mail, Lock, UserPlus, Loader2 } from 'lucide-react'
// import toast from 'react-hot-toast'
// import api from '../api/api'

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   })
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await api.post('/auth/register', formData)

//       if (res.status === 201) {
//         toast.success('Account created successfully. Please login.')
//         setTimeout(() => navigate('/login'), 1200)
//       }
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.message || 'Something went wrong. Try again.'
//       toast.error(errorMsg)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <section className="section-block flex items-center justify-center min-h-[85vh]">
//       <div className="w-full max-w-md p-8 glass border border-line rounded-3xl bg-surface/40 backdrop-blur-xl shadow-2xl">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-white mb-2">Join Codecelix</h2>
//           <p className="text-muted text-sm">
//             Create your account to get started.
//           </p>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="space-y-2">
//             <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
//               Full Name
//             </label>
//             <div className="relative group">
//               <User
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors"
//                 size={18}
//               />
//               <input
//                 required
//                 type="text"
//                 placeholder="Asad Khan"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full bg-bg/50 border border-line rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-all"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
//               Email Address
//             </label>
//             <div className="relative group">
//               <Mail
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors"
//                 size={18}
//               />
//               <input
//                 required
//                 type="email"
//                 placeholder="asad@example.com"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 className="w-full bg-bg/50 border border-line rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-all"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
//               Password
//             </label>
//             <div className="relative group">
//               <Lock
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors"
//                 size={18}
//               />
//               <input
//                 required
//                 type="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 className="w-full bg-bg/50 border border-line rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-all"
//               />
//             </div>
//           </div>

//           <button
//             disabled={loading}
//             type="submit"
//             className="btn btn-solid w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold mt-4 shadow-lg shadow-accent/20 disabled:opacity-50"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin" size={20} />
//             ) : (
//               <>
//                 <UserPlus size={18} /> Create Account
//               </>
//             )}
//           </button>
//         </form>

//         <p className="text-center mt-8 text-sm text-muted">
//           Already have an account?{' '}
//           <Link
//             to="/login"
//             className="text-white font-bold hover:text-accent transition-colors"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </section>
//   )
// }
