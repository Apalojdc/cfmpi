<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';

type Lien = { label: string; href: string };

// transparent = true  : la barre est transparente en haut de page (à poser sur une image/hero)
// transparent = false : la barre est toujours blanche (pages sans grand visuel en haut)
const props = withDefaults(defineProps<{ transparent?: boolean }>(), { transparent: true });

// ---------- Infos du CFMPI (d'après le prospectus) ----------
const logoClair = '/img/logo/logo.png'; // affiché sur fond transparent
const logoSombre = '/img/logo/logo.png'; // affiché sur fond blanc
const telephone = '07 49 68 92 49';
const email = 'diallofouseni863@gmail.com';

// Slogan affiché à côté du logo quand on a scrollé (2 lignes)
const slogan = ['La compétence d’aujourd’hui,', 'l’industrie de demain.'];

// Page de résultats de la recherche (à adapter à ta route Laravel)
const urlRecherche = '/recherche';

// ---------- Icônes (SVG, héritent de la couleur du texte) ----------
const chemins = {
    tel: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
    pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35',
    menu: 'M4 6h16M4 18h16M4 12h16',
    close: 'M6 6l12 12M18 6L6 18',
};

// ---------- Données des menus : modifie ici ----------
const f = (label: string, slug: string): Lien => ({ label, href: `/formations/${slug}` });

// Domaine 1 : Maintenance industrielle
const maintenance: Lien[] = [
    f('Maintenance Mécanique Industrielle', 'maintenance-mecanique'),
    f('Maintenance Électrique Industrielle', 'maintenance-electrique'),
    f('Maintenance Électromécanique', 'maintenance-electromecanique'),
    f('Automatisme Industriel', 'automatisme-industriel'),
    f('Diagnostic et Dépannage des Équipements', 'diagnostic-depannage'),
    f('Maintenance Préventive et Améliorative', 'maintenance-preventive-ameliorative'),
];

// Domaine 2 : Production industrielle
const production: Lien[] = [
    f('Conduite et Surveillance des Procédés Industriels', 'conduite-procedes'),
    f('Gestion de la Production', 'gestion-production'),
    f('Qualité et Amélioration Continue', 'qualite-amelioration-continue'),
    f('Sécurité, Hygiène et Environnement Industriel', 'securite-hygiene-environnement'),
    f('Lecture et Interprétation de Plans Industriels', 'lecture-plans-industriels'),
];

// Nos atouts (colonne colorée du méga-menu)
const atouts: { icone: string; label: string }[] = [
    { icone: '🔧', label: 'Formations 100 % pratiques' },
    { icone: '🏭', label: 'Plateaux techniques équipés et modernes' },
    { icone: '👷', label: 'Encadrement par des professionnels' },
    { icone: '🤝', label: 'Suivi personnalisé' },
    { icone: '🎓', label: 'Accompagnement à l’insertion professionnelle' },
];

// Petits menus déroulants (liens à adapter à tes routes)
const simples: { id: string; label: string; liens: Lien[] }[] = [
    {
        id: 'cfmpi',
        label: 'Le CFMPI',
        liens: [
            { label: 'Présentation', href: '/a-propos' },
            { label: 'Actualités', href: '/actualites' },
            { label: 'Accès – Cocody, Riviera Faya', href: '/acces' },
        ],
    },
];

// "icone" sert dans le menu mobile, "chemin" dans la barre du haut (SVG)
const liensHaut: (Lien & { icone: string; chemin: string })[] = [
    { icone: '📍', chemin: chemins.pin, label: 'Nous trouver', href: '/acces' },
];

// ---------- État ----------
const scrolled = ref(false); // true quand on a fait défiler la page
const menuOuvert = ref(false); // menu hamburger
const menuActif = ref<string | null>(null); // menu déroulant ouvert sur ordinateur
const recherche = ref('');

// Fond transparent seulement : option activée + haut de page + hamburger fermé
const clair = computed(() => props.transparent && !scrolled.value && !menuOuvert.value);

const basculer = (id: string) => {
    menuActif.value = menuActif.value === id ? null : id;
};
const fermer = () => {
    menuActif.value = null;
    menuOuvert.value = false;
};

