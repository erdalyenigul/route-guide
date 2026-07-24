<script setup lang="ts">
defineProps<{ title: string; subtitle: string; back?: boolean }>()
</script>

<template>
  <header class="page-header">
    <v-btn v-if="back" class="back-btn" icon="mdi-arrow-left" variant="text" :aria-label="$t('nav.back')" @click="$router.back()" />
    <div>
      <h1 class="page-title">{{ title }}</h1>
      <p class="page-subtitle">{{ subtitle }}</p>
    </div>
    <div class="page-actions"><slot /></div>
  </header>
</template>

<style scoped>
.page-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 28px; }
.page-title { font-family: var(--font-display); font-size: clamp(1.85rem, 5vw, 2.65rem); font-weight: 790; line-height: 1.04; letter-spacing: -.045em; }
.page-subtitle { max-width: 760px; margin-top: 8px; color: rgba(var(--v-theme-on-background), .62); font-size: 1rem; line-height: 1.5; }
.page-actions { margin-left: auto; display: flex; gap: 8px; }
.back-btn { margin-top: 2px; }
@media (max-width: 600px) { .page-header { margin-bottom: 24px; }.page-subtitle { font-size: .95rem; } }
</style>
