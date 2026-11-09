import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { SuspenseStep } from '../config/birthday'
import './SuspenseGate.css'

type Props = {
  step: SuspenseStep
  index: number
  total: number
  onUnlock: () => void
  children: ReactNode
}

type Phase = 'locked' | 'burst' | 'open'

export function SuspenseGate({ step, index, total, onUnlock, children }: Props) {
  const rootRef = useRef<HTMLElement>(null)
  const timer = useRef<number | null>(null)
  const [phase, setPhase] = useState<Phase>('locked')
  const [progress, setProgress] = useState(0)
  const [taps, setTaps] = useState(0)
  const [started, setStarted] = useState(false)
  const [shake, setShake] = useState(false)
  const [hint, setHint] = useState('')

  const stopTimer = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }

  const unlocking = useRef(false)

  const unlock = () => {
    if (unlocking.current) return
    unlocking.current = true
    stopTimer()
    setPhase('burst')
    window.setTimeout(() => {
      setPhase('open')
      onUnlock()
    }, 1100)
  }

  useEffect(() => {
    if (index > 0) {
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return stopTimer
  }, [index])

  useEffect(() => {
    if (progress >= 100 && (step.kind === 'wait' || step.kind === 'hold')) unlock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  const whisper = () => {
    const lines = step.lines
    if (!lines.length) return ''
    const pct = step.kind === 'tap' ? Math.max(taps - 1, 0) / Math.max(step.taps ?? 1, 1) : progress / 100
    return lines[Math.min(lines.length - 1, Math.floor(pct * lines.length))]
  }

  const startWait = () => {
    if (started) return
    setStarted(true)
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return p
        return Math.min(100, p + 2)
      })
    }, 90)
  }

  const tap = () => {
    const need = step.taps ?? 5
    if (taps >= need) return
    setShake(true)
    window.setTimeout(() => setShake(false), 350)
    const next = taps + 1
    setTaps(next)
    setProgress((next / need) * 100)
    if (next >= need) window.setTimeout(unlock, 450)
  }

  const startHold = () => {
    if (timer.current !== null || phase !== 'locked') return
    const ms = step.holdMs ?? 2800
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        return Math.min(100, p + (100 * 50) / ms)
      })
    }, 50)
  }

  const endHold = () => {
    if (progress >= 100 || unlocking.current) return
    stopTimer()
    setProgress(0)
  }

  const answer = (i: number) => {
    if (i === step.riddle?.answer) {
      setProgress(100)
      unlock()
    } else {
      setShake(true)
      setHint(step.riddle?.hint ?? '')
      window.setTimeout(() => setShake(false), 450)
    }
  }

  const label = `Step ${String(index + 1).padStart(2, '0')} / ${total}`

  if (phase === 'open') {
    return (
      <section ref={rootRef} className="gate-open" aria-label={step.title}>
        <p className="gate-strip">
          <span>{label}</span> · {step.title} · unlocked
        </p>
        <div className="gate-reveal">{children}</div>
      </section>
    )
  }

  return (
    <section ref={rootRef} id={`gate-${index}`} className={`gate${phase === 'burst' ? ' is-burst' : ''}`}>
      <div className={`gate-card${shake ? ' is-shaking' : ''}`}>
        <p className="gate-step">{label}</p>
        <h2>{phase === 'burst' ? 'Unlocked' : step.title}</h2>
        <p className="gate-teaser">{phase === 'burst' ? 'The wait is over…' : step.teaser}</p>

        {phase === 'locked' && (
          <>
            <div className="gate-bar" aria-hidden="true">
              <i style={{ width: `${progress}%` }} />
            </div>
            <p className="gate-whisper" aria-live="polite">
              {hint || (started || taps > 0 || progress > 0 ? whisper() : '')}
            </p>

            {step.kind === 'wait' && (
              <button className="gate-btn" onClick={startWait} disabled={started}>
                {started ? 'Waiting…' : 'Open it slowly'}
              </button>
            )}
            {step.kind === 'tap' && (
              <button className="gate-btn" onClick={tap}>
                Knock ({taps}/{step.taps ?? 5})
              </button>
            )}
            {step.kind === 'hold' && (
              <button
                className="gate-btn gate-hold"
                onPointerDown={startHold}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && startHold()}
                onKeyUp={(e) => (e.key === ' ' || e.key === 'Enter') && endHold()}
              >
                Press &amp; hold
              </button>
            )}
            {step.kind === 'riddle' && step.riddle && (
              <div className="gate-options">
                {step.riddle.options.map((o, i) => (
                  <button key={o} className="gate-btn" onClick={() => answer(i)}>
                    {o}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}