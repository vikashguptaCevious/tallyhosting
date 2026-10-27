import { useEffect, useRef } from 'react'
import { DIWALI_BURST_EVENT, type FireworksBurst } from '../../lib/fireworks'

/**
 * Canvas fireworks + phuljhari (sparkler) for the Diwali hero.
 * Big show on page open, then an occasional ambient burst.
 * Pauses while off-screen / tab hidden; disabled for reduced motion.
 */

type Particle = {
  x: number
  y: number
  px: number
  py: number
  vx: number
  vy: number
  life: number
  max: number
  color: string
  width: number
  gravity: number
  drag: number
  rocket?: { targetY: number; palette: string[] }
}

type Sparkler = { fx: number; fy: number; until: number }

const PALETTES = [
  ['#ffb000', '#ff7a00', '#f59e0b'],
  ['#c026d3', '#d946ef', '#ffb000'],
  ['#7c3aed', '#9333ea', '#f59e0b'],
  ['#e11d48', '#f97316', '#eab308'],
  ['#db2777', '#ec4899', '#f59e0b'],
]
const SPARKLER_COLORS = ['#ffb000', '#f59e0b', '#ff7a00', '#facc15', '#ff9f1c']

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export function DiwaliFireworks({
  className = '',
  ambientSparklers = false,
}: {
  className?: string
  /** Keep lighting phuljhari along the edges after the opening show (page-wide canvas) */
  ambientSparklers?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let particles: Particle[] = []
    let sparklers: Sparkler[] = []
    let raf = 0
    let visible = true
    const timers: number[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Bursts stay to the sides / top so the copy stays readable
    const burstX = () => (Math.random() < 0.5 ? rand(0.04, 0.32) : rand(0.6, 0.96)) * w
    const small = () => w < 640

    const launch = (x = burstX()) => {
      particles.push({
        x,
        y: h,
        px: x,
        py: h,
        vx: rand(-0.6, 0.6),
        vy: -rand(h * 0.016, h * 0.02) - 4,
        life: 0,
        max: 120,
        color: '#ffcf5a',
        width: 2.2,
        gravity: 0.09,
        drag: 0.995,
        rocket: { targetY: rand(0.1, 0.42) * h, palette: pick(PALETTES) },
      })
      start()
    }

    const explode = (x: number, y: number, palette: string[]) => {
      const count = small() ? 56 : 96
      const power = small() ? 3.8 : 5.4
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + rand(-0.05, 0.05)
        const s = rand(power * 0.45, power)
        particles.push({
          x,
          y,
          px: x,
          py: y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 0,
          max: rand(70, 105),
          color: pick(palette),
          width: rand(2, 3.2),
          gravity: 0.045,
          drag: 0.975,
        })
      }
    }

    const sparkle = (s: Sparkler) => {
      const fx = s.fx * w
      const fy = s.fy * h
      for (let i = 0; i < 12; i++) {
        const a = rand(0, Math.PI * 2)
        const sp = rand(1.5, 5.5)
        particles.push({
          x: fx,
          y: fy,
          px: fx,
          py: fy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: rand(14, 30),
          color: pick(SPARKLER_COLORS),
          width: rand(1.2, 2.2),
          gravity: 0.06,
          drag: 0.94,
        })
      }
    }

    const frame = () => {
      raf = 0
      const now = performance.now()

      // Fade previous frame → light trails on a transparent canvas
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.2)'
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      sparklers = sparklers.filter((s) => s.until > now)
      for (const s of sparklers) {
        sparkle(s)
        const gx = s.fx * w
        const gy = s.fy * h
        const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 16)
        glow.addColorStop(0, 'rgba(255,255,240,1)')
        glow.addColorStop(0.35, 'rgba(255,200,60,0.8)')
        glow.addColorStop(1, 'rgba(255,160,0,0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(gx, gy, 16, 0, Math.PI * 2)
        ctx.fill()
      }

      const next: Particle[] = []
      for (const p of particles) {
        p.px = p.x
        p.py = p.y
        p.vx *= p.drag
        p.vy = p.vy * p.drag + p.gravity
        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.rocket) {
          if (p.y <= p.rocket.targetY || p.vy >= -0.5) {
            explode(p.x, p.y, p.rocket.palette)
            continue
          }
        } else if (p.life >= p.max) {
          continue
        }

        const alpha = p.rocket ? 1 : 1 - p.life / p.max
        ctx.globalAlpha = alpha
        ctx.strokeStyle = p.color
        ctx.lineWidth = p.width
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(p.px, p.py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.width * 0.9, 0, Math.PI * 2)
        ctx.fill()
        next.push(p)
      }
      ctx.globalAlpha = 1
      particles = next

      if (particles.length || sparklers.length) start()
      else ctx.clearRect(0, 0, w, h)
    }

    function start() {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
    }

    const later = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms))
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Opening show — phuljhari on both sides + a volley of fireworks
    const t0 = performance.now()
    sparklers = [
      { fx: 0.43, fy: 0.12, until: t0 + 6500 },
      { fx: 0.9, fy: 0.3, until: t0 + 6000 },
    ]
    if (!small()) sparklers.push({ fx: 0.03, fy: 0.72, until: t0 + 5500 })
    ;[200, 500, 900, 900, 1400, 1900, 1900, 2500, 3100, 3100, 3800, 4600, 5400].forEach((ms) =>
      later(ms, () => launch()),
    )
    start()

    // Gentle ambient bursts afterwards
    // Phuljhari near a side edge so it never sits on top of the copy
    const lightSparkler = (ms = rand(2500, 4000)) => {
      const left = Math.random() < 0.5
      sparklers.push({
        fx: left ? rand(0.02, 0.12) : rand(0.88, 0.98),
        fy: rand(0.2, 0.85),
        until: performance.now() + ms,
      })
      start()
    }

    const ambient = () => {
      if (visible && !document.hidden) {
        launch()
        if (ambientSparklers && Math.random() < 0.7) lightSparkler()
      }
      later(rand(3000, 5000), ambient)
    }
    later(6500, ambient)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(canvas)
    const onVisibility = () => start()
    document.addEventListener('visibilitychange', onVisibility)

    // On-demand volleys (scroll reveals, plan clicks …) via burstFireworks()
    const onBurst = (e: Event) => {
      const { rockets = 0, sparklers: lit = 0 } = (e as CustomEvent<FireworksBurst>).detail ?? {}
      for (let i = 0; i < rockets; i++) later(i * 220, () => launch())
      for (let i = 0; i < lit; i++) later(i * 300, () => lightSparkler())
    }
    window.addEventListener(DIWALI_BURST_EVENT, onBurst)

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach((t) => window.clearTimeout(t))
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener(DIWALI_BURST_EVENT, onBurst)
    }
  }, [ambientSparklers])

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none ${className}`} />
}
