<script setup lang="ts">
import { Button, Badge } from '@dlbcodes/my-design-system'

const links = [
  { href: '#library', label: 'Library' },
  { href: '#templates', label: 'Templates' },
  { href: '#playground', label: 'Playground' },
  { href: '#about', label: 'About' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]/85 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#top" class="flex items-center gap-2">
        <span class="grid size-7 place-items-center rounded-md bg-[var(--color-text-primary)] font-mono text-sm font-semibold text-[var(--color-text-inverse)]">d</span>
        <span class="font-mono text-sm font-medium">dlbcodes</span>
        <Badge variant="outline" class="ml-1 hidden font-mono text-[11px] sm:inline-flex">v0.7.1</Badge>
      </a>

      <nav class="hidden items-center gap-7 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <Button as="a" href="https://github.com/dlbcodes" variant="ghost" size="sm" class="hidden sm:inline-flex">
          GitHub
        </Button>
        <Button as="a" href="https://www.npmjs.com/package/@dlbcodes/my-design-system" variant="outline" size="sm">
          npm ↗
        </Button>
      </div>
    </div>
  </header>
</template>
