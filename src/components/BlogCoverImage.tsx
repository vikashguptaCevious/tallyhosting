import { useState } from 'react'

type BlogCoverImageProps = {
  /** Fully resolved cover URL (from resolveBlogImageUrl) or null when the blog has none. */
  src: string | null
  alt: string
  category?: string
  isSaudi: boolean
  /** Classes for the wrapper; must establish size (e.g. aspect-[16/9]). */
  className?: string
  /** Extra classes for the <img> (e.g. hover zoom). */
  imgClassName?: string
  /**
   * 'contain' fits the whole image inside the fixed-size wrapper over a blurred copy of itself.
   * 'natural' drops the fixed size and shows the image at its own aspect ratio.
   */
  fit?: 'contain' | 'natural'
  /** Load immediately (above-the-fold covers). */
  eager?: boolean
}

function BlogCoverPlaceholder({ category, isSaudi }: { category?: string; isSaudi: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center ${
        isSaudi
          ? 'bg-gradient-to-br from-[#e8f5ec] to-[#bbf7d0] text-[#087a3c]'
          : 'bg-gradient-to-br from-primary-light to-[#ddd6fe] text-primary'
      }`}
      aria-hidden
    >
      <img
        src="/images/tallyhosting-logo.png"
        alt=""
        className={`h-12 w-auto object-contain opacity-90 sm:h-14 ${
          isSaudi ? '[filter:hue-rotate(-125deg)_saturate(1.35)_brightness(0.95)]' : ''
        }`}
      />
      {category?.trim() && (
        <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
          {category.trim()}
        </span>
      )}
    </div>
  )
}

function CoverImg({
  src,
  alt,
  category,
  isSaudi,
  imgClassName = '',
  fit = 'contain',
  eager = false,
}: Omit<BlogCoverImageProps, 'className' | 'src'> & { src: string }) {
  const [imgFailed, setImgFailed] = useState(false)

  if (imgFailed) {
    return fit === 'natural' ? (
      <div className="relative aspect-[16/9] w-full">
        <BlogCoverPlaceholder category={category} isSaudi={isSaudi} />
      </div>
    ) : (
      <BlogCoverPlaceholder category={category} isSaudi={isSaudi} />
    )
  }

  const loadingProps = {
    loading: eager ? ('eager' as const) : ('lazy' as const),
    fetchPriority: eager ? ('high' as const) : undefined,
    decoding: 'async' as const,
    onError: () => setImgFailed(true),
  }

  if (fit === 'natural') {
    return (
      <img src={src} alt={alt} {...loadingProps} className={`block h-auto w-full ${imgClassName}`} />
    )
  }

  return (
    <>
      {/* Blurred copy fills the letterbox space so the full image can be shown without cropping. */}
      <img
        src={src}
        alt=""
        aria-hidden
        loading={loadingProps.loading}
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
      />
      <img
        src={src}
        alt={alt}
        {...loadingProps}
        className={`absolute inset-0 h-full w-full object-contain ${imgClassName}`}
      />
    </>
  )
}

/**
 * Blog cover with a fixed-size wrapper. Falls back to a branded placeholder when the
 * cover is missing or fails to load, so the browser's broken-image icon never shows.
 */
export function BlogCoverImage({
  src,
  alt,
  category,
  isSaudi,
  className = 'aspect-[16/9]',
  imgClassName,
  fit = 'contain',
  eager = false,
}: BlogCoverImageProps) {
  return (
    <div className={`relative overflow-hidden bg-gray-50 ${className}`}>
      {src ? (
        // Keyed by src so imgFailed resets whenever the cover URL changes.
        <CoverImg
          key={src}
          src={src}
          alt={alt}
          category={category}
          isSaudi={isSaudi}
          imgClassName={imgClassName}
          fit={fit}
          eager={eager}
        />
      ) : fit === 'natural' ? (
        <div className="relative aspect-[16/9] w-full">
          <BlogCoverPlaceholder category={category} isSaudi={isSaudi} />
        </div>
      ) : (
        <BlogCoverPlaceholder category={category} isSaudi={isSaudi} />
      )}
    </div>
  )
}
