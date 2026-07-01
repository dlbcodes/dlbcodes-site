<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalDescription,
    ModalContent,
    ModalFooter,
    ModalClose,
    Field,
    FieldLabel,
    FieldContent,
    FieldError,
    Input,
    Textarea,
    Button,
} from "@dlbcodes/my-design-system";
import { PhCheck, PhAt } from "@phosphor-icons/vue";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
    modelValue: boolean;
    email: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: boolean];
}>();

const { copy, copied } = useClipboard({ source: props.email });

const name = ref("");
const senderEmail = ref("");
const message = ref("");
const status = ref<"idle" | "sending" | "sent" | "error">("idle");
const errors = reactive({ name: "", email: "", message: "" });

// swap in your own Formspree form id: https://formspree.io/forms
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

function validate() {
    errors.name = name.value.trim() ? "" : "Name is required.";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errors.email = !senderEmail.value.trim()
        ? "Email is required."
        : !emailPattern.test(senderEmail.value)
          ? "Enter a valid email."
          : "";

    errors.message =
        message.value.trim().length >= 10
            ? ""
            : "Say a little more — at least 10 characters.";

    return !errors.name && !errors.email && !errors.message;
}

watch(name, () => (errors.name = ""));
watch(senderEmail, () => (errors.email = ""));
watch(message, () => (errors.message = ""));

async function handleSubmit() {
    if (!validate()) return;

    status.value = "sending";
    try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(
                document.getElementById("contact-form") as HTMLFormElement,
            ),
        });
        if (!res.ok) throw new Error("Request failed");
        status.value = "sent";
        name.value = "";
        senderEmail.value = "";
        message.value = "";
    } catch {
        status.value = "error";
    }
}

function resetAndClose() {
    emit("update:modelValue", false);
    // small delay so the modal doesn't visibly flash back to idle mid-close
    setTimeout(() => (status.value = "idle"), 300);
}
</script>

<template>
    <Modal
        :model-value="modelValue"
        @update:model-value="(v) => emit('update:modelValue', v)"
    >
        <ModalHeader>
            <ModalTitle>Say hi</ModalTitle>
            <ModalDescription>
                Work, questions about the library, or just to say hi.
            </ModalDescription>
            <ModalClose @click="resetAndClose" />
        </ModalHeader>

        <ModalContent>
            <template v-if="status === 'sent'">
                <div class="flex flex-col items-center gap-2 py-6 text-center">
                    <PhCheck class="size-6 text-text-primary" />
                    <p class="font-medium text-text-primary">Message sent</p>
                    <p class="text-sm text-text-secondary">
                        Thanks — I'll get back to you soon.
                    </p>
                </div>
            </template>

            <form
                v-else
                id="contact-form"
                class="flex flex-col gap-4"
                @submit.prevent="handleSubmit"
            >
                <Field :invalid="!!errors.name">
                    <FieldLabel>Name</FieldLabel>
                    <FieldContent>
                        <Input
                            v-model="name"
                            name="name"
                            placeholder="Your name"
                        />
                    </FieldContent>
                    <FieldError v-if="errors.name">{{
                        errors.name
                    }}</FieldError>
                </Field>

                <Field :invalid="!!errors.email">
                    <FieldLabel>Email</FieldLabel>
                    <FieldContent>
                        <Input
                            v-model="senderEmail"
                            name="email"
                            inputmode="email"
                            autocomplete="email"
                            placeholder="you@example.com"
                        />
                    </FieldContent>
                    <FieldError v-if="errors.email">{{
                        errors.email
                    }}</FieldError>
                </Field>

                <Field :invalid="!!errors.message">
                    <FieldLabel>Message</FieldLabel>
                    <FieldContent>
                        <Textarea
                            v-model="message"
                            name="message"
                            placeholder="What's this about?"
                        />
                    </FieldContent>
                    <FieldError v-if="errors.message">{{
                        errors.message
                    }}</FieldError>
                </Field>

                <p v-if="status === 'error'" class="text-sm text-danger-100">
                    Something went wrong — try again, or email me directly.
                </p>
            </form>

            <button
                v-if="status !== 'sent'"
                type="button"
                class="mt-4 flex items-center gap-1.5 text-xs text-text-tertiary underline decoration-border-strong underline-offset-4 hover:text-text-secondary"
                @click="copy(email)"
            >
                <PhAt class="size-3.5" />
                or copy my email — {{ email }}
                <PhCheck v-if="copied" class="size-3.5" />
            </button>
        </ModalContent>

        <ModalFooter>
            <template v-if="status !== 'sent'">
                <Button
                    variant="primary"
                    type="submit"
                    form="contact-form"
                    :disabled="status === 'sending'"
                >
                    {{ status === "sending" ? "Sending…" : "Send message" }}
                </Button>
            </template>
            <template v-else>
                <Button variant="primary" @click="resetAndClose">Close</Button>
            </template>
        </ModalFooter>
    </Modal>
</template>
