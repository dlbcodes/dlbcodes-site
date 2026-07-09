<script setup lang="ts">
import { ref } from "vue";
import { Badge, Avatar, Button, KbdGroup, Kbd } from "@dlbcodes/ui";
import {
    PhCopy,
    PhCheck,
    PhMagnifyingGlass,
    PhArrowRight,
} from "@phosphor-icons/vue";
import { useClipboard, onKeyStroke } from "@vueuse/core";
import ContactModal from "./components/ContactModal.vue";
import CommandPalette from "./components/CommandPalette.vue";
import TemplateShowcase from "./components/TemplateShowcase.vue";
import { projects } from "./data/projects";
import { site } from "./data/site";

const contactOpen = ref(false);
const commandOpen = ref(false);

const { copy, copied } = useClipboard({ source: site.email });

// userAgent is the robust check; navigator.platform is deprecated
const isMac = /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
const modKey = isMac ? "⌘" : "Ctrl";

onKeyStroke("o", (e) => {
    if (!e.metaKey && !e.ctrlKey) return;
    e.preventDefault();
    contactOpen.value = true;
});

onKeyStroke("k", (e) => {
    if (!e.metaKey && !e.ctrlKey) return;
    e.preventDefault();
    commandOpen.value = true;
});
</script>

<template>
    <main class="mx-auto max-w-xl px-6 py-20 sm:py-28">
        <Button
            variant="outline"
            size="icon-sm"
            class="mb-4 hidden md:flex"
            aria-label="Open command palette"
            @click="commandOpen = true"
        >
            <PhMagnifyingGlass aria-hidden="true" />
            <KbdGroup aria-hidden="true">
                <Kbd>{{ modKey }}</Kbd>
                <Kbd>K</Kbd>
            </KbdGroup>
        </Button>

        <nav aria-label="Social links">
            <p
                class="mb-10 flex flex-wrap items-center gap-x-2 text-sm text-text-secondary font-mono"
            >
                <span class="text-text-primary">dlbcodes</span>
                <span aria-hidden="true">/</span>
                <a
                    :href="site.socials.twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline decoration-border-strong underline-offset-4 outline-none focus-visible:text-brand-100 hover:text-text-primary"
                    >twitter</a
                >
                <span aria-hidden="true">/</span>
                <a
                    :href="site.socials.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline decoration-border-strong underline-offset-4 outline-none focus-visible:text-brand-100 hover:text-text-primary"
                    >github</a
                >
                <span aria-hidden="true">/</span>
                <button
                    type="button"
                    class="inline-flex items-center gap-1 underline decoration-border-strong underline-offset-4 outline-none focus-visible:text-brand-100 hover:text-text-primary"
                    :aria-label="
                        copied ? 'Email copied' : `Copy email ${site.email}`
                    "
                    @click="copy(site.email)"
                >
                    {{ site.email }}
                    <PhCheck
                        v-if="copied"
                        class="size-3.5"
                        aria-hidden="true"
                    />
                    <PhCopy v-else class="size-3.5" aria-hidden="true" />
                </button>
                <span class="sr-only" role="status" aria-live="polite">
                    {{ copied ? "Email copied to clipboard" : "" }}
                </span>
            </p>
        </nav>

        <Avatar name="Daniel" src="/AvatarTwitter-min.png" size="xl" />

        <h1
            class="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl pt-2"
        >
            I'm Daniel, a frontend developer and indie founder based in Porto.
        </h1>

        <p class="mt-6 max-w-md text-text-secondary">
            I built
            <a
                href="https://www.npmjs.com/package/@dlbcodes/ui"
                target="_blank"
                rel="noopener noreferrer"
                class="text-text-primary underline decoration-border-strong underline-offset-4 outline-none focus-visible:text-brand-100"
                >@dlbcodes/ui</a
            >, and the templates below to prove it doesn't make every product
            look the same.
        </p>

        <div class="mt-6 flex flex-col gap-3">
            <Badge variant="success">Available for work</Badge>
            <Button
                variant="outline"
                size="base"
                class="w-fit"
                @click="contactOpen = true"
            >
                Say hi
                <KbdGroup aria-hidden="true">
                    <Kbd>{{ modKey }}</Kbd>
                    <Kbd>O</Kbd>
                </KbdGroup>
            </Button>
        </div>

        <nav aria-label="Projects" class="mt-16">
            <ul class="space-y-8">
                <li v-for="p in projects" :key="p.slug">
                    <a
                        :href="p.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group block rounded-md outline-none"
                    >
                        <span
                            class="relative flex gap-x-2 font-mono text-sm text-text-primary transition-colors group-focus-visible:text-brand-100"
                        >
                            <PhArrowRight
                                class="absolute right-full top-1/2 mr-1 size-3.5 shrink-0 -translate-y-1/2 translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                                aria-hidden="true"
                            />
                            {{ p.slug }}
                            <Kbd
                                class="hidden group-focus-visible:flex"
                                aria-hidden="true"
                                >↵</Kbd
                            >
                        </span>
                        <span class="block text-sm text-text-secondary">{{
                            p.description
                        }}</span>
                    </a>
                </li>
            </ul>
        </nav>

        <TemplateShowcase />

        <ContactModal v-model="contactOpen" :email="site.email" />
        <CommandPalette
            v-model="commandOpen"
            :email="site.email"
            @contact="contactOpen = true"
        />
    </main>
</template>
