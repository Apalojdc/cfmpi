<script setup lang="ts">
defineProps<{
    steps: { key: string; label: string }[];
    current: number;
}>();
</script>

<template>
    <div>
        <p class="text-sm font-medium text-slate-700" aria-live="polite">
            Étape {{ current + 1 }} sur {{ steps.length }} : {{ steps[current].label }}
        </p>
        <div
            class="mt-3 flex gap-2"
            role="progressbar"
            :aria-valuenow="current + 1"
            aria-valuemin="1"
            :aria-valuemax="steps.length"
        >
            <span
                v-for="(step, i) in steps"
                :key="step.key"
                class="h-1.5 flex-1 rounded-full transition-colors duration-300 motion-reduce:transition-none"
                :class="i <= current ? 'bg-brand-600' : 'bg-slate-200'"
            />
        </div>
    </div>
</template>