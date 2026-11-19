<script setup lang="ts">
import { useTypewriter } from '@/Composables/useTypewriter';

const phrases = [
    'Se former aujourd’hui, réussir demain !',
    'Développez vos compétences, boostez votre avenir !',
    'La compétence d’aujourd’hui, l’industrie de demain !',
];

const chips = [
    { label: 'Maintenance industrielle', couleur: 'vert' },
    { label: 'Production industrielle', couleur: 'orange' },
    { label: 'Formations 100 % pratiques', couleur: 'vert' },
    { label: 'Attestation de fin de formation', couleur: 'orange' },
];

const { text } = useTypewriter(phrases);
</script>

<template>
    <header class="hero relative overflow-hidden px-6 pb-20 pt-8 text-white sm:px-10">
        <!-- Ronds animés (décoratifs) -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
            <span class="orb orb-1" />
            <span class="orb orb-2" />
            <span class="orb orb-3" />
            <span class="orb orb-4" />
        </div>

        <div class="relative z-10 flex items-center gap-3 rise" style="--d: 0ms">
            <div class="shrink-0 rounded-xl bg-white p-1 shadow-lg shadow-black/20">
                <img src="/img/logo/logo.png" alt="Logo CFMPI" class="h-12 w-12 object-contain" />
            </div>
            <div class="min-w-0">
                <p class="text-sm font-semibold leading-tight">Cabinet de formation professionnelle</p>
                <p class="text-xs leading-snug text-[#a8dd7a]">en maintenance et production industrielle</p>
            </div>
        </div>

        <h2
            class="relative z-10 mt-7 min-h-[5.5rem] text-2xl font-semibold leading-tight tracking-tight rise sm:text-3xl sm:min-h-[6rem]"
            style="--d: 120ms"
            :aria-label="phrases[0]"
        >
            <span aria-hidden="true">{{ text }}</span><span class="caret" aria-hidden="true" />
        </h2>

        <ul class="relative z-10 mt-4 flex flex-wrap gap-2">
            <li
                v-for="(chip, i) in chips"
                :key="chip.label"
                class="rise rounded-full bg-white/10 px-3 py-1.5 text-xs backdrop-blur-sm"
                :class="chip.couleur === 'orange' ? 'ring-1 ring-[#f58220]/60' : 'ring-1 ring-[#7ac143]/60'"
                :style="{ '--d': `${240 + i * 90}ms` }"
            >
                {{ chip.label }}
            </li>
        </ul>
    </header>
</template>

<style scoped>
.hero {
    --vert-fonce: #0b3d1d;
    --vert: #1b6b2f;
    --vert-clair: #7ac143;
    --orange: #f58220;
    background:
        radial-gradient(120% 90% at 0% 0%, var(--vert) 0%, transparent 60%),
        linear-gradient(160deg, #124d26 0%, var(--vert-fonce) 100%);
}

.orb {
    position: absolute;
    border-radius: 9999px;
    will-change: transform;
}
.orb-1 {
    top: -50px;
    right: -50px;
    width: 180px;
    height: 180px;
    border: 3px solid var(--orange);
    opacity: 0.7;
    animation: derive-a 16s ease-in-out infinite alternate;
}
.orb-2 {
    bottom: 10px;
    left: -40px;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle at 30% 30%, var(--vert-clair), var(--vert));
    opacity: 0.4;
    animation: derive-b 20s ease-in-out infinite alternate;
}
.orb-3 {
    top: 38%;
    right: 12%;
    width: 44px;
    height: 44px;
    background: var(--orange);
    opacity: 0.85;
    animation: derive-c 12s ease-in-out infinite alternate;
}
.orb-4 {
    top: 18%;
    left: 52%;
    width: 14px;
    height: 14px;
    background: var(--vert-clair);
    animation: derive-c 10s ease-in-out infinite alternate-reverse;
}

@keyframes derive-a {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-20px, 40px) scale(1.08); }
}
@keyframes derive-b {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(40px, -30px) scale(1.12); }
}
@keyframes derive-c {
    0% { transform: translate(0, 0); }
    50% { transform: translate(-16px, -22px); }
    100% { transform: translate(12px, 18px); }
}

/* Apparition en cascade */
.rise {
    opacity: 0;
    animation: rise 0.6s ease-out forwards;
    animation-delay: var(--d, 0ms);
}
@keyframes rise {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
}

.caret {
    display: inline-block;
    width: 3px;
    height: 0.95em;
    margin-left: 4px;
    vertical-align: -0.1em;
    background: var(--orange);
    animation: clignote 1s steps(1) infinite;
}
@keyframes clignote {
    50% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
    .orb,
    .caret {
        animation: none;
    }
    .rise {
        animation: none;
        opacity: 1;
    }
}
</style>