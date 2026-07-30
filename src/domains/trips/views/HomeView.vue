<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { StopViewModel } from '@/content/types'
import { mapService } from '@/services/mapService'
import { useTripStore } from '@/stores/trip'
import { terrainProfile } from '@/utils/terrainProfile'

const { t } = useI18n()
const store = useTripStore()
const trip = computed(() => store.activeTrip)
const routeId = computed(() => trip.value?.id ?? 'active')
const openChapters = ref<string[]>([])
const chapterColumnCount = ref(1)
const fullRouteSheetOpen = ref(false)
const chapterAccents = [
  '93, 125, 169',
  '191, 139, 79',
  '126, 103, 174',
  '171, 85, 113',
  '72, 134, 160',
  '154, 112, 88'
]
const chapterColumns = computed(() => {
  const columns = Array.from(
    { length: chapterColumnCount.value },
    () => [] as Array<{ stop: StopViewModel; index: number }>
  )
  store.activeStops.forEach((stop, index) =>
    columns[index % chapterColumnCount.value]?.push({ stop, index })
  )
  return columns
})
const googleRouteSegments = computed(() => {
  const validStops = store.activeStops.filter(
    (stop) => mapService.coordinate(stop.coordinates) !== null
  )
  const maximumPoints = chapterColumnCount.value === 1 ? 5 : 11
  const segments: Array<{
    id: string
    start: StopViewModel
    end: StopViewModel
    url: string
  }> = []

  for (let startIndex = 0; startIndex < validStops.length - 1; startIndex += maximumPoints - 1) {
    const stops = validStops.slice(startIndex, startIndex + maximumPoints)
    const start = stops[0]
    const end = stops[stops.length - 1]
    const url = mapService.externalRouteUrl(
      stops.map((stop) => mapService.coordinate(stop.coordinates))
    )
    if (!start || !end || !url) continue
    segments.push({ id: `${start.id}-${end.id}`, start, end, url })
  }

  return segments
})
function text(key?: string): string {
  return key ? t(key) : t('common.unknown')
}
function chapterAccent(index: number): string {
  return chapterAccents[index % chapterAccents.length] ?? '93, 125, 169'
}
function updateChapterColumnCount(): void {
  const width = window.innerWidth
  chapterColumnCount.value = width > 1100 ? 3 : width > 760 ? 2 : 1
}
function chapterStatus(stop: StopViewModel, index: number): string {
  if (stop.status === 'visited') return 'completed'
  if (stop.status === 'skipped') return 'skipped'
  if (stop.status === 'current') return 'current'
  if (index === store.currentStopIndex + 1) return 'next'
  return 'upcoming'
}
function toggleChapter(stopId: string): void {
  openChapters.value = openChapters.value.includes(stopId)
    ? openChapters.value.filter((id) => id !== stopId)
    : [...openChapters.value, stopId]
}
function plannedStayLabel(stop: StopViewModel): string {
  return stop.recommendedNights === 0
    ? t('common.dayVisit')
    : `${stop.recommendedNights} ${t('common.nights')}`
}
function openFullRoute(): void {
  if (googleRouteSegments.value.length === 1) {
    mapService.openExternalUrl(googleRouteSegments.value[0]?.url)
    return
  }
  fullRouteSheetOpen.value = true
}
function refreshVisibleTripState(): void {
  if (document.visibilityState === 'visible') void store.refreshTripState()
}
onMounted(() => {
  updateChapterColumnCount()
  void store.refreshTripState()
  window.addEventListener('resize', updateChapterColumnCount)
  document.addEventListener('visibilitychange', refreshVisibleTripState)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateChapterColumnCount)
  document.removeEventListener('visibilitychange', refreshVisibleTripState)
})
</script>

