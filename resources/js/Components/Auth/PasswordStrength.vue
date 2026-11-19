<script setup lang="ts">
import { toRef } from 'vue';
import { usePasswordStrength } from '@/Composables/usePasswordStrength';

const props = defineProps<{ password: string }>();
const { rules, score, label } = usePasswordStrength(toRef(props, 'password'));

const barColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-brand-600'];
</script>

<template>
    <div v-if="password" class="space-y-3" aria-live="polite">
        <div class="flex items-center gap-3">
            <div class="flex flex-1 gap-1.5">
                <span
                    v-for="n in 4"
                    :key="n"
                    class="h-1.5 flex-1 rounded-full transition-colors duration-300 motion-reduce:transition-none"
                    :class="n <= score ? barColors[score - 1] : 'bg-slate-200'"
                />
            </div>
            <span class="w-20 text-end text-sm font-medium text-slate-700">{{ label }}</span>
        </div>

        <ul class="grid gap-1.5 text-sm sm:grid-cols-2">
            <li
                v-for="rule in rules"
                :key="rule.key"
                class="flex items-center gap-2"
                :class="rule.ok ? 'text-brand-700' : 'text-slate-500'"
            >
                <svg v-if="rule.ok" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" />
                </svg>
                <span v-else class="flex h-4 w-4 shrink-0 items-center justify-center" aria-hidden="true">
                    <span class="h-1.5 w-1.5 rounded-full bg-current" />
                </span>
                {{ rule.label }}
            </li>
        </ul>
    </div>
</template>