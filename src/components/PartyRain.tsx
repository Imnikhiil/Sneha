import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './PartyRain.css'

type PartyRainProps = {
  fire: boolean
}

type Piece = {
  x: number
  y: number
  w: number
  h: number
  vy: number
  vx: number
  rot: number
  vr: number
  color: string
  life: number
  max: number
}

export function PartyRain({ fire }: PartyRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!fire || reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const colors = ['#ff4fb2', '#b8f03a', '#9b5cff', '#ffe08a', '#ff7ac8', '#ffffff']
    const pieces: Piece[] = Array.from({ length: 110 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight * 0.4,
      w: 4 + Math.random() * 7,
      h: 6 + Math.random() * 10,
      vy: 2.2 + Math.random() * 4.5,
      vx: (Math.random() - 0.5) * 2.5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      max: 90 + Math.random() * 50,
    }))

    let raf = 0
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      let alive = false
      for (const p of pieces) {
        if (p.life >= p.max) continue
        alive = true
        p.life += 1
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        const alpha = Math.min(1, 1 - p.life / p.max + 0.15)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      ctx.globalAlpha = 1
      if (alive) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [fire, reduced])

  if (!fire || reduced) return null
  return <canvas ref={canvasRef} className="party-rain" aria-hidden="true" />
}
