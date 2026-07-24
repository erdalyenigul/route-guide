<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/base/PageHeader.vue'
import { useTripStore } from '@/stores/trip'

const { t } = useI18n()
const store = useTripStore()
const done = computed(() => store.checklist.filter((item) => item.completed).length)
</script>

<template>
  <div class="page-shell standard-page narrow-page">
    <PageHeader :title="t('checklist.title')" :subtitle="t('checklist.subtitle')" />
    <v-card class="progress-card pa-6">
      <div class="d-flex justify-space-between mb-3"><strong>{{ t('checklist.progress', { done, total: store.checklist.length }) }}</strong><span>{{ store.checklistProgress }}%</span></div>
      <v-progress-linear :model-value="store.checklistProgress" color="secondary" height="8" rounded />
    </v-card>
    <div class="checklist-list">
      <button v-for="item in store.checklist" :key="item.id" type="button" class="check-item" :class="{ completed: item.completed }" @click="store.toggleChecklistItem(item.id)">
        <span class="check-circle"><v-icon :icon="item.completed ? 'mdi-check' : ''" size="18" /></span><span>{{ t(item.labelKey) }}</span><v-icon :icon="item.category === 'vehicle' ? 'mdi-van-utility' : item.category === 'camera' ? 'mdi-camera-outline' : 'mdi-tent'" size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.narrow-page{max-width:850px}.progress-card{background:rgb(var(--v-theme-primary));color:rgb(var(--v-theme-on-primary))}.progress-card span{color:rgb(var(--v-theme-secondary));font-weight:700}.checklist-list{display:grid;gap:10px;margin-top:24px}.check-item{width:100%;border:0;border-radius:18px;padding:18px 20px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;text-align:left;background:rgb(var(--v-theme-surface));color:rgb(var(--v-theme-on-surface));cursor:pointer;font:inherit}.check-circle{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;border:2px solid rgba(var(--v-theme-on-surface),.18)}.check-item.completed .check-circle{background:rgb(var(--v-theme-success));border-color:rgb(var(--v-theme-success));color:white}.check-item.completed>span:nth-child(2){text-decoration:line-through;opacity:.52}.check-item>.v-icon{color:rgba(var(--v-theme-on-surface),.35)}
</style>
