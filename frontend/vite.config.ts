import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: [env.VITE_ALLOWED_HOST],
      proxy: {
        '/api': {
          target: 'http://api:5000',
          changeOrigin: true,
          rewrite: p => p.replace(/^\/api/, '')
        }
      }
    }
  }
})