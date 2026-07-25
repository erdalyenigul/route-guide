<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { StopViewModel } from '@/content/types'
import { mapService } from '@/services/mapService'
import { useTripStore } from '@/stores/trip'

const props = defineProps<{ stop: StopViewModel; previousStop: StopViewModel | undefined }>()
const { t } = useI18n()
const store = useTripStore()
const isOpen = ref(true)
const isDragging = ref(false)
const dragOffset = ref(0)
let dragStartY = 0
let suppressClick = false
const coordinate = computed(() => mapService.coordinate(props.stop.coordinates))
const routeStops = computed(() => store.stopsForRoute(props.stop.routeId))
const stopIndex = computed(() => routeStops.value.findIndex(stop => stop.id === props.stop.id))
const isRouteOrigin = computed(() => stopIndex.value === 0)
const isAccommodationStop = computed(() => stopIndex.value > 0 && stopIndex.value < routeStops.value.length - 1)
const routeUrl = computed(() => mapService.externalRouteUrl([
  props.previousStop ? mapService.coordinate(props.previousStop.coordinates) : null,
  coordinate.value
]))
function openRoute(): void {
  mapService.openExternalUrl(routeUrl.value)
}

watch(() => props.stop.id, () => {
  isOpen.value = true
})

function toggleFromClick(): void {
  if (suppressClick) return
  isOpen.value = !isOpen.value
}

function startDrag(event: PointerEvent): void {
  if (event.pointerType !== 'touch' || !window.matchMedia('(max-width: 699px)').matches) return
  dragStartY = event.clientY
  dragOffset.value = 0
  isDragging.value = true
  if (event.currentTarget instanceof HTMLElement) event.currentTarget.setPointerCapture(event.pointerId)
}

function moveDrag(event: PointerEvent): void {
  if (!isDragging.value) return
  const distance = event.clientY - dragStartY
  dragOffset.value = isOpen.value ? Math.max(0, distance) : Math.min(0, distance)
}

function finishDrag(): void {
  if (!isDragging.value) return
  const shouldToggle = isOpen.value ? dragOffset.value > 48 : dragOffset.value < -48
  isDragging.value = false
  dragOffset.value = 0
  if (!shouldToggle) return
  isOpen.value = !isOpen.value
  suppressClick = true
  window.setTimeout(() => {
    suppressClick = false
  }, 0)
}
</script>

<template>
  <v-card
    class="stop-sheet"
    :class="{ collapsed: !isOpen, dragging: isDragging }"
    :style="{ '--sheet-drag': `${dragOffset}px` }"
  >
    <button
      v-if="!isOpen"
      class="sheet-reopen"
      type="button"
      :aria-label="t('map.expandStopCard')"
      @click="toggleFromClick"
      @pointerdown="startDrag"
      @pointermove="moveDrag"
      @pointerup="finishDrag"
      @pointercancel="finishDrag"
    >
      <span><small>{{ t(`common.${stop.status}`) }}</small><strong>{{ t(stop.title) }}</strong></span>
      <v-icon icon="mdi-chevron-up" />
    </button>
    <template v-else>
      <button
        class="sheet-handle"
        type="button"
        :aria-label="t('map.collapseStopCard')"
        @click="toggleFromClick"
        @pointerdown="startDrag"
        @pointermove="moveDrag"
        @pointerup="finishDrag"
        @pointercancel="finishDrag"
      >
        <span />
        <v-icon icon="mdi-chevron-down" />
      </button>
      <div class="sheet-heading"><div><p>{{ t(`common.${stop.status}`) }}</p><h2>{{ t(stop.title) }}</h2></div><span v-if="!isRouteOrigin">{{ stop.drivingDistanceFromPreviousKm ?? '—' }} {{ t('common.km') }}</span></div>
      <div class="sheet-facts">
        <span v-if="isAccommodationStop"><v-icon icon="mdi-weather-night" />{{ stop.recommendedNights }} {{ t('common.nights') }}</span>
        <span v-if="stop.ducatoAccessibility"><v-icon icon="mdi-van-utility" />{{ t(`common.${stop.ducatoAccessibility}`) }}</span>
      </div>
      <div class="sheet-actions"><v-btn color="primary" prepend-icon="mdi-information-outline" :to="`/trips/${stop.routeId}/stops/${stop.id}`">{{ t('map.viewStop') }}</v-btn><v-btn variant="tonal" prepend-icon="mdi-navigation-variant" :disabled="!routeUrl" @click="openRoute">{{ t('map.openRoute') }}</v-btn><v-btn variant="tonal" prepend-icon="mdi-image-multiple-outline" :to="`/trips/${stop.routeId}/gallery`">{{ t('nav.gallery') }}</v-btn></div>
    </template>
  </v-card>
</template>

<style scoped>
.stop-sheet{position:absolute;z-index:5;left:12px;right:12px;bottom:12px;padding:7px 20px 20px;border:1px solid rgba(var(--v-border-color),.14);border-radius:26px!important;background:rgba(var(--v-theme-surface),.93)!important;box-shadow:0 24px 70px rgba(0,0,0,.32)!important;backdrop-filter:blur(26px) saturate(145%);transform:translateY(var(--sheet-drag,0));transition:width .24s ease,padding .24s ease,transform .22s ease}.stop-sheet.dragging{transition:none}.stop-sheet.collapsed{padding:0;border-radius:20px!important}.sheet-handle{display:grid;width:72px;height:30px;margin:0 auto 3px;padding:5px 0 0;place-items:center;border:0;color:rgba(var(--v-theme-on-surface),.52);background:transparent;cursor:pointer;touch-action:none}.sheet-handle span{display:block;width:44px;height:5px;border-radius:5px;background:rgba(var(--v-theme-on-surface),.22)}.sheet-handle .v-icon{margin-top:-2px;font-size:16px}.sheet-reopen{display:flex;width:100%;min-height:66px;align-items:center;justify-content:space-between;gap:16px;padding:10px 18px;border:0;color:inherit;text-align:left;background:transparent;cursor:pointer;touch-action:none}.sheet-reopen span{display:grid;gap:1px}.sheet-reopen small{color:rgb(var(--v-theme-primary));font-size:.65rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.sheet-reopen strong{font-size:1.05rem;letter-spacing:-.02em}.sheet-reopen .v-icon{display:grid;width:40px;height:40px;place-items:center;border-radius:50%;background:rgba(var(--v-theme-on-surface),.07)}.sheet-heading{display:flex;justify-content:space-between;align-items:end;gap:16px}.sheet-heading p{color:rgb(var(--v-theme-primary));font-size:.75rem;font-weight:780;text-transform:uppercase;letter-spacing:.07em}.sheet-heading h2{margin-top:2px;font-size:1.65rem;letter-spacing:-.04em}.sheet-heading>span{color:rgba(var(--v-theme-on-surface),.62);font-size:.88rem}.sheet-facts{display:flex;gap:17px;margin-top:14px;color:rgba(var(--v-theme-on-surface),.74);font-size:.84rem}.sheet-facts span{display:flex;align-items:center;gap:6px;white-space:nowrap}.sheet-actions{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:9px;margin-top:18px}.sheet-actions .v-btn{min-width:0;min-height:52px;padding-inline:10px;font-size:.78rem}@media(min-width:700px){.stop-sheet{left:50%;right:auto;width:640px;transform:translateX(-50%);bottom:22px}.stop-sheet.collapsed{width:320px}}@media(max-width:430px){.sheet-actions{grid-template-columns:1fr 1fr}.sheet-actions .v-btn:first-child{grid-column:span 2}.sheet-heading h2{font-size:1.45rem}}
</style>
