<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import NavBar from '@/Components/NavBar.vue'
import Hero from '@/Components/Hero.vue'

// ----- Données de la page (modifie ici, le template se met à jour) -----
const contact = {
  tel: '07 49 68 92 49',
  telHref: 'tel:+2250749689249',
  email: 'diallofousseni863@gmail.com',
  adresse: 'Riviera Faya, non loin du CHU de Cocody, Abidjan – Côte d’Ivoire',
}

const liensMenu = [
  { label: 'Formations', href: '#formations' },
  { label: 'Pour qui ?', href: '#pourqui' },
  { label: 'Nos atouts', href: '#atouts' },
  { label: 'Le CFMPI', href: '#apropos' },
  { label: 'Actualités', href: '#actus' },
]

// Domaines (utilisés par le Hero)
const filieres = [
  { label: 'Maintenance industrielle', href: '#formations' },
  { label: 'Production industrielle', href: '#formations' },
]

// Cartes du Hero : icone = 'chapeau' | 'engrenage' | 'croissance' | 'attestation'
const atoutsHero = [
  { icone: 'chapeau', titre: 'Formations pratiques', description: 'Des formations 100 % pratiques, sur des plateaux techniques équipés et modernes.' },
  { icone: 'engrenage', titre: 'Formateurs experts', description: 'Un encadrement par des professionnels de l’industrie et un suivi personnalisé.' },
  { icone: 'croissance', titre: 'Insertion professionnelle', description: 'Un accompagnement pour trouver un emploi, vous reconvertir ou évoluer.' },
  { icone: 'attestation', titre: 'Attestation de fin de formation', description: 'Une attestation vous est remise à l’issue de votre formation.' },
]

// Liste des formations : 1 objet = 1 card
const formations = [
  // --- Maintenance industrielle ---
  { domaine: 'Maintenance industrielle', titre: 'Maintenance mécanique industrielle', texte: 'Entretien, réglage et remise en état des organes mécaniques des équipements industriels.' },
  { domaine: 'Maintenance industrielle', titre: 'Maintenance électrique industrielle', texte: 'Installations, armoires et moteurs électriques : maintenir et sécuriser en atelier.' },
  { domaine: 'Maintenance industrielle', titre: 'Maintenance électromécanique', texte: 'Le lien entre mécanique et électricité pour intervenir sur des machines complètes.' },
  { domaine: 'Maintenance industrielle', titre: 'Automatisme industriel', texte: 'Comprendre, câbler et dépanner les systèmes automatisés d’une ligne de production.' },
  { domaine: 'Maintenance industrielle', titre: 'Diagnostic et dépannage des équipements', texte: 'Repérer l’origine d’une panne et remettre l’équipement en service rapidement.' },
  { domaine: 'Maintenance industrielle', titre: 'Maintenance préventive et améliorative', texte: 'Planifier les interventions pour éviter les pannes et améliorer la fiabilité.' },
  // --- Production industrielle ---
  { domaine: 'Production industrielle', titre: 'Conduite et surveillance des procédés industriels', texte: 'Piloter une installation, suivre les paramètres et réagir aux écarts.' },
  { domaine: 'Production industrielle', titre: 'Gestion de la production', texte: 'Organiser les flux, les équipes et les ressources pour tenir les objectifs.' },
  { domaine: 'Production industrielle', titre: 'Qualité et amélioration continue', texte: 'Contrôler la qualité et mettre en place des actions d’amélioration durables.' },
  { domaine: 'Production industrielle', titre: 'Sécurité, hygiène et environnement industriel', texte: 'Appliquer les règles SHE pour protéger les personnes et le site.' },
  { domaine: 'Production industrielle', titre: 'Lecture et interprétation de plans industriels', texte: 'Lire schémas et plans pour comprendre, monter et intervenir sur une installation.' },
]

// Filtre par domaine
const filtres = ['Tous', 'Maintenance industrielle', 'Production industrielle']
const filtreActif = ref('Tous')
const formationsAffichees = computed(() =>
  filtreActif.value === 'Tous'
    ? formations
    : formations.filter((f) => f.domaine === filtreActif.value)
)

