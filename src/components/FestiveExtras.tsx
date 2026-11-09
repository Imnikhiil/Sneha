import { useMemo } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './FestiveExtras.css'

type FestiveExtrasProps = {
  active?: boolean
}

export function FestiveExtras({ active = true }: FestiveExtrasProps) {
  const reduced = usePrefersReducedMotion()

  const gifts = useMemo(
    () =>
      Array.from({ length: reduced ? 4 : 8 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 11) % 84)}%`,
        top: `${12 + ((i * 17) % 70)}%`,
        size: 28 + (i % 4) * 10,
        delay: `${-i * 1.4}s`,
        duration: `${14 + (i % 5) * 2}s`,
        hue: i % 3,
        blur: i % 3 === 0 ? 3 : 0,
      })),
    [reduced],
  )

  const orbs = useMemo(
    () =>
      Array.from({ length: reduced ? 8 : 18 }, (_, i) => ({
        id: i,
        left: `${(i * 13) % 100}%`,
        top: `${(i * 19) % 100}%`,
        size: 6 + (i % 5) * 5,
        delay: `${-i * 0.7}s`,
        duration: `${6 + (i % 4) * 2}s`,
        color: i % 3 === 0 ? '#ffe08a' : i % 3 === 1 ? '#ff7ac8' : '#c9a0ff',
      })),
    [reduced],
  )

  const ribbons = useMemo(
    () =>
      Array.from({ length: reduced ? 2 : 5 }, (_, i) => ({
        id: i,
        left: `${10 + i * 18}%`,
        top: `${-5 + (i % 3) * 25}%`,
        delay: `${-i * 2}s`,
        duration: `${16 + i * 2}s`,
        rotate: -20 + i * 12,
        color: i % 2 === 0 ? '#ff4fb2' : '#b8f03a',
      })),
    [reduced],
  )

  if (!active) return null

  return (
    <div className={`festive-extras${reduced ? ' is-reduced' : ''}`} aria-hidden="true">
      <div className="festive-rays" />

      {ribbons.map((r) => (
        <div
          key={`rib-${r.id}`}
          className="festive-ribbon"
          style={{
            left: r.left,
            top: r.top,
            animationDelay: r.delay,
            animationDuration: r.duration,
            ['--rib-rot' as string]: `${r.rotate}deg`,
            background: `linear-gradient(180deg, ${r.color}, transparent)`,
          }}
        />
      ))}

      {gifts.map((g) => (
        <div
          key={`gift-${g.id}`}
          className={`festive-gift hue-${g.hue}`}
          style={{
            left: g.left,
            top: g.top,
            width: g.size,
            height: g.size * 0.85,
            animationDelay: g.delay,
            animationDuration: g.duration,
            filter: g.blur ? `blur(${g.blur}px)` : undefined,
            opacity: 0.55 + (g.id % 3) * 0.12,
          }}
        >
          <span className="festive-gift-lid" />
          <span className="festive-gift-bow" />
        </div>
      ))}

      {orbs.map((o) => (
        <span
          key={`orb-${o.id}`}
          className="festive-orb"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: o.color,
            animationDelay: o.delay,
            animationDuration: o.duration,
            boxShadow: `0 0 ${o.size * 1.8}px ${o.color}`,
          }}
        />
      ))}
    </div>
  )
}
