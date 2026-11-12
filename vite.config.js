import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icons.svg'],
  manifest: {
    name: "Consumo de APIs",
    short_name: "APIs",
    description: "App de consumo de APIs com React",
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    navigateFallback: '/index.html',
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ url }) => url.origin === 'https://pokeapi.co',
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'pokeapi',
          expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: ({ url }) =>
          url.origin === 'https://raw.githubusercontent.com' ||
          url.hostname.endsWith('media-amazon.com'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'imagens',
          expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 60 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: ({ url }) =>
          ['www.omdbapi.com', 'dragonball-api.com'].includes(url.hostname) ||
          url.hostname.endsWith('mockapi.io'),
        handler: 'NetworkFirst',
        options: {
          cacheName: 'apis',
          networkTimeoutSeconds: 4,
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
          cacheableResponse: { statuses: [0, 200] }
        }
      }
    ]
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
