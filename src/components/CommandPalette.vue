<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import {
    Modal,
    ModalContent,
    ModalFooter,
    Input,
    Kbd,
    KbdGroup,
} from "@dlbcodes/my-design-system";
import { useClipboard, onKeyStroke } from "@vueuse/core";
import {
    PhMagnifyingGlass,
    PhPackage,
    PhChatCircle,
    PhTerminalWindow,
    PhSliders,
    PhEnvelopeSimple,
    PhCopy,
    PhGithubLogo,
    PhTwitterLogo,
} from "@phosphor-icons/vue";
import type { Component } from "vue";

const props = defineProps<{ email: string }>();
const emit = defineEmits<{ contact: [] }>();
const open = defineModel<boolean>({ default: false });

const { copy } = useClipboard({ source: props.email });

interface Command {
    id: string;
    label: string;
    icon: Component;
    keywords?: string;
    run: () => void;
}

const commands: Command[] = [
    {
        id: "library",
        label: "Open the component library",
        icon: PhPackage,
        keywords: "ui design system npm",
        run: () => window.open("https://ui.dlbcodes.com", "_blank"),
    },
    {
        id: "assistant",
        label: "Open the Assistant template",
        icon: PhChatCircle,
        keywords: "soft consumer ai",
        run: () => window.open("https://assistant.dlbcodes.com", "_blank"),
    },
    {
        id: "console",
        label: "Open the Console template",
        icon: PhTerminalWindow,
        keywords: "dense dashboard vercel",
        run: () => window.open("https://console.dlbcodes.com", "_blank"),
    },
    {
        id: "playground",
        label: "Open the Playground",
        icon: PhSliders,
        keywords: "customizer tokens reskin",
        run: () => window.open("https://playground.dlbcodes.com", "_blank"),
    },
    {
        id: "say-hi",
        label: "Say hi",
        icon: PhEnvelopeSimple,
        keywords: "contact form email message",
        run: () => emit("contact"),
    },
    {
        id: "copy-email",
        label: `Copy email — ${props.email}`,
        icon: PhCopy,
        keywords: "email address clipboard",
        run: () => copy(props.email),
    },
    {
        id: "github",
        label: "Open GitHub",
        icon: PhGithubLogo,
        keywords: "code repos",
        run: () => window.open("https://github.com/dlbcodes", "_blank"),
    },
    {
        id: "twitter",
        label: "Open Twitter",
        icon: PhTwitterLogo,
        keywords: "x social",
        run: () => window.open("https://twitter.com/dlbcode", "_blank"),
    },
];

const query = ref("");
const selected = ref(0);
const inputRef = ref<InstanceType<typeof Input>>();
const listRef = ref<HTMLElement>();

const results = computed<Command[]>(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
        `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
});

const run = (cmd: Command): void => {
    open.value = false;
    cmd.run();
};

const move = (delta: number): void => {
    const count = results.value.length;
    if (!count) return;
    selected.value = (selected.value + delta + count) % count;
};

const onKeydown = (e: KeyboardEvent): void => {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        move(1);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        move(-1);
    } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = results.value[selected.value];
        if (cmd) run(cmd);
    }
};

watch(open, async (isOpen) => {
    if (!isOpen) return;
    query.value = "";
    selected.value = 0;
    await nextTick();
    const root = inputRef.value?.$el as HTMLElement | undefined;
    (root?.querySelector("input") ?? root)?.focus();
});

watch(results, () => (selected.value = 0));

watch(selected, async () => {
    await nextTick();
    listRef.value
        ?.querySelector(`[data-index="${selected.value}"]`)
        ?.scrollIntoView({ block: "nearest" });
});

// global Cmd/Ctrl+K to open the palette
onKeyStroke("k", (e) => {
    if (!e.metaKey && !e.ctrlKey) return;
    e.preventDefault();
    open.value = true;
});
</script>

<template>
    <Modal v-model="open" size="lg">
        <ModalContent class="p-0">
            <div class="flex items-center border-b border-border-subtle px-4">
                <Input
                    ref="inputRef"
                    v-model="query"
                    placeholder="Type a command…"
                    class="border-0 bg-transparent shadow-none focus-within:ring-0"
                    role="combobox"
                    aria-controls="command-list"
                    aria-expanded="true"
                    :aria-activedescendant="
                        results[selected]
                            ? `command-${results[selected].id}`
                            : undefined
                    "
                    @keydown="onKeydown"
                >
                    <PhMagnifyingGlass
                        class="size-5 shrink-0 text-text-tertiary"
                        aria-hidden="true"
                    />
                </Input>
            </div>

            <ul
                id="command-list"
                ref="listRef"
                role="listbox"
                class="max-h-80 overflow-y-auto p-2"
            >
                <li
                    v-for="(cmd, i) in results"
                    :id="`command-${cmd.id}`"
                    :key="cmd.id"
                    :data-index="i"
                    role="option"
                    :aria-selected="i === selected"
                >
                    <button
                        type="button"
                        tabindex="-1"
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                        :class="
                            i === selected
                                ? 'bg-bg-surface text-text-primary'
                                : 'text-text-secondary hover:bg-bg-surface'
                        "
                        @click="run(cmd)"
                        @mousemove="selected = i"
                    >
                        <component
                            :is="cmd.icon"
                            class="size-4 shrink-0 text-text-tertiary"
                            aria-hidden="true"
                        />
                        {{ cmd.label }}
                    </button>
                </li>

                <li
                    v-if="!results.length"
                    class="px-3 py-6 text-center text-sm text-text-tertiary"
                >
                    No commands found.
                </li>
            </ul>
        </ModalContent>

        <ModalFooter
            class="justify-start gap-2 border-t border-border-subtle font-mono text-xs tracking-tight text-text-tertiary"
        >
            <span class="flex items-center gap-1">
                <KbdGroup><Kbd>↑</Kbd><Kbd>↓</Kbd></KbdGroup>
                to navigate
            </span>
            <span class="flex items-center gap-1"><Kbd>↵</Kbd> to select</span>
            <span class="flex items-center gap-1"><Kbd>esc</Kbd> to close</span>
        </ModalFooter>
    </Modal>
</template>
