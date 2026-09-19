import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/petcare-hub/', // GitHub Pages base repository path
  server: {
    host: true,
    port: 5173,
    allowedHosts: true
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: true
  }
})
