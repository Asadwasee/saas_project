import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email: email.trim().toLowerCase(),
        password
      })

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      window.dispatchEvent(new Event('storage-update'))

      toast.success(`Welcome back, ${res.data.user.name}! 👋`)
      navigate(res.data.user.role === 'admin' ? '/admin/dashboard' : '/')

      // Auto-redirect based on role
      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#1a1412] border border-[#2a1f1a] rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">
              Please enter your credentials to login.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#2a1f1a] border border-[#3a2a22] rounded-xl pl-11 pr-4 py-3.5
                             text-white placeholder-gray-600 focus:outline-none focus:border-[#ff4d00]
                             focus:ring-1 focus:ring-[#ff4d00] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300 tracking-wide uppercase">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#ff4d00] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff4d00] hover:bg-[#e64400] disabled:opacity-60
                         disabled:cursor-not-allowed text-white font-semibold py-3.5
                         rounded-xl transition-all duration-200 flex items-center
                         justify-center gap-2 mt-2"
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
                  Signing In...
                </>
              ) : (
                '→  Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-[#ff4d00] hover:underline font-medium"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

// // src/pages/Login.jsx
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Mail, Lock, LogIn, Loader2 } from 'lucide-react'
// import toast from 'react-hot-toast'
// import api from '../api/api'

// export default function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await api.post('/auth/login', formData)

//       if (res.data.token) {
//         const user = res.data.user || {}

//         localStorage.setItem('codecelix-token', res.data.token)
//         localStorage.setItem(
//           'user',
//           JSON.stringify({
//             id: user.id || '',
//             name: user.name || '',
//             email: user.email || formData.email,
//             role: user.role || 'user'
//           })
//         )

//         toast.success('Logged in successfully! Welcome back.')

//         setTimeout(() => {
//           navigate('/')
//           window.location.reload()
//         }, 800)
//       }
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.message || 'Invalid email or password'
//       toast.error(errorMsg)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <section className="section-block flex items-center justify-center min-h-[75vh]">
//       <div className="w-full max-w-md p-8 glass border border-line rounded-3xl bg-surface/40 backdrop-blur-xl shadow-2xl">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
//           <p className="text-muted text-sm">
//             Please enter your credentials to login.
//           </p>
//         </div>

//         <form className="space-y-5" onSubmit={handleSubmit}>
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
//                 placeholder="name@company.com"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 className="w-full bg-bg/50 border border-line rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-all"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <div className="flex justify-between">
//               <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
//                 Password
//               </label>
//               <a href="#" className="text-xs text-accent hover:underline">
//                 Forgot?
//               </a>
//             </div>
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
//                 <LogIn size={18} /> Sign In
//               </>
//             )}
//           </button>
//         </form>

//         <p className="text-center mt-8 text-sm text-muted">
//           Don't have an account?{' '}
//           <Link
//             to="/register"
//             className="text-white font-bold hover:text-accent transition-colors"
//           >
//             Create account
//           </Link>
//         </p>
//       </div>
//     </section>
//   )
// }
