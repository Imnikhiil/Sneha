import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './ChampagneBurst.css'

type ChampagneBurstProps = {
  fire: boolean
}

export function ChampagneBurst({ fire }: ChampagneBurstProps) {
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

    const cx = window.innerWidth / 2
    const cy = window.innerHeight * 0.55
    const parts = Array.from({ length: 90 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 7
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 0,
        max: 50 + Math.random() * 40,
        size: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.5 ? '#f0d9b5' : '#e8c9a0',
      }
    })

    let raf = 0
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      let alive = false
      for (const p of parts) {
        if (p.life >= p.max) continue
        alive = true
        p.life += 1
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12
        const alpha = 1 - p.life / p.max
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (alive) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [fire, reduced])

  if (!fire || reduced) return null
  return <canvas ref={canvasRef} className="champagne-burst" aria-hidden="true" />
}
