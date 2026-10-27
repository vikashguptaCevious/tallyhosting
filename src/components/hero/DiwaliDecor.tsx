import { useId } from 'react'
import { motion } from 'framer-motion'

/** Shared Diwali decorations — used by the home Diwali hero and the campaign page. */

/** Hanging festive lantern — gold frame, glowing window, purple tassel */
export function Lantern({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  const uid = useId()
  const gold = `lt-gold${uid}`
  const glow = `lt-glow${uid}`
  return (
    <motion.svg
      viewBox="0 0 60 170"
      aria-hidden
      className={`origin-top drop-shadow-[0_8px_18px_rgba(255,150,30,0.45)] ${className}`}
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <defs>
        <linearGradient id={gold} x1="0" x2="1">
          <stop offset="0" stopColor="#b86b0c" />
          <stop offset=".5" stopColor="#ffd56a" />
          <stop offset="1" stopColor="#b86b0c" />
        </linearGradient>
        <radialGradient id={glow} cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#fff6c9" />
          <stop offset=".45" stopColor="#ffc443" />
          <stop offset="1" stopColor="#f07a12" />
        </radialGradient>
      </defs>
      <line x1="30" y1="0" x2="30" y2="52" stroke="#c98a2a" strokeWidth="1.4" />
      <circle cx="30" cy="52" r="3" fill={`url(#${gold})`} />
      <path d="M18 64 Q30 50 42 64 Z" fill={`url(#${gold})`} />
      <rect x="15" y="63" width="30" height="5" rx="1.5" fill={`url(#${gold})`} />
      <path d="M17 68 H43 L47 98 L43 128 H17 L13 98 Z" fill={`url(#${glow})`} />
      <path
        d="M17 68 H43 L47 98 L43 128 H17 L13 98 Z M30 68 V128 M13 98 H47 M22 68 L20 128 M38 68 L40 128"
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth="2"
      />
      <rect x="15" y="127" width="30" height="5" rx="1.5" fill={`url(#${gold})`} />
      <path d="M21 132 H39 L34 140 H26 Z" fill={`url(#${gold})`} />
      <circle cx="30" cy="142" r="2.6" fill="#ffcf5a" />
      <path d="M26 144 H34 L36 168 H24 Z" fill="#7a1fa2" />
      <path d="M27 146 V166 M30 146 V168 M33 146 V166" stroke="#a23bd1" strokeWidth=".8" />
    </motion.svg>
  )
}

/** Drooping fairy-light garland across the top */
export function StringLights({ className = '' }: { className?: string }) {
  const bulbs = Array.from({ length: 14 }, (_, i) => {
    const t = i / 13
    return { x: 10 + t * 580, y: 6 + Math.sin(t * Math.PI) * 34 }
  })
  return (
    <svg viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden className={className}>
      <path d="M10 6 Q300 74 590 6" fill="none" stroke="#c9a05a" strokeWidth="1.2" opacity=".7" />
      {bulbs.map((b, i) => (
        <g key={i} className="diwali-twinkle" style={{ animationDelay: `${(i % 5) * 0.4}s` }}>
          <circle cx={b.x} cy={b.y + 3} r="7" fill="#ffd36b" opacity=".35" />
          <circle cx={b.x} cy={b.y + 3} r="2.6" fill="#fff3c2" />
        </g>
      ))}
    </svg>
  )
}

/** Soft firework / sparkle burst */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={`diwali-twinkle ${className}`}>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        const r1 = i % 2 ? 18 : 12
        const r2 = i % 2 ? 46 : 36
        return (
          <line
            key={i}
            x1={50 + Math.cos(a) * r1}
            y1={50 + Math.sin(a) * r1}
            x2={50 + Math.cos(a) * r2}
            y2={50 + Math.sin(a) * r2}
            stroke="#f6c453"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="50" cy="50" r="3" fill="#ffe7a3" />
    </svg>
  )
}

const BOKEH = [
  { l: '4%', t: '30%', s: 46, o: 0.5 },
  { l: '10%', t: '68%', s: 28, o: 0.45 },
  { l: '2%', t: '86%', s: 60, o: 0.35 },
  { l: '38%', t: '12%', s: 22, o: 0.5 },
  { l: '47%', t: '78%', s: 36, o: 0.35 },
  { l: '58%', t: '8%', s: 30, o: 0.45 },
  { l: '88%', t: '40%', s: 50, o: 0.45 },
  { l: '94%', t: '70%', s: 34, o: 0.5 },
  { l: '80%', t: '88%', s: 54, o: 0.35 },
  { l: '70%', t: '22%', s: 18, o: 0.55 },
]

export function FestiveBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbff] via-[#f4f0ff] to-[#ece6ff]" />
      <div className="absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[#ffd98a]/25 blur-3xl" />
      <div className="absolute right-[18%] top-[18%] h-[460px] w-[460px] rounded-full bg-[#c7b6ff]/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-[#ffc46b]/20 blur-3xl" />

      {BOKEH.map((b, i) => (
        <span
          key={i}
          className="absolute"
          style={{ left: b.l, top: b.t, width: b.s, height: b.s, opacity: b.o }}
        >
          <span
            className="diwali-twinkle block h-full w-full rounded-full bg-[radial-gradient(circle,#ffe6a8_0%,#ffd27a66_45%,transparent_70%)]"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        </span>
      ))}

      <StringLights className="absolute left-0 top-16 h-12 w-[46%] sm:h-16 lg:top-[72px]" />
      <StringLights className="absolute right-0 top-[72px] hidden h-16 w-[40%] lg:block" />

      <Sparkle className="absolute left-[40%] top-[6%] hidden h-20 w-20 opacity-60 lg:block" />
      <Sparkle className="absolute right-[6%] top-[30%] h-16 w-16 opacity-60 sm:h-24 sm:w-24" />
      <Sparkle className="absolute left-[2%] bottom-[24%] hidden h-14 w-14 opacity-50 sm:block" />

      <Lantern className="absolute left-[1.5%] top-16 h-20 w-7 sm:h-36 sm:w-12 lg:top-[72px] lg:h-44 lg:w-14 lg:max-[1399px]:hidden" />
      <Lantern
        delay={0.8}
        className="absolute left-[7%] top-16 hidden h-24 w-9 sm:block lg:hidden"
      />
      <Lantern
        delay={0.4}
        className="absolute right-[7%] top-16 lg:top-[72px] hidden h-28 w-10 sm:block lg:h-40 lg:w-14"
      />
      <Lantern
        delay={1.2}
        className="absolute right-[1.5%] top-16 lg:top-[72px] h-24 w-8 sm:h-40 sm:w-14 lg:h-52 lg:w-16"
      />
    </div>
  )
}
