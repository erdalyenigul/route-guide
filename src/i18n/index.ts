import { createI18n } from 'vue-i18n'

import en from './locales/en'
import tr from './locales/tr'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('route-guide:language') ?? 'en',
  fallbackLocale: 'en',
  messages: { en, tr }
})
