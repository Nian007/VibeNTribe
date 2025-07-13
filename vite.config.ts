import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Proxy API requests to the backend to avoid CORS issues during development
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your Express server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
