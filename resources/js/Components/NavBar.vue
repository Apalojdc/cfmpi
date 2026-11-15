<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Link } from '@inertiajs/vue3';

type Lien = { label: string; href: string };

// transparent = true  : la barre est transparente en haut de page (à poser sur une image/hero)
// transparent = false : la barre est toujours blanche (pages sans grand visuel en haut)
const props = withDefaults(defineProps<{ transparent?: boolean }>(), { transparent: true });

// ---------- Logos (mets une version blanche pour le fond transparent si tu en as une) ----------
const logoClair = '/img/logo/logo.png'; // affiché sur fond transparent
const logoSombre = '/img/logo/logo.png'; // affiché sur fond blanc
const telephone = '07 49 68 92 49';

// ---------- Données des menus : modifie ici ----------
const f = (label: string, slug: string): Lien => ({ label, href: `/formations/${slug}` });

// Technique & Maintenance : 2 colonnes, la 1re est coupée en 2 groupes
const technique: Lien[][][] = [
    [
        [
            f('Maintenance', 'maintenance'),
            f('Production', 'production'),
            f('Management des équipes et Communication', 'management'),
            f('Maîtrise des énergies', 'maitrise-des-energies'),
        ],
        [
            f('Électricité – Électrotechnique', 'electricite'),
            f('Variation de vitesse', 'variation-de-vitesse'),
            f('Automatismes – Supervision – Réseaux', 'automatismes'),
            f('Robotique – Vision', 'robotique'),
            f('Régulation', 'regulation'),
        ],
    ],
    [
        [
            f('Mécanique – CAO – Impression 3D', 'mecanique'),
            f('Pompes – Vannes', 'pompes-vannes'),
            f('Oléohydraulique', 'oleohydraulique'),
            f('Pneumatique', 'pneumatique'),
            f('Soudage', 'soudage'),
            f('Usinage – Matériaux', 'usinage'),
            f('Froid – Climatisation', 'froid-climatisation'),
            f('Air – Gaz – Vapeur – Vide', 'air-gaz-vapeur-vide'),
        ],
    ],
];

const prevention: Lien[] = [
    f('Risque Électrique – Habilitation Électrique', 'risque-electrique'),
    f('Équipements sous pression – Autoclaves', 'equipements-sous-pression'),
    f('Risque ATEX lié aux atmosphères explosives', 'atex'),
    f('Habilitation Mécanique – Consignation des énergies', 'habilitation-mecanique'),
    f('Risque Ammoniac', 'ammoniac'),
    f('Risques chimiques', 'risques-chimiques'),
    f('Risque Travaux en hauteur – Port du Harnais', 'travaux-hauteur-harnais'),
    f('Risque Travaux en hauteur – Échafaudage roulant', 'travaux-hauteur-echafaudage'),
];

const solutions: (Lien & { icone: string })[] = [
    { icone: '⇄', label: 'Formations Inter', href: '/formations-inter' },
    { icone: '📏', label: 'Formations Sur mesure', href: '/formations-sur-mesure' },
    { icone: '💻', label: 'Formations E-learning', href: '/formations-e-learning' },
    { icone: '🎓', label: 'Notre méthode pédagogique', href: '/methode-pedagogique' },
    { icone: '⬇', label: 'Télécharger le catalogue / domaines', href: '/catalogue' },
];

// Petits menus déroulants (liens à adapter à tes routes)
const simples: { id: string; label: string; liens: Lien[] }[] = [
    {
        id: 'evaluer',
        label: 'Évaluer',
        liens: [
            { label: 'Évaluation à distance', href: '/evaluation/distance' },
            { label: 'Évaluation sur site', href: '/evaluation/site' },
        ],
    },
    {
        id: 'CFMPI',
        label: 'Le CFMPI',
        liens: [
            { label: 'Présentation', href: '/a-propos' },
            { label: 'Actualités', href: '/actualites' },
            { label: 'Recrutement', href: '/recrutement' },
        ],
    },
    {
        id: 'infos',
        label: 'Infos pratiques',
        liens: [
            { label: 'Financement', href: '/infos/financement' },
            { label: 'Accès', href: '/infos/acces' },
            { label: 'Questions fréquentes', href: '/infos/faq' },
        ],
    },
];

