import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/request-demo', changefreq: 'yearly', priority: '0.6' },
  { path: '/diwali-dhamaka-compaign', changefreq: 'weekly', priority: '0.7' },
]

const PAGE_LIMIT = 50
const MAX_PAGES = 50

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function fetchAllBlogs(apiBase) {
  const blogs = []
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const params = new URLSearchParams({
      platform: 'TALLYHOSTING',
      page: String(page),
      limit: String(PAGE_LIMIT),
    })
    const res = await fetch(`${apiBase}/blogs?${params}`, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const items = Array.isArray(data.items) ? data.items : []
    blogs.push(...items)
    if (page >= Number(data.totalPages || 1) || items.length === 0) break
  }
  return blogs
}

/**
 * Writes sitemap.xml and robots.txt into the build output. Blog URLs come from the
 * Cevious API; if it is unreachable the sitemap still lists the static routes.
 */
export async function writeSeoFiles({ outDir, siteUrl, apiBase, mode }) {
  const origin = String(siteUrl || '').replace(/\/+$/, '')
  if (!origin) {
    console.warn('[seo-files] VITE_WEBSITE_URL missing; skipping sitemap.xml/robots.txt')
    return
  }

  const urls = STATIC_ROUTES.map((r) => ({ loc: `${origin}${r.path}`, ...r }))

  const base = String(apiBase || '').replace(/\/+$/, '')
  if (base) {
    try {
      const blogs = await fetchAllBlogs(base)
      for (const blog of blogs) {
        if (!blog?.slug) continue
        urls.push({
          loc: `${origin}/blog/${encodeURIComponent(blog.slug)}`,
          lastmod: blog.updatedAt || blog.publishedAt,
          changefreq: 'monthly',
          priority: '0.7',
        })
      }
      console.log(`[seo-files] sitemap: ${blogs.length} blog post(s) added`)
    } catch (err) {
      console.warn(`[seo-files] could not load blogs for sitemap (${err.message}); static routes only`)
    }
  }

  const body = urls
    .map((u) => {
      const lastmod = u.lastmod && !Number.isNaN(Date.parse(u.lastmod))
        ? `\n    <lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>`
        : ''
      return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>${lastmod}\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

  // Only production should be crawled; UAT/dev builds block all bots.
  const robots =
    mode === 'production'
      ? `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n'

  await mkdir(outDir, { recursive: true })
  await writeFile(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8')
  await writeFile(path.join(outDir, 'robots.txt'), robots, 'utf8')
}
