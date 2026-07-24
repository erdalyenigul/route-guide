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

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).use(i18n).use(vuetify)
await useTripStore(pinia).initialize()
app.mount('#app')
