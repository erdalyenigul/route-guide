<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css'
import { createApp, nextTick, onBeforeUnmount, onMounted, ref, watch, type App } from 'vue'
import {
  AttributionControl,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  type GeoJSONSource
} from 'maplibre-gl'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import StopMarker from '@/components/map/StopMarker.vue'
import { mapService } from '@/services/mapService'
import type { MapStop } from '@/types/map'

const props = defineProps<{ stops: MapStop[]; selectedId: string | undefined; compact?: boolean }>()
const emit = defineEmits<{ select: [id: string]; ready: []; error: [message: string] }>()
const { t } = useI18n()
const theme = useTheme()
const container = ref<HTMLElement>()
const loading = ref(true)
const error = ref<string>()
let map: MapLibreMap | undefined
let markerEntries: { marker: Marker; app: App<Element> }[] = []

function updateRouteColors(): void {
  if (!map?.loaded()) return
  const colors = theme.current.value.colors
  if (map.getLayer('active-route-line'))
    map.setPaintProperty('active-route-line', 'line-color', colors.primary)
  if (map.getLayer('completed-route-line'))
    map.setPaintProperty('completed-route-line', 'line-color', colors.secondary)
}

function clearMarkers(): void {
  markerEntries.forEach(({ marker, app }) => {
    marker.remove()
    app.unmount()
  })
  markerEntries = []
}

function renderMarkers(): void {
  if (!map) return
  const activeMap = map
  clearMarkers()
  const groupedStops = new Map<string, MapStop[]>()
  for (const stop of mapService.validStops(props.stops)) {
    const coordinateKey = `${stop.coordinate!.latitude.toFixed(5)},${stop.coordinate!.longitude.toFixed(5)}`
    const group = groupedStops.get(coordinateKey) ?? []
    group.push(stop)
    groupedStops.set(coordinateKey, group)
  }

  for (const group of groupedStops.values()) {
    const orderedGroup = [...group].sort((left, right) => left.order - right.order)
    const radius = orderedGroup.length === 2 ? 24 : orderedGroup.length > 2 ? 32 : 0
    orderedGroup.forEach((stop, index) => {
      const angle =
        orderedGroup.length === 2 ? index * Math.PI : (index / orderedGroup.length) * 2 * Math.PI
      const offset: [number, number] = [
        Math.round(Math.cos(angle) * radius),
        Math.round(Math.sin(angle) * radius)
      ]
      const element = document.createElement('div')
      const app = createApp(StopMarker, {
        label: stop.label,
        order: stop.order,
        status: stop.status,
        selected: stop.id === props.selectedId,
        onSelect: () => emit('select', stop.id)
      })
      app.mount(element)
      const marker = new Marker({ element, anchor: 'center', offset })
        .setLngLat([stop.coordinate!.longitude, stop.coordinate!.latitude])
        .addTo(activeMap)
      markerEntries.push({ marker, app })
    })
  }
}

function renderRoute(): void {
  if (!map) return
  const feature = mapService.routeFeature(props.stops)
  const source = map.getSource('active-route') as GeoJSONSource | undefined
  if (source && feature) source.setData(feature)
  if (!source && feature) {
    map.addSource('active-route', { type: 'geojson', data: feature })
    map.addLayer({
      id: 'active-route-shadow',
      type: 'line',
      source: 'active-route',
      paint: { 'line-color': '#08090c', 'line-width': 8, 'line-opacity': 0.5 }
    })
    map.addLayer({
      id: 'active-route-line',
      type: 'line',
      source: 'active-route',
      filter: ['==', ['get', 'completed'], false],
      paint: { 'line-color': '#829990', 'line-width': 4, 'line-opacity': 0.82 }
    })
    map.addLayer({
      id: 'completed-route-line',
      type: 'line',
      source: 'active-route',
      filter: ['==', ['get', 'completed'], true],
      paint: { 'line-color': '#f2b84b', 'line-width': 5, 'line-opacity': 1 }
    })
  }
}

