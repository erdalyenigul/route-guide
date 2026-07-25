<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface PhotoViewerItem {
  id: string
  url: string
  alt: string
  caption: string | null | undefined
}

const props = defineProps<{
  modelValue: number | null
  photos: PhotoViewerItem[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const { t } = useI18n()
const isOpen = computed(() => props.modelValue !== null)
const selectedPhoto = computed(() => props.modelValue === null ? undefined : props.photos[props.modelValue])
const hasPrevious = computed(() => props.modelValue !== null && props.modelValue > 0)
const hasNext = computed(() => props.modelValue !== null && props.modelValue < props.photos.length - 1)
const viewerDrag = ref(0)
const isDragging = ref(false)
let pointerStartX = 0
let pointerStartY = 0
let dragAxis: 'horizontal' | 'vertical' | null = null
let isPointerTracking = false
const viewerStyle = computed(() => ({
  '--viewer-drag': `${viewerDrag.value}px`,
  '--viewer-opacity': String(Math.max(.42, 1 - viewerDrag.value / 520))
}))

function close(): void {
  emit('update:modelValue', null)
}

function move(direction: -1 | 1): void {
  if (props.modelValue === null) return
  const nextIndex = Math.min(Math.max(props.modelValue + direction, 0), props.photos.length - 1)
  if (nextIndex !== props.modelValue) emit('update:modelValue', nextIndex)
}

function updateIndex(value: number): void {
  if (Number.isInteger(value) && value >= 0 && value < props.photos.length) {
    emit('update:modelValue', value)
  }
}

function handleKeydown(event: KeyboardEvent): void {
  if (!isOpen.value) return
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    move(-1)
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    move(1)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
}

function startViewerDrag(event: PointerEvent): void {
  if (event.pointerType !== 'touch' || !window.matchMedia('(max-width: 699px)').matches) return
  pointerStartX = event.clientX
  pointerStartY = event.clientY
  dragAxis = null
  viewerDrag.value = 0
  isPointerTracking = true
}

function moveViewerDrag(event: PointerEvent): void {
  if (!isPointerTracking) return
  const deltaX = event.clientX - pointerStartX
  const deltaY = event.clientY - pointerStartY
  if (!dragAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 10) {
    dragAxis = Math.abs(deltaY) > Math.abs(deltaX) * 1.15 && deltaY > 0 ? 'vertical' : 'horizontal'
  }
  if (dragAxis !== 'vertical') return
  event.preventDefault()
  isDragging.value = true
  viewerDrag.value = Math.max(0, deltaY)
}

function finishViewerDrag(): void {
  if (!isPointerTracking) return
  if (dragAxis === 'vertical' && viewerDrag.value > 110) {
    close()
  }
  isDragging.value = false
  viewerDrag.value = 0
  dragAxis = null
  isPointerTracking = false
}

const touch = {
  left: () => move(1),
  right: () => move(-1)
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
    @update:model-value="value => { if (!value) close() }"
  >
    <v-card
      class="photo-viewer"
      :class="{ dragging: isDragging }"
      :style="viewerStyle"
      @pointerdown="startViewerDrag"
      @pointermove="moveViewerDrag"
      @pointerup="finishViewerDrag"
      @pointercancel="finishViewerDrag"
    >
      <v-btn class="viewer-close" icon="mdi-close" :aria-label="t('common.close')" @click="close" />
      <v-btn
        v-if="photos.length > 1"
        class="viewer-previous"
        icon="mdi-chevron-left"
        :aria-label="t('gallery.previous')"
        :disabled="!hasPrevious"
        @click="move(-1)"
      />
      <v-window
        v-if="modelValue !== null"
        :model-value="modelValue"
        class="viewer-window"
        :touch="touch"
        @update:model-value="updateIndex"
      >
        <v-window-item v-for="(photo, index) in photos" :key="photo.id" :value="index">
          <div class="viewer-slide">
            <img :src="photo.url" :alt="photo.alt" draggable="false" />
          </div>
        </v-window-item>
      </v-window>
      <v-btn
        v-if="photos.length > 1"
        class="viewer-next"
        icon="mdi-chevron-right"
        :aria-label="t('gallery.next')"
        :disabled="!hasNext"
        @click="move(1)"
      />
      <p v-if="selectedPhoto?.caption">{{ selectedPhoto.caption }}</p>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.photo-viewer{position:relative;display:grid;place-items:center;background:#07080a!important;touch-action:none}.viewer-window{width:100%;height:100%;opacity:var(--viewer-opacity,1);background:transparent!important;transform:translateY(var(--viewer-drag,0));transition:transform .24s cubic-bezier(.22,.8,.28,1),opacity .24s ease}.photo-viewer.dragging .viewer-window{transition:none}.viewer-window :deep(.v-window__container),.viewer-window :deep(.v-window-item){height:100%}.viewer-slide{display:grid;width:100%;height:100%;place-items:center}.viewer-slide img{width:100%;height:100%;max-height:100dvh;object-fit:contain;user-select:none;-webkit-user-drag:none}.photo-viewer>.v-btn{position:fixed!important;z-index:20;min-width:52px;min-height:52px;color:#fff!important;background:#090a0d!important;border:1px solid rgba(255,255,255,.18);box-shadow:0 10px 28px rgba(0,0,0,.42)!important;backdrop-filter:blur(16px)}.photo-viewer>.v-btn:disabled{opacity:.3}.photo-viewer>.viewer-close{top:max(18px,env(safe-area-inset-top));right:18px;bottom:auto;left:auto}.photo-viewer>.viewer-previous,.photo-viewer>.viewer-next{top:50%;bottom:auto;transform:translateY(-50%)}.photo-viewer>.viewer-previous{right:auto;left:max(14px,env(safe-area-inset-left))}.photo-viewer>.viewer-next{right:max(14px,env(safe-area-inset-right));left:auto}.photo-viewer>p{position:absolute;z-index:2;right:20px;bottom:max(24px,env(safe-area-inset-bottom));left:20px;padding:10px 14px;border-radius:12px;color:#fff;text-align:center;background:rgba(0,0,0,.58);backdrop-filter:blur(14px)}
@media(max-width:600px){.photo-viewer>.v-btn{min-width:48px;min-height:48px}.photo-viewer>.viewer-close{top:max(14px,env(safe-area-inset-top));right:14px}.photo-viewer>.viewer-previous{left:max(8px,env(safe-area-inset-left))}.photo-viewer>.viewer-next{right:max(8px,env(safe-area-inset-right))}}
</style>
