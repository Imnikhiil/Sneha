import { useMemo } from 'react'
import './FloatingPetals.css'

type Props = { active: boolean }

export function FloatingPetals({ active }: Props) {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: (i * 53) % 100,
        size: 10 + ((i * 7) % 12),
        delay: (i * 1.3) % 12,
        duration: 14 + ((i * 3) % 9),
        glyph: i % 4 === 0 ? '♥' : '✿',
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  )
}