<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/base/PageHeader.vue'
import PhotoViewer from '@/components/gallery/PhotoViewer.vue'
import { useTripStore } from '@/stores/trip'

const { t } = useI18n(); const route = useRoute(); const store = useTripStore()
const selectedIndex = ref<number | null>(null)
const selectedStopId = ref<string | null>(null)
const galleryGroups = computed(() => store.stopsForRoute(String(route.params.routeId))
  .map((stop, index) => ({ id: stop.id, index, title: stop.title, region: stop.region, photos: stop.photos }))
  .filter(group => group.photos.length > 0))
const selectedGroup = computed(() => galleryGroups.value.find(group => group.id === selectedStopId.value))
const photos = computed(() => selectedGroup.value?.photos.map(photo => ({ photo, stopTitle: selectedGroup.value?.title ?? '' })) ?? [])
const viewerPhotos = computed(() => photos.value.map(item => ({
  id: item.photo.id,
  url: item.photo.url,
  alt: item.photo.caption || t(item.photo.alt),
  caption: item.photo.caption || t(item.stopTitle)
})))
function openGroup(stopId: string): void {
  selectedStopId.value = stopId
  selectedIndex.value = null
}
function closeGroup(): void {
  selectedStopId.value = null
  selectedIndex.value = null
}
</script>

<template>
  <main class="page-shell standard-page gallery-page">
    <PageHeader :title="t('gallery.title')" :subtitle="t('gallery.subtitle')" />
    <div v-if="!galleryGroups.length" class="empty"><v-icon icon="mdi-image-off-outline" size="46" /><p>{{ t('gallery.empty') }}</p></div>

    <section v-else-if="!selectedGroup" class="gallery-groups">
      <button
        v-for="group in galleryGroups"
        :key="group.id"
        class="gallery-group"
        type="button"
        :aria-label="t('gallery.openStopGallery', { stop: t(group.title) })"
        @click="openGroup(group.id)"
      >
        <img :src="group.photos[0]?.url" :alt="t('gallery.photoOf', { stop: t(group.title) })" loading="lazy" />
        <span class="group-order">{{ String(group.index + 1).padStart(2, '0') }}</span>
        <span class="group-overlay">
          <span><strong>{{ t(group.title) }}</strong><small>{{ t(group.region) }}</small></span>
          <span class="photo-count"><v-icon icon="mdi-image-multiple-outline" />{{ t('gallery.photoCount', { count: group.photos.length }) }}</span>
        </span>
      </button>
    </section>

    <template v-else>
      <header class="group-header">
        <v-btn variant="tonal" prepend-icon="mdi-arrow-left" @click="closeGroup">{{ t('gallery.allGalleries') }}</v-btn>
        <div>
          <h2>{{ t(selectedGroup.title) }}</h2>
          <p>{{ t('gallery.photoCount', { count: selectedGroup.photos.length }) }}</p>
        </div>
      </header>
      <section class="photo-grid">
        <button v-for="(item,index) in photos" :key="item.photo.id" type="button" :aria-label="t('gallery.openPhoto')" @click="selectedIndex=index">
          <img :src="item.photo.url" :alt="item.photo.caption || t(item.photo.alt)" loading="lazy" />
          <span>{{ item.photo.caption || t(item.stopTitle) }}</span>
        </button>
      </section>
    </template>

    <PhotoViewer v-model="selectedIndex" :photos="viewerPhotos" />
  </main>
</template>

<style scoped>
.gallery-groups{display:grid;grid-template-columns:1fr;gap:14px}.gallery-group{position:relative;min-height:220px;aspect-ratio:16/10;overflow:hidden;padding:0;border:1px solid rgba(var(--v-border-color),.12);border-radius:22px;color:#fff;text-align:left;background:rgb(var(--v-theme-surface));box-shadow:0 16px 42px rgba(0,0,0,.16);cursor:pointer}.gallery-group:after{content:'';position:absolute;inset:20% 0 0;background:linear-gradient(transparent,rgba(4,5,8,.94));pointer-events:none}.gallery-group>img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .35s ease}.gallery-group:hover>img{transform:scale(1.035)}.group-order{position:absolute;z-index:2;top:14px;left:14px;padding:7px 10px;border:1px solid rgba(255,255,255,.18);border-radius:10px;background:rgba(5,6,9,.68);font-size:.76rem;font-weight:800;backdrop-filter:blur(14px)}.group-overlay{position:absolute;z-index:2;right:16px;bottom:16px;left:16px;display:flex;align-items:end;justify-content:space-between;gap:16px}.group-overlay>span:first-child{display:grid;gap:4px;min-width:0}.group-overlay strong{overflow:hidden;font-size:1.22rem;letter-spacing:-.03em;text-overflow:ellipsis;white-space:nowrap}.group-overlay small{overflow:hidden;color:rgba(255,255,255,.7);font-size:.82rem;text-overflow:ellipsis;white-space:nowrap}.photo-count{display:flex;flex:none;align-items:center;gap:6px;padding:7px 10px;border:1px solid rgba(255,255,255,.14);border-radius:10px;background:rgba(5,6,9,.66);font-size:.76rem;font-weight:740;backdrop-filter:blur(14px)}.photo-count .v-icon{font-size:1rem}
.group-header{display:flex;align-items:center;gap:18px;margin-bottom:22px}.group-header>div{display:grid;gap:3px}.group-header h2{font-size:clamp(1.35rem,2.4vw,1.9rem);letter-spacing:-.04em}.group-header p{color:rgba(var(--v-theme-on-background),.6);font-size:.84rem}
.photo-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.photo-grid button{position:relative;aspect-ratio:1;border:1px solid rgba(var(--v-border-color),.1);border-radius:18px;overflow:hidden;padding:0;background:rgb(var(--v-theme-surface));box-shadow:0 12px 34px rgba(0,0,0,.1);cursor:pointer}.photo-grid button:after{content:'';position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(2,8,5,.74));pointer-events:none}.photo-grid img{width:100%;height:100%;object-fit:cover;transition:transform .3s}.photo-grid button:hover img{transform:scale(1.035)}.photo-grid button>span{position:absolute;z-index:1;left:12px;bottom:11px;max-width:calc(100% - 24px);overflow:hidden;padding:6px 9px;border:1px solid rgba(255,255,255,.1);border-radius:9px;color:white;background:rgba(0,0,0,.48);font-size:.8rem;font-weight:700;text-overflow:ellipsis;white-space:nowrap;backdrop-filter:blur(12px)}.empty{min-height:340px;display:grid;place-content:center;justify-items:center;gap:14px;color:rgba(var(--v-theme-on-background),.62);font-size:.95rem}
@media(min-width:700px){.gallery-groups,.photo-grid{grid-template-columns:repeat(2,1fr);gap:14px}.photo-grid button{border-radius:22px}}@media(min-width:1100px){.gallery-groups{grid-template-columns:repeat(3,1fr)}}@media(min-width:1400px){.photo-grid{grid-template-columns:repeat(4,1fr)}}@media(max-width:600px){.group-header{align-items:flex-start;flex-direction:column;gap:12px}.group-header .v-btn{width:100%}}
</style>