<template>
  <main class="page-shell trip-page">
    <div
      v-if="store.isLoading"
      class="state"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      /><span>{{ t('home.title') }}</span>
    </div>
    <v-alert
      v-else-if="store.loadError"
      type="error"
      variant="tonal"
      class="state"
      ><h2>{{ t('home.dataUnavailable') }}</h2>
      <p>{{ t('home.dataUnavailableHint') }}</p>
      <v-btn
        color="primary"
        @click="store.initialize"
        >{{ t('home.retry') }}</v-btn
      ></v-alert
    >
    <v-card
      v-else-if="!trip"
      class="state"
      ><v-icon
        icon="mdi-database-alert-outline"
        size="40"
      />
      <h2>{{ t('home.noActiveRoute') }}</h2>
      <p>{{ t('home.noActiveRouteHint') }}</p></v-card
    >

    <template v-else>
      <section class="trip-summary">
        <header>
          <div>
            <p>{{ t('home.title') }}</p>
            <h1>{{ text(trip.title) }}</h1>
            <div class="route-summary">({{ text(trip.description) }})</div>
          </div>
          <v-btn
            class="open-map-action"
            color="primary"
            rounded="pill"
            :to="`/trips/${routeId}/map`"
          >
            <v-icon icon="mdi-map-outline" />
            <span>{{ t('home.openMap') }}</span>
          </v-btn>
        </header>
        <div class="progress-row">
          <div>
            <span>{{ t('home.routeProgress') }}</span
            ><strong>{{ store.routeProgress }}%</strong>
          </div>
          <v-progress-linear
            :model-value="store.routeProgress"
            color="primary"
            height="7"
            rounded
          />
        </div>
        <div class="summary-grid">
          <div class="featured current">
            <span>{{ t('home.currentStop') }}</span
            ><strong>{{ text(store.currentStop?.title) }}</strong
            ><small>{{ text(store.currentStop?.region) }}</small>
          </div>
          <div class="featured">
            <span>{{ t('home.nextStop') }}</span
            ><strong>{{ text(store.nextStop?.title) }}</strong
            ><small
              >{{ store.nextStop?.drivingDistanceFromPreviousKm ?? '—' }}
              {{ t('common.km') }}</small
            >
          </div>
          <div>
            <span>{{ t('home.totalDistance') }}</span
            ><strong
              >{{ store.totalDistance }} <small>{{ t('common.km') }}</small></strong
            >
          </div>
          <div>
            <span>{{ t('home.completedDistance') }}</span
            ><strong
              >{{ store.completedDistance }} <small>{{ t('common.km') }}</small></strong
            >
          </div>
          <div>
            <span>{{ t('home.remainingDistance') }}</span
            ><strong
              >{{ store.remainingDistance }} <small>{{ t('common.km') }}</small></strong
            >
          </div>
          <div>
            <span>{{ t('home.totalNights') }}</span
            ><strong>{{ store.totalNights }}</strong>
          </div>
          <div>
            <span>{{ t('home.nightsStayed') }}</span
            ><strong>{{ store.nightsStayed }}</strong>
          </div>
          <div>
            <span>{{ t('home.remainingNights') }}</span
            ><strong>{{ store.remainingNights }}</strong>
          </div>
        </div>
        <button
          class="full-route-action"
          type="button"
          @click="openFullRoute"
        >
          <span class="full-route-action__icon"><v-icon icon="mdi-map-marker-path" /></span>
          <span class="full-route-action__copy">
            <strong>{{ t('home.fullRoute') }}</strong>
            <small>
              {{
                t('home.fullRouteSummary', {
                  distance: store.totalDistance,
                  stops: store.activeStops.length
                })
              }}
            </small>
          </span>
          <v-icon icon="mdi-open-in-new" />
        </button>
      </section>

      <section class="chapters">
        <div class="section-heading">
          <div>
            <p>{{ t('home.routeChapters') }}</p>
            <h2>{{ t('nav.stops') }}</h2>
          </div>
          <span>{{ store.activeStops.length }}</span>
        </div>
        <div class="chapter-grid">
          <div
            v-for="(column, columnIndex) in chapterColumns"
            :key="columnIndex"
            class="chapter-column"
          >
            <article
              v-for="{ stop, index } in column"
              :key="stop.id"
              class="chapter"
              :class="[chapterStatus(stop, index), { open: openChapters.includes(stop.id) }]"
              :style="{ '--chapter-accent': chapterAccent(index) }"
            >
              <button
                class="drawer-summary"
                type="button"
                :aria-expanded="openChapters.includes(stop.id)"
                :aria-controls="`chapter-${stop.id}`"
                @click="toggleChapter(stop.id)"
              >
                <span class="chapter-id"
                  ><small>{{ t('home.stopId') }}</small
                  >{{ String(index + 1).padStart(2, '0') }}</span
                >
                <span class="chapter-title">
                  <strong>{{ t(stop.title) }}</strong>
                  <small>{{ t(stop.region) }}</small>
                  <span
                    v-if="stop.status === 'visited'"
                    class="stage-complete-label"
                    ><v-icon icon="mdi-check-circle" />{{ t('stop.stageComplete') }}</span
                  >
                  <span
                    v-else-if="stop.status === 'skipped'"
                    class="stage-complete-label skipped"
                    ><v-icon icon="mdi-skip-next-circle" />{{ t('stop.routeSkipped') }}</span
                  >
                </span>
                <v-icon
                  v-if="stop.favorite"
                  class="chapter-favorite"
                  icon="mdi-heart"
                  :aria-label="t('stop.unfavorite')"
                  :title="t('stop.unfavorite')"
                />
                <v-icon
                  class="drawer-chevron"
                  icon="mdi-chevron-down"
                />
              </button>
              <v-btn
                class="chapter-quick-detail"
                variant="tonal"
                append-icon="mdi-arrow-right"
                :to="`/trips/${routeId}/stops/${stop.id}`"
              >
                {{ t('common.details') }}
              </v-btn>
              <v-expand-transition>
                <div
                  v-show="openChapters.includes(stop.id)"
                  :id="`chapter-${stop.id}`"
                  class="drawer-content"
                >
                  <div class="drawer-status">
                    <v-chip
                      size="small"
                      :color="
                        chapterStatus(stop, index) === 'current'
                          ? 'secondary'
                          : chapterStatus(stop, index) === 'completed'
                            ? 'success'
                            : undefined
                      "
                    >
                      {{
                        chapterStatus(stop, index) === 'completed'
                          ? t('stop.stageComplete')
                          : chapterStatus(stop, index) === 'skipped'
                            ? t('stop.routeSkipped')
                            : t(`common.${chapterStatus(stop, index)}`)
                      }}
                    </v-chip>
                  </div>
                  <p class="overview">{{ t(stop.overview) }}</p>
                  <div class="chapter-data">
                    <div v-if="index > 0 && index < store.activeStops.length - 1">
                      <span>{{ t('home.planned') }}</span
                      ><strong>{{ plannedStayLabel(stop) }}</strong>
                    </div>
                    <div v-if="index > 0 && index < store.activeStops.length - 1">
                      <span>{{ t('home.stayed') }}</span>
                      <strong>
                        <template
                          v-if="stop.status === 'visited' && (stop.nightsStayed ?? 0) === 0"
                        >
                          {{ t('common.dayVisit') }}
                        </template>
                        <template v-else>
                          {{ stop.status === 'visited' ? (stop.nightsStayed ?? 0) : 0 }}
                          {{ t('common.nights') }}
                        </template>
                      </strong>
                    </div>
                    <div v-if="index > 0">
                      <span>{{ t('trip.distance') }}</span
                      ><strong
                        >{{ stop.drivingDistanceFromPreviousKm ?? '—' }}
                        {{ t('common.km') }}</strong
                      >
                    </div>
                    <div v-if="index > 0 && stop.status === 'visited'">
                      <span>{{ t('home.actualDistance') }}</span
                      ><strong>{{ stop.actualDistanceKm ?? 0 }} {{ t('common.km') }}</strong>
                    </div>
                    <div v-if="index > 0">
                      <span>{{ t('home.driveTime') }}</span
                      ><strong
                        >{{ stop.estimatedDriveTimeMinutes ?? '—' }} {{ t('common.min') }}</strong
                      >
                    </div>
                    <div v-if="index > 0 && terrainProfile(stop)">
                      <span>{{ t('van.terrainProfile') }}</span
                      ><strong>{{ t(`van.road.terrain.${terrainProfile(stop)}`) }}</strong>
                    </div>
                  </div>
                </div>
              </v-expand-transition>
            </article>
          </div>
        </div>
      </section>

      <v-bottom-sheet v-model="fullRouteSheetOpen">
        <v-card class="full-route-sheet">
          <div class="full-route-sheet__handle" />
          <div class="full-route-sheet__heading">
            <div>
              <p>{{ t('home.fullRoute') }}</p>
              <h2>{{ text(trip.title) }}</h2>
              <span>
                {{
                  t('home.fullRouteSummary', {
                    distance: store.totalDistance,
                    stops: store.activeStops.length
                  })
                }}
              </span>
            </div>
            <v-btn
              icon="mdi-close"
              variant="text"
              :aria-label="t('common.close')"
              @click="fullRouteSheetOpen = false"
            />
          </div>
          <p class="full-route-sheet__notice">{{ t('home.googleMapsRouteNotice') }}</p>
          <div class="full-route-segments">
            <v-btn
              v-for="(segment, index) in googleRouteSegments"
              :key="segment.id"
              class="full-route-segment"
              variant="tonal"
              append-icon="mdi-open-in-new"
              @click="mapService.openExternalUrl(segment.url)"
            >
              <span>
                <small>{{ t('home.googleMapsPart', { part: index + 1 }) }}</small>
                <strong>{{ text(segment.start.title) }} → {{ text(segment.end.title) }}</strong>
              </span>
            </v-btn>
          </div>
        </v-card>
      </v-bottom-sheet>
    </template>
  </main>
