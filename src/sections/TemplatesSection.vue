<script setup lang="ts">
import { Button, Badge } from '@dlbcodes/my-design-system'
</script>

<template>
  <section id="templates" class="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)]/40">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <div class="mb-10 max-w-xl">
        <p class="eyebrow mb-3 text-[var(--color-brand-100)]">Proof, not just claims</p>
        <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Two templates. One library.</h2>
        <p class="mt-3 text-[var(--color-text-secondary)]">
          The usual complaint about component libraries is that every app built with them looks the same.
          So I built two open-source Vue 3 demo templates on the exact same components — deliberately at
          opposite ends of the aesthetic spectrum.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Assistant template -->
        <div class="overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-base)]">
          <div class="border-b border-[var(--color-border-subtle)] p-5 pb-6">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-display text-xl font-semibold">Assistant</h3>
                <p class="mt-1 text-sm text-[var(--color-text-secondary)]">Soft, warm, conversational — a consumer AI-assistant UI.</p>
              </div>
              <Badge variant="outline" class="font-mono text-[11px]">MIT</Badge>
            </div>
          </div>

          <!-- CSS-only mock preview -->
          <div class="bg-[var(--color-bg-200)] p-5">
            <div class="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] p-4 shadow-sm">
              <div class="mb-3 flex items-center gap-2">
                <div class="size-6 rounded-full bg-[var(--color-brand-100)]"></div>
                <div class="h-2.5 w-24 rounded-full bg-[var(--color-bg-strong)]"></div>
              </div>
              <div class="space-y-2">
                <div class="ml-auto w-2/3 rounded-2xl rounded-tr-sm bg-[var(--color-brand-100)]/10 p-3">
                  <div class="h-2 w-full rounded-full bg-[var(--color-brand-100)]/40"></div>
                  <div class="mt-1.5 h-2 w-2/3 rounded-full bg-[var(--color-brand-100)]/40"></div>
                </div>
                <div class="w-3/4 rounded-2xl rounded-tl-sm bg-[var(--color-bg-200)] p-3">
                  <div class="h-2 w-full rounded-full bg-[var(--color-bg-strong)]"></div>
                  <div class="mt-1.5 h-2 w-1/2 rounded-full bg-[var(--color-bg-strong)]"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between p-5 pt-4">
            <p class="text-xs text-[var(--color-text-tertiary)]">MIT licensed · README · Open Graph metadata</p>
            <Button as="a" href="https://github.com/dlbcodes" variant="ghost" size="sm">View on GitHub</Button>
          </div>
        </div>

        <!-- Console template -->
        <div data-theme="console" class="overflow-hidden rounded-2xl border border-[var(--color-console-border)] bg-[var(--color-bg-base)]">
          <div class="border-b border-[var(--color-border-subtle)] p-5 pb-6">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-display text-xl font-semibold">dlbcodes-console</h3>
                <p class="mt-1 text-sm text-[var(--color-text-secondary)]">Dense, Vercel-style developer dashboard.</p>
              </div>
              <Badge variant="outline" class="font-mono text-[11px]">MIT</Badge>
            </div>
          </div>

          <div class="bg-[var(--color-bg-200)] p-5">
            <div class="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] p-3">
              <div class="mb-3 flex items-center justify-between">
                <div class="h-2.5 w-20 rounded-full bg-[var(--color-bg-strong)]"></div>
                <div class="h-5 w-16 rounded-md bg-[var(--color-console-accent)]/70"></div>
              </div>
              <div class="space-y-1.5">
                <div v-for="i in 4" :key="i" class="flex items-center gap-2 rounded-md border border-[var(--color-border-subtle)] p-2">
                  <div class="size-4 rounded bg-[var(--color-bg-strong)]"></div>
                  <div class="h-1.5 flex-1 rounded-full bg-[var(--color-bg-strong)]"></div>
                  <div class="h-1.5 w-8 rounded-full bg-[var(--color-success-100)]/60"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between p-5 pt-4">
            <p class="text-xs text-[var(--color-text-tertiary)]">Projects · Activity · Team · Account</p>
            <Button as="a" href="https://github.com/dlbcodes" variant="ghost" size="sm">View on GitHub</Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
