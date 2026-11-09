import { useRef, useState } from 'react'
import { birthday } from '../config/birthday'
import './FunnyLane.css'

export function FunnyLane() {
  const railRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollBy = (dir: -1 | 1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector('.funny-card')
    const width = card instanceof HTMLElement ? card.offsetWidth + 16 : 280
    rail.scrollBy({ left: dir * width, behavior: 'smooth' })
    setActive((i) => Math.min(birthday.funny.length - 1, Math.max(0, i + dir)))
  }

  return (
    <section className="funny" id="funny" aria-label="Funny moments">
      <div className="funny-heading">
        <p className="section-kicker">Comedy section</p>
        <h2>Funny lane</h2>
        <p className="section-sub">
          Inside jokes & very gentle roasts. All facts, mostly true.
        </p>
      </div>

      <div className="funny-controls">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous funny card">
          Prev
        </button>
        <span>
          {active + 1} / {birthday.funny.length}
        </span>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Next funny card">
          Next
        </button>
      </div>

      <div
        className="funny-rail"
        ref={railRef}
        onScroll={() => {
          const rail = railRef.current
          if (!rail) return
          const card = rail.querySelector('.funny-card')
          const width = card instanceof HTMLElement ? card.offsetWidth + 16 : 280
          setActive(Math.round(rail.scrollLeft / width))
        }}
      >
        {birthday.funny.map((item, i) => (
          <article key={item.id} className={`funny-card${i === active ? ' is-active' : ''}`}>
            <span className="funny-index">Joke {String(i + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>

            {item.image?.trim() && (
              <img className="funny-media" src={item.image} alt="" loading="lazy" />
            )}
            {item.video?.trim() && (
              <video className="funny-media" src={item.video} controls playsInline preload="metadata" />
            )}

            <p>{item.punchline}</p>
          </article>
        ))}
      </div>
    </section>
  )
}