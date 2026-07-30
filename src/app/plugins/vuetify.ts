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
        colors: {
          background: '#F3F4F6',
          surface: '#FCFCFD',
          primary: '#40556C',
          secondary: '#B9784F',
          'on-background': '#20242A',
          'on-surface': '#20242A',
          info: '#647F9E',
          warning: '#C88742',
          success: '#567B6D',
          error: '#B85D55'
        }
      },
      routeDark: {
        dark: true,
        colors: {
          background: '#0B0C0F',
          surface: '#17191E',
          primary: '#A8B6C8',
          secondary: '#D4A36D',
          'on-background': '#F1F2F4',
          'on-surface': '#F1F2F4',
          info: '#8299B5',
          warning: '#E2A65D',
          success: '#7DA993',
          error: '#E17C76'
        }
      },
      obsidianLight: {
        dark: false,
        colors: {
          background: '#ECEDEF',
          surface: '#F8F8F9',
          primary: '#293746',
          secondary: '#936E45',
          'on-background': '#15181C',
          'on-surface': '#15181C',
          info: '#536B86',
          warning: '#A66E32',
          success: '#426C5A',
          error: '#A84D4D'
        }
      },
      obsidianDark: {
        dark: true,
        colors: {
          background: '#07080A',
          surface: '#111318',
          primary: '#C2CDDA',
          secondary: '#B58A59',
          'on-background': '#F4F5F7',
          'on-surface': '#F4F5F7',
          info: '#8299B5',
          warning: '#D4A05F',
          success: '#72A38D',
          error: '#E07872'
        }
      },
      woodstockLight: {
        dark: false,
        colors: {
          background: '#F2EFEB',
          surface: '#FCFAF7',
          primary: '#844332',
          secondary: '#A56832',
          'on-background': '#302B28',
          'on-surface': '#302B28',
          info: '#526E73',
          warning: '#A9652D',
          success: '#5F7650',
          error: '#A34A3F'
        }
      },
      woodstockDark: {
        dark: true,
        colors: {
          background: '#17100D',
          surface: '#251A16',
          primary: '#E3A45D',
          secondary: '#C85F42',
          'on-background': '#F7E8D1',
          'on-surface': '#F7E8D1',
          info: '#78A1A0',
          warning: '#E0A04B',
          success: '#8EA66A',
          error: '#E07962'
        }
      },
      nomadLight: {
        dark: false,
        colors: {
          background: '#ECEFEB',
          surface: '#F9FAF7',
          primary: '#476052',
          secondary: '#85634C',
          'on-background': '#272C28',
          'on-surface': '#272C28',
          info: '#5E7675',
          warning: '#95672F',
          success: '#55735B',
          error: '#A05249'
        }
      },
      nomadDark: {
        dark: true,
        colors: {
          background: '#10130F',
          surface: '#1B201A',
          primary: '#A9B99E',
          secondary: '#C18A5D',
          'on-background': '#EDF0E7',
          'on-surface': '#EDF0E7',
          info: '#829A98',
          warning: '#D4A35D',
          success: '#83A27F',
          error: '#D97868'
        }
      }
    }
  },
  defaults: {
    VBtn: { rounded: 'xl', elevation: 0 },
    VCard: { rounded: 'xl', elevation: 0 }
  }
})
