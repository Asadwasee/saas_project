import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * PageTransition — wraps each route's content with a
 * fade + slide-up enter animation on every path change.
 * Works with react-router-dom v6/v7 without extra libs.
 */
export default function PageTransition({ children }) {
  const location = useLocation()
  const [displayedChildren, setDisplayedChildren] = useState(children)
  const [phase, setPhase] = useState('enter') // "enter" | "exit"
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    if (prevPathRef.current === location.pathname) return
    prevPathRef.current = location.pathname

    // 1. Trigger exit
    setPhase('exit')

    // 2. After exit animation, swap content & trigger enter
    const t = setTimeout(() => {
      setDisplayedChildren(children)
      setPhase('enter')
    }, 220)

    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // Keep children in sync when no route change (e.g. initial render)
  useEffect(() => {
    if (phase === 'enter') {
      setDisplayedChildren(children)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  return (
    <div className={`page-transition page-transition--${phase}`}>
      {displayedChildren}
    </div>
  )
}
