import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/github-contributions': {
        target: 'https://github-contributions.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github-contributions/, '/api/v1'),
      },
    },
  },
})
