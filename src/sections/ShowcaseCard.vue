<script setup lang="ts">
defineProps<{
  name: string
  span?: 1 | 2
}>()
</script>

<template>
  <div
    class="flex flex-col rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5"
    :class="span === 2 ? 'sm:col-span-2' : ''"
  >
    <p class="eyebrow mb-4 text-[var(--color-text-tertiary)]">{{ name }}</p>
    <div class="flex flex-1 flex-wrap items-center gap-3">
      <slot />
    </div>
  </div>
</template>
