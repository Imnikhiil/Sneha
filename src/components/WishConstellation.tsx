import { useEffect, useMemo, useState } from 'react'
import { birthday } from '../config/birthday'
import './WishConstellation.css'

export function WishConstellation() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set())
  const [drawn, setDrawn] = useState(false)

  const wishMap = useMemo(() => {
    const map = new Map(birthday.wishes.map((w) => [w.id, w]))
    return map
  }, [])

  const activeWish = activeId ? wishMap.get(activeId) : undefined

  useEffect(() => {
    const t = window.setTimeout(() => setDrawn(true), 200)
    return () => window.clearTimeout(t)
  }, [])

  const onStar = (id: string) => {
    setActiveId(id)
    setRevealed((prev) => new Set(prev).add(id))
  }

  return (
    <section className="constellation" id="wishes" aria-label="Birthday wishes constellation">
      <div className="constellation-heading">
        <h2>Wish constellation</h2>
        <p>Tap each star. The lines remember what I hope for you this year.</p>
      </div>

      <div className="constellation-stage">
        <svg className="constellation-svg" viewBox="0 0 100 100" aria-hidden="true">
          {birthday.constellationLinks.map(([a, b]) => {
            const wa = wishMap.get(a)
            const wb = wishMap.get(b)
            if (!wa || !wb) return null
            const lit = revealed.has(a) && revealed.has(b)
            return (
              <line
                key={`${a}-${b}`}
                className={`constellation-line${drawn ? ' is-drawn' : ''}${lit ? ' is-lit' : ''}`}
                x1={wa.x}
                y1={wa.y}
                x2={wb.x}
                y2={wb.y}
                pathLength={1}
              />
            )
          })}
        </svg>

        {birthday.wishes.map((wish) => (
          <button
            key={wish.id}
            type="button"
            className={`wish-star${activeId === wish.id ? ' is-active' : ''}`}
            style={{ left: `${wish.x}%`, top: `${wish.y}%` }}
            onClick={() => onStar(wish.id)}
            aria-label={`Reveal wish ${wish.id}`}
            aria-pressed={activeId === wish.id}
          />
        ))}

        <div className={`wish-card${activeWish ? ' is-visible' : ''}`} role="status">
          {activeWish && <p>{activeWish.text}</p>}
        </div>
      </div>

      <p className="constellation-hint">
        {revealed.size}/{birthday.wishes.length} stars lit
      </p>
    </section>
  )
}