const publicCible = [
  'Jeunes diplômés',
  'Techniciens et agents en activité',
  'Demandeurs d’emploi',
  'Toute personne souhaitant se reconvertir ou monter en compétences',
]

const atouts = [
  'Formations 100 % pratiques',
  'Plateaux techniques équipés et modernes',
  'Encadrement par des professionnels',
  'Suivi personnalisé',
  'Accompagnement à l’insertion professionnelle',
]

// Remplace ces actualités par les vraies (images dans public/img/actualite/)
const actualites = [
  { date: 'Novembre 2026', titre: 'Ouverture des inscriptions', image: '/img/actualite/inscription.png', href: '#contact' },
  { date: 'Novembre 2026', titre: 'Nos plateaux techniques en images', image: '/img/actualite/laboratoire.png', href: '#contact' },
  { date: 'Novembre 2026', titre: 'Rencontre avec nos formateurs experts', image: '/img/actualite/rencontre.png', href: '#contact' },
]

// Chiffres clés : "valeur" doit être un NOMBRE (il est animé de 0 à cette valeur)
const chiffres = [
  { valeur: 100, suffixe: ' %', label: 'Formations pratiques' },
  { valeur: formations.length, suffixe: '', label: 'Formations disponibles' },
  { valeur: 2, suffixe: '', label: 'Domaines : maintenance et production' },
]

// =====================================================================
//  ANIMATIONS
// =====================================================================
const prefereMoinsDeMouvement = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ----- 1. Apparition au scroll : v-reveal ---------------------------
// Usage : v-reveal                      → monte en fondu
//         v-reveal="{ delay: 120 }"     → avec délai (ms)
//         v-reveal="{ from: 'left' }"   → 'left' | 'right' | 'zoom'
let observateur = null
function getObservateur() {
  if (observateur) return observateur
  observateur = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return
        const el = e.target
        el.classList.add('is-visible')
        observateur.unobserve(el)
        // Une fois l'apparition terminée, on libère les transitions (survol des cards, etc.)
        const fin = (ev) => {
          if (ev.target !== el) return
          el.classList.add('done')
          el.removeEventListener('transitionend', fin)
        }
        el.addEventListener('transitionend', fin)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  )
  return observateur
}

const vReveal = {
  mounted(el, { value }) {
    const opts = value || {}
    el.classList.add('reveal')
    if (opts.from) el.dataset.from = opts.from
    if (opts.delay) el.style.setProperty('--d', opts.delay + 'ms')
    if (prefereMoinsDeMouvement() || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible', 'done')
      return
    }
    getObservateur().observe(el)
  },
  unmounted(el) {
    if (observateur) observateur.unobserve(el)
  },
}

// ----- 2. Chiffres clés : compteur animé ----------------------------
const statsRef = ref(null)
const statsGo = ref(false)
const affiches = ref(chiffres.map(() => 0))
let rafCompteur = 0
let observateurStats = null

function lancerCompteurs() {
  statsGo.value = true
  if (prefereMoinsDeMouvement()) {
    affiches.value = chiffres.map((c) => c.valeur)
    return
  }
  const duree = 2000
  const debut = performance.now()
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)
  const tick = (now) => {
    const t = Math.min((now - debut) / duree, 1)
    affiches.value = chiffres.map((c) => Math.round(c.valeur * easeOutQuart(t)))
    if (t < 1) rafCompteur = requestAnimationFrame(tick)
  }
  rafCompteur = requestAnimationFrame(tick)
}

// ----- 3. Barre de progression + bouton "retour en haut" ------------
const progressRef = ref(null)
const afficherHaut = ref(false)
let enAttente = false

function surScroll() {
  if (enAttente) return
  enAttente = true
  requestAnimationFrame(() => {
    const h = document.documentElement
    const max = h.scrollHeight - h.clientHeight
    const p = max > 0 ? h.scrollTop / max : 0
    progressRef.value?.style.setProperty('--p', p.toFixed(4))
    afficherHaut.value = h.scrollTop > 600
    enAttente = false
  })
}

