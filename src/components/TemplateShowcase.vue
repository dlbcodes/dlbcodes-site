<!-- components/TemplateShowcase.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { PhArrowRight, PhArrowUpRight } from "@phosphor-icons/vue";
import { projects } from "../data/projects";
import TemplatePreview from "./TemplatePreview.vue";

const withImages = projects.filter((p) => p.images?.length);

const previewOpen = ref(false);
const previewImages = ref<string[]>([]);
const previewStart = ref(0);

const openPreview = (images: string[], index: number) => {
    previewImages.value = images;
    previewStart.value = index;
    previewOpen.value = true;
};
</script>

<template>
    <section aria-label="Template screenshots" class="mt-16 space-y-12">
        <div v-for="p in withImages" :key="p.slug">
            <p class="flex gap-x-2 font-mono text-sm text-text-primary">
                {{ p.slug }}
            </p>

            <div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <button
                    v-for="(src, i) in p.images"
                    :key="src"
                    type="button"
                    class="group/thumb overflow-hidden rounded-lg border border-border-subtle bg-bg-surface outline-none focus-visible:ring-2 focus-visible:ring-border-strong"
                    :class="[
                        i >= 2 && i < 3 ? 'hidden sm:block' : '',
                        i >= 3 ? 'hidden' : '',
                    ]"
                    :aria-label="`View screenshot ${i + 1} of ${p.slug}`"
                    @click="openPreview(p.images!, i)"
                >
                    <img
                        :src="src"
                        :alt="`${p.slug} screenshot ${i + 1}`"
                        loading="lazy"
                        class="aspect-16/10 w-full object-cover transition-transform duration-200 group-hover/thumb:scale-[1.02]"
                    />
                </button>
            </div>

            <!-- Actions -->
            <div class="mt-3 flex gap-x-8">
                <a
                    :href="p.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group block rounded-md outline-none"
                >
                    <span
                        class="relative flex items-center gap-x-1 font-mono text-sm text-text-secondary transition-colors group-hover:text-text-primary group-focus-visible:text-brand-100"
                    >
                        <PhArrowRight
                            class="absolute right-full top-1/2 mr-1 size-3.5 shrink-0 -translate-y-1/2 translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                            aria-hidden="true"
                        />
                        preview
                        <PhArrowUpRight
                            class="size-3.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                            aria-hidden="true"
                        />
                    </span>
                </a>

                <a
                    v-if="p.repo"
                    :href="p.repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group block rounded-md outline-none"
                >
                    <span
                        class="relative flex items-center gap-x-1 font-mono text-sm text-text-secondary transition-colors group-hover:text-text-primary group-focus-visible:text-brand-100"
                    >
                        <PhArrowRight
                            class="absolute right-full top-1/2 mr-1 size-3.5 shrink-0 -translate-y-1/2 translate-x-1 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                            aria-hidden="true"
                        />
                        github
                        <PhArrowUpRight
                            class="size-3.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                            aria-hidden="true"
                        />
                    </span>
                </a>
            </div>
            <!-- End Actions -->
        </div>

        <!-- Preview -->
        <TemplatePreview
            v-model="previewOpen"
            :images="previewImages"
            :start-index="previewStart"
        />
        <!-- End Preview -->
    </section>
</template>
