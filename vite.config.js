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
          // Copy from multiple possible locations to ensure we have data.json
          const srcDataPath = resolve(__dirname, 'src/data.json')
          const publicDataPath = resolve(__dirname, 'public/data.json')
          const distDataPath = resolve(__dirname, 'dist/data.json')
          
          // Try to copy from src first, then from public if src doesn't exist
          if (fs.existsSync(srcDataPath)) {
            await fs.copy(srcDataPath, distDataPath)
            console.log('✅ data.json copied from src to dist folder during build')
          } else if (fs.existsSync(publicDataPath)) {
            await fs.copy(publicDataPath, distDataPath)
            console.log('✅ data.json copied from public to dist folder during build')
          } else {
            console.warn('⚠️ data.json not found in src or public during build')
          }
          
          // Ensure .nojekyll exists in dist folder (critical for GitHub Pages)
          const distNojekyllPath = resolve(__dirname, 'dist/.nojekyll')
          fs.writeFileSync(distNojekyllPath, '')
          console.log('✅ .nojekyll file created in dist folder')
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
