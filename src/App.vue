<script setup lang="ts">
import { ref } from "vue";
import {
    Badge,
    Avatar,
    Button,
    KbdGroup,
    Kbd,
} from "@dlbcodes/my-design-system";
import { PhCopy, PhCheck } from "@phosphor-icons/vue";
import { useClipboard, onKeyStroke } from "@vueuse/core";
import ContactModal from "./components/ContactModal.vue";

const projects = [
    {
        slug: "dlbcodes/my-design-system",
        href: "https://ui.dlbcodes.com",
        description:
            "A compound, tokenized Vue 3 component library. Built on Headless UI.",
    },
    {
        slug: "dlbcodes/assistant",
        href: "https://assistant.dlbcodes.com",
        description:
            "Soft, conversational template — a consumer AI-assistant UI.",
    },
    {
        slug: "dlbcodes/console",
        href: "https://console.dlbcodes.com",
        description:
            "Dense, Vercel-style dashboard. Same library, opposite look.",
    },
    {
        slug: "dlbcodes/playground",
        href: "https://playground.dlbcodes.com",
        description:
            "Live customizer — reskin every component by swapping tokens.",
    },
];

const email = "dlobocode@gmail.com";
const contactOpen = ref(false);
const { copy, copied } = useClipboard({ source: email });

const isMac = navigator.platform.toLowerCase().includes("mac");

onKeyStroke("o", (e) => {
    if (!e.metaKey && !e.ctrlKey) return;
    e.preventDefault();
    contactOpen.value = true;
});
</script>

<template>
    <div class="mx-auto max-w-xl px-6 py-20 sm:py-28">
        <p
            class="mb-10 flex flex-wrap items-center gap-x-2 text-sm text-text-secondary font-mono"
        >
            <span class="text-text-primary">dlbcodes</span>
            /
            <a
                href="https://twitter.com/dlbcode"
                target="_blank"
                class="underline decoration-border-strong underline-offset-4 hover:text-text-primary"
                >twitter</a
            >
            /
            <a
                href="https://github.com/dlbcodes"
                target="_blank"
                class="underline decoration-border-strong underline-offset-4 hover:text-text-primary"
                >github</a
            >
            /
            <button
                type="button"
                class="inline-flex items-center gap-1 underline decoration-border-strong underline-offset-4 hover:text-text-primary"
                @click="copy(email)"
            >
                {{ email }}
                <PhCheck v-if="copied" class="size-3.5" />
                <PhCopy v-else class="size-3.5" />
            </button>
        </p>

        <Avatar
            name="Daniel"
            src="../src/assets/images/AvatarTwitter-min.png"
            size="xl"
        />

        <h1
            class="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
        >
            I'm Daniel, a frontend developer and indie founder based in Porto.
        </h1>

        <p class="mt-6 max-w-md text-text-secondary">
            I built
            <a
                href="https://www.npmjs.com/package/@dlbcodes/my-design-system"
                class="text-text-primary underline decoration-border-strong underline-offset-4"
                >dlbcodes/my-design-system</a
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
                <KbdGroup>
                    <Kbd>{{ isMac ? "⌘" : "Ctrl" }}</Kbd>
                    <Kbd>O</Kbd>
                </KbdGroup>
            </Button>
        </div>

        <div class="mt-16 space-y-8">
            <a
                v-for="p in projects"
                :key="p.slug"
                :href="p.href"
                target="_blank"
                class="block"
            >
                <p class="font-mono text-sm text-text-primary">{{ p.slug }}</p>
                <p class="text-sm text-text-secondary">{{ p.description }}</p>
            </a>
        </div>

        <ContactModal v-model="contactOpen" :email="email" />
    </div>
</template>
