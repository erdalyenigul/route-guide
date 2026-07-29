<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/base/PageHeader.vue'
import { useTripStore } from '@/stores/trip'
import { terrainProfile } from '@/utils/terrainProfile'
const { t } = useI18n()
const route = useRoute()
const store = useTripStore()
const stops = computed(() => store.stopsForRoute(String(route.params.routeId)))
</script>

<template>
  <main class="page-shell standard-page route-page">
    <PageHeader
      :title="t('timeline.title')"
      :subtitle="t('timeline.subtitle')"
    />
    <div
      v-if="!stops.length"
      class="empty"
    >
      <v-icon
        icon="mdi-road-variant"
        size="42"
      />
      <p>{{ t('home.noActiveRoute') }}</p>
    </div>
    <section
      v-else
      class="timeline"
    >
      <article
        v-for="(stop, index) in stops"
        :key="stop.id"
        class="route-row"
      >
        <div class="track">
          <span :class="stop.status"
            ><v-icon
              v-if="stop.status === 'visited'"
              icon="mdi-check"
              size="16"
            /><template v-else>{{ index + 1 }}</template></span
          >
        </div>
        <v-card
          class="route-card"
          :class="{ current: stop.status === 'current' }"
          :to="`/trips/${stop.routeId}/stops/${stop.id}`"
        >
          <div class="title-row">
            <div>
              <p>{{ t(`common.${stop.status}`) }}</p>
              <h2>{{ t(stop.title) }}</h2>
            </div>
            <v-icon icon="mdi-chevron-right" />
          </div>
          <div class="route-meta">
            <span v-if="index > 0 && index < stops.length - 1"
              ><v-icon icon="mdi-weather-night" />{{
                t('timeline.stay', { nights: stop.recommendedNights })
              }}</span
            ><span v-if="index > 0 && stop.drivingDistanceFromPreviousKm !== null"
              ><v-icon icon="mdi-steering" />{{
                t('timeline.drive', {
                  distance: stop.drivingDistanceFromPreviousKm,
                  minutes: stop.estimatedDriveTimeMinutes ?? '—'
                })
              }}</span
            ><span v-else-if="index > 0"
              ><v-icon icon="mdi-steering" />{{ t('timeline.noDriveData') }}</span
            ><span v-if="index > 0 && terrainProfile(stop)"
              ><v-icon icon="mdi-elevation-rise" />{{
                t(`van.road.terrain.${terrainProfile(stop)}`)
              }}</span
            >
          </div>
        </v-card>
      </article>
    </section>
  </main>
</template>

<style scoped>
.route-page {
  max-width: 1100px;
}
.timeline {
  margin-top: 12px;
}
.route-row {
  display: grid;
  grid-template-columns: 54px 1fr;
  gap: 16px;
  padding-bottom: 18px;
}
.track {
  position: relative;
  display: flex;
  justify-content: center;
}
.track:after {
  content: '';
  position: absolute;
  top: 46px;
  bottom: -19px;
  width: 2px;
  background: linear-gradient(
    rgba(var(--v-theme-primary), 0.34),
    rgba(var(--v-theme-on-background), 0.08)
  );
}
.route-row:last-child .track:after {
  display: none;
}
.track span {
  position: relative;
  z-index: 1;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), 0.2);
  font-size: 0.85rem;
  font-weight: 780;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.13);
}
.track span.current {
  color: rgb(var(--v-theme-on-primary));
  background: rgb(var(--v-theme-primary));
  box-shadow:
    0 0 0 7px rgba(var(--v-theme-primary), 0.14),
    0 10px 25px rgba(0, 0, 0, 0.16);
}
.track span.visited {
  color: white;
  background: rgb(var(--v-theme-success));
}
.route-card {
  padding: 24px;
  border: 1px solid rgba(var(--v-border-color), 0.11);
  border-radius: var(--app-radius-md) !important;
  background-color: rgb(var(--v-theme-surface));
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.route-card:hover {
  transform: translateX(3px);
  border-color: rgba(var(--v-theme-primary), 0.34);
}
.route-card.current {
  border-color: rgba(var(--v-theme-primary), 0.45);
  background: linear-gradient(
    120deg,
    rgba(var(--v-theme-primary), 0.14),
    rgb(var(--v-theme-surface))
  );
}
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title-row p {
  color: rgba(var(--v-theme-on-surface), 0.58);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 780;
}
.title-row h2 {
  margin-top: 3px;
  font-size: 1.55rem;
  letter-spacing: -0.04em;
}
.route-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 18px;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.92rem;
}
.route-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
}
.route-meta .v-icon {
  color: rgb(var(--v-theme-primary));
}
.empty {
  min-height: 280px;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 14px;
  color: rgba(var(--v-theme-on-background), 0.6);
}
@media (max-width: 600px) {
  .route-row {
    grid-template-columns: 44px 1fr;
    gap: 10px;
  }
  .track span {
    width: 36px;
    height: 36px;
  }
  .track:after {
    top: 40px;
  }
  .route-card {
    padding: 20px;
  }
  .title-row h2 {
    font-size: 1.35rem;
  }
  .route-meta {
    gap: 13px;
    font-size: 0.84rem;
  }
}
</style>
