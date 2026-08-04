import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Animate on mount instead of waiting for the element to scroll into view */
  immediate?: boolean
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  immediate = false,
}: AnimatedSectionProps) {
  const reveal = { opacity: 1, y: 0 }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      {...(immediate
        ? { animate: reveal }
        : { whileInView: reveal, viewport: { once: true, margin: '-80px' } })}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
