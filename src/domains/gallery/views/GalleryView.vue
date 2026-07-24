<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/base/PageHeader.vue'
import { useTripStore } from '@/stores/trip'

type WindowController = { next: () => void; prev: () => void }

const { t } = useI18n(); const route = useRoute(); const store = useTripStore()
const selectedIndex = ref<number | null>(null)
const photoWindow = ref<WindowController>()
const photos = computed(() => store.stopsForRoute(String(route.params.routeId)).flatMap(stop => stop.photos.map(photo => ({ photo, stopTitle: stop.title }))))
const selected = computed(() => selectedIndex.value === null ? undefined : photos.value[selectedIndex.value])
function move(direction: number): void {
  if (direction > 0) photoWindow.value?.next()
  else photoWindow.value?.prev()
}
</script>

<template>
  <main class="page-shell standard-page gallery-page">
    <PageHeader :title="t('gallery.title')" :subtitle="t('gallery.subtitle')" />
    <div v-if="!photos.length" class="empty"><v-icon icon="mdi-image-off-outline" size="46" /><p>{{ t('gallery.empty') }}</p></div>
    <section v-else class="photo-grid"><button v-for="(item,index) in photos" :key="item.photo.id" type="button" :aria-label="t('gallery.openPhoto')" @click="selectedIndex=index"><img :src="item.photo.url" :alt="item.photo.caption || t(item.photo.alt)" loading="lazy" /><span>{{ t(item.stopTitle) }}</span></button></section>
    <v-dialog :model-value="selectedIndex!==null" fullscreen transition="dialog-bottom-transition" @update:model-value="value=>{if(!value)selectedIndex=null}">
      <v-card class="viewer">
        <v-btn class="close" icon="mdi-close" :aria-label="t('common.close')" @click="selectedIndex=null" />
        <v-btn v-if="photos.length>1" class="previous" icon="mdi-chevron-left" :aria-label="t('gallery.previous')" @click="move(-1)" />
        <v-window v-if="selectedIndex!==null" ref="photoWindow" v-model="selectedIndex" class="viewer-window" continuous touch>
          <v-window-item v-for="(item,index) in photos" :key="item.photo.id" :value="index">
            <div class="viewer-slide"><img :src="item.photo.url" :alt="item.photo.caption || t(item.photo.alt)" /></div>
          </v-window-item>
        </v-window>
        <v-btn v-if="photos.length>1" class="next" icon="mdi-chevron-right" :aria-label="t('gallery.next')" @click="move(1)" />
        <p v-if="selected">{{ selected.photo.caption || t(selected.stopTitle) }}</p>
      </v-card>
    </v-dialog>
  </main>
</template>

<style scoped>.photo-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.photo-grid button{position:relative;aspect-ratio:1;border:1px solid rgba(var(--v-border-color),.1);border-radius:18px;overflow:hidden;padding:0;background:rgb(var(--v-theme-surface));box-shadow:0 12px 34px rgba(0,0,0,.1);cursor:pointer}.photo-grid button:after{content:'';position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(2,8,5,.74));pointer-events:none}.photo-grid img{width:100%;height:100%;object-fit:cover;transition:transform .3s}.photo-grid button:hover img{transform:scale(1.035)}.photo-grid span{position:absolute;z-index:1;left:12px;bottom:11px;padding:6px 9px;border:1px solid rgba(255,255,255,.1);border-radius:9px;color:white;background:rgba(0,0,0,.48);font-size:.8rem;font-weight:700;backdrop-filter:blur(12px)}.empty{min-height:340px;display:grid;place-content:center;justify-items:center;gap:14px;color:rgba(var(--v-theme-on-background),.62);font-size:.95rem}.viewer{position:relative;display:grid;place-items:center;background:#090a0d!important;touch-action:pan-y}.viewer-window{width:100%;height:100%;background:transparent!important}.viewer-window :deep(.v-window__container),.viewer-window :deep(.v-window-item){height:100%}.viewer-slide{display:grid;width:100%;height:100%;place-items:center}.viewer-slide img{width:100%;height:100%;max-height:100dvh;object-fit:contain}.viewer p{position:absolute;z-index:2;bottom:max(28px,env(safe-area-inset-bottom));color:white;font-size:1rem}.viewer .v-btn{position:fixed!important;z-index:20;min-width:50px;min-height:50px;color:#fff!important;background:#090a0d!important;border:1px solid rgba(255,255,255,.16);box-shadow:0 10px 28px rgba(0,0,0,.4)!important}.close{top:max(18px,env(safe-area-inset-top));right:18px}.previous,.next{top:50%;transform:translateY(-50%)}.previous{left:14px}.next{right:14px}@media(min-width:700px){.photo-grid{grid-template-columns:repeat(3,1fr);gap:14px}.photo-grid button{border-radius:22px}}@media(min-width:1400px){.photo-grid{grid-template-columns:repeat(4,1fr)}}</style>
