<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

/* ------------------------------------------------------------------ *
 * Contenu (tiré du prospectus CFMPI)
 * ------------------------------------------------------------------ */
const phrases = [
    'Se former aujourd’hui, réussir demain !',
    'Développez vos compétences, boostez votre avenir !',
    'La compétence d’aujourd’hui, l’industrie de demain !',
];

const atouts = [
    { titre: 'Formations 100 % pratiques', texte: 'Plateaux techniques équipés et modernes.', couleur: 'vert' },
    { titre: 'Formateurs experts', texte: 'Encadrement par des professionnels.', couleur: 'orange' },
    { titre: 'Insertion professionnelle', texte: 'Suivi personnalisé et accompagnement vers l’emploi.', couleur: 'vert' },
    { titre: 'Attestation de fin de formation', texte: 'Remise à la fin de votre parcours.', couleur: 'orange' },
];

// const maintenance = [
//     'Maintenance mécanique',
//     'Maintenance électrique',
//     'Maintenance électromécanique',
//     'Automatisme industriel',
//     'Diagnostic et dépannage',
//     'Maintenance préventive',
// ];

// const production = [
//     'Conduite des procédés industriels',
//     'Gestion de la production',
//     'Qualité et amélioration continue',
//     'Sécurité, hygiène et environnement',
//     'Lecture de plans industriels',
// ];

/* ------------------------------------------------------------------ *
 * Effet machine à écrire : écrit une phrase, attend, l'efface,
 * puis passe à la suivante. Les durées sont en millisecondes.
 * ------------------------------------------------------------------ */
const TYPE_SPEED = 55; // vitesse d'écriture (par lettre)
const ERASE_SPEED = 28; // vitesse d'effacement (par lettre)
const HOLD = 2200; // temps où la phrase reste affichée
const PAUSE = 450; // petite pause avant la phrase suivante

const text = ref('');
let phraseIndex = 0;
let isErasing = false;
let timer: ReturnType<typeof setTimeout> | undefined;

function tick() {
    const full = phrases[phraseIndex];

    if (!isErasing) {
        text.value = full.slice(0, text.value.length + 1);
        if (text.value === full) {
            isErasing = true;
            timer = setTimeout(tick, HOLD);
            return;
        }
        timer = setTimeout(tick, TYPE_SPEED);
    } else {
        text.value = full.slice(0, text.value.length - 1);
        if (text.value === '') {
            isErasing = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            timer = setTimeout(tick, PAUSE);
            return;
        }
        timer = setTimeout(tick, ERASE_SPEED);
    }
}

onMounted(() => {
    // Si la personne a demandé moins d'animations : on affiche une phrase fixe.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        text.value = phrases[0];
        return;
    }
    tick();
});

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
    <aside class="showcase min-w-0 text-white">
      <div class="relative box-border flex min-h-screen flex-col justify-between gap-10 overflow-hidden px-10 py-12 lg:sticky lg:top-0 xl:px-14 xl:py-14">
        <!-- Ronds animés (décoratifs) -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
            <span class="orb orb-1" />
            <span class="orb orb-2" />
            <span class="orb orb-3" />
            <span class="orb orb-4" />
            <span class="orb orb-5" />
            <span class="orb orb-6" />
        </div>

        <!-- Signature : logo + nom du cabinet -->
        <header class="relative z-10 flex items-center gap-4">
            <div class="shrink-0 rounded-2xl bg-white p-1.5 shadow-lg shadow-black/20">
                <img src="/img/logo/logo.png" alt="Logo CFMPI" class="h-16 w-16 object-contain xl:h-20 xl:w-20" />
            </div>
            <div class="min-w-0">
                <p class="text-base font-semibold leading-tight xl:text-lg">Cabinet de formation professionnelle</p>
                <p class="mt-0.5 text-sm leading-snug text-[#a8dd7a]">en maintenance et production industrielle</p>
            </div>
        </header>

        <!-- Texte animé + présentation -->
        <div class="relative z-10">
            <h2
                class="min-h-[7.5rem] text-3xl font-semibold leading-tight tracking-tight xl:min-h-[9rem] xl:text-4xl"
                :aria-label="phrases[0]"
            >
                <span aria-hidden="true">{{ text }}</span><span class="caret" aria-hidden="true" />
            </h2>
            <p class="mt-4 max-w-md text-base leading-relaxed text-white/80">
                Le CFMPI vous accompagne avec des formations pratiques, modernes et adaptées aux besoins des entreprises industrielles.
            </p>
        </div>

        <!-- Domaines -->
        <!-- <div class="relative z-10 grid grid-cols-2 gap-x-6 text-sm text-white/85">
            <div>
                <p class="mb-2 font-semibold text-white">Maintenance industrielle</p>
                <ul class="space-y-1.5">
                    <li v-for="item in maintenance" :key="item" class="flex items-start gap-2">
                        <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7ac143]" />
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div>
                <p class="mb-2 font-semibold text-white">Production industrielle</p>
                <ul class="space-y-1.5">
                    <li v-for="item in production" :key="item" class="flex items-start gap-2">
                        <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f58220]" />
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div> -->

        <!-- Atouts -->
        <ul class="relative z-10 grid grid-cols-2 gap-4">
            <li
                v-for="atout in atouts"
                :key="atout.titre"
                class="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm"
                :class="atout.couleur === 'orange' ? 'border-l-4 border-[#f58220]' : 'border-l-4 border-[#7ac143]'"
            >
                <p class="text-sm font-semibold leading-snug">{{ atout.titre }}</p>
                <p class="mt-0.5 text-xs leading-snug text-white/70">{{ atout.texte }}</p>
            </li>
        </ul>

        <!-- Contact -->
        <footer class="relative z-10 border-t border-white/20 pt-5">
            <p class="text-base font-semibold">Inscrivez-vous dès maintenant !</p>
            <p class="mt-1 text-sm leading-snug text-white/75">
                Riviera Faya, non loin du CHU de Cocody, Abidjan<br />
                07 49 68 92 49
            </p>
        </footer>
      </div>
    </aside>
