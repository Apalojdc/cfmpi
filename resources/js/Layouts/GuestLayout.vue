<script setup lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';

const appName = import.meta.env.VITE_APP_NAME ?? 'Formation';
</script>

<template>
    <div class="min-h-screen bg-white lg:grid lg:grid-cols-[5fr_6fr]">
        <!-- Panneau de marque (desktop uniquement) -->
        <aside
            class="relative hidden overflow-hidden bg-brand-800 p-12 text-white lg:flex lg:flex-col lg:justify-between"
        >
            <Link href="/" class="relative z-10 flex items-center gap-3">
                <ApplicationLogo class="h-10 w-10 fill-current text-white" />
                <span class="text-lg font-semibold">{{ appName }}</span>
            </Link>

            <div class="relative z-10 max-w-md">
                <slot name="aside">
                    <h2 class="text-4xl font-semibold leading-tight tracking-tight">
                        Apprenez un métier, à votre rythme.
                    </h2>
                    <ul class="mt-8 space-y-4 text-brand-100">
                        <li class="flex gap-3">
                            <svg class="mt-0.5 h-5 w-5 shrink-0 text-accent-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" /></svg>
                            Des parcours courts, accessibles depuis votre téléphone.
                        </li>
                        <li class="flex gap-3">
                            <svg class="mt-0.5 h-5 w-5 shrink-0 text-accent-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" /></svg>
                            Des formateurs qui pratiquent le métier au quotidien.
                        </li>
                        <li class="flex gap-3">
                            <svg class="mt-0.5 h-5 w-5 shrink-0 text-accent-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" /></svg>
                            Une attestation à la fin de chaque formation.
                        </li>
                    </ul>
                </slot>
            </div>

            <p class="relative z-10 text-sm text-brand-200">
                © {{ new Date().getFullYear() }} {{ appName }}
            </p>

            <!-- Formes décoratives -->
            <div class="pointer-events-none absolute -bottom-40 -end-40 h-[28rem] w-[28rem] rounded-full bg-brand-700/60" aria-hidden="true" />
            <div class="pointer-events-none absolute -bottom-12 -end-12 h-48 w-48 rounded-full bg-accent-500" aria-hidden="true" />
        </aside>

        <!-- Zone formulaire -->
        <main class="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:min-h-0">
            <Link href="/" class="flex items-center gap-2 lg:hidden">
                <ApplicationLogo class="h-9 w-9 fill-current text-brand-700" />
                <span class="font-semibold text-slate-900">{{ appName }}</span>
            </Link>

            <div class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
                <slot />
            </div>
        </main>
    </div>
</template>