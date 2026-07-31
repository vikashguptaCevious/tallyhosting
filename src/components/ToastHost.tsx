import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { subscribeToast, type ToastPayload } from '../lib/toast'

export function ToastHost() {
  const [toast, setToast] = useState<ToastPayload | null>(null)

  useEffect(() => {
    return subscribeToast((next) => {
      setToast(next)
      window.setTimeout(() => {
        setToast((current) => (current?.id === next.id ? null : current))
      }, 3200)
    })
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[10000] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`pointer-events-auto max-w-md rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${
              toast.kind === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
            role="status"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
