<script setup lang="ts">
import { computed } from 'vue'

interface TextToken {
  type: 'text' | 'link'
  value: string
  href?: string
  external?: boolean
}

const props = withDefaults(defineProps<{ text: string; tag?: string }>(), { tag: 'span' })

const linkPattern =
  /(https?:\/\/[^\s<>()]+|www\.[^\s<>()]+)|(-?\d{1,2}\.\d{4,}\s*,\s*-?\d{1,3}\.\d{4,})|((?:\+?90[\s.-]?)?0?\d{3}[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2})/g

function phoneHref(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('90')) return `tel:+${digits}`
  if (digits.startsWith('0')) return `tel:+90${digits.slice(1)}`
  return `tel:${digits}`
}

function tokensFromText(value: string): TextToken[] {
  const tokens: TextToken[] = []
  let cursor = 0

  for (const match of value.matchAll(linkPattern)) {
    const index = match.index ?? 0
    if (index > cursor) tokens.push({ type: 'text', value: value.slice(cursor, index) })

    const raw = match[0]
    if (match[1]) {
      const clean = raw.replace(/[.,;:!?]+$/g, '')
      tokens.push({
        type: 'link',
        value: clean,
        href: clean.startsWith('www.') ? `https://${clean}` : clean,
        external: true
      })
      if (clean.length < raw.length)
        tokens.push({ type: 'text', value: raw.slice(clean.length) })
    } else if (match[2]) {
      tokens.push({
        type: 'link',
        value: raw,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(raw)}`,
        external: true
      })
    } else {
      tokens.push({ type: 'link', value: raw, href: phoneHref(raw), external: false })
    }
    cursor = index + raw.length
  }

  if (cursor < value.length) tokens.push({ type: 'text', value: value.slice(cursor) })
  return tokens
}

const tokens = computed(() => tokensFromText(props.text))
</script>

<template>
  <component
    :is="tag"
    class="auto-link-text"
  >
    <template
      v-for="(token, index) in tokens"
      :key="`${index}-${token.value}`"
    >
      <a
        v-if="token.type === 'link'"
        :href="token.href"
        :target="token.external ? '_blank' : undefined"
        :rel="token.external ? 'noopener noreferrer' : undefined"
        >{{ token.value }}</a
      ><template v-else>{{ token.value }}</template>
    </template>
  </component>
</template>

<style scoped>
.auto-link-text {
  white-space: pre-wrap;
}
.auto-link-text a {
  color: rgb(var(--v-theme-primary));
  font-weight: 680;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}
.auto-link-text a:hover {
  color: rgb(var(--v-theme-secondary));
}
</style>
