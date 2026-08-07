<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'

import AppHeader from '@/components/layout/AppHeader.vue'
import { usePreferencesStore } from '@/stores/preferences'
import { useTripStore } from '@/stores/trip'

const route = useRoute()
const { t, locale } = useI18n()
const theme = useTheme()
const preferences = usePreferencesStore()
const trip = useTripStore()
const introVisible = ref(true)
const routeId = computed(() => trip.activeTrip?.id ?? 'active')
const navItems = computed(() => [
  { key: 'map', icon: 'mdi-map-outline', to: `/trips/${routeId.value}/map` },
  { key: 'route', icon: 'mdi-road-variant', to: '/' },
  { key: 'stops', icon: 'mdi-map-marker-outline', to: `/trips/${routeId.value}/stops` },
  { key: 'gallery', icon: 'mdi-image-multiple-outline', to: `/trips/${routeId.value}/gallery` },
  { key: 'settings', icon: 'mdi-cog-outline', to: '/settings' }
])

const vuetifyThemeNames = {
  default: { light: 'routeLight', dark: 'routeDark' },
  obsidian: { light: 'obsidianLight', dark: 'obsidianDark' },
  woodstock: { light: 'woodstockLight', dark: 'woodstockDark' },
  nomad: { light: 'nomadLight', dark: 'nomadDark' }
} as const

watch(
  [() => preferences.theme, () => preferences.themeStyle],
  ([mode, style]) => {
    theme.change(vuetifyThemeNames[style][mode])
    document.documentElement.dataset.themeStyle = style
    document.documentElement.dataset.colorMode = mode
  },
  { immediate: true }
)
watch(
  () => preferences.language,
  (value) => {
    locale.value = value
    document.documentElement.lang = value
  },
  { immediate: true }
)
watch(
  [() => route.meta.titleKey, () => preferences.language],
  ([key]) => {
    document.title = `${t(String(key ?? 'app.name'))} · ${t('app.name')}`
  },
  { immediate: true }
)
</script>

<template>
  <v-app>
    <div
      v-if="introVisible"
      class="intro-screen"
    >
      <v-btn
        class="intro-entry"
        color="primary"
        size="large"
        @click="introVisible = false"
      >
        {{ t('intro.enter') }}
      </v-btn>
      <img
        src="/route-intro.jpg"
        alt=""
      />
    </div>
    <template v-else>
      <AppHeader @show-intro="introVisible = true" />
      <v-main>
        <div class="app-content">
          <router-view v-slot="{ Component }"
            ><transition
              name="page"
              mode="out-in"
              ><component :is="Component" /></transition
          ></router-view>
        </div>
      </v-main>
      <nav
        v-if="!route.meta.hideNavigation"
        class="mobile-nav"
        :aria-label="t('app.name')"
      >
        <v-btn
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          :value="item.key"
          ><v-icon :icon="item.icon" /><span>{{ t(`nav.${item.key}`) }}</span></v-btn
        >
      </nav>
      <v-snackbar
        :model-value="Boolean(trip.stateSyncError)"
        location="top"
        color="surface"
        :timeout="-1"
        @update:model-value="!$event && trip.clearStateSyncError()"
      >
        {{ t(trip.stateSyncError === 'auth' ? 'sync.authRequired' : 'sync.saveError') }}
        <template #actions>
          <v-btn
            v-if="trip.stateSyncError === 'auth'"
            color="primary"
            variant="text"
            to="/manage/login"
            @click="trip.clearStateSyncError()"
            >{{ t('sync.signIn') }}</v-btn
          >
          <v-btn
            icon="mdi-close"
            variant="text"
            :aria-label="t('common.close')"
            @click="trip.clearStateSyncError()"
          />
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<style scoped>
.intro-screen {
  position: fixed;
  z-index: 10000;
  inset: 0;
  display: grid;
  width: 100%;
  height: 100dvh;
  padding: 16px;
  place-items: center;
  background: #050706;
}
.intro-entry {
  position: absolute;
  z-index: 1;
  top: calc(18px + env(safe-area-inset-top));
  right: 18px;
}
.intro-screen img {
  display: block;
  width: auto;
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  height: auto;
  object-fit: contain;
}
.app-content {
  width: 100%;
  min-height: calc(100dvh - 64px);
  padding-bottom: calc(96px + env(safe-area-inset-bottom));
  background: transparent;
}
.mobile-nav {
  position: fixed;
  z-index: 1005;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
  padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
  border-top: 1px solid rgba(var(--v-border-color), 0.1);
  background: rgba(var(--v-theme-surface), 0.9) !important;
  box-shadow: 0 -14px 42px rgba(0, 0, 0, 0.14) !important;
  backdrop-filter: blur(24px) saturate(140%);
}
.mobile-nav .v-btn {
  width: 100%;
  min-width: 0 !important;
  height: 66px !important;
  border-radius: 18px !important;
  color: rgba(var(--v-theme-on-surface), 0.62);
  transition:
    color 0.18s ease,
    background 0.18s ease,
    transform 0.14s ease !important;
}
.mobile-nav .v-btn :deep(.v-btn__content) {
  flex-direction: column;
  gap: 4px;
}
.mobile-nav .v-btn .v-icon {
  font-size: 1.45rem;
  transition: transform 0.18s ease;
}
.mobile-nav .v-btn span {
  font-size: 0.77rem;
  font-weight: 700;
}
.mobile-nav .v-btn.v-btn--active {
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.11);
}
.mobile-nav .v-btn.v-btn--active .v-icon {
  transform: translateY(-1px) scale(1.06);
}
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 0.8, 0.28, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(7px) scale(0.995);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-2px);
}
@media (min-width: 960px) {
  .app-content {
    padding-bottom: 108px;
  }
  .mobile-nav {
    bottom: 16px;
    width: min(760px, calc(100% - 40px));
    margin-inline: auto;
    padding: 6px;
    border: 1px solid rgba(var(--v-border-color), 0.13);
    border-radius: 24px !important;
    box-shadow: var(--app-shadow-float) !important;
  }
  .mobile-nav .v-btn {
    height: 62px !important;
  }
  .mobile-nav .v-btn :deep(.v-btn__content) {
    flex-direction: row;
    gap: 9px;
  }
}
.mobile-nav .v-btn span {
  font-size: 0.84rem;
}
</style>