</template>

<style scoped>
/* Couleurs tirées du logo */
.showcase {
    --vert-fonce: #0b3d1d;
    --vert: #1b6b2f;
    --vert-clair: #7ac143;
    --orange: #f58220;
    background:
        radial-gradient(120% 90% at 0% 0%, var(--vert) 0%, transparent 60%),
        linear-gradient(160deg, #124d26 0%, var(--vert-fonce) 100%);
}

/* ------------------------------ Ronds ------------------------------ */
.orb {
    position: absolute;
    border-radius: 9999px;
    will-change: transform;
}

/* Grand anneau orange */
.orb-1 {
    top: -60px;
    right: -70px;
    width: 280px;
    height: 280px;
    border: 3px solid var(--orange);
    opacity: 0.7;
    animation: derive-a 18s ease-in-out infinite alternate;
}
/* Gros disque vert clair */
.orb-2 {
    bottom: 12%;
    left: -70px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle at 30% 30%, var(--vert-clair), var(--vert));
    opacity: 0.35;
    animation: derive-b 22s ease-in-out infinite alternate;
}
/* Disque orange */
.orb-3 {
    top: 44%;
    right: 8%;
    width: 84px;
    height: 84px;
    background: var(--orange);
    opacity: 0.85;
    animation: derive-c 14s ease-in-out infinite alternate;
}
/* Anneau blanc */
.orb-4 {
    bottom: -50px;
    right: 14%;
    width: 150px;
    height: 150px;
    border: 2px solid rgb(255 255 255 / 0.35);
    animation: derive-a 25s ease-in-out infinite alternate-reverse;
}
/* Petits ronds */
.orb-5 {
    top: 30%;
    left: 46%;
    width: 22px;
    height: 22px;
    background: var(--vert-clair);
    animation: derive-c 11s ease-in-out infinite alternate-reverse;
}
.orb-6 {
    bottom: 30%;
    left: 30%;
    width: 14px;
    height: 14px;
    background: var(--orange);
    animation: derive-b 13s ease-in-out infinite alternate;
}

@keyframes derive-a {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-40px, 50px) scale(1.08); }
    100% { transform: translate(30px, 90px) scale(0.95); }
}
@keyframes derive-b {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(60px, -40px) scale(1.12); }
    100% { transform: translate(20px, -110px) scale(0.92); }
}
@keyframes derive-c {
    0% { transform: translate(0, 0); }
    33% { transform: translate(-30px, -45px); }
    66% { transform: translate(25px, -20px); }
    100% { transform: translate(-15px, 40px); }
}

/* ------------------------------ Curseur ------------------------------ */
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

/* Moins d'animations si demandé par le système */
@media (prefers-reduced-motion: reduce) {
    .orb,
    .caret {
        animation: none;
    }
}
</style>