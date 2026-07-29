<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { StopViewModel } from '@/content/types'
import { useTripStore } from '@/stores/trip'

const props = defineProps<{ stop: StopViewModel; compact?: boolean }>()
const { t } = useI18n()
const store = useTripStore()
const statusColor = computed(() =>
  props.stop.status === 'current'
    ? 'secondary'
    : props.stop.status === 'visited'
      ? 'success'
      : undefined
)
const routeStops = computed(() => store.stopsForRoute(props.stop.routeId))
const stopIndex = computed(() => routeStops.value.findIndex((stop) => stop.id === props.stop.id))
const isAccommodationStop = computed(
  () => stopIndex.value > 0 && stopIndex.value < routeStops.value.length - 1
)
function level(value: string | null): string {
  return value ? t(`common.${value}`) : t('common.unknown')
}
</script>

<template>
  <v-card
    class="stop-row"
    :to="`/trips/${stop.routeId}/stops/${stop.id}`"
  >
    <div class="thumb">
      <img
        v-if="stop.photos[0]"
        :src="stop.photos[0].url"
        :alt="t(stop.photos[0].alt)"
        loading="lazy"
      /><v-icon
        v-else
        icon="mdi-image-outline"
        size="30"
      /><v-chip
        :color="statusColor"
        size="x-small"
        variant="flat"
        >{{ t(`common.${stop.status}`) }}</v-chip
      >
    </div>
    <div class="stop-copy">
      <div class="title-line">
        <div>
          <h2>{{ t(stop.title) }}</h2>
          <p>{{ t(stop.region) }}</p>
        </div>
        <v-btn
          :icon="stop.favorite ? 'mdi-heart' : 'mdi-heart-outline'"
          :color="stop.favorite ? 'secondary' : undefined"
          size="small"
          variant="text"
          :aria-label="t(stop.favorite ? 'stop.unfavorite' : 'stop.favorite')"
          @click.prevent="store.toggleFavorite(stop.id)"
        />
      </div>
      <div class="compact-facts">
        <span v-if="isAccommodationStop"
          ><v-icon icon="mdi-weather-night" />{{ stop.recommendedNights }}
          {{ t('common.nights') }}</span
        ><span
          ><v-icon icon="mdi-wifi" />{{
            stop.internetScore === null ? '—' : `${stop.internetScore}/5`
          }}</span
        ><span><v-icon icon="mdi-van-utility" />{{ level(stop.ducatoAccessibility) }}</span>
      </div>
    </div>
    <v-icon
      class="chevron"
      icon="mdi-chevron-right"
    />
  </v-card>
</template>

<style scoped>
.stop-row {
  display: grid;
  grid-template-columns: 126px 1fr 32px;
  align-items: center;
  min-height: 148px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), 0.11);
  border-radius: var(--app-radius-md) !important;
  background-color: rgb(var(--v-theme-surface));
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
}
.stop-row:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.35);
  box-shadow: var(--app-shadow);
}
.thumb {
  position: relative;
  align-self: stretch;
  display: grid;
  place-items: center;
  color: rgba(var(--v-theme-on-surface), 0.3);
  background: linear-gradient(
    145deg,
    rgba(var(--v-theme-primary), 0.18),
    rgba(var(--v-theme-on-surface), 0.035)
  );
}
.thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb .v-chip {
  position: absolute;
  z-index: 1;
  left: 10px;
  bottom: 10px;
}
.stop-copy {
  min-width: 0;
  padding: 20px 16px 20px 22px;
}
.title-line {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
}
.title-line h2 {
  font-size: 1.25rem;
  letter-spacing: -0.035em;
}
.title-line p {
  margin-top: 5px;
  color: rgba(var(--v-theme-on-surface), 0.58);
  font-size: 0.84rem;
}
.compact-facts {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.82rem;
}
.compact-facts span {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.compact-facts .v-icon {
  font-size: 1.05rem;
  color: rgb(var(--v-theme-primary));
}
.chevron {
  font-size: 1.35rem;
  color: rgba(var(--v-theme-on-surface), 0.4);
}
@media (min-width: 720px) {
  .stop-row {
    grid-template-columns: 154px 1fr 38px;
    min-height: 168px;
  }
  .stop-copy {
    padding-inline: 26px;
  }
  .title-line h2 {
    font-size: 1.4rem;
  }
}
@media (max-width: 480px) {
  .stop-row {
    grid-template-columns: 108px 1fr 24px;
    min-height: 142px;
  }
  .stop-copy {
    padding: 16px 10px 16px 16px;
  }
  .compact-facts {
    gap: 9px;
    font-size: 0.75rem;
  }
}
</style>
