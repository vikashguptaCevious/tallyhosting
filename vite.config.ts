import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Connect } from 'vite'
import { createBitrixLeadHandler } from './server/bitrix-lead.mjs'
import { writeSeoFiles } from './server/seo-files.mjs'

function bitrixLeadApi(env: Record<string, string>): Plugin {
  const handler = createBitrixLeadHandler(env)

  const attach = (middlewares: Connect.Server) => {
    middlewares.use('/api/bitrix/lead', (req, res) => {
      void handler(req, res)
    })
  }

  return {
    name: 'bitrix-lead-api',
    configureServer(server) {
      attach(server.middlewares)
    },
    configurePreviewServer(server) {
      attach(server.middlewares)
    },
  }
}

function seoFiles(env: Record<string, string>, mode: string): Plugin {
  let outDir = 'dist'

  return {
    name: 'seo-files',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      await writeSeoFiles({
        outDir,
        siteUrl: env.VITE_WEBSITE_URL,
        apiBase: env.VITE_CEVIOUS_API_BASE,
        mode,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), bitrixLeadApi(env), seoFiles(env, mode)],
  }
})
