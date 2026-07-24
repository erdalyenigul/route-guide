<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/base/PageHeader.vue'
import StopCard from '../components/StopCard.vue'
import { useTripStore } from '@/stores/trip'

const { t } = useI18n()
const route = useRoute()
const store = useTripStore()
const search = ref('')
const routeStops = computed(() => store.stopsForRoute(String(route.params.routeId)))
const filteredStops = computed(() => routeStops.value.filter((stop) => t(stop.title).toLocaleLowerCase().includes(search.value.toLocaleLowerCase())))
</script>

<template>
  <div class="page-shell standard-page">
    <PageHeader :title="t('stops.title')" :subtitle="t('stops.subtitle')" />
    <v-text-field v-model="search" class="search-field" :label="t('stops.search')" prepend-inner-icon="mdi-magnify" variant="solo-filled" flat rounded="xl" clearable hide-details />
    <div v-if="filteredStops.length" class="stops-list"><StopCard v-for="stop in filteredStops" :key="stop.id" :stop="stop" /></div>
    <v-empty-state v-else icon="mdi-map-marker-off-outline" :title="t('stops.empty')" />
  </div>
</template>

<style scoped>
.search-field { max-width: 720px; margin-bottom: 22px; }.search-field :deep(.v-field){min-height:58px;border:1px solid rgba(var(--v-border-color),.1);box-shadow:0 10px 30px rgba(0,0,0,.07)}.stops-list { display: grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap: 16px; }@media(max-width:900px){.stops-list{grid-template-columns:1fr}}
</style>
