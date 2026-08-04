import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import {
  formatBlogDate,
  loadTallyHostingBlogBySlug,
  resolveBlogImageUrl,
  type TallyHostingBlog,
} from '../lib/blogsApi'
import { useCountry } from '../context/CountryContext'

export function BlogDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'
  const [blog, setBlog] = useState<TallyHostingBlog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!slug) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      setNotFound(false)
      setBlog(null)

      try {
        const item = await loadTallyHostingBlogBySlug(slug)
        if (cancelled) return
        if (!item) {
          setNotFound(true)
        } else {
          setBlog(item)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load blog')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [slug])

  const cover = resolveBlogImageUrl(blog?.coverImage)
  const safeHtml = useMemo(() => {
    if (!blog?.contentHtml) return ''
    return DOMPurify.sanitize(blog.contentHtml, {
      USE_PROFILES: { html: true },
    })
  }, [blog?.contentHtml])

  const accent = isSaudi ? 'text-[#087a3c]' : 'text-primary'
  const tagClass = isSaudi
    ? 'bg-[#e8f5ec] text-[#087a3c]'
    : 'bg-primary-light text-primary'

  const displayTags = useMemo(() => {
    if (!blog) return [] as string[]
    const tagSet = new Set<string>()
    for (const tag of blog.tags ?? []) {
      const cleaned = tag.replace(/^#/, '').trim()
      if (cleaned) tagSet.add(cleaned)
    }
    if (blog.category?.trim()) tagSet.add(blog.category.trim())
    return Array.from(tagSet)
  }, [blog])

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-3xl px-4 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-12 lg:px-8">
        <Link
          to="/blog"
          className={`mb-4 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-80 ${accent}`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="aspect-[16/9] rounded-2xl bg-gray-200" />
            <div className="space-y-3 pt-4">
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-5/6 rounded bg-gray-200" />
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="text-sm font-semibold text-red-700 sm:text-base">{error}</p>
            <p className="mt-2 text-sm text-red-600/80">
              Check that <code className="rounded bg-red-100 px-1.5 py-0.5 text-xs">VITE_CEVIOUS_API_BASE</code> is
              set and restart Vite.
            </p>
            <Link to="/blog" className={`mt-6 inline-flex text-sm font-semibold ${accent}`}>
              ← Back to Blog
            </Link>
          </div>
        )}

        {!loading && notFound && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
            <p className="text-base font-semibold text-navy sm:text-lg">Blog post not found.</p>
            <p className="mt-2 text-sm text-gray-500">
              This post may be unpublished or belongs to a different platform.
            </p>
            <Link to="/blog" className={`mt-6 inline-flex text-sm font-semibold ${accent}`}>
              ← Back to Blog
            </Link>
          </div>
        )}

        {!loading && !error && blog && (
          <>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
              {blog.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              {blog.author && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                    <User className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  by {blog.author}
                </span>
              )}
              {blog.publishedAt && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" aria-hidden />
                  {formatBlogDate(blog.publishedAt)}
                </span>
              )}
              {blog.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden />
                  {blog.readTime}
                </span>
              )}
            </div>

            {cover && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
                <img src={cover} alt="" className="aspect-[16/9] w-full object-cover" />
              </div>
            )}

            {displayTags.length > 0 && (
              <div className={`flex flex-wrap gap-2 ${cover ? 'mt-4' : 'mt-6'}`}>
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tagClass}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {safeHtml ? (
              <div
                className="blog-prose mt-6 text-[15px] leading-relaxed text-gray-700 sm:text-base"
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />
            ) : blog.content ? (
              <div className="blog-prose mt-6 whitespace-pre-wrap text-[15px] leading-relaxed text-gray-700 sm:text-base">
                {blog.content}
              </div>
            ) : null}
          </>
        )}
      </article>
    </main>
  )
}
