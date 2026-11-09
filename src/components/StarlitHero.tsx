import { lazy, Suspense } from 'react'
import { birthday } from '../config/birthday'
import './StarlitHero.css'

const Starfield = lazy(() =>
  import('./Starfield').then((m) => ({ default: m.Starfield })),
)

type StarlitHeroProps = {
  visible: boolean
  onBegin: () => void
}

export function StarlitHero({ visible, onBegin }: StarlitHeroProps) {
  return (
    <section className={`hero${visible ? ' is-visible' : ''}`} aria-label="Birthday welcome">
      {visible && (
        <Suspense fallback={<div className="hero-stars" aria-hidden="true" />}>
          <Starfield className="hero-stars" interactive={visible} />
        </Suspense>
      )}
      <div className="hero-glow" />
      <div className="hero-glass">
        <div className="hero-content">
          <p className="hero-badge">A handmade birthday night sky</p>
          <p className="hero-kicker">Sister & friend edition</p>
          <h1 className="hero-name">
            <span>For</span>
            {birthday.name}
          </h1>
          <p className="hero-tagline">{birthday.tagline}</p>
          <p className="hero-nick">also known as {birthday.nickname}</p>
          <button type="button" className="hero-cta" onClick={onBegin}>
            Begin the night
            <span className="hero-cta-line" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="hero-scroll-cue">Scroll when ready</p>
    </section>
  )
}
