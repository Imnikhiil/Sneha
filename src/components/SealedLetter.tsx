import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { birthday } from '../config/birthday'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './SealedLetter.css'

type SealedLetterProps = {
  onOpened: () => void
}

export function SealedLetter({ onOpened }: SealedLetterProps) {
  const [cracked, setCracked] = useState(false)
  const [open, setOpen] = useState(false)
  const [exiting, setExiting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const doneRef = useRef(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    setExiting(true)
    const el = overlayRef.current
    if (!el || reduced) {
      onOpened()
      return
    }
    gsap.to(el, {
      opacity: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      onComplete: onOpened,
    })
  }

  const handleOpen = () => {
    if (cracked) return
    setCracked(true)

    if (reduced) {
      setOpen(true)
      window.setTimeout(finish, 400)
      return
    }

    window.setTimeout(() => setOpen(true), 380)
    window.setTimeout(finish, 2200)
  }

  return (
    <div
      ref={overlayRef}
      className={`seal-overlay${cracked ? ' is-opening' : ''}${exiting ? ' is-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="A sealed birthday letter"
    >
      <div className="seal-vignette" />
      <div className="light-leak" />

      <div className="seal-stage">
        <div className={`envelope${open ? ' is-open' : ''}`}>
          <div className="envelope-body" />
          <div className="paper">
            <p className="paper-eyebrow">A private delivery</p>
            <h2 className="paper-title">For {birthday.name}</h2>
            <p className="paper-sub">
              Something quiet. Something yours. Tap the seal when you&apos;re ready.
            </p>
          </div>
          <div className="envelope-flap" />
        </div>

        <button
          type="button"
          className={`wax-seal${cracked ? ' is-cracked' : ''}`}
          onClick={handleOpen}
          aria-label="Break the wax seal"
        >
          <span className="wax-inner">
            {birthday.name.slice(0, 1).toUpperCase()}
          </span>
          <svg className="wax-cracks" viewBox="0 0 88 88" aria-hidden="true">
            <path
              d="M18 30 L40 48 L28 70 M55 20 L48 45 L70 58 M44 12 L44 76"
              stroke="rgba(40,10,15,0.55)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </button>
      </div>

      {!cracked && <p className="seal-hint">Tap the seal</p>}
    </div>
  )
}
