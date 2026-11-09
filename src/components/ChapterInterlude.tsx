import { useEffect, useRef, useState } from 'react'
import './ChapterInterlude.css'

type ChapterInterludeProps = {
  text: string
}

export function ChapterInterlude({ text }: ChapterInterludeProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className={`interlude${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <p>{text}</p>
    </section>
  )
}