const liensHaut: (Lien & { icone: string })[] = [
    { icone: '✉', label: 'Nous contacter', href: '/contact' },
    { icone: '👤', label: 'Espace client', href: '/espace-client' },
    { icone: '★', label: 'Favoris', href: '/favoris' },
];

// ---------- État ----------
const scrolled = ref(false); // true quand on a fait défiler la page
const menuOuvert = ref(false); // menu hamburger
const menuActif = ref<string | null>(null); // menu déroulant ouvert sur ordinateur

// Fond transparent seulement : option activée + haut de page + hamburger fermé
const clair = computed(() => props.transparent && !scrolled.value && !menuOuvert.value);

const basculer = (id: string) => {
    menuActif.value = menuActif.value === id ? null : id;
};
const fermer = () => {
    menuActif.value = null;
    menuOuvert.value = false;
};

const majScroll = () => {
    scrolled.value = window.scrollY > 40;
    if (scrolled.value) menuActif.value = null;
};
const surTouche = (e: KeyboardEvent) => {
    if (e.key === 'Escape') fermer();
};

onMounted(() => {
    majScroll();
    window.addEventListener('scroll', majScroll, { passive: true });
    window.addEventListener('keydown', surTouche);
});
onUnmounted(() => {
    window.removeEventListener('scroll', majScroll);
    window.removeEventListener('keydown', surTouche);
});
</script>

