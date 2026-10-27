import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { subscribeThankYou, type ThankYouPayload } from '../lib/thankYou'

/** Site-wide "Thank you" dialog, opened via showThankYou() after any successful form submit */
export function ThankYouHost() {
  const [payload, setPayload] = useState<ThankYouPayload | null>(null)
  const doneRef = useRef<HTMLButtonElement>(null)

  useEffect(() => subscribeThankYou(setPayload), [])

  useEffect(() => {
    if (!payload) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPayload(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    doneRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [payload])

  const close = () => setPayload(null)

  return (
    <AnimatePresence>
      {payload && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={close}
            aria-label="Close dialog"
          />

          <motion.div
            key={payload.id}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="thank-you-title"
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-b from-primary-light to-white px-6 pb-2 pt-9">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-[0_12px_30px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]"
              >
                <Check className="h-10 w-10 text-white" strokeWidth={3} />
              </motion.div>
            </div>

            <div className="px-6 pb-7 pt-4 sm:px-8">
              <h2 id="thank-you-title" className="text-2xl font-extrabold text-navy">
                {payload.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                {payload.message}
              </p>

              {payload.details && payload.details.length > 0 && (
                <dl className="mt-5 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-gray-50 text-left text-sm">
                  {payload.details.map((d) => (
                    <div key={d.label} className="flex justify-between gap-4 px-4 py-2.5">
                      <dt className="text-gray-500">{d.label}</dt>
                      <dd className="text-right font-semibold text-navy">{d.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <button
                ref={doneRef}
                type="button"
                onClick={close}
                className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
