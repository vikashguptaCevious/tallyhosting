import { createServer } from 'node:http'
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createBitrixLeadHandler } from './bitrix-lead.mjs'

const rootDir = resolve(fileURLToPath(new URL('../', import.meta.url)))
const mode = process.env.APP_MODE || process.env.NODE_ENV || 'production'
const distDir = resolve(process.env.DIST_DIR || join(rootDir, 'dist'))
const port = Number(process.env.PORT) || 4173
const host = process.env.HOST || '0.0.0.0'

/**
 * Loads `.env` files without pulling in a dependency, so the deployed box can
 * keep BITRIX_WEBHOOK_URL out of the built bundle.
 */
function loadEnvFiles() {
  for (const file of ['.env', `.env.${mode}`, '.env.local']) {
    const path = join(rootDir, file)
    if (!existsSync(path)) continue

    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const match = /^\s*([\w.-]+)\s*=\s*(.*)$/.exec(line)
      if (!match || line.trim().startsWith('#')) continue
      const [, key, rawValue] = match
      if (process.env[key] !== undefined) continue
      process.env[key] = rawValue.trim().replace(/^["']|["']$/g, '')
    }
  }
}

loadEnvFiles()

const bitrixLead = createBitrixLeadHandler(process.env)

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

/**
 * @param {import('node:http').ServerResponse} res
 * @param {string} filePath
 * @param {boolean} immutable
 */
function sendFile(res, filePath, immutable) {
  res.statusCode = 200
  res.setHeader('Content-Type', MIME_TYPES[extname(filePath).toLowerCase()] || 'application/octet-stream')
  res.setHeader(
    'Cache-Control',
    immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
  )
  createReadStream(filePath).pipe(res)
}

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (url.pathname === '/api/bitrix/lead') {
    void bitrixLead(req, res)
    return
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
    return
  }

  const requestedPath = decodeURIComponent(url.pathname)
  const filePath = join(distDir, normalize(requestedPath).replace(/^(\.\.[/\\])+/, ''))

  if (filePath.startsWith(distDir) && existsSync(filePath) && statSync(filePath).isFile()) {
    sendFile(res, filePath, requestedPath.startsWith('/assets/'))
    return
  }

  // SPA fallback so deep links such as /blog/:slug resolve to the app shell.
  const indexPath = join(distDir, 'index.html')
  if (!existsSync(indexPath)) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(`Build output not found at ${distDir}. Run "npm run build" first.`)
    return
  }

  sendFile(res, indexPath, false)
})

server.listen(port, host, () => {
  console.log(`TallyHosting server running on http://${host}:${port} (mode: ${mode})`)
  console.log(`Serving static files from ${distDir}`)
  if (!process.env.BITRIX_WEBHOOK_URL) {
    console.warn('Warning: BITRIX_WEBHOOK_URL is not set — lead submissions will fail.')
  }
})
