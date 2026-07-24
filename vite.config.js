import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg'],
            manifest: {
                name: 'Route Guide',
                short_name: 'Route Guide',
                description: 'Personal caravan travel companion',
                theme_color: '#1d332b',
                background_color: '#111915',
                display: 'standalone',
                start_url: '/',
                icons: [
                    { src: '/pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
                    { src: '/pwa-512x512.svg', sizes: '512x512', type: 'image/svg+xml' }
                ]
            },
            workbox: {
                navigateFallback: '/index.html',
                globPatterns: ['**/*.{js,css,html,svg,woff2}']
            }
        })
    ],
    resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
    }
});
