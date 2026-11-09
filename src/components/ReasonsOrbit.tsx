import { useEffect, useRef, useState } from 'react'
import { birthday } from '../config/birthday'
import './ReasonsOrbit.css'

export function ReasonsOrbit() {
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % birthday.reasons.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [inView])

  return (
    <section ref={rootRef} className="reasons" id="reasons" aria-label="Reasons you matter">
      <div className="reasons-heading">
        <p className="section-kicker">Eight true things</p>
        <h2>Why you hit different</h2>
        <p className="section-sub">Tap any reason — or just watch them arrive.</p>
      </div>

      <div className={`reasons-stage${inView ? ' is-live' : ''}`}>
        <div className="reasons-spotlight" aria-live="polite">
          <span className="reasons-index">0{active + 1}</span>
          <p>{birthday.reasons[active]?.text}</p>
        </div>

        <ul className="reasons-list">
          {birthday.reasons.map((reason, i) => (
            <li key={reason.id}>
              <button
                type="button"
                className={`reason-chip${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                {reason.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
