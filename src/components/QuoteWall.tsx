import { useEffect, useRef, useState } from 'react'
import { birthday } from '../config/birthday'
import './QuoteWall.css'

export function QuoteWall() {
  const rootRef = useRef<HTMLElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLive(true)
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={rootRef} className="quotes" id="quotes" aria-label="Quote wall">
      <div className="quotes-heading">
        <p className="section-kicker">Words that stay</p>
        <h2>Quote wall</h2>
        <p className="section-sub">
          No files needed — just add more lines in <code>birthday.ts → quotes</code>.
        </p>
      </div>

      <div className={`quote-wall${live ? ' is-live' : ''}`}>
        {birthday.quotes.map((quote, i) => (
          <blockquote
            key={quote.id}
            className={`quote-card vibe-${quote.vibe ?? 'soft'}`}
            style={{ animationDelay: `${i * 0.09}s` }}
          >
            <p>“{quote.text}”</p>
            {quote.by && <cite>— {quote.by}</cite>}
          </blockquote>
        ))}
      </div>
    </section>
  )
}
