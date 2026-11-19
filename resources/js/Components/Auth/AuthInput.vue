<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps<{
    id: string;
    label: string;
    error?: string;
    hint?: string;
}>();

const model = defineModel<string>({ default: '' });
</script>

<template>
    <div>
        <label :for="id" class="block text-sm font-medium text-slate-700">
            {{ label }}
        </label>

        <div class="relative mt-1.5">
            <input
                :id="id"
                v-model="model"
                v-bind="$attrs"
                :aria-invalid="!!error"
                :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
                class="block w-full rounded-lg border-slate-300 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-500 focus:ring-brand-500"
                :class="[
                    $slots.trailing ? 'pe-11' : '',
                    error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : '',
                ]"
            />
            <div class="absolute inset-y-0 end-0 flex items-center pe-2">
                <slot name="trailing" />
            </div>
        </div>

        <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-sm text-red-600" role="alert">
            {{ error }}
        </p>
        <p v-else-if="hint" :id="`${id}-hint`" class="mt-1.5 text-sm text-slate-500">
            {{ hint }}
        </p>
    </div>
</template>