<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import PageHeader from '@/components/base/PageHeader.vue'
import { useTripStore } from '@/stores/trip'

const { t } = useI18n()
const route = useRoute()
const store = useTripStore()

const stops = computed(() => store.stopsForRoute(String(route.params.routeId)))
const finalStop = computed(() => stops.value[stops.value.length - 1])
const legs = computed(() =>
  stops.value.slice(1).map((stop, index) => ({
    id: `${stops.value[index]?.id}-${stop.id}`,
    order: index + 1,
    from: stops.value[index],
    to: stop,
    distanceKm: stop.drivingDistanceFromPreviousKm,
    durationMinutes: stop.estimatedDriveTimeMinutes
  }))
)
const totalDistanceKm = computed(() =>
  legs.value.reduce((total, leg) => total + (leg.distanceKm ?? 0), 0)
)
const totalDurationMinutes = computed(() =>
  legs.value.reduce((total, leg) => total + (leg.durationMinutes ?? 0), 0)
)

function text(key?: string): string {
  return key ? t(key) : t('common.unknown')
}

function duration(minutes: number | null): string {
  if (minutes === null) return '—'
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (!hours) return t('routeSummary.minutes', { minutes: remainingMinutes })
  if (!remainingMinutes) return t('routeSummary.hours', { hours })
  return t('routeSummary.hoursMinutes', { hours, minutes: remainingMinutes })
}
</script>

<template>
  <main class="page-shell standard-page route-summary-page">
    <PageHeader
      back
      :title="t('routeSummary.title')"
      :subtitle="t('routeSummary.subtitle')"
    />

    <section
      v-if="legs.length"
      class="route-overview"
    >
      <div class="overview-stat">
        <span>{{ t('routeSummary.totalDistance') }}</span>
        <strong
          >{{ totalDistanceKm }} <small>{{ t('common.km') }}</small></strong
        >
      </div>
      <div class="overview-stat">
        <span>{{ t('routeSummary.totalDriveTime') }}</span>
        <strong>{{ duration(totalDurationMinutes) }}</strong>
      </div>
      <div class="overview-stat">
        <span>{{ t('routeSummary.totalStops') }}</span>
        <strong>{{ stops.length }}</strong>
      </div>
    </section>

    <section
      v-if="legs.length"
      class="route-leg-list"
      :aria-label="t('routeSummary.legs')"
    >
      <article
        v-for="leg in legs"
        :key="leg.id"
        class="route-leg"
      >
        <span class="route-leg__order">{{ String(leg.order).padStart(2, '0') }}</span>
        <div class="route-leg__places">
          <small>{{ t('routeSummary.stage', { number: leg.order }) }}</small>
          <strong>{{ text(leg.from?.title) }}</strong>
          <span><v-icon icon="mdi-arrow-down" />{{ text(leg.to.title) }}</span>
        </div>
        <div class="route-leg__metrics">
          <span>
            <v-icon icon="mdi-map-marker-distance" />
            <strong>{{ leg.distanceKm ?? '—' }}</strong> {{ t('common.km') }}
          </span>
          <span>
            <v-icon icon="mdi-steering" />
            <strong>{{ duration(leg.durationMinutes) }}</strong>
          </span>
        </div>
      </article>
    </section>

    <section
      v-if="legs.length"
      class="route-total"
    >
      <div>
        <span>{{ t('routeSummary.routeTotal') }}</span>
        <strong>{{ text(stops[0]?.title) }} → {{ text(finalStop?.title) }}</strong>
      </div>
      <dl>
        <div>
          <dt>{{ t('routeSummary.totalDistance') }}</dt>
          <dd>{{ totalDistanceKm }} {{ t('common.km') }}</dd>
        </div>
        <div>
          <dt>{{ t('routeSummary.totalDriveTime') }}</dt>
          <dd>{{ duration(totalDurationMinutes) }}</dd>
        </div>
        <div>
          <dt>{{ t('routeSummary.totalStages') }}</dt>
          <dd>{{ legs.length }}</dd>
        </div>
      </dl>
    </section>

    <v-card
      v-else
      class="empty-state"
    >
      <v-icon
        icon="mdi-road-variant"
        size="42"
      />
      <p>{{ t('home.noActiveRoute') }}</p>
    </v-card>
  </main>
