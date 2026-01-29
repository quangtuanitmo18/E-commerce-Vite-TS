import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze'

  return {
    plugins: [
      react(),
      // Safer vendor splitting (avoid circular chunk deps caused by custom granular manualChunks)
      splitVendorChunkPlugin(),
      isAnalyze &&
        visualizer({
          open: true,
          filename: 'stats.html',
          template: 'treemap'
        })
    ].filter(Boolean),
    server: {
      port: 3000
    },
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          // Keep it simple: everything from node_modules goes to one vendor chunk.
          // This reduces initial JS work without introducing circular chunk dependencies.
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
          }
        }
      }
    }
  }
})
