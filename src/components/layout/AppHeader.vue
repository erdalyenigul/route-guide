<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { adminContentService } from '@/domains/admin/services/adminContentService'
import type { AdminUser } from '@/domains/admin/types'
import { usePreferencesStore } from '@/stores/preferences'

defineOptions({ name: 'AppHeader' })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const preferences = usePreferencesStore()
const isOnline = ref(navigator.onLine)
const adminUser = ref<AdminUser | null>(null)
const safeAreaTop = ref(0)

const logoUrl = computed(() => preferences.theme === 'dark' ? '/logo-dark.png' : '/logo-light.png')
const adminInitial = computed(() => adminUser.value?.displayName.trim().charAt(0).toLocaleUpperCase(preferences.language) ?? '')
const headerHeight = computed(() => 64 + safeAreaTop.value)

watch(
  () => route.fullPath,
  async () => {
    try {
      adminUser.value = await adminContentService.currentUser()
    } catch {
      adminUser.value = null
    }
  },
  { immediate: true }
)

function updateOnlineStatus(): void {
  isOnline.value = navigator.onLine
}

function updateSafeAreaTop(): void {
  const probe = document.createElement('div')
  probe.style.cssText = 'position:fixed;inset:0 auto auto 0;width:0;height:env(safe-area-inset-top);visibility:hidden;pointer-events:none'
  document.body.appendChild(probe)
  safeAreaTop.value = Math.max(0, Math.round(probe.getBoundingClientRect().height))
  probe.remove()
}

async function signOutAdmin(): Promise<void> {
  await adminContentService.signOut()
  adminUser.value = null
  if (route.path.startsWith('/manage')) await router.replace({ name: 'admin-login' })
}

async function openAdminPanel(): Promise<void> {
  await router.push({ name: 'admin-dashboard' })
}

onMounted(() => {
  updateSafeAreaTop()
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  window.addEventListener('resize', updateSafeAreaTop)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
  window.removeEventListener('resize', updateSafeAreaTop)
})
</script>

<template>
  <v-app-bar class="app-header" :class="`theme-${preferences.theme}`" flat :height="headerHeight">
    <router-link class="app-brand" to="/" :aria-label="t('app.name')">
      <img :src="logoUrl" :alt="t('app.name')" />
    </router-link>

    <template #append>
      <span v-if="!isOnline" class="sync-state"><i />{{ t('offline.status') }}</span>

      <v-menu v-if="!adminUser" location="bottom end">
        <template #activator="{ props }">
          <v-btn v-bind="props" class="admin-entry" icon="mdi-account-lock-outline" :aria-label="t('admin.accountMenu')" />
        </template>
        <v-card class="admin-menu" min-width="220">
          <v-list>
            <v-list-item prepend-icon="mdi-login" append-icon="mdi-chevron-right" :title="t('admin.loginTitle')" to="/manage/login" />
            <v-list-item prepend-icon="mdi-cog-outline" append-icon="mdi-chevron-right" :title="t('nav.settings')" to="/settings" />
          </v-list>
        </v-card>
      </v-menu>

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
            <v-list-item prepend-icon="mdi-cog-outline" append-icon="mdi-chevron-right" :title="t('nav.settings')" to="/settings" />
          </v-list>
          <v-divider />
          <v-card-actions>
            <v-btn block color="error" variant="text" prepend-icon="mdi-logout" @click="signOutAdmin">
              {{ t('admin.signOut') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<style scoped>
.app-header{border-bottom:1px solid rgba(var(--v-border-color),.1)!important;box-shadow:0 8px 30px rgba(0,0,0,.08)!important}.app-header.theme-dark{background:#1f1f1f!important}.app-header.theme-light{background:#f9f8f4!important}
.app-header :deep(.v-toolbar__content){box-sizing:border-box;width:100%;height:calc(64px + env(safe-area-inset-top))!important;padding:env(safe-area-inset-top) 0 0!important}
.app-brand{display:flex;align-items:center;width:146px;height:52px;margin-left:24px;overflow:hidden;border-radius:10px;text-decoration:none}.app-brand img{display:block;width:100%;height:100%;object-fit:contain}
.sync-state{display:flex;align-items:center;gap:8px;max-width:240px;margin-right:22px;color:rgba(var(--v-theme-on-surface),.64);font-size:.8rem;font-weight:620;text-transform:capitalize;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sync-state i{width:8px;height:8px;border-radius:50%;background:rgb(var(--v-theme-warning));box-shadow:0 0 0 4px rgba(var(--v-theme-warning),.12)}
.admin-entry,.admin-avatar{margin-right:max(14px,env(safe-area-inset-right));border:1px solid rgba(var(--v-border-color),.12);background:rgba(var(--v-theme-on-surface),.055)!important}.admin-avatar span{display:grid;width:34px;height:34px;place-items:center;border-radius:50%;color:rgb(var(--v-theme-on-primary));background:rgb(var(--v-theme-primary));font-size:.88rem;font-weight:800}.admin-menu{margin-top:8px;border:1px solid rgba(var(--v-border-color),.12);border-radius:18px!important;box-shadow:var(--app-shadow-float)}.admin-profile-link{cursor:pointer}
@media(max-width:959px){.app-brand{width:128px;height:48px;margin-left:max(16px,env(safe-area-inset-left))}.sync-state{max-width:112px;margin-right:10px}.admin-entry,.admin-avatar{margin-right:max(10px,env(safe-area-inset-right))}}
@media(max-width:600px){.sync-state{display:none}}
</style>
