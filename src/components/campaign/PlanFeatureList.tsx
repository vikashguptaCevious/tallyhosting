import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

/** Features shown before the "Show more" toggle */
const VISIBLE_FEATURES = 6

type Props = {
  features: string[]
  /** Classes for the <ul> — keep `flex-1` so the CTA stays pinned to the card bottom */
  className?: string
  /** Colour classes for the check icon and the toggle */
  accentClass: string
}

export function PlanFeatureList({ features, className = '', accentClass }: Props) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = features.length > VISIBLE_FEATURES
  const shown = expanded ? features : features.slice(0, VISIBLE_FEATURES)

  return (
    <div className={`flex flex-col ${className}`}>
      <ul className="space-y-3">
        {shown.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-600">
            <Check className={`mt-0.5 h-4 w-4 flex-shrink-0 ${accentClass}`} strokeWidth={2.5} />
            {feature}
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold hover:underline ${accentClass}`}
        >
          {expanded ? 'Show less' : `Show ${features.length - VISIBLE_FEATURES} more`}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
            strokeWidth={2.5}
          />
        </button>
      )}
    </div>
  )
}
