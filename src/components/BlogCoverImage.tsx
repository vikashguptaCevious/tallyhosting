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
}: Omit<BlogCoverImageProps, 'className' | 'src'> & { src: string }) {
  const [imgFailed, setImgFailed] = useState(false)

  if (imgFailed) return <BlogCoverPlaceholder category={category} isSaudi={isSaudi} />

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setImgFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
    />
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
}: BlogCoverImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        // Keyed by src so imgFailed resets whenever the cover URL changes.
        <CoverImg
          key={src}
          src={src}
          alt={alt}
          category={category}
          isSaudi={isSaudi}
          imgClassName={imgClassName}
        />
      ) : (
        <BlogCoverPlaceholder category={category} isSaudi={isSaudi} />
      )}
    </div>
  )
}
