<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

import { adminContentService } from '@/domains/admin/services/adminContentService'
import type { AdminUser } from '@/domains/admin/types'
import { usePreferencesStore } from '@/stores/preferences'
import { useTripStore } from '@/stores/trip'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const theme = useTheme()
const preferences = usePreferencesStore()
const trip = useTripStore()
const isOnline = ref(navigator.onLine)
const adminUser = ref<AdminUser | null>(null)
const routeId = computed(() => trip.activeTrip?.id ?? 'active')
const logoUrl = computed(() => preferences.theme === 'dark' ? '/logo-dark.png' : '/logo-light.png')
const adminInitial = computed(() => adminUser.value?.displayName.trim().charAt(0).toLocaleUpperCase(preferences.language) ?? '')
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
watch(() => route.fullPath, async () => {
  try {
    adminUser.value = await adminContentService.currentUser()
  } catch {
    adminUser.value = null
  }
}, { immediate: true })
function updateOnlineStatus(): void { isOnline.value = navigator.onLine }
async function signOutAdmin(): Promise<void> {
  await adminContentService.signOut()
  adminUser.value = null
  if (route.path.startsWith('/manage')) await router.replace({ name: 'admin-login' })
}
async function openAdminPanel(): Promise<void> {
  await router.push({ name: 'admin-dashboard' })
}
onMounted(() => { window.addEventListener('online', updateOnlineStatus); window.addEventListener('offline', updateOnlineStatus) })
onUnmounted(() => { window.removeEventListener('online', updateOnlineStatus); window.removeEventListener('offline', updateOnlineStatus) })
</script>

<template>
  <v-app>
    <v-app-bar class="app-bar" flat height="64">
      <router-link class="app-brand" to="/" :aria-label="t('app.name')"><img :src="logoUrl" :alt="t('app.name')" /></router-link>
      <template #append>
        <span v-if="!isOnline" class="sync-state"><i />{{ t('offline.status') }}</span>
        <v-tooltip v-if="!adminUser" :text="t('admin.loginTitle')" location="bottom">
          <template #activator="{ props }">
            <v-btn v-bind="props" class="admin-entry" icon="mdi-account-lock-outline" to="/manage/login" :aria-label="t('admin.loginTitle')" />
          </template>
        </v-tooltip>
        <v-menu v-else location="bottom end">
          <template #activator="{ props }">
            <v-btn v-bind="props" class="admin-avatar" icon :aria-label="t('admin.accountMenu')">
              <span>{{ adminInitial }}</span>
            </v-btn>
          </template>
          <v-card class="admin-menu" min-width="220">
            <v-list>
              <v-list-item
                prepend-icon="mdi-account-circle-outline"
                append-icon="mdi-chevron-right"
                :title="adminUser.displayName"
                :subtitle="adminUser.username"
                class="admin-profile-link"
                link
                @click="openAdminPanel"
              />
            </v-list>
            <v-divider />
            <v-card-actions>
              <v-btn block color="error" variant="text" prepend-icon="mdi-logout" @click="signOutAdmin">{{ t('admin.signOut') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main>
      <div class="app-content"><router-view v-slot="{ Component }"><transition name="page" mode="out-in"><component :is="Component" /></transition></router-view></div>
    </v-main>
    <v-bottom-navigation v-if="!route.meta.hideNavigation" class="mobile-nav" grow height="82">
      <v-btn v-for="item in navItems" :key="item.key" :to="item.to" :value="item.key"><v-icon :icon="item.icon" /><span>{{ t(`nav.${item.key}`) }}</span></v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style scoped>
.app-bar{border-bottom:1px solid rgba(var(--v-border-color),.1)!important;background:rgba(var(--v-theme-surface),.82)!important;box-shadow:0 8px 30px rgba(0,0,0,.08)!important;backdrop-filter:blur(24px) saturate(140%)}
.app-bar :deep(.v-toolbar__content){width:100%}
.app-brand{display:flex;align-items:center;width:146px;height:52px;margin-left:24px;overflow:hidden;border-radius:10px;text-decoration:none}.app-brand img{display:block;width:100%;height:100%;object-fit:contain}
.sync-state{display:flex;align-items:center;gap:8px;max-width:240px;margin-right:22px;color:rgba(var(--v-theme-on-surface),.64);font-size:.8rem;font-weight:620;text-transform:capitalize;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sync-state i{width:8px;height:8px;border-radius:50%;background:rgb(var(--v-theme-warning));box-shadow:0 0 0 4px rgba(var(--v-theme-warning),.12)}
.admin-entry,.admin-avatar{margin-right:max(14px,env(safe-area-inset-right));border:1px solid rgba(var(--v-border-color),.12);background:rgba(var(--v-theme-on-surface),.055)!important}.admin-avatar span{display:grid;width:34px;height:34px;place-items:center;border-radius:50%;color:rgb(var(--v-theme-on-primary));background:rgb(var(--v-theme-primary));font-size:.88rem;font-weight:800}.admin-menu{margin-top:8px;border:1px solid rgba(var(--v-border-color),.12);border-radius:18px!important;box-shadow:var(--app-shadow-float)}.admin-profile-link{cursor:pointer}
.app-content{width:100%;min-height:calc(100dvh - 64px);background:transparent}
.mobile-nav{display:flex!important;left:0!important;width:100%!important;padding:6px 8px calc(6px + env(safe-area-inset-bottom));height:calc(82px + env(safe-area-inset-bottom))!important;border-top:1px solid rgba(var(--v-border-color),.1);background:rgba(var(--v-theme-surface),.9)!important;box-shadow:0 -14px 42px rgba(0,0,0,.14)!important;backdrop-filter:blur(24px) saturate(140%)}.mobile-nav .v-btn{min-width:0!important;min-height:66px;border-radius:18px!important;color:rgba(var(--v-theme-on-surface),.62)}.mobile-nav .v-btn .v-icon{font-size:1.45rem}.mobile-nav .v-btn span{font-size:.77rem;font-weight:700}.mobile-nav .v-btn.v-btn--active{color:rgb(var(--v-theme-primary));background:rgba(var(--v-theme-primary),.11)}
.page-enter-active,.page-leave-active{transition:opacity .16s ease,transform .16s ease}.page-enter-from{opacity:0;transform:translateY(3px)}.page-leave-to{opacity:0}
@media(min-width:960px){.mobile-nav{left:50%!important;bottom:16px!important;width:min(760px,calc(100% - 40px))!important;height:76px!important;padding:6px!important;border:1px solid rgba(var(--v-border-color),.13);border-radius:24px!important;transform:translateX(-50%);box-shadow:var(--app-shadow-float)!important}.mobile-nav :deep(.v-bottom-navigation__content){display:grid;grid-template-columns:repeat(5,minmax(0,1fr));align-items:stretch;width:100%}.mobile-nav .v-btn{width:100%;min-height:62px}.mobile-nav .v-btn :deep(.v-btn__content){flex-direction:row;gap:9px}}
@media(max-width:959px){.app-brand{width:128px;height:48px;margin-left:max(16px,env(safe-area-inset-left))}.sync-state{max-width:112px;margin-right:10px}.admin-entry,.admin-avatar{margin-right:max(10px,env(safe-area-inset-right))}}@media(max-width:600px){.sync-state{display:none}}
.mobile-nav .v-btn span{font-size:.84rem}
</style>
