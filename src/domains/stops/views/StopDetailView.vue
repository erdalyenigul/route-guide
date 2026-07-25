<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import PhotoViewer from '@/components/gallery/PhotoViewer.vue'
import AppMap from '@/components/map/AppMap.vue'
import { adminContentService } from '@/domains/admin/services/adminContentService'
import { mapService } from '@/services/mapService'
import { useTripStore } from '@/stores/trip'
import { formatDateTime } from '@/utils/dateTime'

const { t, locale } = useI18n(); const route = useRoute(); const store = useTripStore()
const stop = computed(() => store.stopById(String(route.params.stopId)))
const localizedExperience = computed(() => {
  if (!stop.value) return undefined
  const activeLocale = locale.value === 'tr' ? 'tr' : 'en'
  return stop.value.experiences?.[activeLocale]
})
const hasPublishedExperience = computed(() => Object.values(stop.value?.experiences ?? {})
  .some(experience => experience?.isPublished && experience.body.trim()))
const campingSpots = computed(() => stop.value ? store.campingSpotsForStop(stop.value.id) : [])
const activities = computed(() => stop.value ? store.activitiesForStop(stop.value.id) : [])
const notes = computed(() => activities.value.filter(item => item.type === 'note'))
const hiddenPlaces = computed(() => activities.value.filter(item => item.type === 'hidden_place'))
const selectedPhotoIndex = ref<number | null>(null)
const viewerPhotos = computed(() => stop.value?.photos.map(photo => ({
  id: photo.id,
  url: photo.url,
  alt: photo.caption || t(photo.alt),
  caption: photo.caption
})) ?? [])
const isEditor = ref(false)
const completionDialog = ref(false)
const stayedNightsInput = ref(0)
const actualDistanceInput = ref(0)
const isSavingCompletion = ref(false)
const detailColumnCount = ref(1)
const routeStops = computed(() => stop.value ? store.stopsForRoute(stop.value.routeId) : [])
const stopIndex = computed(() => routeStops.value.findIndex(item => item.id === stop.value?.id))
const isRouteOrigin = computed(() => stopIndex.value === 0)
const isRouteDestination = computed(() => stopIndex.value === routeStops.value.length - 1)
const isAccommodationStop = computed(() => !isRouteOrigin.value && !isRouteDestination.value)
const previousDetailStop = computed(() => stopIndex.value > 0 ? routeStops.value[stopIndex.value - 1] : undefined)
const nextDetailStop = computed(() => stopIndex.value >= 0 && stopIndex.value < routeStops.value.length - 1 ? routeStops.value[stopIndex.value + 1] : undefined)
const navigationUrl = computed(() => stop.value ? mapService.externalRouteUrl([
  previousDetailStop.value ? mapService.coordinate(previousDetailStop.value.coordinates) : null,
  mapService.coordinate(stop.value.coordinates)
]) : undefined)
const detailMapStops = computed(() => routeStops.value.map(item => ({ id: item.id, label: t(item.title), status: item.status, coordinate: mapService.coordinate(item.coordinates) })))
const services = computed(() => stop.value ? [
  { key: 'water', icon: 'mdi-water-outline', value: stop.value.waterRefill },
  { key: 'dumpStation', icon: 'mdi-delete-empty-outline', value: stop.value.dumpStation },
  { key: 'market', icon: 'mdi-cart-outline', value: stop.value.nearbyMarket },
  { key: 'fuel', icon: 'mdi-gas-station-outline', value: stop.value.fuelStation }
] : [])
const availableServices = computed(() => services.value.filter(service => service.value.available))
const hasEssentials = computed(() => Boolean(stop.value?.municipalityFacilities.available || availableServices.value.length))
const conditionItems = computed(() => stop.value ? [
  stop.value.internetScore === null ? null : { key: 'internet', value: score(stop.value.internetScore) },
  stop.value.ducatoAccessibility === null ? null : { key: 'ducatoAccess', value: level(stop.value.ducatoAccessibility) },
  stop.value.solarSuitability === null ? null : { key: 'solar', value: level(stop.value.solarSuitability) },
  stop.value.droneSuitability === null ? null : { key: 'drone', value: level(stop.value.droneSuitability) }
].filter((item): item is { key: string; value: string } => item !== null) : [])
type DetailSectionKey = 'why' | 'camping' | 'essentials' | 'conditions' | 'warnings' | 'photography' | 'notes' | 'experience'
interface DetailSection {
  key: DetailSectionKey
  icon: string
  title: string
  badge?: string | number
  badgeColor?: string
}
const detailSections = computed<DetailSection[]>(() => {
  if (!stop.value) return []
  const sections: DetailSection[] = [{ key: 'why', icon: 'mdi-compass-outline', title: 'stop.whyVisit' }]
  if (campingSpots.value.length) sections.push({ key: 'camping', icon: 'mdi-tent', title: 'stop.campOptions', badge: campingSpots.value.length })
  if (hasEssentials.value) sections.push({ key: 'essentials', icon: 'mdi-shower', title: 'stop.essentials' })
  if (conditionItems.value.length) sections.push({ key: 'conditions', icon: 'mdi-signal', title: 'stop.conditions' })
  if (stop.value.roadWarnings.length) sections.push({ key: 'warnings', icon: 'mdi-alert-outline', title: 'stop.roadWarnings', badge: stop.value.roadWarnings.length, badgeColor: 'warning' })
  sections.push({ key: 'photography', icon: 'mdi-camera-iris', title: 'stop.photography' })
  if (notes.value.length) sections.push({ key: 'notes', icon: 'mdi-notebook-outline', title: 'stop.ourNotes' })
  if (hasPublishedExperience.value) {
    sections.push({ key: 'experience', icon: 'mdi-book-open-page-variant-outline', title: 'stop.ourExperience', badge: (locale.value === 'tr' ? 'TR' : 'EN') })
  }
  return sections
})
const detailColumns = computed(() => {
  const columns = Array.from({ length: detailColumnCount.value }, () => [] as DetailSection[])
  detailSections.value.forEach((section, index) => columns[index % detailColumnCount.value]?.push(section))
  return columns
})
function score(value: number | null): string { return value === null ? t('common.unknown') : `${value}/5` }
function level(value: string | null | undefined): string { return value ? t(`common.${value}`) : t('common.unknown') }
function updateDetailColumnCount(): void {
  detailColumnCount.value = window.innerWidth >= 700 ? 2 : 1
}
function openCompletionEditor(): void {
  if (!isEditor.value || !stop.value) return
  stayedNightsInput.value = stop.value.nightsStayed ?? stop.value.recommendedNights
  actualDistanceInput.value = stop.value.actualDistanceKm ?? stop.value.drivingDistanceFromPreviousKm ?? 0
  completionDialog.value = true
}
async function updateStageCompletion(completed: boolean | null): Promise<void> {
  if (!isEditor.value || !stop.value) return
  if (completed) {
    openCompletionEditor()
    return
  }
  isSavingCompletion.value = true
  try {
    await store.setStopCompletion(stop.value.id, false, null, null)
  } finally {
    isSavingCompletion.value = false
  }
}
async function saveCompletion(): Promise<void> {
  if (!isEditor.value || !stop.value) return
  const nights = isAccommodationStop.value ? Math.min(Math.max(Math.trunc(Number(stayedNightsInput.value) || 0), 0), 365) : null
  const distance = isRouteOrigin.value ? null : Math.min(Math.max(Math.trunc(Number(actualDistanceInput.value) || 0), 0), 5000)
  isSavingCompletion.value = true
  try {
    await store.setStopCompletion(stop.value.id, true, nights, distance)
    completionDialog.value = false
  } finally {
    isSavingCompletion.value = false
  }
}
onMounted(async () => {
  updateDetailColumnCount()
  window.addEventListener('resize', updateDetailColumnCount)
  try {
    isEditor.value = Boolean(await adminContentService.currentUser())
  } catch {
    isEditor.value = false
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', updateDetailColumnCount)
})
</script>

<template>
  <main v-if="stop" class="stop-detail">
    <section class="cover">
      <button v-if="stop.photos[0]" class="cover-photo-trigger" type="button" :aria-label="t('gallery.openPhoto')" @click="selectedPhotoIndex=0">
        <img :src="stop.photos[0].url" :alt="stop.photos[0].caption || t(stop.photos[0].alt)" />
      </button>
      <div v-else class="cover-placeholder"><v-icon icon="mdi-image-outline" size="48" /></div>
      <div class="cover-shade" />
      <v-btn
        v-if="isEditor && !stop.photos.length"
        class="cover-upload"
        color="primary"
        size="large"
        prepend-icon="mdi-image-plus-outline"
        :to="`/manage/stops/${stop.slug}`"
      >
        {{ t('admin.uploadCoverPhoto') }}
      </v-btn>
      <v-btn class="back" icon="mdi-chevron-left" size="large" :aria-label="t('nav.back')" @click="$router.back()" />
      <v-btn class="favorite" :icon="stop.favorite?'mdi-heart':'mdi-heart-outline'" size="large" :aria-label="t(stop.favorite?'stop.unfavorite':'stop.favorite')" @click="store.toggleFavorite(stop.id)" />
      <div class="cover-copy"><p>{{ t(stop.region) }}</p><h1>{{ t(stop.title) }}</h1></div>
    </section>

    <div class="content">
      <section v-if="stop.photos.length" class="photo-strip" :aria-label="t('gallery.title')"><button v-for="(photo,index) in stop.photos" :key="photo.id" type="button" :aria-label="t('gallery.openPhoto')" @click="selectedPhotoIndex=index"><img :src="photo.url" :alt="photo.caption || t(photo.alt)" loading="lazy" /></button></section>

      <section class="intro">
        <p>{{ t(stop.overview) }}</p>
        <div class="summary-row">
          <div class="stage-completion" :class="{ completed: stop.status === 'visited' }">
            <v-checkbox-btn
              class="stage-checkbox"
              :class="{ editable: isEditor }"
              :model-value="stop.status === 'visited'"
              color="primary"
              true-icon="mdi-checkbox-marked"
              false-icon="mdi-checkbox-blank-outline"
              :readonly="!isEditor"
              :aria-label="t('stop.stageComplete')"
              :title="t(isEditor ? 'stop.stageCompleteEditableHint' : 'stop.stageCompleteReadOnlyHint')"
              @update:model-value="updateStageCompletion"
            />
            <div class="stage-completion-copy">
              <strong>{{ t('stop.stageComplete') }}</strong>
              <span v-if="stop.status === 'visited'">
                <template v-if="isRouteOrigin">{{ t('stop.routeOriginCompleted') }}</template>
                <template v-else-if="isRouteDestination">{{ t('stop.routeDestinationCompleted', { distance: stop.actualDistanceKm ?? 0 }) }}</template>
                <template v-else>{{ t('stop.completionSummary', { nights: stop.nightsStayed ?? 0, distance: stop.actualDistanceKm ?? 0 }) }}</template>
              </span>
              <span v-else>{{ t('common.upcoming') }}</span>
            </div>
            <v-btn
              v-if="isEditor && stop.status === 'visited'"
              class="completion-edit"
              icon="mdi-pencil-outline"
              size="small"
              variant="text"
              :aria-label="t('stop.editCompletion')"
              :title="t('stop.editCompletion')"
              @click="openCompletionEditor"
            />
          </div>
          <div v-if="isAccommodationStop"><v-icon icon="mdi-weather-night" /><strong>{{ stop.recommendedNights }}</strong><span>{{ t('common.nights') }}</span></div>
          <div v-if="stop.internetScore!==null"><v-icon icon="mdi-wifi" /><strong>{{ score(stop.internetScore) }}</strong><span>{{ t('stop.internet') }}</span></div>
          <div v-if="stop.ducatoAccessibility!==null"><v-icon icon="mdi-van-utility" /><strong>{{ level(stop.ducatoAccessibility) }}</strong><span>{{ t('stop.ducatoAccess') }}</span></div>
        </div>
      </section>

      <div class="detail-panels">
        <v-expansion-panels v-for="(column, columnIndex) in detailColumns" :key="columnIndex" class="detail-column" multiple variant="accordion">
          <v-expansion-panel v-for="section in column" :key="section.key" :value="section.key" :class="{ 'experience-panel': section.key === 'experience' }">
            <v-expansion-panel-title>
              <v-icon :icon="section.icon" />{{ t(section.title) }}
              <v-chip v-if="section.badge !== undefined" size="x-small" :color="section.badgeColor">{{ section.badge }}</v-chip>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <template v-if="section.key === 'why'">
                <p class="body-copy">{{ t(stop.whyVisit) }}</p>
                <div v-if="hiddenPlaces.length" class="stack-list"><div v-for="item in hiddenPlaces" :key="item.id"><strong>{{ t(item.title) }}</strong><p>{{ t(item.description) }}</p></div></div>
              </template>
              <div v-else-if="section.key === 'camping'" class="stack-list"><div v-for="spot in campingSpots" :key="spot.id"><div class="list-heading"><strong>{{ t(spot.title) }}</strong><v-chip size="x-small">{{ t(`common.${spot.type}`) }}</v-chip></div><p>{{ t(spot.overview) }}</p><small>{{ t(spot.accessNote) }}</small></div></div>
              <template v-else-if="section.key === 'essentials'">
                <div class="facility-grid">
                  <template v-if="stop.municipalityFacilities.available">
                    <div><v-icon icon="mdi-shower" /><span>{{ t('stop.shower') }}</span><strong>{{ stop.municipalityFacilities.shower?t('common.yes'):t('common.no') }}</strong></div>
                    <div><v-icon icon="mdi-toilet" /><span>{{ t('stop.wc') }}</span><strong>{{ stop.municipalityFacilities.wc?t('common.yes'):t('common.no') }}</strong></div>
                  </template>
                  <div v-for="service in availableServices" :key="service.key"><v-icon :icon="service.icon" /><span>{{ t(`stop.${service.key}`) }}</span><strong>{{ t(service.value.name) }}</strong></div>
                </div>
                <p v-if="stop.municipalityFacilities.available" class="source-copy">{{ t(stop.municipalityFacilities.notes) }}</p>
              </template>
              <div v-else-if="section.key === 'conditions'" class="condition-list"><div v-for="item in conditionItems" :key="item.key"><span>{{ t(`stop.${item.key}`) }}</span><strong>{{ item.value }}</strong></div></div>
              <div v-else-if="section.key === 'warnings'" class="warning-list"><p v-for="warning in stop.roadWarnings" :key="warning"><v-icon icon="mdi-alert-circle-outline" />{{ t(warning) }}</p></div>
              <template v-else-if="section.key === 'photography'">
                <div class="sun-grid"><div><v-icon icon="mdi-weather-sunset-up" /><span>{{ t('stop.sunrise') }}</span><p>{{ t(stop.bestSunrise) }}</p></div><div><v-icon icon="mdi-weather-sunset-down" /><span>{{ t('stop.sunset') }}</span><p>{{ t(stop.bestSunset) }}</p></div></div>
                <div v-if="stop.lunaUltraRecommendations.length" class="stack-list"><div v-for="tip in stop.lunaUltraRecommendations" :key="tip.subject"><strong>{{ t(tip.subject) }}</strong><p>{{ t(tip.lens) }} · {{ t(tip.timing) }}</p><small>{{ t(tip.fieldNote) }}</small></div></div>
              </template>
              <div v-else-if="section.key === 'notes'" class="stack-list"><div v-for="note in notes" :key="note.id"><strong>{{ t(note.title) }}</strong><p>{{ t(note.description) }}</p></div></div>
              <template v-else-if="section.key === 'experience'">
                <p v-if="localizedExperience?.isPublished && localizedExperience.body.trim()" class="experience-copy">{{ localizedExperience.body }}</p>
                <p v-else class="experience-empty">{{ t('stop.experienceMissingLanguage') }}</p>
                <p v-if="localizedExperience?.isPublished && localizedExperience.body.trim() && localizedExperience.authorName" class="experience-author">
                  <v-icon icon="mdi-account-outline" />
                  {{ t('stop.experienceBy', {
                    name: localizedExperience.authorName,
                    date: formatDateTime(localizedExperience.updatedAt)
                  }) }}
                </p>
              </template>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <section class="detail-map-section"><div class="map-section-title"><v-icon icon="mdi-map-outline" /><div><strong>{{ t('stop.interactiveMap') }}</strong><p>{{ t('map.subtitle') }}</p></div></div><div class="detail-map"><AppMap :stops="detailMapStops" :selected-id="stop.id" compact /></div></section>
    </div>

    <nav class="navigation-bar" :aria-label="t('stop.stopNavigation')">
      <v-btn
        v-if="previousDetailStop"
        class="stop-jump"
        variant="tonal"
        :to="{ name: 'stop-detail', params: { routeId: stop.routeId, stopId: previousDetailStop.id } }"
        :aria-label="t('stop.previousStopNamed', { stop: t(previousDetailStop.title) })"
      >
        <v-icon icon="mdi-chevron-left" />
        <span>{{ t('stop.previousStop') }}</span>
      </v-btn>
      <span v-else class="stop-jump-spacer" />
      <v-btn class="directions-action" color="primary" size="x-large" prepend-icon="mdi-navigation-variant" :href="navigationUrl" target="_blank" rel="noopener" :disabled="!navigationUrl">{{ t('map.navigate') }}</v-btn>
      <v-btn
        v-if="nextDetailStop"
        class="stop-jump"
        variant="tonal"
        :to="{ name: 'stop-detail', params: { routeId: stop.routeId, stopId: nextDetailStop.id } }"
        :aria-label="t('stop.nextStopNamed', { stop: t(nextDetailStop.title) })"
      >
        <v-icon icon="mdi-chevron-right" />
        <span>{{ t('stop.nextStop') }}</span>
      </v-btn>
      <span v-else class="stop-jump-spacer" />
    </nav>
    <v-dialog v-model="completionDialog" max-width="440">
      <v-card class="completion-dialog">
        <div class="completion-dialog-heading">
          <v-icon :icon="isAccommodationStop ? 'mdi-weather-night' : 'mdi-map-marker-check-outline'" />
          <div><h2>{{ t('stop.completeStopTitle') }}</h2><p v-if="isAccommodationStop">{{ t('stop.plannedNightsValue', { count: stop.recommendedNights }) }}</p></div>
        </div>
        <v-text-field
          v-if="isAccommodationStop"
          v-model.number="stayedNightsInput"
          type="number"
          min="0"
          max="365"
          step="1"
          inputmode="numeric"
          autofocus
          hide-details
          :label="t('stop.actualNightsStayed')"
          :suffix="t('common.nights')"
        />
        <v-text-field
          v-if="!isRouteOrigin"
          v-model.number="actualDistanceInput"
          class="completion-distance"
          type="number"
          min="0"
          max="5000"
          step="1"
          inputmode="numeric"
          hide-details
          :label="t('stop.actualDistanceTravelled')"
          :hint="t('stop.plannedDistanceValue', { count: stop.drivingDistanceFromPreviousKm ?? 0 })"
          persistent-hint
          :suffix="t('common.km')"
        />
        <div class="completion-dialog-actions">
          <v-btn variant="text" :disabled="isSavingCompletion" @click="completionDialog=false">{{ t('common.cancel') }}</v-btn>
          <v-btn color="primary" prepend-icon="mdi-check" :loading="isSavingCompletion" @click="saveCompletion">{{ t('stop.completeAndSave') }}</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <PhotoViewer v-model="selectedPhotoIndex" :photos="viewerPhotos" />
  </main>
</template>

<style scoped>
.stop-detail{width:100%;min-height:100dvh;padding-bottom:calc(104px + env(safe-area-inset-bottom));background:transparent}.cover{position:relative;height:clamp(320px,38vw,510px);overflow:hidden;background:#17191d}.cover>img,.cover-shade,.cover-placeholder{position:absolute;inset:0;width:100%;height:100%}.cover>img{object-fit:cover}.cover-placeholder{display:grid;place-items:center;color:rgba(255,255,255,.3);background:radial-gradient(circle at 70% 20%,rgba(168,182,200,.18),transparent 35%),linear-gradient(145deg,#14161a,#2b2f37)}.cover-shade{background:linear-gradient(180deg,rgba(5,6,8,.38),transparent 36%,rgba(5,6,8,.9))}.cover-upload{position:absolute!important;z-index:2;left:50%;top:50%;min-height:52px!important;transform:translate(-50%,-50%);white-space:nowrap;box-shadow:0 16px 38px rgba(0,0,0,.28)!important}.back,.favorite{position:absolute;top:max(16px,env(safe-area-inset-top));width:48px!important;height:48px!important;color:white!important;background:rgba(14,16,19,.62)!important;box-shadow:0 12px 35px rgba(0,0,0,.22)!important;backdrop-filter:blur(20px)}.back{left:clamp(16px,2.5vw,40px)}.favorite{right:clamp(16px,2.5vw,40px)}.cover-copy{position:absolute;left:clamp(20px,3vw,52px);right:20px;bottom:clamp(22px,3vw,46px);color:white}.cover-copy p{font-size:.84rem;font-weight:720;opacity:.74;text-transform:uppercase;letter-spacing:.1em}.cover-copy h1{margin-top:7px;font-size:clamp(2.35rem,5vw,4.5rem);line-height:.98;letter-spacing:-.055em}.content{width:100%;padding:0 clamp(16px,2.8vw,48px)}.photo-strip{display:flex;gap:12px;margin:20px 0 0;padding:0 0 6px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.photo-strip::-webkit-scrollbar{display:none}.photo-strip button{flex:0 0 82%;height:220px;padding:0;border:0;border-radius:var(--app-radius-md);overflow:hidden;scroll-snap-align:center;background:rgb(var(--v-theme-surface));box-shadow:0 12px 38px rgba(0,0,0,.13)}.photo-strip img{width:100%;height:100%;object-fit:cover}.intro{padding:30px 4px 26px}.intro>p{max-width:1050px;color:rgba(var(--v-theme-on-background),.82);font-size:clamp(1.05rem,1.4vw,1.25rem);line-height:1.7}.summary-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:24px}.summary-row>div{min-width:0;padding:18px 16px;border:1px solid rgba(var(--v-border-color),.11);border-radius:var(--app-radius-md);background:rgb(var(--v-theme-surface));box-shadow:0 10px 30px rgba(0,0,0,.07)}.summary-row .v-icon{display:block;margin-bottom:13px;font-size:1.35rem;color:rgb(var(--v-theme-primary))}.summary-row strong,.summary-row span{display:block;overflow:hidden;text-overflow:ellipsis}.summary-row strong{font-size:1.08rem;white-space:nowrap}.summary-row span{margin-top:5px;color:rgba(var(--v-theme-on-surface),.58);font-size:.78rem}
.stage-completion{display:flex;align-items:center;gap:12px;max-width:620px;margin-top:18px;padding:14px 18px;border:1px solid rgba(var(--v-border-color),.12);border-radius:18px;background:rgba(var(--v-theme-on-surface),.035);transition:border-color .2s,background .2s}.stage-completion.completed{border-color:rgba(var(--v-theme-primary),.52);background:rgba(var(--v-theme-primary),.1)}.stage-completion strong,.stage-completion span{display:block}.stage-completion strong{font-size:.98rem}.stage-completion span{margin-top:3px;color:rgba(var(--v-theme-on-background),.58);font-size:.82rem;line-height:1.4}.detail-panels{overflow:hidden;border:1px solid rgba(var(--v-border-color),.11);border-radius:var(--app-radius-md);box-shadow:0 12px 38px rgba(0,0,0,.08)}.detail-panels :deep(.v-expansion-panel-title){min-height:70px;gap:14px;padding:18px 20px;font-size:1rem;font-weight:740}.detail-panels :deep(.v-expansion-panel-title .v-icon){font-size:1.3rem;color:rgb(var(--v-theme-primary))}.detail-panels :deep(.v-expansion-panel-title .v-chip){margin-left:auto}.detail-panels :deep(.v-expansion-panel-text__wrapper){padding:0 20px 24px}.body-copy{color:rgba(var(--v-theme-on-surface),.8);font-size:1rem;line-height:1.7}.empty-copy,.source-copy{color:rgba(var(--v-theme-on-surface),.62);font-size:.9rem;line-height:1.6}.source-copy{margin-top:16px;overflow-wrap:anywhere}.stack-list{display:grid;gap:12px}.stack-list>div{padding:17px;border:1px solid rgba(var(--v-border-color),.07);border-radius:var(--app-radius-sm);background:rgba(var(--v-theme-on-surface),.045)}.stack-list strong{font-size:.98rem}.stack-list p,.stack-list small{display:block;margin-top:7px;color:rgba(var(--v-theme-on-surface),.68);font-size:.92rem;line-height:1.58}.list-heading{display:flex;justify-content:space-between;gap:10px}.facility-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.facility-grid>div{padding:16px;border:1px solid rgba(var(--v-border-color),.06);border-radius:var(--app-radius-sm);background:rgba(var(--v-theme-on-surface),.045)}.facility-grid .v-icon{font-size:1.25rem;color:rgb(var(--v-theme-primary))}.facility-grid span,.facility-grid strong{display:block}.facility-grid span{margin-top:10px;color:rgba(var(--v-theme-on-surface),.58);font-size:.78rem}.facility-grid strong{margin-top:4px;font-size:.92rem}.condition-list{display:grid;gap:2px}.condition-list>div{display:flex;justify-content:space-between;gap:14px;padding:15px 0;border-bottom:1px solid rgba(var(--v-border-color),.08);font-size:.95rem}.condition-list>div:last-child{border:0}.warning-list{display:grid;gap:10px}.warning-list p{display:flex;gap:10px;padding:16px;border-radius:var(--app-radius-sm);color:rgb(var(--v-theme-warning));background:rgba(var(--v-theme-warning),.1);font-size:.92rem;line-height:1.55}.sun-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px}.sun-grid>div{padding:16px;border-radius:var(--app-radius-sm);background:rgba(var(--v-theme-on-surface),.045)}.sun-grid .v-icon{font-size:1.3rem;color:rgb(var(--v-theme-secondary))}.sun-grid span{display:block;margin-top:9px;font-size:.78rem}.sun-grid p{margin-top:5px;color:rgba(var(--v-theme-on-surface),.68);font-size:.9rem;line-height:1.5}
.experience-panel{position:relative;overflow:hidden;border-color:rgba(var(--v-theme-primary),.42)!important;background:linear-gradient(135deg,rgba(var(--v-theme-primary),.16),rgba(var(--v-theme-secondary),.08) 48%,rgb(var(--v-theme-surface)) 100%)!important;box-shadow:0 16px 44px rgba(var(--v-theme-primary),.12)!important}.experience-panel:before{position:absolute;z-index:1;top:0;right:0;left:0;height:3px;background:linear-gradient(90deg,rgb(var(--v-theme-primary)),rgb(var(--v-theme-secondary)));content:''}.experience-panel :deep(.v-expansion-panel-title){font-weight:800}.experience-panel :deep(.v-expansion-panel-title>.v-icon){color:rgb(var(--v-theme-primary));filter:drop-shadow(0 0 10px rgba(var(--v-theme-primary),.42))}.experience-panel :deep(.v-chip){color:rgb(var(--v-theme-on-primary));background:rgb(var(--v-theme-primary))!important}.experience-copy{white-space:pre-wrap;overflow-wrap:anywhere;color:rgba(var(--v-theme-on-surface),.92);font-size:1.05rem;line-height:1.82}.experience-empty{padding:18px;border:1px dashed rgba(var(--v-theme-primary),.3);border-radius:16px;color:rgba(var(--v-theme-on-surface),.62);background:rgba(var(--v-theme-primary),.06);font-size:.94rem;line-height:1.55}.experience-author{display:flex;align-items:center;gap:8px;margin-top:18px;padding-top:15px;border-top:1px solid rgba(var(--v-theme-primary),.18);color:rgba(var(--v-theme-on-surface),.64);font-size:.84rem;line-height:1.5}.experience-author .v-icon{font-size:1.05rem;color:rgb(var(--v-theme-primary))}.detail-map-section{margin-top:28px;padding-top:32px;border-top:1px solid rgba(var(--v-border-color),.1)}.map-section-title{display:flex;align-items:center;gap:12px;margin-bottom:16px}.map-section-title .v-icon{font-size:1.45rem;color:rgb(var(--v-theme-primary))}.map-section-title strong{font-size:1.08rem}.map-section-title p{margin-top:3px;color:rgba(var(--v-theme-on-background),.6);font-size:.86rem}.detail-map{position:relative;width:100%;height:360px;overflow:hidden;border:1px solid rgba(var(--v-border-color),.12);border-radius:var(--app-radius-md);box-shadow:var(--app-shadow)}.navigation-bar{position:fixed;z-index:9;left:0;bottom:0;width:100%;padding:12px 16px calc(12px + env(safe-area-inset-bottom));border-top:1px solid rgba(var(--v-border-color),.1);background:rgba(var(--v-theme-surface),.9);box-shadow:0 -14px 42px rgba(0,0,0,.14);backdrop-filter:blur(24px) saturate(140%)}.navigation-bar .v-btn{min-height:58px;font-size:1rem}@media(min-width:700px){.photo-strip button{flex-basis:32%;height:250px}.detail-panels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;border:0;background:transparent;box-shadow:none}.detail-panels :deep(.v-expansion-panel){border:1px solid rgba(var(--v-border-color),.1)!important;border-radius:var(--app-radius-md)!important;box-shadow:0 10px 32px rgba(0,0,0,.07)!important}.detail-panels :deep(.experience-panel){border-color:rgba(var(--v-theme-primary),.42)!important;box-shadow:0 16px 44px rgba(var(--v-theme-primary),.12)!important}.detail-map{height:440px}}@media(max-width:520px){.summary-row{gap:8px}.summary-row>div{padding:15px 10px}.summary-row strong{font-size:.96rem}.sun-grid{grid-template-columns:1fr}}

