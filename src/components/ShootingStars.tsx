import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './ShootingStars.css'

type ShootingStarsProps = {
  active: boolean
}

export function ShootingStars({ active }: ShootingStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!active || reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const stars: { x: number; y: number; len: number; speed: number; life: number; max: number }[] =
      []

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio
      canvas.height = window.innerHeight * devicePixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      if (Math.random() > 0.97) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight * 0.45,
          len: 60 + Math.random() * 80,
          speed: 8 + Math.random() * 10,
          life: 0,
          max: 28 + Math.random() * 20,
        })
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      spawn()
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.life += 1
        s.x += s.speed
        s.y += s.speed * 0.45
        const alpha = 1 - s.life / s.max
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.len, s.y - s.len * 0.45)
        grad.addColorStop(0, `rgba(240, 217, 181, ${alpha})`)
        grad.addColorStop(1, 'rgba(240, 217, 181, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.len, s.y - s.len * 0.45)
        ctx.stroke()
        if (s.life >= s.max) stars.splice(i, 1)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, reduced])

  if (!active || reduced) return null

  return <canvas ref={canvasRef} className="shooting-stars" aria-hidden="true" />
}
