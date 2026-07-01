<script setup lang="ts">
import { ref } from 'vue'
import {
  Panel,
  PanelHeader,
  PanelContent,
  Field,
  FieldLabel,
  FieldContent,
  Switch,
  Button,
  Badge,
  Avatar,
  Progress,
  Separator,
} from '@dlbcodes/my-design-system'

const skin = ref<'assistant' | 'console'>('assistant')
const notifications = ref(true)
</script>

<template>
  <div class="w-full max-w-md">
    <div class="mb-3 flex items-center justify-between">
      <p class="eyebrow text-[var(--color-text-tertiary)]">Same components — {{ skin === 'assistant' ? 'Assistant' : 'Console' }} skin</p>
      <div class="flex overflow-hidden rounded-md border border-[var(--color-border-default)]">
        <button
          type="button"
          class="px-2.5 py-1 text-xs font-medium transition-colors"
          :class="skin === 'assistant' ? 'bg-[var(--color-text-primary)] text-[var(--color-text-inverse)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
          @click="skin = 'assistant'"
        >
          Assistant
        </button>
        <button
          type="button"
          class="px-2.5 py-1 text-xs font-medium transition-colors"
          :class="skin === 'console' ? 'bg-[var(--color-text-primary)] text-[var(--color-text-inverse)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
          @click="skin = 'console'"
        >
          Console
        </button>
      </div>
    </div>

    <div
      :data-theme="skin === 'console' ? 'console' : null"
      class="rounded-2xl border p-1 shadow-sm transition-colors duration-300"
      :class="skin === 'console' ? 'border-[var(--color-console-border)]' : 'border-[var(--color-border-subtle)]'"
      :style="{ background: 'var(--color-bg-base)' }"
    >
      <Panel class="border-0 shadow-none" :style="{ background: 'var(--color-bg-surface)' }">
        <PanelHeader class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-2">
            <Avatar name="Daniel Braga" size="sm" />
            <div class="leading-tight">
              <p class="text-sm font-medium">Daniel Braga</p>
              <p class="text-xs text-[var(--color-text-tertiary)]">{{ skin === 'assistant' ? 'Your assistant' : 'dlb-console / prod' }}</p>
            </div>
          </div>
          <Badge :variant="skin === 'assistant' ? 'success' : 'outline'">
            {{ skin === 'assistant' ? 'Online' : 'Deployed' }}
          </Badge>
        </PanelHeader>

        <Separator />

        <PanelContent class="space-y-4 px-4 py-4">
          <div>
            <div class="mb-1.5 flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
              <span>{{ skin === 'assistant' ? 'Daily focus' : 'Build usage' }}</span>
              <span>72%</span>
            </div>
            <Progress :value="72" />
          </div>

          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel>Notifications</FieldLabel>
            </FieldContent>
            <Switch v-model="notifications" />
          </Field>

          <Button :variant="skin === 'assistant' ? 'primary' : 'secondary'" size="sm" class="w-full">
            {{ skin === 'assistant' ? 'Ask a question' : 'View deployment' }}
          </Button>
        </PanelContent>
      </Panel>
    </div>
  </div>
</template>
