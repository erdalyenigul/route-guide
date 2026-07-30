import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type AppLocale = 'en' | 'tr'
export type ThemePreference = 'light' | 'dark'
export type ThemeStyle = 'default' | 'obsidian' | 'woodstock' | 'nomad'

const LANGUAGE_KEY = 'route-guide:language'
const THEME_KEY = 'route-guide:theme'
const THEME_STYLE_KEY = 'route-guide:theme-style'

function defaultTheme(): ThemePreference {
  return 'dark'
}

function storedThemeStyle(): ThemeStyle {
  const value = localStorage.getItem(THEME_STYLE_KEY)
  return value === 'obsidian' || value === 'woodstock' || value === 'nomad' ? value : 'default'
}

export const usePreferencesStore = defineStore('preferences', () => {
  const language = ref<AppLocale>((localStorage.getItem(LANGUAGE_KEY) as AppLocale | null) ?? 'en')
  const theme = ref<ThemePreference>(
    (localStorage.getItem(THEME_KEY) as ThemePreference | null) ?? defaultTheme()
  )
  const themeStyle = ref<ThemeStyle>(storedThemeStyle())

  watch(language, (value) => localStorage.setItem(LANGUAGE_KEY, value))
  watch(theme, (value) => localStorage.setItem(THEME_KEY, value))
  watch(themeStyle, (value) => localStorage.setItem(THEME_STYLE_KEY, value))

  function toggleTheme(): void {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { language, theme, themeStyle, toggleTheme }
})