function fitRoute(): void {
  if (!map) return
  map.resize()
  const bounds = mapService.bounds(props.stops)
  if (!bounds) return
  if (bounds.southWest[0] === bounds.northEast[0] && bounds.southWest[1] === bounds.northEast[1])
    map.flyTo({ center: bounds.southWest, zoom: 11 })
  else
    map.fitBounds([bounds.southWest, bounds.northEast], {
      padding: props.compact ? 36 : { top: 86, right: 42, bottom: 230, left: 42 },
      maxZoom: 11,
      duration: 700
    })
}

onMounted(async () => {
  await nextTick()
  if (!container.value) return
  if (!mapService.validStops(props.stops).length) {
    loading.value = false
    error.value = t('map.noCoordinates')
    return
  }
  try {
    map = new MapLibreMap({
      container: container.value,
      style: mapService.style(),
      center: [28.5, 37.2],
      zoom: 6,
      attributionControl: false,
      cooperativeGestures: false,
      dragPan: true,
      touchZoomRotate: true
    })
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new AttributionControl({ compact: true }), 'bottom-left')
    map.once('load', () => {
      loading.value = false
      renderRoute()
      updateRouteColors()
      renderMarkers()
      fitRoute()
      emit('ready')
    })
    map.once('error', (event) => {
      if (loading.value) {
        const message = event.error?.message ?? t('map.loadError')
        loading.value = false
        error.value = message
        emit('error', message)
      }
    })
  } catch (cause) {
    loading.value = false
    const message = cause instanceof Error ? cause.message : t('map.loadError')
    error.value = message
    emit('error', message)
  }
})

watch(
  () => [props.stops, props.selectedId] as const,
  () => {
    if (map?.loaded()) {
      renderRoute()
      renderMarkers()
    }
  },
  { deep: true }
)
watch(
  () => theme.global.name.value,
  () => updateRouteColors()
)
onBeforeUnmount(() => {
  clearMarkers()
  map?.remove()
  map = undefined
})
defineExpose({ fitRoute })
</script>

<template>
  <div class="app-map">
    <div
      ref="container"
      class="map-container"
    />
    <div
      v-if="loading"
      class="map-state"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      /><span>{{ t('map.loading') }}</span>
    </div>
    <div
      v-else-if="error"
      class="map-state error-state"
    >
      <v-icon
        icon="mdi-map-marker-off-outline"
        size="38"
      /><strong>{{ t('map.loadError') }}</strong
      ><span>{{ error }}</span>
    </div>
    <div
      v-if="stops.some((stop) => !stop.coordinate)"
      class="missing-note"
    >
      <v-icon
        icon="mdi-alert-circle-outline"
        size="15"
      />{{ t('map.missingCoordinates') }}
    </div>
  </div>
</template>

<style scoped>
.app-map,
.map-container {
  position: absolute;
  inset: 0;
}
.app-map {
  overflow: hidden;
  background: #14161a;
}
.map-container :deep(.maplibregl-canvas) {
  outline: none;
}
.map-container :deep(.maplibregl-ctrl-group) {
  margin: 78px 12px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 22, 27, 0.9);
  box-shadow: none;
}
.map-container :deep(.maplibregl-ctrl-group button) {
  width: 42px;
  height: 42px;
  filter: invert(1);
  opacity: 0.78;
}
.map-container :deep(.maplibregl-ctrl-attrib) {
  color: #b9bec7;
  background: rgba(8, 9, 12, 0.76);
}
.map-container :deep(.maplibregl-ctrl-attrib a) {
  color: #e2e5ea;
}
.map-state {
  position: absolute;
  z-index: 5;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 11px;
  padding: 24px;
  text-align: center;
  background: #14161a;
  color: rgba(255, 255, 255, 0.72);
}
.map-state span {
  max-width: 360px;
  font-size: 0.78rem;
}
.error-state strong {
  color: #fff;
}
.missing-note {
  position: absolute;
  z-index: 4;
  top: 76px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 240px;
  padding: 7px 9px;
  border-radius: 9px;
  color: #f1c38d;
  background: rgba(34, 25, 17, 0.86);
  font-size: 0.68rem;
  backdrop-filter: blur(10px);
}
</style>
