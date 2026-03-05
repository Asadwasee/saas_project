import { useEffect, useState } from 'react'
import Icon from './Icons'

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 22 + 8
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => {
          setHidden(true)
          setTimeout(onDone, 450)
        }, 300)
      }
      setProgress(Math.min(current, 100))
    }, 140)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div className={`loading-screen ${hidden ? 'loading-screen--exit' : ''}`}>
      <div className="loading-inner">
        <div className="loading-rings">
          <span className="loading-ring loading-ring-1" />
          <span className="loading-ring loading-ring-2" />
          <span className="loading-ring loading-ring-3" />
          <span className="loading-logo">
            <Icon name="zap" size={28} style={{ color: 'var(--accent)' }} />
          </span>
        </div>
        <p className="loading-brand">Codecelix</p>
        <p className="loading-sub">Initializing platform…</p>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-pct">{Math.round(progress)}%</p>
      </div>
      <div className="loading-blob loading-blob-a" />
      <div className="loading-blob loading-blob-b" />
    </div>
  )
}
