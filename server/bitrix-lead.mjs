/**
 * Local-dev only: proxies POST /api/bitrix/lead → Bitrix crm.lead.add.json
 * Production: nginx proxies /api/bitrix/lead to Bitrix (no Node/PM2).
 */

/** @param {import('node:http').IncomingMessage} req */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

/** @param {Record<string, string | undefined>} env */
export function createBitrixLeadHandler(env) {
  const webhookUrl = env.BITRIX_WEBHOOK_URL?.replace(/\/$/, '')

  /**
   * @param {import('node:http').IncomingMessage} req
   * @param {import('node:http').ServerResponse} res
   */
  return async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }

    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }

    if (!webhookUrl) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'BITRIX_WEBHOOK_URL is not configured in .env' }))
      return
    }

    try {
      const rawBody = await readBody(req)

      const bitrixResponse = await fetch(`${webhookUrl}/crm.lead.add.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: rawBody,
      })

      const text = await bitrixResponse.text()
      res.statusCode = bitrixResponse.status
      res.setHeader('Content-Type', 'application/json')
      res.end(text)
    } catch (error) {
      console.error('Bitrix lead proxy error:', error)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'Unexpected server error',
        }),
      )
    }
  }
}
