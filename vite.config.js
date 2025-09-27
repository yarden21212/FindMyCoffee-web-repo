import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
  
export default defineConfig({
  plugins: [react(), tailwindcss()], 
  server: {
    port: 5173,
    proxy: {
      // frontend calls /api/... -> forwarded to your backend
      '/api': {
        target: 'https://localhost:7278',
        changeOrigin: true,
        secure: false, // dev HTTPS
      },
    }
  }
})




