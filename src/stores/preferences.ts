import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type AppLocale = 'en' | 'tr'
export type ThemePreference = 'light' | 'dark'

const LANGUAGE_KEY = 'route-guide:language'
const THEME_KEY = 'route-guide:theme'

function defaultTheme(): ThemePreference {
  return 'dark'
}

export const usePreferencesStore = defineStore('preferences', () => {
  const language = ref<AppLocale>((localStorage.getItem(LANGUAGE_KEY) as AppLocale | null) ?? 'en')
  const theme = ref<ThemePreference>((localStorage.getItem(THEME_KEY) as ThemePreference | null) ?? defaultTheme())

  watch(language, (value) => localStorage.setItem(LANGUAGE_KEY, value))
  watch(theme, (value) => localStorage.setItem(THEME_KEY, value))

  function toggleTheme(): void {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { language, theme, toggleTheme }
})
