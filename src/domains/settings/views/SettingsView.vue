<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/base/PageHeader.vue'
import { usePreferencesStore } from '@/stores/preferences'

const { t } = useI18n()
const preferences = usePreferencesStore()
const languageOptions = computed(() => [
  { title: t('settings.english'), value: 'en' },
  { title: t('settings.turkish'), value: 'tr' }
])
</script>

<template>
  <div class="page-shell standard-page settings-page">
    <PageHeader :title="t('settings.title')" :subtitle="t('settings.subtitle')" />
    <v-card class="settings-card">
      <v-list lines="two">
        <v-list-item prepend-icon="mdi-theme-light-dark" :title="t('settings.darkMode')"><template #append><v-switch :model-value="preferences.theme === 'dark'" color="primary" hide-details @update:model-value="preferences.toggleTheme()" /></template></v-list-item>
        <v-divider />
        <v-list-item prepend-icon="mdi-translate" :title="t('settings.language')">
          <template #append>
            <v-select
              v-model="preferences.language"
              class="language-select"
              :items="languageOptions"
              item-title="title"
              item-value="value"
              variant="outlined"
              density="comfortable"
              hide-details
              menu-icon="mdi-chevron-down"
              :aria-label="t('settings.language')"
            />
          </template>
        </v-list-item>
        <v-divider />
        <v-list-item
          prepend-icon="mdi-shield-account-outline"
          :title="t('settings.managementTitle')"
          :subtitle="t('settings.managementSubtitle')"
          to="/manage"
        >
          <template #append><v-icon icon="mdi-chevron-right" /></template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<style scoped>
.settings-page{max-width:none}.settings-card{width:100%;max-width:1100px;margin-inline:auto;overflow:hidden;border:1px solid rgba(var(--v-border-color),.11);border-radius:var(--app-radius-md)!important;box-shadow:var(--app-shadow)}.settings-card :deep(.v-list-item){min-height:82px;padding:14px 20px}.settings-card :deep(.v-list-item__content){min-width:0;overflow:visible}.settings-card :deep(.v-list-item-title),.settings-card :deep(.v-list-item-subtitle){white-space:normal!important;overflow:visible!important;text-overflow:clip!important;overflow-wrap:anywhere}.settings-card :deep(.v-list-item-title){font-size:1rem;font-weight:700;line-height:1.4}.settings-card :deep(.v-list-item-subtitle){margin-top:5px;font-size:.9rem;line-height:1.55;opacity:.72}.settings-card :deep(.v-list-item__append){flex-shrink:0;margin-inline-start:16px}.language-select{width:190px}.language-select :deep(.v-field){border-radius:14px}@media(max-width:600px){.settings-card :deep(.v-list-item){min-height:78px;padding:14px 16px}.settings-card :deep(.v-list-item__append){max-width:none;margin-inline-start:10px}.settings-card :deep(.v-btn){min-height:44px;padding-inline:13px;font-size:.8rem}.language-select{width:148px}}
</style>
