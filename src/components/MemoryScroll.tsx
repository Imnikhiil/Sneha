import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { birthday } from '../config/birthday'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './MemoryScroll.css'

gsap.registerPlugin(ScrollTrigger)

export function MemoryScroll() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const chapters = root.querySelectorAll<HTMLElement>('.memory-chapter')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview')
          }
        })
      },
      { threshold: 0.35 },
    )
    chapters.forEach((c) => observer.observe(c))

    let ctx: gsap.Context | undefined
    if (!reduced) {
      ctx = gsap.context(() => {
        chapters.forEach((chapter) => {
          const card = chapter.querySelector('.polaroid')
          if (!card) return
          gsap.fromTo(
            card,
            { y: 60, rotateZ: -6, filter: 'blur(4px)' },
            {
              y: 0,
              rotateZ: 0,
              filter: 'blur(0px)',
              ease: 'none',
              scrollTrigger: {
                trigger: chapter,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 0.8,
              },
            },
          )
        })
      }, root)
    }

    return () => {
      observer.disconnect()
      ctx?.revert()
    }
  }, [reduced])

  return (
    <section ref={rootRef} className="memories" id="memories" aria-label="Shared memories">
      <div className="memories-heading">
        <h2>Pieces of us</h2>
        <p>
          A few frames from the story where you&apos;re both sister and the friend I never had to
          audition for.
        </p>
      </div>

      <div className="memory-track">
        {birthday.memories.map((memory) => (
          <article key={memory.id} className="memory-chapter">
            <div className="memory-dust" aria-hidden="true" />
            <div className="polaroid" style={{ '--accent': memory.accent } as CSSProperties}>
              <div className="polaroid-photo">
                {memory.image ? (
                  <img src={memory.image} alt={memory.title} />
                ) : (
                  <div className="polaroid-placeholder">
                    <strong>{memory.title}</strong>
                    <span>Add photo later</span>
                  </div>
                )}
              </div>
              <div className="polaroid-meta">
                {memory.date && <p className="polaroid-date">{memory.date}</p>}
                <h3 className="polaroid-title">{memory.title}</h3>
                <p className="polaroid-caption">{memory.caption}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
