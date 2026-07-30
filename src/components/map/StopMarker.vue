<script setup lang="ts">
import type { StopStatus } from '@/content/types'

defineProps<{ label: string; status: StopStatus; selected: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    class="stop-marker"
    :class="[status, { selected }]"
    :aria-label="label"
    :title="label"
    @click.stop="$emit('select')"
  >
    <span
      ><svg
        v-if="status === 'visited'"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="m5 12 4 4L19 6" /></svg
      ><svg
        v-else
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
        <circle
          cx="12"
          cy="9"
          r="2.4"
        /></svg
    ></span>
  </button>
</template>

<style scoped>
.stop-marker {
  position: relative;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  touch-action: manipulation;
}
.stop-marker span {
  position: relative;
  z-index: 2;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 2px solid rgba(255, 255, 255, 0.88);
  border-radius: 50%;
  color: rgb(var(--v-theme-background));
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
}
.stop-marker svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.stop-marker.visited span {
  color: #fff;
  background: rgb(var(--v-theme-success));
}
.stop-marker.current {
  width: 58px;
  height: 58px;
}
.stop-marker.current:before,
.stop-marker.current:after {
  position: absolute;
  z-index: 0;
  inset: 5px;
  border: 2px solid rgba(var(--v-theme-secondary), 0.9);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}
.stop-marker.current:after {
  z-index: 1;
  inset: 9px;
  border-color: #fff;
  opacity: 0.82;
}
.stop-marker.current:before {
  animation: current-marker-pulse 1.8s ease-out infinite;
}
.stop-marker.current span {
  width: 40px;
  height: 40px;
  border: 3px solid rgb(var(--v-theme-background));
  color: rgb(var(--v-theme-background));
  background: rgb(var(--v-theme-secondary));
  box-shadow:
    0 0 0 3px rgba(255, 255, 255, 0.96),
    0 8px 24px rgba(0, 0, 0, 0.68);
}
.stop-marker.current svg {
  width: 21px;
  height: 21px;
  stroke-width: 2.5;
}
.stop-marker.selected span {
  transform: scale(1.16);
  box-shadow:
    0 0 0 4px rgba(255, 255, 255, 0.92),
    0 9px 26px rgba(0, 0, 0, 0.64);
}
.stop-marker.current.selected span {
  transform: scale(1.12);
  box-shadow:
    0 0 0 4px rgb(var(--v-theme-secondary)),
    0 0 0 7px rgba(255, 255, 255, 0.95),
    0 10px 30px rgba(0, 0, 0, 0.72);
}
@keyframes current-marker-pulse {
  0% {
    opacity: 0.9;
    transform: scale(0.78);
  }
  70%,
  100% {
    opacity: 0;
    transform: scale(1.38);
  }
}
@media (prefers-reduced-motion: reduce) {
  .stop-marker.current:before {
    animation: none;
    opacity: 0.45;
  }
}
</style>
