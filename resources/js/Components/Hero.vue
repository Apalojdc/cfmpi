<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
    defineProps<{
        filieres: { label: string; href: string }[];
        // icone : 'chapeau' | 'engrenage' | 'croissance' | 'attestation'
        atouts: { icone: string; titre: string; description: string }[];
        titreAtouts?: string; // titre au-dessus des cartes
        image?: string; // image de fond (dans /public)
        catalogue?: string; // lien du bouton "Télécharger le catalogue"
    }>(),
    {
        titreAtouts: 'SE FORMER AUJOURD’HUI, RÉUSSIR DEMAIN !',
        image: '/img/hero.png',
        catalogue: 'https://www.cfmpi.fr/telecharger-le-catalogue/',
    },
);

// "toutes" = recherche sur toutes les filières, "choisir" = affiche la liste des filières
const mode = ref<'toutes' | 'choisir'>('toutes');

// Si l'image ne charge pas, on le dit dans la console (F12) pour trouver le problème
const imageKo = ref(false);
const erreurImage = () => {
    imageKo.value = true;
    console.warn('HeroAccueil : image introuvable →', props.image);
};
</script>

<template>
    <section class="hero">
        <img v-if="!imageKo" :src="image" alt="" class="fond" @error="erreurImage" />
        <div class="voile" aria-hidden="true"></div>

        <div class="contenu">
            <!-- Bandeau d'annonce -->
            <p class="bandeau">
                Le CFMPI vous accompagne avec des formations pratiques, modernes et adaptées aux besoins des entreprises industrielles.
            </p>

            <h1>DÉVELOPPEZ VOS COMPÉTENCES, BOOSTEZ VOTRE AVENIR!!</h1>

            <form action="https://www.cfmpi.fr/recherche/" method="get" role="search" class="recherche">
                <input
                    type="text"
                    name="string"
                    class="champ"
                    placeholder="Nom ou référence de la formation recherchée…"
                    aria-label="Rechercher une formation"
                />

                <!-- Choix des filières -->
                <fieldset class="filieres">
                    <legend class="sr-only">Filières</legend>
                    <label class="option">
                        <input v-model="mode" type="radio" name="mode" value="toutes" />
                        <span class="case" aria-hidden="true"></span>
                        Toutes les filières
                    </label>
                    <label class="option">
                        <input v-model="mode" type="radio" name="mode" value="choisir" />
                        <span class="case" aria-hidden="true"></span>
                        Choisir une filière
                    </label>
                </fieldset>

                <div v-if="mode === 'choisir'" class="puces">
                    <a v-for="f in filieres" :key="f.href" :href="f.href">{{ f.label }}</a>
                </div>

                <div class="boutons">
                    <button type="submit" class="btn rouge">Chercher ma formation</button>
                    <a :href="catalogue" class="btn blanc">Télécharger le catalogue</a>
                </div>
            </form>
        </div>

        <!-- Cartes d'atouts -->
        <div v-if="atouts.length" class="bloc-atouts">
            <h2 class="titre-atouts">{{ titreAtouts }}</h2>
            <ul class="atouts">
                <li v-for="a in atouts" :key="a.titre" class="carte">
                    <span class="pastille">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <template v-if="a.icone === 'chapeau'">
                                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                                <path d="M6 12v5c3 2 9 2 12 0v-5" />
                                <path d="M22 10v6" />
                            </template>
                            <template v-else-if="a.icone === 'engrenage'">
                                <path
                                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                                />
                                <circle cx="12" cy="12" r="3" />
                            </template>
                            <template v-else-if="a.icone === 'croissance'">
                                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                <polyline points="16 7 22 7 22 13" />
                            </template>
                            <template v-else>
                                <circle cx="12" cy="8" r="6" />
                                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                            </template>
                        </svg>
                    </span>
                    <div class="haut">
                        <h3>{{ a.titre }}</h3>
                    </div>
                    <p class="bas">{{ a.description }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.hero {
    --accent: #049624; /* même couleur que la navbar */
    position: relative;
    min-height: min(100svh, 860px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* place pour la navbar transparente qui flotte au-dessus */
    padding: clamp(8rem, 15vw, 11rem) 1.25rem clamp(3rem, 6vw, 5rem);
    color: #fff;
    font-family: 'Montserrat', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
    isolation: isolate;
    background: #0a4a6b; /* couleur de secours si l'image manque */
}

/* Image de fond */
.fond {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
}

/* Voile bleu-turquoise par-dessus l'image */
.voile {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(100deg, rgba(8, 55, 90, 0.55) 0%, rgba(10, 100, 130, 0.78) 100%);
}

.contenu {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 860px;
    margin: 0 auto;
    margin-top: 5%;
}

/* Bandeau */
.bandeau {
    margin: 0 0 2.25rem;
    background: var(--accent);
    border-radius: 6px;
    padding: 0.9rem 1.5rem;
    text-align: center;
    font-size: clamp(1rem, 2.2vw, 1.5rem);
    font-weight: 600;
    line-height: 1.35;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
.bandeau strong { font-weight: 800; }

h1 {
    margin: 0 0 2rem;
    font-size: clamp(2rem, 5.4vw, 3.6rem);
    line-height: 1.15;
    font-weight: 800;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
}

/* Champ de recherche */
.champ {
    width: 100%;
    height: 54px;
    border: 0;
    border-radius: 6px;
    padding: 0 1.1rem;
    font: inherit;
    font-size: 1rem;
    color: #14213a;
    background: #fff;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
}
.champ::placeholder { color: #6b7589; }
.champ:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }

/* Barre des filières */
.filieres {
    margin: 1rem 0 0;
    border: 0;
    border-radius: 6px;
    padding: 0.9rem 1.1rem;
    background: rgba(20, 90, 120, 0.7);
    backdrop-filter: blur(6px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
}
.option {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    cursor: pointer;
    font-size: 1rem;
}
.option input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.case {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: rgba(8, 55, 90, 0.7);
    border: 2px solid rgba(255, 255, 255, 0.25);
    display: grid;
    place-items: center;
    transition: background-color 0.15s, border-color 0.15s;
}
.option input:checked + .case {
    background: var(--accent);
    border-color: var(--accent);
}
.option input:checked + .case::after {
    content: '✓';
    font-weight: 800;
    font-size: 1.05rem;
}
.option input:focus-visible + .case { outline: 3px solid #fff; outline-offset: 2px; }

/* Liste des filières (si "Choisir une filière") */
.puces {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
}
.puces a {
    padding: 0.45rem 0.95rem;
    border-radius: 99px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.35);
}
.puces a:hover { background: #fff; color: var(--accent); }

/* Boutons */
.boutons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
}
.btn {
    display: block;
    height: 54px;
    line-height: 54px;
    border: 0;
    border-radius: 6px;
    text-align: center;
    text-decoration: none;
    font: inherit;
    font-size: 1.05rem;
    font-weight: 700;
    cursor: pointer;
    transition: filter 0.15s, transform 0.15s;
}
.btn:hover { filter: brightness(1.06); transform: translateY(-1px); }
.btn:focus-visible { outline: 3px solid #fff; outline-offset: 2px; }
.rouge { background: var(--accent); color: #fff; }
.blanc { background: #fff; color: var(--accent); }

/* ----- Cartes d'atouts ----- */
.bloc-atouts {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1240px;
    margin: clamp(3rem, 6vw, 5rem) auto 0;
}
.titre-atouts {
    margin: 0 0 0.5rem;
    text-align: center;
    font-size: clamp(1.4rem, 3.2vw, 2.1rem);
    font-weight: 800;
    line-height: 1.2;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
}
.atouts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 0 1.25rem;
}
.carte {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 3.5rem; /* place pour la pastille qui dépasse */
    border-radius: 12px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
}
.pastille {
    position: absolute;
    top: -2.4rem;
    left: 1rem;
    z-index: 1;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: #fff;
    color: #0a4a6b;
    display: grid;
    place-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}
.pastille svg { width: 38px; height: 38px; }
.haut {
    flex: 0 0 auto;
    min-height: 7.5rem;
    display: flex;
    align-items: flex-end;
    padding: 2.75rem 1.25rem 1.25rem 3.5rem;
    border-radius: 12px 12px 0 0;
    /* barre verte, petit espace blanc, puis fond bleu sombre */
    background: linear-gradient(90deg, var(--accent) 0 26px, #fff 26px 31px, rgba(8, 55, 90, 0.92) 31px);
}
.haut h3 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    line-height: 1.3;
}
.bas {
    flex: 1;
    margin: 0;
    padding: 1.1rem 1.25rem 1.25rem;
    border-radius: 0 0 12px 12px;
    background: #fff;
    color: #14213a;
    font-size: 0.95rem;
    line-height: 1.55;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
}

@media (max-width: 640px) {
    .filieres,
    .boutons { grid-template-columns: 1fr; }

    .contenu {
        margin-top: 15%;
    }
}

@media (prefers-reduced-motion: reduce) {
    .btn, .case { transition: none; }
}
</style>