const lancerRecherche = () => {
    const terme = recherche.value.trim();
    if (!terme) return;
    fermer();
    router.get(urlRecherche, { q: terme });
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
            <!-- Logo + slogan (blanc en haut de page, vert après scroll) -->
            <Link href="/" class="logo" aria-label="CFMPI – Accueil" @click="fermer">
                <img :src="clair ? logoClair : logoSombre" alt="CFMPI" class="logo-img" />
                <span class="slogan">
                    <template v-for="(ligne, i) in slogan" :key="i">{{ ligne }}<br v-if="i < slogan.length - 1" /></template>
                </span>
            </Link>

            <div class="droite">
                <!-- Recherche (visible après scroll) -->
                <form class="recherche" role="search" @submit.prevent="lancerRecherche">
                    <input
                        v-model="recherche"
                        type="search"
                        placeholder="Rechercher une formation..."
                        aria-label="Rechercher une formation"
                    />
                    <button type="submit" aria-label="Lancer la recherche">
                        <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path :d="chemins.search" /></svg>
                    </button>
                </form>

                <!-- Rangée du haut (devient le bandeau coloré après scroll) -->
                <ul class="haut">
                    <li>
                        <a :href="`tel:${telephone.replace(/\s/g, '')}`">
                            <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path :d="chemins.tel" /></svg>
                            {{ telephone }}
                        </a>
                    </li>
                    <li class="cache-petit">
                        <a :href="`mailto:${email}`">
                            <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path :d="chemins.mail" /></svg>
                            {{ email }}
                        </a>
                    </li>
                    <li v-for="l in liensHaut" :key="l.href" class="cache-petit">
                        <Link :href="l.href">
                            <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path :d="l.chemin" /></svg>
                            {{ l.label }}
                        </Link>
                    </li>
                </ul>

                <!-- Rangée principale (ordinateur, en haut de page) -->
                <ul class="bas" aria-label="Navigation principale">
                    <li class="item" @mouseenter="menuActif = null">
                        <Link href="/" aria-label="Accueil">Accueil</Link>
                    </li>

                    <!-- Méga-menu Formations -->
                    <li
                        class="item"
                        :class="{ ouvert: menuActif === 'formations' }"
                        @mouseenter="menuActif = 'formations'"
                        @focusin="menuActif = 'formations'"
                    >
                        <button type="button" class="bouton" :aria-expanded="menuActif === 'formations'" @click="basculer('formations')">
                            Nos formations <span class="chev">▾</span>
                        </button>
                        <div v-show="menuActif === 'formations'" class="mega">
                            <div class="m-maint">
                                <h3>Maintenance industrielle</h3>
                                <ul>
                                    <li v-for="l in maintenance" :key="l.href">
                                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="m-prod">
                                <h3>Production industrielle</h3>
                                <ul>
                                    <li v-for="l in production" :key="l.href">
                                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="m-sol">
                                <h3>Nos atouts</h3>
                                <ul>
                                    <li v-for="a in atouts" :key="a.label">
                                        <Link href="/#atouts" @click="fermer"><span class="ico">{{ a.icone }}</span>{{ a.label }}</Link>
                                    </li>
                                </ul>
                                <Link href="/formations" class="m-tout" @click="fermer">Voir toutes les formations →</Link>
                            </div>
                        </div>
                    </li>

                    <li class="item" @mouseenter="menuActif = null">
                        <Link href="/#pour-qui" class="bouton">Pour qui ?</Link>
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
                        <Link href="/contact" class="bouton">Contact</Link>
                    </li>

                    <li class="item" @mouseenter="menuActif = null">
                        <Link href="/register" class="pill">Inscrivez-vous</Link>
                    </li>
                </ul>

                <!-- Bouton hamburger (haut de page sur mobile, ou dès qu'on a scrollé) -->
                <button
                    type="button"
                    class="burger"
                    :aria-expanded="menuOuvert"
                    :aria-label="menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'"
                    @click="menuOuvert = !menuOuvert"
                >
                    <svg class="i" viewBox="0 0 24 24" aria-hidden="true">
                        <path :d="menuOuvert ? chemins.close : chemins.menu" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Panneau du hamburger -->
        <nav v-if="menuOuvert" class="panneau" aria-label="Menu">
            <form class="recherche-mobile" role="search" @submit.prevent="lancerRecherche">
                <input v-model="recherche" type="search" placeholder="Rechercher une formation..." aria-label="Rechercher une formation" />
                <button type="submit" aria-label="Lancer la recherche">
                    <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path :d="chemins.search" /></svg>
                </button>
            </form>

            <Link href="/" class="p-lien" @click="fermer">🏠 Accueil</Link>

            <details class="p-groupe">
                <summary>Nos formations</summary>
                <p class="p-titre">Maintenance industrielle</p>
                <ul>
                    <li v-for="l in maintenance" :key="l.href">
                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                    </li>
                </ul>
                <p class="p-titre">Production industrielle</p>
                <ul>
                    <li v-for="l in production" :key="l.href">
                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                    </li>
                </ul>
                <p class="p-titre">Nos atouts</p>
                <ul>
                    <li v-for="a in atouts" :key="a.label">
                        <Link href="/#atouts" @click="fermer">{{ a.icone }} {{ a.label }}</Link>
                    </li>
                </ul>
            </details>

            <Link href="/#pour-qui" class="p-lien" @click="fermer">Pour qui ?</Link>

            <details v-for="m in simples" :key="m.id" class="p-groupe">
                <summary>{{ m.label }}</summary>
                <ul>
                    <li v-for="l in m.liens" :key="l.href">
                        <Link :href="l.href" @click="fermer">{{ l.label }}</Link>
                    </li>
                </ul>
            </details>

            <Link href="/contact" class="p-lien" @click="fermer">Contact</Link>

            <div class="p-bas">
                <a :href="`tel:${telephone.replace(/\s/g, '')}`">📞 {{ telephone }}</a>
                <a :href="`mailto:${email}`">✉ {{ email }}</a>
                <Link v-for="l in liensHaut" :key="l.href" :href="l.href" @click="fermer">{{ l.icone }} {{ l.label }}</Link>
            </div>
            <Link href="/inscription" class="pill p-pill" @click="fermer">Inscrivez-vous</Link>
        </nav>
    </header>
</template>

<style scoped>
.navbar {
    --accent: #007013; /* vert du logo : couleur principale */
    --orange: #f07a1a; /* orange du logo / prospectus : bouton d'inscription */
    --secondaire: #0d2a5c; /* bleu marine du prospectus : bouton de recherche */
    --encre: #14213a;
    --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
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
    transition: padding 0.25s var(--ease);
}

.logo { flex-shrink: 0; display: flex; align-items: center; gap: 0.75rem; }
.logo-img { display: block; height: 72px; width: auto; transition: height 0.25s var(--ease); background: #fff; border-radius: 8px; }

/* Slogan : blanc en haut de page (fond transparent), vert après scroll */
.slogan {
    display: block;
    color: var(--accent);
    font-weight: 700;
    font-size: 0.9rem;
    line-height: 1.25;
    text-shadow: none;
    transition: color 0.25s;
    text-transform: uppercase;
}
.navbar.clair .slogan {
    color: #fff;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
}

a { text-decoration: none; color: inherit; }
ul { list-style: none; margin: 0; padding: 0; }

.i {
    width: 1.15em;
    height: 1.15em;
    flex-shrink: 0;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.droite { display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem; }

/* Recherche : cachée en haut de page, visible après scroll */
.recherche { display: none; }

/* Rangée du haut */
.haut { display: flex; gap: 1.5rem; font-weight: 600; font-size: 0.95rem; }
.haut a { display: inline-flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
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

/* Bouton d'inscription (orange du prospectus) */
.pill {
    display: inline-block;
    background: var(--orange);
    color: #fff !important;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.95rem;
    padding: 0.75rem 1.6rem !important;
    border-radius: 99px !important;
    text-shadow: none !important;
    margin-left: 0.5rem;
    box-shadow: 0 6px 16px rgba(240, 122, 26, 0.3);
}
.pill:hover { filter: brightness(1.08); }

/* Méga-menu : Maintenance | Production | Atouts */
.mega {
    position: absolute;
    top: 100%;
    left: 1.25rem;
    right: 1.25rem;
    display: grid;
    grid-template-columns: 1.2fr 1.2fr 1fr;
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
.m-prod h3 { border-color: var(--orange); }
.m-maint, .m-prod { padding: 1.75rem 2rem; }
.m-prod { border-left: 1px solid #e3e8f0; }
.mega li a { display: block; padding: 0.35rem 0; color: #3b4660; font-weight: 500; line-height: 1.35; }
.mega li a:hover { color: var(--accent); }
.m-prod li a:hover { color: var(--orange); }
.m-sol { background: var(--secondaire); color: #fff; padding: 1.75rem 2rem; }
.m-sol h3 { border-color: var(--orange); }
.m-sol li a { color: #fff; font-weight: 600; }
.m-sol li a:hover { color: #fff; text-decoration: underline; }
.m-tout {
    display: inline-block;
    margin-top: 1rem;
    color: var(--orange);
    font-weight: 700;
}
.m-tout:hover { text-decoration: underline; }
.ico { display: inline-block; width: 1.6rem; }

/* Petit menu déroulant */
.drop-panel {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 260px;
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
    line-height: 1;
    padding: 0.4rem;
    border-radius: 8px;
    color: inherit;
    transition: background 0.2s, color 0.2s;
}
.burger .i { width: 28px; height: 28px; stroke-width: 2.4; }

/* ======================================================
   BARRE COMPACTE APRÈS SCROLL
   logo + slogan | recherche | bandeau coloré | hamburger
   ====================================================== */
.scrolled .inner { padding-top: 0.55rem; padding-bottom: 0.55rem; }
.scrolled .logo-img { height: 52px; }

.scrolled .droite { flex: 1; flex-direction: row; align-items: center; justify-content: flex-end; gap: 1rem; }
.scrolled .bas { display: none; }
.scrolled .burger { display: block; color: var(--accent); }
.scrolled .burger:hover { background: #eef6ef; }

/* Champ de recherche arrondi + bouton */
.scrolled .recherche {
    display: flex;
    align-items: stretch;
    flex: 1;
    min-width: 160px;
    max-width: 320px;
    margin-right: auto;
    border-radius: 99px;
    overflow: hidden;
    background: #f1f3f5;
    transition: box-shadow 0.2s;
    animation: apparait 0.35s var(--ease) both;
}
.recherche:focus-within { box-shadow: 0 0 0 3px rgba(13, 42, 92, 0.3); }
.recherche input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: none;
    background: transparent;
    font: inherit;
    font-size: 0.95rem;
    color: var(--encre);
    padding: 0.7rem 0.5rem 0.7rem 1.25rem;
}
.recherche input::placeholder { color: #6b7a90; }
.recherche button {
    display: grid;
    place-items: center;
    width: 54px;
    border: 0;
    cursor: pointer;
    background: var(--secondaire);
    color: #fff;
    transition: filter 0.2s;
}
.recherche button:hover { filter: brightness(1.15); }
.recherche button .i { width: 22px; height: 22px; }

/* Bandeau coloré avec téléphone / e-mail / adresse */
.scrolled .haut {
    gap: 1.6rem;
    padding: 0.75rem 1.4rem;
    border-radius: 8px;
    background: var(--accent);
    color: #fff;
    box-shadow: 0 6px 16px rgba(0, 112, 19, 0.25);
    animation: apparait 0.35s var(--ease) both;
}
.scrolled .haut a { color: #fff; text-shadow: none; }
.scrolled .haut a:hover { color: #fff; text-decoration: underline; text-underline-offset: 5px; }

@keyframes apparait {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: none; }
}

/* ---------- Responsive ---------- */
@media (max-width: 1180px) {
    .slogan { display: none; }
    .scrolled .haut { gap: 1.1rem; }
}
@media (max-width: 1000px) {
    .droite { flex-direction: row; align-items: center; gap: 1rem; }
    .bas { display: none; }
    .burger { display: block; }
    .logo-img { height: 52px; }
    .scrolled .logo-img { height: 46px; }
}
@media (max-width: 900px) {
    .scrolled .recherche { display: none; }
}
@media (max-width: 700px) {
    .cache-petit { display: none; }
    .scrolled .haut { padding: 0.65rem 1rem; }
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
/* Recherche dans le panneau (utile sur mobile) */
.recherche-mobile {
    display: none;
    margin: 0.25rem 0 0.75rem;
    border-radius: 99px;
    overflow: hidden;
    background: #f1f3f5;
}
.recherche-mobile input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: none;
    background: transparent;
    font: inherit;
    color: var(--encre);
    padding: 0.75rem 0.5rem 0.75rem 1.25rem;
}
.recherche-mobile button {
    display: grid;
    place-items: center;
    width: 52px;
    border: 0;
    cursor: pointer;
    background: var(--secondaire);
    color: #fff;
}
@media (max-width: 900px) {
    .recherche-mobile { display: flex; }
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
.p-bas { display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 0.25rem; font-weight: 600; }
.p-pill { display: block; text-align: center; margin: 0; }

a:focus-visible, button:focus-visible, summary:focus-visible { outline: 3px solid var(--orange); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
    .navbar, .logo-img, .inner { transition: none; }
    .scrolled .recherche, .scrolled .haut { animation: none; }
}
</style>