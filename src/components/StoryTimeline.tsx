import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { birthday } from '../config/birthday'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './StoryTimeline.css'

gsap.registerPlugin(ScrollTrigger)

export function StoryTimeline() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.timeline-beat').forEach((beat, i) => {
        gsap.fromTo(
          beat,
          { autoAlpha: 0, x: i % 2 === 0 ? -40 : 40, y: 24 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: beat,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.6,
            },
          },
        )
      })

      gsap.fromTo(
        '.timeline-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-track',
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={rootRef} className="timeline" id="timeline" aria-label="Our story timeline">
      <div className="timeline-heading">
        <p className="section-kicker">Plot points</p>
        <h2>How we got here</h2>
        <p className="section-sub">A short map of us — friends first, and the good stories after.</p>
      </div>

      <div className="timeline-track">
        <div className="timeline-line" aria-hidden="true">
          <div className="timeline-line-fill" />
        </div>
        {birthday.timeline.map((beat, i) => (
          <article
            key={beat.id}
            className={`timeline-beat${i % 2 === 0 ? ' is-left' : ' is-right'}`}
          >
            <span className="timeline-year">{beat.year}</span>
            <div className="timeline-card">
              <h3>{beat.title}</h3>
              <p>{beat.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}