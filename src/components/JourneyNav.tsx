import { useEffect, useState } from 'react'
import { journeyNav } from '../config/birthday'
import './JourneyNav.css'

type JourneyNavProps = {
  visible: boolean
}

export function JourneyNav({ visible }: JourneyNavProps) {
  const [active, setActive] = useState<string>(journeyNav[0]?.id ?? '')

  useEffect(() => {
    if (!visible) return
    const nodes = journeyNav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    const obs = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visibleEntries[0]?.target.id) {
          setActive(visibleEntries[0].target.id)
        }
      },
      { threshold: [0.25, 0.5, 0.7] },
    )

    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [visible])

  if (!visible) return null

  return (
    <nav className="journey-nav" aria-label="Night chapters">
      {journeyNav.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={active === item.id ? 'is-active' : undefined}
          data-label={item.label}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="sr-only">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
