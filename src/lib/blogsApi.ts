export type TallyHostingBlog = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  contentHtml: string
  category: string
  tags: string[]
  coverImage: string
  author: string
  platform: string
  publishedAt: string
  readTime: string
}

export type BlogListResult = {
  items: TallyHostingBlog[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type LoadBlogsOptions = {
  q?: string
  page?: number
  limit?: number
}

const PLATFORM = 'TALLYHOSTING'
export const BLOG_PAGE_LIMIT = 10

function requireApiBase(): string {
  const API_BASE = String(import.meta.env.VITE_CEVIOUS_API_BASE || '').replace(/\/$/, '')
  if (!API_BASE) {
    throw new Error(
      'VITE_CEVIOUS_API_BASE is not configured. Add it to your .env file (e.g. http://localhost:8081/api/v1) and restart Vite.',
    )
  }
  return API_BASE
}

/** Resolve relative cover images against the Cevious API origin (strip /api/v1). */
export function resolveBlogImageUrl(coverImage: string | null | undefined): string | null {
  if (!coverImage?.trim()) return null
  if (coverImage.startsWith('http://') || coverImage.startsWith('https://')) {
    return coverImage
  }

  const API_BASE = String(import.meta.env.VITE_CEVIOUS_API_BASE || '').replace(/\/$/, '')
  if (!API_BASE) return coverImage

  const apiOrigin = API_BASE.replace(/\/api\/v1\/?$/, '')
  return `${apiOrigin}${coverImage.startsWith('/') ? '' : '/'}${coverImage}`
}

export function formatBlogDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function loadTallyHostingBlogs({
  q = '',
  page = 1,
  limit = BLOG_PAGE_LIMIT,
}: LoadBlogsOptions = {}): Promise<BlogListResult> {
  const API_BASE = requireApiBase()
  const params = new URLSearchParams({
    platform: PLATFORM,
    page: String(page),
    limit: String(limit),
  })
  if (String(q).trim()) params.set('q', String(q).trim())

  const res = await fetch(`${API_BASE}/blogs?${params}`)
  if (!res.ok) throw new Error('Failed to load blogs')
  const data = (await res.json()) as Partial<BlogListResult>

  return {
    items: Array.isArray(data.items) ? data.items : [],
    total: Number(data.total || 0),
    page: Number(data.page || page),
    limit: Number(data.limit || limit),
    totalPages: Math.max(1, Number(data.totalPages || 1)),
  }
}

export async function loadTallyHostingBlogBySlug(
  slug: string,
): Promise<TallyHostingBlog | null> {
  const API_BASE = requireApiBase()
  const res = await fetch(
    `${API_BASE}/blogs/${encodeURIComponent(slug)}?platform=${PLATFORM}`,
  )
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to load blog')
  const data = (await res.json()) as { blog?: TallyHostingBlog }
  return data.blog || null
}
