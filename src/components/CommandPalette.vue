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
    PhArrowSquareOut,
} from "@phosphor-icons/vue";
import type { Component } from "vue";
import { projects } from "../data/projects";
import { site } from "../data/site";

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

interface CommandGroup {
    heading: string;
    commands: Command[];
}

// pick an icon per project slug; fall back to a generic one
const projectIcons: Record<string, Component> = {
    "dlbcodes/my-design-system": PhPackage,
    "dlbcodes/assistant": PhChatCircle,
    "dlbcodes/amalia-chat": PhChatCircle,
    "dlbcodes/console": PhTerminalWindow,
    "dlbcodes/playground": PhSliders,
};

const groups: CommandGroup[] = [
    {
        heading: "Projects",
        commands: projects.map((p) => ({
            id: p.slug,
            label: p.slug,
            icon: projectIcons[p.slug] ?? PhArrowSquareOut,
            keywords: p.description,
            run: () => window.open(p.href, "_blank", "noopener,noreferrer"),
        })),
    },
    {
        heading: "Contact",
        commands: [
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
        ],
    },
    {
        heading: "Social",
        commands: [
            {
                id: "github",
                label: "Open GitHub",
                icon: PhGithubLogo,
                keywords: "code repos",
                run: () =>
                    window.open(
                        site.socials.github,
                        "_blank",
                        "noopener,noreferrer",
                    ),
            },
            {
                id: "twitter",
                label: "Open Twitter",
                icon: PhTwitterLogo,
                keywords: "x social",
                run: () =>
                    window.open(
                        site.socials.twitter,
                        "_blank",
                        "noopener,noreferrer",
                    ),
            },
        ],
    },
];

const query = ref("");
const selected = ref(0);
const inputRef = ref<InstanceType<typeof Input>>();
const listRef = ref<HTMLElement>();

// filtered groups: keep only groups with matches, for rendering with headings
const filteredGroups = computed<CommandGroup[]>(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return groups;
    return groups
        .map((g) => ({
            heading: g.heading,
            commands: g.commands.filter((c) =>
                `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(q),
            ),
        }))
        .filter((g) => g.commands.length > 0);
});

// flat list of matches, for keyboard navigation across all groups
const flatResults = computed<Command[]>(() =>
    filteredGroups.value.flatMap((g) => g.commands),
);

// map a command id to its index in the flat list (for highlight + aria)
const indexOf = (id: string): number =>
    flatResults.value.findIndex((c) => c.id === id);

const run = (cmd: Command): void => {
    open.value = false;
    cmd.run();
};

const move = (delta: number): void => {
    const count = flatResults.value.length;
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
        const cmd = flatResults.value[selected.value];
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

watch(flatResults, () => (selected.value = 0));

watch(selected, async () => {
    await nextTick();
    listRef.value
        ?.querySelector(`[data-index="${selected.value}"]`)
        ?.scrollIntoView({ block: "nearest" });
});

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
                        flatResults[selected]
                            ? `command-${flatResults[selected].id}`
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

            <div
                id="command-list"
                ref="listRef"
                role="listbox"
                aria-label="Commands"
                class="max-h-80 overflow-y-auto p-2"
            >
                <template v-for="group in filteredGroups" :key="group.heading">
                    <!-- group heading -->
                    <div
                        role="presentation"
                        class="px-3 pb-1 pt-3 text-xs font-medium uppercase tracking-wide text-text-tertiary first:pt-1"
                    >
                        {{ group.heading }}
                    </div>

                    <div
                        v-for="cmd in group.commands"
                        :id="`command-${cmd.id}`"
                        :key="cmd.id"
                        :data-index="indexOf(cmd.id)"
                        role="option"
                        :aria-selected="indexOf(cmd.id) === selected"
                    >
                        <button
                            type="button"
                            tabindex="-1"
                            class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                            :class="
                                indexOf(cmd.id) === selected
                                    ? 'bg-bg-surface text-text-primary'
                                    : 'text-text-secondary hover:bg-bg-surface'
                            "
                            @click="run(cmd)"
                            @mousemove="selected = indexOf(cmd.id)"
                        >
                            <component
                                :is="cmd.icon"
                                class="size-4 shrink-0 text-text-tertiary"
                                aria-hidden="true"
                            />
                            {{ cmd.label }}
                        </button>
                    </div>
                </template>

                <div
                    v-if="!flatResults.length"
                    class="px-3 py-6 text-center text-sm text-text-tertiary"
                >
                    No commands found.
                </div>
            </div>
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