function remonter() {
  window.scrollTo({ top: 0, behavior: prefereMoinsDeMouvement() ? 'auto' : 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', surScroll, { passive: true })
  surScroll()

  if (!('IntersectionObserver' in window)) {
    lancerCompteurs()
    return
  }
  observateurStats = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        lancerCompteurs()
        observateurStats.disconnect()
      }
    },
    { threshold: 0.35 }
  )
  if (statsRef.value) observateurStats.observe(statsRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', surScroll)
  cancelAnimationFrame(rafCompteur)
  observateurStats?.disconnect()
  observateur?.disconnect()
  observateur = null
})
</script>

<template>
  <div class="cfmpi-page">
    <!-- Barre de progression de lecture -->
    <div ref="progressRef" class="progress" aria-hidden="true"></div>

    <NavBar />
    <main>
      <Hero :filieres="filieres" :atouts="atoutsHero" />

      <!-- Formations : l'image de fond couvre toute la largeur de la section -->
      <section id="formations" class="formations">
        <div class="wrap">
          <h2 v-reveal>Nos domaines de formation</h2>
          <p v-reveal="{ delay: 100 }" class="sub">Maintenance industrielle et production industrielle : choisissez la formation qui correspond à votre projet.</p>

          <div v-reveal="{ delay: 180 }" class="filtres" role="group" aria-label="Filtrer les formations par domaine">
            <button
              v-for="f in filtres"
              :key="f"
              type="button"
              class="filtre"
              :class="{ actif: filtreActif === f }"
              :aria-pressed="filtreActif === f"
              @click="filtreActif = f"
            >
              {{ f }}
            </button>
          </div>

          <div class="grid gf">
            <article
              v-for="(f, i) in formationsAffichees"
              :key="f.titre"
              v-reveal="{ delay: (i % 2) * 110 }"
              class="card big"
            >
              <span class="tag" :class="{ prod: f.domaine === 'Production industrielle' }">{{ f.domaine }}</span>
              <h3>{{ f.titre }}</h3>
              <p class="meta">{{ f.texte }}</p>
              <a class="more" href="#contact">S’inscrire à cette formation <span class="arrow" aria-hidden="true">→</span></a>
            </article>

            <article v-reveal="{ delay: 110 }" class="card big help">
              <h3>Une autre question ?</h3>
              <p class="meta">Appelez-nous ou écrivez-nous : nous vous aidons à choisir la formation adaptée à votre parcours.</p>
              <a class="btn" :href="contact.telHref">Appeler le {{ contact.tel }}</a>
            </article>
          </div>
        </div>
      </section>

      <!-- Pour qui / Atouts -->
      <section id="pourqui" class="soft">
        <div class="wrap grid g2">
          <div class="split">
            <h2 v-reveal>Pour qui ?</h2>
            <p v-reveal="{ delay: 80 }" class="sub">Les formations du CFMPI s’adressent à :</p>
            <ul class="checks">
              <li v-for="(t, i) in publicCible" :key="t" v-reveal="{ delay: 120 + i * 90, from: 'left' }">{{ t }}</li>
            </ul>
            <a v-reveal="{ delay: 500 }" class="btn line" href="#contact">Nous contacter</a>
          </div>
          <div id="atouts" class="split atous-section">
            <h2 v-reveal="{ delay: 120 }">Nos atouts</h2>
            <p v-reveal="{ delay: 200 }" class="sub">Ce qui fait la différence au CFMPI :</p>
            <ul class="checks">
              <li v-for="(t, i) in atouts" :key="t" v-reveal="{ delay: 240 + i * 90, from: 'left' }">{{ t }}</li>
            </ul>
            <a v-reveal="{ delay: 700 }" class="btn line" href="#contact">S’inscrire</a>
          </div>
        </div>
      </section>

      <!-- Actualités -->
      <section id="actus" class="news">
        <div class="wrap">
          <h2 v-reveal>Les actualités</h2>
          <p v-reveal="{ delay: 100 }" class="sub">Suivez la vie du centre et nos prochaines sessions.</p>
          <div class="grid g3">
            <article
              v-for="(a, i) in actualites"
              :key="a.titre"
              v-reveal="{ delay: i * 130 }"
              class="card news-card"
            >
              <div class="news-media">
                <img :src="a.image" :alt="a.titre" class="news-img" loading="lazy" />
              </div>
              <div class="news-body">
                <span class="date">{{ a.date }}</span>
                <h3>{{ a.titre }}</h3>
                <a class="more" :href="a.href">Lire <span class="arrow" aria-hidden="true">→</span></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- À propos : image à gauche, texte à droite -->
      <section id="apropos" class="soft">
        <div class="wrap about">
          <img v-reveal="{ from: 'left' }" src="/img/hero.png" alt="Formation pratique au CFMPI" class="about-img" loading="lazy" />
          <div class="split">
            <h2 v-reveal="{ delay: 150 }">À propos du CFMPI</h2>
            <p v-reveal="{ delay: 250 }" class="sub">
              Le CFMPI, cabinet de formation professionnelle en maintenance et production industrielle,
              vous accompagne avec des formations pratiques, modernes et adaptées aux besoins des
              entreprises industrielles. Vous êtes encadré par des professionnels et formés sur des
              plateaux techniques équipés, avec une attestation à la fin de votre formation.
            </p>
            <a v-reveal="{ delay: 350 }" class="btn" href="#contact">Nous contacter</a>
          </div>
        </div>
      </section>

      <!-- Chiffres clés (compteurs animés) -->
      <section ref="statsRef" class="stats" :class="{ go: statsGo }" aria-label="Chiffres clés">
        <div class="wrap">
          <div class="grid">
            <div v-for="(c, i) in chiffres" :key="c.label" class="stat" :style="{ '--i': i }">
              <strong>
                <span aria-hidden="true">{{ affiches[i] }}{{ c.suffixe }}</span>
                <span class="sr-only">{{ c.valeur }}{{ c.suffixe }}</span>
              </strong>
              <span>{{ c.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Inscription -->
      <section id="contact">
        <div class="wrap">
          <div v-reveal="{ from: 'zoom' }" class="cta">
            <div>
              <h2>Inscrivez-vous dès maintenant !</h2>
              <p>Des formations pour un métier, un avenir, une réussite. La compétence d’aujourd’hui, l’industrie de demain.</p>
            </div>
            <a class="btn pulse" :href="contact.telHref">Appeler le {{ contact.tel }}</a>
          </div>
        </div>
      </section>
    </main>

    <!-- Pied de page -->
    <footer>
      <div class="wrap">
        <div class="grid">
          <div v-reveal>
            <a class="logo" href="#" aria-label="CFMPI, retour en haut">
              <img src="/img/logo/logo.png" alt="CFMPI" class="logo-img" />
            </a>
            <p class="logo-text">
              CABINET DE FORMATION PROFESSIONNELLE EN <span>MAINTENANCE</span> ET <span>PRODUCTION</span> INDUSTRIELLE
            </p>
          </div>
          <div v-reveal="{ delay: 100 }">
            <h4>Navigation</h4>
            <ul>
              <li v-for="l in liensMenu" :key="l.href"><a :href="l.href">{{ l.label }}</a></li>
            </ul>
          </div>
          <div v-reveal="{ delay: 200 }">
            <h4>Domaines</h4>
            <ul>
              <li><a href="#formations">Maintenance industrielle</a></li>
              <li><a href="#formations">Production industrielle</a></li>
            </ul>
          </div>
          <div v-reveal="{ delay: 300 }">
            <h4>Contact</h4>
            <ul>
              <li>{{ contact.adresse }}</li>
              <li><a :href="contact.telHref">{{ contact.tel }}</a></li>
              <li><a :href="'mailto:' + contact.email">{{ contact.email }}</a></li>
            </ul>
          </div>
        </div>
        <div class="copy">© CFMPI, Cabinet de formation professionnelle – Côte d’Ivoire</div>
      </div>
    </footer>

    <!-- Retour en haut -->
    <Transition name="fab">
      <button v-show="afficherHaut" type="button" class="to-top" aria-label="Revenir en haut de la page" @click="remonter">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 15l6-6 6 6" /></svg>
      </button>
    </Transition>
  </div>
</template>

<!-- Défilement doux : doit être sur <html>, donc hors "scoped" -->
<style>
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
</style>

<style scoped>
.cfmpi-page {
  --text: #14213a; --muted: #5a667c; --line: #e3e8f0; --soft: #f4f7fb;
  --primary: #0b3d91; --accent: #f28c00; --dark: #0a2552;
  --ease: cubic-bezier(.2, .7, .2, 1);
  background: #fff; color: var(--text);
  font: 16px/1.65 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  overflow-x: clip;
  background-image: url('/img/logo/logo.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-attachment: fixed;
}
.cfmpi-page *, .cfmpi-page *::before, .cfmpi-page *::after { box-sizing: border-box; }
a { color: inherit; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 6px; }
.wrap { width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 40px); }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

/* Barre de progression de lecture */
.progress {
  --p: 0;
  position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 100;
  background: var(--accent);
  transform-origin: left; transform: scaleX(var(--p));
  pointer-events: none;
}

/* Boutons */
.btn { display: inline-block; border: 0; cursor: pointer; background: var(--accent); color: #1a1100; font: 700 15px/1 inherit; font-family: inherit; padding: 15px 26px; border-radius: 10px; text-decoration: none; transition: transform .2s var(--ease), box-shadow .2s, filter .2s, background .2s, color .2s; }
.btn:hover { filter: brightness(1.07); transform: translateY(-2px); box-shadow: 0 8px 18px rgba(242, 140, 0, .35); }
.btn:active { transform: scale(.97); box-shadow: none; }
.btn.line { background: #fff; border: 2px solid var(--primary); color: var(--primary); padding: 13px 24px; }
.btn.line:hover { background: var(--primary); color: #fff; filter: none; box-shadow: 0 8px 18px rgba(11, 61, 145, .3); }
.btn.pulse { animation: pulse 2.6s ease-out infinite; }
.btn.pulse:hover { animation: none; }
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(242, 140, 0, .55); }
  70%, 100% { box-shadow: 0 0 0 16px rgba(242, 140, 0, 0); }
}

/* Sections */
section { padding: clamp(48px, 6vw, 88px) 0; }
h2 { font-size: clamp(26px, 3vw, 38px); margin: 0 0 8px; line-height: 1.2; color: var(--dark); }
h2::after { content: ""; display: block; width: 52px; height: 4px; border-radius: 2px; background: var(--accent); margin-top: 12px; transform-origin: left; }
.sub { color: var(--muted); margin: 14px 0 32px; max-width: 700px; }
.grid { display: grid; gap: 24px; }
.g3 { grid-template-columns: repeat(3, 1fr); }
.g2 { grid-template-columns: repeat(2, 1fr); gap: clamp(24px, 5vw, 72px); }
.soft { background: var(--soft); }

/* Cards */
.card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 8px; transition: box-shadow .25s, transform .25s var(--ease); }
.card:hover { box-shadow: 0 14px 30px rgba(10, 37, 82, .14); }
.card h3 { margin: 0; font-size: 18px; line-height: 1.3; color: var(--dark); }
.card a.more { margin-top: auto; font-weight: 600; color: var(--primary); text-decoration: none; }
.card a.more:hover { text-decoration: underline; }
.arrow { display: inline-block; transition: transform .25s var(--ease); }
a.more:hover .arrow, a.more:focus-visible .arrow { transform: translateX(5px); }
.meta { color: var(--muted); font-size: 14px; margin: 0; }

/* Listes à coches (Pour qui / Atouts) */
.checks { list-style: none; padding: 0; margin: 0 0 28px; }
.checks li { position: relative; padding-left: 32px; margin: 12px 0; color: var(--text); }
.checks li::before {
  content: ""; position: absolute; left: 0; top: 4px; width: 20px; height: 20px; border-radius: 50%;
  background: var(--accent)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5.5 10.5l3 3 6-6.5' fill='none' stroke='%231a1100' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
    center / 100% no-repeat;
  transform: scale(0);
  transition: transform .5s cubic-bezier(.34, 1.56, .64, 1) calc(var(--d, 0ms) + 250ms);
}
.checks li.is-visible::before { transform: scale(1); }

/* ---------- Formations : fond image pleine largeur ---------- */
.formations {
  position: relative;
  isolation: isolate;
  background: var(--dark) url('/img/hero.png') center / cover no-repeat;
}
.formations::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(180deg, rgba(10, 37, 82, .92) 0%, rgba(10, 37, 82, .82) 100%);
}
.formations h2 { color: #fff; }
.formations .sub { color: rgba(255, 255, 255, .8); margin-bottom: 24px; }

/* Filtres */
.filtres { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; }
.filtre {
  font: 600 14px/1 inherit; font-family: inherit; cursor: pointer;
  padding: 11px 18px; border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, .35); background: transparent; color: #fff;
  transition: background .25s, color .25s, border-color .25s, transform .2s var(--ease);
}
.filtre:hover { border-color: #fff; transform: translateY(-1px); }
.filtre:active { transform: scale(.96); }
.filtre.actif { background: var(--accent); border-color: var(--accent); color: #1a1100; }

/* Grandes cards (2 par ligne) */
.gf { grid-template-columns: repeat(2, 1fr); gap: 28px; }
.card.big { padding: clamp(24px, 3vw, 36px); gap: 12px; min-height: 240px; border-left: 5px solid var(--primary); }
.card.big h3 { font-size: clamp(20px, 2vw, 24px); }
.card.big .meta { font-size: 16px; }
.card.big a.more { padding-top: 12px; }
.tag { align-self: flex-start; background: #e8efff; color: var(--primary); padding: 5px 12px; border-radius: 99px; font-size: 13px; font-weight: 600; }
.tag.prod { background: #fff4e0; color: #9a5a00; }
.card.big:has(.tag.prod) { border-left-color: var(--accent); }
.card.help { background: #050047; border-color: var(--accent); border-left-color: #fff; justify-content: center; align-items: flex-start; }
.card.help h3 { color: #ffffff; }
.card.help .meta { color: rgba(255, 231, 187, 0.85); }
.card.help .btn { background: green; color: #fff; margin-top: 8px; }
.card.help .btn:hover { box-shadow: 0 8px 18px rgba(10, 37, 82, .4); }

/* Actualités */
.news-card { padding: 0; overflow: hidden; gap: 0; }
.news-media { overflow: hidden; background: var(--soft); }
.news-img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; display: block; transition: transform .7s var(--ease); }
.news-card:hover .news-img { transform: scale(1.06); }
.news-body { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.news .date { color: var(--muted); font-size: 14px; }

/* À propos */
.about { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(24px, 5vw, 72px); align-items: center; }
.about-img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 22px; box-shadow: 0 20px 40px rgba(10, 37, 82, .18); display: block; background: #fff; }

/* Chiffres clés */
.stats { background: var(--dark); color: #fff; text-align: center; }
.stats .grid { grid-template-columns: repeat(3, 1fr); }
.stat {
  opacity: 0; transform: translateY(18px);
  transition: opacity .7s var(--ease) calc(var(--i) * .15s), transform .7s var(--ease) calc(var(--i) * .15s);
}
.stats.go .stat { opacity: 1; transform: none; }
.stats strong { display: block; font-size: clamp(44px, 6vw, 72px); line-height: 1; color: var(--accent); font-variant-numeric: tabular-nums; }
.stats span { display: block; opacity: .85; margin-top: 8px; }
.stats strong span { margin-top: 0; opacity: 1; }
.stat::after {
  content: ""; display: block; width: 48px; height: 3px; border-radius: 2px; margin: 18px auto 0;
  background: var(--accent); transform: scaleX(0);
  transition: transform .8s var(--ease) calc(.35s + var(--i) * .15s);
}
.stats.go .stat::after { transform: scaleX(1); }

/* CTA */
.cta { background: var(--soft); border: 1px solid var(--line); border-radius: 22px; padding: clamp(24px, 4vw, 48px); display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: space-between; }
.cta p { margin: 12px 0 0; color: var(--muted); max-width: 640px; }

/* Pied de page */
footer { background: #fff; border-top: 1px solid var(--line); padding: 56px 0 28px; font-size: 14px; color: var(--muted); }
footer .grid { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; }
footer h4 { color: var(--dark); margin: 0 0 12px; font-size: 15px; }
footer ul { list-style: none; margin: 0; padding: 0; }
footer li { margin: 8px 0; }
footer a { text-decoration: none; transition: color .2s; }
footer a:hover { color: var(--primary); }
.logo { display: inline-block; transition: transform .25s var(--ease); }
.logo:hover { transform: scale(1.04); }
.logo-img { width: 120px; height: auto; display: block; }
.logo-text { margin-top: 12px; font-size: 13px; line-height: 1.4; color: #000874; font-weight: bolder; }
.logo-text span { color: var(--accent); font-weight: 600; }
.copy { border-top: 1px solid var(--line); margin-top: 32px; padding-top: 18px; }

/* Bouton retour en haut */
.to-top {
  position: fixed; right: max(16px, env(safe-area-inset-right, 0px)); bottom: calc(20px + env(safe-area-inset-bottom, 0px)); z-index: 50;
  width: 48px; height: 48px; border: 0; border-radius: 50%; cursor: pointer;
  display: grid; place-items: center;
  background: var(--primary); color: #fff; box-shadow: 0 10px 24px rgba(10, 37, 82, .35);
  transition: transform .2s var(--ease), background .2s;
}
.to-top:hover { background: var(--accent); color: #1a1100; transform: translateY(-3px); }
.fab-enter-active, .fab-leave-active { transition: opacity .3s, transform .3s var(--ease); }
.fab-enter-from, .fab-leave-to { opacity: 0; transform: translateY(16px) scale(.8); }

/* ---------- Apparition au scroll (v-reveal) ---------- */
.reveal {
  opacity: 0; transform: translateY(28px);
  transition: opacity .8s var(--ease) var(--d, 0ms), transform .8s var(--ease) var(--d, 0ms);
}
.reveal[data-from="left"] { transform: translateX(-36px); }
.reveal[data-from="right"] { transform: translateX(36px); }
.reveal[data-from="zoom"] { transform: scale(.95); }
.reveal.is-visible { opacity: 1; transform: none; }
/* Une fois apparu : on rend les transitions normales (survol) */
.reveal.done { transition: box-shadow .25s, transform .25s var(--ease), background .25s, color .25s, filter .2s; }
.card.reveal.is-visible:hover { transform: translateY(-4px); }
/* Trait orange sous les titres : se dessine à l'apparition */
h2.reveal::after { transform: scaleX(0); transition: transform .7s var(--ease) calc(var(--d, 0ms) + 350ms); }
h2.reveal.is-visible::after { transform: scaleX(1); }

/* Responsive */
@media (max-width: 1000px) {
  .g2, .about { grid-template-columns: 1fr; }
  .g3 { grid-template-columns: repeat(2, 1fr); }
  footer .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 700px) {
  .gf { grid-template-columns: 1fr; }
  .card.big { min-height: 0; }
}
@media (max-width: 640px) {
  .g3, .stats .grid, footer .grid { grid-template-columns: 1fr; }
  .stats .grid { gap: 40px; }
  .cta .btn { width: 100%; text-align: center; }
  .reveal[data-from="left"], .reveal[data-from="right"] { transform: translateY(24px); }
}

/* Mouvement réduit : tout est visible tout de suite, sans animation */
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.done, .stat, .stat::after, .checks li::before, h2.reveal::after,
  .card, .btn, .filtre, .arrow, .news-img, .to-top, .logo {
    transition: none !important;
  }
  .reveal, .stat, .checks li::before, h2.reveal::after, .stat::after { opacity: 1; transform: none; }
  .btn.pulse { animation: none; }
  .card.reveal.is-visible:hover, .news-card:hover .news-img, .btn:hover { transform: none; }
}

/* .atous-section{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  background-color: green;
} */
</style>