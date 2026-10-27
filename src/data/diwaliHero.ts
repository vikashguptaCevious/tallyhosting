/**
 * Diwali hero — left-side slides (shown when VITE_DIWALI_OFFER=true).
 * Edit text / images here; slides rotate in this order.
 * Every field is optional, so a slide shows only what it defines.
 */
export interface DiwaliSlide {
  id: string
  /** Small golden "Diwali Dhamaka Offers" ribbon on top */
  showRibbon?: boolean
  /** Large title artwork (replaces text heading) */
  titleImage?: { src: string; alt: string }
  /** Text heading — `highlight` line indexes render in purple gradient */
  heading?: { lines: string[]; highlight: number[] }
  /** Subtitle under the heading */
  subtitle?: { text: string; small?: string; style: 'line' | 'centered' }
  /**
   * Offer badge artwork (70% off, ₹299 …).
   * `bleed` = width of the side ornament, so the pill lines up with the text on desktop.
   */
  offerImage?: { src: string; alt: string; aspect: string; bleed?: string }
  /** Struck-through regular price shown under the offer badge */
  regularPrice?: string
  /** Closing line — `highlight` part renders in purple */
  tagline?: { text: string; highlight: string }
}

export const DIWALI_SLIDE_INTERVAL_MS = 3000

export const diwaliSlides: DiwaliSlide[] = [
  {
    id: 'dhamaka',
    titleImage: { src: '/diwali/dhamaka-70-off.webp', alt: 'Diwali Dhamaka — up to 70% off' },
  },
  {
    id: 'cloud-plus-299',
    showRibbon: true,
    heading: { lines: ['Tally on', 'Cloud Plus'], highlight: [1] },
    offerImage: {
      src: '/diwali/offer-299.webp',
      alt: 'Starting from just ₹299',
      aspect: '1400/294',
      bleed: '6%',
    },
    regularPrice: '₹699',
  },
]
