import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy':
        'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; media-src 'self' https:;",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router')) return 'vue-vendor'
            if (id.includes('primevue')) return 'primevue-vendor'
            if (id.includes('zod') || id.includes('@vueuse')) return 'utils-vendor'
            return 'vendor'
          }
        },
      },
    },
    commonjsOptions: {
      include: [/primevue/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: [
      'primevue/config',
      'primevue/toastservice',
      'primevue/toast',
      'primevue/usetoast',
      'primevue/inputtext',
      'primevue/button',
      'primevue/dialog',
      'primevue/overlaypanel',
      'primevue/floatlabel',
    ],
  },
})
