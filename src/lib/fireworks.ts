/** Event a mounted <DiwaliFireworks /> listens to */
export const DIWALI_BURST_EVENT = 'diwali:burst'

export type FireworksBurst = {
  /** Rockets to launch */
  rockets?: number
  /** Phuljhari (sparklers) to light along the screen edges */
  sparklers?: number
}

/** Fire a volley on whichever DiwaliFireworks canvas is on the page */
export function burstFireworks(burst: FireworksBurst = { rockets: 3 }) {
  window.dispatchEvent(new CustomEvent<FireworksBurst>(DIWALI_BURST_EVENT, { detail: burst }))
}
