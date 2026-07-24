<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AppMap from '@/components/map/AppMap.vue'
import type { PhotoAsset } from '@/content/types'
import { adminContentService } from '@/domains/admin/services/adminContentService'
import { mapService } from '@/services/mapService'
import { useTripStore } from '@/stores/trip'

const { t, d } = useI18n(); const route = useRoute(); const store = useTripStore()
const stop = computed(() => store.stopById(String(route.params.stopId)))
const campingSpots = computed(() => stop.value ? store.campingSpotsForStop(stop.value.id) : [])
const activities = computed(() => stop.value ? store.activitiesForStop(stop.value.id) : [])
const notes = computed(() => activities.value.filter(item => item.type === 'note'))
const hiddenPlaces = computed(() => activities.value.filter(item => item.type === 'hidden_place'))
const selectedPhoto = ref<PhotoAsset>()
const isEditor = ref(false)
const routeStops = computed(() => stop.value ? store.stopsForRoute(stop.value.routeId) : [])
const stopIndex = computed(() => routeStops.value.findIndex(item => item.id === stop.value?.id))
const navigationUrl = computed(() => stop.value ? mapService.externalRouteUrl([
  stopIndex.value > 0 ? mapService.coordinate(routeStops.value[stopIndex.value - 1]!.coordinates) : null,
  mapService.coordinate(stop.value.coordinates),
  stopIndex.value >= 0 && stopIndex.value < routeStops.value.length - 1 ? mapService.coordinate(routeStops.value[stopIndex.value + 1]!.coordinates) : null
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
function score(value: number | null): string { return value === null ? t('common.unknown') : `${value}/5` }
function level(value: string | null | undefined): string { return value ? t(`common.${value}`) : t('common.unknown') }
onMounted(async () => {
  try {
    isEditor.value = Boolean(await adminContentService.currentUser())
  } catch {
    isEditor.value = false
  }
})
</script>

<template>
  <main v-if="stop" class="stop-detail">
    <section class="cover">
      <img v-if="stop.photos[0]" :src="stop.photos[0].url" :alt="stop.photos[0].caption || t(stop.photos[0].alt)" />
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
      <section v-if="stop.photos.length" class="photo-strip" :aria-label="t('gallery.title')"><button v-for="photo in stop.photos" :key="photo.id" type="button" @click="selectedPhoto=photo"><img :src="photo.url" :alt="photo.caption || t(photo.alt)" loading="lazy" /></button></section>

      <section class="intro">
        <p>{{ t(stop.overview) }}</p>
        <div class="summary-row">
          <div><v-icon icon="mdi-weather-night" /><strong>{{ stop.recommendedNights }}</strong><span>{{ t('common.nights') }}</span></div>
          <div v-if="stop.internetScore!==null"><v-icon icon="mdi-wifi" /><strong>{{ score(stop.internetScore) }}</strong><span>{{ t('stop.internet') }}</span></div>
          <div v-if="stop.ducatoAccessibility!==null"><v-icon icon="mdi-van-utility" /><strong>{{ level(stop.ducatoAccessibility) }}</strong><span>{{ t('stop.ducatoAccess') }}</span></div>
        </div>
        <div class="stage-completion" :class="{ completed: stop.status === 'visited' }">
          <v-checkbox-btn
            :model-value="stop.status === 'visited'"
            color="primary"
            :aria-label="t('stop.stageComplete')"
            @update:model-value="store.toggleVisited(stop.id)"
          />
          <div>
            <strong>{{ t('stop.stageComplete') }}</strong>
            <span>{{ t('stop.stageCompleteHint') }}</span>
          </div>
        </div>
      </section>

      <v-expansion-panels class="detail-panels" multiple variant="accordion">
        <v-expansion-panel>
          <v-expansion-panel-title><v-icon icon="mdi-compass-outline" />{{ t('stop.whyVisit') }}</v-expansion-panel-title>
          <v-expansion-panel-text><p class="body-copy">{{ t(stop.whyVisit) }}</p><div v-if="hiddenPlaces.length" class="stack-list"><div v-for="item in hiddenPlaces" :key="item.id"><strong>{{ t(item.title) }}</strong><p>{{ t(item.description) }}</p></div></div></v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="campingSpots.length">
          <v-expansion-panel-title><v-icon icon="mdi-tent" />{{ t('stop.campOptions') }}<v-chip size="x-small">{{ campingSpots.length }}</v-chip></v-expansion-panel-title>
          <v-expansion-panel-text><div class="stack-list"><div v-for="spot in campingSpots" :key="spot.id"><div class="list-heading"><strong>{{ t(spot.title) }}</strong><v-chip size="x-small">{{ t(`common.${spot.type}`) }}</v-chip></div><p>{{ t(spot.overview) }}</p><small>{{ t(spot.accessNote) }}</small></div></div></v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="hasEssentials">
          <v-expansion-panel-title><v-icon icon="mdi-shower" />{{ t('stop.essentials') }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="facility-grid">
              <template v-if="stop.municipalityFacilities.available">
                <div><v-icon icon="mdi-shower" /><span>{{ t('stop.shower') }}</span><strong>{{ stop.municipalityFacilities.shower?t('common.yes'):t('common.no') }}</strong></div>
                <div><v-icon icon="mdi-toilet" /><span>{{ t('stop.wc') }}</span><strong>{{ stop.municipalityFacilities.wc?t('common.yes'):t('common.no') }}</strong></div>
              </template>
              <div v-for="service in availableServices" :key="service.key"><v-icon :icon="service.icon" /><span>{{ t(`stop.${service.key}`) }}</span><strong>{{ t(service.value.name) }}</strong></div>
            </div>
            <p v-if="stop.municipalityFacilities.available" class="source-copy">{{ t(stop.municipalityFacilities.notes) }}</p>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="conditionItems.length">
          <v-expansion-panel-title><v-icon icon="mdi-signal" />{{ t('stop.conditions') }}</v-expansion-panel-title>
          <v-expansion-panel-text><div class="condition-list"><div v-for="item in conditionItems" :key="item.key"><span>{{ t(`stop.${item.key}`) }}</span><strong>{{ item.value }}</strong></div></div></v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="stop.roadWarnings.length">
          <v-expansion-panel-title><v-icon icon="mdi-alert-outline" />{{ t('stop.roadWarnings') }}<v-chip size="x-small" color="warning">{{ stop.roadWarnings.length }}</v-chip></v-expansion-panel-title>
          <v-expansion-panel-text><div class="warning-list"><p v-for="warning in stop.roadWarnings" :key="warning"><v-icon icon="mdi-alert-circle-outline" />{{ t(warning) }}</p></div></v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title><v-icon icon="mdi-camera-iris" />{{ t('stop.photography') }}</v-expansion-panel-title>
          <v-expansion-panel-text><div class="sun-grid"><div><v-icon icon="mdi-weather-sunset-up" /><span>{{ t('stop.sunrise') }}</span><p>{{ t(stop.bestSunrise) }}</p></div><div><v-icon icon="mdi-weather-sunset-down" /><span>{{ t('stop.sunset') }}</span><p>{{ t(stop.bestSunset) }}</p></div></div><div v-if="stop.lunaUltraRecommendations.length" class="stack-list"><div v-for="tip in stop.lunaUltraRecommendations" :key="tip.subject"><strong>{{ t(tip.subject) }}</strong><p>{{ t(tip.lens) }} · {{ t(tip.timing) }}</p><small>{{ t(tip.fieldNote) }}</small></div></div></v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="notes.length">
          <v-expansion-panel-title><v-icon icon="mdi-notebook-outline" />{{ t('stop.ourNotes') }}</v-expansion-panel-title>
          <v-expansion-panel-text><div class="stack-list"><div v-for="note in notes" :key="note.id"><strong>{{ t(note.title) }}</strong><p>{{ t(note.description) }}</p></div></div></v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel v-if="stop.experience?.isPublished && stop.experience.body">
          <v-expansion-panel-title>
            <v-icon icon="mdi-book-open-page-variant-outline" />{{ t('stop.ourExperience') }}
            <v-chip size="x-small">{{ stop.experience.locale.toUpperCase() }}</v-chip>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <p class="experience-copy">{{ stop.experience.body }}</p>
            <p v-if="stop.experience.authorName" class="experience-author">
              <v-icon icon="mdi-account-outline" />
              {{ t('stop.experienceBy', {
                name: stop.experience.authorName,
                date: d(new Date(stop.experience.updatedAt), { dateStyle: 'medium', timeStyle: 'short' })
              }) }}
            </p>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <section class="detail-map-section"><div class="map-section-title"><v-icon icon="mdi-map-outline" /><div><strong>{{ t('stop.interactiveMap') }}</strong><p>{{ t('map.subtitle') }}</p></div></div><div class="detail-map"><AppMap :stops="detailMapStops" :selected-id="stop.id" compact /></div></section>
    </div>

    <div class="navigation-bar"><v-btn block color="primary" size="x-large" prepend-icon="mdi-navigation-variant" :href="navigationUrl" target="_blank" rel="noopener" :disabled="!navigationUrl">{{ t('map.navigate') }}</v-btn></div>
    <v-dialog :model-value="Boolean(selectedPhoto)" fullscreen transition="dialog-bottom-transition" @update:model-value="value=>{if(!value)selectedPhoto=undefined}"><v-card class="photo-viewer"><v-btn icon="mdi-close" :aria-label="t('common.close')" @click="selectedPhoto=undefined" /><img v-if="selectedPhoto" :src="selectedPhoto.url" :alt="selectedPhoto.caption || t(selectedPhoto.alt)" /><p v-if="selectedPhoto?.caption">{{ selectedPhoto.caption }}</p></v-card></v-dialog>
  </main>
</template>

<style scoped>
.stop-detail{width:100%;min-height:100dvh;padding-bottom:calc(104px + env(safe-area-inset-bottom));background:transparent}.cover{position:relative;height:clamp(320px,38vw,510px);overflow:hidden;background:#17191d}.cover>img,.cover-shade,.cover-placeholder{position:absolute;inset:0;width:100%;height:100%}.cover>img{object-fit:cover}.cover-placeholder{display:grid;place-items:center;color:rgba(255,255,255,.3);background:radial-gradient(circle at 70% 20%,rgba(168,182,200,.18),transparent 35%),linear-gradient(145deg,#14161a,#2b2f37)}.cover-shade{background:linear-gradient(180deg,rgba(5,6,8,.38),transparent 36%,rgba(5,6,8,.9))}.cover-upload{position:absolute!important;z-index:2;left:50%;top:50%;min-height:52px!important;transform:translate(-50%,-50%);white-space:nowrap;box-shadow:0 16px 38px rgba(0,0,0,.28)!important}.back,.favorite{position:absolute;top:max(16px,env(safe-area-inset-top));width:48px!important;height:48px!important;color:white!important;background:rgba(14,16,19,.62)!important;box-shadow:0 12px 35px rgba(0,0,0,.22)!important;backdrop-filter:blur(20px)}.back{left:clamp(16px,2.5vw,40px)}.favorite{right:clamp(16px,2.5vw,40px)}.cover-copy{position:absolute;left:clamp(20px,3vw,52px);right:20px;bottom:clamp(22px,3vw,46px);color:white}.cover-copy p{font-size:.84rem;font-weight:720;opacity:.74;text-transform:uppercase;letter-spacing:.1em}.cover-copy h1{margin-top:7px;font-size:clamp(2.35rem,5vw,4.5rem);line-height:.98;letter-spacing:-.055em}.content{width:100%;padding:0 clamp(16px,2.8vw,48px)}.photo-strip{display:flex;gap:12px;margin:20px 0 0;padding:0 0 6px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.photo-strip::-webkit-scrollbar{display:none}.photo-strip button{flex:0 0 82%;height:220px;padding:0;border:0;border-radius:var(--app-radius-md);overflow:hidden;scroll-snap-align:center;background:rgb(var(--v-theme-surface));box-shadow:0 12px 38px rgba(0,0,0,.13)}.photo-strip img{width:100%;height:100%;object-fit:cover}.intro{padding:30px 4px 26px}.intro>p{max-width:1050px;color:rgba(var(--v-theme-on-background),.82);font-size:clamp(1.05rem,1.4vw,1.25rem);line-height:1.7}.summary-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:24px}.summary-row>div{min-width:0;padding:18px 16px;border:1px solid rgba(var(--v-border-color),.11);border-radius:var(--app-radius-md);background:rgb(var(--v-theme-surface));box-shadow:0 10px 30px rgba(0,0,0,.07)}.summary-row .v-icon{display:block;margin-bottom:13px;font-size:1.35rem;color:rgb(var(--v-theme-primary))}.summary-row strong,.summary-row span{display:block;overflow:hidden;text-overflow:ellipsis}.summary-row strong{font-size:1.08rem;white-space:nowrap}.summary-row span{margin-top:5px;color:rgba(var(--v-theme-on-surface),.58);font-size:.78rem}
.stage-completion{display:flex;align-items:center;gap:12px;max-width:620px;margin-top:18px;padding:14px 18px;border:1px solid rgba(var(--v-border-color),.12);border-radius:18px;background:rgba(var(--v-theme-on-surface),.035);transition:border-color .2s,background .2s}.stage-completion.completed{border-color:rgba(var(--v-theme-primary),.52);background:rgba(var(--v-theme-primary),.1)}.stage-completion strong,.stage-completion span{display:block}.stage-completion strong{font-size:.98rem}.stage-completion span{margin-top:3px;color:rgba(var(--v-theme-on-background),.58);font-size:.82rem;line-height:1.4}.detail-panels{overflow:hidden;border:1px solid rgba(var(--v-border-color),.11);border-radius:var(--app-radius-md);box-shadow:0 12px 38px rgba(0,0,0,.08)}.detail-panels :deep(.v-expansion-panel-title){min-height:70px;gap:14px;padding:18px 20px;font-size:1rem;font-weight:740}.detail-panels :deep(.v-expansion-panel-title .v-icon){font-size:1.3rem;color:rgb(var(--v-theme-primary))}.detail-panels :deep(.v-expansion-panel-title .v-chip){margin-left:auto}.detail-panels :deep(.v-expansion-panel-text__wrapper){padding:0 20px 24px}.body-copy{color:rgba(var(--v-theme-on-surface),.8);font-size:1rem;line-height:1.7}.empty-copy,.source-copy{color:rgba(var(--v-theme-on-surface),.62);font-size:.9rem;line-height:1.6}.source-copy{margin-top:16px;overflow-wrap:anywhere}.stack-list{display:grid;gap:12px}.stack-list>div{padding:17px;border:1px solid rgba(var(--v-border-color),.07);border-radius:var(--app-radius-sm);background:rgba(var(--v-theme-on-surface),.045)}.stack-list strong{font-size:.98rem}.stack-list p,.stack-list small{display:block;margin-top:7px;color:rgba(var(--v-theme-on-surface),.68);font-size:.92rem;line-height:1.58}.list-heading{display:flex;justify-content:space-between;gap:10px}.facility-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.facility-grid>div{padding:16px;border:1px solid rgba(var(--v-border-color),.06);border-radius:var(--app-radius-sm);background:rgba(var(--v-theme-on-surface),.045)}.facility-grid .v-icon{font-size:1.25rem;color:rgb(var(--v-theme-primary))}.facility-grid span,.facility-grid strong{display:block}.facility-grid span{margin-top:10px;color:rgba(var(--v-theme-on-surface),.58);font-size:.78rem}.facility-grid strong{margin-top:4px;font-size:.92rem}.condition-list{display:grid;gap:2px}.condition-list>div{display:flex;justify-content:space-between;gap:14px;padding:15px 0;border-bottom:1px solid rgba(var(--v-border-color),.08);font-size:.95rem}.condition-list>div:last-child{border:0}.warning-list{display:grid;gap:10px}.warning-list p{display:flex;gap:10px;padding:16px;border-radius:var(--app-radius-sm);color:rgb(var(--v-theme-warning));background:rgba(var(--v-theme-warning),.1);font-size:.92rem;line-height:1.55}.sun-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px}.sun-grid>div{padding:16px;border-radius:var(--app-radius-sm);background:rgba(var(--v-theme-on-surface),.045)}.sun-grid .v-icon{font-size:1.3rem;color:rgb(var(--v-theme-secondary))}.sun-grid span{display:block;margin-top:9px;font-size:.78rem}.sun-grid p{margin-top:5px;color:rgba(var(--v-theme-on-surface),.68);font-size:.9rem;line-height:1.5}
.experience-copy{white-space:pre-wrap;overflow-wrap:anywhere;color:rgba(var(--v-theme-on-surface),.84);font-size:1rem;line-height:1.78}.experience-author{display:flex;align-items:center;gap:8px;margin-top:18px;padding-top:15px;border-top:1px solid rgba(var(--v-border-color),.09);color:rgba(var(--v-theme-on-surface),.58);font-size:.84rem;line-height:1.5}.experience-author .v-icon{font-size:1.05rem;color:rgb(var(--v-theme-primary))}.detail-map-section{margin-top:28px;padding-top:32px;border-top:1px solid rgba(var(--v-border-color),.1)}.map-section-title{display:flex;align-items:center;gap:12px;margin-bottom:16px}.map-section-title .v-icon{font-size:1.45rem;color:rgb(var(--v-theme-primary))}.map-section-title strong{font-size:1.08rem}.map-section-title p{margin-top:3px;color:rgba(var(--v-theme-on-background),.6);font-size:.86rem}.detail-map{position:relative;width:100%;height:360px;overflow:hidden;border:1px solid rgba(var(--v-border-color),.12);border-radius:var(--app-radius-md);box-shadow:var(--app-shadow)}.navigation-bar{position:fixed;z-index:9;left:0;bottom:0;width:100%;padding:12px 16px calc(12px + env(safe-area-inset-bottom));border-top:1px solid rgba(var(--v-border-color),.1);background:rgba(var(--v-theme-surface),.9);box-shadow:0 -14px 42px rgba(0,0,0,.14);backdrop-filter:blur(24px) saturate(140%)}.navigation-bar .v-btn{min-height:58px;font-size:1rem}.photo-viewer{position:relative;display:grid;place-items:center;background:#07080a!important}.photo-viewer .v-btn{position:absolute;z-index:2;top:max(14px,env(safe-area-inset-top));right:14px;color:white;background:rgba(0,0,0,.55)}.photo-viewer img{width:100%;height:100%;object-fit:contain}.photo-viewer>p{position:absolute;left:20px;right:20px;bottom:max(24px,env(safe-area-inset-bottom));padding:10px 14px;color:white;text-align:center;background:rgba(0,0,0,.52);border-radius:12px;backdrop-filter:blur(14px)}@media(min-width:700px){.photo-strip button{flex-basis:32%;height:250px}.detail-panels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;border:0;background:transparent;box-shadow:none}.detail-panels :deep(.v-expansion-panel){border:1px solid rgba(var(--v-border-color),.1)!important;border-radius:var(--app-radius-md)!important;box-shadow:0 10px 32px rgba(0,0,0,.07)!important}.detail-map{height:440px}}@media(max-width:520px){.summary-row{gap:8px}.summary-row>div{padding:15px 10px}.summary-row strong{font-size:.96rem}.sun-grid{grid-template-columns:1fr}}

/* Readable, information-first premium scale. */
.stop-detail{padding-bottom:calc(104px + env(safe-area-inset-bottom));background:transparent}.cover{height:360px}.cover-placeholder{background:radial-gradient(circle at 25% 10%,rgba(168,182,200,.22),transparent 38%),linear-gradient(145deg,#14161a,#2b2f37)}.cover-shade{background:linear-gradient(180deg,rgba(5,6,8,.42),transparent 36%,rgba(5,6,8,.9))}.back,.favorite{top:max(16px,env(safe-area-inset-top));min-width:50px;min-height:50px;border:1px solid rgba(255,255,255,.1);background:rgba(14,16,19,.62)!important;backdrop-filter:blur(20px)}.back{left:clamp(16px,2.6vw,44px)}.favorite{right:clamp(16px,2.6vw,44px)}.cover-copy{left:clamp(20px,3vw,56px);bottom:30px}.cover-copy p{font-size:.84rem;font-weight:740;opacity:.76;letter-spacing:.1em}.cover-copy h1{margin-top:7px;font-size:clamp(2.5rem,5vw,4.25rem)}.content{padding-inline:clamp(16px,3vw,56px)}.photo-strip{gap:12px;margin-top:20px}.photo-strip button{height:230px;border-radius:22px;box-shadow:var(--app-shadow)}.intro{padding:30px 4px 26px}.intro>p{max-width:1100px;font-size:1.08rem;line-height:1.7;color:rgba(var(--v-theme-on-background),.82)}.summary-row{gap:12px;margin-top:24px}.summary-row>div{padding:18px 16px;border-radius:var(--app-radius-md);background:linear-gradient(145deg,rgba(var(--v-theme-primary),.06),rgb(var(--v-theme-surface)));box-shadow:0 10px 32px rgba(0,0,0,.08)}.summary-row .v-icon{font-size:1.35rem}.summary-row strong{font-size:1.05rem}.summary-row span{margin-top:5px;font-size:.78rem}
.detail-panels{border-radius:var(--app-radius-md);box-shadow:0 14px 42px rgba(0,0,0,.08)}.detail-panels :deep(.v-expansion-panel-title){min-height:72px;gap:14px;padding:18px 20px;font-size:1.02rem;font-weight:740}.detail-panels :deep(.v-expansion-panel-title .v-icon){font-size:1.3rem;color:rgb(var(--v-theme-primary))}.detail-panels :deep(.v-expansion-panel-text__wrapper){padding:0 20px 24px}.body-copy{font-size:.98rem;line-height:1.72}.empty-copy,.source-copy{font-size:.88rem;line-height:1.6}.stack-list{gap:12px}.stack-list>div{padding:17px;border:1px solid rgba(var(--v-border-color),.07);border-radius:16px}.stack-list strong{font-size:.98rem}.stack-list p,.stack-list small{margin-top:7px;font-size:.9rem;line-height:1.58;color:rgba(var(--v-theme-on-surface),.68)}.facility-grid{gap:10px}.facility-grid>div{padding:16px;border-radius:16px}.facility-grid .v-icon{font-size:1.3rem}.facility-grid span{font-size:.78rem}.facility-grid strong{margin-top:4px;font-size:.9rem}.condition-list>div{padding:15px 0;font-size:.92rem}.warning-list p{padding:16px;font-size:.9rem;line-height:1.58}.sun-grid{gap:10px}.sun-grid>div{padding:16px;border-radius:16px}.sun-grid span{font-size:.78rem}.sun-grid p{font-size:.88rem;line-height:1.5}.detail-map-section{margin-top:30px;padding-top:32px}.map-section-title{gap:12px;margin-bottom:16px;font-size:1.05rem}.map-section-title p{font-size:.82rem}.detail-map{height:360px;border-radius:var(--app-radius-md);box-shadow:var(--app-shadow)}.navigation-bar{padding:12px 16px calc(12px + env(safe-area-inset-bottom));background:rgba(var(--v-theme-surface),.9);box-shadow:0 -16px 42px rgba(0,0,0,.13);backdrop-filter:blur(24px) saturate(140%)}.navigation-bar .v-btn{min-height:58px;font-size:.95rem}
@media(min-width:700px){.cover{height:440px}.photo-strip button{height:270px}.detail-panels{gap:14px;box-shadow:none}.detail-panels :deep(.v-expansion-panel){border-radius:var(--app-radius-md)!important;box-shadow:0 12px 36px rgba(0,0,0,.07)!important}.detail-map{height:440px}.navigation-bar{left:50%;bottom:18px;width:min(680px,calc(100% - 40px));border:1px solid rgba(var(--v-border-color),.13);border-radius:24px;transform:translateX(-50%);box-shadow:var(--app-shadow-float)}}@media(max-width:520px){.cover{height:330px}.summary-row{gap:8px}.summary-row>div{padding:15px 11px}.intro>p{font-size:1rem}.detail-panels :deep(.v-expansion-panel-title){min-height:68px;padding:16px}}
.summary-row span{font-size:.82rem}
.summary-row{max-width:960px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.summary-row>div{display:grid;min-height:86px;grid-template-columns:34px minmax(0,1fr);grid-template-rows:auto auto;align-content:center;column-gap:12px;padding:15px 17px}.summary-row .v-icon{grid-row:1/3;align-self:center;margin:0}.summary-row strong,.summary-row span{grid-column:2;overflow:visible;text-overflow:clip;white-space:normal}.summary-row strong{align-self:end;font-size:1.05rem;line-height:1.3}.summary-row span{align-self:start;margin-top:2px;font-size:.8rem;line-height:1.35}.detail-panels:empty{display:none}@media(max-width:520px){.summary-row{grid-template-columns:1fr}.summary-row>div{min-height:78px}}
</style>
