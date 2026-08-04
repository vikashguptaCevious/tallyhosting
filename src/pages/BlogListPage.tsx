import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Search, User } from 'lucide-react'
import {
  BLOG_PAGE_LIMIT,
  formatBlogDate,
  loadTallyHostingBlogs,
  resolveBlogImageUrl,
  type TallyHostingBlog,
} from '../lib/blogsApi'
import { useCountry } from '../context/CountryContext'

function BlogPostCard({
  blog,
  imageOnLeft,
  isSaudi,
}: {
  blog: TallyHostingBlog
  imageOnLeft: boolean
  isSaudi: boolean
}) {
  const cover = resolveBlogImageUrl(blog.coverImage)
  const dateLabel = formatBlogDate(blog.publishedAt)
  const readMoreClass = isSaudi
    ? 'bg-gradient-to-r from-[#0b8a47] to-[#22c55e]'
    : 'bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]'

  const imageBlock = (
    <div className="relative min-h-[180px] overflow-hidden sm:min-h-[200px] lg:min-h-full">
      {cover ? (
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center text-sm font-semibold ${
            isSaudi
              ? 'bg-gradient-to-br from-[#e8f5ec] to-[#bbf7d0] text-[#087a3c]'
              : 'bg-gradient-to-br from-primary-light to-[#ddd6fe] text-primary'
          }`}
        >
          TallyHosting
        </div>
      )}

      {dateLabel && (
        <div className="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm sm:right-3 sm:top-3 sm:text-[11px]">
          <Calendar className="h-3 w-3 opacity-90" aria-hidden />
          {dateLabel}
        </div>
      )}

      <Link
        to={`/blog/${blog.slug}`}
        className={`absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[11px] font-semibold text-white shadow-md transition hover:brightness-110 sm:bottom-3 sm:right-3 sm:text-xs ${readMoreClass}`}
      >
        Read More
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  )

  const textBlock = (
    <div className="flex flex-col justify-center bg-white px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-5">
      {blog.author && (
        <p className="mb-2 flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
            <User className="h-3 w-3 text-gray-500" aria-hidden />
          </span>
          by {blog.author}
        </p>
      )}

      <Link to={`/blog/${blog.slug}`} className="group/title min-w-0">
        <h2
          className={`truncate text-base font-bold leading-snug text-navy transition sm:text-lg lg:text-xl ${
            isSaudi ? 'group-hover/title:text-[#087a3c]' : 'group-hover/title:text-primary'
          }`}
          title={blog.title}
        >
          {blog.title}
        </h2>
      </Link>

      {blog.excerpt && (
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
          {blog.excerpt}
        </p>
      )}

      {blog.category && (
        <div className="mt-3">
          <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-600">
            {blog.category}
          </span>
        </div>
      )}
    </div>
  )

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition hover:shadow-[0_16px_48px_rgba(15,23,42,0.12)]">
      <div
        className={`grid grid-cols-1 lg:min-h-[220px] ${
          imageOnLeft
            ? 'lg:grid-cols-[minmax(220px,34%)_1fr]'
            : 'lg:grid-cols-[1fr_minmax(220px,34%)] lg:[&>*:first-child]:order-2'
        }`}
      >
        {imageBlock}
        {textBlock}
      </div>
    </article>
  )
}

function Pagination({
  page,
  totalPages,
  onChange,
  isSaudi,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
  isSaudi: boolean
}) {
  if (totalPages <= 1) return null

  const btnBase =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40'
  const idle = 'border-gray-200 bg-white text-navy hover:border-primary/30 hover:bg-primary-light'
  const active = isSaudi
    ? 'border-[#087a3c] bg-[#087a3c] text-white'
    : 'border-primary bg-primary text-white'

  const pages: number[] = []
  const windowStart = Math.max(1, page - 2)
  const windowEnd = Math.min(totalPages, windowStart + 4)
  for (let p = Math.max(1, windowEnd - 4); p <= windowEnd; p += 1) pages.push(p)

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
      <button
        type="button"
        className={`${btnBase} ${idle} px-2.5`}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages[0] > 1 && (
        <>
          <button type="button" className={`${btnBase} ${idle}`} onClick={() => onChange(1)}>
            1
          </button>
          {pages[0] > 2 && <span className="px-1 text-gray-400">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`${btnBase} ${p === page ? active : idle}`}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-gray-400">…</span>
          )}
          <button
            type="button"
            className={`${btnBase} ${idle}`}
            onClick={() => onChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        className={`${btnBase} ${idle} px-2.5`}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export function BlogListPage() {
  const { countryId } = useCountry()
  const isSaudi = countryId === 'saudi-arabia'
  const [blogs, setBlogs] = useState<TallyHostingBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim())
      setPage(1)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [query])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await loadTallyHostingBlogs({
          q: debouncedQuery,
          page,
          limit: BLOG_PAGE_LIMIT,
        })
        if (cancelled) return
        setBlogs(result.items)
        setTotal(result.total)
        setTotalPages(Math.max(1, result.totalPages))
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load blogs')
          setBlogs([])
          setTotal(0)
          setTotalPages(1)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [debouncedQuery, page])

  const badgeClass = isSaudi
    ? 'border-[#087a3c]/25 bg-[#e8f5ec] text-[#087a3c]'
    : 'border-primary/25 bg-primary-light text-primary'

  const goToPage = (next: number) => {
    const clamped = Math.max(1, Math.min(totalPages, next))
    setPage(clamped)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <section className="relative overflow-hidden bg-white pt-28 pb-8 sm:pt-32 sm:pb-10">
        <div
          className={`pointer-events-none absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${
            isSaudi ? 'bg-[#087a3c]/8' : 'bg-primary/10'
          }`}
        />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span
            className={`inline-flex rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${badgeClass}`}
          >
            Insights & Updates
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Blogs
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            Insights on Tally, cloud, and enterprise technology.
          </p>

          <label className="relative mx-auto mt-8 block max-w-2xl">
            <span className="sr-only">Search blogs</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts by title, excerpt, or category..."
              className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-navy shadow-sm placeholder:text-gray-400 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
          </label>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {loading && (
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="grid grid-cols-1 lg:min-h-[220px] lg:grid-cols-[minmax(220px,34%)_1fr]">
                  <div className="min-h-[180px] bg-gray-100" />
                  <div className="space-y-3 px-5 py-5">
                    <div className="h-3 w-24 rounded bg-gray-100" />
                    <div className="h-5 w-4/5 rounded bg-gray-100" />
                    <div className="h-3 w-full rounded bg-gray-100" />
                    <div className="h-3 w-5/6 rounded bg-gray-100" />
                    <div className="h-6 w-20 rounded-full bg-gray-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="text-sm font-semibold text-red-700 sm:text-base">{error}</p>
            <p className="mt-2 text-sm text-red-600/80">
              Check that <code className="rounded bg-red-100 px-1.5 py-0.5 text-xs">VITE_CEVIOUS_API_BASE</code> is
              set in your env file and restart Vite.
            </p>
          </div>
        )}

        {!loading && !error && total === 0 && !debouncedQuery && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <p className="text-base font-semibold text-navy sm:text-lg">No blog posts yet.</p>
            <p className="mt-2 text-sm text-gray-500">
              Published posts from Cevious Admin → Blogs → TallyHosting will appear here.
            </p>
          </div>
        )}

        {!loading && !error && total === 0 && !!debouncedQuery && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <p className="text-base font-semibold text-navy sm:text-lg">No matching posts.</p>
            <p className="mt-2 text-sm text-gray-500">Try a different search term.</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <>
            <div className="space-y-6">
              {blogs.map((blog, index) => (
                <BlogPostCard
                  key={blog.id}
                  blog={blog}
                  imageOnLeft={index % 2 === 0}
                  isSaudi={isSaudi}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={goToPage}
              isSaudi={isSaudi}
            />
          </>
        )}
      </section>
    </main>
  )
}
