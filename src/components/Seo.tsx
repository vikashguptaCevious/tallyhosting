import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { WEBSITE_URL } from '../config/env'

export const SITE_NAME = 'TallyHosting'
export const DEFAULT_TITLE = 'TallyHosting - Run Tally On Cloud | Access Anytime, Anywhere'
export const DEFAULT_DESCRIPTION =
  'Secure Tally on Cloud hosting for TallyPrime & ERP 9. Multi-user remote access, automated daily backups, 99.9% uptime and 24/7 expert support.'
export const DEFAULT_OG_IMAGE = '/og-image.png'

type JsonLd = Record<string, unknown>

type SeoProps = {
  /** Page title. The site name is appended unless it is already present. */
  title?: string
  description?: string
  /** Path or absolute URL. Defaults to the current route path. */
  canonicalPath?: string
  /** Path or absolute URL of the social share image. */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noindex?: boolean
  keywords?: string[]
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
  jsonLd?: JsonLd | JsonLd[]
}

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${WEBSITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

/** Search engines show ~155 characters; trim on a word boundary. */
export function toMetaDescription(text: string | null | undefined, max = 160): string {
  const clean = String(text ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ') > 80 ? cut.lastIndexOf(' ') : cut.length)}…`
}

function buildTitle(title?: string): string {
  if (!title) return DEFAULT_TITLE
  return title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? title : `${title} | ${SITE_NAME}`
}

/**
 * index.html ships static fallback tags (marked data-static-seo) for crawlers
 * that do not run JavaScript. Once Helmet takes over, drop them so each page
 * has exactly one title / description / og set.
 */
function useRemoveStaticSeoTags() {
  useEffect(() => {
    document.querySelectorAll('[data-static-seo]').forEach((el) => el.remove())
  }, [])
}

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  noindex = false,
  keywords,
  article,
  jsonLd,
}: SeoProps) {
  useRemoveStaticSeoTags()
  const { pathname } = useLocation()

  const fullTitle = buildTitle(title)
  const metaDescription = toMetaDescription(description)
  const canonical = absoluteUrl(canonicalPath ?? pathname)
  const imageUrl = absoluteUrl(image)
  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt ?? fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt ?? fullTitle} />

      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  )
}
