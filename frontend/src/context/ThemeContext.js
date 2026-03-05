import { createContext, useContext } from 'react'

const ThemeContext = createContext(null)
export default ThemeContext // ← default export (context object)

// ✅ NEW — named export that was missing
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}
