<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import PageHeader from '@/components/base/PageHeader.vue'
import PhotoViewer from '@/components/gallery/PhotoViewer.vue'
import { useTripStore } from '@/stores/trip'
import { formatDateTime } from '@/utils/dateTime'

import { adminContentService, MAX_PHOTOS_PER_STOP } from '../services/adminContentService'
import type { SharedStopEditorData, SharedStopPhoto } from '../types'

const { t } = useI18n()
const route = useRoute()
const trip = useTripStore()
const stopSlug = computed(() => String(route.params.stopId))
const editor = ref<SharedStopEditorData>()
const body = ref('')
const locale = ref<'en' | 'tr'>('tr')
const isPublished = ref(true)
const caption = ref('')
const files = ref<File[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const isUploading = ref(false)
const isSavingProgress = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const progressCompleted = ref(false)
const nightsStayed = ref(0)
const actualDistanceKm = ref(0)
const pendingDelete = ref<SharedStopPhoto>()
const selectedPhotoIndex = ref<number | null>(null)
const tripStop = computed(() => trip.stopById(stopSlug.value))
const uploadedPhotoCount = computed(() => editor.value?.photos.filter(photo => photo.sourceType === 'trip').length ?? 0)
const remainingPhotos = computed(() => MAX_PHOTOS_PER_STOP - uploadedPhotoCount.value)
const viewerPhotos = computed(() => editor.value?.photos.map(photo => ({
  id: photo.id,
  url: photo.url,
  alt: photo.caption || t('gallery.photoOf', { stop: t(editor.value?.titleKey ?? 'app.name') }),
  caption: photo.caption
})) ?? [])

async function load(): Promise<void> {
  isLoading.value = true
  errorMessage.value = ''
  try {
    editor.value = await adminContentService.getStopEditor(stopSlug.value)
    body.value = editor.value.experience.body
    locale.value = editor.value.experience.locale
    isPublished.value = editor.value.experience.isPublished
  } catch {
    errorMessage.value = t('admin.loadError')
  } finally {
    isLoading.value = false
  }
}

async function refreshContent(): Promise<void> {
  await Promise.all([load(), trip.initialize()])
  syncProgressForm()
}

function syncProgressForm(): void {
  const stop = tripStop.value
  if (!stop) return
  progressCompleted.value = stop.status === 'visited'
  nightsStayed.value = stop.nightsStayed ?? stop.recommendedNights
  actualDistanceKm.value = stop.actualDistanceKm ?? stop.drivingDistanceFromPreviousKm ?? 0
}

async function saveProgress(): Promise<void> {
  const stop = tripStop.value
  if (!stop) return
  isSavingProgress.value = true
  errorMessage.value = ''
  successMessage.value = ''
  const resolvedNights = Math.min(Math.max(Math.trunc(Number(nightsStayed.value) || 0), 0), 365)
  const resolvedDistance = Math.min(Math.max(Math.trunc(Number(actualDistanceKm.value) || 0), 0), 5000)
  try {
    await trip.setStopCompletion(stop.id, progressCompleted.value, resolvedNights, resolvedDistance)
    if (trip.stateSyncError) throw new Error('PROGRESS_SAVE_FAILED')
    await trip.refreshTripState()
    syncProgressForm()
    successMessage.value = t('admin.progressSaved')
  } catch {
    errorMessage.value = t('admin.progressSaveError')
  } finally {
    isSavingProgress.value = false
  }
}

async function saveExperience(): Promise<void> {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await adminContentService.saveExperience(stopSlug.value, {
      body: body.value,
      locale: locale.value,
      isPublished: isPublished.value
    })
    successMessage.value = t('admin.experienceSaved')
    await refreshContent()
  } catch {
    errorMessage.value = t('admin.saveError')
  } finally {
    isSaving.value = false
  }
}

async function upload(): Promise<void> {
  if (!files.value.length) return
  isUploading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  try {
    await adminContentService.uploadPhotos(
      stopSlug.value,
      files.value,
      caption.value,
      uploadedPhotoCount.value
    )
    files.value = []
    caption.value = ''
    successMessage.value = t('admin.photosUploaded')
    await refreshContent()
  } catch (error) {
    errorMessage.value = error instanceof Error && error.message === 'PHOTO_LIMIT_REACHED'
      ? t('admin.photoLimitError')
      : t('admin.uploadError')
  } finally {
    isUploading.value = false
  }
}

