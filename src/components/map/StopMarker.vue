<script setup lang="ts">
import type { StopStatus } from '@/content/types'

defineProps<{ label: string; status: StopStatus; selected: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button type="button" class="stop-marker" :class="[status,{selected}]" :aria-label="label" :title="label" @click.stop="$emit('select')">
    <span><svg v-if="status==='visited'" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg><svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" /><circle cx="12" cy="9" r="2.4" /></svg></span>
  </button>
</template>

<style scoped>
.stop-marker{width:46px;height:46px;display:grid;place-items:center;padding:0;border:0;background:transparent;cursor:pointer;touch-action:manipulation}.stop-marker span{width:32px;height:32px;display:grid;place-items:center;border:2px solid rgba(255,255,255,.88);border-radius:50%;color:#fff;background:#59655f;box-shadow:0 6px 18px rgba(0,0,0,.45);transition:transform .16s ease,box-shadow .16s ease}.stop-marker svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.stop-marker.visited span{background:#527b66}.stop-marker.current span{background:#d98354;box-shadow:0 0 0 7px rgba(217,131,84,.2),0 6px 18px rgba(0,0,0,.45)}.stop-marker.selected span{transform:scale(1.2);box-shadow:0 0 0 7px rgba(156,199,178,.18),0 8px 22px rgba(0,0,0,.5)}
</style>
