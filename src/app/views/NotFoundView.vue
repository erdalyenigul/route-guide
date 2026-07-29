<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="not-found">
    <div class="not-found-icon">
      <v-icon
        icon="mdi-sign-direction-remove-outline"
        size="52"
      />
    </div>
    <h1>{{ t('notFound.title') }}</h1>
    <p>{{ t('notFound.description') }}</p>
    <v-btn
      to="/"
      color="primary"
      size="large"
      prepend-icon="mdi-arrow-left"
      >{{ t('notFound.action') }}</v-btn
    >
  </div>
</template>
<style scoped>
.not-found {
  min-height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
  padding: 30px;
}
.not-found-icon {
  margin: auto auto 22px;
  width: 100px;
  height: 100px;
  border-radius: 30px;
  display: grid;
  place-items: center;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}
.not-found h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 7vw, 5rem);
  letter-spacing: -0.05em;
}
.not-found p {
  margin: 14px 0 26px;
  color: rgba(var(--v-theme-on-background), 0.6);
}
</style>
