import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs-extra'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Base path for GitHub Pages deployment
  plugins: [
    react(),
    // Custom plugin to ensure data.json is copied to the build output
    {
      name: 'copy-data-json',
      buildEnd: async () => {
        try {
          const srcDataPath = resolve(__dirname, 'src/data.json')
          const distDataPath = resolve(__dirname, 'dist/data.json')
          
          if (fs.existsSync(srcDataPath)) {
            await fs.copy(srcDataPath, distDataPath)
            console.log('✅ data.json copied to dist folder during build')
          } else {
            console.warn('⚠️ src/data.json not found during build')
          }
        } catch (err) {
          console.error('Error copying data.json:', err)
        }
      }
    }
  ],
  build: {
    // Ensure we generate source maps for better debugging
    sourcemap: true,
    // Make sure we don't minify too aggressively for better debugging
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false
      }
    },
    rollupOptions: {
      // Ensure data.json is explicitly included
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