async function setCover(photo: SharedStopPhoto): Promise<void> {
  if (photo.isCover) return
  errorMessage.value = ''
  try {
    await adminContentService.setCover(stopSlug.value, photo.id)
    await refreshContent()
  } catch {
    errorMessage.value = t('admin.coverError')
  }
}

async function deleteConfirmed(): Promise<void> {
  if (!pendingDelete.value) return
  const photoId = pendingDelete.value.id
  pendingDelete.value = undefined
  errorMessage.value = ''
  try {
    await adminContentService.deletePhoto(photoId)
    await refreshContent()
  } catch {
    errorMessage.value = t('admin.deleteError')
  }
}

onMounted(() => { void refreshContent() })
</script>

<template>
  <main class="page-shell standard-page editor-page">
    <div v-if="isLoading" class="loading"><v-progress-circular indeterminate color="primary" /></div>
    <template v-else-if="editor">
      <PageHeader :title="t(editor.titleKey)" :subtitle="t('admin.stopEditorSubtitle')" back>
        <v-btn :to="`/trips/${trip.activeTrip?.id ?? 'active'}/stops/${stopSlug}`" variant="tonal" prepend-icon="mdi-open-in-new">{{ t('admin.viewStop') }}</v-btn>
      </PageHeader>

      <v-alert v-if="errorMessage" type="error" variant="tonal" closable @click:close="errorMessage=''">{{ errorMessage }}</v-alert>
      <v-alert v-if="successMessage" type="success" variant="tonal" closable @click:close="successMessage=''">{{ successMessage }}</v-alert>

      <div class="editor-layout">
        <v-card v-if="tripStop" class="panel progress-panel">
          <div class="panel-heading progress-heading">
            <div><p class="eyebrow">{{ t('admin.tripProgress') }}</p><h2>{{ t('admin.actualTripData') }}</h2></div>
            <v-chip :color="progressCompleted ? 'success' : undefined" variant="tonal">
              {{ t(progressCompleted ? 'common.completed' : 'common.upcoming') }}
            </v-chip>
          </div>
          <p class="panel-description">{{ t('admin.progressHint') }}</p>
          <div class="planned-values">
            <div><v-icon icon="mdi-calendar-range-outline" /><span>{{ t('admin.plannedStay') }}</span><strong>{{ tripStop.recommendedNights }} {{ t('common.nights') }}</strong></div>
            <div><v-icon icon="mdi-map-marker-distance" /><span>{{ t('admin.plannedDistance') }}</span><strong>{{ tripStop.drivingDistanceFromPreviousKm ?? '—' }} {{ t('common.km') }}</strong></div>
          </div>
          <v-switch v-model="progressCompleted" class="progress-switch" color="primary" hide-details :label="t('stop.stageComplete')" />
          <div class="actual-values">
            <v-text-field
              v-model.number="nightsStayed"
              type="number"
              min="0"
              max="365"
              step="1"
              inputmode="numeric"
              :disabled="!progressCompleted"
              :label="t('stop.actualNightsStayed')"
              :suffix="t('common.nights')"
            />
            <v-text-field
              v-model.number="actualDistanceKm"
              type="number"
              min="0"
              max="5000"
              step="1"
              inputmode="numeric"
              :disabled="!progressCompleted"
              :label="t('stop.actualDistanceTravelled')"
              :suffix="t('common.km')"
            />
          </div>
          <v-btn color="primary" size="large" prepend-icon="mdi-content-save-outline" :loading="isSavingProgress" @click="saveProgress">{{ t('admin.saveProgress') }}</v-btn>
        </v-card>

        <v-card class="panel experience-panel">
          <div class="panel-heading">
            <div><p class="eyebrow">{{ t('admin.journal') }}</p><h2>{{ t('admin.experienceTitle') }}</h2></div>
            <v-switch v-model="isPublished" color="primary" hide-details :label="t('admin.published')" />
          </div>
          <v-btn-toggle v-model="locale" mandatory color="primary" density="comfortable">
            <v-btn value="tr">{{ t('settings.turkish') }}</v-btn>
            <v-btn value="en">{{ t('settings.english') }}</v-btn>
          </v-btn-toggle>
          <v-textarea
            v-model="body"
            class="experience-input"
            :label="t('admin.experienceLabel')"
            :hint="t('admin.experienceHint')"
            persistent-hint
            rows="12"
            maxlength="10000"
            counter
            auto-grow
          />
          <p v-if="editor.experience.authorName && editor.experience.updatedAt" class="author-meta">
            <v-icon icon="mdi-account-edit-outline" />
            {{ t('admin.lastEditedBy', {
              name: editor.experience.authorName,
              date: formatDateTime(editor.experience.updatedAt)
            }) }}
          </p>
          <v-btn color="primary" size="large" prepend-icon="mdi-content-save-outline" :loading="isSaving" @click="saveExperience">{{ t('common.save') }}</v-btn>
        </v-card>

        <v-card class="panel upload-panel">
          <div class="panel-heading">
            <div><p class="eyebrow">{{ t('admin.sharedGallery') }}</p><h2>{{ t('admin.photoUploadTitle') }}</h2></div>
            <v-chip color="primary" variant="tonal">{{ uploadedPhotoCount }}/{{ MAX_PHOTOS_PER_STOP }}</v-chip>
          </div>
          <p class="panel-description">{{ t('admin.photoUploadHint', { count: remainingPhotos }) }}</p>
          <v-file-input
            v-model="files"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            chips
            show-size
            prepend-icon=""
            prepend-inner-icon="mdi-image-plus-outline"
            :label="t('admin.choosePhotos')"
            :disabled="remainingPhotos === 0"
          />
          <v-text-field v-model="caption" :label="t('admin.photoCaption')" maxlength="500" counter />
          <v-btn color="primary" size="large" prepend-icon="mdi-cloud-upload-outline" :disabled="!files.length || remainingPhotos === 0" :loading="isUploading" @click="upload">{{ t('admin.uploadPhotos') }}</v-btn>
        </v-card>
      </div>

      <section class="photos-section">
        <div class="section-heading"><div><p class="eyebrow">{{ t('admin.sharedGallery') }}</p><h2>{{ t('admin.currentPhotos') }}</h2></div><span>{{ t('admin.photoCount', { count: editor.photos.length }) }}</span></div>
        <div v-if="editor.photos.length" class="photo-admin-grid">
          <v-card v-for="(photo,index) in editor.photos" :key="photo.id" class="photo-admin-card">
            <button class="photo-preview" type="button" :aria-label="t('gallery.openPhoto')" @click="selectedPhotoIndex=index">
              <img :src="photo.url" :alt="photo.caption || t('gallery.photoOf',{stop:t(editor.titleKey)})" />
            </button>
            <div class="photo-overlay">
              <v-chip v-if="photo.isCover" class="cover-chip" size="small">{{ t('admin.cover') }}</v-chip>
              <span v-else />
              <div>
                <v-btn class="photo-action-btn" icon="mdi-image-frame" size="small" variant="flat" :title="t('admin.makeCover')" :aria-label="t('admin.makeCover')" @click="setCover(photo)" />
                <v-btn class="photo-action-btn" icon="mdi-delete-outline" size="small" variant="flat" :title="t('admin.deletePhoto')" :aria-label="t('admin.deletePhoto')" @click="pendingDelete=photo" />
              </div>
            </div>
            <p v-if="photo.caption">{{ photo.caption }}</p>
          </v-card>
        </div>
        <v-empty-state v-else icon="mdi-image-plus-outline" :title="t('admin.noPhotos')" :text="t('admin.noPhotosHint')" />
      </section>
    </template>

    <v-dialog :model-value="Boolean(pendingDelete)" max-width="440" @update:model-value="value=>{if(!value)pendingDelete=undefined}">
      <v-card class="confirm-card">
        <h2>{{ t('admin.deleteConfirmTitle') }}</h2>
        <p>{{ t('admin.deleteConfirmBody') }}</p>
        <div><v-btn variant="text" @click="pendingDelete=undefined">{{ t('admin.cancel') }}</v-btn><v-btn color="error" @click="deleteConfirmed">{{ t('admin.deletePhoto') }}</v-btn></div>
      </v-card>
    </v-dialog>

    <PhotoViewer v-model="selectedPhotoIndex" :photos="viewerPhotos" />
  </main>
