import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
  
export default defineConfig(({ command, mode }) => ({
  plugins: [react(), tailwindcss()], 
  server: {
    port: 5173,
    // import.meta.url is the URL of this configuration file.
    // new URL(...) resolves the certificate path relative to this file.
    // readFileSync reads the certificate/key contents from disk when Vite starts.
    https: command === 'serve' && mode === 'local-https'
      ? {
          key: readFileSync(new URL('./.certs/dev-key.pem', import.meta.url)),
          cert: readFileSync(new URL('./.certs/dev.pem', import.meta.url)),
        }
      : undefined,
    proxy: {
      // frontend calls /api/... -> forwarded to your backend
      '/api': {
        target: 'https://localhost:7278',
        changeOrigin: true,
        secure: false, // dev HTTPS
      },
    },
    open: true // Opens the website automatically once running "npm run dev ..."
  }
}))





