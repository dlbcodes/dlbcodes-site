<script setup lang="ts">
import { Button, Badge } from '@dlbcodes/my-design-system'
import ReskinDemo from './ReskinDemo.vue'
</script>

<template>
  <section id="top" class="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24">
    <div class="grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
      <div>
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-3 py-1">
          <span class="relative flex size-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success-100)] opacity-75"></span>
            <span class="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-100)]"></span>
          </span>
          <span class="text-xs font-medium text-[var(--color-text-secondary)]">Available for freelance work</span>
        </div>

        <h1 class="font-display text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          One library.
          <br />
          Every product
          <br />
          looks different.
        </h1>

        <p class="mt-6 max-w-md text-lg text-[var(--color-text-secondary)]">
          I'm Daniel — a frontend developer and indie founder in Porto. I build
          <span class="text-[var(--color-text-primary)] font-medium">@dlbcodes/my-design-system</span>,
          a compound, tokenized Vue 3 component library, and the products that prove it isn't just another shadcn clone.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <Button as="a" href="#library" variant="primary" size="lg">Browse the library</Button>
          <Button as="a" href="#templates" variant="outline" size="lg">See the templates</Button>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-2">
          <Badge variant="neutral" class="font-mono text-[11px]">Vue 3.5</Badge>
          <Badge variant="neutral" class="font-mono text-[11px]">TypeScript</Badge>
          <Badge variant="neutral" class="font-mono text-[11px]">Tailwind v4</Badge>
          <Badge variant="neutral" class="font-mono text-[11px]">Headless UI</Badge>
          <Badge variant="neutral" class="font-mono text-[11px]">CVA</Badge>
        </div>
      </div>

      <div class="flex justify-center md:justify-end">
        <ReskinDemo />
      </div>
    </div>
  </section>
</template>
