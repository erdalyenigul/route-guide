<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  value: string
  tone?: 'default' | 'success' | 'warning'
}>()
</script>

<template>
  <div
    class="metric-pill"
    :class="`metric-pill--${tone ?? 'default'}`"
  >
    <v-icon
      :icon="icon"
      size="19"
    />
    <div>
      <span>{{ label }}</span
      ><strong>{{ value }}</strong>
    </div>
  </div>
</template>

<style scoped>
.metric-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 13px 14px;
  border-radius: 16px;
  background: rgba(var(--v-theme-on-surface), 0.045);
  color: rgba(var(--v-theme-on-surface), 0.72);
}
.metric-pill div {
  min-width: 0;
}
.metric-pill span,
.metric-pill strong {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.metric-pill span {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.68;
}
.metric-pill strong {
  margin-top: 2px;
  font-size: 0.88rem;
  color: rgb(var(--v-theme-on-surface));
}
.metric-pill--success {
  color: rgb(var(--v-theme-success));
  background: rgba(var(--v-theme-success), 0.1);
}
.metric-pill--warning {
  color: rgb(var(--v-theme-warning));
  background: rgba(var(--v-theme-warning), 0.11);
}
</style>
