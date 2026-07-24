<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { StopViewModel } from '@/content/types'
import { useTripStore } from '@/stores/trip'

const { t } = useI18n(); const store = useTripStore()
const trip = computed(() => store.activeTrip)
const routeId = computed(() => trip.value?.id ?? 'active')
const remainingDistance = computed(() => Math.max(store.totalDistance - store.completedDistance, 0))
const openChapters = ref<string[]>([])
const chapterColumnCount = ref(1)
const chapterAccents = ['93, 125, 169', '191, 139, 79', '126, 103, 174', '171, 85, 113', '72, 134, 160', '154, 112, 88']
const chapterColumns = computed(() => {
  const columns = Array.from(
    { length: chapterColumnCount.value },
    () => [] as Array<{ stop: StopViewModel; index: number }>
  )
  store.activeStops.forEach((stop, index) => columns[index % chapterColumnCount.value]?.push({ stop, index }))
  return columns
})
function text(key?: string): string { return key ? t(key) : t('common.unknown') }
function chapterAccent(index: number): string { return chapterAccents[index % chapterAccents.length] ?? '93, 125, 169' }
function updateChapterColumnCount(): void {
  const width = window.innerWidth
  chapterColumnCount.value = width >= 1680 ? 4 : width > 1100 ? 3 : width > 760 ? 2 : 1
}
function chapterStatus(stop: StopViewModel, index: number): string {
  if (stop.status === 'visited') return 'completed'
  if (stop.status === 'current') return 'current'
  if (index === store.currentStopIndex + 1) return 'next'
  return 'upcoming'
}
function toggleChapter(stopId: string): void {
  openChapters.value = openChapters.value.includes(stopId)
    ? openChapters.value.filter(id => id !== stopId)
    : [...openChapters.value, stopId]
}
onMounted(() => {
  updateChapterColumnCount()
  window.addEventListener('resize', updateChapterColumnCount)
})
onUnmounted(() => window.removeEventListener('resize', updateChapterColumnCount))
</script>

<template>
  <main class="page-shell trip-page">
    <div v-if="store.isLoading" class="state"><v-progress-circular indeterminate color="primary" /><span>{{ t('home.title') }}</span></div>
    <v-alert v-else-if="store.loadError" type="error" variant="tonal" class="state"><h2>{{ t('home.dataUnavailable') }}</h2><p>{{ t('home.dataUnavailableHint') }}</p><v-btn color="primary" @click="store.initialize">{{ t('home.retry') }}</v-btn></v-alert>
    <v-card v-else-if="!trip" class="state"><v-icon icon="mdi-database-alert-outline" size="40" /><h2>{{ t('home.noActiveRoute') }}</h2><p>{{ t('home.noActiveRouteHint') }}</p></v-card>

    <template v-else>
      <section class="trip-summary">
        <header><div><p>{{ t('home.title') }}</p><h1>{{ text(trip.title) }}</h1></div><v-btn color="primary" prepend-icon="mdi-map-outline" :to="`/trips/${routeId}/map`">{{ t('home.openMap') }}</v-btn></header>
        <div class="progress-row"><div><span>{{ t('home.routeProgress') }}</span><strong>{{ store.routeProgress }}%</strong></div><v-progress-linear :model-value="store.routeProgress" color="primary" height="7" rounded /></div>
        <div class="summary-grid">
          <div class="featured current"><span>{{ t('home.currentStop') }}</span><strong>{{ text(store.currentStop?.title) }}</strong><small>{{ text(store.currentStop?.region) }}</small></div>
          <div class="featured"><span>{{ t('home.nextStop') }}</span><strong>{{ text(store.nextStop?.title) }}</strong><small>{{ store.nextStop?.drivingDistanceFromPreviousKm ?? '—' }} {{ t('common.km') }}</small></div>
          <div><span>{{ t('home.totalDistance') }}</span><strong>{{ store.totalDistance }} <small>{{ t('common.km') }}</small></strong></div>
          <div><span>{{ t('home.completedDistance') }}</span><strong>{{ store.completedDistance }} <small>{{ t('common.km') }}</small></strong></div>
          <div><span>{{ t('home.remainingDistance') }}</span><strong>{{ remainingDistance }} <small>{{ t('common.km') }}</small></strong></div>
          <div><span>{{ t('home.totalNights') }}</span><strong>{{ store.totalNights }}</strong></div>
          <div><span>{{ t('home.nightsStayed') }}</span><strong>{{ store.nightsStayed }}</strong></div>
          <div><span>{{ t('home.remainingNights') }}</span><strong>{{ store.remainingNights }}</strong></div>
        </div>
      </section>

      <section class="chapters">
        <div class="section-heading"><div><p>{{ t('home.routeChapters') }}</p><h2>{{ t('nav.stops') }}</h2></div><span>{{ store.activeStops.length }}</span></div>
        <div class="chapter-grid">
          <div v-for="(column, columnIndex) in chapterColumns" :key="columnIndex" class="chapter-column">
            <article
              v-for="{ stop, index } in column"
              :key="stop.id"
              class="chapter"
              :class="[chapterStatus(stop,index), { open: openChapters.includes(stop.id) }]"
              :style="{ '--chapter-accent': chapterAccent(index) }"
            >
              <button
                class="drawer-summary"
                type="button"
                :aria-expanded="openChapters.includes(stop.id)"
                :aria-controls="`chapter-${stop.id}`"
                @click="toggleChapter(stop.id)"
              >
                <span class="chapter-id"><small>{{ t('home.stopId') }}</small>{{ String(index+1).padStart(2,'0') }}</span>
                <span class="chapter-title">
                  <strong>{{ t(stop.title) }}</strong>
                  <small>{{ t(stop.region) }}</small>
                  <span v-if="stop.status === 'visited'" class="stage-complete-label"><v-icon icon="mdi-check-circle" />{{ t('stop.stageComplete') }}</span>
                </span>
                <v-icon class="drawer-chevron" icon="mdi-chevron-down" />
              </button>
              <v-btn class="chapter-quick-detail" variant="tonal" append-icon="mdi-arrow-right" :to="`/trips/${routeId}/stops/${stop.id}`">
                {{ t('common.details') }}
              </v-btn>
              <v-expand-transition>
                <div v-show="openChapters.includes(stop.id)" :id="`chapter-${stop.id}`" class="drawer-content">
                  <div class="drawer-status">
                    <v-chip size="small" :color="chapterStatus(stop,index)==='current'?'secondary':chapterStatus(stop,index)==='completed'?'success':undefined">
                      {{ chapterStatus(stop,index)==='completed' ? t('stop.stageComplete') : t(`common.${chapterStatus(stop,index)}`) }}
                    </v-chip>
                  </div>
                  <p class="overview">{{ t(stop.overview) }}</p>
                  <div class="chapter-data">
                    <div><span>{{ t('home.planned') }}</span><strong>{{ stop.recommendedNights }} {{ t('common.nights') }}</strong></div>
                    <div><span>{{ t('home.stayed') }}</span><strong>{{ stop.status==='visited'?stop.recommendedNights:0 }} {{ t('common.nights') }}</strong></div>
                    <div><span>{{ t('trip.distance') }}</span><strong>{{ stop.drivingDistanceFromPreviousKm ?? '—' }} {{ t('common.km') }}</strong></div>
                    <div><span>{{ t('home.driveTime') }}</span><strong>{{ stop.estimatedDriveTimeMinutes ?? '—' }} {{ t('common.min') }}</strong></div>
                  </div>
                </div>
              </v-expand-transition>
            </article>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped>
