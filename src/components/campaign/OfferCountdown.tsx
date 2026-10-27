import { useEffect, useState } from 'react'
import { DIWALI_OFFER_ENDS_AT } from '../../data/diwaliCampaign'

const goldText = 'bg-gradient-to-r from-[#ffd56a] via-[#ffb000] to-[#ffd56a] bg-clip-text text-transparent'

function getTimeLeft(target: number) {
  const ms = Math.max(0, target - Date.now())
  return {
    ended: ms === 0,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  }
}

function useCountdown(endsAt: string) {
  const target = new Date(endsAt).getTime()
  const [left, setLeft] = useState(() => getTimeLeft(target))
  useEffect(() => {
    if (left.ended) return
    const id = window.setInterval(() => setLeft(getTimeLeft(target)), 1000)
    return () => window.clearInterval(id)
  }, [target, left.ended])
  return left
}

export function Countdown({ dark = false }: { dark?: boolean }) {
  const left = useCountdown(DIWALI_OFFER_ENDS_AT)
  if (left.ended) return null

  const units = [
    { label: 'Days', value: left.days },
    { label: 'Hours', value: left.hours },
    { label: 'Mins', value: left.minutes },
    { label: 'Secs', value: left.seconds },
  ]

  return (
    <div className="flex flex-col items-center gap-2 lg:items-start">
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] ${
          dark ? 'text-[#ffd56a]' : 'text-[#b8650a]'
        }`}
      >
        Offer ends in
      </p>
      <div className="flex gap-2 sm:gap-3" role="timer" aria-live="off">
        {units.map((u) => (
          <div
            key={u.label}
            className={`flex w-[62px] flex-col items-center rounded-2xl py-2 sm:w-[70px] ${
              dark
                ? 'border border-[#ffd56a]/30 bg-white/10'
                : 'bg-gradient-to-b from-[#2a0f5c] to-[#4b1a8f] shadow-[0_10px_22px_rgba(60,20,130,0.3)]'
            }`}
          >
            <span className={`text-2xl font-extrabold tabular-nums sm:text-[1.7rem] ${goldText}`}>
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/75">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
