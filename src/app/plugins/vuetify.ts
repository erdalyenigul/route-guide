import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'routeDark',
    themes: {
      routeLight: {
        dark: false,
        colors: { background: '#F3F4F6', surface: '#FCFCFD', primary: '#40556C', secondary: '#B9784F', 'on-background': '#20242A', 'on-surface': '#20242A', info: '#647F9E', warning: '#C88742', success: '#567B6D', error: '#B85D55' }
      },
      routeDark: {
        dark: true,
        colors: { background: '#0B0C0F', surface: '#17191E', primary: '#A8B6C8', secondary: '#D4A36D', 'on-background': '#F1F2F4', 'on-surface': '#F1F2F4', info: '#8299B5', warning: '#E2A65D', success: '#7DA993', error: '#E17C76' }
      }
    }
  },
  defaults: {
    VBtn: { rounded: 'xl', elevation: 0 },
    VCard: { rounded: 'xl', elevation: 0 }
  }
})
