<script setup lang="ts">
withDefaults(
    defineProps<{ variant?: 'primary' | 'ghost'; loading?: boolean }>(),
    { variant: 'primary', loading: false },
);
</script>

<template>
    <button
        :disabled="loading"
        class="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        :class="
            variant === 'primary'
                ? 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'
                : 'text-slate-700 hover:bg-slate-100'
        "
    >
        <svg
            v-if="loading"
            class="h-4 w-4 animate-spin motion-reduce:animate-none"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".3" stroke-width="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
        <slot />
    </button>
</template>
