import { useEffect, useMemo, useState } from 'react'
import { birthday } from '../config/birthday'
import './NightCountdown.css'

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

export function NightCountdown() {
  const target = useMemo(() => {
    const d = new Date(`${birthday.birthdayDate}T00:00:00`)
    return Number.isNaN(d.getTime()) ? new Date() : d
  }, [])

  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, target.getTime() - now)
  const arrived = diff === 0
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)

  return (
    <section className="countdown" id="countdown" aria-label="Birthday countdown">
      <div className="countdown-inner">
        <p className="section-kicker">The night approaches</p>
        <h2>{arrived ? 'It’s today' : 'Counting down to you'}</h2>
        <p className="section-sub">
          {arrived
            ? `Happy birthday, ${birthday.name}. The sky is yours.`
            : 'Not a calendar reminder — a little clock for the day that matters.'}
        </p>

        {!arrived && (
          <div className="countdown-grid" aria-live="polite">
            {[
              { label: 'Days', value: pad(days) },
              { label: 'Hours', value: pad(hours) },
              { label: 'Mins', value: pad(mins) },
              { label: 'Secs', value: pad(secs) },
            ].map((unit) => (
              <div key={unit.label} className="countdown-unit">
                <div className="countdown-flip">
                  <span>{unit.value}</span>
                </div>
                <span className="countdown-label">{unit.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
