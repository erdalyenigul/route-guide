import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { i18n } from './i18n'
import { router } from './router'
import { vuetify } from './app/plugins/vuetify'
import { useTripStore } from './stores/trip'
import '@mdi/font/css/materialdesignicons.css'
import './assets/styles/main.css'

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((registration) => registration.unregister()))

  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
  }
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  let isRefreshing = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (isRefreshing) return
    isRefreshing = true
    window.location.reload()
  })

  const updateInstalledApp = async (): Promise<void> => {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map((registration) => registration.update()))
  }

  window.addEventListener('load', () => void updateInstalledApp())
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void updateInstalledApp()
  })
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).use(i18n).use(vuetify)
await useTripStore(pinia).initialize()
app.mount('#app')