</template>

<style scoped>
.loading{min-height:60dvh;display:grid;place-items:center}.v-alert{margin-bottom:14px}.editor-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:18px}.panel{padding:clamp(20px,3vw,30px);border:1px solid rgba(var(--v-border-color),.11);border-radius:24px!important;box-shadow:var(--app-shadow)}.panel-heading{display:flex;align-items:start;justify-content:space-between;gap:18px;margin-bottom:22px}.panel-heading h2,.section-heading h2{font-size:1.5rem;letter-spacing:-.04em}.progress-panel{grid-column:1/-1}.progress-heading{margin-bottom:12px}.planned-values{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:760px}.planned-values>div{display:grid;grid-template-columns:36px minmax(0,1fr);grid-template-rows:auto auto;align-items:center;padding:16px;border:1px solid rgba(var(--v-border-color),.09);border-radius:17px;background:rgba(var(--v-theme-on-surface),.04)}.planned-values .v-icon{grid-row:1/3;color:rgb(var(--v-theme-primary));font-size:1.25rem}.planned-values span{color:rgba(var(--v-theme-on-surface),.58);font-size:.78rem}.planned-values strong{font-size:1.05rem}.progress-switch{margin:20px 0 12px}.actual-values{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:760px}.experience-input{margin-top:20px}.author-meta{display:flex;align-items:center;gap:8px;margin:-2px 0 18px;color:rgba(var(--v-theme-on-surface),.62);font-size:.86rem;line-height:1.5}.author-meta .v-icon{color:rgb(var(--v-theme-primary));font-size:1.1rem}.panel-description{margin:-8px 0 20px;color:rgba(var(--v-theme-on-surface),.66);font-size:.9rem;line-height:1.55}.photos-section{margin-top:38px}.section-heading{display:flex;align-items:end;justify-content:space-between;margin-bottom:18px}.section-heading>span{color:rgba(var(--v-theme-on-background),.58);font-size:.9rem}.photo-admin-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.photo-admin-card{position:relative;overflow:hidden;border:1px solid rgba(var(--v-border-color),.11);border-radius:20px!important}.photo-preview{display:block;width:100%;padding:0;border:0;background:transparent;cursor:zoom-in}.photo-preview img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;transition:transform .25s}.photo-preview:hover img{transform:scale(1.025)}.photo-admin-card>p{min-height:48px;padding:12px 14px;color:rgba(var(--v-theme-on-surface),.7);font-size:.82rem;line-height:1.4}.photo-overlay{position:absolute;z-index:1;left:10px;right:10px;top:10px;display:flex;justify-content:space-between;gap:10px;pointer-events:none}.photo-overlay>div{display:flex;gap:7px}.photo-overlay .v-btn{pointer-events:auto}.cover-chip,.photo-action-btn{color:#fff!important;background:#090a0d!important;box-shadow:0 6px 18px rgba(0,0,0,.3)}.photo-action-btn:hover{background:#24262b!important}.photo-action-btn :deep(.v-icon){color:#fff!important}.confirm-card{padding:26px}.confirm-card h2{font-size:1.4rem}.confirm-card p{margin-top:10px;color:rgba(var(--v-theme-on-surface),.68);line-height:1.55}.confirm-card>div{display:flex;justify-content:flex-end;gap:8px;margin-top:24px}@media(max-width:1050px){.editor-layout{grid-template-columns:1fr}.photo-admin-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:700px){.photo-admin-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.panel-heading{align-items:center}.panel-heading h2{font-size:1.3rem}.planned-values,.actual-values{grid-template-columns:1fr}}@media(max-width:430px){.photo-admin-grid{grid-template-columns:1fr}}
</style>
