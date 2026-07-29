<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AppMap from '@/components/map/AppMap.vue'
import StopBottomSheet from '@/components/map/StopBottomSheet.vue'
import { mapService } from '@/services/mapService'
import { useTripStore } from '@/stores/trip'

const { t } = useI18n()
const route = useRoute()
const store = useTripStore()
const mapRef = ref<InstanceType<typeof AppMap>>()
const stops = computed(() => store.stopsForRoute(String(route.params.routeId)))
const mapStops = computed(() =>
  stops.value.map((stop) => ({
    id: stop.id,
    label: t(stop.title),
    status: stop.status,
    coordinate: mapService.coordinate(stop.coordinates)
  }))
)
const selectedId = ref<string>()
watch(
  stops,
  (value) => {
    if (!selectedId.value || !value.some((stop) => stop.id === selectedId.value))
      selectedId.value = value.find((stop) => stop.status === 'current')?.id ?? value[0]?.id
  },
  { immediate: true }
)
const selected = computed(() => stops.value.find((stop) => stop.id === selectedId.value))
const selectedIndex = computed(() => stops.value.findIndex((stop) => stop.id === selectedId.value))
const previousStop = computed(() =>
  selectedIndex.value > 0 ? stops.value[selectedIndex.value - 1] : undefined
)
</script>

<template>
  <main class="map-screen">
    <AppMap
      ref="mapRef"
      :stops="mapStops"
      :selected-id="selectedId"
      @select="selectedId = $event"
    />
    <header class="map-topbar">
      <div>
        <h1>{{ t('map.title') }}</h1>
        <p>{{ t('map.subtitle') }}</p>
      </div>
      <v-btn
        class="map-fit-action"
        icon="mdi-fit-to-page-outline"
        variant="tonal"
        :aria-label="t('map.fitRoute')"
        @click="mapRef?.fitRoute()"
      />
    </header>
    <StopBottomSheet
      v-if="selected"
      :stop="selected"
      :previous-stop="previousStop"
    />
  </main>
</template>

<style scoped>
.map-screen {
  position: relative;
  width: 100%;
  height: calc(100dvh - 62px - 82px - env(safe-area-inset-bottom));
  overflow: hidden;
}
.map-topbar {
  position: absolute;
  z-index: 4;
  top: 16px;
  left: 16px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  pointer-events: none;
}
.map-topbar > div,
.map-topbar .v-btn {
  pointer-events: auto;
}
.map-topbar > div {
  max-width: min(76%, 480px);
  padding: 14px 18px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 20px;
  color: #fff;
  background: rgba(13, 22, 17, 0.78);
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(22px) saturate(135%);
}
.map-fit-action {
  width: 42px !important;
  min-width: 42px !important;
  height: 42px !important;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 11px !important;
  color: rgba(255, 255, 255, 0.8) !important;
  background: rgba(20, 22, 27, 0.9) !important;
  box-shadow: none !important;
}
.map-fit-action :deep(.v-icon) {
  font-size: 22px;
}
.map-topbar h1 {
  font-size: 1.2rem;
  letter-spacing: -0.025em;
}
.map-topbar p {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.82rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (min-width: 960px) {
  .map-screen {
    height: calc(100dvh - 62px - 82px);
  }
}
</style>
