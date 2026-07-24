<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { StopViewModel } from '@/content/types'
import { mapService } from '@/services/mapService'

const props = defineProps<{ stop: StopViewModel; previousStop: StopViewModel | undefined }>()
const { t } = useI18n()
const coordinate = computed(() => mapService.coordinate(props.stop.coordinates))
const routeUrl = computed(() => mapService.externalRouteUrl([
  props.previousStop ? mapService.coordinate(props.previousStop.coordinates) : null,
  coordinate.value
]))
</script>

<template>
  <v-card class="stop-sheet">
    <div class="sheet-handle" />
    <div class="sheet-heading"><div><p>{{ t(`common.${stop.status}`) }}</p><h2>{{ t(stop.title) }}</h2></div><span>{{ stop.drivingDistanceFromPreviousKm ?? '—' }} {{ t('common.km') }}</span></div>
    <div class="sheet-facts"><span><v-icon icon="mdi-weather-night" />{{ stop.recommendedNights }} {{ t('common.nights') }}</span><span><v-icon icon="mdi-van-utility" />{{ stop.ducatoAccessibility ? t(`common.${stop.ducatoAccessibility}`) : t('common.unknown') }}</span><span><v-icon icon="mdi-water-outline" />{{ stop.waterRefill.available ? t('common.yes') : t('common.unknown') }}</span></div>
    <div class="sheet-actions"><v-btn color="primary" prepend-icon="mdi-information-outline" :to="`/trips/${stop.routeId}/stops/${stop.id}`">{{ t('map.viewStop') }}</v-btn><v-btn variant="tonal" prepend-icon="mdi-navigation-variant" :href="routeUrl" target="_blank" rel="noopener" :disabled="!routeUrl">{{ t('map.openRoute') }}</v-btn><v-btn variant="tonal" prepend-icon="mdi-image-multiple-outline" :to="`/trips/${stop.routeId}/gallery`">{{ t('nav.gallery') }}</v-btn></div>
  </v-card>
</template>

<style scoped>
.stop-sheet{position:absolute;z-index:5;left:12px;right:12px;bottom:12px;padding:9px 20px 20px;border:1px solid rgba(var(--v-border-color),.14);border-radius:26px!important;background:rgba(var(--v-theme-surface),.93)!important;box-shadow:0 24px 70px rgba(0,0,0,.32)!important;backdrop-filter:blur(26px) saturate(145%)}.sheet-handle{width:44px;height:5px;margin:0 auto 15px;border-radius:5px;background:rgba(var(--v-theme-on-surface),.22)}.sheet-heading{display:flex;justify-content:space-between;align-items:end;gap:16px}.sheet-heading p{color:rgb(var(--v-theme-primary));font-size:.75rem;font-weight:780;text-transform:uppercase;letter-spacing:.07em}.sheet-heading h2{margin-top:2px;font-size:1.65rem;letter-spacing:-.04em}.sheet-heading>span{color:rgba(var(--v-theme-on-surface),.62);font-size:.88rem}.sheet-facts{display:flex;gap:17px;margin-top:14px;color:rgba(var(--v-theme-on-surface),.74);font-size:.84rem}.sheet-facts span{display:flex;align-items:center;gap:6px;white-space:nowrap}.sheet-actions{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:9px;margin-top:18px}.sheet-actions .v-btn{min-width:0;min-height:52px;padding-inline:10px;font-size:.78rem}@media(min-width:700px){.stop-sheet{left:50%;right:auto;width:640px;transform:translateX(-50%);bottom:22px}}@media(max-width:430px){.sheet-actions{grid-template-columns:1fr 1fr}.sheet-actions .v-btn:first-child{grid-column:span 2}.sheet-heading h2{font-size:1.45rem}}
</style>
