import { useEffect, useState } from 'react'
import { birthday } from '../config/birthday'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './LetterFinale.css'

type LetterFinaleProps = {
  active: boolean
  onReplay: () => void
}

export function LetterFinale({ active, onReplay }: LetterFinaleProps) {
  const reduced = usePrefersReducedMotion()
  const full = birthday.finaleMessage
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) {
      setText('')
      setDone(false)
      return
    }

    if (reduced) {
      setText(full)
      setDone(true)
      return
    }

    let i = 0
    setText('')
    setDone(false)
    const id = window.setInterval(() => {
      i += 1
      setText(full.slice(0, i))
      if (i >= full.length) {
        window.clearInterval(id)
        setDone(true)
      }
    }, 18)

    return () => window.clearInterval(id)
  }, [active, full, reduced])

  return (
    <section
      className={`finale${active ? ' is-visible' : ''}`}
      id="finale"
      aria-label="Birthday letter"
      aria-hidden={!active}
    >
      <div className="finale-inner">
        <div className="finale-lockup">
          <p>And so</p>
          <h2>Happy Birthday, {birthday.name}</h2>
        </div>

        <div className="finale-letter">
          <pre>
            {text}
            {active && !done && <span className="finale-cursor" aria-hidden="true" />}
          </pre>
        </div>

        {done && (
          <div className="finale-actions">
            <button
              type="button"
              className="finale-replay"
              onClick={() => document.getElementById('gift')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Back to gift
            </button>
            <button type="button" className="finale-replay" onClick={onReplay}>
              Replay the night
            </button>
          </div>
        )}

        <p className="finale-signoff">
          From {birthday.fromName} — built for {birthday.nickname}, kept forever
        </p>
      </div>
    </section>
  )
}
