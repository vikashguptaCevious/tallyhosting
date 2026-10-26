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

export const DIWALI_SLIDE_INTERVAL_MS = 5000

export const diwaliSlides: DiwaliSlide[] = [
  {
    id: 'dhamaka',
    titleImage: { src: '/diwali/dhamaka-title.webp', alt: 'Diwali Dhamaka' },
    subtitle: {
      text: 'Festive cloud solutions',
      small: 'for modern businesses',
      style: 'centered',
    },
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
  {
    id: 'brighter-70',
    showRibbon: true,
    heading: { lines: ['Make Your', 'Business Brighter', 'This Diwali!'], highlight: [1] },
    subtitle: { text: 'Festive cloud offers for smart businesses', style: 'line' },
    offerImage: { src: '/diwali/offer-70.webp', alt: 'Up to 70% off', aspect: '1400/380', bleed: '5.5%' },
  },
]
