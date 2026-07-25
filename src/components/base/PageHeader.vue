<script setup lang="ts">
defineProps<{ title: string; subtitle?: string; back?: boolean; stackActions?: boolean }>()
</script>

<template>
  <header class="page-header" :class="{ 'has-back': back, 'stack-actions': stackActions }">
    <v-btn v-if="back" class="back-btn" icon="mdi-arrow-left" variant="text" :aria-label="$t('nav.back')" @click="$router.back()" />
    <div>
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    </div>
    <div class="page-actions"><slot /></div>
  </header>
</template>

<style scoped>
.page-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 28px; }
.page-title { font-family: var(--font-display); font-size: clamp(1.85rem, 5vw, 2.65rem); font-weight: 790; line-height: 1.04; letter-spacing: -.045em; }
.page-subtitle { max-width: 760px; margin-top: 8px; color: rgba(var(--v-theme-on-background), .62); font-size: 1rem; line-height: 1.5; }
.page-actions { margin-left: auto; display: flex; gap: 8px; }
.back-btn { margin-top: 2px; color: rgba(var(--v-theme-on-background), .74); background: rgba(var(--v-theme-on-background), .065); border: 1px solid rgba(var(--v-border-color), .1); }
.page-header.has-back { display: grid; grid-template-columns: 52px minmax(0, 1fr); row-gap: 12px; }
.has-back .back-btn { grid-column: 1; grid-row: 1; width: 44px; height: 44px; margin: 0; border-radius: 50%; }
.has-back > div:not(.page-actions) { min-width: 0; grid-column: 1 / -1; grid-row: 2; }
.has-back .page-actions { grid-column: 1 / -1; grid-row: 3; justify-self: start; margin: 0; }
.page-header.stack-actions { display: grid; }
.stack-actions .page-actions :deep(.v-btn) { white-space: nowrap; }
@media (max-width: 600px) { .page-header { margin-bottom: 24px; }.page-subtitle { font-size: .95rem; } }
</style>
