export type ThankYouPayload = {
  id: number
  title: string
  message: string
  /** Optional label → value rows shown under the message (plan, mobile …) */
  details?: Array<{ label: string; value: string }>
}

type Listener = (payload: ThankYouPayload) => void

let listener: Listener | null = null
let seq = 0

export function subscribeThankYou(next: Listener | null) {
  listener = next
  return () => {
    if (listener === next) listener = null
  }
}

/** Opens the site-wide "Thank you" dialog — call it after any form submits successfully */
export function showThankYou(payload: Omit<ThankYouPayload, 'id'>) {
  listener?.({ id: ++seq, ...payload })
}
