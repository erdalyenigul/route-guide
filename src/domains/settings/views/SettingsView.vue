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
const themeStyles = computed(
  () =>
    [
      { value: 'default', colors: ['#0B0C0F', '#A8B6C8', '#D4A36D'] },
      { value: 'obsidian', colors: ['#07080A', '#C2CDDA', '#B58A59'] },
      { value: 'woodstock', colors: ['#17100D', '#E3A45D', '#C85F42'] },
      { value: 'nomad', colors: ['#10130F', '#A9B99E', '#C18A5D'] }
    ] as const
)
</script>

<template>
  <div class="page-shell standard-page settings-page">
    <PageHeader
      :title="t('settings.title')"
      :subtitle="t('settings.subtitle')"
    />
    <v-card class="settings-card">
      <v-list lines="two">
        <v-list-item
          prepend-icon="mdi-translate"
          :title="t('settings.language')"
        >
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
          prepend-icon="mdi-theme-light-dark"
          :title="t('settings.darkMode')"
          ><template #append
            ><v-switch
              :model-value="preferences.theme === 'dark'"
              color="primary"
              hide-details
              @update:model-value="preferences.toggleTheme()" /></template
        ></v-list-item>
        <v-divider />
        <div class="theme-style-section">
          <div class="theme-style-heading">
            <v-icon icon="mdi-palette-outline" />
            <div>
              <strong>{{ t('settings.themeStyle') }}</strong>
              <span>{{ t('settings.themeStyleHint') }}</span>
            </div>
          </div>
          <div class="theme-style-grid">
            <button
              v-for="style in themeStyles"
              :key="style.value"
              type="button"
              class="theme-style-option"
              :class="{ active: preferences.themeStyle === style.value }"
              :aria-pressed="preferences.themeStyle === style.value"
              @click="preferences.themeStyle = style.value"
            >
              <span class="theme-swatches">
                <i
                  v-for="color in style.colors"
                  :key="color"
                  :style="{ backgroundColor: color }"
                />
              </span>
              <span class="theme-style-copy">
                <strong>{{ t(`settings.themes.${style.value}.title`) }}</strong>
                <small>{{ t(`settings.themes.${style.value}.description`) }}</small>
              </span>
              <v-icon
                :icon="
                  preferences.themeStyle === style.value ? 'mdi-check-circle' : 'mdi-circle-outline'
                "
              />
            </button>
          </div>
        </div>
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
.settings-page {
  max-width: none;
}
.settings-page :deep(.page-header) {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
}
.settings-card {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.11);
  border-radius: var(--app-radius-md) !important;
  box-shadow: var(--app-shadow);
}
.settings-card :deep(.v-list-item) {
  min-height: 82px;
  padding: 14px 20px;
}
.settings-card :deep(.v-list-item__content) {
  min-width: 0;
  overflow: visible;
}
.settings-card :deep(.v-list-item-title),
.settings-card :deep(.v-list-item-subtitle) {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;
  overflow-wrap: anywhere;
}
.settings-card :deep(.v-list-item-title) {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
}
.settings-card :deep(.v-list-item-subtitle) {
  margin-top: 5px;
  font-size: 0.9rem;
  line-height: 1.55;
  opacity: 0.72;
}
.settings-card :deep(.v-list-item__append) {
  flex-shrink: 0;
  margin-inline-start: 16px;
}
.language-select {
  width: 190px;
}
.language-select :deep(.v-field) {
  border-radius: 14px;
}
.theme-style-section {
  padding: 22px 20px 24px;
}
.theme-style-heading {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
}
.theme-style-heading > .v-icon {
  margin-top: 2px;
  color: rgba(var(--v-theme-on-surface), 0.72);
}
.theme-style-heading div {
  display: grid;
  gap: 3px;
}
.theme-style-heading strong {
  font-size: 1rem;
}
.theme-style-heading span {
  color: rgba(var(--v-theme-on-surface), 0.58);
  font-size: 0.88rem;
}
.theme-style-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.theme-style-option {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 92px;
  padding: 15px;
  border: 1px solid rgba(var(--v-border-color), 0.14);
  border-radius: 18px;
  color: rgb(var(--v-theme-on-surface));
  text-align: left;
  background: rgba(var(--v-theme-on-surface), 0.035);
  cursor: pointer;
  transition: 0.2s ease;
}
.theme-style-option:hover {
  transform: translateY(-1px);
  border-color: rgba(var(--v-theme-primary), 0.38);
}
.theme-style-option.active {
  border-color: rgba(var(--v-theme-primary), 0.62);
  background: rgba(var(--v-theme-primary), 0.1);
  box-shadow: inset 0 0 0 1px rgba(var(--v-theme-primary), 0.12);
}
.theme-style-option > .v-icon {
  color: rgb(var(--v-theme-primary));
}
.theme-swatches {
  display: flex;
  width: 54px;
  height: 54px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}
.theme-swatches i {
  flex: 1;
}
.theme-style-copy {
  display: grid;
  min-width: 0;
  gap: 4px;
}
.theme-style-copy strong {
  font-size: 0.94rem;
}
.theme-style-copy small {
  color: rgba(var(--v-theme-on-surface), 0.56);
  font-size: 0.78rem;
  line-height: 1.35;
}
@media (max-width: 600px) {
  .settings-card :deep(.v-list-item) {
    min-height: 78px;
    padding: 14px 16px;
  }
  .settings-card :deep(.v-list-item__append) {
    max-width: none;
    margin-inline-start: 10px;
  }
  .settings-card :deep(.v-btn) {
    min-height: 44px;
    padding-inline: 13px;
    font-size: 0.8rem;
  }
  .language-select {
    width: 148px;
  }
  .theme-style-section {
    padding-inline: 16px;
  }
  .theme-style-grid {
    grid-template-columns: 1fr;
  }
}
</style>
