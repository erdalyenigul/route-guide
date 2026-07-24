<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/base/PageHeader.vue'
import StopCard from '@/domains/stops/components/StopCard.vue'
import { useTripStore } from '@/stores/trip'

const { t } = useI18n()
const store = useTripStore()
</script>

<template>
  <div class="page-shell standard-page">
    <PageHeader :title="t('favorites.title')" :subtitle="t('favorites.subtitle')" />
    <div v-if="store.favoriteStops.length" class="favorite-grid"><StopCard v-for="stop in store.favoriteStops" :key="stop.id" :stop="stop" /></div>
    <v-empty-state v-else icon="mdi-heart-outline" :title="t('favorites.empty')" :text="t('favorites.emptyHint')" />
  </div>
</template>

<style scoped>.favorite-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}@media(max-width:900px){.favorite-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:600px){.favorite-grid{grid-template-columns:1fr}}</style>