.trip-page{padding-top:clamp(24px,3vw,48px);padding-bottom:132px}.state{min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center}.trip-summary{position:relative;width:100%;overflow:hidden;padding:clamp(22px,2.8vw,40px);border:1px solid rgba(var(--v-border-color),.13);border-radius:var(--app-radius-lg);background:linear-gradient(135deg,rgba(var(--v-theme-primary),.075),transparent 42%),rgb(var(--v-theme-surface));box-shadow:var(--app-shadow)}.trip-summary:after{content:'';position:absolute;right:-100px;top:-150px;width:360px;height:360px;border-radius:50%;background:rgba(var(--v-theme-primary),.055);filter:blur(30px);pointer-events:none}.trip-summary header{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:18px}.trip-summary header p,.section-heading p{color:rgba(var(--v-theme-on-surface),.58);font-size:.78rem;font-weight:780;letter-spacing:.1em;text-transform:uppercase}.trip-summary h1{margin-top:6px;font-size:clamp(1.8rem,3.4vw,3rem);line-height:1.04;letter-spacing:-.05em}.trip-summary header .v-btn{min-height:48px;padding-inline:20px}.progress-row{position:relative;z-index:1;display:grid;grid-template-columns:170px 1fr;align-items:center;gap:24px;margin-top:32px}.progress-row>div{display:flex;justify-content:space-between;gap:10px;font-size:.9rem}.summary-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:24px}.summary-grid>div{min-width:0;padding:18px;border:1px solid rgba(var(--v-border-color),.1);border-radius:var(--app-radius-md);background:rgba(var(--v-theme-on-surface),.035);backdrop-filter:blur(12px)}.summary-grid .featured{grid-column:span 2}.summary-grid .current{border-color:rgba(var(--v-theme-primary),.38);background:rgba(var(--v-theme-primary),.11)}.summary-grid span,.summary-grid small{display:block;color:rgba(var(--v-theme-on-surface),.6);font-size:.78rem;line-height:1.35}.summary-grid strong{display:block;margin-top:8px;overflow:hidden;font-size:1.3rem;letter-spacing:-.03em;text-overflow:ellipsis;white-space:nowrap}.summary-grid strong small{display:inline;font-size:.78rem}.summary-grid .featured strong{font-size:1.45rem}
.chapters{margin-top:42px}.section-heading{display:flex;align-items:end;justify-content:space-between;margin-bottom:18px}.section-heading h2{font-size:1.75rem;letter-spacing:-.04em}.section-heading>span{display:grid;min-width:36px;height:36px;place-items:center;border:1px solid rgba(var(--v-theme-primary),.2);border-radius:50%;color:rgb(var(--v-theme-primary));background:rgba(var(--v-theme-primary),.1);font-size:.9rem;font-weight:720}.chapter-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:start;gap:14px}.chapter-column{display:flex;min-width:0;flex-direction:column;gap:14px}.chapter{position:relative;min-width:0;overflow:hidden;border:1px solid rgba(var(--chapter-accent),.23);border-radius:var(--app-radius-md);background:radial-gradient(circle at 0 0,rgba(var(--chapter-accent),.14),transparent 52%),linear-gradient(145deg,rgba(var(--chapter-accent),.045),rgb(var(--v-theme-surface)) 65%);box-shadow:0 9px 30px rgba(0,0,0,.07);transition:border-color .2s,box-shadow .2s,transform .2s}.chapter:before{content:'';position:absolute;z-index:1;left:0;top:0;width:100%;height:4px;background:linear-gradient(90deg,rgb(var(--chapter-accent)),rgba(var(--chapter-accent),.2))}.chapter:hover,.chapter.open{border-color:rgba(var(--chapter-accent),.62);box-shadow:0 20px 52px rgba(var(--chapter-accent),.14);transform:translateY(-2px)}.chapter.current{border-color:rgba(var(--v-theme-secondary),.58)}.chapter.completed{border-left:6px solid rgb(var(--v-theme-primary));filter:saturate(.82);box-shadow:inset 10px 0 24px rgba(var(--v-theme-primary),.08),0 9px 30px rgba(0,0,0,.07)}.drawer-summary{display:grid;width:100%;grid-template-columns:52px minmax(0,1fr) 28px;align-items:center;gap:14px;padding:22px 20px 16px;border:0;color:inherit;text-align:left;background:transparent;cursor:pointer}.chapter-id{display:grid;gap:4px;color:rgb(var(--chapter-accent));font-size:1.08rem;font-weight:860;letter-spacing:.04em;text-shadow:0 0 24px rgba(var(--chapter-accent),.22)}.chapter-id small{color:rgba(var(--chapter-accent),.78);font-size:.62rem;font-weight:780;letter-spacing:.1em;text-transform:uppercase}.chapter-title{display:grid;min-width:0;gap:5px}.chapter-title strong{overflow:hidden;font-size:1.14rem;letter-spacing:-.025em;text-overflow:ellipsis;white-space:nowrap}.chapter-title small{overflow:hidden;color:rgba(var(--v-theme-on-surface),.62);font-size:.82rem;text-overflow:ellipsis;white-space:nowrap}.stage-complete-label{display:flex;align-items:center;gap:5px;margin-top:2px;color:rgb(var(--v-theme-primary));font-size:.74rem;font-weight:780}.stage-complete-label .v-icon{font-size:1rem}.drawer-chevron{justify-self:end;color:rgb(var(--chapter-accent));transition:transform .22s}.chapter.open .drawer-chevron{transform:rotate(180deg)}.chapter-quick-detail{width:calc(100% - 40px);min-height:42px;margin:0 20px 18px;background:rgba(var(--chapter-accent),.12)!important;color:rgb(var(--chapter-accent))!important}.drawer-content{padding:0 20px 20px;border-top:1px solid rgba(var(--chapter-accent),.16)}.drawer-status{display:flex;justify-content:flex-end;margin-top:16px}.overview{margin-top:14px;color:rgba(var(--v-theme-on-surface),.74);font-size:.94rem;line-height:1.6}.chapter-data{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0 0;padding:17px 0 0;border-top:1px solid rgba(var(--chapter-accent),.14)}.chapter-data span,.chapter-data strong{display:block}.chapter-data span{color:rgba(var(--chapter-accent),.84);font-size:.75rem}.chapter-data strong{margin-top:4px;font-size:.9rem}
@media(min-width:1680px){.chapter-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}@media(max-width:1100px){.chapter-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.summary-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.summary-grid .featured{grid-column:span 1}.progress-row{grid-template-columns:1fr;gap:10px}}@media(max-width:580px){.trip-summary{padding:20px}.trip-summary header .v-btn{min-width:50px;padding-inline:13px}.trip-summary header .v-btn :deep(.v-btn__content){font-size:0}.summary-grid{gap:9px}.summary-grid .featured{grid-column:span 2}.summary-grid>div{padding:15px}.chapter-grid{grid-template-columns:1fr}.drawer-summary{grid-template-columns:46px minmax(0,1fr) 24px;padding:18px 16px}.drawer-content{padding:0 16px 17px}.chapters{margin-top:34px}}
</style>
