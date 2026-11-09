import { useCallback, useEffect, useRef, useState } from 'react'
import './BlowCandle.css'

type BlowCandleProps = {
  onBlown: () => void
}

export function BlowCandle({ onBlown }: BlowCandleProps) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const [blown, setBlown] = useState(false)
  const [micTrying, setMicTrying] = useState(false)
  const blownRef = useRef(false)
  const holdRef = useRef<number | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)

  const complete = useCallback(() => {
    if (blownRef.current) return
    blownRef.current = true
    setBlown(true)
    setProgress(100)
    setHolding(false)
    window.setTimeout(onBlown, 1400)
  }, [onBlown])

  const stopMic = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    void audioCtxRef.current?.close()
    audioCtxRef.current = null
    setMicTrying(false)
  }, [])

  useEffect(() => () => stopMic(), [stopMic])

  useEffect(() => {
    if (!holding || blown) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / 1200) * 100)
      setProgress(p)
      if (p >= 100) {
        complete()
        return
      }
      holdRef.current = requestAnimationFrame(tick)
    }
    holdRef.current = requestAnimationFrame(tick)
    return () => {
      if (holdRef.current) cancelAnimationFrame(holdRef.current)
    }
  }, [holding, blown, complete])

  const startHold = () => {
    if (blown) return
    setHolding(true)
  }

  const endHold = () => {
    if (blown) return
    setHolding(false)
    setProgress(0)
  }

  const tryMic = async () => {
    if (blown || micTrying) return
    try {
      setMicTrying(true)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const ctx = new AudioContext()
      audioCtxRef.current = ctx
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      const data = new Uint8Array(analyser.frequencyBinCount)
      let blowAccum = 0

      const loop = () => {
        analyser.getByteFrequencyData(data)
        const avg = data.reduce((a, b) => a + b, 0) / data.length
        if (avg > 28) {
          blowAccum += 4
          setProgress(Math.min(100, blowAccum))
          if (blowAccum >= 100) {
            stopMic()
            complete()
            return
          }
        } else {
          blowAccum = Math.max(0, blowAccum - 1.5)
          setProgress(blowAccum)
        }
        rafRef.current = requestAnimationFrame(loop)
      }
      rafRef.current = requestAnimationFrame(loop)
    } catch {
      setMicTrying(false)
    }
  }

  return (
    <section
      className={`candle-section${blown ? ' is-bloom' : ''}`}
      id="candle"
      aria-label="Blow out the candle"
    >
      <div className="candle-panel">
        <h2>Make a wish</h2>
        <p>Hold the button to blow — or use your mic if you want the real thing.</p>

        <div className="cake-stage" aria-hidden="true">
          <div className="candle">
            <div className="candle-wick" />
            <div className={`flame${blown ? ' is-out' : ''}`}>
              <div className="flame-outer" />
              <div className="flame-inner" />
            </div>
            <div className={`smoke${blown ? ' is-visible' : ''}`} />
          </div>
          <div className="cake">
            <div className="cake-layer" />
          </div>
        </div>

        {!blown ? (
          <div className="blow-controls">
            <button
              type="button"
              className={`blow-btn${holding ? ' is-holding' : ''}`}
              onPointerDown={startHold}
              onPointerUp={endHold}
              onPointerLeave={endHold}
              onPointerCancel={endHold}
              disabled={blown}
            >
              Hold to blow
            </button>
            <div className="blow-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <button type="button" className="blow-alt" onClick={tryMic}>
              {micTrying ? 'Listening for your breath…' : 'Use microphone instead'}
            </button>
          </div>
        ) : (
          <p className="blow-done">Wish locked in the stars.</p>
        )}
      </div>
    </section>
  )
}
