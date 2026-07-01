<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Badge,
  Avatar,
  Switch,
  Checkbox,
  Input,
  Progress,
  Kbd,
  KbdGroup,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsPanels,
  TabsContent,
  Alert,
  AlertTitle,
  AlertDescription,
  Field,
  FieldLabel,
  FieldContent,
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  Skeleton,
} from '@dlbcodes/my-design-system'
import ShowcaseCard from './ShowcaseCard.vue'

const notify = ref(true)
const agree = ref(false)
const framework = ref('vue')
</script>

<template>
  <section id="library" class="mx-auto max-w-6xl px-6 py-20">
    <div class="mb-10 max-w-xl">
      <p class="eyebrow mb-3 text-[var(--color-brand-100)]">@dlbcodes/my-design-system</p>
      <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">The library, rendered live</h2>
      <p class="mt-3 text-[var(--color-text-secondary)]">
        Every component below is the real thing — not a screenshot. Compound parts, semantic tokens,
        CVA variants, built on Headless UI. This whole page is themed with it.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ShowcaseCard name="Button">
        <Button variant="primary" size="sm">Primary</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="outline" size="sm">Outline</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
      </ShowcaseCard>

      <ShowcaseCard name="Badge">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </ShowcaseCard>

      <ShowcaseCard name="Avatar">
        <Avatar name="Daniel Braga" size="base" />
        <Avatar name="Ana Costa" size="base" />
        <Avatar name="João Silva" size="base" />
      </ShowcaseCard>

      <ShowcaseCard name="Switch &amp; Checkbox">
        <Switch v-model="notify" aria-label="Notifications" />
        <Checkbox v-model="agree" />
      </ShowcaseCard>

      <ShowcaseCard name="Kbd">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Enter</Kbd>
        </KbdGroup>
      </ShowcaseCard>

      <ShowcaseCard name="Progress">
        <div class="w-full space-y-2">
          <Progress :value="40" />
          <Progress :value="85" />
        </div>
      </ShowcaseCard>

      <ShowcaseCard name="Field + Input">
        <Field class="w-full">
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input placeholder="you@example.com" />
          </FieldContent>
        </Field>
      </ShowcaseCard>

      <ShowcaseCard name="Select">
        <Select v-model="framework" class="w-full">
          <SelectTrigger placeholder="Pick a framework" class="w-full" />
          <SelectContent>
            <SelectItem value="vue" label="Vue">Vue</SelectItem>
            <SelectItem value="react" label="React">React</SelectItem>
            <SelectItem value="svelte" label="Svelte">Svelte</SelectItem>
          </SelectContent>
        </Select>
      </ShowcaseCard>

      <ShowcaseCard name="Skeleton">
        <div class="w-full space-y-2">
          <Skeleton class="h-3 w-3/4" />
          <Skeleton class="h-3 w-1/2" />
        </div>
      </ShowcaseCard>

      <ShowcaseCard name="Tabs" :span="2">
        <Tabs class="w-full">
          <TabsList>
            <TabsTrigger>Overview</TabsTrigger>
            <TabsTrigger>Usage</TabsTrigger>
            <TabsTrigger>Theming</TabsTrigger>
          </TabsList>
          <TabsPanels class="pt-3 text-sm text-[var(--color-text-secondary)]">
            <TabsContent>Compound components, composed like Field + Label + Input rather than one prop-heavy component.</TabsContent>
            <TabsContent>Install from npm, import the components you need, no CLI copy-paste step required.</TabsContent>
            <TabsContent>Every color runs through a semantic token layer — override the tokens, retheme everything.</TabsContent>
          </TabsPanels>
        </Tabs>
      </ShowcaseCard>

      <ShowcaseCard name="Alert">
        <Alert variant="info" class="w-full">
          <AlertTitle>Reskin-safe</AlertTitle>
          <AlertDescription>This alert looks identical in the Assistant and Console templates — only the tokens change.</AlertDescription>
        </Alert>
      </ShowcaseCard>

      <ShowcaseCard name="Empty">
        <Empty class="w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <span class="text-lg">◇</span>
            </EmptyMedia>
            <EmptyTitle>No components yet</EmptyTitle>
            <EmptyDescription>Add your first block from the playground.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </ShowcaseCard>
    </div>
  </section>
</template>
