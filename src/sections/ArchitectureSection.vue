<script setup lang="ts">
const items = [
  { label: 'primitives/', desc: 'Button, Badge, Avatar, Panel, Tabs, Alert, Empty, Sidebar — standalone building blocks.' },
  { label: 'form/', desc: 'Field, Input, Select, MultiSelect, Dropdown — the id/aria-wiring lives in Field, not each control.' },
  { label: 'overlays/', desc: 'Modal, Popover — teleported, focus-trapped, positioned with Headless UI Float.' },
  { label: 'tokens.css', desc: 'One semantic layer over a primitive palette. Retheme by overriding tokens, never components.' },
]
</script>

<template>
  <section id="about" class="border-t border-[var(--color-border-subtle)]">
    <div class="mx-auto max-w-6xl px-6 py-20">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p class="eyebrow mb-3 text-[var(--color-brand-100)]">How it's built</p>
          <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Compound over configurable</h2>
          <p class="mt-4 text-[var(--color-text-secondary)]">
            No single component takes twenty props to cover every case. Instead you compose small parts —
            <span class="text-[var(--color-text-primary)] font-medium">Field + FieldLabel + Input</span>,
            not one Input with a label prop, a description prop, and an error prop bolted on.
          </p>
        </div>

        <div class="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-1">
          <div
            v-for="(item, i) in items"
            :key="item.label"
            class="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-6"
            :class="i !== items.length - 1 ? 'border-b border-[var(--color-border-subtle)]' : ''"
          >
            <p class="w-32 shrink-0 font-mono text-sm text-[var(--color-brand-100)]">{{ item.label }}</p>
            <p class="text-sm text-[var(--color-text-secondary)]">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
