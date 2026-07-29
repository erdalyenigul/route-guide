<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { StopViewModel } from '@/content/types'

const props = defineProps<{ stop: StopViewModel }>()
const { t } = useI18n()
function score(value: number | null): string {
  return value === null ? t('common.unknown') : `${value}/5`
}
function level(value: string | null): string {
  return value === null ? t('common.unknown') : t(`common.${value}`)
}
const metrics = computed(() => [
  { key: 'seaScore', icon: 'mdi-waves', value: score(props.stop.seaScore) },
  { key: 'silenceScore', icon: 'mdi-volume-off', value: score(props.stop.silenceScore) },
  { key: 'internet', icon: 'mdi-wifi', value: score(props.stop.internetScore) },
  { key: 'safetyScore', icon: 'mdi-shield-check-outline', value: score(props.stop.safetyScore) },
  { key: 'solar', icon: 'mdi-white-balance-sunny', value: level(props.stop.solarSuitability) },
  { key: 'shade', icon: 'mdi-tree-outline', value: level(props.stop.shade) },
  { key: 'crowd', icon: 'mdi-account-group-outline', value: level(props.stop.crowdLevel) },
  { key: 'ducatoAccess', icon: 'mdi-van-utility', value: level(props.stop.ducatoAccessibility) },
  { key: 'drone', icon: 'mdi-quadcopter', value: level(props.stop.droneSuitability) }
])
</script>

<template>
  <div class="conditions-grid">
    <div
      v-for="metric in metrics"
      :key="metric.key"
      class="condition-item"
    >
      <v-icon
        :icon="metric.icon"
        size="21"
      />
      <div>
        <span>{{ t(`stop.${metric.key}`) }}</span
        ><strong>{{ metric.value }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conditions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.condition-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  border-radius: 16px;
  background: rgba(var(--v-theme-on-surface), 0.04);
}
.condition-item .v-icon {
  color: rgb(var(--v-theme-primary));
}
.condition-item span,
.condition-item strong {
  display: block;
}
.condition-item span {
  font-size: 0.72rem;
  color: rgba(var(--v-theme-on-surface), 0.58);
}
.condition-item strong {
  margin-top: 2px;
  font-size: 0.9rem;
}
@media (min-width: 700px) {
  .conditions-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
