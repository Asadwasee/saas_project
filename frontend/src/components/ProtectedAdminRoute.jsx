// import { Navigate } from 'react-router-dom'

// export default function ProtectedAdminRoute({ children }) {
//   const token = localStorage.getItem('codecelix-token')
//   const user = JSON.parse(localStorage.getItem('user') || 'null')

//   if (!token || !user) {
//     return <Navigate to="/login" replace />
//   }

//   if (user.role !== 'admin') {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

import { Navigate } from 'react-router-dom'

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem('token') // ✅ key must be 'token'
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
