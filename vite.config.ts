import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Connect } from 'vite'
import { createBitrixLeadHandler } from './server/bitrix-lead.mjs'

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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), bitrixLeadApi(env)],
  }
})
