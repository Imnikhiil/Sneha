import { useEffect, useRef, useState } from 'react'
import './AmbientToggle.css'

type AmbientToggleProps = {
  visible: boolean
}

/** Soft generative night pad via Web Audio — no external files needed */
export function AmbientToggle({ visible }: AmbientToggleProps) {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([])

  useEffect(() => {
    return () => {
      nodesRef.current.forEach(({ osc, gain }) => {
        try {
          gain.gain.exponentialRampToValueAtTime(0.0001, ctxRef.current!.currentTime + 0.2)
          osc.stop()
        } catch {
          /* ignore */
        }
      })
      nodesRef.current = []
      void ctxRef.current?.close()
      ctxRef.current = null
    }
  }, [])

  const toggle = async () => {
    if (on) {
      const ctx = ctxRef.current
      nodesRef.current.forEach(({ osc, gain }) => {
        if (!ctx) return
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)
        window.setTimeout(() => {
          try {
            osc.stop()
          } catch {
            /* ignore */
          }
        }, 450)
      })
      nodesRef.current = []
      setOn(false)
      return
    }

    const ctx = new AudioContext()
    ctxRef.current = ctx
    if (ctx.state === 'suspended') await ctx.resume()

    const freqs = [110, 164.81, 220, 329.63]
    nodesRef.current = freqs.map((f, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.value = f
      gain.gain.value = 0.0001
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      gain.gain.exponentialRampToValueAtTime(0.012 - i * 0.002, ctx.currentTime + 1.2)
      return { osc, gain }
    })
    setOn(true)
  }

  if (!visible) return null

  return (
    <button
      type="button"
      className={`ambient-toggle${on ? ' is-on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
    >
      {on ? 'Sound on' : 'Night sound'}
    </button>
  )
}
