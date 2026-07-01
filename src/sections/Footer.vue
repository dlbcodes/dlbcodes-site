<script setup lang="ts">
import { Button } from '@dlbcodes/my-design-system'
</script>

<template>
  <footer class="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]/40">
    <div class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 class="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Have a product that needs building?</h2>
          <p class="mt-3 max-w-md text-[var(--color-text-secondary)]">
            I take on freelance frontend and full-stack work — Vue/Nuxt, TypeScript, design systems,
            and shipping product end to end. Based in Porto, working with teams anywhere.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <Button as="a" href="mailto:hello@dlbcodes.dev" variant="primary" size="lg">Get in touch</Button>
            <Button as="a" href="https://github.com/dlbcodes" variant="outline" size="lg">GitHub</Button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-6 text-sm md:justify-self-end">
          <div>
            <p class="eyebrow mb-3 text-[var(--color-text-tertiary)]">Explore</p>
            <ul class="space-y-2">
              <li><a href="#library" class="hover:text-[var(--color-brand-100)]">Library</a></li>
              <li><a href="#templates" class="hover:text-[var(--color-brand-100)]">Templates</a></li>
              <li><a href="#playground" class="hover:text-[var(--color-brand-100)]">Playground</a></li>
            </ul>
          </div>
          <div>
            <p class="eyebrow mb-3 text-[var(--color-text-tertiary)]">Elsewhere</p>
            <ul class="space-y-2">
              <li><a href="https://www.npmjs.com/package/@dlbcodes/my-design-system" class="hover:text-[var(--color-brand-100)]">npm</a></li>
              <li><a href="https://github.com/dlbcodes" class="hover:text-[var(--color-brand-100)]">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-14 flex flex-col items-start justify-between gap-2 border-t border-[var(--color-border-subtle)] pt-6 text-xs text-[var(--color-text-tertiary)] sm:flex-row sm:items-center">
        <p>© {{ new Date().getFullYear() }} Daniel Braga. Built with the library it's about.</p>
        <p class="font-mono">Porto, Portugal</p>
      </div>
    </div>
  </footer>
</template>
