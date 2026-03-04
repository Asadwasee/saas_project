// import { useTheme } from "../context/ThemeContext";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();
//   const isDark = theme === "dark";

//   return (
//     <button
//       className="theme-toggle"
//       onClick={toggleTheme}
//       aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//       title={`Switch to ${isDark ? "light" : "dark"} mode`}
//     >
//       <span className="theme-toggle-track">
//         <span className="theme-toggle-thumb">
//           {isDark ? "🌙" : "☀️"}
//         </span>
//       </span>
//     </button>
//   );
// }

// src/components/ThemeToggle.jsx
// UPDATED: 🌙 / ☀️ emojis → SVG Moon / Sun icons

import { useTheme } from '../context/ThemeContext'
import Icon from './Icons'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          {isDark ? (
            <Icon name="moon" size={14} />
          ) : (
            <Icon name="sun" size={14} />
          )}
        </span>
      </span>
    </button>
  )
}