/* Readable, information-first premium scale. */
.stop-detail{padding-bottom:calc(104px + env(safe-area-inset-bottom));background:transparent}.cover{height:360px}.cover-placeholder{background:radial-gradient(circle at 25% 10%,rgba(168,182,200,.22),transparent 38%),linear-gradient(145deg,#14161a,#2b2f37)}.cover-shade{background:linear-gradient(180deg,rgba(5,6,8,.42),transparent 36%,rgba(5,6,8,.9))}.back,.favorite{top:max(16px,env(safe-area-inset-top));min-width:50px;min-height:50px;border:1px solid rgba(255,255,255,.1);background:rgba(14,16,19,.62)!important;backdrop-filter:blur(20px)}.back{left:clamp(16px,2.6vw,44px)}.favorite{right:clamp(16px,2.6vw,44px)}.cover-copy{left:clamp(20px,3vw,56px);bottom:30px}.cover-copy p{font-size:.84rem;font-weight:740;opacity:.76;letter-spacing:.1em}.cover-copy h1{margin-top:7px;font-size:clamp(2.5rem,5vw,4.25rem)}.content{padding-inline:clamp(16px,3vw,56px)}.photo-strip{gap:12px;margin-top:20px}.photo-strip button{height:230px;border-radius:22px;box-shadow:var(--app-shadow)}.intro{padding:30px 4px 26px}.intro>p{max-width:1100px;font-size:1.08rem;line-height:1.7;color:rgba(var(--v-theme-on-background),.82)}.summary-row{gap:12px;margin-top:24px}.summary-row>div{padding:18px 16px;border-radius:var(--app-radius-md);background:linear-gradient(145deg,rgba(var(--v-theme-primary),.06),rgb(var(--v-theme-surface)));box-shadow:0 10px 32px rgba(0,0,0,.08)}.summary-row .v-icon{font-size:1.35rem}.summary-row strong{font-size:1.05rem}.summary-row span{margin-top:5px;font-size:.78rem}
.detail-panels{border-radius:var(--app-radius-md);box-shadow:0 14px 42px rgba(0,0,0,.08)}.detail-panels :deep(.v-expansion-panel-title){min-height:72px;gap:14px;padding:18px 20px;font-size:1.02rem;font-weight:740}.detail-panels :deep(.v-expansion-panel-title .v-icon){font-size:1.3rem;color:rgb(var(--v-theme-primary))}.detail-panels :deep(.v-expansion-panel-text__wrapper){padding:0 20px 24px}.body-copy{font-size:.98rem;line-height:1.72}.empty-copy,.source-copy{font-size:.88rem;line-height:1.6}.stack-list{gap:12px}.stack-list>div{padding:17px;border:1px solid rgba(var(--v-border-color),.07);border-radius:16px}.stack-list strong{font-size:.98rem}.stack-list p,.stack-list small{margin-top:7px;font-size:.9rem;line-height:1.58;color:rgba(var(--v-theme-on-surface),.68)}.facility-grid{gap:10px}.facility-grid>div{padding:16px;border-radius:16px}.facility-grid .v-icon{font-size:1.3rem}.facility-grid span{font-size:.78rem}.facility-grid strong{margin-top:4px;font-size:.9rem}.condition-list>div{padding:15px 0;font-size:.92rem}.warning-list p{padding:16px;font-size:.9rem;line-height:1.58}.sun-grid{gap:10px}.sun-grid>div{padding:16px;border-radius:16px}.sun-grid span{font-size:.78rem}.sun-grid p{font-size:.88rem;line-height:1.5}.detail-map-section{margin-top:30px;padding-top:32px}.map-section-title{gap:12px;margin-bottom:16px;font-size:1.05rem}.map-section-title p{font-size:.82rem}.detail-map{height:360px;border-radius:var(--app-radius-md);box-shadow:var(--app-shadow)}.navigation-bar{padding:12px 16px calc(12px + env(safe-area-inset-bottom));background:rgba(var(--v-theme-surface),.9);box-shadow:0 -16px 42px rgba(0,0,0,.13);backdrop-filter:blur(24px) saturate(140%)}.navigation-bar .v-btn{min-height:58px;font-size:.95rem}
@media(min-width:700px){.cover{height:440px}.photo-strip button{height:270px}.detail-panels{gap:14px;box-shadow:none}.detail-panels :deep(.v-expansion-panel){border-radius:var(--app-radius-md)!important;box-shadow:0 12px 36px rgba(0,0,0,.07)!important}.detail-map{height:440px}.navigation-bar{left:50%;bottom:18px;width:min(680px,calc(100% - 40px));border:1px solid rgba(var(--v-border-color),.13);border-radius:24px;transform:translateX(-50%);box-shadow:var(--app-shadow-float)}}@media(max-width:520px){.cover{height:330px}.summary-row{gap:8px}.summary-row>div{padding:15px 11px}.intro>p{font-size:1rem}.detail-panels :deep(.v-expansion-panel-title){min-height:68px;padding:16px}}
.summary-row span{font-size:.82rem}
.summary-row{max-width:960px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.summary-row>div{display:grid;min-height:86px;grid-template-columns:58px minmax(0,1fr);grid-template-rows:auto auto;align-content:center;column-gap:14px;padding:15px 17px}.summary-row .v-icon{grid-row:1/3;align-self:center;justify-self:center;margin:0}.summary-row strong,.summary-row span{grid-column:2;overflow:visible;text-overflow:clip;white-space:normal}.summary-row strong{align-self:end;font-size:1.05rem;line-height:1.3}.summary-row span{align-self:start;margin-top:2px;font-size:.8rem;line-height:1.35}.detail-panels:empty{display:none}@media(max-width:520px){.summary-row{grid-template-columns:1fr}.summary-row>div{min-height:78px}}
.detail-panels{display:grid;grid-template-columns:1fr;align-items:start;gap:14px;overflow:visible;border:0;background:transparent;box-shadow:none}.detail-column{align-self:start;overflow:hidden;border:1px solid rgba(var(--v-border-color),.11);border-radius:var(--app-radius-md);box-shadow:0 14px 42px rgba(0,0,0,.08)}.detail-panels :deep(.v-expansion-panel-text__wrapper){padding:20px 20px 26px}
@media(min-width:700px){.detail-panels{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}.detail-column{gap:14px;overflow:visible;border:0;border-radius:0;box-shadow:none}.detail-column :deep(.v-expansion-panel){align-self:start;overflow:hidden;border:1px solid rgba(var(--v-border-color),.1)!important;border-radius:var(--app-radius-md)!important;box-shadow:0 12px 36px rgba(0,0,0,.07)!important}}
.summary-row>.stage-completion{display:grid;max-width:none;min-height:86px;grid-template-columns:58px minmax(0,1fr) auto;grid-template-rows:auto auto;align-content:center;align-items:center;column-gap:14px;margin-top:0;padding:15px 17px}.stage-completion-copy{display:flex;width:100%;min-width:0;grid-column:2;grid-row:1/3;flex-direction:column;align-items:flex-start;justify-content:center}.stage-completion-copy strong,.stage-completion-copy span{width:100%;align-self:flex-start;margin-left:0;text-align:left}.stage-checkbox{grid-column:1;grid-row:1/3;align-self:center;justify-self:center}.stage-checkbox.editable{cursor:pointer}.stage-checkbox :deep(.v-selection-control){min-height:52px}.stage-checkbox :deep(.v-selection-control__input){width:52px;height:52px;border-radius:16px;background:rgba(var(--v-theme-primary),.1)}.stage-checkbox :deep(.v-icon){font-size:2rem!important}.completion-edit{grid-column:3;grid-row:1/3;align-self:center}.summary-row>.stage-completion.completed{border-color:rgba(var(--v-theme-primary),.52);background:linear-gradient(145deg,rgba(var(--v-theme-primary),.15),rgb(var(--v-theme-surface)))}@media(max-width:520px){.summary-row>.stage-completion{min-height:82px;padding:14px}}
.cover-photo-trigger{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;padding:0;border:0;background:transparent;cursor:zoom-in}.cover-photo-trigger img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s ease}.cover-photo-trigger:hover img{transform:scale(1.015)}.cover-shade{z-index:1;pointer-events:none}.cover-copy,.back,.favorite{z-index:2}
.navigation-bar{display:grid;grid-template-columns:82px minmax(0,1fr) 82px;align-items:center;gap:8px}.navigation-bar .v-btn{width:100%;min-width:0;min-height:58px}.directions-action{padding-inline:10px!important}.stop-jump{padding-inline:6px!important}.stop-jump :deep(.v-btn__content){flex-direction:column;gap:1px}.stop-jump .v-icon{font-size:1.25rem}.stop-jump span{font-size:.66rem;line-height:1.1}@media(min-width:700px){.navigation-bar{grid-template-columns:128px minmax(0,1fr) 128px;gap:10px}.stop-jump :deep(.v-btn__content){flex-direction:row;gap:6px}.stop-jump span{font-size:.8rem}}
.completion-dialog{padding:26px;border:1px solid rgba(var(--v-border-color),.12);border-radius:24px!important}.completion-dialog-heading{display:flex;align-items:center;gap:14px;margin-bottom:24px}.completion-dialog-heading>.v-icon{display:grid;width:48px;height:48px;place-items:center;border-radius:15px;color:rgb(var(--v-theme-primary));background:rgba(var(--v-theme-primary),.1);font-size:1.5rem}.completion-dialog-heading h2{font-size:1.35rem;letter-spacing:-.035em}.completion-dialog-heading p{margin-top:3px;color:rgba(var(--v-theme-on-surface),.6);font-size:.86rem}.completion-distance{margin-top:18px}.completion-dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}@media(max-width:430px){.completion-dialog{padding:22px}.completion-dialog-actions{display:grid;grid-template-columns:1fr 1fr}.completion-dialog-actions .v-btn{min-width:0}}
</style>
