<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import PageHeader from '@/components/base/PageHeader.vue'
import { useTripStore } from '@/stores/trip'

import { adminContentService } from '../services/adminContentService'

const { t } = useI18n()
const router = useRouter()
const trip = useTripStore()

async function signOut(): Promise<void> {
  await adminContentService.signOut()
  await router.replace({ name: 'admin-login' })
}
</script>

<template>
  <main class="page-shell standard-page admin-page">
    <PageHeader :title="t('admin.dashboardTitle')" :subtitle="t('admin.dashboardSubtitle')" back>
      <v-btn variant="tonal" prepend-icon="mdi-logout" @click="signOut">{{ t('admin.signOut') }}</v-btn>
    </PageHeader>

    <section class="editor-grid">
      <v-card
        v-for="(stop,index) in trip.activeStops"
        :key="stop.id"
        class="editor-card"
        :to="`/manage/stops/${stop.slug}`"
      >
        <div class="order">{{ String(index + 1).padStart(2, '0') }}</div>
        <div class="editor-copy">
          <h2>{{ t(stop.title) }}</h2>
          <p>{{ t(stop.region) }}</p>
          <div class="editor-meta">
            <span><v-icon icon="mdi-image-multiple-outline" />{{ t('admin.photoCount', { count: stop.photos.length }) }}</span>
            <span><v-icon icon="mdi-text-box-outline" />{{ stop.experience?.body ? t('admin.experienceAdded') : t('admin.experienceEmpty') }}</span>
          </div>
        </div>
        <v-icon icon="mdi-chevron-right" />
      </v-card>
    </section>
  </main>
</template>

<style scoped>
.editor-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.editor-card{display:grid;grid-template-columns:44px 1fr 24px;align-items:center;min-height:160px;padding:22px;border:1px solid rgba(var(--v-border-color),.11);border-radius:22px!important;box-shadow:0 12px 38px rgba(0,0,0,.08);transition:transform .2s,border-color .2s}.editor-card:hover{transform:translateY(-3px);border-color:rgba(var(--v-theme-primary),.38)}.order{align-self:start;color:rgba(var(--v-theme-on-surface),.45);font-size:.82rem;font-weight:800}.editor-copy{min-width:0}.editor-copy h2{font-size:1.3rem;letter-spacing:-.035em}.editor-copy>p{margin-top:5px;color:rgba(var(--v-theme-on-surface),.58);font-size:.84rem}.editor-meta{display:grid;gap:7px;margin-top:20px;color:rgba(var(--v-theme-on-surface),.7);font-size:.8rem}.editor-meta span{display:flex;align-items:center;gap:7px}.editor-meta .v-icon{color:rgb(var(--v-theme-primary))}@media(max-width:1100px){.editor-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:650px){.editor-grid{grid-template-columns:1fr}.editor-card{min-height:148px;padding:19px}}
</style>