</template>

<style scoped>
.trip-page {
  padding-top: clamp(24px, 3vw, 48px);
  padding-bottom: 132px;
}
.state {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
}
.trip-summary {
  position: relative;
  width: min(100%, 1380px);
  overflow: hidden;
  margin-inline: auto;
  padding: clamp(22px, 2.8vw, 40px);
  border: 1px solid rgba(var(--v-border-color), 0.13);
  border-radius: var(--app-radius-lg);
  background:
    linear-gradient(135deg, rgba(var(--v-theme-primary), 0.075), transparent 42%),
    rgb(var(--v-theme-surface));
  box-shadow: var(--app-shadow);
}
.trip-summary:after {
  content: '';
  position: absolute;
  right: -100px;
  top: -150px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.055);
  filter: blur(30px);
  pointer-events: none;
}
.trip-summary header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.trip-summary header p,
.section-heading p {
  color: rgba(var(--v-theme-on-surface), 0.58);
  font-size: 0.78rem;
  font-weight: 780;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.trip-summary h1 {
  margin-top: 6px;
  font-size: clamp(1.2rem, 3.4vw, 3rem);
  line-height: 1.04;
  letter-spacing: -0.05em;
}
.route-summary {
  margin-top: 9px;
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: clamp(0.86rem, 1.25vw, 1rem);
  font-weight: 560;
  letter-spacing: 0;
}
.open-map-action {
  min-width: 148px;
  min-height: 50px;
  padding-inline: 20px !important;
}
.open-map-action :deep(.v-btn__content) {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}
.open-map-action .v-icon {
  margin: 0;
  font-size: 1.3rem;
}
.progress-row {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 170px 1fr;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
}
.progress-row > div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.9rem;
}
.summary-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
  margin-top: 24px;
}
.summary-grid > div {
  min-width: 0;
  padding: 18px;
  border: 1px solid rgba(var(--v-border-color), 0.1);
  border-radius: var(--app-radius-md);
  background: rgba(var(--v-theme-on-surface), 0.035);
  backdrop-filter: blur(12px);
}
.summary-grid .featured {
  grid-column: span 3;
}
.summary-grid .current {
  border-color: rgba(var(--v-theme-primary), 0.38);
  background: rgba(var(--v-theme-primary), 0.11);
}
.summary-grid span,
.summary-grid small {
  display: block;
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 0.78rem;
  line-height: 1.35;
}
.summary-grid strong {
  display: block;
  margin-top: 8px;
  overflow: hidden;
  font-size: 1.3rem;
  letter-spacing: -0.03em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.summary-grid strong small {
  display: inline;
  font-size: 0.78rem;
}
.summary-grid .featured strong {
  font-size: 1.45rem;
}
.full-route-action {
  position: relative;
  z-index: 1;
  display: grid;
  width: 100%;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  margin-top: 16px;
  padding: 14px 16px;
  border: 1px solid rgba(var(--v-theme-primary), 0.3);
  border-radius: var(--app-radius-md);
  color: rgb(var(--v-theme-on-surface));
  text-align: left;
  background: linear-gradient(
    100deg,
    rgba(var(--v-theme-primary), 0.16),
    rgba(var(--v-theme-primary), 0.055)
  );
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.2s;
}
.full-route-action:hover {
  border-color: rgba(var(--v-theme-primary), 0.58);
  background: rgba(var(--v-theme-primary), 0.18);
  transform: translateY(-1px);
}
.full-route-action__icon {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 14px;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.16);
}
.full-route-action__icon .v-icon {
  font-size: 1.45rem;
}
.full-route-action__copy {
  display: grid;
  min-width: 0;
  gap: 3px;
}
.full-route-action__copy strong {
  font-size: 1rem;
  letter-spacing: -0.015em;
}
.full-route-action__copy small {
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 0.78rem;
}
.full-route-sheet {
  width: min(100%, 720px);
  margin-inline: auto;
  padding: 12px clamp(18px, 4vw, 30px) calc(22px + env(safe-area-inset-bottom));
  border: 1px solid rgba(var(--v-border-color), 0.18);
  border-radius: 28px 28px 0 0 !important;
  background: rgb(var(--v-theme-surface));
}
.full-route-sheet__handle {
  width: 48px;
  height: 5px;
  margin: 0 auto 14px;
  border-radius: 999px;
  background: rgba(var(--v-theme-on-surface), 0.26);
}
.full-route-sheet__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.full-route-sheet__heading p {
  color: rgb(var(--v-theme-primary));
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.full-route-sheet__heading h2 {
  margin-top: 4px;
  font-size: clamp(1.35rem, 4vw, 1.8rem);
  letter-spacing: -0.04em;
}
.full-route-sheet__heading span,
.full-route-sheet__notice {
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 0.85rem;
}
.full-route-sheet__notice {
  margin-top: 18px;
  line-height: 1.5;
}
.full-route-segments {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}
.full-route-segment {
  min-height: 62px;
  justify-content: space-between;
  padding-inline: 16px !important;
}
.full-route-segment :deep(.v-btn__content) {
  width: 100%;
  justify-content: flex-start;
}
.full-route-segment span {
  display: grid;
  gap: 3px;
  text-align: left;
}
.full-route-segment small {
  color: rgba(var(--v-theme-on-surface), 0.56);
  font-size: 0.7rem;
}
.full-route-segment strong {
  overflow: hidden;
  max-width: 100%;
  font-size: 0.86rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chapters {
  margin-top: 42px;
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 18px;
}
.section-heading h2 {
  font-size: 1.75rem;
  letter-spacing: -0.04em;
}
.section-heading > span {
  display: grid;
  min-width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  border-radius: 50%;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
  font-size: 0.9rem;
  font-weight: 720;
}
.chapter-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 14px;
}
.chapter-column {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 14px;
}
.chapter {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(var(--chapter-accent), 0.23);
  border-radius: var(--app-radius-md);
  background:
    radial-gradient(circle at 0 0, rgba(var(--chapter-accent), 0.14), transparent 52%),
    linear-gradient(145deg, rgba(var(--chapter-accent), 0.045), rgb(var(--v-theme-surface)) 65%);
  box-shadow: 0 9px 30px rgba(0, 0, 0, 0.07);
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;
}
.chapter:before {
  content: '';
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, rgb(var(--chapter-accent)), rgba(var(--chapter-accent), 0.2));
}
.chapter:hover,
.chapter.open {
  border-color: rgba(var(--chapter-accent), 0.62);
  box-shadow: 0 20px 52px rgba(var(--chapter-accent), 0.14);
  transform: translateY(-2px);
}
.chapter.current {
  border-color: rgba(var(--v-theme-secondary), 0.58);
}
.chapter.completed {
  border-left: 6px solid rgb(var(--v-theme-primary));
  filter: saturate(0.82);
  box-shadow:
    inset 10px 0 24px rgba(var(--v-theme-primary), 0.08),
    0 9px 30px rgba(0, 0, 0, 0.07);
}
.chapter.skipped {
  border-left: 6px solid rgb(var(--v-theme-warning));
  filter: saturate(0.7);
}
.drawer-summary {
  display: grid;
  width: 100%;
  grid-template-columns: 52px minmax(0, 1fr) 28px 28px;
  align-items: center;
  gap: 10px;
  padding: 22px 20px 16px;
  border: 0;
  color: inherit;
  text-align: left;
  background: transparent;
  cursor: pointer;
}
.chapter-id {
  display: grid;
  gap: 4px;
  color: rgb(var(--chapter-accent));
  font-size: 1.08rem;
  font-weight: 860;
  letter-spacing: 0.04em;
  text-shadow: 0 0 24px rgba(var(--chapter-accent), 0.22);
}
.chapter-id small {
  color: rgba(var(--chapter-accent), 0.78);
  font-size: 0.62rem;
  font-weight: 780;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.chapter-title {
  display: grid;
  min-width: 0;
  gap: 5px;
}
.chapter-title strong {
  overflow: hidden;
  font-size: 1.14rem;
  letter-spacing: -0.025em;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chapter-title small {
  overflow: hidden;
  color: rgba(var(--v-theme-on-surface), 0.62);
  font-size: 0.82rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.stage-complete-label {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 2px;
  color: rgb(var(--v-theme-primary));
  font-size: 0.74rem;
  font-weight: 780;
}
.stage-complete-label.skipped {
  color: rgb(var(--v-theme-warning));
}
.stage-complete-label .v-icon {
  font-size: 1rem;
}
.chapter-favorite {
  grid-column: 3;
  justify-self: center;
  color: #f04f65;
  filter: drop-shadow(0 4px 10px rgba(240, 79, 101, 0.32));
  font-size: 1.3rem;
}
.drawer-chevron {
  grid-column: 4;
  justify-self: end;
  color: rgb(var(--chapter-accent));
  transition: transform 0.22s;
}
.chapter.open .drawer-chevron {
  transform: rotate(180deg);
}
.chapter-quick-detail {
  width: calc(100% - 40px);
  min-height: 42px;
  margin: 0 20px 18px;
  background: rgba(var(--chapter-accent), 0.12) !important;
  color: rgb(var(--chapter-accent)) !important;
}
.drawer-content {
  padding: 0 20px 20px;
  border-top: 1px solid rgba(var(--chapter-accent), 0.16);
}
.drawer-status {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
.overview {
  margin-top: 14px;
  color: rgba(var(--v-theme-on-surface), 0.74);
  font-size: 0.94rem;
  line-height: 1.6;
}
.chapter-data {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 18px 0 0;
  padding: 17px 0 0;
  border-top: 1px solid rgba(var(--chapter-accent), 0.14);
}
.chapter-data span,
.chapter-data strong {
  display: block;
}
.chapter-data span {
  color: rgba(var(--chapter-accent), 0.84);
  font-size: 0.75rem;
}
.chapter-data strong {
  margin-top: 4px;
  font-size: 0.9rem;
}
@media (max-width: 1180px) {
  .summary-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .summary-grid .featured {
    grid-column: span 2;
  }
}
@media (max-width: 1100px) {
  .chapter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 760px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .summary-grid .featured {
    grid-column: span 1;
  }
  .progress-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .chapter-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 580px) {
  .trip-summary {
    padding: 20px;
  }
  .trip-summary header {
    align-items: flex-start;
  }
  .open-map-action {
    min-width: 50px !important;
    width: 50px;
    height: 50px;
    padding: 0 !important;
  }
  .open-map-action span {
    display: none;
  }
  .open-map-action :deep(.v-btn__content) {
    width: 100%;
    height: 100%;
    gap: 0;
  }
  .open-map-action .v-icon {
    font-size: 1.35rem;
  }
  .summary-grid {
    gap: 9px;
  }
  .summary-grid .featured {
    grid-column: span 2;
  }
  .summary-grid > div {
    padding: 15px;
  }
  .drawer-summary {
    grid-template-columns: 46px minmax(0, 1fr) 24px 24px;
    gap: 8px;
    padding: 18px 16px;
  }
  .drawer-content {
    padding: 0 16px 17px;
  }
  .chapters {
    margin-top: 34px;
  }
}
</style>
