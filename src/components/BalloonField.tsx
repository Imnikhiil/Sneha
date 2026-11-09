import { useMemo } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './BalloonField.css'

type BalloonFieldProps = {
  active?: boolean
}

type BalloonSpec = {
  id: number
  color: 'lime' | 'magenta' | 'violet' | 'fuchsia' | 'orchid'
  left: string
  top: string
  size: number
  blur: number
  delay: number
  duration: number
  opacity: number
  z: number
}

const COLORS: BalloonSpec['color'][] = ['lime', 'magenta', 'violet', 'fuchsia', 'orchid']

function makeBalloons(count: number): BalloonSpec[] {
  return Array.from({ length: count }, (_, i) => {
    const depth = Math.random()
    return {
      id: i,
      color: COLORS[i % COLORS.length],
      left: `${4 + Math.random() * 92}%`,
      top: `${-5 + Math.random() * 105}%`,
      size: 48 + depth * 140 + Math.random() * 40,
      blur: depth < 0.35 ? 10 + Math.random() * 14 : depth < 0.7 ? 2 + Math.random() * 4 : 0,
      delay: Math.random() * -18,
      duration: 10 + Math.random() * 14,
      opacity: 0.35 + depth * 0.55,
      z: Math.round(depth * 10),
    }
  })
}

export function BalloonField({ active = true }: BalloonFieldProps) {
  const reduced = usePrefersReducedMotion()
  const balloons = useMemo(() => makeBalloons(reduced ? 10 : 22), [reduced])

  const confetti = useMemo(
    () =>
      Array.from({ length: reduced ? 8 : 28 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * -12}s`,
        duration: `${8 + Math.random() * 10}s`,
      })),
    [reduced],
  )

  if (!active) return null

  return (
    <div className={`balloon-field${reduced ? ' is-reduced' : ''}`} aria-hidden="true">
      <div className="balloon-wash" />
      <div className="balloon-sparkles" />
      {balloons.map((b) => (
        <div
          key={b.id}
          className={`balloon balloon--${b.color}`}
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            filter: b.blur ? `blur(${b.blur}px)` : undefined,
            zIndex: b.z,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <span className="balloon-shine" />
          <span className="balloon-knot" />
          <span className="balloon-string" />
        </div>
      ))}
      <div className="balloon-confetti">
        {confetti.map((c) => (
          <i
            key={c.id}
            style={{
              left: c.left,
              top: c.top,
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          />
        ))}
      </div>
    </div>
  )
}
