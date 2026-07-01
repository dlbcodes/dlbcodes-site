<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Panel,
  PanelHeader,
  PanelContent,
  Field,
  FieldLabel,
  FieldContent,
  Switch,
  Separator,
  Button,
  Badge,
} from '@dlbcodes/my-design-system'

const swatches = [
  { name: 'Terracotta', value: 'oklch(60.78% 0.1379 39.01)' },
  { name: 'Indigo', value: 'oklch(45.78% 0.143 287.89)' },
  { name: 'Forest', value: 'oklch(52% 0.13 152)' },
  { name: 'Rose', value: 'oklch(52% 0.17 25)' },
]
const activeSwatch = ref(0)
const rounded = ref(true)

const accent = computed(() => swatches[activeSwatch.value].value)
</script>

<template>
  <section id="playground" class="mx-auto max-w-6xl px-6 py-20">
    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div>
        <p class="eyebrow mb-3 text-[var(--color-brand-100)]">dlbcodes-playground</p>
        <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">The customizer that sells itself</h2>
        <p class="mt-4 text-[var(--color-text-secondary)]">
          Every component in the library lives in a playground app where you can swap tokens — color,
          radius, spacing — and watch every instance update at once. It's the fastest way to see whether
          a theme actually holds together before you ship it.
        </p>
        <p class="mt-4 text-[var(--color-text-secondary)]">
          The playground's own UI is built with the library — the panel, fields, switches and
          separators you see here aren't hand-rolled markup. Using the library to build the tool that
          sells the library is the point.
        </p>
        <div class="mt-6 flex flex-wrap gap-3 text-sm">
          <div class="rounded-lg border border-[var(--color-border-subtle)] px-3 py-2">
            <p class="font-mono text-xs text-[var(--color-text-tertiary)]">tokens</p>
            <p class="font-medium">Semantic, overridable</p>
          </div>
          <div class="rounded-lg border border-[var(--color-border-subtle)] px-3 py-2">
            <p class="font-mono text-xs text-[var(--color-text-tertiary)]">scope</p>
            <p class="font-medium">Per-page, live</p>
          </div>
        </div>
      </div>

      <div :style="{ '--color-brand-100': accent, '--color-brand-200': accent }">
        <Panel class="overflow-hidden">
          <PanelHeader class="flex items-center justify-between px-4 py-3">
            <p class="text-sm font-medium">Theme customizer</p>
            <Badge variant="outline" class="font-mono text-[11px]">live</Badge>
          </PanelHeader>
          <Separator />
          <PanelContent class="space-y-5 px-4 py-4">
            <div>
              <p class="mb-2 text-xs text-[var(--color-text-tertiary)]">Accent</p>
              <div class="flex gap-2">
                <button
                  v-for="(s, i) in swatches"
                  :key="s.name"
                  type="button"
                  class="size-7 rounded-full border-2 transition-transform"
                  :class="activeSwatch === i ? 'scale-110 border-[var(--color-text-primary)]' : 'border-transparent'"
                  :style="{ background: s.value }"
                  :aria-label="s.name"
                  @click="activeSwatch = i"
                />
              </div>
            </div>

            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel>Rounded corners</FieldLabel>
              </FieldContent>
              <Switch v-model="rounded" />
            </Field>

            <Separator />

            <div class="flex items-center gap-2">
              <Button variant="primary" size="sm" :class="rounded ? 'rounded-full' : 'rounded-sm'">Preview button</Button>
              <Button variant="outline" size="sm" :class="rounded ? 'rounded-full' : 'rounded-sm'">Secondary</Button>
            </div>
          </PanelContent>
        </Panel>
      </div>
    </div>
  </section>
</template>