<template>
    <header
        class="navbar"
        :class="{ clair, blanc: !clair, scrolled, fixe: props.transparent }"
        @mouseleave="menuActif = null"
    >
        <div class="inner">
            <!-- Logo -->
            <Link href="/" class="logo" aria-label="Accueil" @click="fermer">
                <img :src="clair ? logoClair : logoSombre" alt="Logo" class="logo-img" />
            </Link>

            <div class="droite">
                <!-- Rangée du haut -->
                <ul class="haut">
                    <li>
                        <a :href="`tel:${telephone}`">📞 {{ telephone }}</a>
                    </li>
                    <li v-for="l in liensHaut" :key="l.href" class="cache-petit">
                        <Link :href="l.href">{{ l.icone }} {{ l.label }}</Link>
                    </li>
                </ul>

                <!-- Rangée principale (ordinateur, en haut de page) -->
                <ul class="bas" aria-label="Navigation principale">
                    <li class="item" @mouseenter="menuActif = null">
                        <Link href="/" aria-label="Accueil">🏠</Link>
                    </li>

                    <!-- Méga-menu Former -->
                    <li
                        class="item"
                        :class="{ ouvert: menuActif === 'former' }"
                        @mouseenter="menuActif = 'former'"
                        @focusin="menuActif = 'former'"
                    >
                        <button type="button" class="bouton" :aria-expanded="menuActif === 'former'" @click="basculer('former')">
                            Former <span class="chev">▾</span>
                        </button>
                        <div v-show="menuActif === 'former'" class="mega">
                            <div class="m-tech">
                                <h3>Technique &amp; Maintenance</h3>
                                <div class="m-cols">
                                    <div v-for="(col, i) in technique" :key="i">
                                        <ul v-for="(groupe, j) in col" :key="j" class="groupe">
                                            <li v-for="l in groupe" :key="l.href">
                                                <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="m-prev">
                                <h3>Prévention des risques</h3>
                                <ul>
                                    <li v-for="l in prevention" :key="l.href">
                                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="m-sol">
                                <h3>Solutions de formation</h3>
                                <ul>
                                    <li v-for="s in solutions" :key="s.href">
                                        <Link :href="s.href" @click="fermer"><span class="ico">{{ s.icone }}</span>{{ s.label }}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li class="item" @mouseenter="menuActif = null">
                        <Link href="/accompagnement" class="bouton">Accompagner</Link>
                    </li>

                    <!-- Petits menus déroulants -->
                    <li
                        v-for="m in simples"
                        :key="m.id"
                        class="item drop"
                        :class="{ ouvert: menuActif === m.id }"
                        @mouseenter="menuActif = m.id"
                        @focusin="menuActif = m.id"
                    >
                        <button type="button" class="bouton" :aria-expanded="menuActif === m.id" @click="basculer(m.id)">
                            {{ m.label }} <span class="chev">▾</span>
                        </button>
                        <ul v-show="menuActif === m.id" class="drop-panel">
                            <li v-for="l in m.liens" :key="l.href">
                                <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                            </li>
                        </ul>
                    </li>

                    <li class="item" @mouseenter="menuActif = null">
                        <Link href="/catalogue" class="pill">Téléchargements ⬇</Link>
                    </li>
                </ul>

                <!-- Bouton hamburger (haut de page sur mobile, ou dès qu'on a scrollé) -->
                <button
                    type="button"
                    class="burger"
                    :aria-expanded="menuOuvert"
                    aria-label="Ouvrir le menu"
                    @click="menuOuvert = !menuOuvert"
                >
                    {{ menuOuvert ? '✕' : '☰' }}
                </button>
            </div>
        </div>

        <!-- Panneau du hamburger -->
        <nav v-if="menuOuvert" class="panneau" aria-label="Menu">
            <Link href="/" class="p-lien" @click="fermer">🏠 Accueil</Link>

            <details class="p-groupe">
                <summary>Former</summary>
                <p class="p-titre">Technique &amp; Maintenance</p>
                <template v-for="(col, i) in technique" :key="i">
                    <ul v-for="(groupe, j) in col" :key="j">
                        <li v-for="l in groupe" :key="l.href">
                            <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                        </li>
                    </ul>
                </template>
                <p class="p-titre">Prévention des risques</p>
                <ul>
                    <li v-for="l in prevention" :key="l.href">
                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                    </li>
                </ul>
                <p class="p-titre">Solutions de formation</p>
                <ul>
                    <li v-for="s in solutions" :key="s.href">
                        <Link :href="s.href" @click="fermer">{{ s.icone }} {{ s.label }}</Link>
                    </li>
                </ul>
            </details>

            <Link href="/accompagnement" class="p-lien" @click="fermer">Accompagner</Link>

            <details v-for="m in simples" :key="m.id" class="p-groupe">
                <summary>{{ m.label }}</summary>
                <ul>
                    <li v-for="l in m.liens" :key="l.href">
                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                    </li>
                </ul>
            </details>

            <div class="p-bas">
                <Link v-for="l in liensHaut" :key="l.href" :href="l.href" @click="fermer">{{ l.icone }} {{ l.label }}</Link>
            </div>
            <Link href="/catalogue" class="pill p-pill" @click="fermer">Téléchargements ⬇</Link>
        </nav>
    </header>
</template>

<style scoped>
.navbar {
    --accent: #007013; /* couleur principale : change-la ici */
    --encre: #14213a;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    transition: background-color 0.25s, box-shadow 0.25s;
}
.navbar.fixe { position: fixed; }
.navbar:not(.fixe) { position: sticky; }

/* Fond transparent (haut de page) */
.navbar.clair {
    --texte: #fff;
    background: transparent;
}
.navbar.clair .logo-img,
.navbar.clair .haut,
.navbar.clair .bas > .item > a,
.navbar.clair .bouton {
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
}

/* Fond blanc (après scroll, ou option désactivée) */
.navbar.blanc {
    --texte: var(--encre);
    background: #fff;
    box-shadow: 0 2px 16px rgba(10, 37, 82, 0.1);
}

.inner {
    position: relative;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0.9rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    color: var(--texte);
}

.logo { flex-shrink: 0; display: block; }
.logo-img { display: block; height: 72px; width: auto; transition: height 0.25s; background: #fff; border-radius: 8px; }
.scrolled .logo-img { height: 68px; }

a { text-decoration: none; color: inherit; }
ul { list-style: none; margin: 0; padding: 0; }

.droite { display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem; }

/* Rangée du haut */
.haut { display: flex; gap: 1.5rem; font-weight: 600; font-size: 0.95rem; }
.haut a:hover { color: var(--accent); }
.clair .haut a:hover { text-decoration: underline; color: #fff; }

/* Rangée principale */
.bas { display: flex; align-items: center; gap: 0.25rem; }
.item.drop { position: relative; }
.item > a,
.bouton {
    display: block;
    background: none;
    border: 0;
    cursor: pointer;
    font: inherit;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    color: inherit;
    padding: 0.6rem 0.9rem;
    border-radius: 8px;
}
.item:hover > .bouton,
.item.ouvert > .bouton { color: var(--accent); }
.clair .item.ouvert > .bouton { color: #fff; text-decoration: underline; text-underline-offset: 6px; }
.chev { font-size: 0.75em; }

.pill {
    display: inline-block;
    background: var(--accent);
    color: #fff !important;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.95rem;
    padding: 0.75rem 1.6rem !important;
    border-radius: 99px !important;
    text-shadow: none !important;
    margin-left: 0.5rem;
}
.pill:hover { filter: brightness(1.08); }

/* Méga-menu */
.mega {
    position: absolute;
    top: 100%;
    left: 1.25rem;
    right: 1.25rem;
    display: grid;
    grid-template-columns: 1.7fr 1.1fr 1fr;
    background: #fff;
    color: var(--encre);
    text-shadow: none;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(10, 37, 82, 0.2);
    text-transform: none;
}
.mega h3 {
    margin: 0 0 1rem;
    font-size: 1rem;
    text-transform: uppercase;
    border-left: 4px solid var(--accent);
    padding-left: 0.6rem;
}
.m-tech, .m-prev { padding: 1.75rem 2rem; }
.m-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1.5rem; }
.m-cols > div + div { border-left: 1px solid #e3e8f0; padding-left: 1.5rem; }
.groupe + .groupe { border-top: 1px solid #e3e8f0; margin-top: 0.75rem; padding-top: 0.75rem; }
.mega li a { display: block; padding: 0.35rem 0; color: #3b4660; font-weight: 500; line-height: 1.35; }
.mega li a:hover { color: var(--accent); }
.m-sol { background: var(--accent); color: #fff; padding: 1.75rem 2rem; }
.m-sol h3 { border-color: #fff; }
.m-sol li a { color: #fff; font-weight: 600; }
.m-sol li a:hover { color: #fff; text-decoration: underline; }
.ico { display: inline-block; width: 1.6rem; }

/* Petit menu déroulant */
.drop-panel {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 240px;
    background: #fff;
    color: var(--encre);
    text-shadow: none;
    text-transform: none;
    border-radius: 14px;
    padding: 0.5rem;
    box-shadow: 0 16px 32px rgba(10, 37, 82, 0.18);
}
.drop-panel a { display: block; padding: 0.6rem 0.9rem; border-radius: 8px; font-weight: 500; }
.drop-panel a:hover { background: #f4f7fb; color: var(--accent); }

/* Hamburger */
.burger {
    display: none;
    background: none;
    border: 0;
    cursor: pointer;
    font-size: 1.9rem;
    line-height: 1;
    padding: 0.3rem 0.5rem;
    color: inherit;
}

/* Après scroll (ordinateur) ou petit écran : la rangée du bas devient un hamburger */
.scrolled .droite { flex-direction: row; align-items: center; gap: 1rem; }
.scrolled .bas { display: none; }
.scrolled .burger { display: block; }

@media (max-width: 1000px) {
    .droite { flex-direction: row; align-items: center; gap: 1rem; }
    .bas { display: none; }
    .burger { display: block; }
    .logo-img { height: 52px; }
}
@media (max-width: 700px) {
    .cache-petit { display: none; }
}

/* Panneau hamburger */
.panneau {
    background: #fff;
    color: var(--encre);
    max-height: calc(100dvh - 76px);
    overflow-y: auto;
    padding: 0.75rem 1.25rem 1.5rem;
    border-top: 1px solid #e3e8f0;
    box-shadow: 0 16px 32px rgba(10, 37, 82, 0.12);
}
.p-lien, .p-groupe summary {
    display: block;
    padding: 0.85rem 0.25rem;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.95rem;
    border-bottom: 1px solid #e3e8f0;
    cursor: pointer;
}
.p-groupe[open] > summary { color: var(--accent); }
.p-titre { margin: 0.9rem 0 0.25rem; font-weight: 700; font-size: 0.85rem; border-left: 4px solid var(--accent); padding-left: 0.5rem; }
.p-groupe ul { padding-left: 0.5rem; }
.p-groupe li a { display: block; padding: 0.4rem 0; color: #3b4660; }
.p-groupe li a:hover { color: var(--accent); }
.p-bas { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; padding: 1rem 0.25rem; font-weight: 600; }
.p-pill { display: block; text-align: center; margin: 0; }

a:focus-visible, button:focus-visible, summary:focus-visible { outline: 3px solid #f28c00; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
    .navbar, .logo-img { transition: none; }
}
</style>