<script setup lang="ts">
import { Badge } from "@dlbcodes/my-design-system";

const projects = [
    {
        slug: "dlbcodes/design-system",
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
</script>

<template>
    <div class="mx-auto max-w-xl px-6 py-20 sm:py-28">
        <!-- name / handle line -->
        <p class="mb-10 text-sm text-text-secondary">
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
        </p>

        <!-- big personal statement, rvmp-style -->
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
                >dlbcodes/design-system</a
            >, and the templates below to prove it doesn't make every product
            look the same.
        </p>

        <Badge variant="outline" class="mt-6"
            >Available for freelance work</Badge
        >

        <!-- project list, shadcn.com style -->
        <div class="mt-16 space-y-8">
            <a
                v-for="p in projects"
                :key="p.slug"
                :href="p.href"
                target="_blank"
                class="block"
            >
                <p class="font-mono text-sm text-text-primary">
                    {{ p.slug }}
                </p>
                <p class="text-sm text-text-secondary">
                    {{ p.description }}
                </p>
            </a>
        </div>
    </div>
</template>
