<script setup lang="ts">
import { computed, watch } from 'vue'
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
const routeId = computed(() => trip.activeTrip?.id ?? 'active')
const navItems = computed(() => [
  { key: 'map', icon: 'mdi-map-outline', to: `/trips/${routeId.value}/map` },
  { key: 'route', icon: 'mdi-road-variant', to: '/' },
  { key: 'stops', icon: 'mdi-map-marker-outline', to: `/trips/${routeId.value}/stops` },
  { key: 'gallery', icon: 'mdi-image-multiple-outline', to: `/trips/${routeId.value}/gallery` },
  { key: 'settings', icon: 'mdi-cog-outline', to: '/settings' }
])

watch(() => preferences.theme, value => { theme.global.name.value = value === 'dark' ? 'routeDark' : 'routeLight' }, { immediate: true })
watch(() => preferences.language, value => { locale.value = value; document.documentElement.lang = value }, { immediate: true })
watch([() => route.meta.titleKey, () => preferences.language], ([key]) => { document.title = `${t(String(key ?? 'app.name'))} · ${t('app.name')}` }, { immediate: true })
</script>

<template>
  <v-app>
    <AppHeader />
    <v-main>
      <div class="app-content"><router-view v-slot="{ Component }"><transition name="page" mode="out-in"><component :is="Component" /></transition></router-view></div>
    </v-main>
    <nav v-if="!route.meta.hideNavigation" class="mobile-nav" :aria-label="t('app.name')">
      <v-btn v-for="item in navItems" :key="item.key" :to="item.to" :value="item.key"><v-icon :icon="item.icon" /><span>{{ t(`nav.${item.key}`) }}</span></v-btn>
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
        <v-btn v-if="trip.stateSyncError === 'auth'" color="primary" variant="text" to="/manage/login" @click="trip.clearStateSyncError()">{{ t('sync.signIn') }}</v-btn>
        <v-btn icon="mdi-close" variant="text" :aria-label="t('common.close')" @click="trip.clearStateSyncError()" />
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped>
.app-content{width:100%;min-height:calc(100dvh - 64px);padding-bottom:calc(96px + env(safe-area-inset-bottom));background:transparent}
.mobile-nav{position:fixed;z-index:1005;right:0;bottom:0;left:0;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr));width:100%;padding:6px 8px calc(6px + env(safe-area-inset-bottom));border-top:1px solid rgba(var(--v-border-color),.1);background:rgba(var(--v-theme-surface),.9)!important;box-shadow:0 -14px 42px rgba(0,0,0,.14)!important;backdrop-filter:blur(24px) saturate(140%)}.mobile-nav .v-btn{width:100%;min-width:0!important;height:66px!important;border-radius:18px!important;color:rgba(var(--v-theme-on-surface),.62)}.mobile-nav .v-btn :deep(.v-btn__content){flex-direction:column;gap:4px}.mobile-nav .v-btn .v-icon{font-size:1.45rem}.mobile-nav .v-btn span{font-size:.77rem;font-weight:700}.mobile-nav .v-btn.v-btn--active{color:rgb(var(--v-theme-primary));background:rgba(var(--v-theme-primary),.11)}
.page-enter-active,.page-leave-active{transition:opacity .16s ease,transform .16s ease}.page-enter-from{opacity:0;transform:translateY(3px)}.page-leave-to{opacity:0}
@media(min-width:960px){.app-content{padding-bottom:108px}.mobile-nav{bottom:16px;width:min(760px,calc(100% - 40px));margin-inline:auto;padding:6px;border:1px solid rgba(var(--v-border-color),.13);border-radius:24px!important;box-shadow:var(--app-shadow-float)!important}.mobile-nav .v-btn{height:62px!important}.mobile-nav .v-btn :deep(.v-btn__content){flex-direction:row;gap:9px}}
.mobile-nav .v-btn span{font-size:.84rem}
</style>
