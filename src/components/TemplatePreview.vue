<script setup lang="ts">
import { ref, watch, computed, useTemplateRef } from "vue";
import { PhX, PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { useScrollLock } from "@vueuse/core";

const props = defineProps<{
    images: string[];
    startIndex?: number;
}>();

// open state via v-model
const open = defineModel<boolean>({ required: true });

const index = ref(props.startIndex ?? 0);
const current = computed(() => props.images[index.value]);

// when opened, jump to the requested start image
watch(open, (isOpen) => {
    if (isOpen) index.value = props.startIndex ?? 0;
});

const next = () => (index.value = (index.value + 1) % props.images.length);
const prev = () =>
    (index.value =
        (index.value - 1 + props.images.length) % props.images.length);

const close = () => (open.value = false);

// scroll lock + focus trap
const isLocked = useScrollLock(document.documentElement);
const dialogRef = useTemplateRef<HTMLElement>("dialog");
const { activate, deactivate } = useFocusTrap(dialogRef, {
    immediate: false,
    escapeDeactivates: true,
    allowOutsideClick: true,
});

watch(open, async (isOpen) => {
    isLocked.value = isOpen;
    if (isOpen) {
        await Promise.resolve();
        activate();
    } else {
        deactivate();
    }
});

const hasMultiple = computed(() => props.images.length > 1);
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-150"
            leave-active-class="transition-opacity duration-150"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="open"
                ref="dialog"
                class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-bg-inverse/80 p-4 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-label="Screenshot preview"
                @click="close"
                @keydown.esc="close"
                @keydown.left="prev"
                @keydown.right="next"
            >
                <button
                    type="button"
                    class="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-bg-raised text-text-secondary hover:text-text-primary sm:right-4 sm:top-4"
                    aria-label="Close preview"
                    @click.stop="close"
                >
                    <PhX class="size-5" />
                </button>

                <img
                    :src="current"
                    alt=""
                    class="min-h-0 max-w-full rounded-lg object-contain sm:max-w-5xl"
                    @click.stop
                />

                <div
                    v-if="hasMultiple"
                    class="flex items-center gap-4 sm:contents"
                >
                    <button
                        type="button"
                        class="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-raised text-text-secondary hover:text-text-primary sm:absolute sm:left-4 sm:top-1/2 sm:-translate-y-1/2"
                        aria-label="Previous screenshot"
                        @click.stop="prev"
                    >
                        <PhCaretLeft class="size-5" />
                    </button>

                    <div
                        class="rounded-full bg-bg-raised px-3 py-1 font-mono text-xs text-text-secondary sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2"
                    >
                        {{ index + 1 }} / {{ images.length }}
                    </div>

                    <button
                        type="button"
                        class="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-raised text-text-secondary hover:text-text-primary sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
                        aria-label="Next screenshot"
                        @click.stop="next"
                    >
                        <PhCaretRight class="size-5" />
                    </button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
