<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { usePreferencesStore } from '@/stores/preferences'
import { adminContentService } from '../services/adminContentService'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const preferences = usePreferencesStore()
const logoUrl = computed(() =>
  preferences.theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'
)
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    if (await adminContentService.currentUser()) await router.replace({ name: 'admin-dashboard' })
  } catch {
    // A temporary connection problem must not prevent a fresh sign-in attempt.
  }
})

function isInvalidCredentialsError(cause: unknown): boolean {
  if (!cause || typeof cause !== 'object') return false
  const error = cause as { code?: unknown; message?: unknown }
  return (
    error.code === 'invalid_credentials' ||
    (typeof error.message === 'string' && /invalid login credentials/i.test(error.message))
  )
}

async function submit(): Promise<void> {
  errorMessage.value = ''
  isLoading.value = true
  try {
    await adminContentService.signIn(username.value, password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/manage'
    await router.replace(redirect)
  } catch (cause) {
    errorMessage.value = t(
      isInvalidCredentialsError(cause) ? 'admin.loginError' : 'admin.loginConnectionError'
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="admin-login">
    <v-card class="login-card">
      <img
        class="login-logo"
        :src="logoUrl"
        :alt="t('app.name')"
      />
      <p class="eyebrow">{{ t('admin.privateWorkspace') }}</p>
      <h1>{{ t('admin.loginTitle') }}</h1>
      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        >{{ errorMessage }}</v-alert
      >
      <form @submit.prevent="submit">
        <v-text-field
          v-model="username"
          :label="t('admin.username')"
          autocomplete="username"
          inputmode="text"
          prepend-inner-icon="mdi-account-outline"
          autocapitalize="none"
          autocorrect="off"
          spellcheck="false"
          required
        />
        <v-text-field
          v-model="password"
          :label="t('admin.password')"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          inputmode="text"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          autocapitalize="none"
          autocorrect="off"
          spellcheck="false"
          required
          @click:append-inner="showPassword = !showPassword"
        />
        <v-btn
          class="login-submit"
          type="submit"
          block
          color="primary"
          size="x-large"
          :loading="isLoading"
          >{{ t('admin.signIn') }}</v-btn
        >
      </form>
      <v-btn
        variant="outlined"
        block
        size="x-large"
        to="/settings"
        >{{ t('nav.back') }}</v-btn
      >
    </v-card>
  </main>
</template>

<style scoped>
.admin-login {
  min-height: calc(100dvh - 64px);
  display: grid;
  place-items: center;
  padding: 24px;
  background: radial-gradient(
    circle at 50% 5%,
    rgba(var(--v-theme-primary), 0.14),
    transparent 34rem
  );
}
.login-card {
  width: min(100%, 500px);
  padding: clamp(24px, 5vw, 42px);
  border: 1px solid rgba(var(--v-border-color), 0.13);
  border-radius: 28px !important;
  box-shadow: var(--app-shadow-float);
}
.login-logo {
  display: block;
  width: min(250px, 72%);
  height: auto;
  margin: 0 0 28px;
  border-radius: 14px;
  object-fit: contain;
}
h1 {
  margin-bottom: 26px;
  font-size: 2.2rem;
  line-height: 1.05;
  letter-spacing: -0.05em;
}
form {
  display: grid;
  gap: 12px;
}
.v-alert {
  margin-bottom: 18px;
}
.login-submit {
  margin-bottom: 12px;
}
</style>
