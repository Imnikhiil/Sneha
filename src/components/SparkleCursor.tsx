import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './SparkleCursor.css'

type SparkleCursorProps = {
  active?: boolean
}

type Particle = {
  x: number
  y: number
  life: number
  max: number
  size: number
  color: string
  vx: number
  vy: number
}

export function SparkleCursor({ active = true }: SparkleCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!active || reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const colors = ['#ffe08a', '#ff7ac8', '#c9a0ff', '#b8f03a', '#ffffff']
    let raf = 0
    let mx = -100
    let my = -100
    let last = 0

    const resize = () => {
      const dpr = devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      const now = performance.now()
      if (now - last < 24) return
      last = now
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 10,
          y: my + (Math.random() - 0.5) * 10,
          life: 0,
          max: 18 + Math.random() * 16,
          size: 1.2 + Math.random() * 2.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.4,
        })
      }
      if (particles.length > 120) particles.splice(0, particles.length - 120)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += 1
        p.x += p.vx
        p.y += p.vy
        const a = 1 - p.life / p.max
        ctx.globalAlpha = a
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        if (p.life >= p.max) particles.splice(i, 1)
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [active, reduced])

  if (!active || reduced) return null

  return <canvas ref={canvasRef} className="sparkle-cursor" aria-hidden="true" />
}