</template>

<style scoped>
.route-summary-page {
  max-width: 1100px;
  padding-bottom: 132px;
}
.route-overview {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.overview-stat,
.route-leg,
.route-total {
  border: 1px solid rgba(var(--v-border-color), 0.14);
  background: rgba(var(--v-theme-surface), 0.92);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.08);
}
.overview-stat {
  display: grid;
  gap: 8px;
  min-height: 112px;
  padding: 22px;
  border-radius: var(--app-radius-md);
}
.overview-stat span,
.route-total span,
.route-total dt {
  color: rgba(var(--v-theme-on-surface), 0.58);
  font-size: 0.8rem;
}
.overview-stat strong {
  align-self: end;
  font-size: clamp(1.35rem, 3vw, 1.8rem);
}
.overview-stat small {
  font-size: 0.75em;
}
.route-leg-list {
  display: grid;
  gap: 10px;
}
.route-leg {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  padding: 18px 20px;
  border-radius: var(--app-radius-md);
}
.route-leg__order {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 15px;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.13);
  font-weight: 800;
}
.route-leg__places {
  display: grid;
  min-width: 0;
  gap: 3px;
}
.route-leg__places small {
  color: rgba(var(--v-theme-on-surface), 0.48);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.route-leg__places strong {
  overflow: hidden;
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.route-leg__places span {
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.9rem;
}
.route-leg__places .v-icon {
  font-size: 0.9rem;
}
.route-leg__metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, auto));
  gap: 8px;
}
.route-leg__metrics span {
  display: flex;
  align-items: center;
  gap: 7px;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 14px;
  color: rgba(var(--v-theme-on-surface), 0.68);
  background: rgba(var(--v-theme-on-surface), 0.055);
  white-space: nowrap;
}
.route-leg__metrics .v-icon {
  color: rgb(var(--v-theme-primary));
}
.route-leg__metrics strong {
  color: rgb(var(--v-theme-on-surface));
}
.route-total {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.75fr);
  gap: 28px;
  margin-top: 20px;
  padding: 26px;
  border-color: rgba(var(--v-theme-primary), 0.34);
  border-radius: var(--app-radius-lg);
  background: linear-gradient(
    120deg,
    rgba(var(--v-theme-primary), 0.14),
    rgba(var(--v-theme-surface), 0.96)
  );
}
.route-total > div {
  display: grid;
  align-content: center;
  gap: 6px;
}
.route-total > div strong {
  font-size: clamp(1.15rem, 3vw, 1.5rem);
}
.route-total dl {
  display: grid;
  gap: 8px;
}
.route-total dl div {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.1);
}
.route-total dd {
  font-weight: 800;
}
.empty-state {
  display: grid;
  min-height: 280px;
  place-items: center;
}
@media (max-width: 760px) {
  .route-overview {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .overview-stat:last-child {
    grid-column: 1 / -1;
  }
  .route-leg {
    grid-template-columns: 46px minmax(0, 1fr);
    gap: 12px;
    padding: 16px;
  }
  .route-leg__order {
    width: 42px;
    height: 42px;
  }
  .route-leg__metrics {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .route-leg__metrics span {
    justify-content: center;
    padding-inline: 10px;
  }
  .route-total {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 22px;
  }
}
@media (max-width: 420px) {
  .route-overview {
    grid-template-columns: 1fr;
  }
  .overview-stat:last-child {
    grid-column: auto;
  }
  .route-leg__metrics {
    grid-template-columns: 1fr;
  }
}
</style>
